import axios from "axios";
import moment from "moment";
import { useContext, useState } from "react";
import { read, utils } from "xlsx";
import { AppContext } from "../../context/context";
import { ActionTypes } from "../../context/reducer";
import DropZoneArea from "../DropZoneArea";

export type IFormInput = {
  title: string;
  files: File[];
};

const FormAnggota = () => {
  const { dispatch } = useContext(AppContext);
  const [files, setFiles] = useState<File[]>([]);
  const [processingFiles, setProcessingFiles] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoadingSubmit(true);
    setProcessingFiles(true);
    dispatch({
      type: ActionTypes.LoadingAnggota,
    });
    try {
      if (files.length === 0) return;

      const file = files[0];
      const reader = new FileReader();
      reader.onload = async (event) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const newDate = moment().unix();
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          let mapData = rows.map((d) => {
            if (d["NO"]) {
              return {
                nomor: d["NO"],
                nama: d["NAMA"],
                mawil: d["MAWIL"],
                dateCreated: newDate,
                dateUpdated: newDate,
              };
            }
          });

          // setData(mapData);
          try {
            dispatch({
              type: ActionTypes.SuccessCleanAnggota,
            });
            setTimeout(
              () =>
                dispatch({
                  type: ActionTypes.SuccessSaveBulkAnggota,
                  payload: mapData,
                }),
              2000
            );
          } catch (err) {
            console.log("error to localStorage");
            dispatch({
              type: ActionTypes.ErrorGetAnggota,
              payload: "Data Gagal Disimpan",
            });
          }

          /* const { data } = await axios.post(
            "/api/anggota",
            { anggota: mapData },
            {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            }
          );
          if (data.status === "ok") {
            setFiles([]);
            setProcessingFiles(false);
          } */
        }
        setProcessingFiles(false);
      };
      reader.readAsArrayBuffer(file);
    } catch (err: any) {
      console.log(err.response?.data);
    }
    setLoadingSubmit(false);
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="shadow-md rounded-md px-8 pt-6 pb-8 mb-4 flex flex-wrap my-2 bg-white w-full space-y-4">
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
                Silahkan Pilih atau Tarik File Excel untuk Anggota
              </span>
            </label>
          )}
        </div>
        <button
          onClick={onSubmit}
          className="btn btn-primary w-full"
          disabled={loadingSubmit || files.length === 0}
        >
          {loadingSubmit ? (
            <span className="loading loading-spinner" />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </div>
  );
};

export default FormAnggota;
