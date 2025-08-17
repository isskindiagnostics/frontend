import { Button, InputField } from "isskinui";
import { useState } from "react";

import { stepForm } from "@/app/complete-signup/index.css";
import { UserData } from "@/types/user";

import { VALID_AREA_CODES } from "../data";
import {
  customLabel,
  formAreaCode,
  formButtonContainer,
  twoFieldsRow,
} from "../index.css";

type PersonalInfoProps = {
  userData: UserData;
  onNext: (userData: UserData) => void;
  isSubmitting: boolean;
};

export default function PersonalInfo({
  userData,
  onNext,
  isSubmitting,
}: PersonalInfoProps) {
  const [formData, setFormData] = useState(userData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "O nome completo é obrigatório.";
    }

    const areaCode = formData.phoneNumber.areaCode.trim();
    if (!areaCode) {
      newErrors.areaCode = "O DDD é obrigatório.";
    } else if (!/^[1-9][1-9]$/.test(areaCode)) {
      newErrors.areaCode =
        "DDD inválido. Use apenas dois dígitos (ex: 11, 21).";
    } else if (!VALID_AREA_CODES.includes(areaCode)) {
      newErrors.areaCode = "DDD não existe no Brasil.";
    }

    const phoneNumber = formData.phoneNumber.number.replace(/\D/g, "");
    if (!phoneNumber) {
      newErrors.number = "O telefone é obrigatório.";
    } else if (!/^[9]?[0-9]{8}$/.test(phoneNumber)) {
      newErrors.number = "Número inválido. Use 8 ou 9 dígitos.";
    }

    return newErrors;
  };

  const updatePhoneNumber = (field: "areaCode" | "number", value: string) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: { ...prev.phoneNumber, [field]: value },
    }));
  };

  const handleAreaCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 2);
    updatePhoneNumber("areaCode", value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 9);
    updatePhoneNumber("number", value);
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
      <InputField
        label="Nome Completo"
        type="text"
        name="fullName"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        width="100%"
        error={errors.name}
        disabled={isSubmitting}
        required
      />

      <div>
        <label className={customLabel} htmlFor="phoneNumber">
          Número de telefone
        </label>
        <div className={twoFieldsRow}>
          <InputField
            className={formAreaCode}
            label=""
            name="areaCode"
            value={formData.phoneNumber.areaCode}
            onChange={handleAreaCodeChange}
            placeholder="DDD"
            maxLength={2}
            error={errors.areaCode}
            disabled={isSubmitting}
            required
            style={{ padding: 14 }}
          />
          <InputField
            label=""
            id="phoneNumber"
            name="number"
            value={formData.phoneNumber.number}
            onChange={handlePhoneNumberChange}
            placeholder="Número"
            maxLength={9}
            width="100%"
            error={errors.number}
            disabled={isSubmitting}
            required
          />
        </div>
      </div>

      <div className={formButtonContainer}>
        <Button variant="solid" type="submit" disabled={isSubmitting}>
          Próximo
        </Button>
      </div>
    </form>
  );
}
