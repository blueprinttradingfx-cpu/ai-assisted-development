# Makefile for AI Assisted Development Framework
# Provides automated installation and management commands

.PHONY: help install setup-index setup-ollama setup-qdrant setup-all test clean build run-agent run-pipeline

# Default target
help:
	@echo "AI Assisted Development Framework - Make Commands"
	@echo ""
	@echo "Installation:"
	@echo "  install         - Install all dependencies"
	@echo "  setup-all       - Complete setup (dependencies + services)"
	@echo "  setup-index     - Index repository"
	@echo "  setup-ollama    - Setup Ollama for embeddings"
	@echo "  setup-qdrant    - Setup Qdrant for vector storage"
	@echo ""
	@echo "Development:"
	@echo "  build           - Build TypeScript project"
	@echo "  test            - Run tests"
	@echo "  clean           - Clean build artifacts"
	@echo ""
	@echo "Repository Intelligence:"
	@echo "  index           - Index codebase"
	@echo "  index-watch     - Index with file watching"
	@echo "  embed           - Generate embeddings"
	@echo "  search QUERY    - Search code"
	@echo "  research QUERY  - Research with AI"
	@echo "  overview        - Project overview"
	@echo ""
	@echo "Agent System:"
	@echo "  run-agent TICKET    - Run researcher agent"
	@echo "  run-pipeline TICKET  - Run complete agent pipeline"

# Installation commands
install:
	@echo "📦 Installing dependencies..."
	npm install
	@echo "✅ Dependencies installed"

setup-all: install setup-index setup-ollama setup-qdrant
	@echo "🎉 Complete setup finished!"

setup-index:
	@echo "📊 Indexing repository..."
	node dist/index.js index-repo -p ../web-applications
	@echo "✅ Repository indexed"

setup-ollama:
	@echo "🤖 Setting up Ollama..."
	@if ! command -v ollama &> /dev/null; then \
		echo "❌ Ollama not found. Please install from https://ollama.ai"; \
		exit 1; \
	fi
	@echo "📥 Pulling embedding model..."
	ollama pull nomic-embed-text
	@echo "🚀 Starting Ollama service..."
	ollama serve &
	@echo "✅ Ollama setup complete"

setup-qdrant:
	@echo "🗄️  Setting up Qdrant..."
	@if ! command -v docker &> /dev/null; then \
		echo "❌ Docker not found. Please install Docker"; \
		exit 1; \
	fi
	@echo "🐳 Starting Qdrant container..."
	docker run -d --name qdrant -p 6333:6333 qdrant/qdrant
	@echo "✅ Qdrant setup complete"

# Development commands
build:
	@echo "🔨 Building TypeScript project..."
	npm run build
	@echo "✅ Build complete"

test:
	@echo "🧪 Running tests..."
	npm test
	@echo "✅ Tests complete"

clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf dist/
	rm -rf node_modules/
	@echo "✅ Clean complete"

# Repository Intelligence commands
index: build
	@echo "📊 Indexing repository..."
	node dist/index.js index-repo -p ../web-applications

index-watch: build
	@echo "👀 Indexing with file watching..."
	node dist/index.js index-repo -p ../web-applications --watch

embed: build
	@echo "🔤 Generating embeddings..."
	node dist/index.js embed

search: build
	@if [ -z "$(QUERY)" ]; then \
		echo "❌ Please provide a search query: make search QUERY='your query'"; \
		exit 1; \
	fi
	@echo "🔍 Searching for: $(QUERY)"
	node dist/index.js search "$(QUERY)"

research: build
	@if [ -z "$(QUERY)" ]; then \
		echo "❌ Please provide a research query: make research QUERY='your query'"; \
		exit 1; \
	fi
	@echo "🔬 Researching: $(QUERY)"
	node dist/index.js repo-research "$(QUERY)" --query

overview: build
	@echo "📊 Generating project overview..."
	node dist/index.js overview

# Agent System commands
run-agent: build
	@if [ -z "$(TICKET)" ]; then \
		echo "❌ Please provide a ticket ID: make run-agent TICKET=T-001"; \
		exit 1; \
	fi
	@echo "🤖 Running researcher agent for ticket: $(TICKET)"
	node dist/agent_orchestrator.js research "$(TICKET)"

run-pipeline: build
	@if [ -z "$(TICKET)" ]; then \
		echo "❌ Please provide a ticket ID: make run-pipeline TICKET=T-001"; \
		exit 1; \
	fi
	@echo "🔄 Running complete agent pipeline for ticket: $(TICKET)"
	node dist/agent_orchestrator.js pipeline "$(TICKET)"

# Dependency checker
check-deps:
	@echo "🔍 Checking dependencies..."
	@echo "Node.js: $$(node --version)"
	@echo "npm: $$(npm --version)"
	@if command -v ollama &> /dev/null; then \
		echo "✅ Ollama: $$(ollama --version)"; \
	else \
		echo "❌ Ollama: not found"; \
	fi
	@if command -v docker &> /dev/null; then \
		echo "✅ Docker: $$(docker --version)"; \
	else \
		echo "❌ Docker: not found"; \
	fi

# Quick start for new users
quick-start: check-deps setup-all
	@echo ""
	@echo "🎉 Quick start complete!"
	@echo ""
	@echo "Next steps:"
	@echo "1. Try a search: make search QUERY='authentication'"
	@echo "2. Research a ticket: make research QUERY='T-001'"
	@echo "3. Get overview: make overview"
	@echo "4. Run agent: make run-agent TICKET=T-001"
