# Emotion v10 Migration Guide

[Emotion](https://emotion.sh/) recently released v10 of their library, which adds some very useful features, but has breaking changes. Mineral UI has been updated to use v10, which also resulted in some breaking changes to our library.

> If you're using Emotion outside of Mineral UI's API or experiencing other difficulties, [Emotion's Migration Guide](https://emotion.sh/docs/migrating-to-emotion-10) may help you.


## Mineral UI Changes


### Dependency Changes
* Remove `emotion` and `react-emotion`
* Add `@emotion/core` `@emotion/is-prop-valid` `@emotion/styled`


### API Changes


#### TL;DR

* `createStyledComponent(ComponentOrElement, styles, options)` → `styled(ComponentOrElement, options)(styles)`
    * See below for changes to `options`
    * `innerRef` prop → `ref` prop
    * `element` prop → `as` prop
        * Affects Box, Button, DialogTitle, Flex, FlexItem, Grid, GridItem, Link, NavItem, PrimaryNav & SecondaryNav (itemElement -> itemAs), StartEnd, Table (titleElement -> titleAs), Text
* `createThemedComponent(Component, theme)` → `styled(Component)(theme)`


#### `createStyledComponent` → `styled` (from Emotion)

We've removed `createStyledComponent` in favor of using [emotion's `styled` function](https://emotion.sh/docs/styled) directly.

```js
import { createStyledComponent } from 'mineral-ui/styles';

createStyledComponent(ComponentOrElementToBeStyled, styles, options)

↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

import styled from '@emotion/styled';

styled(ComponentOrElementToBeStyled, options)(styles)
```


##### `options`


###### `displayName` → `label`

Instead of providing a `displayName` option, provide a [`label` property](https://emotion.sh/docs/labels) in your styles.

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


###### `filterProps`, `forwardProps`, & `rootEl` → `shouldForwardProp`

These two options [carried over from Glamorous](./emotion-migration.md) have been deprecated in favor of Emotion's [`shouldForwardProp`](https://emotion.sh/docs/styled#customizing-prop-forwarding) (combined with [`isPropValid`](https://www.npmjs.com/package/@emotion/is-prop-valid)).

The built-in tag-specific prop filtering provided with `rootEl` has been deprecated in favor of using `shouldForwardProp` & `isPropValid`.

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


###### `includeStyleReset` → `componentStyleReset`

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


###### `withProps` → _deprecated_

This option has been deprecated entirely. Internally, we use [recompose's `withProps` HOC]() to meet this need.

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


##### `innerRef` prop

The `innerRef` prop on styled components has been deprecated; use `ref` instead.


##### `element` prop → `as` prop

A number of components had an `element` prop, which allowed changing the rendered element (or Component). These have been deprecated in favor of using [Emotion's `as` prop](https://emotion.sh/docs/styled#as-prop) directly.

Affected components:

* Box
* Button
* DialogTitle
* Flex
* FlexItem
* Grid
* GridItem
* Link
* NavItem
* PrimaryNav & SecondaryNav (itemElement -> itemAs)
* StartEnd
* Table (titleElement -> titleAs)
* Text

> This also means that you can use the `as` prop on _any_ Mineral UI component.


#### `createThemedComponent` → `themed`

This function has been renamed and its signature has changed to match that of `styled`:

```js
import { createThemedComponent } from 'mineral-ui/themes';

createThemedComponent(ComponentToBeThemed, theme)

↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

import { themed } from 'mineral-ui/themes';

themed(ComponentToBeThemed)(theme)
```


#### `css` prop

Mineral UI components are ready to use with [Emotion's `css` prop](https://emotion.sh/docs/css-prop):

```js
import Button from 'mineral-ui/Button';

render(
  <Button
    css={{
      backgroundColor: 'rebeccapurple',
      color: 'white'
    }}
    {...props}
  />
);
```
