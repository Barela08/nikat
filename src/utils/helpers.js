/**
 * Helper utility functions
 */

export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

export const maskPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length >= 10) {
    return `${cleaned.slice(0, 3)}XXXXX${cleaned.slice(8)}`;
  }
  return 'XXXXXXX';
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10;
};

export const getDateWithMonths = (months) => {
  const date = new Date();
  date.setMonth(date.getMonth() + months);
  return date;
};

export const isSubscriptionActive = (expiryDate) => {
  if (!expiryDate) return false;
  const expiry = new Date(expiryDate);
  return expiry > new Date();
};

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-IN');
};

export const formatCurrency = (amount) => {
  return `₹${amount}`;
};

export const openDialer = (phoneNumber) => {
  return `tel:${phoneNumber}`;
};

export const openWhatsApp = (phoneNumber) => {
  return `https://wa.me/${phoneNumber}`;
};

export const getDaysRemaining = (expiryDate) => {
  const expiry = new Date(expiryDate);
  const today = new Date();
  const diffTime = Math.abs(expiry - today);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
