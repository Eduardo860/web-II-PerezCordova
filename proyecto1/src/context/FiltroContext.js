import { createContext, useReducer } from "react";

export const FiltroContext = createContext();

const initialState = {
    name: "",
    status: "",
    species: "",
    type: "",
    gender: ""
};

function filtroReducer(state, action) {
switch (action.type) {
    case "SET_FILTRO":
        return {
        ...state,
        [action.payload.field]: action.payload.value
    };
    case "RESET":
        return initialState;
    default:
        return state;
}
}

export function FiltroProvider({ children }) {
const [state, dispatch] = useReducer(filtroReducer, initialState);

return (
    <FiltroContext.Provider value={{ filtros: state, dispatch }}>
        {children}
    </FiltroContext.Provider>
);
}
