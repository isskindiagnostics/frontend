export const formatCardBrand = (brand: string): string => {
  switch (brand.toLowerCase()) {
    case "visa":
      return "Visa";
    case "mastercard":
      return "Mastercard";
    case "amex":
      return "American Express";
    case "elo":
      return "Elo";
    default:
      return brand.charAt(0).toUpperCase() + brand.slice(1);
  }
};

export const formatExpiryDate = (month: number, year: number): string => {
  return `${month.toString().padStart(2, "0")}/${year.toString().slice(-2)}`;
};

export const maskCardNumber = (last4: string): string => {
  return `${last4}`;
};

export const validateCardholderName = (name: string): boolean => {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
};

export const isCardExpired = (month: number, year: number): boolean => {
  const now = new Date();
  const expiry = new Date(year, month - 1);
  return expiry < now;
};
