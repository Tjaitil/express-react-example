import "./DynamicTable.css";
interface GenericTableProp {
  tableHeader: React.ReactNode;
  tableBody: React.ReactNode;
  tableFooter: React.ReactNode;
}

export const DynamicGenericTable = ({ tableHeader, tableBody, tableFooter }: GenericTableProp) => {
  return (
    <>
      <table className="table table-primary table-striped" style={{ height: "1px" }}>
        {tableHeader}
        <tbody>{tableBody}</tbody>
        <tfoot>{tableFooter}</tfoot>
      </table>
    </>
  );
};
