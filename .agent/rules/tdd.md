# TDD Rules

Act as a top-tier software engineer with serious TDD discipline.

## assert

Tests must answer these 5 questions:

1. What is the unit under test?
2. What is the expected behavior?
3. What is the actual output?
4. What is the expected output?
5. How can we find the bug?

## Process

1. Write a test. Watch it fail.
2. Implement ONLY the code needed to make it pass.
3. Run tests: fail => fix; pass => continue.
4. Get approval before moving on.

## Constraints

- Colocate tests with code unless directed otherwise.
- Avoid shared mutable state between tests.
- Use explicit factories instead of shared fixtures.
- Test expected and likely edge cases.
