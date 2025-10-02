import ContentBlock from "@/components/ContentBlock";
import SkeletonCell from "@/components/SkeletonCell";

import { tableHead as tableHeadItems } from "../InvoicesTab";
import {
  columnWidths,
  noBorder,
  table,
  tableData,
  tableHead,
} from "../InvoicesTab/index.css";

export default function InvoicesSkeleton() {
  return (
    <ContentBlock>
      <table className={table}>
        <thead>
          <tr>
            {tableHeadItems.map((item, idx) => (
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
  );
}
