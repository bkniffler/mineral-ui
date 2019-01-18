Mineral UI is built on a design system with styles ready to go out of the box.  We realize however that there will be cases when you need to customize styles for your unique needs.  Below are some different techniques for customizing Mineral UI styles across all levels of your application.

## Customization Techniques

### Try Theming First

Theming is a core concept in Mineral UI.  It is powerful feature capable of providing style customizations from the application level to the component level and should generally be your first choice when looking to make style customizations. See the [theming page](/theming) for more details.

When a component needs to be customized beyond what theming enables, use these methods, in order of recommendation.

<Callout title="Note">
  <p key={0}>
    Mineral UI uses <a key={0} href="https://emotion.sh/">Emotion</a> for
    component styling. This page will detail how its API can apply to Mineral UI
    components.
  </p>
</Callout>

### `styled`

[`styled`](https://emotion.sh/docs/styled) creates a new styled component based on another component or DOM element.

```jsx
import styled from '@emotion/styled';
import Button from 'mineral-ui/Button';

const MyButton = styled(Button)({
  outline: '3px dashed tomato'
});
```

#### `as` Prop

Any component created with `styled` (which includes _every_ Mineral UI component) can use the [`as` prop](https://emotion.sh/docs/styled#as-prop) to change the rendered element or Component.

```jsx
import Button from 'mineral-ui/Button';
import Link from 'mineral-ui/Link';

<Button as={Link} href="..." />
```

### `css` Prop

The [`css` prop](https://emotion.sh/docs/css-prop), after some initial setup, provides a quick, easy way to directly modify the styles of a component.

```jsx
import Button from 'mineral-ui/Button';

render(
  <Button
    css={{
      outline: '3px dashed tomato'
    }}
  />
);
```

### CSS Classes

Additional CSS classes can be applied to components using the standard React `className` prop.

```jsx
<Button className="myButton" />
```

You can also use emotion to generate a `className`, with the [ClassNames](https://emotion.sh/docs/class-names) component and the `css` function it provides.

```jsx
import { ClassNames } from '@emotion/core';

render(
  <ClassNames>
    ({ css, cx }) => (
      <Button className={css({ outline: '3px dashed tomato' })} />
    )
  </ClassNames>
);
```

### Inline Styles

Inline styles can be applied to components using the standard React `style` prop.

```jsx
<Button style={{ outline: '3px dashed tomato' }} />
```
