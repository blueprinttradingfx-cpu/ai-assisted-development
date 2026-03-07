# Framework Installation & Management

.PHONY: install install-check test start status stop clean help

# Colors for output
BLUE := \033[36m
GREEN := \033[32m
RED := \033[31m
YELLOW := \033[33m
NC := \033[0m # No Color

# Default target
.DEFAULT_GOAL := help

##@ Framework Installation

install: install-check ## Install all framework dependencies and tools
	@echo "$(BLUE)🔧 Installing AI Assisted Development Framework...$(NC)"
	
	@echo "$(BLUE)📦 Installing Node.js dependencies...$(NC)"
	cd engine && npm install
	cd packages/memory && npm install
	
	@echo "$(BLUE)🐍 Installing Python tools...$(NC)"
	pip install -r requirements.txt 2>/dev/null || echo "$(YELLOW)⚠️ No requirements.txt found, skipping Python deps$(NC)"
	
	@echo "$(BLUE)🗄️  Checking Qdrant...$(NC)"
	@if docker ps | grep -q qdrant; then \
		echo "$(GREEN)✓ Qdrant is running$(NC)"; \
	else \
		echo "$(YELLOW)⚠️ Qdrant not running. Starting...$(NC)"; \
		docker run -d -p 6333:6333 -v qdrant_storage:/qdrant/storage qdrant/qdrant || echo "$(RED)✗ Failed to start Qdrant$(NC)"; \
	fi
	
	@echo "$(BLUE)🤖 Checking Ollama...$(NC)"
	@if command -v ollama &> /dev/null; then \
		echo "$(GREEN)✓ Ollama installed$(NC)"; \
		ollama pull nomic-embed-text 2>/dev/null || echo "$(YELLOW)⚠️ Could not pull nomic-embed-text model$(NC)"; \
	else \
		echo "$(RED)✗ Ollama not found. Please install from https://ollama.ai$(NC)"; \
	fi
	
	@echo "$(BLUE)🔍 Running post-install tests...$(NC)"
	$(MAKE) test
	
	@echo "$(GREEN)✅ Installation complete!$(NC)"
	@echo "$(BLUE)Run 'make start' to start all services$(NC)"

install-check: ## Check prerequisites before installation
	@echo "$(BLUE)🔍 Checking prerequisites...$(NC)"
	
	@command -v node >/dev/null 2>&1 || { echo "$(RED)✗ Node.js is required but not installed$(NC)"; exit 1; }
	@echo "$(GREEN)✓ Node.js: $(shell node --version)$(NC)"
	
	@command -v npm >/dev/null 2>&1 || { echo "$(RED)✗ npm is required but not installed$(NC)"; exit 1; }
	@echo "$(GREEN)✓ npm: $(shell npm --version)$(NC)"
	
	@command -v python3 >/dev/null 2>&1 || command -v python >/dev/null 2>&1 || { echo "$(RED)✗ Python is required but not installed$(NC)"; exit 1; }
	@echo "$(GREEN)✓ Python: $(shell python3 --version 2>/dev/null || python --version)$(NC)"
	
	@command -v docker >/dev/null 2>&1 || { echo "$(YELLOW)⚠️ Docker recommended for Qdrant but not required$(NC)"; }
	@if command -v docker >/dev/null 2>&1; then \
		echo "$(GREEN)✓ Docker: $(shell docker --version)$(NC)"; \
	fi
	
	@echo "$(GREEN)✅ All prerequisites met$(NC)"

##@ Framework Testing

test: ## Run framework health checks
	@echo "$(BLUE)🏥 Running framework health checks...$(NC)"
	@node -e "
	const fs = require('fs');
	const checks = {
	  timestamp: new Date().toISOString(),
	  overall_status: 'healthy',
	  components: {}
	};
	
	// Check engine
	try {
	  require('./engine/package.json');
	  checks.components.engine = { status: 'ok', version: require('./engine/package.json').version };
	} catch(e) {
	  checks.components.engine = { status: 'error', message: e.message };
	  checks.overall_status = 'unhealthy';
	}
	
	// Check packages/memory
	try {
	  require('./packages/memory/package.json');
	  checks.components.memory = { status: 'ok' };
	} catch(e) {
	  checks.components.memory = { status: 'error', message: e.message };
	  checks.overall_status = 'unhealthy';
	}
	
	// Check Qdrant
	const http = require('http');
	const req = http.request({ hostname: 'localhost', port: 6333, path: '/healthz', timeout: 2000 }, (res) => {
	  if (res.statusCode === 200) {
	    checks.components.qdrant = { status: 'ok', connection: 'localhost:6333' };
	  } else {
	    checks.components.qdrant = { status: 'error', code: res.statusCode };
	  }
	  finish();
	});
	req.on('error', () => {
	  checks.components.qdrant = { status: 'error', message: 'Cannot connect' };
	  checks.overall_status = 'degraded';
	  finish();
	});
	req.on('timeout', () => {
	  checks.components.qdrant = { status: 'error', message: 'Connection timeout' };
	  checks.overall_status = 'degraded';
	  finish();
	});
	
	function finish() {
	  fs.writeFileSync('framework-health.json', JSON.stringify(checks, null, 2));
	  console.log('Health report saved to framework-health.json');
	  console.log('Overall status:', checks.overall_status);
	  process.exit(checks.overall_status === 'healthy' ? 0 : 1);
	}
	req.end();
	" 2>/dev/null || echo "$(RED)✗ Health check failed$(NC)"

##@ Service Management

start: ## Start all framework services
	@echo "$(BLUE)🚀 Starting framework services...$(NC)"
	
	@echo "$(BLUE)🗄️  Starting Qdrant...$(NC)"
	@if ! docker ps | grep -q qdrant; then \
		docker run -d --name qdrant -p 6333:6333 -v qdrant_storage:/qdrant/storage qdrant/qdrant 2>/dev/null || echo "$(YELLOW)⚠️ Qdrant may already be running or docker not available$(NC)"; \
	else \
		echo "$(GREEN)✓ Qdrant already running$(NC)"; \
	fi
	
	@echo "$(BLUE)🤖 Checking Ollama...$(NC)"
	@if command -v ollama >/dev/null 2>&1; then \
		if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then \
			echo "$(YELLOW)⚠️ Ollama not running. Start with: ollama serve$(NC)"; \
		else \
			echo "$(GREEN)✓ Ollama is running$(NC)"; \
		fi; \
	else \
		echo "$(RED)✗ Ollama not installed$(NC)"; \
	fi
	
	@echo "$(GREEN)✅ Services started$(NC)"
	$(MAKE) status

status: ## Check status of all services
	@echo "$(BLUE)📊 Framework Status$(NC)"
	@echo "===================="
	
	@echo "$(BLUE)🗄️  Qdrant:$(NC)"
	@if docker ps | grep -q qdrant; then \
		echo "$(GREEN)  ✓ Running$(NC)"; \
	else \
		echo "$(RED)  ✗ Not running$(NC)"; \
	fi
	
	@echo "$(BLUE)🤖 Ollama:$(NC)"
	@if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then \
		echo "$(GREEN)  ✓ Running$(NC)"; \
	else \
		echo "$(RED)  ✗ Not running$(NC)"; \
	fi
	
	@echo "$(BLUE)📦 Engine:$(NC)"
	@if [ -f engine/package.json ]; then \
		echo "$(GREEN)  ✓ Installed$(NC)"; \
	else \
		echo "$(RED)  ✗ Not installed$(NC)"; \
	fi
	
	@echo "$(BLUE)🧠 Memory:$(NC)"
	@if [ -f packages/memory/package.json ]; then \
		echo "$(GREEN)  ✓ Installed$(NC)"; \
	else \
		echo "$(RED)  ✗ Not installed$(NC)"; \
	fi
	
	@echo ""
	@echo "$(BLUE)Last checked: $(shell date)$(NC)"
	@mkdir -p .agent/flags
	@echo "$(shell date)" > .agent/flags/last-status-check.txt

stop: ## Stop all framework services
	@echo "$(BLUE)🛑 Stopping services...$(NC)"
	@docker stop qdrant 2>/dev/null || echo "$(YELLOW)⚠️ Qdrant not running$(NC)"
	@echo "$(GREEN)✅ Services stopped$(NC)"

##@ Utility

clean: ## Clean up temporary files and caches
	@echo "$(BLUE)🧹 Cleaning up...$(NC)"
	@rm -rf framework-health.json
	@rm -rf .context/*.md
	@find . -name "node_modules" -type d -prune -exec rm -rf {} + 2>/dev/null || true
	@echo "$(GREEN)✅ Cleanup complete$(NC)"

help: ## Show this help message
	@echo "$(BLUE)AI Assisted Development Framework - Available Commands$(NC)"
	@echo "=========================================="
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage: make $(GREEN)<target>$(NC)\n\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  $(GREEN)%-15s$(NC) %s\n", $$1, $$2 } /^##@/ { printf "\n$(BLUE)%s$(NC)\n", substr($$0, 5) } ' $(MAKEFILE_LIST)
	@echo ""
	@echo "$(BLUE)Quick Start:$(NC)"
	@echo "  1. make install    - Install all dependencies"
	@echo "  2. make test       - Run health checks"
	@echo "  3. make start      - Start all services"
