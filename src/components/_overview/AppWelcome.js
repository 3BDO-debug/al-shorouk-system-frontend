import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent } from '@mui/material';
import { SeoIllustration } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  displayName: PropTypes.string
};

export default function AppWelcome({ displayName }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800'
        }}
      >
        <Typography gutterBottom variant="h4">
          مرحبا مجددا
          <br /> {!displayName ? '...' : displayName}
        </Typography>

        <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
          سيشغل عملك جزءا كبيرا من حياتك والطريقة الوحيدة لتحقيق الرضى الحقيقي هو القيام بما تؤمن به انه عمل رائع. وأفضل
          طريقة لتقوم بعمل رائع هي ان تحب ما تقوم به. اذا لم تجد ذلك بعد، فاستمر في البحث. لا تسقط.
        </Typography>
      </CardContent>

      <SeoIllustration
        sx={{
          p: 3,
          width: 360,
          margin: { xs: 'auto', md: 'inherit' }
        }}
      />
    </RootStyle>
  );
}
