import { ThunderBlock } from "../types/thunder-block";

export type FlattenFields = Record<string, string>;
export const getFlattenFields = (blocks: ThunderBlock[]): FlattenFields => {
  return blocks.reduce((acc, block) => {
    if (block.id) {
      acc[block.id] = block.initialValue ?? "";
    }
    return acc;
  }, {} as FlattenFields);
};
