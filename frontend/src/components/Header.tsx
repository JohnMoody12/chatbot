import { AppBar, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import Logo from "./shared/Logo";

const Header = () => {
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo></Logo>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
