import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSearchQuery, setSearchQuery } from '@/redux/userSlice';

export default function CustomizedInputBase() {
  const [query,setQuery]=useState('');
  const router=useRouter();
  const dispatch=useDispatch();
  
  const handleSearchQuery=(e:any)=>{
   setQuery(e.target.value)
  }
  useEffect(() => {
    
  
    dispatch(setSearchQuery(query));
  }, [query])
  
  
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'Search' }}
        value={query}
        onChange={handleSearchQuery}
        onClick={()=> router.push('/products/search')}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={()=> router.push('/products/search')}>
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      
    </Paper>
  );
}