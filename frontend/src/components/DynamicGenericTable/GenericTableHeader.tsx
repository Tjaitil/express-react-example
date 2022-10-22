import { ExcludedProperties } from "../../types/ExcludedPropertiesType";
import { isExcludedProperty } from "../../utilities/isExcludedProperty";

interface GenericTableProps<T extends {}> {
  headers: TableHeaders<T>;
  excludedProperties?: ExcludedProperties<T>;
  sortByHeader: (keyName: keyof T, asc: boolean) => void;
}

type TableHeaders<T> = Record<keyof T, any>;

export const GenericTableHeader = <T extends Record<string, any>>({
  headers,
  excludedProperties,
  sortByHeader,
}: GenericTableProps<T>) => (
  <thead>
    <tr>
      {Object.entries(headers).map(([keyName, value]) => {
        if (isExcludedProperty<T>(keyName, excludedProperties ?? [])) return;
        return (
          <th key={keyName} className="h-100">
            <div className="d-flex flex-row align-items-center justify-content-center w-100 h-100">
              <div className="flex-grow-1">{value}</div>
              <div className="flex-grow-0">
                <button className="p-2" onClick={() => sortByHeader(keyName, true)}>
                  &#x25B2;
                </button>
                <button className="p-2" onClick={() => sortByHeader(keyName, false)}>
                  &#x25BC;
                </button>
              </div>
            </div>
          </th>
        );
      })}
    </tr>
  </thead>
);
