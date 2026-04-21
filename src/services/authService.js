import { auth } from '../config/firebase';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { StorageManager } from '../utils/storage';
import { getUserByPhone } from './firestoreService'; // Forward ref stub

let recaptchaVerifier;

const setupRecaptcha = (phoneNumberRef) => {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    }, auth);
  }
  return recaptchaVerifier;
};

export const sendOTP = async (phoneNumber, phoneNumberRef) => {
  try {
    const verifier = setupRecaptcha(phoneNumberRef);
    const confirmation = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    return { success: true, confirmation };
  } catch (error) {
    console.error('OTP send error:', error);
    return { success: false, error: error.message };
  }
};

export const verifyOTP = async (confirmation, otp) => {
  try {
    const result = await confirmation.confirm(otp);
    const user = result.user;
    const idToken = await user.getIdToken();
    
    // Save token
    await StorageManager.setAuthToken(idToken);
    
    // Check or create user
    const userData = await getUserByPhone(user.phoneNumber);
    if (userData) {
      await StorageManager.setUser(userData);
    }
    
    return { success: true, user: result.user };
  } catch (error) {
    console.error('OTP verify error:', error);
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  await auth.signOut();
  await StorageManager.clearUser();
};

export const getCurrentUser = () => auth.currentUser;
