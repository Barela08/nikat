# NIKAT Troubleshooting Guide

## Common Issues & Solutions

### Setup Issues

#### 1. npm install fails
**Error**: `npm ERR! gyp ERR! build error`
```bash
# Solution:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 2. Expo not found
**Error**: `expo: command not found`
```bash
# Solution:
npm install -g expo-cli
# Verify
expo --version
```

#### 3. Node modules mismatch
**Error**: `npm ERR! The requested URL returned error: 404`
```bash
# Solution:
npm update
npm install
```

### Runtime Issues

#### 4. Firebase connection error
**Error**: `Cannot connect to Firebase`
```bash
# Check:
1. Verify .env has correct Firebase credentials
2. Check internet connection
3. Verify Firebase project is active
4. Check Firebase security rules allow read/write

# Reset Firebase:
eas credentials
```

#### 5. OTP not sending
**Error**: `Error sending OTP`
```bash
# Causes:
1. Firebase Phone Authentication not enabled
2. reCAPTCHA not configured
3. Development/test phone number

# Solution:
# Use Firebase Emulator for testing:
firebase emulators:start

# Connect app to emulator:
# In Development, auth will use emulator
```

#### 6. AsyncStorage data not persisting
**Error**: `AsyncStorage returns null`
```bash
# Causes:
1. App cache cleared
2. Storage permission denied
3. Insufficient storage space

# Solution:
// Debug storage
import AsyncStorage from '@react-native-async-storage/async-storage';

AsyncStorage.getAllKeys().then(keys => {
  console.log('Stored keys:', keys);
});
```

### UI/UX Issues

#### 7. Skeleton loader never disappears
**Error**: `Loading state stuck`
```javascript
// Check:
// 1. API call completes
// 2. Loading state set to false
// 3. No infinite loop in useEffect

// Fix:
useEffect(() => {
  loadData();
}, []); // Add dependencies
```

#### 8. Navigation not working
**Error**: `Cannot navigate to screen`
```javascript
// Ensure:
1. Screen registered in navigator
2. Navigation params match
3. Navigation ref properly initialized

// Debug:
console.log('Navigating to:', screenName);
navigation.navigate('ShopList', { params });
```

#### 9. Buttons disabled unexpectedly
**Error**: "Button not clickable"
```javascript
// Check:
1. Loading state is true
2. Disabled prop set
3. TouchableOpacity activeOpacity set

// Fix validate input before disabling
const isButtonEnabled = input.length > 0 && !loading;
```

### Performance Issues

#### 10. App is slow/laggy
**Error**: Low FPS, frame drops
```bash
# Causes:
1. Too many re-renders
2. Large images not compressed
3. FlatList not optimized

# Solutions:
# 1. Use React DevTools Profiler
# 2. Memoize components
import React, { memo } from 'react';
const Component = memo(MyComponent);

# 3. Use FlatList with keyExtractor
<FlatList keyExtractor={item => item.id} />

# 4. Compress images
# Use ImageResizer or online tools
```

#### 11. Long list is slow
**Error**: Shop list lags when scrolling
```javascript
// Solutions:
// 1. Use FlatList with initialNumToRender
<FlatList initialNumToRender={10} />

// 2. Implement pagination
const [page, setPage] = useState(1);
const handleLoadMore = () => setPage(page + 1);

// 3. Optimize renderItem
const renderShop = useCallback(({ item }) => (
  <ShopCard shop={item} />
), []);
```

### Network Issues

#### 12. Network timeout
**Error**: `Request timeout after 30s`
```javascript
// Increase timeout:
const controller = new AbortController();
const timeoutId = setTimeout(
  () => controller.abort(),
  60000 // 60 seconds
);

fetch(url, { signal: controller.signal })
```

#### 13. No internet connectivity
**Error**: "Network error"
```javascript
// Check connectivity:
import NetInfo from "@react-native-community/netinfo";

NetInfo.fetch().then(state => {
  if (!state.isConnected) {
    showErrorMessage('No internet');
  }
});
```

#### 14. CORS errors
**Error**: `Access-Control-Allow-Origin`
```bash
# Causes:
1. API doesn't allow requests from app
2. Wrong API endpoint
3. Missing headers

# Solution:
# Add CORS headers in Firebase Cloud Functions
response.set('Access-Control-Allow-Origin', '*');
```

### Build Issues

#### 15. Build fails with Android
**Error**: `Gradle build failed`
```bash
# Solutions:
cd android
./gradlew clean
./gradlew build
cd ..

# Or:
eas build -p android --profile preview --local --verbose
```

#### 16. APK too large
**Error**: `App bundle exceeds 100MB`
```bash
# Solutions:
# 1. Enable ProGuard minification
# 2. Remove unused dependencies
npm audit
npm prune

# 3. Use code splitting
# 4. Compress images
```

#### 17. Code signing fails
**Error**: `Certificate error during build`
```bash
# Solution:
eas credentials
# Follow prompts to generate new credentials
```

### Data Issues

#### 18. Firestore data not syncing
**Error**: `Data not updating in realtime`
```javascript
// Use onSnapshot for real-time updates:
import { onSnapshot } from 'firebase/firestore';

onSnapshot(shopRef, (doc) => {
  console.log('Shop updated:', doc.data());
});
```

#### 19. Payment not creating record
**Error**: `Payment record not in database`
```javascript
// Check:
1. User ID is correct
2. Database write permissions
3. Firebase rules allow write

// Debug:
const payment = await PaymentService.createPayment(...);
console.log('Payment created:', payment);
```

## Getting Help

### 1. Check Logs
```bash
# Android logs
adb logcat

# Expo logs
expo start --verbose
```

### 2. Search Issues
- GitHub Issues: Search existing issues
- Stack Overflow: Tag with "react-native"
- Firebase Docs: Check documentation

### 3. Create Issue Report
Include:
- Error message
- Device/Android version
- Steps to reproduce
- Code snippet
- Screenshot

### 4. Contact Support
- Email: support@hackifypro.com
- GitHub Discussions: [Project URL]
- Slack/Discord: [Add community link]

## Advanced Debugging

### Remote Debugging
```bash
# Start debugger
expo start
# Press 'd' in terminal
# Open Chrome DevTools
```

### React Native Debugger
```bash
# Download from:
https://github.com/jhen0409/react-native-debugger

# Launch with:
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

### Firebase Profiler
```bash
# Monitor performance:
# Console > Performance tab > Custom events
```

---

**Still having issues?** Create a detailed issue report on GitHub!
