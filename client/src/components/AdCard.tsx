import {
  Button,
  Card,
  CardActionArea,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import React from "react";
import AdChip from "./AdChip";
import BotDetails from "./BotDetails";
import SearchTerms from "./SearchTerms";
import "./styles/AdCard.css";

const processLink = (link: string) => {
  if (link) {
    let link_split = link.split("/");
    let domain = link_split[2];
    if (domain) {
      let prefix = domain.split(".");
      if (prefix[0].toLowerCase() === "www") {
        prefix.shift();
      }
      domain = prefix.join(".");
    }

    return domain;
  }
};

interface ImageDialogProps {
  image: string;
  open: boolean;
  handleClose: () => void;
}

const ImageDialog = (props: ImageDialogProps) => {
  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="simple-dialog-title"
      open={props.open}
    >
      <DialogContent>
        <img
          style={{
            width: "auto",
            height: "100%",
          }}
          src={props.image}
          alt="Ad screenshot full"
        />
      </DialogContent>
    </Dialog>
  );
};

const AdCard = (props: Ad) => {
  const [open, setOpen] = React.useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);
  const [openTerms, setOpenTerms] = React.useState(false);

  const [terms, setTerms] = React.useState<string[]>([]);
  const [title, setTitle] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDetails = () => {
    setOpenDetails(false);
  };
  const handleCloseTerms = () => {
    setOpenTerms(false);
  };
  const displayTerms = (terms: string[], title: string) => {
    setTerms(terms);
    setTitle(title);
    setOpenTerms(true);
  };
  //const classes = useStyles();
  return (
    <Card className="cardStyle">
      <Grid container className="overallContainerStyle">
        <Grid
          item
          xs={4}
          style={{
            maxHeight: 350,
            background: "#f7f7f7",
          }}
        >
          <CardActionArea
            className="cardActionAreaStyle"
            onClick={() => {
              handleClickOpen();
            }}
          >
            <img className="imageStyle" src={props.image} alt="Ad screenshot" />
          </CardActionArea>
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            style={{ height: "100%", marginLeft: 15, width: "auto" }}
          >
            <Grid container direction="row" className="adLinkContainerStyle">
              <Grid item xs={6}>
                {props.headline ? (
                  <div>
                    <Tooltip
                      title={
                        <Typography>{`https://${props.headline}`}</Typography>
                      }
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        href={`https://${props.headline} `}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit Ad Link
                      </Button>
                    </Tooltip>
                  </div>
                ) : (
                  <Typography style={{ fontSize: 18, fontWeight: 600 }}>
                    No Link Available
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography style={{ marginTop: 5 }}>
                  <span style={{ fontWeight: "bold" }}>Date: </span>
                  {moment(props.createdAt).format("YYYY-MMM-D dddd h:mma")}
                </Typography>

                <Typography style={{ marginTop: 5 }}>
                  <span style={{ fontWeight: "bold" }}>Seen bot: </span>
                  <Button
                    onClick={() => {
                      setOpenDetails(true);
                    }}
                  >
                    {props.bot.username}
                  </Button>
                </Typography>

                {props.seenOn ? (
                  <div>
                    <Grid container style={{ marginTop: 5 }}>
                      <Grid item>
                        <Typography style={{ fontWeight: "bold" }}>
                          Seen on:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Tooltip
                          title={<Typography>{props.seenOn}</Typography>}
                        >
                          <Button
                            variant="contained"
                            style={{
                              background: "#167070",
                              marginLeft: 10,
                              padding: 2,
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}
                            href={props.seenOn}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Typography
                              style={{
                                color: "#fff",
                                textTransform: "lowercase",
                                fontSize: 14,
                              }}
                            >
                              {processLink(props.seenOn)}
                            </Typography>
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </div>
                ) : (
                  <div>
                    <Grid container style={{ marginTop: 5 }}>
                      <Grid item>
                        <Typography style={{ fontWeight: "bold" }}>
                          Seen on:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography style={{ marginLeft: 10 }}>
                          No Link
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </Grid>
            </Grid>
            <Grid container direction="row" style={{ height: "58%" }}>
              <Grid
                item
                xs={12}
                style={{
                  border: "1px solid #b2b2b2",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <div>{<AdChip {...props} />}</div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ImageDialog image={props.image} open={open} handleClose={handleClose} />
      <BotDetails
        name={props.bot.fName + " " + props.bot.lName}
        ranking={props.bot.politicalRanking}
        other={props.bot.otherTermsCategory}
        gender={props.bot.gender}
        dob={props.bot.dob}
        long={props.bot.locLong}
        lat={props.bot.locLat}
        open={openDetails}
        handleClose={handleCloseDetails}
        displayTerms={displayTerms}
      />
      <SearchTerms
        open={openTerms}
        handleClose={handleCloseTerms}
        terms={terms}
        title={title}
      />
    </Card>
  );
};

// const AdCard: React.FC<Ad> = (props) => {
//     const classes = useStyles();
//     return (
//       <div className={classes.root}>
//         <Paper elevation={3}>
//             <div className="overallDivStyle">
//               <section className="imageSection">
//                 <img className="imageStyle" src={props.file} alt="Ad screenshot"/>
//               </section>
//               <section className="mainSection">
//                 <div className="headlineDiv">
//                   <a className="headlineStyle" href={props.headline}>{props.headline}</a>
//                 </div>
//               </section>
//               <section className="sideSection">
//                 <p className="dateStyle"> Date: {moment(props.dateTime).format("YYYY-MMM-D dddd h:mma")} </p>
//                 <p className="botStyle">Seen bot: {props.bot}</p>
//                 <p className="seenOnStlye">Seen on: <a href={props.seenOn}>{props.seenOn}</a></p>
//               </section>
//               <section className="categorySection">
//                 <div className="cardStyle">
//                   <AdChip {...props}/>
//                 </div>
//               </section>
//                 <div>

//                 </div>
//                 {/* <div className="middleBlock">
//                   <p className="botStyle">Bot: {props.bot}</p>
//                   <a className="headlineStyle" href={props.headline}>{props.headline}</a>
//                 </div>
//                 <div>
//                   <p className="dateStyle"> Date: {moment(props.dateTime).format("YYYY-MMM-D dddd h:mma")} </p>
//                   <p className="seenOnStlye">Seen on: <a href={props.seenOn}>{props.seenOn}</a></p>
//                 </div>

//                 <div className="AdChipStyle">
//                   <AdChip {...props}/>
//                 </div> */}
//             </div>
//         </Paper>
//       </div>
//     );
//   }

export default AdCard;