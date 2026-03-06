import { spawn } from 'child_process';
import path from 'path';
import { StateManager } from './state_manager';

const PROJECT_ROOT = path.resolve(__dirname, '../../');

export interface ValidationResult {
    passed: boolean;
    output: string;
    circuitBreakerTriggered: boolean;
}

export class ValidationRunner {
    /**
     * Executes the ci/verify.sh script
     * 
     * @param ticketId The ticket number (e.g., T-123)
     */
    static async runVerification(ticketId: string): Promise<ValidationResult> {
        return new Promise(async (resolve, reject) => {
            try {
                const metadata = await StateManager.getMetadata(ticketId);
                let circuitBreakerTriggered = false;

                // Spawning bash script. We pass the TICKET_ID to the script's environment.
                const child = spawn('bash', ['ci/verify.sh'], {
                    cwd: PROJECT_ROOT,
                    env: { ...process.env, TICKET_ID: ticketId },
                    shell: true
                });

                let output = '';

                child.stdout.on('data', (data) => {
                    output += data.toString();
                });

                child.stderr.on('data', (data) => {
                    output += data.toString();
                });

                child.on('close', async (code) => {
                    const passed = code === 0;

                    if (!passed) {
                        const failures = (metadata.failure_count || 0) + 1;
                        if (failures >= 3) { // Circuit breaker loop detection
                            circuitBreakerTriggered = true;
                            output += `\n\n[CIRCUIT BREAKER ACTIVATED] AI failed ${failures} times continuously.`;
                        }
                        await StateManager.updateMetadata(ticketId, { failure_count: failures });
                    } else {
                        // Reset count on success
                        await StateManager.updateMetadata(ticketId, { failure_count: 0 });
                    }

                    resolve({
                        passed,
                        output,
                        circuitBreakerTriggered
                    });
                });

                child.on('error', (err) => {
                    resolve({
                        passed: false,
                        output: `Failed to spawn verification process: ${err.message}`,
                        circuitBreakerTriggered: false
                    });
                });
            } catch (error) {
                // Return failed validation if ticket metadata can't even be read
                resolve({
                    passed: false,
                    output: `Internal error in validation runner: ${(error as any).message}`,
                    circuitBreakerTriggered: false
                });
            }
        });
    }
}
