import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import React from "react";
import politicalRanking from "../../helpers/politicalRankings";
import ListDialog from "../ListDialog";

interface TwitterBotDetailsProps {
  bot: TwitterBot | null;
  /**
   * Handles closing the bot details dialog
   */
  handleClose: () => void;
  /**
   * For when bot details are displayed from Ad; displays the times the Ad was seen by the bot
   */
  seenTimes?: Array<string>;
}

/**
 * Displays details for Twitter bots (used in the TwitterAdCard component)
 */
const TwitterBotDetails = (props: TwitterBotDetailsProps) => {
  const { bot, handleClose, seenTimes } = props;

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

  const displayTerms = (terms: string[], title: string) => {
    setTerms(terms);
    setTitle(title);
    setOpenTerms(true);
  };

  const handleCloseTerms = () => {
    setOpenTerms(false);
  };

  if (bot === null) {
    return <div />;
  }
  const ranking: string = politicalRanking[bot.politicalRanking];

  return (
    <div data-testid="twitter-bot-details">
      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={bot !== null}
        PaperProps={{ style: { width: 600 } }}
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
            {bot.username}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <List>
            <ListItem>
              <Grid container>
                <Grid item xs={7}>
                  <Typography>Political Alignment: </Typography>
                </Grid>
                <Grid item xs={5}>
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
                </Grid>
              </Grid>
            </ListItem>
            {seenTimes && (
              <ListItem>
                <Grid container>
                  <Grid item xs={7}>
                    <Typography>
                      {" "}
                      Seen this ad {seenTimes.length} time
                      {seenTimes.length !== 1 && "s"}, at:{" "}
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    {seenTimes.map((time, i) => (
                      <Typography key={i}>
                        {moment(time).format("YYYY-MMM-D h:mm:ssa")}
                      </Typography>
                    ))}
                  </Grid>
                </Grid>
              </ListItem>
            )}
            <ListItem>
              <Grid container style={{ display: "flex", alignItems: "center" }}>
                <Grid item xs={7}>
                  <Typography>Followed Accounts: </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      displayTerms(bot.followedAccounts, "Followed Accounts");
                    }}
                  >
                    View
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={7}>
                  <Typography>Relevant Tags: </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      displayTerms(bot.relevantTags, "Relevant Tags");
                    }}
                  >
                    View
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={7}>
                  <Typography> Political Region: </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography>
                    {bot.type.charAt(0).toUpperCase() + bot.type.slice(1)}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container>
                <Grid item xs={7}>
                  <Typography> Age: </Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography>{moment().diff(bot.dob, "years")}</Typography>
                </Grid>
              </Grid>
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
    </div>
  );
};

export default TwitterBotDetails;
