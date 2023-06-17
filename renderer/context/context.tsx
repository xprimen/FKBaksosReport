import { Dispatch, createContext, useReducer } from "react";
import { MainData } from "../helpers/types";
import { MainActions, mainReducer } from "./reducer";

export const mainData: MainData = {
  anggota: {
    data: [],
    loading: false,
    error: "",
    selectedId: null,
  },
  transaksi: {
    data: [],
    loading: false,
    error: "",
    title: "",
  },
};

export const AppContext = createContext<{
  state: MainData;
  dispatch: Dispatch<MainActions>;
}>({
  state: mainData,
  dispatch: () => null,
});

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, mainData);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
