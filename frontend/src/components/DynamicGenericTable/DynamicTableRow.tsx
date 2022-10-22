import { isExcludedProperty } from "../../utilities/isExcludedProperty";
import { Player } from "../../../../server/src/shared/types/Player";
import { DynamicTableCell } from "./DynamicTableCell";
import { ExcludedProperties } from "src/types/ExcludedPropertiesType";
import { TableColumnTemplateType } from "../../types/GenericTable/TableColumnTemplateType";

interface DynamicTableRowProps<TItem extends { [key: string]: any }> {
  data: TItem;
  rowKey: keyof TItem;
  onFocusRow: (key: number) => void;
  index: number;
  children: React.ReactNode;
  excludedProperties: ExcludedProperties<TItem>;
  focusedRow: TItem;
  isFocusedRow: boolean;
  tableColumnTemplate: TableColumnTemplateType<TItem>;
  onCellChange: (value: string, field: keyof TItem) => void;
}

export const DynamicTableRow = <TItem extends { [key: string]: any }>({
  data,
  rowKey,
  onFocusRow,
  index,
  children,
  excludedProperties,
  focusedRow,
  isFocusedRow,
  tableColumnTemplate,
  onCellChange,
}: DynamicTableRowProps<TItem>) => {
  return (
    <tr key={data[rowKey]} onDoubleClick={() => onFocusRow(index)}>
      {Object.entries(data).map(([keyName, value]) => {
        if (isExcludedProperty<TItem>(keyName as keyof TItem, excludedProperties)) return;
        else {
          return (
            <DynamicTableCell
              key={keyName}
              keyName={keyName}
              value={isFocusedRow ? focusedRow[keyName as keyof Player] : value}
              isFocusedParentRow={isFocusedRow}
              handler={(value, key) => onCellChange(value, key)}
              tableColumnTemplate={tableColumnTemplate[keyName as keyof typeof tableColumnTemplate]}
              isBodyCell={true}
            />
          );
        }
      })}
      {children}
    </tr>
  );
};
