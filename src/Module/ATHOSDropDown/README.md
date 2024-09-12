# ATHOSDropDown Component Documentation

## Overview

The `ATHOSDropDown` component is a flexible dropdown menu that allows you to render a custom child element, manage its position, and display a list of labels with attached click events. It leverages `Framer Motion` for smooth animations and the `ReactDOM.createPortal` method to handle rendering outside of the usual component tree.

## Props

### `ATHOSDropDownProps`

| Prop           | Type                                                      | Description                                                                                           | Default Value  |
|----------------|-----------------------------------------------------------|-------------------------------------------------------------------------------------------------------|----------------|
| `children`     | `(ref: any) => React.ReactNode`                           | A function that renders the child component and provides a reference to position the dropdown correctly. | `undefined`    |
| `open`         | `boolean`                                                 | Controls whether the dropdown is open and visible.                                                     | `false`        |
| `close`        | `() => void`                                              | A callback function to close the dropdown.                                                             | `undefined`    |
| `positionVert` | `"top" | "bottom"`                                        | Controls the vertical position of the dropdown relative to the child element.                          | `"bottom"`     |
| `positionHor`  | `"left" | "right"`                                        | Controls the horizontal position of the dropdown relative to the child element.                        | `"left"`       |
| `id`           | `string`                                                  | A unique identifier for the dropdown.                                                                  | `undefined`    |
| `labels`       | `LabelI[]`                                                | An array of labels to display in the dropdown. Each label has a `label` string and an `onClick` handler. | `[]`           |

### `LabelI`

This interface defines the structure of the labels displayed in the dropdown:

| Prop     | Type           | Description                   |
|----------|----------------|-------------------------------|
| `label`  | `string`       | The text of the label.         |
| `onClick`| `() => void`   | Function to execute on click.  |

### `ChildSize`

This type defines the positioning and transformation of the child element within the dropdown:

| Property    | Type                | Description                                             |
|-------------|---------------------|---------------------------------------------------------|
| `top`       | `number | string`   | Top position of the dropdown relative to the child.     |
| `left`      | `number | string`   | Left position of the dropdown relative to the child.    |
| `right`     | `number | string`   | Right position of the dropdown relative to the child.   |
| `bottom`    | `number | string`   | Bottom position of the dropdown relative to the child.  |
| `transform` | `string`            | CSS transform applied to the dropdown.                  |

### `ADDContainerProps`

This type defines the styling and positioning properties for the dropdown container:

| Property    | Type                | Description                                           |
|-------------|---------------------|-------------------------------------------------------|
| `top`       | `number | string`   | Top position of the container.                        |
| `left`      | `number | string`   | Left position of the container.                       |
| `right`     | `number | string`   | Right position of the container.                      |
| `bottom`    | `number | string`   | Bottom position of the container.                     |
| `width`     | `number | string`   | Width of the container.                               |
| `height`    | `number | string`   | Height of the container.                              |
| `opacity`   | `number`            | Opacity level of the container (for animation).       |
| `transform` | `string`            | CSS transform applied to the container.               |

## Hooks

### `useADD`

The `useADD` hook is responsible for managing the child and container references, calculating the size and position of the child, and setting the dropdown root for `ReactDOM.createPortal`. It accepts the following parameters:

- `positionVert`: Vertical alignment of the dropdown (`"top"` or `"bottom"`).
- `positionHor`: Horizontal alignment of the dropdown (`"left"` or `"right"`).
- `id`: The unique identifier for the dropdown.
- `close`: A function to close the dropdown.
- `setDropdownRoot`: Sets the dropdown root element where the dropdown will be rendered.

## Render

### JSX Structure

The `ATHOSDropDown` component renders its children and the dropdown content using the following structure:

1. It creates a `portal` using `ReactDOM.createPortal` to render the dropdown outside the DOM hierarchy of the parent.
2. The `AnimatePresence` from `Framer Motion` is used to animate the dropdown opening and closing.
3. The dropdown container (`ADDContainer`) wraps around the mapped labels (`ADDLabel`), each with its own click event.
4. The child element is rendered with a ref passed from `useADD` to ensure proper positioning.

### Example Usage

```jsx
<ATHOSDropDown
  open={dropdownOpen}
  close={handleCloseDropdown}
  positionVert="bottom"
  positionHor="left"
  id="example-dropdown"
  labels={[
    { label: "Option 1", onClick: () => console.log("Option 1 clicked") },
    { label: "Option 2", onClick: () => console.log("Option 2 clicked") },
  ]}
>
  {(ref) => (
    <button ref={ref} onClick={() => setDropdownOpen(!dropdownOpen)}>
      Toggle Dropdown
    </button>
  )}
</ATHOSDropDown>
```

In this example:
- The dropdown opens when the button is clicked.
- It is positioned to the bottom left of the button.
- Two options are displayed with attached click handlers.

## Dependencies

- **Framer Motion**: Used for animating the opening and closing of the dropdown.
- **ReactDOM.createPortal**: Renders the dropdown outside the normal component tree.

## Conclusion

The `ATHOSDropDown` component is a versatile, animated dropdown menu that can be customized for different layouts and use cases. By utilizing hooks and `ReactDOM.createPortal`, it provides seamless rendering and interaction with child components.