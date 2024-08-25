import styled from "styled-components";
import { ATHOSResizableDiv } from "../ATHOSResizableDiv";

type DynamicTableProps<T> = {
  data: T[];
  columns?: (keyof T)[];
  resizeable?: boolean;
};

const Column = styled.th`
  font-size: 1rem;
`;

const Cell = styled.td`
  font-size: 1rem;
`;
/**
 * `columns` is optional, if not provided, it will use the keys of the first object in `data`,
 * but if provided, it will use the keys in the order of the array.
 */
function ATHOSDynamicTable<T>(props: DynamicTableProps<T>) {
  const { data, columns: clns, resizeable } = props;
  const columns = clns ?? (Object.keys(data[0] as object) as (keyof T)[]);

  return (
    <ATHOSResizableDiv
      saveInLocalStorage="tableResizableDiv"
      withToogle
      matchChildSize
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            {columns.map((column) => (
              <Column key={column as string}>{column as string}</Column>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <Cell key={column as string}>{row[column] as string}</Cell>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </ATHOSResizableDiv>
  );
}

export default ATHOSDynamicTable;
