import { theme } from "isskinui";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Configurações",
  description: "Description specific to this page",
};

export default function Signup() {
  return (
    <p style={{ fontFamily: theme.typography.fontFamilyBody }}>Configurações</p>
  );
}
