import { ThunderBlock, ThunderUtils } from "../types";

export function getFlattenFields<T extends readonly ThunderBlock[]>(
  blocks: T
): ThunderUtils.FlattenFields<T> {
  const result = blocks.reduce((acc, block) => {
    if (block.id) {
      acc[block.id as keyof typeof acc] = block.initialValue ?? "";
    }
    return acc;
  }, {} as Record<string, string>);
  // TODO: too much cust here
  return result as ThunderUtils.FlattenFields<T>;
}
