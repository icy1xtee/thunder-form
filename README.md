# ⚡ ThunderForm

❗️ NOTE: The package is currently in dev, you can join us via [GitHub](https://github.com/icy1xtee/thunder-form)

A dynamic, fully-typed, customizable form builder for React powered by Formik and Yup. Build forms effortlessly with reusable components — no boilerplate, just flexibility.

## ✨ Features

- ✅ Strongly typed
- 💅 Supports your custom components via `componentsBundle`
- 🧩 Nesting and layout via wrapper components
- 🧠 Built-in Formik and Yup integration
- 🚫 Zero need to wrap native elements with boilerplate

---

## 🚀 Installation

```bash
npm install thunder-form
```

## ✍🏼 Quick Start

After installation, you need to define your `componentsBundle` using `defineThunderBundle` function:

```jsx
import { defineThunderBundle } from "../lib/types/thunder-bundle";

const componentsBundle = defineThunderBundle({
  customInput: <CustomInput />,
  customCheckbox: <CustomCheckbox />,
  customSelect: (
    <select>
      <option>apple</option>
      <option>banana</option>
    </select>
  ),
  locationBlockWrapper: (
    <div style={{ display: "flex", flexDirection: "row", gap: "4px" }} />
  ),
  submitButton: <CustomButton>Submit</CustomButton>,
});
```

Now you can create forms as fast as possible using a `ThunderForm` React-component:

```jsx
function MyForm() {
  const handleSubmit = (values, formikHelpers)=>{
    // Submit your form here
  }
  return (
    <ThunderForm
      formProps={{
        style: { display: "flex", flexDirection: "column", gap: 12 },
      }}
      blocks={[
        { id: "fullName", bundleType: "customInput" },
        { id: "email", bundleType: "customInput" },
        {
          wrapper: { id: "locationBlockWrapper", bundleType: "locationBlockWrapper" },
          elements: [
            { id: "city", bundleType: "customInput" },
            { id: "country", bundleType: "customSelect" },
          ],
        },
      ]}
      messageForRequiredFields="This field is required"
      onSubmit={handleSubmit} // pass a function that going to be called on form submit
      componentsBundle={componentsBundle} // pass a componentsBundle you created before
    />
  );
}
```

That's basically it!

