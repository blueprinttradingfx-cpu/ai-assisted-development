import { Command } from 'commander';
import { ResearcherAgent } from '../../agents/researcher_agent';

export const researchCommand = new Command('repo-research')
  .description('Research ticket or query using Repository Intelligence')
  .argument('<ticketOrQuery>', 'Ticket ID or search query')
  .option('-q, --query', 'Treat input as search query instead of ticket', false)
  .option('-o, --output <file>', 'Output research results to file (optional)')
  .action(async (ticketOrQuery, options) => {
    const researcher = new ResearcherAgent();

    try {
      let results: any;

      if (options.query) {
        // Research query
        console.log(`🔍 Researching query: "${ticketOrQuery}"\n`);
        results = await researcher.researchQuery(ticketOrQuery);
        
        console.log('\n📊 Research Results:\n');
        
        console.log('🔍 Context:');
        if (results.context && results.context.files) {
          console.log(`   Files: ${results.context.files.length} relevant sections`);
          results.context.files.slice(0, 5).forEach((file: any, i: number) => {
            console.log(`     ${i + 1}. ${file.path} (${(file.relevance * 100).toFixed(1)}% relevance)`);
          });
        }
        
        if (results.context && results.context.patterns && results.context.patterns.length > 0) {
          console.log(`\n🏗️  Patterns: ${results.context.patterns.map((p: any) => p.name).join(', ')}`);
        }
        
        console.log('\n💡 Insights:');
        if (results.insights) {
          results.insights.forEach((insight: string, i: number) => {
            console.log(`   ${i + 1}. ${insight}`);
          });
        }

      } else {
        // Research ticket
        console.log(`🎫 Researching ticket: ${ticketOrQuery}\n`);
        results = await researcher.researchTicket(ticketOrQuery);
        
        console.log('\n📊 Research Results:\n');
        
        console.log('🎫 Ticket Context:');
        if (results.context) {
          console.log(`   Files: ${results.context.files.length} relevant files`);
          console.log(`   Symbols: ${results.context.symbols.length} symbols`);
          if (results.context.patterns) {
            console.log(`   Patterns: ${results.context.patterns.map((p: any) => p.name).join(', ')}`);
          }
          console.log(`   Confidence: ${(results.context.confidence * 100).toFixed(1)}%`);
        }
        
        console.log('\n💡 Insights:');
        if (results.insights) {
          results.insights.forEach((insight: string, i: number) => {
            console.log(`   ${i + 1}. ${insight}`);
          });
        }
        
        console.log('\n📋 Recommendations:');
        if (results.recommendations) {
          results.recommendations.forEach((rec: string, i: number) => {
            console.log(`   ${i + 1}. ${rec}`);
          });
        }
        
        console.log('\n🎯 Suggested Skills:');
        if (results.context && results.context.skillSuggestions) {
          results.context.skillSuggestions.forEach((skill: string, i: number) => {
            console.log(`   ${i + 1}. ${skill}`);
          });
        }
      }

      // Save to file if requested
      if (options.output && results) {
        const fs = require('fs');
        fs.writeFileSync(options.output, JSON.stringify(results, null, 2));
        console.log(`\n💾 Results saved to ${options.output}`);
      }

    } catch (error) {
      console.error('❌ Research failed:', error);
      process.exit(1);
    } finally {
      researcher.close();
    }
  });

export const overviewCommand = new Command('overview')
  .description('Get project overview with Repository Intelligence')
  .action(async () => {
    const researcher = new ResearcherAgent();

    try {
      console.log('📊 Generating project overview...\n');
      
      const overview = await researcher.getProjectOverview();
      
      console.log('🏗️  Architectural Patterns:');
      if (overview.patterns) {
        overview.patterns.forEach((pattern: any, i: number) => {
          console.log(`   ${i + 1}. ${pattern.name} (${(pattern.confidence * 100).toFixed(1)}% confidence)`);
          console.log(`      ${pattern.description}`);
        });
      }
      
      console.log('\n📈 Statistics:');
      if (overview.stats) {
        console.log(`   Files: ${overview.stats.totalFiles}`);
        console.log(`   Symbols: ${overview.stats.totalSymbols}`);
        console.log(`   Chunks: ${overview.stats.totalChunks}`);
        console.log(`   Vectors: ${overview.stats.vectorCount}`);
      }
      
      console.log('\n💡 Insights:');
      if (overview.insights) {
        overview.insights.forEach((insight: string, i: number) => {
          console.log(`   ${i + 1}. ${insight}`);
        });
      }
      
      console.log('\n📋 Recommendations:');
      if (overview.recommendations) {
        overview.recommendations.forEach((rec: string, i: number) => {
          console.log(`   ${i + 1}. ${rec}`);
        });
      }

    } catch (error) {
      console.error('❌ Overview generation failed:', error);
      process.exit(1);
    } finally {
      researcher.close();
    }
  });
