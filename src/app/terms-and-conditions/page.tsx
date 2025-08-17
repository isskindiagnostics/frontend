import { theme } from "isskinui";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos e Condições",
  description: "Description specific to this page",
};

export default function TermsAndConditions() {
  return (
    <p style={{ fontFamily: theme.typography.fontFamilyBody }}>
      Termos e Condições
    </p>
  );
}
