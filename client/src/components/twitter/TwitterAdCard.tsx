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
import SearchTerms from "../SearchTerms";
import "../styles/AdCard.css";
import { validateLinkPrefix } from "../../helpers/processLink";

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
  // /**
  //  * The state (open/closed) of the bot details popup dialog
  //  */
  // const [openDetails, setOpenDetails] = React.useState(false);
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

  const [detailsBot, setDetailsBot] =
    React.useState<TwitterBotWithSeenInstances | null>(null);

  const [uniqueBots, setUniqueBots] = React.useState<
    Array<TwitterBotWithSeenInstances>
  >([]);

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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDetails = () => {
    setDetailsBot(null);
  };
  const handleCloseTerms = () => {
    setOpenTerms(false);
  };
  // const displayTerms = (terms: string[], title: string) => {
  //   setTerms(terms);
  //   setTitle(title);
  //   setOpenTerms(true);
  // };

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
          <CardActionArea
            className="cardActionAreaStyle"
            onClick={() => {
              handleClickOpen();
            }}
          >
            <img className="imageStyle" src={ad.image} alt="Ad screenshot" />
          </CardActionArea>
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
                                Political ranking: {bot.politicalRanking}
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
        bot={detailsBot}
        handleClose={handleCloseDetails}
        //displayTerms={displayTerms}
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

export default TwitterAdCard;
