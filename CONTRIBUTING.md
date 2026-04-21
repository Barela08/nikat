# Contributing to NIKAT

Thank you for interest in contributing to NIKAT! This guide will help you get started.

## Code of Conduct

- Be respectful and inclusive
- No harassment or discrimination
- Focus on constructive feedback
- Respect privacy and security

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch: `git checkout -b feature/my-feature`
4. Make your changes
5. Test thoroughly
6. Commit with clear messages
7. Push to your fork
8. Create a Pull Request

## Development Setup

```bash
npm install
npm start
# Make changes to code
# Test on your device
```

## Code Style

### JavaScript
```javascript
// Use const/let instead of var
const myVariable = 'value';

// Use arrow functions
const handleClick = () => {
  // code
};

// Use async/await instead of callbacks
const fetchData = async () => {
  const data = await service.getData();
};
```

### React Components
```javascript
// Use functional components with hooks
const MyComponent = () => {
  const [state, setState] = useState(null);
  
  const handleAction = () => {
    // code
  };

  return (
    <View>
      {/* JSX */}
    </View>
  );
};

export default MyComponent;
```

### File Organization
```
src/
├── screens/MyNewScreen.js
├── components/MyNewComponent.js
├── services/myNewService.js
└── utils/myNewUtil.js
```

## Testing

All contributions must include:

```javascript
// Test file: src/utils/__tests__/myUtil.test.js
import { myFunction } from '../myUtil';

describe('myUtil', () => {
  test('should do something', () => {
    expect(myFunction()).toBe('expected');
  });
});
```

Run tests:
```bash
npm test
```

## Commits

Write clear commit messages:

```
feat: Add new feature
fix: Fix bug in component
docs: Update documentation
style: Format code
refactor: Refactor component
test: Add tests
chore: Update dependencies
```

Example:
```bash
git commit -m "feat: add user profile editing"
```

## Pull Request Guidelines

1. **Title**: Clear, descriptive title
2. **Description**: Explain changes and why
3. **Testing**: Describe how you tested
4. **Screenshots**: Include if UI changes
5. **Checklist**:
   - [ ] Code follows style guide
   - [ ] Tests pass
   - [ ] No console errors
   - [ ] Documentation updated
   - [ ] No breaking changes

## Types of Contributions

### Bug Reports
1. Describe the bug
2. Steps to reproduce
3. Expected behavior
4. Actual behavior
5. Device/OS info
6. Screenshots

### Feature Requests
1. Clear description
2. Motivation/use case
3. Proposed solution
4. Alternative solutions
5. Additional context

### Documentation
- Fix typos
- Improve clarity
- Add examples
- Add guides

### Code
- Bug fixes
- New features
- Performance improvements
- Code cleanup

## Review Process

1. Automated tests run
2. Code review by maintainers
3. Feedback and discussion
4. Approval and merge

## Questions?

- Check existing issues
- Create a new issue
- Email: support@hackifypro.com

---

**Thank you for contributing!** 🙏
