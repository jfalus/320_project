import { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineInbox,
  AiOutlineStar,
  AiFillCheckCircle,
} from "react-icons/ai";
import { RiDraftFill } from "react-icons/ri";
import { FaHourglassHalf } from "react-icons/fa";
import {
  Menu,
  MenuItem,
  ProSidebar,
  SidebarHeader,
  SubMenu,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
const SideNavigation = () => {
  const [collapsed, setCollapsed] = useState(false);
  const styles = {
    sideBarHeight: {
      height: "100vh",
    },
    menuIcon: {
      float: "right",
      margin: "5px",
    },
  };
  const onClickMenuIcon = () => {
    setCollapsed(!collapsed);
  };
  return (
    <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>
      <SidebarHeader>
        <div style={styles.menuIcon} onClick={onClickMenuIcon}>
          <AiOutlineMenu />
        </div>
      </SidebarHeader>
      <Menu iconShape="square">
        <MenuItem icon={<AiOutlineInbox />}>Inbox</MenuItem>
        <MenuItem icon={<AiOutlineStar />}>Starred</MenuItem>
        <MenuItem icon={<RiDraftFill />}>To-do</MenuItem>
        <MenuItem icon={<FaHourglassHalf />}>In Progress</MenuItem>
        <MenuItem icon={<AiFillCheckCircle />}>Completed</MenuItem>
      </Menu>
    </ProSidebar>
  );
};
export default SideNavigation;
