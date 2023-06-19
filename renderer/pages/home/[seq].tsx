import { ArrowLeft } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Navbar from "../../components/Navbar";
import { saveTransaksi } from "../../context/actions";
import { AppContext } from "../../context/context";
import { TTransaksi } from "../../helpers/types";

export default () => {
  const { query, push } = useRouter();
  const [date, setDate] = useState();
  const { dispatch } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: query,
  });
  const onSubmit: SubmitHandler<TTransaksi> = async (data) => {
    const newData = {
      ...data,
      jumlah: Number(data.jumlah),
      iuran_terakhir:
        Number(data.iuran_terakhir) === 0 ? null : Number(data.iuran_terakhir),
    };
    await saveTransaksi(dispatch, newData);
    push(
      {
        pathname: "/home",
        query: {
          notif: ["success", "Berhasil Disimpan"],
        },
      },
      undefined,
      { shallow: true }
    );
  };

  // nomor
  // nama
  // mawil
  // iuran terakhir
  // tgl
  // jumlah
  // keterangan

  useEffect(() => {
    setValue("tgl_iuran", query.tgl_iuran);
  }, []);

  return (
    <>
      <Head>
        <title>Fatwa Kehidupan Edit Transaksi</title>
      </Head>
      <Navbar />
      <div className="container mx-auto py-4">
        <div className="bg-base-100 rounded-md shadow-md mb-8 px-16 py-8">
          <div className="flex flex-row items-center space-x-4 mb-8">
            <Link href="/home" className="cursor-pointer">
              <ArrowLeft />
            </Link>
            <h1 className="font-bold text-xl">Edit Transaksi</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative z-0 w-full mb-6 group">
              <input
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled"
                {...register("nomor", { required: "Wajib Diisi" })}
              />
              <label
                htmlFor="nomor"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nomor Baksos
              </label>
              {errors.nomor && (
                <label className="label">
                  <span className="label-text-alt text-error font-bold">
                    {errors.nomor.message}
                  </span>
                </label>
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("nama", { required: "Wajib Diisi" })}
              />
              <label
                htmlFor="nama"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Nama
              </label>
              {errors.nama && (
                <label className="label">
                  <span className="label-text-alt text-error font-bold">
                    {errors.nama.message}
                  </span>
                </label>
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("mawil", { required: "Wajib Diisi" })}
              />
              <label
                htmlFor="mawil"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mawil
              </label>
              {errors.mawil && (
                <label className="label">
                  <span className="label-text-alt text-error font-bold">
                    {errors.mawil.message}
                  </span>
                </label>
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("iuran_terakhir")}
              />
              <label
                htmlFor="iuran_terakhir"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Iuran Terakhir
              </label>
              {errors.iuran_terakhir && (
                <label className="label">
                  <span className="label-text-alt text-error font-bold">
                    {errors.iuran_terakhir.message}
                  </span>
                </label>
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="date"
                pattern="YYYY-MM-DD"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("tgl_iuran", {
                  required: "Wajib Diisi",
                  pattern: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
                })}
              />
              <label
                htmlFor="tgl_iuran"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Tanggal Iuran
              </label>
              {errors.tgl_iuran && (
                <label className="label">
                  <span className="label-text-alt text-error font-bold">
                    {errors.tgl_iuran.message}
                  </span>
                </label>
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="number"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                {...register("jumlah", { required: "Wajib Diisi" })}
              />
              <label
                htmlFor="jumlah"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Jumlah
              </label>
              {errors.jumlah && (
                <label className="label">
                  <span className="label-text-alt text-error font-bold">
                    {errors.jumlah.message}
                  </span>
                </label>
              )}
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled"
                {...register("keterangan")}
              />
              <label
                htmlFor="keterangan"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Keterangan
              </label>
              {errors.keterangan && (
                <label className="label">
                  <span className="label-text-alt text-error font-bold">
                    {errors.keterangan.message}
                  </span>
                </label>
              )}
            </div>
            <button type="submit" className="btn btn-primary w-full">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
