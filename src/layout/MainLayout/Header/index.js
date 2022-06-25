// import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';

// assets
import { IconMap2, IconDashboard } from '@tabler/icons';
// import { IconMenu2 } from '@tabler/icons';

// route
import { useNavigate } from 'react-router-dom';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = () => {
    const theme = useTheme();

    const navigate = useNavigate();
    function routeChange(route) {
        const mapPath = '/map';
        const dashboardPath = '/';
        if (route === 'map') {
            navigate(mapPath);
            console.log('MAP: ', route);
        } else if (route === 'dashboard') {
            navigate(dashboardPath);
            console.log('DASHBOARD: ', route);
        } else {
            console.log('DEU RUIM: ', route);
        }
    }

    const buttonLabelMap = 'Mapa';
    const buttonLabelDashboard = 'Dashboard';

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection />
                </Box>
                {/* <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.primary[200],
                            color: theme.palette.primary[800],
                            '&:hover': {
                                background: theme.palette.primary[800],
                                color: theme.palette.primary[200]
                            }
                        }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase> */}
            </Box>
            <Box
                sx={{
                    width: 100,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            background: theme.palette.primary[200],
                            color: theme.palette.primary[800],
                            '&:hover': {
                                background: theme.palette.primary[800],
                                color: theme.palette.primary[200]
                            },
                            width: '90px'
                        }}
                        onClick={() => routeChange('map')}
                        color="inherit"
                    >
                        <IconMap2 stroke={1.5} size="1.3rem" />
                        {buttonLabelMap}
                    </Avatar>
                </ButtonBase>
            </Box>
            <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        background: theme.palette.primary[200],
                        color: theme.palette.primary[800],
                        '&:hover': {
                            background: theme.palette.primary[800],
                            color: theme.palette.primary[200]
                        },
                        width: '130px'
                    }}
                    onClick={() => routeChange('dashboard')}
                    color="inherit"
                >
                    <IconDashboard stroke={1.5} size="1.3rem" />
                    {buttonLabelDashboard}
                </Avatar>
            </ButtonBase>

            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />
        </>
    );
};

Header.propTypes = {
    // handleLeftDrawerToggle: PropTypes.func
};

export default Header;
