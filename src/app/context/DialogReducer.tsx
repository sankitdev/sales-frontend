import { useReducer, createContext } from "react";

type State = {
  isDialogOpen: boolean;
  action: "add" | "update" | null;
};
type Action =
  | { type: "TOGGLE_DIALOG" }
  | { type: "SET_ACTION"; payload: "add" | "update" | null };

const initialState: State = {
  isDialogOpen: false,
  action: null,
};
export const DialogContext = createContext({
  isDialogOpen: false,
  action: null as "add" | "update" | null,
  toggleDialog: () => {},
  setAction: (action: "add" | "update" | null) => {},
});
const dialogReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "TOGGLE_DIALOG":
      return { ...state, isDialogOpen: !state.isDialogOpen };
    case "SET_ACTION":
      return { ...state, action: action.payload };
    default:
      return state;
  }
};

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(dialogReducer, initialState);
  const toggleDialog = () => dispatch({ type: "TOGGLE_DIALOG" });
  const setAction = (action: "add" | "update" | null) => {
    dispatch({ type: "SET_ACTION", payload: action });
  };
  return (
    <DialogContext.Provider value={{ ...state, toggleDialog, setAction }}>
      {children}
    </DialogContext.Provider>
  );
};
