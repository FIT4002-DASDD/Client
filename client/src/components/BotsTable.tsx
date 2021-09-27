import { TablePagination } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { baseApi } from "../api/api";
import { DataContext } from "../App";
import { DataSource } from "../helpers/dataSourceEnum";
import politicalRanking from "../helpers/politicalRankings";
import GoogleBotDetails from "./google/GoogleBotDetails";
import TwitterBotDetails from "./twitter/TwitterBotDetails";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: any, comparator: (a: any, b: any) => number) {
  const stabilizedThis = array.map(
    (el: T, index: number) => [el, index] as [T, number]
  );
  stabilizedThis.sort((a: number[], b: number[]) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el: any[]) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const getHeadCells = (source: DataSource) => {
  if (source === DataSource.Google) {
    return [
      {
        id: "username",
        numeric: false,
        disablePadding: true,
        label: "Username",
      },
      { id: "name", numeric: false, disablePadding: false, label: "Name" },
      {
        id: "politicalRanking",
        numeric: true,
        disablePadding: false,
        label: "Political Alignment",
      },
      { id: "dob", numeric: false, disablePadding: false, label: "DOB" },
      { id: "gender", numeric: false, disablePadding: false, label: "Gender" },
    ];
  } else
    return [
      {
        id: "username",
        numeric: false,
        disablePadding: true,
        label: "Username",
      },
      {
        id: "politicalRanking",
        numeric: true,
        disablePadding: false,
        label: "Political Alignment",
      },
      { id: "dob", numeric: false, disablePadding: false, label: "DOB" },
      {
        id: "type",
        numeric: false,
        disablePadding: false,
        label: "Political Region",
      },
    ];
};

interface BotsTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  numSelected: number;
  headCells: HeadCell[];
}

function BotsTableHead(props: BotsTableProps) {
  const {
    classes,
    order,
    numSelected,
    onSelectAllClick,
    rowCount,
    orderBy,
    onRequestSort,
    headCells,
  } = props;
  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all bots" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            // align={headCell.id === "username" ? "left" : "center"}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.primary.main,
            backgroundColor: lighten(theme.palette.primary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.primary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
    viewAdsButton: {
      whiteSpace: "nowrap",
      padding: "10px",
      minWidth: "auto",
    },
  })
);

interface BotsTableToolbarProps {
  selected: Bot[];
  source: DataSource;
}

const BotsTableToolbar = (props: BotsTableToolbarProps) => {

  const classes = useToolbarStyles();
  const { selected, source } = props;
  const numSelected = selected.length;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Bots
        </Typography>
      )}
      {
        numSelected > 0 ? (
          <Link
            to={{ pathname: "/ads", state: { source: source, bots: selected } }}
            style={{ textDecoration: "none" }}
          >
            <Button className={classes.viewAdsButton} color="primary">
              View ads for selected bots
            </Button>
          </Link>
        ) : null
        // <Tooltip title="Filter list">
        //   <IconButton aria-label="filter list">
        //     <FilterListIcon />
        //   </IconButton>
        // </Tooltip>
      }
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

type BotsTableProp = {
  /**
   * Bots which scrape the Ads
   */
   bots: GoogleBot[] | TwitterBot[];
  /**
   * Google or Twitter
   */
   source: DataSource;
};

/**
 * Table displayed on Bots page
 */
export default function BotsTable(props: BotsTableProp) {
  const {bots, source} = props

  const classes = useStyles();
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("adcount");
  const [selected, setSelected] = useState<Bot[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [detailsBot, setDetailsBot] = useState<Bot | null>(null);

  const handleDetailsClose = () => {
    setDetailsBot(null); 
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(bots);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, bot: Bot) => {
    event.stopPropagation();
    const selectedIndex = selected.findIndex((e) => e.id === bot.id);
    setSelected((s) =>
      selectedIndex === -1 ? s.concat(bot) : s.filter((e) => e.id !== bot.id)
    );
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (bot: Bot) =>
    selected.map((e) => e.id).indexOf(bot.id) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, bots.length - page * rowsPerPage);

  const createGoogleTableRow = (bots: GoogleBot[]) =>
    stableSort(bots, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row: GoogleBot, index: number) => {
        const labelId = `enhanced-table-checkbox-${index}`;
        const isItemSelected = isSelected(row);
        const ranking = politicalRanking[row.politicalRanking];
        return (
          <TableRow
            hover
            style={{ cursor: "pointer" }}
            onClick={() => {
              setDetailsBot(row);
            }}
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={index}
            selected={isItemSelected}
          >
            <TableCell padding="checkbox">
              <Checkbox
                onClick={(event) => handleClick(event, row)}
                role="checkbox"
                aria-checked={isItemSelected}
                checked={isItemSelected}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </TableCell>
            <TableCell
              component="th"
              id={labelId}
              scope="row"
              padding="normal"
              align="left"
            >
              {row.username}
            </TableCell>
            <TableCell align="left">{row.fName + " " + row.lName}</TableCell>
            <TableCell align="left">
              <span
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                  background:
                    ranking === "Left"
                      ? "#4e79c4"
                      : ranking === "Right"
                      ? "#d63e34"
                      : "#fcb316",
                  paddingTop: 2,
                  paddingBottom: 2,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 15,
                }}
              >
                {ranking}
              </span>
            </TableCell>
            <TableCell align="left">
              {new Date(row.dob).toLocaleDateString("en-AU")}
            </TableCell>
            <TableCell align="left">{row.gender}</TableCell>
          </TableRow>
        );
      });

  const createTwitterTableRow = (bots: TwitterBot[]) =>
    stableSort(bots, getComparator(order, orderBy))
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row: TwitterBot, index: number) => {
        const labelId = `enhanced-table-checkbox-${index}`;
        const isItemSelected = isSelected(row);
        const ranking = politicalRanking[row.politicalRanking];
        return (
          <TableRow
            hover
            style={{ cursor: "pointer" }}
            onClick={() => {
              setDetailsBot(row);
            }}
            tabIndex={-1}
            key={index}
            selected={isItemSelected}
          >
            <TableCell padding="checkbox">
              <Checkbox
                onClick={(event) => handleClick(event, row)}
                role="checkbox"
                aria-checked={isItemSelected}
                checked={isItemSelected}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </TableCell>
            <TableCell
              component="th"
              id={labelId}
              scope="row"
              padding="normal"
              align="left"
            >
              {row.username}
            </TableCell>

            <TableCell align="left">
              <span
                style={{
                  fontWeight: "bold",
                  color: "#fff",
                  background:
                    ranking === "Left"
                      ? "#4e79c4"
                      : ranking === "Right"
                      ? "#d63e34"
                      : "#fcb316",
                  paddingTop: 2,
                  paddingBottom: 2,
                  paddingLeft: 10,
                  paddingRight: 10,
                  borderRadius: 15,
                }}
              >
                {ranking}
              </span>
            </TableCell>
            <TableCell align="left">
              {new Date(row.dob).toLocaleDateString("en-AU")}
            </TableCell>
            <TableCell align="left">
              {row.type.charAt(0).toUpperCase() + row.type.slice(1)}
            </TableCell>
          </TableRow>
        );
      });

  return (
    <div className={classes.root}>
      {source === DataSource.Google ? (
        <GoogleBotDetails
          bot={detailsBot as GoogleBot}
          handleClose={handleDetailsClose}
        />
      ) : (
        <TwitterBotDetails
          bot={detailsBot as TwitterBot}
          handleClose={handleDetailsClose}
        />
      )}
      <Paper className={classes.paper}>
        <BotsTableToolbar selected={selected} source={source} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="enhanced table"
          >
            <BotsTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={bots.length}
              onSelectAllClick={handleSelectAllClick}
              numSelected={selected.length}
              headCells={getHeadCells(source)}
            />
            <TableBody style={{ maxHeight: 525, overflow: "auto" }}>
              {bots.length === 0 ? (
                <TableRow>
                  <TableCell
                    align="center"
                    style={{ fontWeight: "bold" }}
                    colSpan={12}
                  >
                    No bots found
                  </TableCell>
                </TableRow>
              ) : source === DataSource.Google ? (
                createGoogleTableRow(bots as GoogleBot[])
              ) : (
                createTwitterTableRow(bots as TwitterBot[])
              )}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={bots.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
