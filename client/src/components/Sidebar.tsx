import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./styles/Sidebar.css";
import logo from "../images/logo.png";
import adsIcon from "../images/ads.png";
import botsIcon from "../images/bots.png";
import statisticsIcon from "../images/statistics.png";
import { Select, MenuItem } from "@material-ui/core";
import { DataContext } from "../App";
import { DataSource } from "../helpers/dataSourceEnum";
import { withStyles } from "@material-ui/core/styles";

const SidebarItems = [
  {
    name: "Ads",
    route: "/ads",
    icon: adsIcon,
  },
  {
    name: "Bots",
    route: "/bots",
    icon: botsIcon,
  },
  {
    name: "Statistics",
    route: "/statistics",
    icon: statisticsIcon,
  },
];

const StyledSelect = withStyles({
  select: {
    color: "#a4a6b3",
    backgroundColor: "#363740",
    fontSize: 20,
  },
})(Select);
/**
 * Sidebar menu
 */
const Sidebar = () => {
  const dataSourceContext = useContext(DataContext);

  return (
    <>
      <div className="sidebar">
        <div className="logoText">
          <img src={logo} alt="logo" className="logo"></img>
          <span>Ad Transparency</span>
        </div>
        <div className="sidebar-items">
          {SidebarItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.route}
              activeClassName={item.route === "/" ? "" : "active"}
              className="link"
            >
              <div className="sidebar-item" key={item.name}>
                <img
                  className="sidebarIcon"
                  src={item.icon}
                  alt={item.name}
                ></img>
                <span>{item.name}</span>
              </div>
            </NavLink>
          ))}
        </div>
        <div className="select-div">
          <div className="data-source-select-label">Data source:</div>
          <StyledSelect
            className="data-source-select"
            value={dataSourceContext.dataSource}
            onChange={(e) => {
              dataSourceContext.changeDataSource(e.target.value as DataSource);
            }}
            classes={{ select: "data-source-input" }}
            variant="outlined"
          >
            <MenuItem value={DataSource.Google}>Google</MenuItem>
            <MenuItem value={DataSource.Twitter}>Twitter</MenuItem>
          </StyledSelect>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
