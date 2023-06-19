import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { TAnggota, TTransaksi } from "../../helpers/types";
import { DataTableColumnHeader } from "../ui/columns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { columns } from "../TableAnggota/columns";
import { TFilterColumns } from "../ui/data-table";
import moment from "moment";
import { deleteTransaksi } from "../../context/actions";
import { Dispatch } from "react";
import { MainActions } from "../../context/reducer";

/* type ColTransaksi = {
  nomor: string;
  nama: string;
  mawil: string;
  iuran_terakhir: string;
  title: {
    trgl_iuran: string;
    jumlah: number;
  };
  keterangan: string;
}; */

export const transaksiColumns = (
  parentHeader: string,
  dispatch: Dispatch<MainActions>
) => {
  return [
    // {
    //   accessorKey: "seq",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Seq" />
    //   ),
    // },
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
      accessorKey: "iuran_terakhir",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Iuran Terakhir" />
      ),
    },
    {
      header: parentHeader,
      accessorKey: "title",
      columns: [
        {
          accessorKey: "tgl_iuran",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tgl Iuran" />
          ),
        },
        {
          accessorKey: "jumlah",
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Jumlah" />
          ),
        },
      ],
    },
    {
      accessorKey: "keterangan",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Keterangan" />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        // const rowOri = row.original;
        const rowOri = {
          ...row.original,
          tgl_iuran: moment(row.original.tgl_iuran, ["D.M.YY"]).format(
            "YYYY-MM-DD"
          ),
          jumlah: row.original.jumlah.split(".").join("") * 1,
          iuran_terakhir:
            row.original.iuran_terakhir !== null
              ? row.original.iuran_terakhir.split(".").join("") * 1
              : null,
        };
        // const newRow = {
        //   id: row.id,
        // };

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
          </DropdownMenu>
        ); */
        return (
          <div className="flex flex-row justify-center items-center gap-x-4">
            <Link
              href={{
                pathname: `home/[seq]`,
                query: rowOri,
              }}
            >
              <a className="btn btn-sm btn-ghost">Edit</a>
            </Link>
            <button
              className="btn btn-sm btn-error"
              onClick={() => {
                if (confirm("Yakin Akana Menghapus Data Ini?")) {
                  deleteTransaksi(dispatch, rowOri.seq);
                }
              }}
            >
              Hapus
            </button>
          </div>
        );
      },
    },
  ];
};

export const transaksiFilterColumns: TFilterColumns[] = [
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
  {
    accessorKey: "jumlah",
    placeholder: "Cari berdasarkan Jumlah",
  },
  {
    accessorKey: "keterangan",
    placeholder: "Cari berdasarkan Keterangan",
  },
];
