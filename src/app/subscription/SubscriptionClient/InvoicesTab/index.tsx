"use client";
import {
  Badge,
  IconLink,
  theme,
  Notification,
  Download,
} from "isskinui";
import Image from "next/image";
import { useState, useEffect } from "react";

import ContentBlock from "@/components/ContentBlock";
import { formatPrice } from "@/components/PricingCard";
import { useShowToast } from "@/hooks/useShowToast";
import { useUserData } from "@/hooks/useUserData";
import { StripeInvoice, StripeInvoicesResponse } from "@/stripe/types";
import { formatDate } from "@/utils/date";

import InvoicesSkeleton from "../InvoicesSkeleton";

import * as styles from "./index.css";

type Invoice = {
  id: string;
  invoiceNumber: string;
  date: string;
  price: string;
  status: string;
  downloadUrl: string | null;
  hostedUrl: string | null;
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
  };
  return statusLabels[status] || status;
};

export const tableHead = ["Protocolo", "Data", "Preço", "Status"];

const InvoicesTab = () => {
  const { userData } = useUserData();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [startingAfter, setStartingAfter] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewInvoiceError, setViewInvoiceError] = useShowToast();
  const [downloadInvoiceError, setDownloadInvoiceError] = useShowToast();

  const fetchInvoices = async (loadMore: boolean = false): Promise<void> => {
    try {
      if (loadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const params = new URLSearchParams({
        customer: userData?.subscription.stripeData?.customerId || "",
        limit: "10",
      });

      if (loadMore && startingAfter) {
        params.append("starting_after", startingAfter);
      }

      const response = await fetch(`/api/stripe/invoices?${params}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch invoices");
      }

      const data: StripeInvoicesResponse = await response.json();

      const formattedInvoices: Invoice[] = data.invoices.map(
        (invoice: StripeInvoice) => ({
          id: invoice.id,
          invoiceNumber: invoice.number || invoice.id,
          date: formatDate(invoice.created),
          price: formatPrice(invoice.amount_paid),
          status: invoice.status,
          downloadUrl: invoice.invoice_pdf,
          hostedUrl: invoice.hosted_invoice_url,
        })
      );

      if (loadMore) {
        setInvoices((prev: Invoice[]) => [...prev, ...formattedInvoices]);
      } else {
        setInvoices(formattedInvoices);
      }

      setHasMore(data.has_more);
      if (formattedInvoices.length > 0) {
        setStartingAfter(data.invoices[data.invoices.length - 1].id);
      }
    } catch (err) {
      console.error("Error fetching invoices:", err);
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
    } else if (status === "paid") {
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

  const handleViewInvoice = (invoice: Invoice): void => {
    if (invoice.hostedUrl) {
      window.open(invoice.hostedUrl, "_blank");
    } else {
      console.log("No hosted URL available for invoice:", invoice.id);
      setViewInvoiceError("Erro ao gerar farura.");
    }
  };

  const handleDownloadInvoice = (
    e: React.MouseEvent,
    invoice: Invoice
  ): void => {
    e.stopPropagation(); // Prevent row click

    if (invoice.downloadUrl) {
      // Create a temporary link to download the PDF
      const link = document.createElement("a");
      link.href = invoice.downloadUrl;
      link.download = `invoice-${invoice.invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.log("No PDF available for invoice:", invoice.id);
      setDownloadInvoiceError("Erro ao baixar fatura");
    }
  };

  useEffect(() => {
    if (userData?.subscription.stripeData) {
      fetchInvoices();
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
                <td colSpan={5}>
                  <div className={styles.noInvoicesWrapper}>
                    <Image
                      src="/images/cross.png"
                      alt=""
                      width={100}
                      height={100}
                    />
                    <p>
                      Erro ao carregar as faturas. Tente novamente mais tarde.
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
            flexGrow: invoices.length >= 7 ? 1 : "inherit",
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
                {invoices.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      style={{ textAlign: "center", padding: "2rem" }}
                    >
                      Nenhuma fatura encontrada
                    </td>
                  </tr>
                ) : (
                  invoices.map((invoice: Invoice, idx: number) => {
                    const isLast = idx === invoices.length - 1;

                    return (
                      <tr
                        key={invoice.id}
                        style={{ cursor: "pointer" }}
                        role="button"
                        onClick={() => handleViewInvoice(invoice)}
                      >
                        <td
                          className={`${styles.tableData} ${styles.columnWidths?.[0] || ""} ${isLast ? styles.noBorder : ""}`}
                        >
                          {invoice.invoiceNumber}
                        </td>
                        <td
                          className={`${styles.tableData} ${styles.columnWidths?.[1] || ""} ${isLast ? styles.noBorder : ""}`}
                        >
                          {invoice.date}
                        </td>
                        <td
                          className={`${styles.tableData} ${styles.columnWidths?.[2] || ""} ${isLast ? styles.noBorder : ""}`}
                        >
                          {invoice.price}
                        </td>
                        <td
                          className={`${styles.tableData} ${styles.columnWidths?.[3] || ""} ${isLast ? styles.noBorder : ""}`}
                        >
                          {renderBadge(invoice.status)}
                        </td>
                        <td
                          className={`${styles.tableData} ${styles.columnWidths?.[4] || ""} ${isLast ? styles.noBorder : ""} ${styles.bin || ""}`}
                        >
                          <Download
                            width={22}
                            onClick={(e: React.MouseEvent) =>
                              handleDownloadInvoice(e, invoice)
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
                    <td colSpan={5} className={styles.tableDataHasMore}>
                      <IconLink
                        icon="Rotate"
                        renderAs="button"
                        onClick={() => fetchInvoices(true)}
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
