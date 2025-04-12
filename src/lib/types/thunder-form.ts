import { FormikConfig } from "formik";
import { ThunderBlock } from "./thunder-block";
import { FlattenFields } from "../utils/flatten-fields";
import { defineThunderBundle } from "../utils/define-thunder-bundle";

/**
 * @deprecated to delete
 */
export type InputKeys = "email" | "surname" | "name" | "age";

export interface ThunderFormProps {
  blocks: ThunderBlock[];
  formProps?: React.HTMLProps<HTMLFormElement>;
  onSubmit: FormikConfig<FlattenFields>["onSubmit"];
  componentsBundle: ReturnType<typeof defineThunderBundle>;
  messageForRequiredFields?: string;
}
