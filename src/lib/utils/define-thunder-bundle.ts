import { ReactElement } from "react";
import { ThunderBundle } from "../types";

export function defineThunderBundle<T extends Record<string, ReactElement>>(
  components: ThunderBundle<T>
) {
  return components;
}
