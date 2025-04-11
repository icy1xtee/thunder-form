import { ThunderBlock } from "../types/thunder-block";
import { InputKeys } from "../types/thunder-form";
import { getPreDoneFields } from "./get-pre-done-fields";
import * as yup from "yup";

export const computeFormSchema = (
  blocks: ThunderBlock[],
  messageForRequiredFields?: string
) => {
  const shape: Record<string, yup.AnySchema> = {};

  for (const block of blocks) {
    // TODO: remove hardcode
    shape[block.id!] = getPreDoneFields(
      block.id! as InputKeys,
      messageForRequiredFields
    );
  }

  return yup.object().shape(shape);
};
