#!/usr/bin/env node

import { Command } from 'commander';
import { PhaseRunner } from './phase_runner';
import { StateManager } from './state_manager';
import { DependencyEngine } from './dependency_engine';
import { FileGuard } from './file_guard';
import { ArchitectureGuard } from './architecture_guard';
import { ContextBuilder } from './context_builder';
import { LearningLayer } from './learning_layer';

const program = new Command();

program
    .name('tita-engine')
    .description('AI Development Runtime - Execution Engine for AI-Assisted Development')
    .version('1.0.0');

program.command('run')
    .description('Runs the SDLC engine for a specific ticket')
    .argument('<ticketId>', 'The ticket ID to process (e.g., T-123)')
    .action(async (ticketId) => {
        try {
            console.log(`[Engine Boot] Starting AI SDLC Governance Runtime for ${ticketId}...`);
            await PhaseRunner.advanceTicket(ticketId);
        } catch (error: any) {
            console.error(`[Fatal Error] Engine failed to run for ${ticketId}:`, error.message);
            process.exit(1);
        }
    });

program.command('status')
    .description('Show current status of a ticket')
    .argument('<ticketId>', 'The ticket ID to check')
    .action(async (ticketId) => {
        try {
            const metadata = await StateManager.getMetadata(ticketId);
            const deps = await DependencyEngine.getInstance().canExecute(ticketId);
            
            console.log(`\n📋 Ticket: ${ticketId}`);
            console.log(`   Title: ${metadata.title || 'No title'}`);
            console.log(`   Status: ${metadata.status}`);
            console.log(`   Phase: ${metadata.current_phase}`);
            console.log(`   Type: ${metadata.ticket_type || 'feature'}`);
            if (metadata.layer) console.log(`   Layer: ${metadata.layer}`);
            
            if (metadata.depends_on && metadata.depends_on.length > 0) {
                console.log(`\n🔗 Dependencies:`);
                console.log(`   Can execute: ${deps.can_execute ? '✓ Yes' : '✗ No'}`);
                if (!deps.can_execute) {
                    console.log(`   Blocked by: ${deps.blocked_by.join(', ')}`);
                }
            }
            
            if (metadata.failure_count && metadata.failure_count > 0) {
                console.log(`\n⚠️  Failures: ${metadata.failure_count}`);
            }
            
            console.log('');
        } catch (error: any) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    });

program.command('deps')
    .description('Show dependency tree for a ticket')
    .argument('<ticketId>', 'The ticket ID to analyze')
    .action(async (ticketId) => {
        try {
            const engine = DependencyEngine.getInstance();
            await engine.buildGraph();
            
            console.log(`\n📊 Dependency Tree for ${ticketId}:\n`);
            console.log(engine.getDependencyTree(ticketId));
        } catch (error: any) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    });

program.command('next')
    .description('List tickets ready for execution')
    .action(async () => {
        try {
            const engine = DependencyEngine.getInstance();
            await engine.buildGraph();
            const ready = await engine.getReadyTickets();
            
            console.log(`\n🚀 Tickets Ready for Execution (${ready.length}):\n`);
            for (const ticketId of ready) {
                const metadata = await StateManager.getMetadata(ticketId);
                console.log(`   • ${ticketId}: ${metadata.title || 'No title'}`);
            }
            console.log('');
        } catch (error: any) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    });

program.command('context')
    .description('Generate AI context pack for a ticket')
    .argument('<ticketId>', 'The ticket ID')
    .option('-o, --output <path>', 'Output file path')
    .action(async (ticketId, options) => {
        try {
            const builder = new ContextBuilder();
            const outputPath = options.output || await builder.generateContextFile(ticketId);
            
            console.log(`\n📝 Context pack generated: ${outputPath}`);
            console.log(`   AI should read this file for focused context.\n`);
        } catch (error: any) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    });

program.command('validate')
    .description('Run all guards without advancing ticket')
    .argument('<ticketId>', 'The ticket ID to validate')
    .action(async (ticketId) => {
        try {
            console.log(`\n🔍 Validating ${ticketId}...\n`);
            
            // File Guard
            const fileResult = await FileGuard.checkTicketScope(ticketId);
            console.log(FileGuard.formatViolations(fileResult));
            
            // Architecture Guard
            const ticket = await StateManager.getMetadata(ticketId);
            if (ticket.file_scope?.allowed) {
                const archGuard = new ArchitectureGuard();
                const archResult = await archGuard.checkImports(ticket.file_scope.allowed);
                console.log(ArchitectureGuard.formatViolations(archResult));
            }
            
            console.log('');
        } catch (error: any) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    });

program.command('insights')
    .description('Show learning insights and metrics')
    .option('--export <path>', 'Export data to JSON file')
    .action((options) => {
        try {
            const learning = new LearningLayer();
            
            if (options.export) {
                const data = learning.exportData();
                const fs = require('fs');
                fs.writeFileSync(options.export, JSON.stringify(data, null, 2));
                console.log(`\n📊 Data exported to ${options.export}\n`);
            } else {
                const insights = learning.generateInsights();
                console.log(insights);
            }
        } catch (error: any) {
            console.error(`Error: ${error.message}`);
            process.exit(1);
        }
    });

program.parse(process.argv);
