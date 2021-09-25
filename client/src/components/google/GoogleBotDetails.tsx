import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import { Map, Marker } from "pigeon-maps";
import React from "react";
import otherSearchTerms from "../../helpers/otherSearchTerms";
import politicalRanking from "../../helpers/politicalRankings";
import politicalSearchTerms from "../../helpers/politicalSearchTerms";
import ListDialog from "../ListDialog";

interface GoogleBotDetailsProps {
  /**
   * The bot to display details for
   */
  bot: GoogleBot | null;
  /**
   * Handles closing the bot details dialog
   */
  handleClose: () => void;
}

/**
 * Displays details for Google bots (used in the GoogleAdCard component)
 */
const GoogleBotDetails = (props: GoogleBotDetailsProps) => {
  const { bot, handleClose } = props;
  //const [location, setLocation] = React.useState("");

  /**
   * The state (open/closed) of the bot search terms popup dialog
   */
  const [openTerms, setOpenTerms] = React.useState(false);
  /**
   * State for initialising search terms
   */
  const [terms, setTerms] = React.useState<string[]>([]);
  /**
   * State for initialising the title for search terms
   */
  const [title, setTitle] = React.useState("");

  const handleCloseTerms = () => {
    setOpenTerms(false);
  };

  if (!bot) {
    return <div />;
  }

  let ranking: string = politicalRanking[bot.politicalRanking];

  const displayTerms = (terms: string[], title: string) => {
    setTerms(terms);
    setTitle(title);
    setOpenTerms(true);
  };

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={bot !== null}
        PaperProps={{ style: { width: 480 } }}
      >
        <DialogTitle
          id="simple-dialog-title"
          style={{
            borderBottom: "1px solid #b2b2b2",
          }}
        >
          <Typography
            align="center"
            style={{
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            {bot.fName + " " + bot.lName}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Political Alignment: </Typography>

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
            </ListItem>
            <ListItem
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Political Terms: </Typography>

              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  displayTerms(
                    politicalSearchTerms[`${bot.politicalRanking}`],
                    "Political Search Terms"
                  );
                }}
              >
                View
              </Button>
            </ListItem>
            <ListItem
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Other Terms: </Typography>

              <Button
                size="small"
                variant="outlined"
                onClick={() => {
                  displayTerms(
                    otherSearchTerms[`${bot.otherTermsCategory}`],
                    "Other Search Terms"
                  );
                }}
              >
                View
              </Button>
            </ListItem>
            <ListItem
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Gender: </Typography>

              <span>
                {bot.gender + " "}
                {bot.gender === "Female" ? (
                  <span style={{ fontSize: 17, color: "#e449ac" }}>
                    &#9792;
                  </span>
                ) : bot.gender === "Male" ? (
                  <span style={{ fontSize: 17, color: "#4968e4" }}>
                    &#9794;
                  </span>
                ) : (
                  <span style={{ fontSize: 17, color: "#fcb316" }}>
                    &#9673;
                  </span>
                )}
              </span>
            </ListItem>
            <ListItem
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography> Age: </Typography>
              <Typography>{moment().diff(bot.dob, "years")}</Typography>
            </ListItem>
            <ListItem
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <Typography> Location: </Typography>
              <div
                style={{
                  borderRadius: 12,
                  overflow: "hidden",
                  border: "1px solid lightgrey",
                }}
              >
                <Map
                  height={200}
                  width={240}
                  defaultCenter={[bot.locLat, bot.locLong]}
                  defaultZoom={7}
                >
                  <Marker width={30} anchor={[bot.locLat, bot.locLong]} />
                </Map>
              </div>
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
      <ListDialog
        open={openTerms}
        handleClose={handleCloseTerms}
        terms={terms}
        title={title}
      />
    </>
  );
};

export default GoogleBotDetails;
