/**
 * AdCardSkeleton.tsx
 * A loading skeleton placeholder for AdCard components
 * @author Andy Zhan
 * @updated 2021-11-18
 */

import { Card, Grid } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import React from "react";
import "./styles/AdCard.css";

/**
 * A loading skeleton placeholder for AdCard components
 */
const AdCardSkeleton = () => {
  return (
    <Card style={{ height: 350, marginBottom: 20, padding: 15 }}>
      <Grid container style={{ height: "100%" }}>
        <Grid
          item
          xs={4}
          style={{
            maxHeight: 350,
            background: "#f7f7f7",
          }}
        >
          <Skeleton variant="rect" height={"100%"} />
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            style={{ height: "100%", marginLeft: 15, width: "auto" }}
          >
            <Grid container direction="row" style={{ height: "42%" }}>
              <Grid item xs={6}>
                <Skeleton variant="text" />
              </Grid>
              <Grid item xs={6}>
                <Skeleton variant="text" />
                <Skeleton variant="text" />
                <Skeleton variant="text" />
              </Grid>
            </Grid>
            <Skeleton variant="rect" width={"100%"} height="57%" />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};
export default AdCardSkeleton;
