import { Container, Grid } from "@mui/material";
import React, { useState } from "react";
import CommonHeader from "../../common/CommonHeader";
import Dashboard from "../Dashboard/Dashboard";
import initialData from "../../data/dashboardData.json";

const LandingPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Container maxWidth="xl">
      <Grid container>
        <CommonHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Grid>
      <Grid container>
        <Dashboard data={initialData} searchQuery={searchQuery} />
      </Grid>
    </Container>
  );
};

export default LandingPage;
