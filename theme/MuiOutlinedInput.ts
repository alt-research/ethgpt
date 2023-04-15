import { alpha } from '@mui/material';

import { Colors, GetComponentStyleFunc } from './types';

export const muiOutlinedInput: GetComponentStyleFunc<'MuiOutlinedInput'> = (colors: Colors) => {
  return {
    styleOverrides: {
      root: {},
    },
  };
};
