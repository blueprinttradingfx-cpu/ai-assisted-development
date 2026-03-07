import { ResearcherAgent } from './researcher_agent';

export interface AgentConfig {
  name: string;
  description: string;
  promptFile: string;
  inputFiles: string[];
  outputFile: string;
}

export const AGENT_REGISTRY: Record<string, AgentConfig> = {
  researcher: {
    name: 'ai-researcher',
    description: 'Discovers patterns and maps codebase',
    promptFile: '.agent/agents/researcher/system-prompt.md',
    inputFiles: ['metadata.json', 'PRD.md'],
    outputFile: 'RESEARCH.md'
  },
  planner: {
    name: 'ai-planner',
    description: 'Creates implementation BLUEPRINT',
    promptFile: '.agent/agents/planner/system-prompt.md',
    inputFiles: ['metadata.json', 'PRD.md', 'RESEARCH.md'],
    outputFile: 'BLUEPRINT.md'
  },
  executor: {
    name: 'ai-executor',
    description: 'Implements code following plan',
    promptFile: '.agent/agents/executor/system-prompt.md',
    inputFiles: ['metadata.json', 'PRD.md', 'BLUEPRINT.md'],
    outputFile: 'RECORD.md'
  },
  verifier: {
    name: 'ai-verifier',
    description: 'Validates independently',
    promptFile: '.agent/agents/verifier/system-prompt.md',
    inputFiles: ['metadata.json', 'PRD.md', 'BLUEPRINT.md', 'RECORD.md'],
    outputFile: 'VERIFICATION.md'
  }
};

export function getAgentConfig(name: string): AgentConfig | undefined {
  return AGENT_REGISTRY[name];
}

export function getAllAgents(): AgentConfig[] {
  return Object.values(AGENT_REGISTRY);
}
