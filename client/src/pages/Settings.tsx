import {
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { baseApi } from "../api/api";
import { DataContext } from "../App";

const useStyles = makeStyles({
  "text-label": {
    fontWeight: "bold",
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const Settings = () => {
  const source = useContext(DataContext).dataSource;
  const [botStatus, setBotStatus] = useState<Array<any>>([]);
  const [isLoadingBotStatus, setIsLoadingBotStatus] = useState(false);
  const [actionStatus, setActionStatus] = useState<string>("");
  const classes = useStyles();

  useEffect(() => {
    getAndUpdateBotStatus();
  }, []);

  function getAndUpdateBotStatus() {
    setIsLoadingBotStatus(true);
    baseApi
      .get(`/twitter/bots/status`)
      .then((res) => {
        setBotStatus(res.data);
        setIsLoadingBotStatus(false);
      })
      .catch((err) => {
        setIsLoadingBotStatus(false);
        console.log(err);
      });
  }

  function onClickRefresh() {
    getAndUpdateBotStatus();
  }

  function manageBot(action: "stop" | "start") {
    setIsLoadingBotStatus(true);
    baseApi
      .get(`/twitter/bots/manage?action=${action}`)
      .then((res) => {
        if (res.data.success) {
          setActionStatus(
            `${action.toLocaleUpperCase()} action was successful`
          );
        } else {
          setActionStatus(
            `${action.toLocaleUpperCase()} action was unsuccessful. ${
              res.data.errorCode
            }: ${res.data.errorMessage}`
          );
        }
        getAndUpdateBotStatus();
      })
      .catch((err) => {
        setIsLoadingBotStatus(false);
        console.log(err);
      });
  }

  return (
    <div id="main">
      <h1>Settings</h1>
      <Grid container>
        <Grid xs={5}>
          <h2>Twitter Bot Status</h2>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: 10, marginBottom: 10 }}
            onClick={onClickRefresh}
          >
            <span className={classes["text-label"]}>Refresh bot status</span>
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Instance Id</TableCell>
                  <TableCell align="left">State</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoadingBotStatus ? (
                  <TableRow>
                    <TableCell colSpan={2}>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <CircularProgress />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  botStatus.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">
                        {row.instanceId}
                      </TableCell>
                      <TableCell align="left">
                        <span
                          style={{
                            fontWeight: "bold",
                            color: "#fff",
                            background:
                              row.state.Name === "running"
                                ? "#86dc3d"
                                : row.state.Name === "stopped"
                                ? "#d63e34"
                                : "#4e79c4",
                            paddingTop: 2,
                            paddingBottom: 2,
                            paddingLeft: 10,
                            paddingRight: 10,
                            borderRadius: 15,
                          }}
                        >
                          {row.state.Name}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ marginTop: 20 }}>
            <Button
              variant="contained"
              style={{
                marginTop: 10,
                marginBottom: 10,
                backgroundColor: "#86dc3d",
                color: "white",
                width: 140,
              }}
              onClick={() => manageBot("start")}
            >
              <span className={classes["text-label"]}>Start all</span>
            </Button>{" "}
            <Button
              variant="contained"
              style={{
                marginTop: 10,
                marginBottom: 10,
                backgroundColor: "#d63e34",
                color: "white",
                width: 140,
              }}
              onClick={() => manageBot("stop")}
            >
              <span className={classes["text-label"]}>Stop all</span>
            </Button>
          </div>

          {actionStatus && <div style={{ marginTop: 20 }}>{actionStatus}</div>}
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
