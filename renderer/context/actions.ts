import { useContext } from "react";
import { TAnggota, TTransaksi } from "../helpers/types";
import { AppContext } from "./context";
import { ActionTypes, MainActions } from "./reducer";

export const getAnggota = async (dispatch: React.Dispatch<MainActions>) => {
  dispatch({
    type: ActionTypes.LoadingAnggota,
  });
  // await new Promise((resolve) => setTimeout(resolve, 1500));

  const data = localStorage.getItem("anggota");
  // console.log(JSON.parse(data));
  if (data) {
    dispatch({
      type: ActionTypes.SuccessGetAnggota,
      payload: JSON.parse(data),
    });
  } else {
    dispatch({
      type: ActionTypes.ErrorGetAnggota,
      payload: "Data Kosong",
    });
  }

  /* await axios
    .get("/api/anggota")
    .then((d) => {
      dispatch({
        type: ActionTypes.SuccessGetAnggota,
        payload: d.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: ActionTypes.ErrorGetAnggota,
        payload: "Error Pengambilan Data",
      });
    }); */
};

export const saveAnggota = async (
  dispatch: React.Dispatch<MainActions>,
  row: TAnggota
) => {
  dispatch({
    type: ActionTypes.LoadingAnggota,
  });
  let data: TAnggota[] = JSON.parse(localStorage.getItem("anggota"));
  const id = data.findIndex((x) => x.nomor === row.nomor);
  data[id] = row;
  try {
    localStorage.setItem("anggota", JSON.stringify(data));
    dispatch({
      type: ActionTypes.SuccessSaveAnggota,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ErrorGetAnggota,
      payload: "Gagal Simpan Data",
    });
  }
};

export const getTransaksi = async (dispatch: React.Dispatch<MainActions>) => {
  dispatch({
    type: ActionTypes.LoadingTransaksi,
  });
  // await new Promise((resolve) => setTimeout(resolve, 1500));

  const data = localStorage.getItem("transaksi");
  if (data) {
    dispatch({
      type: ActionTypes.GetTransaksi,
      payload: JSON.parse(data),
    });
  } else {
    dispatch({
      type: ActionTypes.ErrorTransaksi,
      payload: "Data Kosong",
    });
  }
};

export const saveTransaksi = async (
  dispatch: React.Dispatch<MainActions>,
  row: TTransaksi
) => {
  dispatch({
    type: ActionTypes.LoadingTransaksi,
  });
  let data: { data: TTransaksi[]; title: string } = JSON.parse(
    localStorage.getItem("transaksi")
  );
  const id = data.data.findIndex((x) => {
    // console.log("x.seq", x.seq);
    // console.log("row.seq", Number(row.seq));
    // console.log("Hasil =", Number(x.seq) === Number(row.seq));
    return Number(x.seq) === Number(row.seq);
  });
  data.data[id] = row;
  try {
    localStorage.setItem("transaksi", JSON.stringify(data));
    dispatch({
      type: ActionTypes.SaveTransaksi,
    });
  } catch (err) {
    dispatch({
      type: ActionTypes.ErrorTransaksi,
      payload: "Gagal Simpan Data",
    });
  }
};

export const deleteTransaksi = async (
  dispatch: React.Dispatch<MainActions>,
  seq: string
) => {
  dispatch({
    type: ActionTypes.LoadingTransaksi,
  });
  let getData: { data: TTransaksi[]; title: string } = JSON.parse(
    localStorage.getItem("transaksi")
  );
  const index = getData.data.findIndex((x) => {
    // console.log("x.seq", x.seq);
    // console.log("row.seq", Number(row.seq));
    // console.log("Hasil =", Number(x.seq) === Number(row.seq));
    return Number(x.seq) === Number(seq);
  });
  // delete data.data[id];
  getData.data.splice(index, 1);
  try {
    localStorage.setItem("transaksi", JSON.stringify(getData));
    dispatch({
      type: ActionTypes.DeleteTransaksi,
    });
    getTransaksi(dispatch);
  } catch (err) {
    dispatch({
      type: ActionTypes.ErrorTransaksi,
      payload: "Gagal Simpan Data",
    });
  }
};
