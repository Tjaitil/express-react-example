import { useEffect, useState } from "react";
import { sortObjectArray } from "../../utilities/sortObjectArray";
import { PlayerApi } from "../../api/PlayerApi";
import { DynamicGenericTable } from "../DynamicGenericTable";
import { GenericTableHeader } from "../DynamicGenericTable/GenericTableHeader";
import { TableHeadersType } from "../../types/GenericTable/TableHeadersType";
import { DynamicTableRow } from "../DynamicGenericTable/DynamicTableRow";
import { DynamicTableCell } from "../DynamicGenericTable/DynamicTableCell";
import { TableColumnTemplateType } from "../../types/GenericTable/TableColumnTemplateType";
import { ExcludedProperties } from "../../types/ExcludedPropertiesType";
import { isExcludedProperty } from "../../utilities/isExcludedProperty";
import { ActionTableCell } from "../DynamicGenericTable/ActionTableCell";
import { DynamicFooterRow } from "../DynamicGenericTable/DynamicFooterRow";
import { sortPlayerRole } from "../../utilities/sortPlayerRole";
import { Player } from "../../../../server/src/shared/types/Player";

type dataTarget = "setNewRow" | "setFocusedRow";

export const PlayerDynamicTable = () => {
  const emptyPlayer: Player = {
    summoner_name: "",
    id: 0,
    role: "",
    age: "",
    country: "",
    team: "",
  };

  const [newRow, setNewRow] = useState<Player>(emptyPlayer);
  const [focusedRowKey, setFocusedRowKey] = useState(-1);

  const [focusedRow, setFocusedRow] = useState<Player>(emptyPlayer);

  const handleOnFocus = (key: number) => {
    setFocusedRowKey(key);
    setFocusedRow(data[key]);
  };

  useEffect(() => {
    const getData = async () => {
      PlayerApi.get().then((response) => setData(response.data));
    };
    getData();
  }, []);

  const [data, setData] = useState<Player[]>([]);

  const handleChange = <K extends keyof Player, V extends Player[K]>(val: any, field: K, dataTarget: dataTarget) => {
    // person({[field]: str});

    if (dataTarget === "setNewRow") {
      setNewRow((prevState) => ({
        ...prevState,
        [field]: val,
      }));
    } else {
      setFocusedRow((prevState) => ({
        ...prevState,
        [field]: val,
      }));
    }
  };

  const addNewRow = () => {
    PlayerApi.post(newRow)
      .then(() => {
        setNewRow({ ...emptyPlayer });
        setData((prevState) => [...prevState, newRow]);
      })
      .catch((error) => console.log("error", error));
  };

  // const deleteRow = () => {
  //   PlayerApi.delete(focusedRow)
  //     .then(() => {
  //       const newArray = data.filter((element, index) => index !== focusedRowKey);
  //       setData((prevState) => prevState.filter((element, index) => index !== focusedRowKey));
  //     })
  //     .catch((error) => console.log("error", error));
  // };

  const editRow = (keyIndex: number) => {
    PlayerApi.put(focusedRow)
      .then(() => {
        setData((prevState) =>
          prevState.map((element, index) => {
            if (index === keyIndex) {
              return focusedRow;
            }

            return element;
          })
        );
        setFocusedRowKey(-1);
      })
      .catch((error) => console.log("error", error));
  };

  const sortData = <K extends keyof Player>(keyName: K, asc: boolean) => {
    let sortFunction: CallableFunction;

    // Set custom sort functions
    switch (keyName) {
      case "role":
        sortFunction = sortPlayerRole;
        break;
    }

    setData((prevState) => sortObjectArray([...prevState], keyName, asc, sortFunction ?? undefined));
  };

  const excludedProperties: ExcludedProperties<Player> = ["id"];

  const headers: TableHeadersType<Player> = {
    summoner_name: "Summoner name",
    id: "id",
    role: "Role",
    age: "Age",
    country: "Country",
    team: "Team",
  };

  const dataTemplate: TableColumnTemplateType<Player> = {
    summoner_name: {
      value: "",
    },
    role: {
      options: ["toplaner", "jungler", "midlaner", "botlaner", "support"],
    },
    id: {
      value: "",
    },
    age: {
      value: "",
    },
    country: {
      value: "",
    },
    team: {
      value: "",
    },
  };

  const rowKey: keyof Player = "summoner_name";

  return (
    <DynamicGenericTable
      tableHeader={
        <GenericTableHeader
          sortByHeader={(key, asc) => sortData(key, asc)}
          headers={headers}
          excludedProperties={excludedProperties}
        />
      }
      tableBody={data.map((element, index) => (
        <DynamicTableRow
          data={element}
          rowKey={element[rowKey] as keyof Player}
          key={element[rowKey]}
          onFocusRow={(key) => handleOnFocus(key)}
          index={index}
          excludedProperties={excludedProperties}
          isFocusedRow={focusedRowKey === index}
          focusedRow={focusedRow}
          tableColumnTemplate={dataTemplate}
          onCellChange={(value, key) => handleChange(value, key as keyof Player, "setFocusedRow")}
        >
          {focusedRowKey === index && <ActionTableCell text={"Edit"} onClick={() => editRow(index)} />}
        </DynamicTableRow>
      ))}
      tableFooter={
        <DynamicFooterRow>
          {Object.entries(newRow).map(([keyName, value]) => {
            if (isExcludedProperty<Player>(keyName as keyof Player, excludedProperties)) return;
            else {
              return (
                <DynamicTableCell
                  key={keyName}
                  keyName={keyName}
                  value={newRow[keyName as keyof Player]}
                  isFocusedParentRow={false}
                  handler={(value, key) => handleChange(value, key, "setNewRow")}
                  tableColumnTemplate={dataTemplate[keyName as keyof typeof dataTemplate]}
                  isBodyCell={false}
                />
              );
            }
          })}
          <ActionTableCell text={"Add"} onClick={() => addNewRow()} />
        </DynamicFooterRow>
      }
    />
  );
};
