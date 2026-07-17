const Table = ({
  columns,
  data,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">

      <table className="min-w-full">

        <thead className="bg-slate-800 text-white">

          <tr>

            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-4 py-3 text-left"
              >
                {column.header}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {data.length === 0 ? (

            <tr>

              <td
                colSpan={columns.length}
                className="py-6 text-center"
              >
                No Data Found
              </td>

            </tr>

          ) : (

            data.map((row, index) => (

              <tr
                key={index}
                className="border-b hover:bg-gray-50"
              >

                {columns.map((column) => (

                  <td
                    key={column.accessor}
                    className="px-4 py-3"
                  >
                    {row[column.accessor]}
                  </td>

                ))}

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
};

export default Table;