import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
  Button,
  Typography,
  Drawer,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import widgetData from "../../data/dashboardData.json";

const AddWidgets = ({ onAdd, drawerOpen, setDrawerOpen }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedWidgets, setSelectedWidgets] = useState(
    widgetData.categories.reduce((acc, category) => {
      acc[category.id] = [];
      return acc;
    }, {})
  );
  const [widgetNames, setWidgetNames] = useState(
    widgetData.categories.reduce((acc, category) => {
      acc[category.id] = {};
      return acc;
    }, {})
  );

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCheckboxChange = (categoryId, widgetId) => {
    setSelectedWidgets(prevSelected => {
      const isSelected = prevSelected[categoryId].includes(widgetId);
      return {
        ...prevSelected,
        [categoryId]: isSelected
          ? prevSelected[categoryId].filter(id => id !== widgetId)
          : [...prevSelected[categoryId], widgetId],
      };
    });
  };

  const handleWidgetNameChange = (categoryId, widgetId, newName) => {
    setWidgetNames(prevNames => ({
      ...prevNames,
      [categoryId]: {
        ...prevNames[categoryId],
        [widgetId]: newName,
      },
    }));
  };

  const renderWidgets = (categoryId) => {
    const category = widgetData.categories.find(cat => cat.id === categoryId);
    return category.widgets.map(widget => (
      <Box sx={{ display: "flex" }} key={widget.id}>
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedWidgets[categoryId]?.includes(widget.id) || false}
              onChange={() => handleCheckboxChange(categoryId, widget.id)}
            />
          }
        />
        <TextField
          label="Widget Name"
          fullWidth
          value={widgetNames[categoryId]?.[widget.id] || widget.name}
          onChange={(e) => handleWidgetNameChange(categoryId, widget.id, e.target.value)}
          sx={{ mb: 2 }}
        />
      </Box>
    ));
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleConfirm = () => {
    const newWidgets = [];

    Object.entries(selectedWidgets).forEach(([categoryId, widgetIds]) => {
      const category = widgetData.categories.find(cat => cat.id === categoryId);

      widgetIds.forEach(widgetId => {
        const widget = category.widgets.find(w => w.id === widgetId);
        const widgetName = widgetNames[categoryId]?.[widget.id] || widget.name;

        if (widgetName.trim()) {
          newWidgets.push({ ...widget, name: widgetName });
        }
      });
    });

    console.log('New Widgets to be Added:', newWidgets);

    if (newWidgets.length) {
      onAdd(newWidgets);
    }

    handleDrawerClose();
  };

  return (
    <Drawer anchor="right" open={drawerOpen}>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">Add Widgets</Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" gutterBottom color="gray">
          Personalize your dashboard by adding the following widget
        </Typography>
        <Tabs value={activeTab} onChange={handleTabChange}>
          {widgetData.categories.map(category => (
            <Tab key={category.id} label={category.name.substring(0, 4)} />
          ))}
        </Tabs>
        <Box sx={{ mt: 2 }}>
          {widgetData.categories.map(
            category =>
              activeTab === widgetData.categories.indexOf(category) && (
                <Box key={category.id}>{renderWidgets(category.id)}</Box>
              )
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={handleDrawerClose}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default AddWidgets;
