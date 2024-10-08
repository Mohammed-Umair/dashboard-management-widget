import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchInput({ searchQuery, setSearchQuery }) {
  return (
    <Paper
    component="form"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, background: "#F0F5FA" }}
  >
    <IconButton sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search anything..."
      inputProps={{ 'aria-label': 'Search anything...' }}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  </Paper>
     
    
  );
}
