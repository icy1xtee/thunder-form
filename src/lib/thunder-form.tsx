import { useFormik } from "formik";
import React, { cloneElement, ReactElement } from "react";
import { ThunderFormProps, ThunderUtils } from "./types";
import { getFlattenFields } from "./utils/get-flatten-fields";
import { computeFormSchema } from "./utils/compute-form-schema";
import { ThunderBlock } from "./types";
import { getDefaultPlaceholder } from "./utils/get-default-placeholder";

export function ThunderForm<const T extends ThunderBlock[]>({
  blocks,
  componentsBundle,
  onSubmit,
  formProps,
  commonMessages,
}: ThunderFormProps<T>) {
  const { values, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: getFlattenFields(blocks),
    validationSchema: computeFormSchema(blocks, commonMessages),
    onSubmit: onSubmit,
  });

  const getBlockProps = ({ bundleType, id, placeholder }: ThunderBlock) => {
    if (!bundleType || !id) return;
    return {
      key: id,
      id: id,
      name: id,
      placeholder:
        placeholder ??
        getDefaultPlaceholder<T>(id as ThunderUtils.BlockId<typeof blocks>),
      value: values[id as keyof typeof values],
      onChange: handleChange,
      onBlur: handleBlur,
      // TODO: i want to spread block in here
    };
  };

  return (
    <form {...formProps} onSubmit={handleSubmit}>
      {blocks.map(({ wrapper, elements, bundleType, id, ...rest }) => {
        if (wrapper?.id && wrapper.bundleType && elements) {
          const Wrapper = componentsBundle[
            wrapper.bundleType
            // TODO: type properly
          ] as unknown as ReactElement<React.HTMLAttributes<HTMLElement>>;

          return cloneElement(Wrapper, {
            key: wrapper.id,
            children: (
              <>
                {elements.map((el) => {
                  if (!el.bundleType || !el.id) return;
                  const Component = componentsBundle[el.bundleType];
                  return cloneElement(Component, getBlockProps(el));
                })}
              </>
            ),
            // TODO: i want to spread block props in here
          });
        }

        if (!bundleType || !id) return;
        const Component = componentsBundle[bundleType];
        return cloneElement(
          Component,
          getBlockProps({ wrapper, elements, bundleType, id, ...rest })
        );
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
