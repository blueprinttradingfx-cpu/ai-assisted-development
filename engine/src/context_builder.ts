import * as fs from 'fs';
import * as path from 'path';
import { StateManager, TicketMetadata } from './state_manager';
import { DependencyEngine } from './dependency_engine';
import { ArchitectureGuard } from './architecture_guard';
import { FileGuard } from './file_guard';

/**
 * Context Builder - Generates focused context packs for AI execution
 * 
 * Tech-agnostic: Works with any project type
 * Prevents AI from reading arbitrary files by composing relevant context
 */

export interface ContextPack {
    ticketId: string;
    goal: string;
    currentPhase: string;
    dependencies: DependencyContext[];
    relevantFiles: string[];
    allowedFiles: string[];
    architectureRules?: string;
    projectContext?: ProjectContext;
    generatedAt: string;
}

export interface DependencyContext {
    ticketId: string;
    status: string;
    filesModified: string[];
    summary?: string;
}

export interface ProjectContext {
    name: string;
    description?: string;
    techStack?: string[];
    relevantDocs: string[];
}

export interface ContextBuilderConfig {
    maxFileSize: number;      // Max bytes to include per file
    maxFiles: number;         // Max number of files in context
    includeDependencyOutputs: boolean;
    includeArchitectureRules: boolean;
    contextOutputDir: string;
}

export class ContextBuilder {
    private config: ContextBuilderConfig;
    private dependencyEngine: DependencyEngine;
    private archGuard: ArchitectureGuard;

    constructor(config?: Partial<ContextBuilderConfig>) {
        this.config = {
            maxFileSize: 50000,        // 50KB per file
            maxFiles: 20,              // 20 files max
            includeDependencyOutputs: true,
            includeArchitectureRules: true,
            contextOutputDir: '.context',
            ...config
        };
        this.dependencyEngine = DependencyEngine.getInstance();
        this.archGuard = new ArchitectureGuard();
    }

    /**
     * Build context pack for a ticket
     */
    async buildContext(ticketId: string): Promise<ContextPack> {
        const ticket = await StateManager.getMetadata(ticketId);
        
        // Collect all context components
        const dependencies = await this.buildDependencyContext(ticket);
        const relevantFiles = await this.findRelevantFiles(ticket);
        const allowedFiles = await FileGuard.previewScope(ticketId);
        const architectureRules = this.buildArchitectureContext(ticket);
        const projectContext = await this.buildProjectContext();

        const contextPack: ContextPack = {
            ticketId,
            goal: ticket.title || 'No title',
            currentPhase: ticket.current_phase || 'requirements',
            dependencies,
            relevantFiles: relevantFiles.slice(0, this.config.maxFiles),
            allowedFiles,
            architectureRules,
            projectContext,
            generatedAt: new Date().toISOString()
        };

        return contextPack;
    }

    /**
     * Generate context markdown file
     */
    async generateContextFile(ticketId: string): Promise<string> {
        const pack = await this.buildContext(ticketId);
        
        // Ensure output directory exists
        const outputDir = path.resolve(process.cwd(), this.config.contextOutputDir);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const outputPath = path.join(outputDir, `${ticketId}.md`);
        const markdown = this.renderContextMarkdown(pack);
        
        fs.writeFileSync(outputPath, markdown, 'utf8');
        
        return outputPath;
    }

    /**
     * Build dependency context - what this ticket depends on
     */
    private async buildDependencyContext(ticket: TicketMetadata): Promise<DependencyContext[]> {
        const contexts: DependencyContext[] = [];
        const deps = ticket.depends_on || [];

        for (const depId of deps) {
            try {
                const dep = await StateManager.getMetadata(depId);
                const fileScope = dep.file_scope || { allowed: [] };
                
                contexts.push({
                    ticketId: depId,
                    status: dep.status,
                    filesModified: fileScope.allowed || [],
                    summary: dep.metadata?.summary as string
                });
            } catch (error) {
                // Dependency not found, skip
                contexts.push({
                    ticketId: depId,
                    status: 'unknown',
                    filesModified: [],
                    summary: 'Dependency ticket not found'
                });
            }
        }

        return contexts;
    }

    /**
     * Find files relevant to this ticket
     * Includes: dependency files, layer files, related by git history
     */
    private async findRelevantFiles(ticket: TicketMetadata): Promise<string[]> {
        const relevant = new Set<string>();

        // 1. Files from dependencies
        const deps = ticket.depends_on || [];
        for (const depId of deps) {
            try {
                const dep = await StateManager.getMetadata(depId);
                const fileScope = dep.file_scope || { allowed: [] };
                for (const file of fileScope.allowed || []) {
                    relevant.add(file);
                }
            } catch (error) {
                // Skip
            }
        }

        // 2. Files from same layer (if layer is defined)
        if (ticket.layer) {
            const layerFiles = this.archGuard.getLayerForFile('.'); // Get all files for layer
            // Note: This is a simplified approach - in practice you'd scan layer patterns
        }

        // 3. Files this ticket is allowed to modify
        const fileScope = ticket.file_scope || { allowed: [] };
        for (const pattern of fileScope.allowed || []) {
            const matches = this.globFiles(pattern);
            for (const file of matches) {
                relevant.add(file);
            }
        }

        return Array.from(relevant);
    }

    /**
     * Build architecture context for ticket's layer
     */
    private buildArchitectureContext(ticket: TicketMetadata): string | undefined {
        if (!this.config.includeArchitectureRules) return undefined;

        const layer = ticket.layer;
        if (!layer) return undefined;

        const allowedImports = this.archGuard.getAllowedImports('src/' + layer);
        
        return `Layer: ${layer}\nAllowed imports: ${allowedImports.join(', ') || 'none'}`;
    }

    /**
     * Build project-level context
     */
    private async buildProjectContext(): Promise<ProjectContext | undefined> {
        const relevantDocs: string[] = [];
        
        // Check for project foundation docs
        const docPaths = [
            'project-management/vision.md',
            'project-management/PRD.md',
            'project-management/FDR.md',
            'README.md'
        ];

        for (const docPath of docPaths) {
            const fullPath = path.resolve(process.cwd(), docPath);
            if (fs.existsSync(fullPath)) {
                relevantDocs.push(docPath);
            }
        }

        if (relevantDocs.length === 0) return undefined;

        return {
            name: this.inferProjectName(),
            relevantDocs
        };
    }

    /**
     * Render context pack as markdown
     */
    private renderContextMarkdown(pack: ContextPack): string {
        let md = `# AI Context Pack: ${pack.ticketId}\n\n`;
        md += `**Generated**: ${pack.generatedAt}\n\n`;
        
        md += `## Goal\n\n${pack.goal}\n\n`;
        md += `## Current Phase\n\n${pack.currentPhase}\n\n`;

        // Dependencies
        if (pack.dependencies.length > 0) {
            md += `## Dependencies\n\n`;
            for (const dep of pack.dependencies) {
                md += `- **${dep.ticketId}** (${dep.status})\n`;
                if (dep.filesModified.length > 0) {
                    md += `  - Files: ${dep.filesModified.join(', ')}\n`;
                }
                if (dep.summary) {
                    md += `  - Summary: ${dep.summary}\n`;
                }
            }
            md += '\n';
        }

        // Relevant Files
        if (pack.relevantFiles.length > 0) {
            md += `## Relevant Files\n\n`;
            for (const file of pack.relevantFiles) {
                md += `- \`${file}\`\n`;
            }
            md += '\n';
        }

        // Allowed Files (scope)
        if (pack.allowedFiles.length > 0) {
            md += `## Allowed Files (Ticket Scope)\n\n`;
            for (const file of pack.allowedFiles.slice(0, 10)) {
                md += `- \`${file}\`\n`;
            }
            if (pack.allowedFiles.length > 10) {
                md += `- ... and ${pack.allowedFiles.length - 10} more\n`;
            }
            md += '\n';
        }

        // Architecture Rules
        if (pack.architectureRules) {
            md += `## Architecture Rules\n\n${pack.architectureRules}\n\n`;
        }

        // Project Context
        if (pack.projectContext) {
            md += `## Project Context\n\n`;
            md += `**Project**: ${pack.projectContext.name}\n\n`;
            if (pack.projectContext.relevantDocs.length > 0) {
                md += `**Reference Documents**:\n`;
                for (const doc of pack.projectContext.relevantDocs) {
                    md += `- ${doc}\n`;
                }
            }
            md += '\n';
        }

        md += `---\n\n`;
        md += `**Instructions**: Focus only on the files in "Allowed Files" section. `;
        md += `Do not modify files outside this scope. `;
        md += `Reference the dependency files for context but do not change them.\n`;

        return md;
    }

    /**
     * Helper: Glob files
     */
    private globFiles(pattern: string): string[] {
        try {
            const glob = require('glob');
            return glob.globSync(pattern, { cwd: process.cwd() });
        } catch (error) {
            return [];
        }
    }

    /**
     * Infer project name from directory or package.json
     */
    private inferProjectName(): string {
        // Try package.json
        const packagePath = path.resolve(process.cwd(), 'package.json');
        if (fs.existsSync(packagePath)) {
            try {
                const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
                if (pkg.name) return pkg.name;
            } catch (error) {
                // Fall through
            }
        }

        // Use directory name
        return path.basename(process.cwd());
    }

    /**
     * Clean up old context files
     */
    cleanup(maxAgeHours: number = 24): void {
        const outputDir = path.resolve(process.cwd(), this.config.contextOutputDir);
        if (!fs.existsSync(outputDir)) return;

        const now = Date.now();
        const maxAge = maxAgeHours * 60 * 60 * 1000;

        const files = fs.readdirSync(outputDir);
        for (const file of files) {
            const filePath = path.join(outputDir, file);
            const stats = fs.statSync(filePath);
            
            if (now - stats.mtime.getTime() > maxAge) {
                fs.unlinkSync(filePath);
            }
        }
    }
}
