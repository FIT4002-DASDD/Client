import React, { useContext, useEffect } from "react";
import { baseApi } from "../api/api";
import { DataContext } from "../App";
import BotsTable from "../components/BotsTable";
const Bots = () => {
  const dataSourceContext = useContext(DataContext);
  const source = dataSourceContext.dataSource;
  const [bots, setBots] = React.useState<GoogleBot[] | TwitterBot[]>([]);

  useEffect(() => {
    baseApi.get(`/${source}/bots`).then((res) => {
      setBots(res.data);
    });
  }, [source]);
  
  return (
    <div id='main'>
      <h1>Bots</h1>
      <BotsTable bots={bots} source={source}/>
    </div>
  );
};

export default Bots;
