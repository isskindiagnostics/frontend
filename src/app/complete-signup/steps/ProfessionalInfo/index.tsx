import { Button, InputField, Select } from "isskinui";
import { useState } from "react";

import { UserProfessionalInfo } from "@/types/user";

import {
  formButtonContainer,
  formHeading,
  stepForm,
  twoFieldsRow,
} from "../index.css";

import { BRAZILIAN_STATES, PROFESSIONAL_REGISTRATION } from "./data";

type ProfessionalInfoProps = {
  professionalInfo: UserProfessionalInfo;
  onNext: (professionalInfo: UserProfessionalInfo) => void;
  onBack: () => void;
  isSubmitting: boolean;
};

export default function ProfessionalInfo({
  professionalInfo,
  onNext,
  onBack,
  isSubmitting,
}: ProfessionalInfoProps) {
  const [formData, setFormData] = useState(professionalInfo);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const professionalRegister = [
    {
      label: "Registro Profissional",
      placeholder: "Conselho",
      options: PROFESSIONAL_REGISTRATION,
      value: "council" as keyof typeof formData.register,
      errorKey: "council",
    },
    {
      label: "",
      placeholder: "Estado",
      options: BRAZILIAN_STATES,
      value: "state" as keyof typeof formData.register,
      errorKey: "state",
    },
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.institution.trim()) {
      newErrors["institution"] = "Escolha uma opção.";
    }

    if (!formData.register.council.trim()) {
      newErrors["council"] = "Escolha um conselho.";
    }

    if (!formData.register.state.trim()) {
      newErrors["state"] = "Escolha um estado.";
    }
    const registerNumber = formData.register.number.trim();
    const council = formData.register.council;

    if (!registerNumber) {
      newErrors["registerNumber"] = "O número do registro é obrigatório.";
    } else {
      let isValid = false;

      if (
        council === "CRM" &&
        registerNumber.length >= 5 &&
        registerNumber.length <= 6
      ) {
        isValid = true;
      } else if (
        council === "COREN" &&
        registerNumber.length >= 6 &&
        registerNumber.length <= 7
      ) {
        isValid = true;
      } else if (
        !council &&
        registerNumber.length >= 5 &&
        registerNumber.length <= 8
      ) {
        isValid = true;
      }

      if (!isValid) {
        newErrors["registerNumber"] =
          "Número de registro inválido para o conselho selecionado.";
      }
    }

    return newErrors;
  };

  const handleRegisterNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 7);
    setFormData((prev) => ({
      ...prev,
      register: { ...prev.register, number: value },
    }));
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

  console.log(errors);

  return (
    <form className={stepForm} onSubmit={handleSubmit}>
      <div className={formHeading}>
        <h2>Informações profissionais</h2>
        <p>
          Esses dados ajudam a validar seu vínculo profissional na plataforma.
        </p>
      </div>

      <div>
        <div
          className={twoFieldsRow}
          style={{
            alignItems: Object.keys(errors).length === 0 ? "end" : "center",
          }}
        >
          {professionalRegister.map((register, idx) => (
            <Select
              key={idx}
              label={register.label}
              options={register.options}
              placeholder={register.placeholder}
              value={formData.register[register.value]}
              onValueChange={(value: string) =>
                setFormData((prev) => ({
                  ...prev,
                  register: {
                    ...prev.register,
                    [register.value]: value,
                  },
                }))
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
            error={errors["registerNumber"]}
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
        error={errors["institution"]}
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
