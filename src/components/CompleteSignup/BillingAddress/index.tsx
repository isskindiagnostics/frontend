import { Button, InputField, Select } from "isskinui";
import { useCallback, useState } from "react";

import { stepForm } from "@/app/signup/complete/index.css";
import { UserBillingAddress } from "@/types/user";

import { BRAZILIAN_STATES_LONG } from "../data";
import { formButtonContainer, twoFieldsRow } from "../index.css";

type BillingAddressProps = {
  billingAddress: UserBillingAddress;
  onNext: (billingAddress: UserBillingAddress) => void;
  onBack?: () => void;
  isSubmitting: boolean;
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

export default function BillingAddress({
  billingAddress,
  onNext,
  onBack,
  isSubmitting,
}: BillingAddressProps) {
  const [formData, setFormData] = useState(billingAddress);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCheckingPostalCode, setIsCheckingPostalCode] =
    useState<boolean>(false);
  const isFormValid =
    formData.street.trim() !== "" &&
    formData.houseNumber.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.postalCode.trim() !== "" &&
    formData.state.trim() !== "";

  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!formData.street.trim()) {
      newErrors.street = "A rua é obrigatória";
    }

    if (!formData.houseNumber.trim()) {
      newErrors.houseNumber = "O número da casa é obrigatório";
    }

    if (!formData.district.trim()) {
      newErrors.district = "O bairro é obrigatório";
    }

    if (!formData.city.trim()) {
      newErrors.city = "A cidade é obrigatória";
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "O CEP é obrigatório";
    } else if (!/^\d{5}-?\d{3}$/.test(formData.postalCode.replace(/\D/g, ""))) {
      newErrors.postalCode = "CEP deve ter 8 dígitos";
    }

    if (!formData.state.trim()) {
      newErrors.state = "O estado é obrigatório";
    }

    return newErrors;
  };

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
    setErrors((prev) => ({ ...prev, postalCode: "" }));

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanPostalCode}/json/`
      );

      if (!response.ok) {
        throw new Error("Erro na consulta do CEP");
      }

      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        setErrors((prev) => ({ ...prev, postalCode: "CEP não encontrado" }));
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
      setErrors((prev) => ({
        ...prev,
        postalCode: "Erro ao consultar CEP. Tente novamente.",
      }));
    } finally {
      setIsCheckingPostalCode(false);
    }
  }, []);

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedValue = formatPostalCode(value);

    setFormData((prev) => ({ ...prev, postalCode: formattedValue }));

    if (errors.postalCode) {
      setErrors((prev) => ({ ...prev, postalCode: "" }));
    }

    const cleanValue = value.replace(/\D/g, "");
    if (cleanValue.length === 8) {
      checkPostalCode(cleanValue);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onNext(formData);
  };

  return (
    <form className={stepForm} onSubmit={handleSubmit}>
      <div className={twoFieldsRow}>
        <InputField
          label="CEP"
          name="postalCode"
          value={formData.postalCode}
          onChange={handlePostalCodeChange}
          error={errors.postalCode}
          disabled={isSubmitting || isCheckingPostalCode}
          width="35%"
          maxLength={9}
          required
        />

        <InputField
          label="Bairro"
          name="district"
          value={formData.district}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, district: e.target.value }))
          }
          error={errors.district}
          disabled={isSubmitting || isCheckingPostalCode}
          width="65%"
          required
        />
      </div>

      <div className={twoFieldsRow}>
        <InputField
          label="Cidade"
          name="city"
          value={formData.city}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, city: e.target.value }))
          }
          error={errors.city}
          disabled={isSubmitting || isCheckingPostalCode}
          width="70%"
          required
        />

        <Select
          label="Estado"
          options={BRAZILIAN_STATES_LONG}
          value={formData.state}
          placeholder="Selecionar"
          onValueChange={(e) => setFormData((prev) => ({ ...prev, state: e }))}
          disabled={isSubmitting || isCheckingPostalCode}
          width="30%"
        />
      </div>

      <div className={twoFieldsRow}>
        <InputField
          label="Logradouro"
          name="street"
          value={formData.street}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, street: e.target.value }))
          }
          error={errors.street}
          disabled={isSubmitting || isCheckingPostalCode}
          width="100%"
          required
        />

        <InputField
          label="Número"
          name="houseNumber"
          value={formData.houseNumber}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, houseNumber: e.target.value }))
          }
          error={errors.houseNumber}
          disabled={isSubmitting || isCheckingPostalCode}
          width="150px"
          required
        />
      </div>

      <div className={formButtonContainer}>
        <Button variant="outlined" disabled={isSubmitting} onClick={onBack}>
          Voltar
        </Button>
        <Button type="submit" disabled={isSubmitting || !isFormValid}>
          Finalizar
        </Button>
      </div>
    </form>
  );
}
