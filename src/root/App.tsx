import React, { useLayoutEffect, useReducer } from "react";
import Header from "../layout/Header";
// import { initialState } from "../libs/constants";
// import { Actions } from "../libs/enums";
// import { parseCurrencies } from "../libs/helper";
// import { Action, InitialState } from "../libs/types";
// import { CurrencyConverter } from "../pages/main/CurrencyConverter";
// import { useStyles } from "./styles";

// const reducer = (state: InitialState, action: Action) => {
//   switch (action.type) {
//     case Actions.setItems:
//       return { currencies: action.payload, isUploaded: true };
//     default:
//       throw new Error();
//   }
// };

const App = () => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const classes = useStyles();
  // useLayoutEffect(() => {
  //   fetch("https://api.exchangerate.host/latest?base=UAH")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) =>
  //       dispatch({
  //         type: Actions.setItems,
  //         payload: parseCurrencies(data.rates),
  //       })
  //     );
  // }, []);

  return (
    <div>
      <Header />
      {/* {state.isUploaded && <CurrencyConverter currencies={state.currencies} />} */}
    </div>
  );
};

export default App;
