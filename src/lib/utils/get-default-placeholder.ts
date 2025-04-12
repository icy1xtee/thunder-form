import { ThunderBlockId } from "../types";

export const getDefaultPlaceholder = (id: ThunderBlockId): string => {
  if (!id) return "";
  return id
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char, index) =>
      index === 0 ? char.toUpperCase() : char.toLowerCase()
    )
    .trim();
};
