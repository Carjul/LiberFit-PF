import React, { useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { getSuscriptions } from "../../../App/Action/Action";
import { useAppSelector, useAppDispatch } from "../../../App/Hooks/Hooks";
import Avatar from "react-avatar";

export default function SubscriptionTable({ link }: any) {
    const allData: any = useAppSelector((state) => state.data);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getSuscriptions())
    }, []);

    console.log("---> ", allData)

    const data = React.useMemo(
        (): any =>
            allData[link].map((e: any) => {

                return {
                    col1: e.id,
                    col2: (
                        <Avatar
                            className="mr-2"
                            name={e.name}
                            size="45"
                            round={true}
                        />
                    ),
                    col3: e.name,
                    col4: e.timeSlot,
                    col5: "Actualizar",
                };
            }),
        []
    );

    const columns = React.useMemo(
        (): any => [
            {
                Header: "ID",
                accessor: "col1", // accessor is the "key" in the data
            },
            {
                Header: "Avatar",
                accessor: "col2",
            },
            {
                Header: "Nombre",
                accessor: "col3",
            },
            {
                Header: "Franja Horaria",
                accessor: "col4",
            },
            {
                Header: "Actualizar",
                accessor: "col5",
            },
        ],
        []
    );

    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        prepareRow,
    } = useTable({ 
        columns, 
        data, 
    },
      usePagination,
    //   useSortBy,
  )

    const { pageIndex } = state

    return (
        <div className="flex flex-col">
            <div className="overflow-x-hidden sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table {...getTableProps()} className="min-w-full">
                            <thead className="border border-black">
                                {headerGroups.map((headerGroup) => (
                                    <tr {...headerGroup.getHeaderGroupProps()}>
                                        {headerGroup.headers.map((column) => (
                                            <th
                                                className="text-sm font-medium font-bold text-gray-900 px-6 py-4 text-center"
                                                {...column.getHeaderProps()}>
                                                {column.render("Header")}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody {...getTableBodyProps()}>
                                {rows.map((row: any) => {
                                    prepareRow(row);
                                    return (
                                        <tr
                                            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 text-center"
                                            {...row.getRowProps()}
                                        >
                                            {row.cells.map((cell: any) => {
                                                return (
                                                    <td
                                                        className="py-2"
                                                        {...cell.getCellProps()}
                                                    >
                                                        {cell.render("Cell")}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="flex flex-row justify-center mt-3">
                            <button
                                className="bg-redClare px-4 py-2 rounded-xl mx-1"
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                Anterior
                            </button>
                            <div className="flex items-center">
                                <span>
                                    <strong>
                                    Page{' '}{pageIndex + 1} of {pageOptions.length}
                                    </strong>
                                </span>
                            </div>
                            <button
                                className="bg-redClare px-4 py-2 rounded-xl mx-1"
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                Siguiente
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}