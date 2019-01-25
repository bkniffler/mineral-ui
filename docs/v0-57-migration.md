# Mineral UI v0.57.0 Migration Guide

Mineral UI has been updated to enable recent React features like **_TBD_** and the latest version of [emotion](https://emotion.sh/), the library used for styling our components. This update contains some breaking changes and other notable features, which are detailed below.

> If you're using emotion outside of Mineral UI's API or experiencing other difficulties, [emotion's Migration Guide](https://emotion.sh/docs/migrating-to-emotion-10) may help you.


## Rationale

While this update contains significant breaking changes, we think it's the right choice for Mineral UI because these changes:

- Expose a smaller, more consistent API surface
- Allow access to useful emotion features
    - [`as`](https://emotion.sh/docs/styled#as-prop) & [`css`](https://emotion.sh/docs/css-prop) props
    - [targeting other emotion components](https://emotion.sh/docs/styled#targeting-another-emotion-component)
    - smaller bundle size & faster performance
- Provide easier adoption for consumers already using emotion
- Unblock future React updates


## ![Breaking][breaking] Dependency Changes
* Remove `emotion` and `react-emotion`
* Add `@emotion/core` `@emotion/is-prop-valid` `@emotion/styled`
* Minimum supported React version is now 16.3


## API Changes

### ![Breaking][breaking] `createStyledComponent` → `styled` (from emotion)

We've removed `createStyledComponent` in favor of using [emotion's `styled` function](https://emotion.sh/docs/styled) directly.

```js
import { createStyledComponent } from 'mineral-ui/styles';

createStyledComponent(ComponentOrElementToBeStyled, styles, options)

↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

import styled from '@emotion/styled';

styled(ComponentOrElementToBeStyled, options)(styles)
```


#### `options`


##### `displayName` → `label`

Instead of providing a `displayName` option, provide a [`label` property](https://emotion.sh/docs/labels) in your styles.

> Note that [babel-plugin-emotion](https://emotion.sh/docs/babel-plugin-emotion) will auto-label components for you.

```js
import { createStyledComponent } from 'mineral-ui/styles';

createStyledComponent(ComponentOrElementToBeStyled, styles, {
  displayName: 'DisplayName'
})

↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

import styled from '@emotion/styled';

styled(ComponentOrElementToBeStyled, options)({
  label: 'DisplayName',
  // ...rest of your styles
})
```


##### `filterProps`, `forwardProps`, & `rootEl` → `shouldForwardProp`

These two options [carried over from Glamorous](./emotion-migration.md) have been deprecated in favor of emotion's [`shouldForwardProp`](https://emotion.sh/docs/styled#customizing-prop-forwarding) (combined with [`isPropValid`](https://www.npmjs.com/package/@emotion/is-prop-valid)).

The built-in tag-specific prop filtering provided with `rootEl`  has been deprecated in favor of using `shouldForwardProp` & `isPropValid`. In addition to the reduction in complexity in both the library and for consumers, this was deprecated because it was not significantly more useful in practice than a tag-agnostic approach, as used by `isPropValid`.

```js
import { createStyledComponent } from 'mineral-ui/styles';

createStyledComponent(ComponentOrElementToBeStyled, styles, {
  filterProps: ['propToFilter'],
  forwardProps: ['propToForward']
})

↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

import isPropValid from '@emotion/is-prop-valid';
import styled from '@emotion/styled';

styled(ComponentOrElementToBeStyled, {
  shouldForwardProp:
    (prop) =>
      prop === 'propToForward' || (prop !== 'propToFilter' && isPropValid(prop))
})(styles)
```


##### `includeStyleReset` → `componentStyleReset`

Instead of providing the option, call the function with the theme and spread the result at the start of your styles.

```js
import { createStyledComponent } from 'mineral-ui/styles';

createStyledComponent(ComponentOrElementToBeStyled, styles, {
  includeStyleReset: true
})

↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

import styled from '@emotion/styled';
import { componentStyleReset } from 'mineral-ui/styles';

styled(ComponentOrElementToBeStyled, options)(({ theme }) => ({
  ...componentStyleReset(theme),
  // ...rest of your styles
}))
```


##### `withProps` → _deprecated_

This option has been deprecated entirely. Internally, we use [recompose's `withProps` HOC](https://github.com/acdlite/recompose/blob/master/docs/API.md#withprops) to meet this need.

```js
import { createStyledComponent } from 'mineral-ui/styles';

createStyledComponent(ComponentOrElementToBeStyled, styles, {
  withProps: { propName: 'propValue' }
})

↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

import styled from '@emotion/styled';
import { withProps } from 'recompose';

withProps({ propName: 'propValue' })(styled(ComponentOrElementToBeStyled, options)(styles))
```


#### `innerRef` prop

The `innerRef` prop on styled components has been deprecated; use `ref` instead.


#### `element` prop → `as` prop

A number of components had an `element` prop, which allowed changing the rendered element (or Component). These have been deprecated in favor of using [emotion's `as` prop](https://emotion.sh/docs/styled#as-prop) directly.

Affected components:

* [Box](https://mineral-ui.com/components/box)
* [Button](https://mineral-ui.com/components/button)
* [DialogTitle](https://mineral-ui.com/components/dialog-title)
* [Flex](https://mineral-ui.com/components/flex)
* [FlexItem](https://mineral-ui.com/components/flex-item)
* [Grid](https://mineral-ui.com/components/grid)
* [GridItem](https://mineral-ui.com/components/grid-item)
* [Link](https://mineral-ui.com/components/link)
* [NavItem](https://mineral-ui.com/components/nav-item)
* [PrimaryNav](https://mineral-ui.com/components/primary-nav) & [SecondaryNav](https://mineral-ui.com/components/secondary-nav) (`itemElement` -> `itemAs`)
* [StartEnd](https://mineral-ui.com/components/start-end)
* [Table](https://mineral-ui.com/components/table) (`titleElement` -> `titleAs`)
* [Text](https://mineral-ui.com/components/text)

> This also means that you can use the `as` prop on _any_ Mineral UI component.


### ![Breaking][breaking] `createThemedComponent` → `themed`

This has been renamed and its signature has changed to match that of `styled`. It otherwise functions exactly the same as before.

```js
import { createThemedComponent } from 'mineral-ui/themes';

createThemedComponent(ComponentToBeThemed, theme)

↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

import { themed } from 'mineral-ui/themes';

themed(ComponentToBeThemed)(theme)
```


### ![New][new] `css` prop

Mineral UI components are ready to use with [emotion's `css` prop](https://emotion.sh/docs/css-prop):

```js
import Box from 'mineral-ui/Box';

render(
  <Box
    css={{
      backgroundColor: 'rebeccapurple',
      color: 'white'
    }}
    {...props}
  />
);
```

[breaking]: https://img.shields.io/badge/-Breaking-red.svg?colorA=d05741&colorB=d05741
[new]: https://img.shields.io/badge/-New-green.svg?colorA=green&colorB=green
