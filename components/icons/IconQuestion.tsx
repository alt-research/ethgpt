import { SvgIcon, SvgIconProps, useTheme } from '@mui/material';

export default function IconQuestion({ ...props }: SvgIconProps) {
  const theme = useTheme();

  return (
    <SvgIcon viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 9h8"></path>
      <path d="M8 13h6"></path>
      <path d="M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12z"></path>
    </SvgIcon>
  );
}
