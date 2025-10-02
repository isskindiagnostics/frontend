"use client";
import { Badge, IconLink, theme, Notification, Download } from "isskinui";
import Image from "next/image";
import { useState, useEffect } from "react";

import ContentBlock from "@/components/ContentBlock";
import { formatPrice } from "@/components/PricingCard";
import { useShowToast } from "@/hooks/useShowToast";
import { useUserData } from "@/hooks/useUserData";
import { StripeInvoice } from "@/stripe/types";
import { formatDate } from "@/utils/date";

import InvoicesSkeleton from "../InvoicesSkeleton";

import * as styles from "./index.css";

type BillingItem = {
  id: string;
  type: "invoice" | "receipt";
  invoiceNumber: string;
  date: string;
  price: string;
  status: string;
  downloadUrl: string | null;
  hostedUrl: string | null;
  description?: string;
};

type ChargeItem = {
  id: string;
  created: number;
  amount: number;
  status: string;
  receipt_url: string | null;
  description?: string;
};

type StatusLabels = {
  [key: string]: string;
};

const getStatusLabel = (status: string): string => {
  const statusLabels: StatusLabels = {
    draft: "Rascunho",
    open: "Em aberto",
    paid: "Pago",
    void: "Cancelado",
    uncollectible: "Incobrável",
    succeeded: "Pago", // For charges
  };
  return statusLabels[status] || status;
};

export const tableHead = ["Protocolo", "Data", "Descrição", "Preço", "Status"];

const InvoicesTab = () => {
  const { userData } = useUserData();
  const [billingItems, setBillingItems] = useState<BillingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMoreInvoices, setHasMoreInvoices] = useState<boolean>(false);
  const [hasMoreCharges, setHasMoreCharges] = useState<boolean>(false);
  const [invoiceStartingAfter, setInvoiceStartingAfter] = useState<
    string | null
  >(null);
  const [chargeStartingAfter, setChargeStartingAfter] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [viewInvoiceError, setViewInvoiceError] = useShowToast();
  const [downloadInvoiceError, setDownloadInvoiceError] = useShowToast();

  const fetchBillingData = async (loadMore: boolean = false): Promise<void> => {
    try {
      if (loadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const customerId = userData?.subscription.stripeData?.customerId;
      if (!customerId) {
        throw new Error("Customer ID not found");
      }

      const invoiceParams = new URLSearchParams({
        customer: customerId,
        limit: "10",
      });

      if (loadMore && invoiceStartingAfter) {
        invoiceParams.append("starting_after", invoiceStartingAfter);
      }

      const chargeParams = new URLSearchParams({
        customer: customerId,
        limit: "10",
      });

      if (loadMore && chargeStartingAfter) {
        chargeParams.append("starting_after", chargeStartingAfter);
      }

      const [invoicesResponse, chargesResponse] = await Promise.all([
        fetch(`/api/stripe/invoices?${invoiceParams}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
        fetch(`/api/stripe/charges?${chargeParams}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }),
      ]);

      if (!invoicesResponse.ok || !chargesResponse.ok) {
        throw new Error("Failed to fetch billing data");
      }

      const invoicesData = await invoicesResponse.json();
      const chargesData = await chargesResponse.json();

      const formattedInvoices: BillingItem[] = invoicesData.invoices.map(
        (invoice: StripeInvoice) => ({
          id: invoice.id,
          type: "invoice" as const,
          invoiceNumber: invoice.number || `INV-${invoice.id.slice(-8)}`,
          date: formatDate(invoice.created),
          price: formatPrice(invoice.amount_paid),
          status: invoice.status,
          downloadUrl: invoice.invoice_pdf,
          hostedUrl: invoice.hosted_invoice_url,
          description: "Assinatura Premium",
        })
      );

      const formattedCharges: BillingItem[] = chargesData.charges.map(
        (charge: ChargeItem) => ({
          id: charge.id,
          type: "receipt" as const,
          invoiceNumber: `REC-${charge.id.slice(-8)}`,
          date: formatDate(charge.created),
          price: formatPrice(charge.amount),
          status: charge.status,
          downloadUrl: charge.receipt_url,
          hostedUrl: charge.receipt_url,
          description: charge.description || "Compra Flex",
        })
      );

      const allItems = [...formattedInvoices, ...formattedCharges].sort(
        (a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        }
      );

      if (loadMore) {
        setBillingItems((prev: BillingItem[]) => {
          const existingIds = new Set(prev.map((item) => item.id));
          const newItems = allItems.filter((item) => !existingIds.has(item.id));
          return [...prev, ...newItems];
        });
      } else {
        setBillingItems(allItems);
      }

      setHasMoreInvoices(invoicesData.has_more);
      setHasMoreCharges(chargesData.has_more);

      if (invoicesData.invoices.length > 0) {
        setInvoiceStartingAfter(
          invoicesData.invoices[invoicesData.invoices.length - 1].id
        );
      }
      if (chargesData.charges.length > 0) {
        setChargeStartingAfter(
          chargesData.charges[chargesData.charges.length - 1].id
        );
      }
    } catch (err) {
      console.log("Error fetching billing data:", err);
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const renderBadge = (status: string) => {
    const label = getStatusLabel(status);

    if (status === "void") {
      return (
        <Badge
          label={label}
          style={{ backgroundColor: theme.colors.functionsError }}
        />
      );
    } else if (status === "paid" || status === "succeeded") {
      return (
        <Badge
          label={label}
          style={{ backgroundColor: theme.colors.functionsSuccess }}
        />
      );
    } else if (status === "open") {
      return (
        <Badge
          label={label}
          style={{ backgroundColor: theme.colors.functionsWarning }}
        />
      );
    }
    return <Badge label={label} />;
  };

  const handleViewItem = (item: BillingItem): void => {
    if (item.hostedUrl) {
      window.open(item.hostedUrl, "_blank");
    } else {
      console.log("No hosted URL available for item:", item.id);
      setViewInvoiceError(
        item.type === "invoice"
          ? "Erro ao gerar fatura."
          : "Erro ao gerar recibo."
      );
    }
  };

  const handleDownloadItem = (e: React.MouseEvent, item: BillingItem): void => {
    e.stopPropagation(); // Prevent row click

    if (item.downloadUrl) {
      if (item.type === "receipt") {
        // For receipts, open in new tab since they're not PDFs
        window.open(item.downloadUrl, "_blank");
      } else {
        // For invoice PDFs, download
        const link = document.createElement("a");
        link.href = item.downloadUrl;
        link.download = `${item.invoiceNumber}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } else {
      console.log("No download URL available for item:", item.id);
      setDownloadInvoiceError(
        item.type === "invoice"
          ? "Erro ao baixar fatura"
          : "Erro ao baixar recibo"
      );
    }
  };

  useEffect(() => {
    if (userData?.subscription.stripeData) {
      fetchBillingData();
    }
  }, [userData?.subscription.stripeData]);

  if (loading) {
    return (
      <div className={styles.invoicesContentWrapper}>
        <InvoicesSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.invoicesContentWrapper}>
        <ContentBlock className={styles.tableMinHeight}>
          <table className={styles.table}>
            <thead className={styles.tableHeadGroup}>
              <tr>
                {tableHead.map((item: string, idx: number) => (
                  <th
                    className={`${styles.tableHead} ${styles.columnWidths?.[idx] || ""}`}
                    key={idx}
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              <tr>
                <td colSpan={6}>
                  <div className={styles.noInvoicesWrapper}>
                    <Image
                      src="/images/cross.png"
                      alt=""
                      width={100}
                      height={100}
                    />
                    <p>
                      Erro ao carregar os dados de faturamento. Tente novamente
                      mais tarde.
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </ContentBlock>
      </div>
    );
  }

  const hasMore = hasMoreInvoices || hasMoreCharges;

  return (
    <>
      {viewInvoiceError && (
        <Notification type="error" label={viewInvoiceError} />
      )}

      {downloadInvoiceError && (
        <Notification type="error" label={downloadInvoiceError} />
      )}

      <div className={styles.invoicesContentWrapper}>
        <ContentBlock
          className={`${styles.tableMinHeight}`}
          style={{
            flexGrow: billingItems.length >= 7 ? 1 : "inherit",
          }}
        >
          <div className={styles.scrollWrapper}>
            <table className={styles.table}>
              <thead className={styles.tableHeadGroup}>
                <tr>
                  {tableHead.map((item: string, idx: number) => (
                    <th
                      className={`${styles.tableHead} ${styles.columnWidths?.[idx] || ""}`}
                      key={idx}
                    >
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {billingItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      style={{ textAlign: "center", padding: "2rem" }}
                    >
                      Nenhuma fatura ou recibo encontrado
                    </td>
                  </tr>
                ) : (
                  billingItems.map((item: BillingItem, idx: number) => {
                    const isLast = idx === billingItems.length - 1;

                    return (
                      <tr
                        key={item.id}
                        style={{ cursor: "pointer" }}
                        role="button"
                        onClick={() => handleViewItem(item)}
                      >
                        <td
                          className={`${styles.tableData} ${styles.columnWidths?.[0] || ""} ${isLast ? styles.noBorder : ""}`}
                        >
                          {item.invoiceNumber}
                        </td>
                        <td
                          className={`${styles.tableData} ${styles.columnWidths?.[1] || ""} ${isLast ? styles.noBorder : ""}`}
                        >
                          {item.date}
                        </td>
                        <td
                          className={`${styles.tableData} ${styles.columnWidths?.[2] || ""} ${isLast ? styles.noBorder : ""}`}
                        >
                          {item.description}
                        </td>
                        <td
                          className={`${styles.tableData} ${styles.columnWidths?.[3] || ""} ${isLast ? styles.noBorder : ""}`}
                        >
                          {item.price}
                        </td>
                        <td
                          className={`${styles.tableData} ${styles.columnWidths?.[4] || ""} ${isLast ? styles.noBorder : ""}`}
                        >
                          {renderBadge(item.status)}
                        </td>
                        <td
                          className={`${styles.tableData} ${styles.columnWidths?.[5] || ""} ${isLast ? styles.noBorder : ""} ${styles.bin || ""}`}
                        >
                          <Download
                            width={22}
                            onClick={(e: React.MouseEvent) =>
                              handleDownloadItem(e, item)
                            }
                            style={{ cursor: "pointer" }}
                          />
                        </td>
                      </tr>
                    );
                  })
                )}

                {hasMore && (
                  <tr>
                    <td colSpan={6} className={styles.tableDataHasMore}>
                      <IconLink
                        icon="Rotate"
                        renderAs="button"
                        onClick={() => fetchBillingData(true)}
                        disabled={loadingMore}
                      >
                        {loadingMore ? "Carregando..." : "Carregar mais"}
                      </IconLink>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </ContentBlock>
      </div>
    </>
  );
};

export default InvoicesTab;
