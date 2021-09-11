import { createTheme, MuiThemeProvider } from "@material-ui/core";
import indigo from "@material-ui/core/colors/indigo";
import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { DataSource } from "./helpers/dataSourceEnum";
import "./index.css";
import Routes from "./routes";

export const DataContext = React.createContext({
  dataSource:
    (localStorage.getItem("dataSource") as DataSource) ?? DataSource.Google,
  changeDataSource: (d: DataSource) => {},
});

const theme = createTheme({
  palette: {
    primary: {
      main: indigo["A400"],
    },
    secondary: {
      main: indigo["A200"],
    },
  },
  typography: {
    fontFamily: ["Mulish", "sans-serif"].join(","),
  },
});

export const App = () => {
  const changeDataSource = (d: DataSource) => {
    localStorage.setItem("dataSource", d);
    setDataSource(d);
  };

  const [dataSource, setDataSource] = useState(
    (localStorage.getItem("dataSource") as DataSource) ?? DataSource.Google
  );

  return (
    <MuiThemeProvider theme={theme}>
      <DataContext.Provider value={{ dataSource, changeDataSource }}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </DataContext.Provider>
    </MuiThemeProvider>
  );
};
