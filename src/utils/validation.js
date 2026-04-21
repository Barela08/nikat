/**
 * Validation utilities for user inputs
 */

export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const validateName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 100;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateOTP = (otp) => {
  const otpRegex = /^\d{4,6}$/;
  return otpRegex.test(otp);
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};

export const validateLocation = (location) => {
  return location && location.trim().length >= 3;
};

export const sanitizePhone = (phone) => {
  return phone.replace(/\D/g, '').slice(-10);
};
