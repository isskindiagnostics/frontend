export const stripeErrorCodeTranslations: Record<string, string> = {
  // Card validation errors
  card_declined: "Cartão recusado pelo banco emissor.",
  expired_card: "Cartão expirado. Utilize outro cartão.",
  incorrect_cvc: "Código CVC incorreto. Verifique o código e tente novamente.",
  incorrect_number:
    "Número do cartão incorreto. Verifique o número e tente novamente.",
  invalid_cvc: "Código CVC inválido. Verifique o código e tente novamente.",
  invalid_expiry_month:
    "Mês de vencimento inválido. Verifique a data de vencimento.",
  invalid_expiry_year:
    "Ano de vencimento inválido. Verifique a data de vencimento.",
  invalid_number: "Número do cartão inválido. Verifique os detalhes do cartão.",
  processing_error: "Erro no processamento do cartão. Tente novamente.",

  // Amount errors
  amount_too_large: "Valor muito alto. Use um valor menor.",
  amount_too_small: "Valor muito baixo. Use um valor maior.",
  invalid_charge_amount: "Valor inválido. O valor deve ser positivo.",

  // Account/API errors
  api_key_expired: "Chave de API expirada.",
  balance_insufficient: "Saldo insuficiente.",

  // General payment errors
  charge_already_captured: "Esta cobrança já foi capturada.",
  charge_already_refunded: "Esta cobrança já foi reembolsada.",
  charge_disputed: "Esta cobrança foi contestada.",

  // Parameter errors
  parameter_missing: "Parâmetros obrigatórios estão faltando.",
  parameter_invalid_empty:
    "Um ou mais valores obrigatórios não foram fornecidos.",
  parameter_invalid_string_empty:
    "Um ou mais campos obrigatórios estão vazios.",

  // Payment method errors
  payment_method_unactivated: "Método de pagamento não ativado.",
  payment_intent_authentication_failure: "Falha na autenticação do pagamento.",
  payment_intent_payment_attempt_failed: "Tentativa de pagamento falhou.",

  // Customer/Email errors
  email_invalid: "Endereço de e-mail inválido.",
  customer_max_subscriptions: "Número máximo de assinaturas atingido.",

  // Address errors
  incorrect_address: "Endereço do cartão incorreto.",
  incorrect_zip: "CEP incorreto.",
  postal_code_invalid: "Código postal inválido.",
};

export const stripeDeclineCodeTranslations: Record<
  string,
  { description: string; message: string }
> = {
  approve_with_id: {
    description: "O pagamento não pode ser autorizado.",
    message:
      "Pagamento não autorizado. Tente novamente ou entre em contato com seu banco.",
  },
  call_issuer: {
    description: "O cartão foi recusado por razão desconhecida.",
    message:
      "Cartão recusado. Entre em contato com seu banco para mais informações.",
  },
  card_not_supported: {
    description: "O cartão não suporta este tipo de compra.",
    message: "Este cartão não suporta este tipo de compra. Use outro cartão.",
  },
  card_velocity_exceeded: {
    description: "O cliente excedeu o limite disponível no cartão.",
    message: "Limite do cartão excedido. Entre em contato com seu banco.",
  },
  currency_not_supported: {
    description: "O cartão não suporta a moeda especificada.",
    message: "Cartão não suporta esta moeda. Use outro cartão.",
  },
  do_not_honor: {
    description: "O cartão foi recusado por razão desconhecida.",
    message: "Cartão recusado. Entre em contato com seu banco.",
  },
  do_not_try_again: {
    description: "O cartão foi recusado por razão desconhecida.",
    message: "Cartão recusado. Entre em contato com seu banco.",
  },
  duplicate_transaction: {
    description: "Uma transação idêntica foi enviada recentemente.",
    message:
      "Transação duplicada detectada. Verifique se o pagamento já foi processado.",
  },
  expired_card: {
    description: "O cartão expirou.",
    message: "Cartão expirado. Use outro cartão.",
  },
  fraudulent: {
    description: "O pagamento foi recusado como fraudulento.",
    message:
      "Pagamento recusado. Tente com outro cartão ou método de pagamento.",
  },
  generic_decline: {
    description: "O cartão foi recusado por razão desconhecida.",
    message: "Cartão recusado. Entre em contato com seu banco.",
  },
  incorrect_number: {
    description: "O número do cartão está incorreto.",
    message: "Número do cartão incorreto. Verifique e tente novamente.",
  },
  incorrect_cvc: {
    description: "O código CVC está incorreto.",
    message: "Código CVC incorreto. Verifique e tente novamente.",
  },
  incorrect_pin: {
    description: "O PIN inserido está incorreto.",
    message: "PIN incorreto. Tente novamente com o PIN correto.",
  },
  incorrect_zip: {
    description: "O CEP está incorreto.",
    message: "CEP incorreto. Verifique o código postal de cobrança.",
  },
  insufficient_funds: {
    description: "O cartão não tem fundos suficientes.",
    message: "Fundos insuficientes. Use outro método de pagamento.",
  },
  invalid_account: {
    description: "O cartão ou conta está inválido.",
    message: "Cartão inválido. Entre em contato com seu banco.",
  },
  invalid_amount: {
    description: "O valor é inválido ou excede o permitido.",
    message: "Valor inválido. Verifique o valor com seu banco.",
  },
  invalid_cvc: {
    description: "O código CVC está incorreto.",
    message: "Código CVC inválido. Verifique e tente novamente.",
  },
  invalid_expiry_year: {
    description: "O ano de vencimento é inválido.",
    message: "Ano de vencimento inválido. Verifique a data de vencimento.",
  },
  invalid_number: {
    description: "O número do cartão está incorreto.",
    message: "Número do cartão inválido. Verifique e tente novamente.",
  },
  invalid_pin: {
    description: "O PIN inserido está incorreto.",
    message: "PIN inválido. Tente novamente com o PIN correto.",
  },
  issuer_not_available: {
    description: "O emissor do cartão não pôde ser contactado.",
    message: "Erro temporário. Tente novamente em alguns minutos.",
  },
  lost_card: {
    description: "O cartão foi reportado como perdido.",
    message: "Cartão recusado. Entre em contato com seu banco.",
  },
  merchant_blacklist: {
    description: "O pagamento foi recusado por estar em lista restritiva.",
    message: "Pagamento recusado. Tente com outro cartão.",
  },
  new_account_information_available: {
    description: "O cartão ou conta está inválido.",
    message:
      "Informações do cartão desatualizadas. Entre em contato com seu banco.",
  },
  no_action_taken: {
    description: "O cartão foi recusado por razão desconhecida.",
    message: "Cartão recusado. Entre em contato com seu banco.",
  },
  not_permitted: {
    description: "O pagamento não é permitido.",
    message: "Pagamento não permitido. Entre em contato com seu banco.",
  },
  pickup_card: {
    description: "O cartão não pode ser usado para este pagamento.",
    message: "Cartão bloqueado. Entre em contato com seu banco.",
  },
  pin_try_exceeded: {
    description: "O número de tentativas de PIN foi excedido.",
    message:
      "Muitas tentativas de PIN. Use outro cartão ou método de pagamento.",
  },
  processing_error: {
    description: "Erro no processamento do cartão.",
    message: "Erro no processamento. Tente novamente em alguns minutos.",
  },
  reenter_transaction: {
    description: "O pagamento não pôde ser processado pelo emissor.",
    message: "Erro temporário. Tente novamente.",
  },
  restricted_card: {
    description: "O cartão não pode ser usado para este pagamento.",
    message: "Cartão com restrições. Entre em contato com seu banco.",
  },
  revocation_of_all_authorizations: {
    description: "O cartão foi recusado por razão desconhecida.",
    message: "Cartão recusado. Entre em contato com seu banco.",
  },
  revocation_of_authorization: {
    description: "O cartão foi recusado por razão desconhecida.",
    message: "Autorização revogada. Entre em contato com seu banco.",
  },
  security_violation: {
    description: "O cartão foi recusado por violação de segurança.",
    message: "Problema de segurança detectado. Entre em contato com seu banco.",
  },
  service_not_allowed: {
    description: "O cartão foi recusado por razão desconhecida.",
    message: "Serviço não permitido. Entre em contato com seu banco.",
  },
  stolen_card: {
    description: "O cartão foi reportado como roubado.",
    message: "Cartão recusado. Entre em contato com seu banco.",
  },
  stop_payment_order: {
    description: "O cartão foi recusado por razão desconhecida.",
    message: "Pagamento bloqueado. Entre em contato com seu banco.",
  },
  testmode_decline: {
    description: "Um cartão de teste foi usado.",
    message: "Cartão de teste usado. Use um cartão real para pagamento.",
  },
  transaction_not_allowed: {
    description: "O cartão foi recusado por razão desconhecida.",
    message: "Transação não permitida. Entre em contato com seu banco.",
  },
  try_again_later: {
    description: "O cartão foi recusado por razão desconhecida.",
    message: "Erro temporário. Tente novamente em alguns minutos.",
  },
  withdrawal_count_limit_exceeded: {
    description: "O cliente excedeu o limite disponível no cartão.",
    message: "Limite de transações excedido. Use outro método de pagamento.",
  },
};

export const stripeValidationTranslations: Record<string, string> = {
  // Card number errors
  "Your card number is incomplete.": "O número do seu cartão está incompleto.",
  "Your card number is invalid.": "O número do seu cartão é inválido.",

  // Expiry date errors
  "Your card’s expiration date is incomplete.":
    "A data de vencimento do seu cartão está incompleta.",
  "Your card’s expiry date is incomplete.":
    "A data de vencimento do seu cartão está incompleta.",
  "Your card’s expiration date is invalid.":
    "A data de vencimento do seu cartão é inválida.",
  "Your card’s expiry date is invalid.":
    "A data de vencimento do seu cartão é inválida.",
  "Your card’s expiry year is in the past.":
    "O ano de validade do seu cartão já passou.",

  // CVC/Security code errors
  "Your card’s security code is incomplete.":
    "O código de segurança do seu cartão está incompleto.",
  "Your card’s security code is invalid.":
    "O código de segurança do seu cartão é inválido.",
  "Your card’s security code is incorrect.":
    "O código de segurança do seu cartão está incorreto.",
  "Your card’s CVC is incomplete.":
    "O código CVC do seu cartão está incompleto.",
  "Your card’s CVC is invalid.": "O código CVC do seu cartão é inválido.",

  // General card errors
  "Your card has expired.": "Seu cartão expirou.",
  "Your card was declined.": "Seu cartão foi recusado.",

  // Processing errors
  "An error occurred while processing your card. Try again in a little bit.":
    "Ocorreu um erro ao processar seu cartão. Tente novamente em alguns instantes.",
  "There was an error processing your payment. Please try again.":
    "Houve um erro ao processar seu pagamento. Tente novamente.",
  "An error occurred while processing your payment. Please try again or use a different payment method.":
    "Ocorreu um erro ao processar seu pagamento. Tente novamente ou use um método diferente.",

  // Authentication errors
  "We are unable to authenticate your payment method. Please choose a different payment method and try again.":
    "Não conseguimos autenticar seu método de pagamento. Escolha um método diferente e tente novamente.",
};

export const translateStripeError = (
  errorMessage: string,
  errorCode?: string,
  declineCode?: string
): string => {
  if (!errorMessage && !errorCode && !declineCode) {
    return "Ocorreu um erro inesperado. Tente novamente.";
  }

  // First, try to translate using decline code (most specific)
  if (declineCode && stripeDeclineCodeTranslations[declineCode]) {
    return stripeDeclineCodeTranslations[declineCode].message;
  }

  // Then try error code translation
  if (errorCode && stripeErrorCodeTranslations[errorCode]) {
    return stripeErrorCodeTranslations[errorCode];
  }

  // Then try exact message translation
  const normalizedMessage = errorMessage?.trim() || "";
  if (stripeValidationTranslations[normalizedMessage]) {
    return stripeValidationTranslations[normalizedMessage];
  }

  // Try case insensitive exact match
  for (const [englishError, portugueseError] of Object.entries(
    stripeValidationTranslations
  )) {
    if (englishError.toLowerCase() === normalizedMessage.toLowerCase()) {
      return portugueseError;
    }
  }

  // Try pattern matching for common variations
  const patterns = [
    {
      regex: /your card number is incomplete/i,
      translation: "O número do seu cartão está incompleto.",
    },
    {
      regex:
        /your card.{0,2}s?\s*(expir(ation|y)\s*date|expir(y|ation))\s*is incomplete/i,
      translation: "A data de vencimento do seu cartão está incompleta.",
    },
    {
      regex: /your card.{0,2}s?\s*(security code|cvc)\s*is incomplete/i,
      translation: "O código de segurança do seu cartão está incompleto.",
    },
    {
      regex: /your card number is invalid/i,
      translation: "O número do seu cartão é inválido.",
    },
    {
      regex:
        /your card.{0,2}s?\s*(expir(ation|y)\s*date|expir(y|ation))\s*is invalid/i,
      translation: "A data de vencimento do seu cartão é inválida.",
    },
    {
      regex:
        /your card.{0,2}s?\s*(security code|cvc)\s*is (invalid|incorrect)/i,
      translation: "O código de segurança do seu cartão está incorreto.",
    },
    {
      regex: /your card has expired/i,
      translation: "Seu cartão expirou.",
    },
    {
      regex: /your card was declined/i,
      translation: "Seu cartão foi recusado.",
    },
    {
      regex: /(insufficient funds|not sufficient funds)/i,
      translation: "Fundos insuficientes.",
    },
    {
      regex: /processing error/i,
      translation: "Erro de processamento. Tente novamente.",
    },
  ];

  // Check against patterns
  for (const pattern of patterns) {
    if (pattern.regex.test(normalizedMessage)) {
      return pattern.translation;
    }
  }

  // If no specific translation found, return original message or generic error
  return normalizedMessage || "Ocorreu um erro inesperado. Tente novamente.";
};

// Helper function to get decline code information
export const getDeclineCodeInfo = (
  declineCode: string
): { description: string; message: string } | null => {
  return stripeDeclineCodeTranslations[declineCode] || null;
};

// Helper function specifically for error codes
export const translateStripeErrorByCode = (code: string): string => {
  return stripeErrorCodeTranslations[code] || "Erro no pagamento";
};
