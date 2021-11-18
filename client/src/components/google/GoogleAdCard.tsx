/**
 * GoogleAdCard.tsx
 * An individual 'card' displayed for each ad on the Ad page (Ad.tsx) (For Google Ads)
 * @author Thev Wickramasinghe
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
import React, { useState } from "react";
import { extractDomain, validateLinkPrefix } from "../../helpers/processLink";
import AdChip from "../AdChip";
import ImageDialog from "../ImageDialog";
import "../styles/AdCard.css";
import GoogleBotDetails from "./GoogleBotDetails";
import politicalRanking from "../../helpers/politicalRankings";

type GoogleAdCardProp = {
  /**
   * The ad to display the card for
   */
  ad: GoogleAd;
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
 * An individual 'card' displayed for each ad on the Ad page (Ad.tsx) (For Google Ads)
 */
const GoogleAdCard = (props: GoogleAdCardProp) => {
  const { ad, allTags, onNewTagCreated } = props;
  /**
   * The state (open/closed) of the image (screenshot) popup dialog
   */
  const [open, setOpen] = useState(false);
  /**
   * The state (open/closed) of the bot details popup dialog
   */
  const [openDetails, setOpenDetails] = React.useState(false);

  /**
   * Open the image (screenshot) popup dialog
   */
  const handleClickOpen = () => {
    setOpen(true);
  };
  /**
   * Close the image (screenshot) popup dialog
   */
  const handleClose = () => {
    setOpen(false);
  };
  /**
   * Close the bot details popup dialog
   */
  const handleCloseDetails = () => {
    setOpenDetails(false);
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
              xs={12}
              direction="row"
              className="adLinkContainerStyle"
            >
              <Grid item xs={6}>
                {ad.adLink ? (
                  <div>
                    <Tooltip title={<Typography>{ad.adLink}</Typography>}>
                      <Button
                        variant="outlined"
                        color="primary"
                        href={validateLinkPrefix(ad.adLink)}
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
                  {moment(ad.createdAt).format("YYYY-MMM-D h:mma")}
                </Typography>
                <Tooltip
                  title={
                    <>
                      <Typography>
                        Political alignment:{" "}
                        {politicalRanking[ad.bot.politicalRanking]}
                      </Typography>
                      <Typography>
                        Other terms: {ad.bot.otherTermsCategory - 1}
                      </Typography>
                      <Typography>Gender: {ad.bot.gender}</Typography>
                      <Typography>
                        DOB: {moment(ad.bot.dob).format("YYYY-MMM-D")}
                      </Typography>
                    </>
                  }
                >
                  <Typography style={{ marginTop: 5 }}>
                    <span style={{ fontWeight: "bold" }}>Seen bot: </span>
                    <Button
                      variant="contained"
                      style={{
                        background: "#167070",
                        marginLeft: 10,
                        padding: 2,
                        paddingLeft: 10,
                        paddingRight: 10,
                        textTransform: "none",
                      }}
                      onClick={() => {
                        setOpenDetails(true);
                      }}
                    >
                      <Typography
                        style={{
                          color: "#fff",
                          fontSize: 14,
                        }}
                      >
                        {ad.bot.username}
                      </Typography>
                    </Button>
                  </Typography>
                </Tooltip>
                {ad.seenOn ? (
                  <div>
                    <Grid container style={{ marginTop: 5 }}>
                      <Grid item>
                        <Typography style={{ fontWeight: "bold" }}>
                          Seen on:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Tooltip title={<Typography>{ad.seenOn}</Typography>}>
                          <Button
                            variant="contained"
                            style={{
                              background: "#167070",
                              marginLeft: 10,
                              padding: 2,
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}
                            href={validateLinkPrefix(ad.seenOn)}
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
                              {extractDomain(ad.seenOn)}
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
      <GoogleBotDetails
        bot={openDetails ? ad.bot : null}
        handleClose={handleCloseDetails}
      />
    </Card>
  );
};

export default GoogleAdCard;
