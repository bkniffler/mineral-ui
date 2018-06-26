/* @flow */
import { palette } from 'mineral-ui-tokens';
import { createStyledComponent } from '../../../../../../library/styles';
import { withTheme } from '../../../../../../library/themes';
import { DataTable } from '../../../../../../library/Table';
import { componentTheme as cellTheme } from '../../../../../../library/Table/Cell';
import renderPropDescription from '../../../shared/renderPropDescription';
import sharedRows from '../shared/data';

export default {
  id: 'custom-cell',
  title: 'Custom Cell',
  description: `Use the \`cell\`
[render prop](https://reactjs.org/docs/render-props.html) in a column definiton
to provide custom rendering control of all [TDs](/components/td) in that
column.

${renderPropDescription}

Some things to keep in mind:

1. Because you are rendering a table cell, the rendered root element _must_ be a
   \`td\`.
1. Remember to accommodate the appearance-related DataTable props, like
   [\`highContrast\`](#high-contrast), [\`spacious\`](#spacious), and
   [\`striped\`](#zebra-striped).
1. If your app supports RTL languages, you can use \`theme.direction\` to
   conditionally apply the necessary styles.`,
  scope: {
    createStyledComponent,
    DataTable,
    palette,
    sharedRows,
    cellTheme,
    withTheme
  },
  source: `
    () => {
      /**
       * If you wish to use theme variables in your function, you must either use
       * createStyledComponent or the withTheme HOC, (higher order component),
       * which provides the base theme as a prop.
       *   import { withTheme } from 'mineral-ui/themes';
       *
       * If you wish to access a component specific theme, you'll need to import
       * it and compose it with the base theme as shown below.
       *   import { componentTheme as cellTheme } from 'mineral-ui/Table/Cell';
       */
      const cell = ({ props }) => {
        const { children, key, spacious, textAlign } = props;

        const CustomCell = withTheme(({ theme: baseTheme }) => {
          const theme = cellTheme(baseTheme);
          const paddingVertical = spacious
            ? theme.TD_paddingVertical_spacious
            : theme.TD_paddingVertical;
          const rtl = theme.direction === 'rtl';
          let rtlTextAlign;
          if ((rtl && textAlign == 'start') || (!rtl && textAlign == 'end')) {
            rtlTextAlign = 'right';
          } else if ((rtl && textAlign == 'end') || textAlign == 'start') {
            rtlTextAlign = 'left';
          }

          const Root = createStyledComponent('td', {
            padding: paddingVertical + ' ' + theme.TD_paddingHorizontal,

            'tr:hover > &': {
              backgroundColor: palette.green_10
            }
          });

          const Inner = createStyledComponent('span', {
            display: 'flex'
          });

          const Veggie = createStyledComponent('span', {
            display: 'inline-block',
            marginRight: rtl ? theme.space_inline_sm : null,
            marginRight: rtl ? null : theme.space_inline_sm
          });

          const Content = createStyledComponent('span', {
            fontSize: theme.TD_fontSize,
            textAlign: rtlTextAlign
          });

          const veggies = ['🍆', '🥒', '🍠', '🌿'];

          return (
            <Root {...props}>
              <Inner>
                <Veggie>{veggies[Math.floor(Math.random()*veggies.length)]}</Veggie>
                <Content>{children}</Content>
              </Inner>
            </Root>
          );
        });

        return <CustomCell key={key} />;
      };

      const columns = [
        { content: 'Fruits', name: 'Fruits' },
        { content: 'Vegetables', name: 'Vegetables', cell },
        { content: 'Grains', name: 'Grains' },
        { content: 'Dairy', name: 'Dairy' },
        { content: 'Protein', name: 'Protein' }
      ];

      return (
        <DataTable
          columns={columns}
          rows={sharedRows}
          rowKey="Fruits" />
      );
    }`
};
