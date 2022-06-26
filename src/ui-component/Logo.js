// material-ui
import { useTheme } from '@mui/material/styles';
import logo from '../assets/images/logo.jpg';
import { Typography } from '@mui/material';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = (props) => {
    const isAdmin = props.isAdmin;
    const theme = useTheme();
    return (
        <>
            <div style={{ display: 'flex' }}>
                <div>
                    <img src={logo} alt="idqbrn" width="32" height="40" />
                </div>
                <div style={{ marginLeft: '10px', marginTop: '5px' }}>
                    {isAdmin == true ? (
                        <Typography width="300px" color={theme.palette.secondary.main} gutterBottom variant="h2">
                            IDQBRN - Administrador
                        </Typography>
                    ) : (
                        <Typography color={theme.palette.secondary.main} gutterBottom variant="h2">
                            IDQBRN
                        </Typography>
                    )}
                </div>
            </div>
        </>
    );
};
export default Logo;
