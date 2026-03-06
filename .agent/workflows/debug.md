---
description: Structured state-tracing for bug hunting and systematic debugging
---

Initiate the systematic debugging protocol for the reported issue.

**Workflow:**

1. **Clarify Expectations**: Identify exactly what the expected behavior is versus the actual behavior based on the user report or failing test.
2. **State Tracing**: DO NOT guess. Locate the exact logs, error traces, or state output where the failure occurs.
3. **Identify Context**: Read the corresponding `requirements/README.md` and `design/README.md` to ensure the logic was built correctly.
4. **Draft a Fix Plan**: Propose the specific code changes required to resolve the bug, verifying it does not violate the Zero-Mock policy or existing schemas.
5. **Execution**: Implement the fix.
6. **Verification**: Write or run a test explicitly proving the bug is resolved before concluding the debug loop.
