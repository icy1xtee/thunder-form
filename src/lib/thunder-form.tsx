import { useFormik } from "formik";
import React, { cloneElement, ReactElement } from "react";
import { ThunderFormProps } from "./types/thunder-form";
import { flattenFields } from "./utils/flatten-fields";
import { computeFormSchema } from "./utils/compute-form-schema";
import { ThunderBlock } from "./types/thunder-block";
import { getDefaultPlaceholder } from "./utils/get-default-placeholder";

export function ThunderForm({
  blocks,
  onSubmit,
  formProps,
  messageForRequiredFields,
  componentsBundle,
}: ThunderFormProps) {
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: flattenFields(blocks),
    validationSchema: computeFormSchema(blocks, messageForRequiredFields),
    onSubmit: onSubmit,
  });

  const getBlockProps = (block: ThunderBlock) => {
    if (!block.bundleType || !block.id) return;
    return {
      key: block.id,
      id: block.id,
      name: block.id,
      placeholder: block.placeholder ?? getDefaultPlaceholder(block),
      value: values[block.id],
      onChange: handleChange,
      onBlur: handleBlur,
      // i want to spread block in here
    };
  };

  return (
    <form {...formProps} onSubmit={handleSubmit}>
      {blocks.map((block) => {
        if (block.wrapper?.id && block.wrapper.bundleType && block.elements) {
          const Wrapper = componentsBundle[
            block.wrapper.bundleType
            // TODO: type properly
          ] as unknown as ReactElement<React.HTMLAttributes<HTMLElement>>;

          return cloneElement(Wrapper, {
            key: block.wrapper.id,
            children: (
              <>
                {block.elements.map((el) => {
                  if (!el.bundleType || !el.id) return;
                  const Component = componentsBundle[el.bundleType];
                  return cloneElement(Component, getBlockProps(el));
                })}
              </>
            ),
            // TODO: i want to spread block props in here
          });
        }

        if (!block.bundleType || !block.id) return;
        const Component = componentsBundle[block.bundleType];
        return cloneElement(Component, getBlockProps(block));
      })}
      {cloneElement(
        // TODO: type properly
        componentsBundle.submitButton as unknown as ReactElement<{
          type: string;
        }>,
        {
          type: "submit",
          // TODO: i want to spread submitButton props in here
        }
      )}
    </form>
  );
}
