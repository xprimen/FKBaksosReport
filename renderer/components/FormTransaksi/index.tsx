import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { read, utils } from "xlsx";
import { AppContext } from "../../context/context";
import { ActionTypes } from "../../context/reducer";
import DropZoneArea from "../DropZoneArea";
import { TAnggota, TTransaksi } from "../../helpers/types";
import { Info } from "lucide-react";
import { getAnggota } from "../../context/actions";

export type IFormInput = {
  title: string;
  files: File[];
};

const FormTransaksi = () => {
  const {
    state: { anggota },
    dispatch,
  } = useContext(AppContext);
  const [files, setFiles] = useState<File[]>([]);
  const [processingFiles, setProcessingFiles] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [errorDataAnggota, setErrorDataAnggota] = useState("");

  const transformData = (rows: any): TTransaksi[] => {
    // const filter = rows.filter();
    let indexing = 0;
    let mapData = rows.map((d: any, index: number) => {
      // console.log("awal indexing :", indexing);
      const monetSplit = d["Credit"].split(".")[0].split(",");
      const nomorBaksosDariNominal = String(monetSplit[monetSplit.length - 1]);
      const moneyIn = +monetSplit.join("");
      const tgl_iuran = moment(d["Date & Time"], "DD/MM/YYYY hh.mm.ss", false)
        // .format("D.M.YY");
        .format("YYYY-MM-DD");
      if (nomorBaksosDariNominal !== "999" && nomorBaksosDariNominal !== "0") {
        /* const nama = d["Description"]
          .split("\r\n")
          .slice(-1)[0]
          .trim()
          .split("/")
          .slice(-1)[0]; */
        let nama = "";
        let mawil = "";
        // let nomorBaksos: string = "";
        // if(nomorBaksosDariNominal === '000'){
        //   nomorBaksos =
        // }

        let dataAnggota: TAnggota;
        if (nomorBaksosDariNominal !== "000") {
          // console.log("nomor baksos :", nomorBaksosDariNominal);
          // console.log("panjang :", nomorBaksosDariNominal.length);
          dataAnggota = anggota.data.filter((d) => {
            return d.nomor === nomorBaksosDariNominal.padStart(3, "0");
          })[0];
          if (dataAnggota) {
            nama = dataAnggota.nama;
            mawil = dataAnggota.mawil;
          }
        }

        const ret: TTransaksi = {
          seq: indexing,
          nomor: nomorBaksosDariNominal,
          nama,
          jumlah: moneyIn,
          mawil,
          tgl_iuran,
          keterangan: "",
        };
        // console.log(ret);
        indexing = indexing + 1;
        // console.log("akhir indexing :", indexing);

        return ret;
      }
    });
    return mapData.filter((d) => d !== undefined);
    // setDataRows(mapData);
  };

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (sendData) => {
    if (anggota.data.length) {
      // console.log("data :", data);
      setLoadingSubmit(true);
      setProcessingFiles(true);
      dispatch({
        type: ActionTypes.LoadingTransaksi,
      });
      try {
        if (files.length === 0) return;

        const file = files[0];
        const reader = new FileReader();
        reader.onload = async (event) => {
          const wb = read(event.target.result);
          const sheets = wb.SheetNames;

          if (sheets.length) {
            const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
            const mapData = transformData(rows);
            // console.log("Fomr Transaksi onSubmit :", mapData);
            try {
              dispatch({
                type: ActionTypes.CleanTransaksi,
              });
              setTimeout(
                () =>
                  dispatch({
                    type: ActionTypes.SaveBulkTransaksi,
                    payload: {
                      data: mapData,
                      title: sendData.title,
                    },
                  }),
                2000
              );
            } catch (err) {
              console.log("error to localStorage");
              dispatch({
                type: ActionTypes.ErrorTransaksi,
                payload: "Data Gagal Disimpan",
              });
            }
          }
          setProcessingFiles(false);
        };
        reader.readAsArrayBuffer(file);
      } catch (err: any) {
        console.log(err.response?.data);
      }
      setLoadingSubmit(false);
      reset({
        title: "",
        files: [],
      });
    } else {
      setErrorDataAnggota(
        "Silahkan Input Data Anggota Terlebih Dahulu di Menu Anggota."
      );
    }
  };

  useEffect(() => {
    if (!anggota.data.length) {
      getAnggota(dispatch);
    }
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-wrap my-2 bg-white w-full space-y-4"
    >
      <div className="flex flex-col w-full">
        <label>Upload File Excel</label>
        <DropZoneArea
          name="files"
          processingFiles={processingFiles}
          sendFiles={setFiles}
          // setValue={setValue}
          textLabel1="Klik atau Tarik File Excel Kesini untuk diunggah"
          textLabel2="Hanya File Berekstensi Xlsx."
          accept={{
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
              [],
            // "image/jpeg": [],
          }}
        />
        {files.length === 0 && loadingSubmit && (
          <label className="label">
            <span className="label-text-alt text-error">
              Silahkan Pilih atau Tarik File Excel
            </span>
          </label>
        )}
      </div>
      <div className="form-control w-full">
        <input
          // onChange={(e) => setTitle(e.target.value)}
          {...register("title", { required: "Wajib Diisi" })}
          type="text"
          placeholder="Judul Data"
          className={`input ring-1 ring-blue-500 ${
            errors.title && "input-error"
          }`}
        />
        {errors.title && (
          <label className="label">
            <span className="label-text-alt text-error">
              {errors.title.message}
            </span>
          </label>
        )}
      </div>
      <button
        className="btn btn-primary w-full"
        disabled={loadingSubmit || files.length === 0}
      >
        {loadingSubmit ? (
          <span className="loading loading-spinner" />
        ) : (
          "Submit"
        )}
      </button>
      {errorDataAnggota && (
        <div className="alert alert-info">
          <Info />
          <span>{errorDataAnggota}</span>
        </div>
      )}
    </form>
  );
};

export default FormTransaksi;
