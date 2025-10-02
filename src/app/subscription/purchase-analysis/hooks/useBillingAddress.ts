import { useState, useCallback } from "react";

import { BRAZILIAN_STATES_LONG } from "@/components/CompleteSignup/data";

import {
  AddressErrors,
  BillingAddressFormData,
  ViaCepResponse,
} from "../types";

export function useBillingAddress() {
  const [formData, setFormData] = useState<BillingAddressFormData>({
    street: "",
    houseNumber: "",
    city: "",
    district: "",
    postalCode: "",
    state: "",
  });
  const [addressErrors, setAddressErrors] = useState<AddressErrors>({});
  const [isCheckingPostalCode, setIsCheckingPostalCode] = useState(false);

  const formatPostalCode = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    const limitedNumbers = numbers.slice(0, 8);

    if (limitedNumbers.length <= 5) {
      return limitedNumbers;
    }

    return `${limitedNumbers.slice(0, 5)}-${limitedNumbers.slice(5)}`;
  };

  const checkPostalCode = useCallback(async (cep: string) => {
    const cleanPostalCode = cep.replace(/\D/g, "");

    if (cleanPostalCode.length !== 8) {
      return;
    }

    setIsCheckingPostalCode(true);
    setAddressErrors((prev) => ({ ...prev, postalCode: "" }));

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanPostalCode}/json/`
      );

      if (!response.ok) {
        throw new Error("Erro na consulta do CEP");
      }

      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        setAddressErrors((prev) => ({
          ...prev,
          postalCode: "CEP não encontrado",
        }));
        return;
      }

      const stateFromViaCep = BRAZILIAN_STATES_LONG.find(
        (state) => state.value === data.uf
      );

      setFormData((prev) => ({
        ...prev,
        street: data.logradouro || prev.street,
        district: data.bairro || prev.district,
        city: data.localidade || prev.city,
        state: stateFromViaCep?.value || prev.state,
        postalCode: formatPostalCode(cleanPostalCode),
      }));
    } catch {
      setAddressErrors((prev) => ({
        ...prev,
        postalCode: "Erro ao consultar CEP. Tente novamente.",
      }));
    } finally {
      setIsCheckingPostalCode(false);
    }
  }, []);

  const handlePostalCodeChange = (value: string) => {
    const formattedValue = formatPostalCode(value);

    setFormData((prev) => ({ ...prev, postalCode: formattedValue }));

    if (addressErrors.postalCode) {
      setAddressErrors((prev) => ({ ...prev, postalCode: "" }));
    }

    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length === 8) {
      checkPostalCode(cleanValue);
    }
  };

  const updateFormData = (data: Partial<BillingAddressFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const isFormValid = (): boolean => {
    return (
      formData.street.trim() !== "" &&
      formData.houseNumber.trim() !== "" &&
      formData.city.trim() !== "" &&
      formData.postalCode.trim() !== "" &&
      formData.state.trim() !== ""
    );
  };

  const resetForm = () => {
    setFormData({
      street: "",
      houseNumber: "",
      city: "",
      district: "",
      postalCode: "",
      state: "",
    });
    setAddressErrors({});
  };

  return {
    formData,
    addressErrors,
    isCheckingPostalCode,
    handlePostalCodeChange,
    updateFormData,
    isFormValid,
    resetForm,
  };
}
