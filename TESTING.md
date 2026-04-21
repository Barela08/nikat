# NIKAT Testing Guide

## Testing Strategy

### 1. Manual Testing

#### User Flow Testing
```
Test Case 1: Language Selection
- Launch app
- Select language (Hindi/English/Marathi)
- Verify language changes throughout app
- Go back and change language

Test Case 2: Login Flow
- Enter phone number
- Get OTP (mock in development)
- Enter OTP
- Verify login success
- Check user data persists

Test Case 3: Shop Browsing
- Go to home screen
- Select category
- View shop list
- Verify shop details (locked if not subscribed)
- Try to call/WhatsApp

Test Case 4: Subscription
- Click subscribe button
- Select plan
- Complete payment
- Verify subscription active
- Check unlock status changed

Test Case 5: Shop Registration
- Click add shop button
- Fill shop details
- Submit form
- Verify shop created
- Check "Subscribe to activate" message
```

### 2. Unit Testing (Jest)

#### Setup
```bash
npm install --save-dev jest @testing-library/react-native @testing-library/jest-native
```

#### Example Tests
```javascript
// tests/validation.test.js
import { validatePhone, validateName } from '../src/utils/validation';

describe('Validation Utils', () => {
  test('validatePhone: valid number', () => {
    expect(validatePhone('9876543210')).toBe(true);
  });

  test('validatePhone: invalid number', () => {
    expect(validatePhone('123')).toBe(false);
  });

  test('validateName: valid name', () => {
    expect(validateName('Ram Kumar')).toBe(true);
  });

  test('validateName: invalid name', () => {
    expect(validateName('a')).toBe(false);
  });
});
```

#### Run Tests
```bash
npm test -- --watch
```

### 3. Integration Testing

#### Firebase Integration
```javascript
// tests/firebase.integration.test.js
import { auth, db } from '../src/config/firebase';

describe('Firebase Integration', () => {
  test('should connect to Firebase', async () => {
    expect(auth).toBeDefined();
    expect(db).toBeDefined();
  });

  test('should create user document', async () => {
    const userId = 'test-user-123';
    const userData = {
      name: 'Test User',
      phone: '9999999999',
      role: 'user',
    };
    
    // Test implementation
  });
});
```

### 4. Performance Testing

#### Metrics to Track
- App load time
- Screen transition time
- Shop list load time
- Payment processing time

#### React Native Profiler
```
In Development:
Press 'd' → Select "Profiler"
```

### 5. Accessibility Testing

#### Checklist
- [ ] All buttons have minimum 48px touch target
- [ ] Text colors have sufficient contrast
- [ ] Font sizes are readable (minimum 14px)
- [ ] App works with screen readers (TalkBack/VoiceOver)

#### Test Commands
```bash
# Enable screen reader testing
# iOS: Settings > Accessibility > VoiceOver
# Android: Settings > Accessibility > TalkBack
```

### 6. Device Testing

#### Test Devices
- Android 10+
- iOS 12+
- Various screen sizes (small, medium, large)
- Low-end devices (2GB RAM, slow network)

#### Test on Multiple Devices
```bash
# Connect multiple Android devices
adb devices

# Run on specific device
adb -s DEVICE_ID logcat

# Test on iOS (Mac only)
npm run ios
```

### 7. Network Testing

#### Test on Slow Networks
```
Using Android Emulator:
1. Open Emulator Settings
2. Go to "Network" tab
3. Set "Network Speed" to "GPRS"
4. Test app performance
```

#### Test Offline
```bash
# Android: Emulator > Extended controls > Network
# iOS: Developer Settings > Network Link Conditioner
```

### 8. Security Testing

#### Validate Input Handling
```javascript
// Malicious inputs to test
const testInputs = [
  '<script>alert("xss")</script>',
  "'; DROP TABLE users; --",
  '../../../etc/passwd',
  '${process.env.SECRET_KEY}',
];

testInputs.forEach(input => {
  expect(() => sanitizeInput(input)).not.toThrow();
});
```

#### Test Authentication
- [ ] OTP timeout works
- [ ] Invalid OTP rejected
- [ ] Logout clears session
- [ ] Auto-login on restart works

### 9. Regression Testing

#### Critical Paths
1. Login → Home → Browse Shops
2. Register Shop → Subscribe → Activate
3. Browse → Unlock → Call/WhatsApp

#### Before Each Release
- Run all manual test cases
- Test on 3+ devices
- Verify payment flow
- Check all languages

## Debugging

### Debug Console
```bash
npm start
# Press 'd' to open debugger
```

### React DevTools
```bash
npm install -g react-devtools
# In another terminal
react-devtools
```

### Firebase Emulator
```bash
firebase emulators:start
# App will connect to local Firebase
```

## Test Reporting

### Create Test Report
```markdown
# Test Report - NIKAT v1.0.0

## Date: 2024-04-21
## Tester: [Name]
## Device: Android 12, Samsung Galaxy S21

### Passed Tests
- [ ] Language selection
- [ ] Login OTP flow
- [ ] Shop browsing
- [ ] Subscription purchase

### Failed Tests
- [ ] Issue #1: Payment timeout on slow network
- [ ] Issue #2: UI glitch on landscape mode

### Recommendations
1. Add retry mechanism for payments
2. Fix orientation handling
3. Optimize shop list load time
```

---

**Happy Testing!** 🧪
