import { Colors, GetComponentStyleFunc } from './types';

export const muiSelect: GetComponentStyleFunc<'MuiSelect'> = (colors: Colors) => {
  return {
    styleOverrides: {
      'outlined': {
        border: '1px solid rgb(82,82,82)',
        height: '21px',
        padding: '12px',
      },
      'icon': {
        color: 'white'
      }
      //   height: '46px',
      // root: {
      // }
    },
  };
};
