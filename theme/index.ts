import { createTheme } from '@mui/material';
import { fontCss } from './font';

import { muiButton } from './MuiButton';
import { muiInput } from './MuiInput';
import { muiLink } from './MuiLink';
import { muiOutlinedInput } from './MuiOutlinedInput';
import { muiSelect } from './MuiSelect';
import { muiSvgIcon } from './MuiSvgIcon';
import { muiTextField } from './MuiTextField';
import { muiTypography } from './MuiTypography';
import { Colors } from './types';

const colors: Colors = {};

export const theme = createTheme({
  colors,
  palette: {},
  components: {
    MuiInput: muiInput(colors),
    MuiSelect: muiSelect(colors),
    MuiButton: muiButton(colors),
    MuiTextField: muiTextField(colors),
    MuiOutlinedInput: muiOutlinedInput(colors),
    MuiLink: muiLink(colors),
    MuiTypography: muiTypography(colors),
    MuiSvgIcon: muiSvgIcon(colors),
    MuiCssBaseline: {
      styleOverrides: fontCss,
    },
  },
});
