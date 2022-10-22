import { TableInputType } from "../../types/TableInputs";
import { TableSelectType } from "../../types/TableInputs/TableSelectType";
import { TableSelectInput } from "../TableInputs/TableSelectInput";
import { TableTextInput } from "../TableInputs/TableTextInput";

interface DynamicTableCellProps<TItem> {
  value: number | string;
  keyName: string;
  tableColumnTemplate: TableInputType;
  isFocusedParentRow: boolean;
  handler: (value: string, field: keyof TItem) => void;
  isBodyCell: boolean;
}

export const DynamicTableCell = <TItem,>({
  value,
  keyName,
  handler,
  tableColumnTemplate,
  isFocusedParentRow,
  isBodyCell,
}: DynamicTableCellProps<TItem>) => {
  const checkInputType = (inputType: TableInputType): inputType is TableSelectType => {
    return inputType !== undefined && (inputType as TableSelectType).options !== undefined;
  };

  const renderCell = (value: string | number, handler: CallableFunction) => {
    const column = tableColumnTemplate;
    if (isFocusedParentRow !== true && isBodyCell) {
      return value;
    } else if (checkInputType(column)) {
      return (
        <TableSelectInput
          key={keyName}
          options={column.options}
          value={value}
          keyName={keyName}
          onChange={(value, keyName) => handler(value, keyName)}
        />
      );
    } else {
      return (
        <TableTextInput
          key={keyName}
          value={value}
          keyName={keyName}
          onChange={(value, keyName) => handler(value, keyName)}
        />
      );
    }
  };
  return <td className="h-100">{renderCell(value, handler)}</td>;
};
