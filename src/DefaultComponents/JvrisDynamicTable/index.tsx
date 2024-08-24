import styled from "styled-components";
import ResizableDiv from "../ResizableDiv";

type DynamicTableProps<T> = {
    data: T[];
    columns?: (keyof T)[];
    resizeable?: boolean;
};

const Column = styled.th`
    font-size: 1.2rem;
`;

const Cell = styled.td`
    font-size: 1.2rem;
`;
/**
 * `columns` is optional, if not provided, it will use the keys of the first object in `data`,
 * but if provided, it will use the keys in the order of the array.
 */
function JvrisDynamicTable<T>(props: DynamicTableProps<T>) {
    const { data, columns: clns, resizeable } = props;
    const columns = clns ?? (Object.keys(data[0]) as (keyof T)[]);

    return (
        <ResizableDiv
            saveInLocalStorage="tableResizableDiv"
            withToogle
            matchChildSize
        >
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <Column key={column as string}>
                                {column as string}
                            </Column>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column) => (
                                <Cell key={column as string}>
                                    {row[column] as string}
                                </Cell>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </ResizableDiv>
    );
}

export default JvrisDynamicTable;
