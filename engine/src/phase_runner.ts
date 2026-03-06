import { StateManager } from './state_manager';
import { PHASE_REGISTRY, getNextPhase, PhaseType } from './phase_registry';
import { ValidationRunner } from './validation_runner';

export class PhaseRunner {
    /**
     * Executes the next logical phase for a ticket based on its current state.
     * This orchestrates the lifecycle progression.
     */
    static async advanceTicket(ticketId: string): Promise<void> {
        const metadata = await StateManager.getMetadata(ticketId);
        
        let currentPhase = metadata.current_phase as PhaseType;
        if (!currentPhase) {
            // Default initialization if the metadata.json lacks 'current_phase'
            // We can infer context here, but we will default to REQUIREMENTS
            currentPhase = PhaseType.REQUIREMENTS;
            await StateManager.updateMetadata(ticketId, { current_phase: currentPhase });
        }

        if (currentPhase === PhaseType.DONE || metadata.status === 'completed') {
            console.log(`[Engine] Ticket ${ticketId} is already DONE.`);
            return;
        }

        console.log(`[Engine] Ticket ${ticketId} is currently in phase: ${currentPhase}`);
        const phaseDef = PHASE_REGISTRY[currentPhase];

        // 1. Validation Hooks
        if (phaseDef.id === PhaseType.VALIDATE) {
            console.log(`[Engine] Running rigorous circuit-breaker validations for ${ticketId}...`);
            const result = await ValidationRunner.runVerification(ticketId);
            
            if (!result.passed) {
                console.error(`[Engine] Validation block failed for ${ticketId}. Reverting back to IMPLEMENT phase.`);
                // Return ticket back to implementation phase to try fixing the bugs
                await StateManager.updateMetadata(ticketId, { current_phase: PhaseType.IMPLEMENT });
                
                if (result.circuitBreakerTriggered) {
                    console.error(`[Engine] CIRCUIT BREAKER TRIGGERED! Human intervention required.`);
                }
                
                // (In a full implemenation, we would feed 'result.output' back into the LLM.)
                return;
            }
            console.log(`[Engine] Validation passed!`);
        }

        // 2. AI Invocation Hook / Instruction Output
        // In the state-machine IDE model, the CLI tells the AI what to do next
        console.log(`\n======================================================`);
        console.log(`[Engine Hook] 🤖 IDE AI INSTRUCTION PENDING:`);
        console.log(`Ticket ${ticketId} is currently in Phase: ${currentPhase.toUpperCase()}`);
        console.log(`======================================================`);
        
        switch (currentPhase) {
            case PhaseType.REQUIREMENTS:
                console.log(`AI ACTION REQUIRED: Please generate the requirements/README.md for ${ticketId} based on the PRD and Epic Backlog.`);
                console.log(`Once you have completed this and the user approves, run this engine again: npm run start --prefix ./engine -- run ${ticketId}`);
                break;
            case PhaseType.DESIGN:
                console.log(`AI ACTION REQUIRED: Please generate the design/README.md for ${ticketId} based on the UI Mockups and Style Guide.`);
                console.log(`Once you have completed this and the user approves, run this engine again: npm run start --prefix ./engine -- run ${ticketId}`);
                break;
            case PhaseType.IMPLEMENT:
                console.log(`AI ACTION REQUIRED: Please write the code implementation and tests for ${ticketId}.`);
                console.log(`Once you are confident the code is ready, run this engine again to trigger the Validation Gate: npm run start --prefix ./engine -- run ${ticketId}`);
                break;
        }

        console.log(`======================================================\n`);

        // 3. State Advancement
        const nextPhase = getNextPhase(currentPhase, metadata.ticket_type);
        if (nextPhase) {
            console.log(`[Engine State] Ready to transition ticket ${ticketId}: ${currentPhase} -> ${nextPhase}`);
            await StateManager.updateMetadata(ticketId, { current_phase: nextPhase });
        } else {
            console.log(`[Engine State] Ticket ${ticketId} has reached the end of the SDLC.`);
            await StateManager.updateMetadata(ticketId, { status: 'completed', current_phase: PhaseType.DONE, implementation_done: true });
        }
    }
}
