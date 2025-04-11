import { FormikConfig } from "formik";
import { ThunderBlock } from "./thunder-block";
import { defineThunderBundle } from "./thunder-bundle";
import { FlattenFieldsReturn } from "../utils/flatten-fields";

/**
 * @deprecated to delete
 */
export type InputKeys = "email" | "surname" | "name" | "age";

export interface ThunderFormProps {
  blocks: ThunderBlock[];
  formProps?: React.HTMLProps<HTMLFormElement>;
  onSubmit: FormikConfig<FlattenFieldsReturn>["onSubmit"];
  componentsBundle: ReturnType<typeof defineThunderBundle>;
  messageForRequiredFields?: string;
}
