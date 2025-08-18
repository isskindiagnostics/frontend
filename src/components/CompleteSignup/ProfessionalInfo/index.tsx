import { Button, InputField, Select } from "isskinui";
import { useState } from "react";

import { stepForm } from "@/app/complete-signup/index.css";
import { UserProfessionalInfo } from "@/types/user";

import { COUNCIL_VALIDATION, REGISTER_FIELDS } from "../data";
import { formButtonContainer, twoFieldsRow } from "../index.css";

type ProfessionalInfoProps = {
  professionalInfo: UserProfessionalInfo;
  onNext: (professionalInfo: UserProfessionalInfo) => void;
  onBack?: () => void;
  isSubmitting: boolean;
};

export default function ProfessionalInfo({
  professionalInfo,
  onNext,
  onBack,
  isSubmitting,
}: ProfessionalInfoProps) {
  const [formData, setFormData] = useState(professionalInfo);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateRegisterNumber = (number: string, council: string): boolean => {
    const rules =
      COUNCIL_VALIDATION[council as keyof typeof COUNCIL_VALIDATION] ||
      COUNCIL_VALIDATION.default;

    return number.length >= rules.min && number.length <= rules.max;
  };

  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!formData.institution.trim()) {
      newErrors.institution = "Escolha uma opção.";
    }

    if (!formData.register.council.trim()) {
      newErrors.council = "Escolha um conselho.";
    }

    if (!formData.register.state.trim()) {
      newErrors.state = "Escolha um estado.";
    }

    const registerNumber = formData.register.number.trim();
    if (!registerNumber) {
      newErrors.registerNumber = "O número do registro é obrigatório.";
    } else if (
      !validateRegisterNumber(registerNumber, formData.register.council)
    ) {
      newErrors.registerNumber =
        "Número de registro inválido para o conselho selecionado.";
    }

    return newErrors;
  };

  const updateRegisterField = (
    field: keyof typeof formData.register,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      register: { ...prev.register, [field]: value },
    }));
  };

  const handleRegisterNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 7);
    updateRegisterField("number", value);
  };

  const handleSelectChange = (
    field: keyof typeof formData.register,
    value: string
  ) => {
    updateRegisterField(field, value);
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
      <div>
        <div className={twoFieldsRow}>
          {REGISTER_FIELDS.map((register, idx) => (
            <Select
              key={idx}
              label={register.label}
              options={register.options}
              placeholder={register.placeholder}
              value={formData.register[register.value]}
              onValueChange={(value: string) =>
                handleSelectChange(register.value, value)
              }
              error={errors[register.errorKey]}
              disabled={isSubmitting}
            />
          ))}

          <InputField
            label="Número do Registro"
            type="text"
            name="registerNumber"
            value={formData.register.number}
            onChange={handleRegisterNumberChange}
            placeholder="Número"
            width="100%"
            error={errors.registerNumber}
            disabled={isSubmitting}
            required
          />
        </div>
      </div>

      <InputField
        label="Clínica ou hospital onde atua"
        type="text"
        name="institution"
        value={formData.institution}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, institution: e.target.value }))
        }
        width="100%"
        error={errors.institution}
        disabled={isSubmitting}
        required
      />

      <div className={formButtonContainer}>
        <Button variant="outlined" disabled={isSubmitting} onClick={onBack}>
          Voltar
        </Button>
        <Button variant="solid" type="submit" disabled={isSubmitting}>
          Próximo
        </Button>
      </div>
    </form>
  );
}
