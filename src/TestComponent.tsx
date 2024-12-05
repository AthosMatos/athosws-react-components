import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

const variants: Variants = {
  deleted: {
    scale: 0,
    transition: {
      duration: 0.12,
    },
  },
};
const TestComponent = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 32,
    },
    {
      id: 2,
      name: "Jane Doe",
      age: 28,
    },
    {
      id: 3,
      name: "Joe Bloggs",
      age: 45,
    },
    {
      id: 4,
      name: "Jane Bloggs",
    },
    {
      id: 5,
      name: "John Smith",
      age: 32,
    },
    {
      id: 6,
      name: "Jane Smith",
      age: 28,
    },
    {
      id: 7,
      name: "Joe Smith",
      age: 45,
    },
    {
      id: 8,
      name: "Jane Smith",
      age: 28,
    },
    {
      id: 9,
      name: "Joe Smith",
      age: 45,
    },
    {
      id: 10,
      name: "Jane Smith",
      age: 28,
    },
    {
      id: 11,
      name: "Joe Smith",
      age: 45,
    },
    {
      id: 12,
      name: "Jane Smith",
      age: 28,
    },
    {
      id: 13,
      name: "Joe Smith",
      age: 45,
    },
    {
      id: 14,
      name: "Jane Smith",
      age: 28,
    },
    {
      id: 15,
      name: "Joe Smith",
      age: 45,
    },
    {
      id: 16,
      name: "Jane Smith",
      age: 28,
    },
    {
      id: 17,
      name: "Joe Smith",
      age: 45,
    },
    {
      id: 18,
      name: "Jane Smith",
      age: 28,
    },
    {
      id: 19,
      name: "Joe Smith",
      age: 45,
    },
    {
      id: 20,
      name: "Jane Smith",
      age: 28,
    },
    {
      id: 21,
      name: "Joe Smith",
      age: 45,
    },
    {
      id: 22,
      name: "Jane Smith",
      age: 28,
    },
    {
      id: 23,
      name: "Joe Smith",
      age: 45,
    },
    {
      id: 24,
      name: "Jane Smith",
      age: 28,
    },
    {
      id: 25,
      name: "Joe Smith",
      age: 45,
    },
    {
      id: 26,
      name: "Jane Smith",
      age: 28,
    },
    {
      id: 27,
      name: "Joe Smith",
    },
  ]);
  const tableRef = useRef<any>(null);
  const [rowHeight, setRowHeight] = useState(0);
  const pageLimit = 5;
  const filteredData = data.slice(0, pageLimit);

  const remove = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  useEffect(() => {
    if (tableRef.current) {
      setTimeout(() => {
        setRowHeight(tableRef.current.clientHeight);
      }, 100);
    }
  }, [tableRef.current]);

  return (
    <div className="m-10">
      <div
        style={{ height: rowHeight }}
        className={`border border-black overflow-hidden`}
      >
        <div ref={tableRef}>
          <table>
            <thead>
              <tr>
                <th>Header 1</th>
                <th>Header 2</th>
                <th>Header 3</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filteredData.map((row, index) => (
                  <motion.tr
                    exit="deleted"
                    onClick={() => remove(index)}
                    layout
                    transition={{ duration: 0.44 }}
                    variants={variants}
                    key={row.id}
                  >
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.age}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <p>
        Showing {filteredData.length} of {data.length} entries
      </p>
    </div>
  );
};

export default TestComponent;
