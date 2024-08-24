import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Grid,
} from "@mui/material";
import React from "react";
import {
  Add as AddIcon,
  Close as CloseIcon,
  Autorenew as AutorenewIcon,
  AccessTimeFilled as AccessTimeFilledIcon,
  MoreVert as MoreIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
} from "@mui/icons-material";
const SubHeader = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant={"h6"}>
        CNAPP Dashboard
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button variant="contained" sx={buttonStyle}>
         <span style={{display:{xs:"none",sm:"flex"}}}>Add Widget
          </span>  <AddIcon />
        </Button>
        <Button variant="contained" sx={buttonStyle}>
          <AutorenewIcon />
        </Button>
        <Button variant="contained" sx={buttonStyle}>
          <MoreIcon />
        </Button>
        <Button variant="contained" sx={buttonStyle}>
          <AccessTimeFilledIcon sx={{ color: "darkblue" }} />
          <Divider
            orientation="vertical"
            flexItem
            sx={
              {
                // display:{xs:'none',sm:'flex'}
              }
            }
          />
          <span style={{ color: "blue" }}>Last 2 days</span>
          <KeyboardArrowDownIcon />
        </Button>
      </Box>
    </Box>
  
  );
};

export default SubHeader;

// Common style for buttons
const buttonStyle = {
  textTransform: "capitalize",
  color: "black",
  background: "white",
  "&:hover": {
    backgroundColor: "white",
  },
};
