import { Box, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState, useContext } from "react";
import "react-calendar/dist/Calendar.css";
import {
  getAdCategoryStats,
  getAdCountStats,
  getAdStats,
  getBotAlignmentStats,
  getCategoryBotStats,
} from "../api/api";
import AdCountLineChart from "../components/AdCountLineChart";
import BotAlignmentPieChart from "../components/BotAlignmentPieChart";
import CategoryTreeMapChart from "../components/CategoryTreeMapChart";
import CategoryBotStatsChart from "../components/CategoryBotStatsChart";
import MonthPicker from "../components/MonthPicker";
import { DataContext } from "../App";
import { DataSource } from "../helpers/dataSourceEnum";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Statistics = () => {
  const dataSourceContext = useContext(DataContext);
  const source = dataSourceContext.dataSource;

  const classes = useStyles();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [botPoliticalAlignmentData, setBotPoliticalAlignmentData] = useState<
    any[]
  >([]);
  /**
   * State to store data for bot gender pie chart
   */
  const [botGenderAlignmentData, setBotGenderAlignmentData] = useState<any[]>(
    []
  );
  /**
   * State to store data for CategoryMapTreeChart
   */
  const [adCategoryData, setAdCategoryData] = useState<any[]>([]);
  /**
   * State to store data for CategoryBotStatsChart
   */
  const [categoryBotData, setCategoryBotData] = useState<any[]>([]);
  /**
   * State to store ad count data for AdCountLineChart
   */
  const [adCountData, setAdCountData] = useState<any[]>([]);
  /**
   * State to store ad stat dta for AdCountLineChart
   */
  const [adStatData, setAdStatData] = useState<any[]>([]);

  useEffect(() => {
    getBotAlignmentStats(source).then((res) => {
      if (!res || res.length === 0) {
        setBotPoliticalAlignmentData([]);
        setBotGenderAlignmentData([]);
        return;
      }
      for (const e of res) {
        const data = e.data.map((element: any) => ({
          count: parseFloat(element.count),
          label: element.label,
        }));
        // TODO: type checking and avoid hard-coded values?
        console.log(e.type);
        switch (e.type) {
          case "political ranking":
            // console.log(data);
            setBotPoliticalAlignmentData(data);
            break;

          case "gender":
            setBotGenderAlignmentData(data);
            break;

          default:
            break;
        }
      }
    });

    getAdCategoryStats(source).then((res) => {
      if (!res) {
        setAdCategoryData([]);
        return;
      }
      const data = res.map((element: any) => ({
        count: parseFloat(element.count),
        label: element.label,
      }));
      setAdCategoryData(data);
    });

    getAdStats(source).then((res) => {
      if (!res) return;
      const data =
        source === DataSource.Google
          ? [
              {
                header: "Total",
                content: res.adTotal,
              },
              {
                header: "Tagged",
                content: res.adTagged,
              },
              {
                header: "Average ads per bot",
                content: res.adPerBot ?? "N/A",
              },
              {
                header: "Total scraping uptime",
                content: res.uptime ? res.uptime : "N/A",
              },
            ]
          : [
              {
                header: "Unique ads scraped",
                content: res.adUniqueCount,
              },
              {
                header: "Total ad encounters",
                content: res.adSeenCount,
              },
              {
                header: "Tagged",
                content: res.adTagged ?? "N/A",
              },
              {
                header: "Average unique ads per bot",
                content: res.adUniquePerBot,
              },
              {
                header: "Average seen ads per bot",
                content: res.adSeenPerBot,
              },
            ];

      setAdStatData(data);
    });

    getCategoryBotStats(source).then((res) => {
      if (!res) {
        setCategoryBotData([]);
        return;
      }
      const data = res.map((element: any) => ({
        avgGender: parseFloat(element.avgGender),
        avgPolitical: parseFloat(element.avgPolitical),
        label: element.label,
      }));
      setCategoryBotData(data);
    });
  }, [source]);

  useEffect(() => {
    getAdCountStats(source, selectedMonth.getTime()).then((res) => {
      if (!res) return;
      const data = res.map((element: any) => ({
        count: parseFloat(element.count),
        date: new Date(element.date).getTime(),
      }));

      setAdCountData(data);
    });
  }, [selectedMonth, source]);

  const onClickMonth = (value: Date) => {
    console.log(value);
    setSelectedMonth(value);
  };
  const botPieChart1 = (
    <Paper className={classes.paper}>
      <BotAlignmentPieChart
        data={botPoliticalAlignmentData}
        title="Bot alignment by political beliefs"
      />
    </Paper>
  );

  const botPieChart2 = (
    <Paper className={classes.paper}>
      <BotAlignmentPieChart
        data={botGenderAlignmentData}
        title="Bot alignment by gender"
      />
    </Paper>
  );

  const categoryChart = (
    <Paper className={classes.paper}>
      <CategoryTreeMapChart data={adCategoryData} />
    </Paper>
  );

  const categoryBotChart = (
    <Paper className={classes.paper}>
      <CategoryBotStatsChart data={categoryBotData} />
    </Paper>
  );

  const adsScrapedChart = (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper className={classes.paper} elevation={0}>
            <Box display="flex" justifyContent="flex-end" m={1} p={1}>
              <Box p={1}>
                <MonthPicker onClickMonth={onClickMonth} date={selectedMonth} />
              </Box>
            </Box>
            <AdCountLineChart data={adCountData} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          {adStatData.map((e, i) => (
            <Box p={1} key={i}>
              <AdStatRow header={e.header} content={e.content} />
            </Box>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );

  console.log(adStatData);

  return (
    <div id="main">
      <h1>Statistics</h1>
      <Grid container spacing={3}>
        {source === DataSource.Google ? (
          <>
            <Grid item xs={3}>
              {botPieChart1}
            </Grid>
            <Grid item xs={3}>
              {botPieChart2}
            </Grid>
          </>
        ) : (
          <Grid item xs={6}>
            {botPieChart1}
          </Grid>
        )}
        <Grid item xs={6}>
          {categoryChart}
        </Grid>
        <Grid item xs={12}>
          {adsScrapedChart}
        </Grid>
        {source === DataSource.Google && (
          <Grid item xs={8}>
            {categoryBotChart}
          </Grid>
        )}
      </Grid>
    </div>
  );
};

type AdStatRowProp = {
  header: string;
  content: string | number;
};
const AdStatRow = (props: AdStatRowProp) => {
  return (
    <>
      <Paper elevation={0} style={{ borderBottom: "1px solid lightgray" }}>
        <Typography variant="h6">{props.header}</Typography>
        <Typography variant="h4">
          {typeof props.content === "number"
            ? Math.floor(props.content)
            : props.content}
        </Typography>
      </Paper>
    </>
  );
};

export default Statistics;
