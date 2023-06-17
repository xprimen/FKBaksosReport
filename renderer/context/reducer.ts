import { Dispatch } from "react";
import { MainData, TAnggota, TTransaksi } from "../helpers/types";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum ActionTypes {
  SuccessGetAnggota = "SUCCESS_GET_ANGGOTA",
  SuccessSaveBulkAnggota = "SUCCESS_SAVE_BULK_ANGGOTA",
  SuccessSaveAnggota = "SUCCESS_SAVE_ANGGOTA",
  SuccessCleanAnggota = "SUCCESS_CLEAN_ANGGOTA",
  LoadingAnggota = "LOADING_ANGGOTA",
  ErrorGetAnggota = "ERROR_GET_ANGGOTA",
  SaveBulkTransaksi = "SAVE_BULK_TRANSAKSI",
  GetTransaksi = "GET_TRANSAKSI",
  LoadingTransaksi = "LOADING_TRANSAKSI",
  ErrorTransaksi = "ERROR_TRANSAKSI",
  CleanTransaksi = "CLEAN_TRANSAKSI",
  SaveTransaksi = "SAVE_TRANSAKSI",
}

export type MainPayload = {
  [ActionTypes.SuccessGetAnggota]: TAnggota[];
  [ActionTypes.SuccessSaveBulkAnggota]: TAnggota[];
  [ActionTypes.SuccessSaveAnggota]: undefined;
  [ActionTypes.SuccessCleanAnggota]: undefined;
  [ActionTypes.LoadingAnggota]: undefined;
  [ActionTypes.ErrorGetAnggota]: string;
  [ActionTypes.SaveBulkTransaksi]: {
    title: string;
    data: TTransaksi[];
  };
  [ActionTypes.GetTransaksi]: {
    title: string;
    data: TTransaksi[];
  };
  [ActionTypes.SaveTransaksi]: undefined;
  [ActionTypes.LoadingTransaksi]: undefined;
  [ActionTypes.ErrorTransaksi]: string;
  [ActionTypes.CleanTransaksi]: undefined;
};

// export type MainActions =
//   | {
//       type: ActionTypes.Loading;
//     }
//   | {
//       type: ActionTypes.Success;
//       payload: TAnggota[];
//     }
//   | {
//       type: ActionTypes.Error;
//       payload: string;
//     };

export type MainActions = ActionMap<MainPayload>[keyof ActionMap<MainPayload>];

export const mainReducer = (state: MainData, action: MainActions): MainData => {
  switch (action.type) {
    case ActionTypes.SuccessGetAnggota:
      return {
        ...state,
        anggota: {
          ...state.anggota,
          loading: false,
          data: action.payload,
        },
      };
    case ActionTypes.LoadingAnggota:
      return {
        ...state,
        anggota: {
          ...state.anggota,
          loading: true,
        },
      };
    case ActionTypes.SuccessSaveBulkAnggota:
      console.log("save to localStorage");
      localStorage.setItem("anggota", JSON.stringify(action.payload));
      return {
        ...state,
        anggota: {
          ...state.anggota,
          loading: false,
          data: action.payload,
        },
      };
    case ActionTypes.SuccessSaveAnggota:
      return {
        ...state,
        anggota: {
          ...state.anggota,
          loading: false,
        },
      };
    case ActionTypes.SuccessCleanAnggota:
      console.log("Cleaning Anggota From LocalStorage");
      localStorage.removeItem("anggota");
      return {
        ...state,
        anggota: {
          data: [],
          loading: true,
          error: "",
          selectedId: null,
        },
      };
    case ActionTypes.ErrorGetAnggota:
      return {
        ...state,
        anggota: {
          ...state.anggota,
          loading: false,
          error: action.payload,
        },
      };
    // transaksi---------------------------------------------
    case ActionTypes.GetTransaksi:
      return {
        ...state,
        transaksi: {
          ...state.transaksi,
          loading: false,
          data: action.payload.data,
          title: action.payload.title,
        },
      };
    case ActionTypes.SaveBulkTransaksi:
      console.log("save to localStorage");
      localStorage.setItem("transaksi", JSON.stringify(action.payload));
      return {
        ...state,
        transaksi: {
          ...state.transaksi,
          loading: false,
          title: action.payload.title,
          data: action.payload.data,
        },
      };
    case ActionTypes.SaveTransaksi:
      return {
        ...state,
        transaksi: {
          ...state.transaksi,
          loading: false,
        },
      };
    case ActionTypes.LoadingTransaksi:
      return {
        ...state,
        transaksi: {
          ...state.transaksi,
          loading: true,
        },
      };
    case ActionTypes.CleanTransaksi:
      console.log("Cleaning Transaksi From LocalStorage");
      localStorage.removeItem("transaksi");
      return {
        ...state,
        transaksi: {
          data: [],
          loading: true,
          error: "",
          title: "",
        },
      };
    case ActionTypes.ErrorTransaksi:
      return {
        ...state,
        transaksi: {
          ...state.transaksi,
          loading: false,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};
