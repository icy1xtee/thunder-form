import React from "react";
import { defineThunderBundle } from "./utils/define-thunder-bundle";
import { ThunderForm } from "./thunder-form";
import { FormikHelpers } from "formik";

const bundle = defineThunderBundle({
  customInput: <input />,
  submitButton: <button>Submit</button>,
});

type FormFields = {
  email: string;
  fullname: string;
};

function ThunderFormUsageExample() {
  const handleSubmit = (
    value: FormFields,
    helper: FormikHelpers<FormFields>
  ) => {
    console.log(value, helper);
  };
  return (
    <ThunderForm
      blocks={[
        { id: "email", bundleType: "customInput" },
        { id: "fullname", bundleType: "customInput" },
      ]}
      componentsBundle={bundle}
      onSubmit={handleSubmit}
    />
  );
}
