# NIKAT Installation Guide

Complete step-by-step installation guide for NIKAT application.

## System Requirements

### Minimum
- **OS**: Windows 10+, macOS 10.13+, Linux
- **RAM**: 4GB
- **Disk**: 5GB free space
- **Node.js**: v16.0.0 or higher
- **npm**: v7.0.0 or higher

### Recommended
- **OS**: Windows 11, macOS 12+, Ubuntu 20.04+
- **RAM**: 8GB+
- **Disk**: 10GB+ free space
- **Node.js**: v18 LTS
- **npm**: v9+

## Prerequisites Installation

### 1. Install Node.js

#### Windows
1. Download from https://nodejs.org/
2. Choose LTS (Long Term Support) version
3. Run installer
4. Accept default options
5. Restart computer

**Verify Installation**:
```bash
node --version
npm --version
```

Should show v16+ and v7+

#### macOS
```bash
# Using Homebrew (recommended)
brew install node

# Or download from https://nodejs.org/
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm
```

### 2. Install Git

#### Windows
Download from https://git-scm.com/

#### macOS
```bash
brew install git
```

#### Linux
```bash
sudo apt install git
```

**Verify**:
```bash
git --version
```

### 3. Code Editor (Optional)

Install Visual Studio Code from https://code.visualstudio.com/

## Installation Steps

### Step 1: Get the Project

#### Option A: Download ZIP
1. Download NIKAT project as ZIP
2. Extract to preferred location
3. Open in code editor

#### Option B: Clone with Git
```bash
git clone https://github.com/yourusername/NIKAT.git
cd NIKAT
```

### Step 2: Install Expo CLI

```bash
npm install -g expo-cli
```

**Verify**:
```bash
expo --version
```

### Step 3: Install Project Dependencies

Navigate to project directory and run:

#### Windows
```bash
setup.bat
```

#### macOS/Linux
```bash
bash setup.sh
```

#### Manual Installation
```bash
npm install
```

This will install:
- React Native
- Expo
- Firebase SDK
- Navigation libraries
- Other dependencies

### Step 4: Firebase Setup

#### Create Firebase Project

1. Go to https://firebase.google.com
2. Click "Go to console"
3. Sign in with Google account
4. Click "Create a project"
5. Enter project name (e.g., "NIKAT")
6. Accept terms
7. Choose location (select "India" if available)
8. Click "Create project"

#### Enable Authentication

1. In Firebase console, go to "Authentication"
2. Click "Get Started"
3. Select "Phone" as authentication method
4. Click "Enable"
5. Optional: Add test phone numbers for development

#### Create Firestore Database

1. Go to "Firestore Database"
2. Click "Create database"
3. Choose location (India region preferred)
4. Start in "Test mode" (for development)
5. Click "Create"

#### Get Firebase Credentials

1. Click "Settings" icon (gear icon)
2. Click "Project settings"
3. Scroll to "Your apps"
4. Click "</>" (Web)
5. Register app (name it "NIKAT")
6. Copy the config object

```javascript
{
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
}
```

### Step 5: Configure Environment Variables

Create `.env` file in project root:

```bash
# Copy template
cp .env.example .env
```

Edit `.env` and add Firebase credentials:

```
FIREBASE_API_KEY=YOUR_API_KEY
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_PROJECT_ID=your-project
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abc123def456
```

### Step 6: Start Development Server

```bash
npm start
```

You should see:
```
exp://192.168.x.x:19000

Ready on http://192.168.x.x:19000
```

## Testing on Device

### Option 1: Expo Go App (Easiest)

#### Android/iOS
1. Download "Expo Go" app from Play Store / App Store
2. Open Expo Go
3. Scan QR code from terminal
4. App opens on your phone!

### Option 2: Android Emulator

#### Setup (First Time)
```bash
# Install Android Studio from https://developer.android.com/studio
# Open Android Studio
# Install Android SDK
# Create virtual device
```

#### Run on Emulator
```bash
npm run android
```

### Option 3: Physical Android Device

#### Enable Developer Mode
1. Open Settings
2. Go to "About phone"
3. Tap "Build number" 7 times
4. Developer menu unlocked!

#### Enable USB Debugging
1. Go to Settings > Developer Options
2. Enable "USB Debugging"
3. Connect via USB
4. Run: `npm run android`

## Verification

Test the following:

### Language Selection
- [ ] Open app
- [ ] Select language
- [ ] Language changes across app

### Login
- [ ] Enter mock phone number (9876543210)
- [ ] Get OTP button works
- [ ] Verify OTP screen appears

### Shop Browsing
- [ ] Home screen shows categories
- [ ] Click category → Shop list appears
- [ ] Shop cards show locked details

### Subscription
- [ ] Click "Unlock to Contact"
- [ ] Subscription screen opens
- [ ] Can select plans

## Troubleshooting Installation

### npm install fails
```bash
# Clear cache
npm cache clean --force

# Try again
npm install

# If still fails, delete and reinstall
rm -rf node_modules
npm install
```

### Expo not found
```bash
# Reinstall globally
npm install -g expo-cli

# Verify
expo --version
```

### Port 19000 already in use
```bash
# Use different port
expo start --port 19001
```

### Firebase errors
- Check `.env` file has correct credentials
- Verify Firebase project created
- Check internet connection
- Try clearing app data and restart

### Permission denied on setup scripts
```bash
# Make scripts executable
chmod +x setup.sh
bash setup.sh
```

## Next Steps

### Customize App
1. Edit `src/constants/` for colors and strings
2. Change app name in `app.json`
3. Add your logo to `src/assets/`

### Integrate Real Data
1. Add shops to Firebase Firestore
2. Test with real categories
3. Connect payment gateway

### Deploy
1. Create APK: `npm run build:android`
2. Or use EAS: `npm install -g eas-cli` → `eas build`
3. Upload to Google Play Store

## Development Environment Setup

### VSCode Extensions (Recommended)

Install these extensions in VSCode:

- **ES7+ React/Redux/React-Native snippets**
  - Install ID: `dsznajder.es7-react-js-snippets`

- **Firebase Explorer**
  - Install ID: `jsayol.firebase-explorer`

- **Android Extension Pack**
  - Install ID: `at.aliasadidev.androidextensionpack`

- **Thunder Client** (API Testing)
  - Install ID: `rangav.vscode-thunder-client`

### Configuration

#### VSCode Settings
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "javascript.validate.enable": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

## Common Commands Reference

```bash
# Start development
npm start

# Run on Android
npm run android

# Run on iOS (Mac only)
npm run ios

# Build APK
npm run build:android

# Install new package
npm install package-name

# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Clear cache
npm cache clean --force

# Check installed packages
npm ls

# Update all packages
npm update
```

## Support

**Stuck?** Check these resources:

1. **README.md** - Full documentation
2. **TROUBLESHOOTING.md** - Common issues & solutions
3. **Firebase Docs** - https://firebase.google.com/docs
4. **Expo Docs** - https://docs.expo.dev
5. **React Native Docs** - https://reactnative.dev/docs/getting-started

## Security Note

⚠️ **Important**: 
- Never commit `.env` file to Git
- Never share Firebase credentials
- Always use environment variables for secrets
- Regenerate credentials if accidentally exposed

## System Cleanup

If you need to completely uninstall:

```bash
# Uninstall Expo CLI
npm uninstall -g expo-cli

# Uninstall Node.js
# Windows: Control Panel > Programs > Uninstall
# macOS: brew uninstall node
# Linux: sudo apt remove nodejs npm

# Delete project folder
rm -rf NIKAT
```

---

**Installation Complete!** 🎉  
You're ready to start developing. Check QUICKSTART.md for next steps.
