import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';
// components
import CodeHustleLogo from '../assets/codeHustle';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  /*   const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark; */

  return (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <CodeHustleLogo />
    </Box>
  );
}
