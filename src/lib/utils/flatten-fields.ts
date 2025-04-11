import { ThunderBlock } from "../types/thunder-block";

export type FlattenFieldsReturn = Record<string, string>;
export const flattenFields = (blocks: ThunderBlock[]): FlattenFieldsReturn => {
  return blocks.reduce((acc, block) => {
    if (block.id) {
      acc[block.id] = block.initialValue ?? "";
    }
    return acc;
  }, {} as FlattenFieldsReturn);
};
