import { configureStore, createSlice } from '@reduxjs/toolkit';
import dashboardData from './data/dashboardData.json';

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState: dashboardData,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) category.widgets.push(widget);
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find(cat => cat.id === categoryId);
      if (category) category.widgets = category.widgets.filter(widget => widget.id !== widgetId);
    },
  },
});

export const { addCategory, addWidget, removeWidget } = widgetsSlice.actions;

const store = configureStore({
  reducer: {
    widgets: widgetsSlice.reducer,
  },
});

export default store;
