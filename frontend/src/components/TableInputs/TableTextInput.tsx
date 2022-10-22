interface TableTextInputProps {
  value: string | number;
  onChange: (value: string, key: string) => void;
  keyName: string;
}

export const TableTextInput = ({ value, onChange, keyName }: TableTextInputProps) => (
  <input
    type="text"
    className="table-input h-100 border-0 rounded-3 text-center"
    value={value}
    onChange={(event) => onChange(event.target.value, keyName)}
  />
);
