import { Toaster } from "react-hot-toast";
import { ATHOSResizableDiv } from "../ATHOSResizableDiv";
import { ADTProvider } from "./context";
import { DynamicTableProps } from "./interfaces";
import ADTCells from "./Sections/ADTCells";
import ADTColumns from "./Sections/ADTColumns";
import { ADTBody, ADTHeader, ADTTable, ADTTableWrapper } from "./styled";

/**
 * `columns` is optional, if not provided, it will use the keys of the first object in `data`,
 * but if provided, it will use the keys in the order of the array.
 */
function ATHOSDynamicTable<T>(props: DynamicTableProps<T>) {
  return (
    <ATHOSResizableDiv
      disabled={!props.resizeable}
      saveInLocalStorage="tableResizableDiv"
      withToogle
      style={props.style}
    >
      <Toaster
        toastOptions={{
          duration: Infinity,
        }}
        position="bottom-right"
      />
      <ADTProvider props={props}>
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

export default ATHOSDynamicTable;
