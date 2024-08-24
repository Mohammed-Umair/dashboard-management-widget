import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import AccountCircle from "@mui/icons-material/AccountCircle";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CommonSeparator from "./breadcrumbs";
import SearchInput from "./SearchInput";

export default function CommonHeader({ searchQuery, setSearchQuery}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#FFF",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block", color: "black" },
            }}
          >
            <CommonSeparator />
          </Box>

          <SearchInput  searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <NotificationsActiveIcon
                sx={{
                  color: "gray",
                }}
              />
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle
                sx={{
                  color: "gray",
                }}
              />

              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                  display: { xs: "none", sm: "block" },
                  mr: 2,
                  color: "black",
                }}
              >
                &nbsp; User
              </Typography>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
