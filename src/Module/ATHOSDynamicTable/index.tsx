import { ATHOSResizableDiv } from "../ATHOSResizableDiv";
import ADTSelectedRowsToast from "./components/ADTSelectedRowsToast";
import { ADTProvider } from "./context";
import { DynamicTableProps } from "./interfaces";
import ADTCells from "./Sections/ADTCells";
import ADTColumns from "./Sections/ADTColumns";
import { ADTBody, ADTHeader, ADTTable, ADTTableWrapper } from "./styled";

/**
 * `columns` is optional, if not provided, it will use the keys of the first object in `data`,
 * but if provided, it will use the keys in the order of the array.
 */
export function ATHOSDynamicTable<T>(props: DynamicTableProps<T>) {
  return (
    <ATHOSResizableDiv
      disabled={!props.resizeable}
      saveInLocalStorage={`${props.tableID}-athos-dynamic-table`}
      withToogle
      style={props.style}
    >
      <ADTProvider props={props}>
        <ADTSelectedRowsToast />
        <ADTTableWrapper>
          <ADTTable>
            <ADTHeader>
              <ADTColumns />
            </ADTHeader>
            <ADTBody>
              <ADTCells />
            </ADTBody>
          </ADTTable>
        </ADTTableWrapper>
      </ADTProvider>
    </ATHOSResizableDiv>
  );
}
