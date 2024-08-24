import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

import SubHeader from "../SubHeader/subHeader";
import AddWidgets from "./AddWidgets";

const Dashboard = ({ data, searchQuery }) => {
  const [categories, setCategories] = useState(data.categories);

  const handleAddWidget = (categoryId, widgets) => {
    console.log('Before Adding Widgets:', categories);

    setCategories(prevCategories => {
      const updatedCategories = prevCategories.map(category =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, ...widgets] }
          : category
      );

      console.log('After Adding Widgets:', updatedCategories);

      return updatedCategories;
    });
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter(
                widget => widget.id !== widgetId
              ),
            }
          : category
      )
    );
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));

  console.log('Filtered Categories:', filteredCategories);

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <SubHeader />
      <Grid container spacing={3} mt={2}>
        {filteredCategories.map(category => (
          <Grid item xs={12} key={category.id}>
            <Category
              category={category}
              onAddWidget={handleAddWidget}
              onRemoveWidget={handleRemoveWidget}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const Category = ({ category, onAddWidget, onRemoveWidget }) => (
  <Paper sx={{ p: 2 }}>
    <Typography variant="h6">{category.name}</Typography>
    <Grid container spacing={2}>
      {category.widgets.map(widget => (
        <Grid item xs={12} md={6} lg={4} key={widget.id}>
          <Widget
            widget={widget}
            onRemove={() => onRemoveWidget(category.id, widget.id)}
          />
        </Grid>
      ))}
      <Grid item xs={12} md={6} lg={4}>
        <AddWidget onAdd={(widget) => onAddWidget(category.id, widget)} />
      </Grid>
    </Grid>
  </Paper>
);

const Widget = ({ widget, onRemove }) => (
  <Paper elevation={1} sx={{ p: 2, position: "relative" }}>
    <Typography variant="h6">{widget.name}</Typography>
    <Typography variant="body2">{widget.content}</Typography>
    <IconButton
      sx={{ position: "absolute", top: 0, right: 0 }}
      onClick={onRemove}
    >
      <CloseIcon />
    </IconButton>
  </Paper>
);

const AddWidget = ({ onAdd }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setDrawerOpen(true)}
      >
        Add Widget
      </Button>
      <AddWidgets
        onAdd={onAdd}
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
      />
    </>
  );
};

export default Dashboard;
