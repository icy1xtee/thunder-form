import { ThunderBlock } from "../types/thunder-block";

export const getDefaultPlaceholder = ({ id }: ThunderBlock): string => {
  if (!id) return "";
  return id
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char, index) =>
      index === 0 ? char.toUpperCase() : char.toLowerCase()
    )
    .trim();
};
