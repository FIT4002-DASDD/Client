/**
 * Bots.tsx
 * Bots page
 * @author Xi Zhang
 * @updated 2021-11-18
 */

import React, { useContext, useEffect } from "react";
import { baseApi } from "../api/api";
import { DataContext } from "../App";
import BotsTable from "../components/BotsTable";

const Bots = () => {
  // Current data source
  const source = useContext(DataContext).dataSource;
  // State for all bots in current data source
  const [bots, setBots] = React.useState<GoogleBot[] | TwitterBot[]>([]);

  // Retrieve bots
  useEffect(() => {
    baseApi.get(`/${source}/bots`).then((res) => {
      setBots(res.data);
    });
  }, [source]);

  return (
    <div id="main">
      <h1>Bots</h1>
      <BotsTable bots={bots} source={source} />
    </div>
  );
};

export default Bots;
