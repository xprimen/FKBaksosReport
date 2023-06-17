import { ArrowLeft } from "lucide-react";
import moment from "moment";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Navbar from "../../components/Navbar";
import { saveAnggota } from "../../context/actions";
import { AppContext } from "../../context/context";
import { TAnggota } from "../../helpers/types";

const index = () => {
  const { dispatch } = useContext(AppContext);
  const { query, push } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: query,
  });
  const onSubmit: SubmitHandler<TAnggota> = async (data) => {
    data.dateUpdated = moment().unix();
    await saveAnggota(dispatch, data);
    push(
      {
        pathname: "/anggota",
        query: {
          notif: ["success", "Berhasil Disimpan"],
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <>
      <Head>
        <title>Fatwa Kehidupan Edit Anggota</title>
      </Head>
      <Navbar />
      <div className="container mx-auto py-4">
        <div className="bg-base-100 rounded-md shadow-md mb-8 px-16 py-8">
          <div className="flex flex-row items-center space-x-4 mb-8">
            <Link href="/anggota" className="cursor-pointer">
              <ArrowLeft />
            </Link>
            <h1 className="font-bold text-xl">Edit Anggota</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative z-0 w-full mb-6 group">
              <input
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled"
                readOnly
                {...register("nomor", { required: "Wajib Diisi" })}
              />
              <label
                htmlFor="floating_email"
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
                htmlFor="floating_email"
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
                htmlFor="floating_email"
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
            <button type="submit" className="btn btn-primary w-full">
              Simpan
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default index;
