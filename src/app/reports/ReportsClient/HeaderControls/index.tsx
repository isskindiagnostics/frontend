import { Chip, Filter } from "isskinui";

import { getInsuranceLabel } from "@/utils/labels";

import * as styles from "./index.css";

type HeaderControlsProps = {
  insurances: string[];
  selectedInsurance: string | null;
  setSelectedInsurance: (value: string | null) => void;
  filteredJobsCount: number;
  loadMoreJobs: () => void;
  onOptionSelect: (value: string | null) => void;
};

const tableHead = ["Protocolo", "Paciente", "Convênio", "Data"];

const HeaderControls = ({
  insurances,
  selectedInsurance,
  setSelectedInsurance,
  filteredJobsCount,
  loadMoreJobs,
  onOptionSelect,
}: HeaderControlsProps) => {
  return (
    <div className={styles.controlsContainer}>
      <div className={styles.chipsWrapper}>
        {insurances.map((insurance) => (
          <Chip
            key={insurance}
            label={getInsuranceLabel(insurance)}
            selected={selectedInsurance === insurance}
            onSelect={() => {
              const nextValue =
                selectedInsurance === insurance ? null : insurance;
              setSelectedInsurance(nextValue);

              if (filteredJobsCount < 8) {
                loadMoreJobs();
              }
            }}
          />
        ))}
      </div>

      <Filter
        options={tableHead}
        optionsPosition="right"
        placeholder="Ordenar por"
        onOptionSelect={onOptionSelect}
      />
    </div>
  );
};

export default HeaderControls;
