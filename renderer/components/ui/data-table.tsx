import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import { DataTablePagination } from "./data-table-pagination";
import { useState } from "react";

export type TFilterColumns = {
  accessorKey: string;
  placeholder: string;
  valueType?: string;
};

interface DataTableProps<TData, TValue> {
  idTable: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  filterCol?: TFilterColumns[];
}

export function DataTable<TData, TValue>({
  idTable,
  columns,
  data,
  loading = false,
  filterCol,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      columnFilters,
      sorting,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-center gap-x-12 px-4 py-2">
        {filterCol &&
          filterCol.map((filterCol, i) => (
            <input
              key={String(i)}
              placeholder={filterCol.placeholder}
              type={filterCol.valueType || "text"}
              value={
                (table
                  .getColumn(filterCol.accessorKey)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn(filterCol.accessorKey)
                  ?.setFilterValue(event.target.value)
              }
              className="input input-bordered input-md w-full max-w-sm"
            />
          ))}
        {/* <input
          placeholder="Cari Nomor Baksos"
          value={(table.getColumn("nomor")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nomor")?.setFilterValue(event.target.value)
          }
          className="input input-bordered input-md w-full max-w-sm"
        />
        <input
          placeholder="Cari Nama"
          value={(table.getColumn("nama")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nama")?.setFilterValue(event.target.value)
          }
          className="input input-bordered input-md w-full max-w-sm"
        />
        <input
          placeholder="Cari Mawil"
          value={(table.getColumn("mawil")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("mawil")?.setFilterValue(event.target.value)
          }
          className="input input-bordered input-md w-full max-w-sm"
        /> */}
      </div>
      <div className="rounded-md border">
        <Table id={idTable} className="table table-zebra table-lg">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination loading={loading} table={table} />
    </div>
  );
}
