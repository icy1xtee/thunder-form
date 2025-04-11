export interface ThunderBlock
  extends Partial<React.HTMLAttributes<HTMLDivElement>> {
  id?: string;
  initialValue?: string;
  bundleType?: string;
  placeholder?: string;
  wrapper?: Pick<ThunderBlock, "id" | "bundleType">;
  elements?: ThunderBlock[];
}
