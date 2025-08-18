import { Button, InputField, Select } from "isskinui";
import { useState } from "react";

import { stepForm } from "@/app/complete-signup/index.css";
import { UserBillingAddress } from "@/types/user";

import { BRAZILIAN_STATES_LONG } from "../data";
import { formButtonContainer, twoFieldsRow } from "../index.css";

type BillingAddressProps = {
  billingAddress: UserBillingAddress;
  onNext: (billingAddress: UserBillingAddress) => void;
  onBack?: () => void;
  isSubmitting: boolean;
};

export default function BillingAddress({
  billingAddress,
  onNext,
  onBack,
  isSubmitting,
}: BillingAddressProps) {
  const [formData, setFormData] = useState(billingAddress);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    }

    if (!formData.state.trim()) {
      newErrors.state = "O estado é obrigatório";
    }

    return newErrors;
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

  // TODO - FIELD CHECKS
  return (
    <form className={stepForm} onSubmit={handleSubmit}>
      <div className={twoFieldsRow}>
        <InputField
          label="Logradouro"
          name="street"
          value={formData.street}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, street: e.target.value }))
          }
          error={errors.street}
          disabled={isSubmitting}
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
          disabled={isSubmitting}
          style={{ padding: 14 }}
          width="150px"
          required
        />
      </div>

      <div className={twoFieldsRow}>
        <InputField
          label="Bairro"
          name="district"
          value={formData.district}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, district: e.target.value }))
          }
          error={errors.district}
          disabled={isSubmitting}
          width="100%"
          required
        />

        <InputField
          label="Cidade"
          name="city"
          value={formData.city}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, city: e.target.value }))
          }
          error={errors.city}
          disabled={isSubmitting}
          width="100%"
          required
        />
      </div>

      <div className={twoFieldsRow}>
        <InputField
          label="CEP"
          type="number"
          name="postalCode"
          value={formData.postalCode}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, postalCode: e.target.value }))
          }
          error={errors.postalCode}
          disabled={isSubmitting}
          width="100%"
          required
        />

        <Select
          label="Estado"
          options={BRAZILIAN_STATES_LONG}
          value={formData.state}
          placeholder="Selecionar"
          onValueChange={(e) => setFormData((prev) => ({ ...prev, state: e }))}
          width="100%"
        />
      </div>

      <div className={formButtonContainer}>
        <Button variant="outlined" disabled={isSubmitting} onClick={onBack}>
          Voltar
        </Button>
        <Button variant="solid" type="submit" disabled={isSubmitting}>
          Finalizar
        </Button>
      </div>
    </form>
  );
}
