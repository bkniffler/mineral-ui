/* @flow */

import styled from '@emotion/styled';
import Button from '../../../../../../library/Button/Button';
import FormField from '../../../../../../library/Form/FormField';
import IconSearch from 'mineral-ui-icons/IconSearch';
import Dropdown from '../../../../../../library/Dropdown';
import Menu from '../../../../../../library/Menu';
import TextInput from '../../../../../../library/TextInput';
import Text from '../../../../../../library/Text';
import data from '../../../Menu/common/menuData';
import renderPropsDescription from '../../../common/renderPropsDescription';

export default {
  id: 'custom-menu',
  title: 'Custom Menu',
  description: `Use the \`menu\` render prop to provide custom rendering control
of the [Menu](/components/menu). ${renderPropsDescription}

<Callout title="Note">
The menu in the example below has been customized to include a search input.
While neither fully functional nor accessible, it hopefully serves to give the
user an idea of something that could be achieved with this technique.
</Callout>`,
  scope: {
    Button,
    styled,
    data,
    Dropdown,
    FormField,
    IconSearch,
    Menu,
    Text,
    TextInput
  },
  source: `
    () => {
      const menu = ({ props }) => {
        const Search = styled('div')(({ theme }) => ({
          borderBottom: '1px solid ' + theme.color_gray_40,
          padding: theme.space_inset_md
        }));

        return (
          <div>
            <Search>
              <FormField
                input={TextInput}
                type="search"
                label="Search"
                placeholder="Search..."
                hideLabel
                iconEnd={<IconSearch />} />
            </Search>
            <Menu {...props} />
          </div>
        );
      };

      return (
        <Dropdown data={data} menu={menu}>
          <Button>Menu</Button>
        </Dropdown>
      );
    }`
};
