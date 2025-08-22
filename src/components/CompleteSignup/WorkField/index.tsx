import { Button, Notification, FormCard } from "isskinui";
import { useState } from "react";

import { stepForm } from "@/app/signup/complete/index.css";
import { UserProfessionalInfo } from "@/types/user";

import { WORKING_FIELD } from "../data";
import { cardsRow, formButtonContainer } from "../index.css";

type WorkFieldProps = {
  professionalInfo: UserProfessionalInfo;
  onNext: (professionalInfo: UserProfessionalInfo) => void;
  onBack?: () => void;
  isSubmitting: boolean;
};

export default function WorkField({
  professionalInfo,
  onNext,
  onBack,
  isSubmitting,
}: WorkFieldProps) {
  const [formData, setFormData] = useState(professionalInfo);
  const [error, setError] = useState<string | null>(null);
  const isFormValid = formData.fieldOfWork.trim() !== "";

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
        <div className={cardsRow}>
          {WORKING_FIELD.map((type) => (
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
          <Button type="submit" disabled={isSubmitting || !isFormValid}>
            Próximo
          </Button>
        </div>
      </form>
    </>
  );
}
