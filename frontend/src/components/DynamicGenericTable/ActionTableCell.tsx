interface DynamicActionTableCellProps {
  text: string;
  onClick: () => void;
}

export const ActionTableCell = ({ text, onClick }: DynamicActionTableCellProps) => {
  return (
    <td>
      <button onClick={() => onClick()}>{text}</button>
    </td>
  );
};
