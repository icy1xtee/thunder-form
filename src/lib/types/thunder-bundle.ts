import { ReactElement } from "react";

type JSXElementTag = keyof React.JSX.IntrinsicElements;

type ElementFromJSX<T extends JSXElementTag> =
  React.JSX.IntrinsicElements[T] extends React.DetailedHTMLProps<
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export function defineThunderBundle<T extends Record<string, ReactElement>>(
  components: ThunderBundle<T>
) {
  return components;
}
