import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Tooltip } from '@mui/material';
// routes
import { PATH_AUTH } from '../routes/paths';
// layouts
import AuthLayout from '../layouts/AuthLayout';
// components
import Page from '../components/Page';
import { MHidden } from '../components/@material-extend';
import LoginForm from '../components/_auth-page/LoginForm';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 680,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

function Login() {
  return (
    <RootStyle title="Register | Minimal-UI">
      <AuthLayout>
        ليس لديك حساب
        <Link
          sx={{ margin: '5px' }}
          underline="none"
          variant="subtitle2"
          component={RouterLink}
          to={PATH_AUTH.register}
        >
          سجل الان
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            مرحبا, اهلا مجددا
          </Typography>
          <img alt="register" src="/static/illustrations/illustration_login.png" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                تسجيل الدخول
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>ادخل بياناتك</Typography>
            </Box>
            <Tooltip title={capitalCase('JWT')}>
              <Box component="img" src="/static/auth/ic_jwt.png" sx={{ width: 32, height: 32 }} />
            </Tooltip>
          </Box>

          <LoginForm />

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              ليس لديك حساب
              <Link sx={{ margin: '5px' }} to={PATH_AUTH.register} component={RouterLink}>
                سجل الان
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

export default Login;
