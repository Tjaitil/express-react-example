interface TableSelectInputProps {
  value: string | number;
  options: any[];
  onChange: (value: any, key: string) => void;
  keyName: string;
}

export const TableSelectInput = ({ value, options, onChange, keyName }: TableSelectInputProps) => (
  <select
    className="form-select h-100 border-0 rounded-3 text-center"
    aria-label="Default select example"
    onChange={(event) => onChange(event.target.value, keyName)}
    value={value}
  >
    <option value="" disabled></option>
    {options.map((element: string, index: number) => (
      <option key={element} className="text-center">
        {element}
      </option>
    ))}
  </select>
);
