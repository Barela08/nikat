# NIKAT Development Guide

## Environment Setup

### 1. Install Node.js
- Download from https://nodejs.org/ (v16 or higher)
- Verify: `node --version` and `npm --version`

### 2. Install Expo CLI
```bash
npm install -g expo-cli
```

### 3. Create Firebase Project
1. Go to https://firebase.google.com
2. Create new project
3. Enable Authentication (Phone)
4. Create Firestore Database
5. Copy credentials to `.env`

### 4. Setup Android Development (Optional)
- Install Android Studio
- Set up Android Emulator
- Add SDK paths to environment variables

## Local Development

### Start Development Server
```bash
npm start
```

### Debug in Browser
- Open http://localhost:19000
- Scan QR code with Expo Go app

### Hot Reload
- Press `r` for refresh
- Press `a` for Android
- Press `i` for iOS

## File Naming Conventions

- **Screens**: PascalCase + "Screen" suffix
  - `HomeScreen.js`, `LoginScreen.js`
- **Components**: PascalCase
  - `Button.js`, `ShopCard.js`
- **Services**: camelCase + "Service" suffix
  - `authService.js`, `shopService.js`
- **Hooks**: camelCase + "use" prefix
  - `useAuth.js`, `useLanguage.js`
- **Utils**: camelCase
  - `validation.js`, `helpers.js`

## Code Style

### React Components
```javascript
import React, { useState } from 'react';
import { View, Text } from 'react-native';

const MyComponent = ({ props }) => {
  const [state, setState] = useState(null);

  const handleAction = () => {
    // Logic
  };

  return (
    <View>
      <Text>Component</Text>
    </View>
  );
};

export default MyComponent;
```

### Error Handling
```javascript
try {
  // Action
} catch (error) {
  console.error('Descriptive error:', error);
  // User feedback
} finally {
  // Cleanup
}
```

### API Calls
```javascript
const fetchData = async () => {
  try {
    setLoading(true);
    const data = await service.getData();
    setData(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

## Testing

### Unit Tests (Add Jest)
```bash
npm install --save-dev jest @testing-library/react-native
```

### Component Testing
Test common user flows:
- Language selection
- Login flow
- Shop browsing
- Subscription purchase

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/feature-name

# Make changes and commit
git add .
git commit -m "feat: brief description"

# Push to remote
git push origin feature/feature-name

# Create Pull Request
```

## Deployment Checklist

- [ ] All secrets in `.env`
- [ ] Firebase rules updated
- [ ] Error handling complete
- [ ] Loading states implemented
- [ ] Performance optimized
- [ ] Security audit done
- [ ] README updated
- [ ] No console logs in production

## Performance Tips

1. **Reduce Bundle Size**
   - Tree-shake unused code
   - Lazy load screens
   - Compress images

2. **Network Optimization**
   - Implement pagination
   - Cache responses
   - Batch database queries

3. **UI Performance**
   - Use FlatList for lists
   - Memoize expensive components
   - Avoid inline styles

## Debugging

### Chrome DevTools
```bash
npm start
# Press 'd' in terminal
# Open Chrome DevTools
```

### Firebase Debugging
```bash
firebase emulators:start --debug
```

### React Native Debugger
- Download from: https://github.com/jhen0409/react-native-debugger
- Open app with inspector enabled

## Resources

- React Native Docs: https://reactnative.dev
- Expo Docs: https://docs.expo.dev
- Firebase Docs: https://firebase.google.com/docs
- React Navigation: https://reactnavigation.org

---

Happy coding! 🚀
