import { Timestamp } from "firebase/firestore";

import { formatDate } from "@/utils/date";

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

const toDate = (ts: Timestamp | number | null) => {
  if (!ts) return null;
  if (typeof ts === "number") {
    return new Date(ts * 1000); // Stripe timestamps
  }
  if (ts instanceof Timestamp) {
    return ts.toDate(); // Firestore
  }
  throw new Error("Unsupported timestamp format");
};

export const getNextBillingDate = (
  billingCycleAnchor?: Timestamp,
  endDate?: Timestamp | null
) => {
  if (!billingCycleAnchor) {
    return null;
  }

  const anchorDate = toDate(billingCycleAnchor);
  if (!anchorDate) return null;

  const today = new Date();
  const anchorDay = anchorDate.getDate();

  let nextBilling = new Date(today.getFullYear(), today.getMonth(), anchorDay);

  // If this month's billing date has passed, move to next month
  if (nextBilling <= today) {
    nextBilling.setMonth(nextBilling.getMonth() + 1);
  }

  // Handle invalid day (e.g., Feb 30 → push to last day of month)
  if (nextBilling.getDate() !== anchorDay) {
    nextBilling = new Date(
      nextBilling.getFullYear(),
      nextBilling.getMonth() + 1,
      0
    );
  }

  // Optional: stop at endDate if provided
  if (endDate) {
    const end = toDate(endDate);
    if (end && nextBilling > end) return formatDate(end);
  }

  return formatDate(nextBilling);
};

/**
 * Calculate the subscription end date based on billing cycle anchor or start date
 */
export const calculateSubscriptionEndDate = (
  billingCycleAnchor?: Timestamp,
  startDate?: Timestamp | null,
  interval: "month" | "year" = "month"
): Timestamp => {
  if (billingCycleAnchor) {
    // If we have billing cycle anchor, that's when the next billing would be
    return billingCycleAnchor;
  }

  if (startDate) {
    // Calculate next billing cycle properly
    const start = startDate.toDate();
    const today = new Date();

    // Calculate the next billing date
    const currentPeriodStart = new Date(start);
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // Set the billing day to the same day as the start date
    currentPeriodStart.setFullYear(currentYear);
    currentPeriodStart.setMonth(currentMonth);

    // If the current period has already passed, move to next period
    if (currentPeriodStart <= today) {
      if (interval === "year") {
        currentPeriodStart.setFullYear(currentPeriodStart.getFullYear() + 1);
      } else {
        currentPeriodStart.setMonth(currentPeriodStart.getMonth() + 1);
      }
    }

    return new Timestamp(Math.floor(currentPeriodStart.getTime() / 1000), 0);
  }

  // Last resort: 30 days from now
  const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  return new Timestamp(Math.floor(futureDate.getTime() / 1000), 0);
};
