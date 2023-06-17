import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { TAnggota } from "../../helpers/types";
import { DataTableColumnHeader } from "../ui/columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TFilterColumns } from "../ui/data-table";

export const columns: ColumnDef<TAnggota>[] = [
  {
    accessorKey: "nomor",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
  },
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
  },
  {
    accessorKey: "mawil",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mawil" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const rowOri = row.original;

      /* return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-8 w-8 p-0 btn btn-ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-base-100" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="flex hover:cursor-pointer">
              <Link
                href={{
                  pathname: `anggota/[nomor]`,
                  query: rowOri,
                }}
              >
                Edit
              </Link>
            </DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
            ); */
      return (
        <Link
          href={{
            pathname: `anggota/[nomor]`,
            query: rowOri,
          }}
        >
          <a className="btn btn-ghost">Edit</a>
        </Link>
      );
    },
  },
];

export const anggotaFilterColumns: TFilterColumns[] = [
  {
    accessorKey: "nomor",
    placeholder: "Cari Berdasarkan Nomor Baksos",
  },
  {
    accessorKey: "nama",
    placeholder: "Cari Nama",
  },
  {
    accessorKey: "mawil",
    placeholder: "Cari Mawil",
  },
];

{
  /* <DropdownMenuSeparator className="divider divider-vertical" /> */
}
