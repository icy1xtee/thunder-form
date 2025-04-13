import * as yup from "yup";
import { ThunderBlock, ThunderMessages } from "../types";

// TODO: move typing, join FieldRuleContext w ThunderCommonMessages
type FieldRuleContext = {
  requiredMessage?: string;
};

type FieldRule = (ctx: FieldRuleContext) => yup.AnySchema;

type FieldSchemaMap = Record<string, FieldRule>;

const defineFieldRules = <T extends FieldSchemaMap>(rules: T) => {
  return rules;
};

const fieldRules = defineFieldRules({
  email: ({ requiredMessage }) =>
    yup.string().email().required(requiredMessage),
  surname: ({ requiredMessage }) => yup.string().required(requiredMessage),
  name: ({ requiredMessage }) => yup.string().required(requiredMessage),
  age: ({ requiredMessage }) =>
    yup.number().positive().integer().required(requiredMessage),
});

const getFieldDefaultSchema = (
  fieldId: keyof typeof fieldRules,
  ctx: { requiredMessage?: string }
): yup.AnySchema => {
  const rule = fieldRules[fieldId];
  return rule ? rule(ctx) : yup.string();
};

export const computeFormSchema = (
  blocks: ThunderBlock[],
  commonMessages?: ThunderMessages
) => {
  const shape: Record<string, yup.AnySchema> = {};

  for (const block of blocks) {
    if (block.id) {
      const schema = getFieldDefaultSchema(
        block.id as keyof typeof fieldRules,
        {
          requiredMessage:
            block.customMessages?.requiredMessage ??
            commonMessages?.requiredMessage,
        }
      );
      shape[block.id] = schema;
    }
  }

  return yup.object().shape(shape);
};
