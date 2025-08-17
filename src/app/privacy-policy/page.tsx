import { theme } from "isskinui";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Políticas de Privacidade",
  description: "Description specific to this page",
};

export default function PrivacyPolicy() {
  return (
    <p style={{ fontFamily: theme.typography.fontFamilyBody }}>
      Políticas de Privacidade
    </p>
  );
}
