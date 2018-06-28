/* @flow */
import { Component } from 'react';
import Button from '../../../../../../library/Button';
import Flex, { FlexItem } from '../../../../../../library/Flex';
import { DataTable } from '../../../../../../library/Table';
import { columns4, columns104, rows100, rows1000 } from '../shared/largeData';

export default {
  id: 'large-data-sets',
  title: 'Large Data Sets',
  description: `You should open this in a
[chromeless standalone](/components/data-table/large-data-sets?chromeless)
before clicking those buttons. 😬`,
  hideFromProd: true,
  scope: {
    Button,
    Component,
    DataTable,
    Flex,
    FlexItem,
    columns4,
    columns104,
    rows100,
    rows1000
  },
  source: `
    () => {
      class MyTable extends Component {
        constructor(props) {
          super(props);

          this.state = {
            columns: [
              { content: 'AA', name: 'aa', enableSort: true },
              { content: 'AB', name: 'ab' }
            ],
            rows: [
              { aa: 'aa0', ab: 'ab0' },
              { aa: 'aa1', ab: 'ab1' }
            ]
          };

          this.populate4x1000 = this.populate4x1000.bind(this);
          this.populate104x100 = this.populate104x100.bind(this);
        }

        populate4x1000() {
          this.setState({
            columns: columns4,
            rows: rows1000
          })
        }

        populate104x100() {
          this.setState({
            columns: columns104,
            rows: rows100
          })
        }

        render() {
          return (
            <div>
              <Flex marginBottom="md">
                <FlexItem>
                  <Button onClick={this.populate4x1000} size="medium">4 &times; 1000</Button>
                </FlexItem>
                <FlexItem>
                  <Button onClick={this.populate104x100} size="medium">104 &times; 100</Button>
                </FlexItem>
              </Flex>
              <DataTable
                columns={this.state.columns}
                rows={this.state.rows}
                rowKey="aa"
                enableRowSelection />
            </div>
          );
        }
      }

      return <MyTable />;
    }
    `
};