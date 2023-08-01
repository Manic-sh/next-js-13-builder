import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Builder } from '@builder.io/react';


export function BasicSelect(props) {

  console.log("🚀 ~ file: _app.tsx:14 ~ BasicSelect ~ props:", props);

  
  const [country, setCountry] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Country"
          onChange={handleChange}
        >
          {props.listOptions.map(option => {
              <MenuItem value={10}>{option.reviewText}</MenuItem>
          })}
    
        </Select>
      </FormControl>
    </Box>
  );
}


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

Builder.registerComponent(BasicSelect,{
  name: 'MUISelect',
  inputs: [
    // 'name' is the name of your prop
    {
      name: 'listOptions',
      type: 'list',
      defaultValue: [ 
            { optionText: 'hello' 
     }],
      subFields: [
	{
          name: 'optionText',
          type: 'string',
          defaultValue: '"Option 1"',
        },
      ],
    }
  ],
});