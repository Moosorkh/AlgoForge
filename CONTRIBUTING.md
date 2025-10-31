# Contributing to AlgoForge

Thank you for your interest in contributing to AlgoForge! This document provides guidelines for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Assume good intentions

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/AlgoForge.git`
3. Add upstream remote: `git remote add upstream https://github.com/original/AlgoForge.git`
4. Follow the [QUICKSTART.md](QUICKSTART.md) guide to set up your development environment

## How to Contribute

### Reporting Bugs

Before creating a bug report:

- Check existing issues to avoid duplicates
- Use the latest version to confirm the bug still exists

When reporting a bug, include:

- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node version, etc.)

### Suggesting Features

Feature suggestions are welcome! Please:

- Check existing issues for similar suggestions
- Provide clear use case and benefits
- Include mockups or examples if possible

### Adding New Algorithms

To add a new algorithm:

1. **Database Entry**

```sql
INSERT INTO algorithms (name, description, category, difficulty)
VALUES ('Your Algorithm', 'Description...', 'Sorting', 'Intermediate');
```

2. **Create Lessons**

```sql
INSERT INTO lessons (algorithm_id, title, content, lesson_type, order_index)
VALUES
  (algorithm_id, 'Introduction', 'Content...', 'Theory', 1),
  (algorithm_id, 'Visualization', 'Content...', 'Visualization', 2),
  (algorithm_id, 'Practice', 'Content...', 'Game', 3),
  (algorithm_id, 'Quiz', 'Content...', 'Quiz', 4);
```

3. **Create Visualization Component**

- Place in `frontend/src/components/visualizations/`
- Use D3.js for animations
- Include controls and explanations
- Follow existing component patterns

4. **Add Quiz Questions**

- Create in `frontend/src/components/quiz/`
- Include explanations for answers
- Cover key concepts

5. **Create Interactive Game**

- Place in `frontend/src/components/games/`
- Make it engaging and educational
- Include clear instructions

### Improving Visualizations

When improving visualizations:

- Ensure smooth animations
- Add speed controls
- Include step-by-step explanations
- Make it responsive
- Test on different screen sizes

## Development Workflow

1. **Create a branch**

```bash
git checkout -b feature/algorithm-name
# or
git checkout -b fix/issue-description
```

2. **Make changes**

- Write code following our standards
- Add tests if applicable
- Update documentation

3. **Test your changes**

```bash
# Run backend
cd backend && npm run dev

# Run frontend
cd frontend && npm run dev

# Test manually
# Check for TypeScript errors
# Test on different browsers
```

4. **Commit your changes**

```bash
git add .
git commit -m "Add: merge sort visualization"
```

5. **Push to your fork**

```bash
git push origin feature/algorithm-name
```

6. **Create Pull Request**

- Use clear, descriptive title
- Describe changes and motivation
- Reference related issues
- Add screenshots/GIFs for UI changes

## Coding Standards

### TypeScript/JavaScript

- Use TypeScript for type safety
- Follow functional programming patterns
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

```typescript
// Good
const sortArray = (arr: number[]): number[] => {
  return arr.sort((a, b) => a - b);
};

// Bad
const s = (a: any) => a.sort((x, y) => x - y);
```

### React Components

- Use functional components with hooks
- Keep components focused and reusable
- Use proper TypeScript types for props
- Implement proper error boundaries

```typescript
// Good
interface AlgorithmCardProps {
  algorithm: Algorithm;
}

const AlgorithmCard: React.FC<AlgorithmCardProps> = ({ algorithm }) => {
  return <div>{algorithm.name}</div>;
};

// Bad
const AlgorithmCard = (props: any) => {
  return <div>{props.algorithm.name}</div>;
};
```

### CSS/Styling

- Use TailwindCSS utility classes
- Follow mobile-first approach
- Ensure accessibility
- Test dark mode if implementing

### Database

- Write clear, readable SQL
- Include comments for complex queries
- Use prepared statements for security
- Add appropriate indexes

## Commit Guidelines

### Commit Message Format

```
Type: Short description

Longer description if needed

Fixes #issue-number
```

### Types

- `Add:` New feature or algorithm
- `Fix:` Bug fix
- `Update:` Update existing feature
- `Refactor:` Code refactoring
- `Docs:` Documentation changes
- `Style:` Formatting changes
- `Test:` Adding tests
- `Chore:` Maintenance tasks

### Examples

```bash
Add: heap sort algorithm with visualization

Implemented heap sort algorithm including:
- Theory lesson
- Interactive visualization with D3.js
- Sorting game
- Comprehensive quiz

Fixes #42

---

Fix: binary search edge case handling

Fixed issue where binary search failed on arrays
with duplicate elements.

Fixes #38

---

Update: improve bubble sort animation speed

Added speed control slider and made animations
smoother by using requestAnimationFrame.
```

## Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style guidelines
- [ ] TypeScript compiles without errors
- [ ] No console errors or warnings
- [ ] Tested on Chrome, Firefox, Safari
- [ ] Responsive design works on mobile
- [ ] Documentation updated if needed
- [ ] Commit messages follow guidelines
- [ ] No merge conflicts with main branch

## Review Process

1. Maintainer reviews the PR
2. Feedback is provided if changes needed
3. You make requested changes
4. PR is approved and merged

## Questions?

Feel free to:

- Open an issue for questions
- Join our discussions
- Reach out to maintainers

Thank you for contributing to AlgoForge! 🚀
