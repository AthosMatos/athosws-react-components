# ATHOSButton Component

The `ATHOSButton` component is a versatile button component that supports multiple styles and states, such as `default`, `alt`, `action`, and `disabled`. It allows for customization of colors, text, and additional styling. It also supports an optional tooltip that provides extra information when hovering over the button.

![Animation](https://github.com/user-attachments/assets/704ef217-8c76-42f7-b3f9-1f094a30c227)


## Import

To import the `ATHOSButton` component into your project, use the following import statement:

```javascript
import { ATHOSButton } from "@athosws/react-components";
```

## Usage

### Basic Usage

```jsx
import React from "react";
import { ATHOSButton } from "@athosws/react-components";

const App = () => {
  return (
    <ATHOSButton type="default" onClick={() => console.log("Button clicked!")}>
      Click Me
    </ATHOSButton>
  );
};

export default App;
```

### With Tooltip

To use a tooltip, pass the `tooltip` prop with the desired content:

```jsx
<ATHOSButton
  type="action"
  tooltip="This is an action button"
  onClick={() => console.log("Action button clicked!")}
>
  Action
</ATHOSButton>
```

### Disabled State

To disable the button, set the `disabled` prop to `true`:

```jsx
<ATHOSButton disabled={true}>
  Disabled Button
</ATHOSButton>
```

# Props

The `ATHOSButton` component accepts the following props:

| Prop       | Type                                   | Description                                                                                          | Default   |
|------------|----------------------------------------|------------------------------------------------------------------------------------------------------|-----------|
| `type`     | `"default","alt","action"`         | Specifies the button style. Required if `disabled` is not set.                                        | `"default"` |
| `onClick`  | `() => void`                           | Function to call when the button is clicked. Optional for `disabled` buttons.                         | `undefined` |
| `children` | `React.ReactNode`                      | The content to be displayed inside the button.                                                       | `undefined` |
| `tooltip`  | `React.ReactNode`                      | Content to be shown as a tooltip when hovering over the button. Optional.                             | `undefined` |
| `disabled` | `boolean`                              | If set to `true`, the button is rendered in a disabled state and does not respond to click events.   | `false`   |
| `style`    | `React.CSSProperties`                  | Custom styles to apply to the button.                                                                | `undefined` |
| `color`    | `string`                               | Background color of the button.                                                                      | `Depends on type` |
| `textColor`| `string`                               | Text color of the button.                                                                            | `Depends on type` |
