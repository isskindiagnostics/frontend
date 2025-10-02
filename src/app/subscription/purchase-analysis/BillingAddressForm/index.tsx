import { InputField, Select } from "isskinui";

import { BRAZILIAN_STATES_LONG } from "@/components/CompleteSignup/data";
import { twoFieldsRow } from "@/components/CompleteSignup/index.css";
import ContentBlock from "@/components/ContentBlock";

import { contentBlockWidth } from "../index.css";
import { BillingAddressFormProps } from "../types";

export default function BillingAddressForm({
  formData,
  onFormDataChange,
  addressErrors,
  isProcessing,
  isCheckingPostalCode,
  onPostalCodeChange,
}: BillingAddressFormProps) {
  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onPostalCodeChange(e.target.value);
  };

  return (
    <ContentBlock className={contentBlockWidth}>
      <div className={twoFieldsRow}>
        <InputField
          label="CEP"
          name="postalCode"
          value={formData.postalCode}
          onChange={handlePostalCodeChange}
          error={addressErrors.postalCode}
          disabled={isProcessing || isCheckingPostalCode}
          width="35%"
          maxLength={9}
          required
        />

        <InputField
          label="Bairro"
          name="district"
          value={formData.district}
          onChange={(e) => onFormDataChange({ district: e.target.value })}
          error={addressErrors.district}
          disabled={isProcessing || isCheckingPostalCode}
          width="65%"
          required
        />
      </div>

      <div className={twoFieldsRow}>
        <InputField
          label="Cidade"
          name="city"
          value={formData.city}
          onChange={(e) => onFormDataChange({ city: e.target.value })}
          error={addressErrors.city}
          disabled={isProcessing || isCheckingPostalCode}
          width="70%"
          required
        />

        <Select
          label="Estado"
          options={BRAZILIAN_STATES_LONG}
          value={formData.state}
          placeholder="Selecionar"
          onValueChange={(value) => onFormDataChange({ state: value })}
          disabled={isProcessing || isCheckingPostalCode}
          width="30%"
        />
      </div>

      <div className={twoFieldsRow}>
        <InputField
          label="Logradouro"
          name="street"
          value={formData.street}
          onChange={(e) => onFormDataChange({ street: e.target.value })}
          error={addressErrors.street}
          disabled={isProcessing || isCheckingPostalCode}
          width="100%"
          required
        />

        <InputField
          label="Número"
          name="houseNumber"
          value={formData.houseNumber}
          onChange={(e) => onFormDataChange({ houseNumber: e.target.value })}
          error={addressErrors.houseNumber}
          disabled={isProcessing || isCheckingPostalCode}
          width="150px"
          required
        />
      </div>
    </ContentBlock>
  );
}
