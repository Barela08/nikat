# NIKAT Codemagic Expo APK Build TODO

## Completed:
- [x] Updated codemagic.yaml: Fixed npm ci → npm install

## Next Steps:
- [ ] Add EXPO_TOKEN to Codemagic Dashboard → Settings → Environment Variables
  - Name: EXPO_TOKEN
  - Value: your_expo_token_here (get from `eas login` or Expo dashboard)
- [ ] Git commit/push:
  ```
  git add codemagic.yaml TODO.md
  git commit -m "Fixed Codemagic build: npm ci → npm install, updated TODO"
  git push
  ```
- [ ] In Codemagic:
  - Go to app dashboard
  - Click \"Check for configuration files\"
  - Select expo-eas-build workflow
  - Start new build
- [ ] Download APK from Artifacts once build succeeds

**Security:** Token stored securely in Codemagic env vars (not hardcoded).

**Expected Result:** Successful Android APK build via EAS preview profile.
