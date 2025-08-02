import ContentBlock from "@/components/ContentBlock";
import SkeletonCell from "@/components/SkeletonCell";
import TopBar from "@/components/TopBar";

import { main } from "../global.css";

import { controlsContainer, chipsWrapper } from "./ReportsClient/HeaderControls/index.css";
import { tableHead, columnWidths, tableData, noBorder, table } from "./ReportsClient/ReportsTable/index.css";

const tableInfo = ["Protocolo", "Paciente", "Convênio", "Data"];

export default function ReportsSkeleton() {
  return (
    <div className={main}>
      <TopBar title="Relatórios">
        <SkeletonCell width={478} height={53} />
      </TopBar>

      <div className={controlsContainer}>
        <div className={chipsWrapper}>
          <SkeletonCell width={180} height={40} />
          <SkeletonCell width={180} height={40} />
          <SkeletonCell width={180} height={40} />
        </div>
        <SkeletonCell width={180} height={40} />
      </div>

      <ContentBlock>
        <table className={table}>
          <thead>
            <tr>
              {tableInfo.map((item, idx) => (
                <th className={`${tableHead} ${columnWidths[idx]}`} key={idx}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 3 }).map((_, idx) => {
              const isLast = idx === 3 - 1;

              return (
                <tr key={`skeleton-${idx}`}>
                  {Array.from({ length: 4 }).map((_, colIdx) => (
                    <td
                      key={colIdx}
                      className={`${tableData} ${columnWidths[idx]} ${isLast && noBorder}`}
                    >
                      <SkeletonCell width={160} height={28} />
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </ContentBlock>
    </div>
  );
}
