import FlameAtlasApp from "@/components/FlameAtlasApp";

/** Shared workspace persists across client-side route changes. */
export default function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  return <><FlameAtlasApp />{children}</>;
}
