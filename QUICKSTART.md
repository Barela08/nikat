# NIKAT Quick Start Guide

## 5-Minute Setup

### Step 1: Clone Project
```bash
cd NIKAT
```

### Step 2: Install Dependencies
```bash
# Windows
setup.bat

# Mac/Linux
bash setup.sh

# Or manual
npm install
```

### Step 3: Configure Firebase
1. Go to https://firebase.google.com
2. Create new project
3. Enable:
   - Authentication (Phone)
   - Firestore Database
   - Cloud Functions (optional)

4. Copy credentials from Firebase Console
5. Update `.env` file:
```
FIREBASE_API_KEY=abc123...
FIREBASE_AUTH_DOMAIN=yourproject.firebaseapp.com
FIREBASE_PROJECT_ID=yourproject
FIREBASE_STORAGE_BUCKET=yourproject.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456
FIREBASE_APP_ID=1:123:android:abc123...
```

### Step 4: Start Development
```bash
npm start
```

### Step 5: Test on Phone
1. Download Expo Go app on your phone
2. Scan QR code from terminal
3. App opens on your phone!

## Project Structure at a Glance

```
NIKAT/
├── src/
│   ├── screens/          ← App pages
│   ├── components/       ← Reusable UI components
│   ├── services/         ← Firebase logic
│   ├── context/          ← Global state
│   ├── hooks/            ← Custom hooks
│   ├── utils/            ← Helper functions
│   └── constants/        ← Colors, strings, data
├── App.js               ← Entry point
├── app.json             ← Expo config
├── package.json         ← Dependencies
└── README.md            ← Full documentation
```

## Key Features & How to Use

### 1. Language Selection
- User selects Hindi/English/Marathi on first launch
- Language saved locally
- All strings change based on selection

### 2. Login with OTP
- Enter 10-digit phone number
- Receive OTP (mock in development)
- Enter OTP to login
- Session auto-restores on app restart

### 3. Browse Shops by Category
- Home screen shows 6 categories
- Click category to see shops
- Shop list shows:
  - Name, category, distance, rating
  - Locked details if not subscribed
  - Call/WhatsApp buttons (if subscribed)

### 4. Subscribe for Premium
- Click "Unlock to Contact"
- Choose subscription plan (₹49-₹399)
- Simulate payment (backend integration ready)
- Unlock details and get access

### 5. Register Your Shop
- Click "Add Shop" button
- Fill shop details
- Shop created (inactive by default)
- Subscribe to activate listing

## File Organization Tips

### When Adding New Features
1. **New Screen?** Add to `src/screens/`
2. **New Component?** Add to `src/components/`
3. **New Service?** Add to `src/services/`
4. **New Utility?** Add to `src/utils/`
5. **New Constant?** Add to `src/constants/`

### Import Patterns
```javascript
// ✓ Good - import from specific file
import { validatePhone } from '../utils/validation';

// ✓ Better - import from index
import { validatePhone } from '../utils';

// ✓ Best - use barrel exports
import { Button, Input } from '../components';
```

## Common Commands

```bash
# Start dev server
npm start

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Build APK
npm run build:android

# Install new package
npm install package-name

# Remove package
npm uninstall package-name

# Update all packages
npm update

# Check for security issues
npm audit

# Fix security issues
npm audit fix
```

## Testing Your Changes

### Manual Testing
1. Make change to code
2. Save file
3. Hot reload happens automatically (press 'r' in terminal)
4. See changes on your phone immediately!

### Test Different Scenarios
- Test with subscription (edit `src/context/AuthContext.js`)
- Test different languages
- Test on low connectivity (Emulator > Settings > Network > GPRS)
- Test on different devices

## Debugging

### View Console Logs
```bash
npm start
# Your console.log() statements appear in terminal
```

### Debug in Browser
```bash
npm start
# Press 'd' in terminal
# Open Chrome DevTools
# View UI, network, console
```

### View Errors
- App shows red error screen if something breaks
- Check terminal for full error trace
- Read stack trace to find issue

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "Add my feature"

# Push to GitHub
git push origin feature/my-feature

# Create Pull Request on GitHub
```

## Performance Tips

### Keep App Fast
1. Use FlatList for long lists (not ScrollView)
2. Memoize expensive components
3. Compress images before adding
4. Remove unused imports
5. Use lazy loading for images

### Monitor Performance
```bash
npm start
# Press 'd' → Select "Inspector"
# Check performance metrics
```

## Building for Release

### Local Build (Advanced)
```bash
# Requires Android Studio/Xcode setup
eas build -p android --profile preview --local
```

### Cloud Build (Recommended)
```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
# Download APK from Expo dashboard
```

## Need Help?

1. **Check Docs**: README.md, DEVELOPMENT.md
2. **Check Logs**: Look at console output
3. **Google Error**: Copy error message → Google it
4. **Stack Overflow**: Tag with #react-native
5. **GitHub Issues**: Check project issues
6. **Contact**: support@hackifypro.com

## Next Steps

After setup, try:
1. ✓ Login and browse shops
2. ✓ Register a shop
3. ✓ Subscribe to unlock features
4. ✓ Integrate your own Firebase project
5. ✓ Customize colors and strings
6. ✓ Add more categories
7. ✓ Integrate payment gateway
8. ✓ Deploy to Play Store

## Common Customizations

### Change App Name
Edit `app.json`:
```json
{
  "expo": {
    "name": "Your App Name"
  }
}
```

### Change Primary Color
Edit `src/constants/Colors.js`:
```javascript
export const Colors = {
  primary: '#FF0000', // Change from green to red
  // ... rest of colors
};
```

### Add New Category
Edit `src/constants/SubscriptionPlans.js`:
```javascript
export const Categories = [
  // ... existing categories
  {
    id: '7',
    name: 'Your Category',
    icon: '😊',
    color: '#ABC123',
  },
];
```

### Change Language Strings
Edit `src/constants/Strings.js`:
```javascript
export const Strings = {
  en: {
    appName: 'NIKAT',
    // ... add more strings
  },
};
```

---

**Ready to build something amazing?** Start coding! 🚀
