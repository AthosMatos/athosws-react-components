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
function ATHOSDynamicTable<T>(props: DynamicTableProps<T>) {
  return (
    <ATHOSResizableDiv
      disabled={!props.resizeable}
      saveInLocalStorage="tableResizableDiv"
      withToogle
      style={props.style}
    >
      <ADTProvider props={props}>
        {/* <Toaster
          containerStyle={{
            zIndex: 10,
          }}
          toastOptions={{
            duration: Infinity,
            style: {
              padding: 0,
              maxWidth: "none",
              zIndex: 10,
            },
          }}
          position="bottom-right"
        /> */}

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

export default ATHOSDynamicTable;
