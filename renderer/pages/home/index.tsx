import React, { useContext, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import FormTransaksi from "../../components/FormTransaksi";
import { AppContext } from "../../context/context";
import { ActionTypes } from "../../context/reducer";
import { getTransaksi } from "../../context/actions";
import { utils, writeFile, writeFileXLSX } from "xlsx";
import { DataTable } from "../../components/ui/data-table";
import {
  transaksiColumns,
  transaksiFilterColumns,
} from "../../components/TableTrasnsaksi/transaksiColumns";
import moment from "moment";
import { TTransaksi } from "../../helpers/types";
import { numberToString } from "../../helpers/common";
import { useRouter } from "next/router";
import { Info } from "lucide-react";

function Home() {
  const { query } = useRouter();
  const {
    state: { transaksi },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    getTransaksi(dispatch);
  }, [dispatch]);

  const handleExport = () => {
    const headings = [
      ["", "", "", "", transaksi.title, "", ""],
      [
        "NO",
        "NAMA",
        "MAWIL",
        "IURAN TERAKHIR",
        "TGL IURAN",
        "JUMLAH",
        "KETERANGAN",
      ],
    ];
    const wb = utils.book_new();
    const ws = utils.json_to_sheet([]);
    const newData = transaksi.data.map((d) => ({
      ["No"]: d.nomor,
      ["Nama"]: d.nama,
      ["Mawil"]: d.mawil,
      ["Iuran Terakhir"]: "",
      ["Tgl Iuran"]: moment(d.tgl_iuran).format("D.M.YY"),
      ["Jumlah"]: d.jumlah,
      ["Keterangan"]: d.keterangan,
    }));
    utils.sheet_add_aoa(ws, headings);
    utils.sheet_add_json(ws, newData, {
      origin: "A3",
      skipHeader: true,
    });
    utils.book_append_sheet(wb, ws, transaksi.title);
    writeFileXLSX(wb, `Transaksi ${transaksi.title}.xlsx`);
  };

  const transformData = (data: TTransaksi[]): TTransaksi[] => {
    const newData = data.map((d) => ({
      ...d,
      tgl_iuran: moment(d.tgl_iuran).format("D.M.YY"),
      jumlah: numberToString(d.jumlah),
      iuran_terakhir:
        Number(d.iuran_terakhir) > 0 ? numberToString(d.iuran_terakhir) : null,
    }));
    return newData;
  };

  return (
    <React.Fragment>
      <Head>
        <title>Fatwa Kehidupan</title>
      </Head>
      <Navbar />
      {query.notif && (
        <div className="container mx-auto py-4">
          <div className="alert alert-info">
            <Info />
            <span>{query.notif[1]}</span>
          </div>
        </div>
      )}
      <div className="container mx-auto py-4">
        <div className="flex w-full">
          <FormTransaksi />
        </div>
        <div className="bg-base-100 rounded-md shadow-md">
          <div className="overflow-x-auto flex flex-col ">
            <div className="flex flex-row justify-between items-center p-4">
              <h2 className="text-xl font-bold">Transaksi {transaksi.title}</h2>
              <div className="flex flex-row items-center justify-between gap-4">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => {
                    // dispatch({ type: ActionTypes.LoadingAnggota });
                    if (
                      confirm("Yakin Akan Menghapus Semua Data Transaksi???")
                    ) {
                      dispatch({
                        type: ActionTypes.CleanTransaksi,
                      });
                      setTimeout(() => {
                        getTransaksi(dispatch);
                      }, 2000);
                    }
                  }}
                >
                  Clean
                </button>
                <button
                  className="btn btn-sm btn-success"
                  onClick={handleExport}
                >
                  Export Xlxs
                </button>
              </div>
            </div>
            <DataTable
              idTable="data-transaksi"
              loading={transaksi.loading}
              columns={transaksiColumns(transaksi.title, dispatch)}
              data={transformData(transaksi.data)}
              filterCol={transaksiFilterColumns}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
