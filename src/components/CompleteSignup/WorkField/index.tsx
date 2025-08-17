import { Button, Notification, FormCard } from "isskinui";
import { useState } from "react";

import { UserProfessionalInfo } from "@/types/user";

import {
  cardsRow,
  formButtonContainer,
  formHeading,
  stepForm,
} from "../index.css";

type WorkFieldProps = {
  professionalInfo: UserProfessionalInfo;
  onNext: (professionalInfo: UserProfessionalInfo) => void;
  onBack?: () => void;
  isSubmitting: boolean;
};

const fieldOfWork = [
  { icon: "Doctor", description: "Médico Generalista" },
  { icon: "Pipette", description: "Dermatologista" },
  { icon: "Nurse", description: "Enfermeiro" },
];

export default function WorkField({
  professionalInfo,
  onNext,
  onBack,
  isSubmitting,
}: WorkFieldProps) {
  const [formData, setFormData] = useState(professionalInfo);
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!formData.fieldOfWork || !formData.fieldOfWork.trim()) {
      setError("Por favor selecione uma opção.");
      return false;
    }

    return true;
  };

  const handleFieldOfWorkSelect = (fieldOfWork: string) => {
    setFormData((prev) => ({ ...prev, fieldOfWork }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    onNext(formData);
  };

  return (
    <>
      {error && <Notification type="error" label={error} />}

      <form className={stepForm} onSubmit={handleSubmit}>
        <div className={formHeading}>
          <h2>Qual sua área de atuação?</h2>
          <p>Isso nos ajuda a personalizar sua experiência.</p>
        </div>

        <div className={cardsRow}>
          {fieldOfWork.map((type) => (
            <FormCard
              key={type.description}
              icon={type.icon}
              description={type.description}
              type="button"
              selected={formData.fieldOfWork === type.description}
              onSelect={() => handleFieldOfWorkSelect(type.description)}
            />
          ))}
        </div>

        <div className={formButtonContainer}>
          <Button variant="outlined" disabled={isSubmitting} onClick={onBack}>
            Voltar
          </Button>
          <Button variant="solid" type="submit" disabled={isSubmitting}>
            Próximo
          </Button>
        </div>
      </form>
    </>
  );
}
