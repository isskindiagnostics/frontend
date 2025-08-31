"use client";
import { InputField, Notification, Button, Select } from "isskinui";
import { useEffect, useState } from "react";

import {
  COUNCIL_VALIDATION,
  REGISTER_FIELDS,
  WORKING_FIELD_SELECT,
} from "@/components/CompleteSignup/data";
import { twoFieldsRow } from "@/components/CompleteSignup/index.css";
import ContentBlock from "@/components/ContentBlock";
import { useShowToast } from "@/hooks/useShowToast";
import { useUserData } from "@/hooks/useUserData";

import { titleAndDescription } from "../index.css";

import {
  accountButtonWrapper,
  dataContentBlock,
  inputWrapper,
} from "./index.css";

export default function DataTab() {
  const { userData, updateUserData } = useUserData();
  const [successMessage, setSuccessMessage] = useShowToast();
  const [errorMessage, setErrorMessage] = useShowToast();
  const [registerNumberError, setRegisterNumberError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [fieldOfWork, setFieldOfWork] = useState("");
  const [institution, setInstitution] = useState("");
  const [council, setCouncil] = useState("");
  const [state, setState] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");

  const [originalFieldOfWork, setOriginalFieldOfWork] = useState("");
  const [originalInstitution, setOriginalInstitution] = useState("");
  const [originalCouncil, setOriginalCouncil] = useState("");
  const [originalState, setOriginalState] = useState("");
  const [originalRegisterNumber, setOriginalRegisterNumber] = useState("");

  const hasFieldOfWorkChanges = fieldOfWork !== originalFieldOfWork;
  const hasInstitutionChanges = institution !== originalInstitution;
  const hasCouncilChanges = council !== originalCouncil;
  const hasStateChanges = state !== originalState;
  const hasRegisterNumberChanges = registerNumber !== originalRegisterNumber;
  const hasChanges =
    hasFieldOfWorkChanges ||
    hasInstitutionChanges ||
    hasCouncilChanges ||
    hasStateChanges ||
    hasRegisterNumberChanges;

  useEffect(() => {
    if (registerNumber && council) {
      const isValid = validateRegisterNumber(registerNumber, council);
      if (!isValid) {
        const rules =
          COUNCIL_VALIDATION[council as keyof typeof COUNCIL_VALIDATION] ||
          COUNCIL_VALIDATION.default;
        setRegisterNumberError(
          `O número deve ter entre ${rules.min} e ${rules.max} dígitos`
        );
      } else {
        setRegisterNumberError("");
      }
    } else {
      setRegisterNumberError("");
    }
  }, [registerNumber, council]);

  useEffect(() => {
    if (userData?.professionalInfo) {
      const currentInstitution = userData.professionalInfo.institution || "";
      const currentCouncil = userData.professionalInfo.register?.council || "";
      const currentState = userData.professionalInfo.register?.state || "";
      const currentRegisterNumber =
        userData.professionalInfo.register?.number || "";
      const storedFieldOfWork = userData.professionalInfo.fieldOfWork || "";

      const matchingOption = WORKING_FIELD_SELECT.find(
        (option) => option.label === storedFieldOfWork
      );
      const currentFieldOfWork = matchingOption?.value || "";

      setFieldOfWork(currentFieldOfWork);
      setInstitution(currentInstitution);
      setCouncil(currentCouncil);
      setState(currentState);
      setRegisterNumber(currentRegisterNumber);

      setOriginalFieldOfWork(currentFieldOfWork);
      setOriginalInstitution(currentInstitution);
      setOriginalCouncil(currentCouncil);
      setOriginalState(currentState);
      setOriginalRegisterNumber(currentRegisterNumber);
    }
  }, [userData]);

  const validateRegisterNumber = (number: string, council: string): boolean => {
    const rules =
      COUNCIL_VALIDATION[council as keyof typeof COUNCIL_VALIDATION] ||
      COUNCIL_VALIDATION.default;

    return number.length >= rules.min && number.length <= rules.max;
  };

  const handleSave = async () => {
    if (!hasChanges) return;

    if (registerNumber && council) {
      const isValid = validateRegisterNumber(registerNumber, council);
      if (!isValid) {
        setErrorMessage("Corrija o número do registro antes de salvar.");
        return;
      }
    }

    setIsSaving(true);
    try {
      const updates: { [key: string]: string } = {};

      if (hasFieldOfWorkChanges) {
        const selectedOption = WORKING_FIELD_SELECT.find(
          (option) => option.value === fieldOfWork
        );
        updates["professionalInfo.fieldOfWork"] = selectedOption?.label || "";
      }

      if (hasInstitutionChanges) {
        updates["professionalInfo.institution"] = institution;
      }

      if (hasCouncilChanges) {
        updates["professionalInfo.register.council"] = council;
      }

      if (hasStateChanges) {
        updates["professionalInfo.register.state"] = state;
      }

      if (hasRegisterNumberChanges) {
        updates["professionalInfo.register.number"] = registerNumber;
      }

      const success = await updateUserData(updates);

      if (success) {
        setSuccessMessage("Informações profissionais atualizados com sucesso!");

        // Update original values
        setOriginalFieldOfWork(fieldOfWork);
        setOriginalInstitution(institution);
        setOriginalCouncil(originalCouncil);
        setOriginalState(state);
        setOriginalRegisterNumber(registerNumber);
      } else {
        setErrorMessage("Falha ao atualizar dados. Tente novamente.");
      }
    } catch (error) {
      console.error("Failed to save professional data:", error);
      setErrorMessage(
        "Erro ao salvar informações profissionais. Tente novamente."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      {successMessage && <Notification type="success" label={successMessage} />}
      {errorMessage && <Notification type="error" label={errorMessage} />}
      <ContentBlock className={dataContentBlock}>
        <div className={titleAndDescription}>
          <h3>Informações profissionais</h3>
          <p>
            Atualize seus dados de atuação, registro profissional e local de
            trabalho.
          </p>
        </div>

        <div className={inputWrapper}>
          <div className={twoFieldsRow}>
            <Select
              label="Área de atuação"
              options={WORKING_FIELD_SELECT}
              value={fieldOfWork}
              onValueChange={setFieldOfWork}
              disabled={isSaving}
            />

            <InputField
              label="Clínica ou hospital onde atua"
              type="text"
              name="institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              width="100%"
              disabled={isSaving}
              required
            />
          </div>

          <div className={twoFieldsRow}>
            {REGISTER_FIELDS.map((register, idx) => (
              <Select
                key={idx}
                label={register.label}
                options={register.options}
                placeholder={register.placeholder}
                value={register.value === "council" ? council : state}
                onValueChange={(e) => {
                  if (register.value === "council") {
                    setCouncil(e);
                  } else {
                    setState(e);
                  }
                }}
                disabled={isSaving}
              />
            ))}

            <InputField
              label=""
              type="text"
              name="registerNumber"
              value={registerNumber}
              onChange={(e) => setRegisterNumber(e.target.value)}
              placeholder="Número"
              width="100%"
              error={registerNumberError}
              disabled={isSaving}
              required
            />
          </div>
        </div>

        {hasChanges && (
          <div className={accountButtonWrapper}>
            <Button onClick={handleSave} disabled={isSaving}>
              Salvar alterações
            </Button>
          </div>
        )}
      </ContentBlock>
    </>
  );
}
