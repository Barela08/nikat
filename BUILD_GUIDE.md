# NIKAT Build & Deployment Guide

## APK Generation with Expo EAS

### Prerequisites
- Expo CLI installed globally
- EAS CLI installed globally
- Expo account created
- Firebase setup complete

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Login to Expo
```bash
eas login
```

### Step 3: Configure EAS (eas.json)
The project includes a default `eas.json`. Review it:
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

### Step 4: Build APK
```bash
# Build for preview (faster)
eas build -p android --profile preview

# Build for production
eas build -p android --profile production

# Build locally (requires setup)
eas build -p android --profile preview --local
```

### Step 5: Download APK
- Go to https://expo.dev/builds
- Download the generated APK
- Install on Android device or emulator

## Manual Local Build

### Prerequisites
- Android SDK installed
- Android NDK (optional)
- JDK 11 installed

### Steps
```bash
# Generate native project files
expo prebuild --clean

# Build APK
cd android
./gradlew assembleRelease

# APK output location
# android/app/build/outputs/apk/release/app-release.apk
```

## iOS Build (Mac only)

```bash
# Preview build
eas build -p ios --profile preview

# Production build
eas build -p ios --profile production
```

## Release to App Store

### Android (Google Play)
1. Create Google Play Developer account
2. Create app in Google Play Console
3. Generate keystore and signing config
4. Build signed APK:
```bash
eas build -p android --profile production
```
5. Upload to Google Play Console

### iOS (Apple App Store)
1. Create Apple Developer account
2. Create app in App Store Connect
3. Generate provisioning profiles
4. Build for distribution:
```bash
eas build -p ios --profile production
```
5. Upload with Transporter app

## Troubleshooting

### Build Fails
```bash
# Clear cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
eas build -p android --profile preview --local
```

### Certificate Errors
```bash
# Reset credentials
eas credentials
```

### Permission Errors
- Check `.env` file has correct Firebase credentials
- Verify Firebase security rules
- Ensure app has required Android permissions in `app.json`

## Testing APK

### On Android Device
1. Enable "Unknown sources" in Settings
2. Transfer APK via USB
3. Tap to install

### On Android Emulator
```bash
# Start emulator
emulator -avd your_device_name

# Install APK
adb install path/to/app.apk

# Launch app
adb shell am start -n com.hackifypro.nikat/.MainActivity
```

## Performance Optimization

### Bundle Size
```bash
eas build -p android --profile preview --local -- --release
```

### Minification
- Enabled by default in production builds
- Check `app.json` for optimization settings

## Version Management

Update version in `app.json`:
```json
{
  "expo": {
    "version": "1.0.0"
  }
}
```

## Release Notes

Create `RELEASE_NOTES.md` for each version with:
- Features added
- Bugs fixed
- Performance improvements
- Breaking changes

## Continuous Deployment

### GitHub Actions Example
```yaml
name: Build APK
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: eas build -p android --profile production
```

## Monitoring Post-Release

- Monitor Firebase Analytics
- Track crash reports
- Review user feedback
- Update app based on metrics

---

For more details, visit: https://docs.expo.dev/build/setup/
