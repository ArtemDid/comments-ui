import React from "react";
// import { getCurrencyPrice } from "../libs/helper";
// import { Currencies } from "../libs/types";
import { useStyles } from "./styles";

// interface Props {
//   currencies: Currencies;
// }

const Header = () => {
  const { classes, cx } = useStyles();

  return <div className={cx(classes.header)}>aaaaa</div>;
};

export default Header;
