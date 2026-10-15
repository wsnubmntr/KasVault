
import type { ReactNode } from "react";

export default function TransaksiTemplate({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="block">{children}</div>;
}
