import { Colors, GetComponentStyleFunc } from './types';

export const muiInput: GetComponentStyleFunc<'MuiInput'> = (colors: Colors) => {
  return {
    styleOverrides: {
      input: {
        borderBottom: '1px solid rgb(82,82,82)' 
      }
    }
  };
};
