import * as yup from "yup";
import { ThunderBlock, ThunderBlockId } from "../types";

const getFieldDefaultSchema = (
  field: NonNullable<ThunderBlockId>,
  message?: string
) => {
  const defaultField = yup.string();

  const preDoneFields: Record<NonNullable<ThunderBlockId>, yup.AnySchema> = {
    // TODO: add more
    email: yup.string().email().required(message),
    surname: yup.string().required(message),
    name: yup.string().required(message),
    age: yup.number().positive().integer().required(message),
  };

  // TODO: add custom in front of any of this
  return preDoneFields[field] ?? defaultField;
};

export const computeFormSchema = (
  blocks: ThunderBlock[],
  messageForRequiredFields?: string
) => {
  const shape: Record<string, yup.AnySchema> = {};

  for (const block of blocks) {
    if (block.id) {
      shape[block.id] = getFieldDefaultSchema(
        block.id,
        messageForRequiredFields
      );
    }
  }

  return yup.object().shape(shape);
};
