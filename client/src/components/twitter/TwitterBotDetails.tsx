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
import otherSearchTerms from "../../helpers/otherSearchTerms";
import politicalRanking from "../../helpers/politicalRankings";
import politicalSearchTerms from "../../helpers/politicalSearchTerms";
import Geocode from "react-geocode";

interface TwitterBotDetailsProps {
  bot: TwitterBotWithSeenInstances | null;
  /**
   * Handles closing the bot details dialog
   */
  handleClose: () => void;
  /**
   * Displays search terms in a dialog
   */
  // displayTerms: (terms: string[], title: string) => void;
}

/**
 * Displays details for Twitter bots (used in the TwitterAdCard component)
 */
const TwitterBotDetails = (props: TwitterBotDetailsProps) => {
  const { bot, handleClose } = props;

  if (bot === null) {
    return <div />;
  }
  const ranking: string = politicalRanking[`${bot.politicalRanking}`];

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={bot !== null}
      maxWidth="md"
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
              <Grid item xs={4}>
                <Typography>Political Inclination: </Typography>
              </Grid>
              <Grid item xs={8}>
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
          <ListItem>
            <Grid container>
              <Grid item xs={4}>
                <Typography>
                  {" "}
                  Seen this ad {bot.createdAt.length} time
                  {bot.createdAt.length !== 1 && "s"}, at:{" "}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                {bot.createdAt.map((time) => (
                  <Typography>
                    {moment(time).format("YYYY-MMM-D h:mma")}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </ListItem>
          {/* <ListItem>
           <Grid container style={{ display: "flex", alignItems: "center" }}>
             <Grid item xs={7}>
               <Typography>Political Terms: </Typography>
             </Grid>
             <Grid item xs={5}>
               <Button
                 size="small"
                 variant="outlined"
                 onClick={() => {
                   props.displayTerms(
                     politicalSearchTerms[`${props.ranking}`],
                     "Politcal Search Terms"
                   );
                 }}
               >
                 View
               </Button>
             </Grid>
           </Grid>
         </ListItem> */}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default TwitterBotDetails;
