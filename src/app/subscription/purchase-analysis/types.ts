import { CardBrand } from "@stripe/stripe-js";

import type {
  StripeCardNumberElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardCvcElementChangeEvent,
} from "@stripe/stripe-js";

export type CardElementType = "cardNumber" | "cardExpiry" | "cardCvc";

export type CardElementEventMap = {
  cardNumber: StripeCardNumberElementChangeEvent;
  cardExpiry: StripeCardExpiryElementChangeEvent;
  cardCvc: StripeCardCvcElementChangeEvent;
};

export type CardErrors = {
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
};

export type CardCompletionState = {
  cardNumber: boolean;
  cardExpiry: boolean;
  cardCvc: boolean;
};

export type BillingAddressFormData = {
  street: string;
  houseNumber: string;
  city: string;
  district: string;
  postalCode: string;
  state: string;
};

export type AddressErrors = {
  street?: string;
  houseNumber?: string;
  city?: string;
  district?: string;
  postalCode?: string;
  state?: string;
};

export type ViaCepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
};

export type SavedCard = {
  id: string;
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
  isDefault: boolean;
};

export type PurchaseWithSavedCardParams = {
  customerId: string;
  paymentMethodId: string;
  userId: string;
  userName: string;
  userEmail: string;
  quantity: number;
};

export type PurchaseWithNewCardParams = {
  customerId: string;
  paymentMethodId: string;
  userId: string;
  userName: string;
  userEmail: string;
  quantity: number;
  saveCard: boolean;
  cardholderName: string;
};

export type SavePaymentMethodParams = {
  customerId: string;
  paymentMethodId: string;
  userId: string;
  setAsDefault: boolean;
  cardholderName: string;
};

export type ChargeResponse = {
  success: boolean;
  requiresAction?: boolean;
  clientSecret?: string;
  error?: string;
};

export type QuantitySelectorProps = {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  totalPrice: number;
  isProcessing: boolean;
  onCancel: () => void;
  onPurchase: () => void;
  hasPaymentMethod: boolean;
};

export type PaymentMethodProps = {
  hasPaymentMethod: boolean;
  defaultCard?: SavedCard;
  cardHolder?: string;
  onAddNewCard: () => void;
  isProcessing: boolean;
};

export type NewCardFormProps = {
  cardholderName: string;
  onCardholderNameChange: (name: string) => void;
  cardholderNameError: string;
  cardBrand: CardBrand;
  errors: CardErrors;
  isProcessing: boolean;
  onCardNumberChange: (event: StripeCardNumberElementChangeEvent) => void;
  onCardExpiryChange: (event: StripeCardExpiryElementChangeEvent) => void;
  onCardCvcChange: (event: StripeCardCvcElementChangeEvent) => void;
  hasPaymentMethod: boolean;
  onBackToSavedCard?: () => void;
};

export type BillingAddressFormProps = {
  formData: BillingAddressFormData;
  onFormDataChange: (data: Partial<BillingAddressFormData>) => void;
  addressErrors: AddressErrors;
  isProcessing: boolean;
  isCheckingPostalCode: boolean;
  onPostalCodeChange: (value: string) => void;
};
