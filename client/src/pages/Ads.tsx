import DateFnsUtils from "@date-io/date-fns";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  CircularProgress,
  createStyles,
  Divider,
  Drawer,
  Fade,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ClearIcon from "@material-ui/icons/Clear";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterListIcon from "@material-ui/icons/FilterList";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Pagination from "@material-ui/lab/Pagination";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseApi } from "../api/api";
import { DataContext } from "../App";
import AdCardSkeleton from "../components/AdCardSkeleton";
import GoogleAdCard from "../components/google/GoogleAdCard";
import TwitterAdCard from "../components/twitter/TwitterAdCard";
import { DataSource } from "../helpers/dataSourceEnum";
import politicalRankings from "../helpers/politicalRankings";
import { TwitterAdType } from "../helpers/twitterAdTypeEnum";
import { TwitterBotType } from "../helpers/twitterBotTypeEnum";
interface stateType {
  bots: Bot[];
  source: DataSource;
}
const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      boxShadow: "none",
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      justifyContent: "flex-start",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: 0,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    accordion: {
      "&::before": {
        opacity: 0,
        height: 30,
      },
      boxShadow: "none",
      marginTop: 16,
    },
  })
);

const Ads = () => {
  // Context for data source
  const dataSourceContext = useContext(DataContext);
  const source = dataSourceContext.dataSource;

  /**
   * Source (Google/Twitter) for ad data
   */
  const [adSource, setAdSource] = React.useState<DataSource>(source);
  /**
   * Number of entries displayed on each page
   */
  const LIMIT = 30;
  /**
   * State for total number of ads
   */
  const [totalNumberOfAd, setTotalNumberOfAd] = useState(0);
  /**
   * State to indicate error in page number input
   */
  const [errorBooleanForInput, setErrorBooleanForInput] = useState(false);
  /**
   * Error message to display
   */
  const [errorMessage, setErrorMessage] = useState("");
  /**
   * State to store total amount of pages
   */
  const [pageNumber, setPageNumber] = useState(0);
  /**
   * State to store all ads
   */
  const [ads, setAds] = useState<Ad[]>([]);
  /**
   * State for current page number
   */
  const [page, setPage] = useState(1);
  /**
   * Loading state for retrieving ads
   */
  const [loading, setLoading] = useState(false);

  const initialBots = useLocation<stateType>()?.state;

  /**
   * State for the bot filter
   */
  const [bots, setBots] = useState<Bot[]>(
    initialBots?.source === source ? initialBots?.bots ?? [] : []
  ); // empty = no filter

  useEffect(() => {
    setBots(initialBots?.source === source ? initialBots?.bots ?? [] : []);
    setTags([]);
  }, [source, initialBots]);

  /**
   * State for the tags filter
   */
  const [tags, setTags] = useState<Tag[]>([]);

  /**
   * State for all bots
   */
  const [allBots, setAllBots] = useState<Bot[]>([]);
  /**
   * State for all tags
   */
  const [allTags, setAllTags] = useState<Tag[]>([]);
  /**
   * Loading state for bots data
   */
  const [botsLoading, setBotsLoading] = useState(false);
  /**
   * Loading state for tags data
   */
  const [tagsLoading, setTagsLoading] = useState(false);
  /**
   * Start date for date filter
   */
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  /**
   * End date for date filter
   */
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  type TwitterAdTypeItem = {
    type: TwitterAdType;
    label: string;
    checked: boolean;
  };

  type TwitterBotTypeItem = {
    type: TwitterBotType;
    label: string;
    checked: boolean;
  };

  type PoliticalFilterItem = {
    ranking: politicalRankings;
    label: string;
    checked: boolean;
  };

  // Define filter options for ad type
  const [adTypeState, setAdTypeState] = useState<TwitterAdTypeItem[]>([
    {
      type: TwitterAdType.TWEET,
      label: "Promoted tweets",
      checked: true,
    },
    {
      type: TwitterAdType.FOLLOW,
      label: "Promoted follows",
      checked: true,
    },
    {
      type: TwitterAdType.UNSPECIFIED,
      label: "Unspecified",
      checked: true,
    },
  ]);

  // Define filter options for bot type
  const [botTypeState, setBotTypeState] = useState<TwitterBotTypeItem[]>([
    {
      type: TwitterBotType.AMERICA,
      label: "America",
      checked: true,
    },
    {
      type: TwitterBotType.AUSTRALIA,
      label: "Australia",
      checked: true,
    },
    {
      type: TwitterBotType.UNSPECIFIED,
      label: "Unspecified",
      checked: true,
    },
  ]);

  // Define filter options for political alignment
  const [politicalFilterState, setPoliticalFilterState] = useState<
    PoliticalFilterItem[]
  >([
    {
      ranking: politicalRankings.Left,
      label: "Left",
      checked: true,
    },
    {
      ranking: politicalRankings.CenterLeft,
      label: "Center-Left",
      checked: true,
    },
    {
      ranking: politicalRankings.Center,
      label: "Center",
      checked: true,
    },
    {
      ranking: politicalRankings.CenterRight,
      label: "Center-Right",
      checked: true,
    },
    {
      ranking: politicalRankings.Right,
      label: "Right",
      checked: true,
    },
    {
      ranking: politicalRankings.Unspecified,
      label: "Unspecified",
      checked: true,
    },
  ]);

  const classes = useStyles();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  // Reload bots when filters/source changes
  useEffect(() => {
    let params = {
      offset: (page - 1) * LIMIT,
      limit: LIMIT,
      bots: bots.map((a) => a.id),
      tag: tags.map((a) => a.name),
      startDate: startDate?.getTime(),
      endDate: endDate?.getTime(),
      groupUnique: source === DataSource.Twitter,
      adType: adTypeState.flatMap((s) => (s.checked ? s.type : [])),
      botType: botTypeState.flatMap((s) => (s.checked ? s.type : [])),
      political: politicalFilterState.flatMap((s) =>
        s.checked ? s.ranking : []
      ),
    };

    setLoading(true);
    baseApi
      .get(`/${source}/ads`, {
        params,
      })
      .then((res: any) => {
        setAds(res.data.records);
        setTotalNumberOfAd(res.data.metadata.total_count);
        setPageNumber(Math.ceil(totalNumberOfAd / LIMIT));
        setErrorBooleanForInput(false);
        setErrorMessage("");
        setAdSource(source);
        setLoading(false);
      });
  }, [
    page,
    LIMIT,
    bots,
    tags,
    source,
    startDate,
    endDate,
    adTypeState,
    botTypeState,
    totalNumberOfAd,
    politicalFilterState,
  ]);

  const handleChange = (event: any, value: number) => {
    setPage(value);
  };

  // Load all bots for bot filter autocomplete input box
  useEffect(() => {
    setBotsLoading(true);
    baseApi.get(`/${source}/bots`).then((res) => {
      setAllBots(res.data);
      setBotsLoading(false);
    });
  }, [source]);

  // Load all tags for bot filter autocomplete input box
  useEffect(() => {
    setTagsLoading(true);
    baseApi.get(`/${source}/tags`).then((res) => {
      setAllTags(res.data);
      setTagsLoading(false);
    });
  }, [source]);

  const handleOnNewTagCreated = () => {
    baseApi.get(`/${source}/tags`).then((res) => {
      setAllTags(res.data);
      setTagsLoading(false);
    });
  };

  const enterKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      if (
        !isNaN(e.target.value as any) &&
        e.target.value !== "" &&
        parseInt(e.target.value) >= 1 &&
        parseInt(e.target.value) <= pageNumber
      ) {
        localStorage.setItem("adsPage", JSON.stringify(e.target.value));
        setPage(parseInt(e.target.value));
        setErrorBooleanForInput(false);
        setErrorMessage("");
      } else {
        setErrorBooleanForInput(true);
        //setErrorMessage("Invalid Input.");
      }
    }
  };

  const LoadSkeleton = () => (
    <>
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <AdCardSkeleton key={i} />
        ))}
    </>
  );

  const handleAdTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setAdTypeState((s) =>
      s.map((e, i) =>
        i === index ? { ...e, checked: event.target.checked } : e
      )
    );
  };

  const handleBotTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setBotTypeState((s) =>
      s.map((e, i) =>
        i === index ? { ...e, checked: event.target.checked } : e
      )
    );
  };

  const handlePoliticalFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setPoliticalFilterState((s) =>
      s.map((e, i) =>
        i === index ? { ...e, checked: event.target.checked } : e
      )
    );
  };

  const handleAllPoliticalFilterChange = (toggle: boolean) => {
    setPoliticalFilterState((s) => s.map((e) => ({ ...e, checked: toggle })));
  };

  const createFilterItems = () => [
    [
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Typography>Bots</Typography>
      </AccordionSummary>,
      <AccordionDetails style={{ display: "block" }}>
        <Autocomplete
          multiple
          id="bots-select"
          onChange={(event: any, newValue: Bot[] | null) => {
            if (newValue) setBots(newValue);
          }}
          aria-label="Filter bots"
          filterSelectedOptions
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.username}
          options={allBots}
          value={bots}
          loading={botsLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selected bots"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </AccordionDetails>,
    ],
    [
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Typography>Tags</Typography>
      </AccordionSummary>,
      <AccordionDetails style={{ display: "block" }}>
        <Autocomplete
          multiple
          id="tags-select"
          aria-label="Filter tags"
          onChange={(event: any, newValue: Tag[] | null) => {
            if (newValue) setTags(newValue);
          }}
          filterSelectedOptions
          getOptionSelected={(option, value) => option.id === value.id}
          getOptionLabel={(option) => option.name}
          options={allTags}
          value={tags}
          loading={tagsLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Selected tags"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </AccordionDetails>,
    ],
    [
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Typography>Date</Typography>
      </AccordionSummary>,
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justifyContent="space-around">
          <KeyboardDatePicker
            style={{ marginLeft: 30, marginRight: 30 }}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            disableFuture={true}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setStartDate(null)}>
                  <ClearIcon />
                </IconButton>
              ),
            }}
            InputAdornmentProps={{
              position: "start",
            }}
            label="Start date"
            value={startDate}
            maxDate={endDate ? endDate : new Date()}
            onChange={handleStartDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            style={{ marginLeft: 30, marginRight: 30 }}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            disableFuture={true}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setEndDate(null)}>
                  <ClearIcon />
                </IconButton>
              ),
            }}
            InputAdornmentProps={{
              position: "start",
            }}
            minDate={startDate ? startDate : new Date("1900-01-01")}
            label="End date"
            value={endDate}
            onChange={handleEndDateChange}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>,
    ],
    [
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
      >
        <Typography>Political Alignment</Typography>
      </AccordionSummary>,
      <AccordionDetails style={{ display: "block" }}>
        <FormControl component="fieldset">
          <FormGroup>
            {politicalFilterState.map((type, i) => (
              <FormControlLabel
                key={i}
                control={
                  <Checkbox
                    checked={type.checked}
                    onChange={(e) => {
                      handlePoliticalFilterChange(e, i);
                    }}
                  />
                }
                label={type.label}
              />
            ))}
          </FormGroup>
        </FormControl>
        <Grid container style={{ marginTop: 20 }}>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              style={{ textTransform: "none", width: "90%" }}
              onClick={() => handleAllPoliticalFilterChange(false)}
            >
              Select None
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              style={{ textTransform: "none", width: "90%" }}
              onClick={() => handleAllPoliticalFilterChange(true)}
            >
              Select All
            </Button>
          </Grid>
        </Grid>
      </AccordionDetails>,
    ],
    source === DataSource.Twitter ? (
      [
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography>Ad Type</Typography>
        </AccordionSummary>,
        <AccordionDetails style={{ display: "block" }}>
          <FormControl component="fieldset">
            <FormGroup>
              {adTypeState.map((type, i) => (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      checked={type.checked}
                      onChange={(e) => {
                        handleAdTypeChange(e, i);
                      }}
                    />
                  }
                  label={type.label}
                />
              ))}
            </FormGroup>
          </FormControl>
        </AccordionDetails>,
      ]
    ) : (
      <div />
    ),
    source === DataSource.Twitter ? (
      [
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
        >
          <Typography>Political Region</Typography>
        </AccordionSummary>,
        <AccordionDetails style={{ display: "block" }}>
          <FormControl component="fieldset">
            <FormGroup>
              {botTypeState.map((type, i) => (
                <FormControlLabel
                  key={i}
                  control={
                    <Checkbox
                      checked={type.checked}
                      onChange={(e) => {
                        handleBotTypeChange(e, i);
                      }}
                    />
                  }
                  label={type.label}
                />
              ))}
            </FormGroup>
          </FormControl>
        </AccordionDetails>,
      ]
    ) : (
      <div />
    ),
  ];

  // Expanded state of each filter
  const [expanded, setExpanded] = useState<Array<boolean>>(
    new Array(createFilterItems().length).fill(false)
  );

  const handleAccordionChange = (panel: number) => {
    setExpanded((e) => {
      let a = [...e];
      a[panel] = !a[panel];
      return a;
    });
  };

  const FilterDrawer = () => (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={filterDrawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerToggle}>
          <ChevronRightIcon />
        </IconButton>
        <span>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Filters
          </Typography>
        </span>
      </div>
      <Divider style={{ marginBottom: 20 }} />

      {createFilterItems().map((i, k) => (
        <Accordion
          square
          key={k}
          expanded={expanded[k]}
          onChange={() => handleAccordionChange(k)}
          className={classes.accordion}
        >
          {i}
        </Accordion>
      ))}
    </Drawer>
  );

  return (
    <div id="main">
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: filterDrawerOpen,
        })}
      >
        <h1>Ads</h1>
        <Fade in={true}>
          <Grid
            container
            justifyContent="space-between"
            style={{ marginBottom: 15 }}
          >
            <Button
              color="secondary"
              variant={filterDrawerOpen ? "outlined" : "contained"}
              aria-label="open filters menu"
              onClick={handleDrawerToggle}
            >
              <FilterListIcon />
              Filters
            </Button>
            <div
              style={{
                display: "inline-flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TextField
                label="Page #"
                size="small"
                style={{ width: 120 }}
                variant="outlined"
                onKeyDown={enterKeyDown}
                error={errorBooleanForInput}
                helperText={errorMessage}
              />
              <Pagination
                count={pageNumber}
                page={page}
                onChange={handleChange}
                size="large"
              />
            </div>
          </Grid>
        </Fade>
        {loading ? (
          <LoadSkeleton />
        ) : ads.length === 0 ? (
          <div>No results found</div>
        ) : (
          ads.map((data, i) => {
            return adSource === DataSource.Google ? (
              <GoogleAdCard
                ad={data as GoogleAd}
                allTags={allTags}
                onNewTagCreated={handleOnNewTagCreated}
                key={i}
              />
            ) : (
              <TwitterAdCard
                ad={data as TwitterAd}
                allTags={allTags}
                onNewTagCreated={handleOnNewTagCreated}
                key={i}
              />
            );
          })
        )}
      </div>
      <FilterDrawer />
    </div>
  );
};

export default Ads;
