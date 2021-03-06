/**
 * TwitterAdCard.tsx
 * An individual 'card' displayed for each ad on the Ad page (Ad.tsx) (For Twitter Ads)
 * @author Andy Zhan
 * @updated 2021-11-18
 */

import {
  Button,
  Card,
  CardActionArea,
  Grid,
  Typography,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdChip from "../AdChip";
import TwitterBotDetails from "./TwitterBotDetails";
import ImageDialog from "../ImageDialog";
import "../styles/AdCard.css";
import { validateLinkPrefix } from "../../helpers/processLink";
import politicalRanking from "../../helpers/politicalRankings";

type TwitterAdCardProp = {
  /**
   * The ad to display the card for
   */
  ad: TwitterAd;
  /**
   * A list of all tags in the system
   */
  allTags: Tag[];
  /**
   * A callback function to handle creating a new tag
   */
  onNewTagCreated?: () => void;
};

/**
 * An individual 'card' displayed for each ad on the Ad page (Ad.tsx) (For Twitter Ads)
 */
const TwitterAdCard = (props: TwitterAdCardProp) => {
  const { ad, allTags, onNewTagCreated } = props;
  /**
   * The state (open/closed) of the image (screenshot) popup dialog
   */
  const [open, setOpen] = useState(false);

  /**
   * Bot to show details for
   */
  const [detailsBot, setDetailsBot] =
    React.useState<TwitterBotWithSeenInstances | null>(null);

  /**
   * List of bots as unique instances (duplicates are combined)
   */
  const [uniqueBots, setUniqueBots] = React.useState<
    Array<TwitterBotWithSeenInstances>
  >([]);

  // Convert seenInstances of Ads into a list of bots with their respective seenInstances
  useEffect(() => {
    let a: Array<TwitterBotWithSeenInstances> = [];
    ad.seenInstances.forEach((i) => {
      const idx = a.findIndex((e) => e.id === i.bot.id);
      if (idx === -1) {
        const newBot = Object.assign(i.bot, {
          createdAt: [i.createdAt],
        });
        a.push(newBot);
      } else {
        a[idx].createdAt.push(i.createdAt);
      }
    });
    a.forEach((b) => b.createdAt.sort((a, b) => moment(a).diff(moment(b))));
    setUniqueBots(a);
  }, [ad.seenInstances]);

  /**
   * Opens the image dialog
   */
  const handleClickOpen = () => {
    setOpen(true);
  };
  /**
   * Closes the image dialog
   */
  const handleClose = () => {
    setOpen(false);
  };
  /**
   * Closes the details dialog
   */
  const handleCloseDetails = () => {
    setDetailsBot(null);
  };
  return (
    <Card className="cardStyle">
      <Grid container className="overallContainerStyle">
        <Grid
          item
          xs={4}
          style={{
            background: "#f7f7f7",
          }}
        >
          {ad.image ? (
            <CardActionArea
              style={{ display: "flex", justifyContent: "center" }}
              className="cardActionAreaStyle"
              onClick={() => {
                handleClickOpen();
              }}
            >
              <img className="imageStyle" src={ad.image} alt="Ad screenshot" />
            </CardActionArea>
          ) : (
            <Typography style={{ fontStyle: "italic", color: "#8d8d8d" }}>
              <span
                style={{
                  border: "1px dashed #c9c9c9",
                  padding: "5px 18px 5px 15px",
                  borderRadius: 5,
                }}
              >
                No screenshot scraped
              </span>
            </Typography>
          )}
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            style={{ height: "100%", marginLeft: 15, width: "auto" }}
          >
            <Grid
              container
              item
              direction="row"
              className="adLinkContainerStyle"
              xs={12}
            >
              <Grid item xs={6}>
                <div>
                  {ad.content && (
                    <div className="content" style={{ overflow: "hidden" }}>
                      {ad.content}
                    </div>
                  )}
                  <div style={{ padding: "20px 0 10px 10px" }}>
                    {ad.tweetLink && (
                      <Tooltip title={<Typography>{ad.tweetLink}</Typography>}>
                        <Button
                          variant="outlined"
                          color="primary"
                          href={validateLinkPrefix(ad.tweetLink)}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            marginRight: 20,
                          }}
                        >
                          Tweet Link
                        </Button>
                      </Tooltip>
                    )}
                    {ad.officialLink && (
                      <Tooltip
                        title={<Typography>{ad.officialLink}</Typography>}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          href={validateLinkPrefix(ad.officialLink)}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            marginRight: 20,
                          }}
                        >
                          Ad Link
                        </Button>
                      </Tooltip>
                    )}
                  </div>
                </div>
              </Grid>
              <Grid item xs={6}>
                <Typography style={{ marginTop: 5 }}>
                  <span style={{ fontWeight: "bold" }}>Last seen: </span>
                  {moment
                    .max(...ad.seenInstances.map((i) => moment(i.createdAt)))
                    .format("YYYY-MMM-D h:mma")}
                </Typography>

                <Typography style={{ marginTop: 5 }}>
                  <span style={{ fontWeight: "bold" }}>Seen count: </span>
                  {ad.seenInstances.length}
                </Typography>

                <div style={{ display: "flex" }}>
                  <div style={{ flexShrink: 0, paddingRight: 8 }}>
                    <Typography style={{ marginTop: 5 }}>
                      <span style={{ fontWeight: "bold" }}>Seen bots: </span>
                    </Typography>
                  </div>
                  <div>
                    {uniqueBots.map((bot, i) => {
                      return (
                        <Tooltip
                          key={i}
                          title={
                            <>
                              <Typography>
                                Political ranking:{" "}
                                {politicalRanking[bot.politicalRanking]}
                              </Typography>
                            </>
                          }
                        >
                          <Button
                            variant="contained"
                            style={{
                              background: "#167070",
                              padding: "2px 10px",
                              margin: "8px 10px 0 0",
                            }}
                            onClick={() => {
                              setDetailsBot(bot);
                            }}
                          >
                            <Typography
                              style={{
                                color: "#fff",
                                fontSize: 14,
                                textTransform: "none",
                              }}
                            >
                              {bot.username}
                            </Typography>
                          </Button>
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Grid container style={{ marginTop: 5 }}>
                    <Grid item>
                      <Typography style={{ fontWeight: "bold" }}>
                        Promoter handle:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography style={{ marginLeft: 10 }}>
                        {ad.promoterHandle}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              className="tag-box"
              style={{ margin: "20px 10px 10px 10px" }}
            >
              <div>
                <AdChip
                  ad={ad}
                  allTags={allTags}
                  onNewTagCreated={onNewTagCreated}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ImageDialog image={ad.image} open={open} handleClose={handleClose} />
      <TwitterBotDetails
        bot={detailsBot as TwitterBot}
        handleClose={handleCloseDetails}
        seenTimes={detailsBot?.createdAt}
      />
    </Card>
  );
};

export default TwitterAdCard;
