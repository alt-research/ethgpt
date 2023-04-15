import { Components, Theme } from '@mui/material';

type Theme_ = Omit<Theme, 'components'>;

export type ComponentStyle<T extends keyof Components<Theme_>> = Components<Theme_>[T];

export interface GetComponentStyleFunc<T extends keyof Components<Theme_>> {
  (colors: Colors): ComponentStyle<T>;
}

type Color = Exclude<React.CSSProperties['color'], undefined>;

export type Colors = {};

declare module '@mui/material/styles' {
  interface Theme {
    colors: Colors;
  }
  interface ThemeOptions {
    colors: Colors;
  }
}
