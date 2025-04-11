import * as yup from "yup";
import { InputKeys } from "../types/thunder-form";

export const getPreDoneFields = (field: InputKeys, message?: string) => {
  const preDoneFields: Record<InputKeys, yup.AnySchema> = {
    // TODO: add more
    email: yup.string().email().required(message),
    surname: yup.string().required(message),
    name: yup.string().required(message),
    age: yup.number().positive().integer().required(message),
  };

  return preDoneFields[field];
};
