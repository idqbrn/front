// material-ui
import { styled } from '@mui/material/styles';
import BackgroundImage from '../../../assets/images/login/dqbrn_background.jpg';
// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    minHeight: '100vh',
    backgroundImage: `url(${BackgroundImage})`,
    backgroundSize: 'cover'
}));

export default AuthWrapper1;
