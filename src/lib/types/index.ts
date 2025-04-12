import { FormikConfig } from "formik";
import { defineThunderBundle } from "../utils/define-thunder-bundle";

//
export interface ThunderBlock
  extends Partial<React.HTMLAttributes<HTMLElement>> {
  id?: string;
  initialValue?: string;
  bundleType?: string;
  placeholder?: string;
  wrapper?: Pick<ThunderBlock, "id" | "bundleType">;
  elements?: ThunderBlock[];
}
export type ThunderBlockId = ThunderBlock["id"];
//

//
type JSXElementTag = keyof React.JSX.IntrinsicElements;

type ElementFromJSX<T extends JSXElementTag> =
  React.JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<
    infer _,
    infer E
  >
    ? E
    : never;

export type ThunderBundle<T extends Record<string, React.ReactElement>> = {
  [K in keyof T]: T[K] extends React.ReactElement<unknown, infer Type>
    ? Type extends JSXElementTag
      ? React.ReactElement<ElementFromJSX<Type>>
      : React.ReactElement
    : never;
};
//

//
type ExtractBlockIds<T extends readonly ThunderBlock[]> = T[number] extends {
  id: infer ID extends string;
}
  ? ID
  : never;

type InferThunderValues<T extends readonly ThunderBlock[]> = {
  [K in ExtractBlockIds<T>]: string;
};

type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

export type ThunderFlattenFields<T> = T extends readonly ThunderBlock[]
  ? Expand<InferThunderValues<T>>
  : never;
//

export interface ThunderFormProps<T extends readonly ThunderBlock[]> {
  blocks: T;
  componentsBundle: ReturnType<typeof defineThunderBundle>;
  onSubmit: FormikConfig<ThunderFlattenFields<T>>["onSubmit"];
  formProps?: React.HTMLProps<HTMLFormElement>;
  messageForRequiredFields?: string;
}
