import { ThunderBlock, ThunderFlattenFields } from "../types";

export function getFlattenFields<T extends readonly ThunderBlock[]>(
  blocks: T
): ThunderFlattenFields<T> {
  const result = blocks.reduce((acc, block) => {
    if (block.id) {
      acc[block.id as keyof typeof acc] = block.initialValue ?? "";
    }
    return acc;
  }, {} as Record<string, string>);

  return result as ThunderFlattenFields<T>;
}
