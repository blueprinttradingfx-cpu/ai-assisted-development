import fs from 'fs-extra';
import path from 'path';
import { validateTicketMetadata, validateTicketUpdate, TicketMetadata } from './schemas/ticket_schema';

const EPICS_DIR = path.resolve(__dirname, '../../project-management/epics');

export { TicketMetadata };

export class StateManager {
    /**
     * Finds the absolute path to a ticket's metadata.json
     */
    static async getTicketPath(ticketId: string): Promise<string | null> {
        if (!await fs.pathExists(EPICS_DIR)) return null;
        
        const epics = await fs.readdir(EPICS_DIR);
        for (const epic of epics) {
            const epicPath = path.join(EPICS_DIR, epic);
            const stat = await fs.stat(epicPath);
            if (!stat.isDirectory() || epic === 'epic_template') continue;

            const ticketsDir = path.join(epicPath, 'tickets');
            if (await fs.pathExists(ticketsDir)) {
                const tickets = await fs.readdir(ticketsDir);
                if (tickets.includes(ticketId)) {
                    return path.join(ticketsDir, ticketId, 'metadata.json');
                }
            }
        }
        return null;
    }

    /**
     * Reads and validates the metadata for a given ticket
     */
    static async getMetadata(ticketId: string): Promise<TicketMetadata> {
        const configPath = await this.getTicketPath(ticketId);
        if (!configPath) throw new Error(`Ticket ${ticketId} not found`);

        const data = await fs.readFile(configPath, 'utf8');
        const parsed = JSON.parse(data);
        
        // Validate against schema - throws if invalid
        return validateTicketMetadata(parsed);
    }

    /**
     * Updates the metadata for a given ticket with validation
     */
    static async updateMetadata(ticketId: string, updates: Partial<TicketMetadata>): Promise<TicketMetadata> {
        const configPath = await this.getTicketPath(ticketId);
        if (!configPath) throw new Error(`Ticket ${ticketId} not found`);

        const currentMetadata = await this.getMetadata(ticketId);
        
        // Validate updates before merging
        validateTicketUpdate(updates);
        
        const newMetadata = { ...currentMetadata, ...updates };

        await fs.writeFile(configPath, JSON.stringify(newMetadata, null, 4), 'utf8');
        return newMetadata;
    }
}
