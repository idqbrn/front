// import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';

// project imports
import LogoSection from '../LogoSection';
// import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

// assets
import { IconMap2, IconDashboard } from '@tabler/icons';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import { IconMenu2 } from '@tabler/icons';

// route
import { useNavigate } from 'react-router-dom';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const AdminHeader = () => {
    const theme = useTheme();

    const navigate = useNavigate();
    function routeChange(route) {
        const mapPath = '/admin/map';
        const dashboardPath = '/admin/dashboard';
        const adminPath = '/admin';
        const diseaseAdminPath = '/admin/disease';

        if (route === 'map') {
            navigate(mapPath);
            console.log('MAP: ', route);
        } else if (route === 'dashboard') {
            navigate(dashboardPath);
            console.log('DASHBOARD: ', route);
        } else if (route === 'admin') {
            navigate(adminPath);
            console.log('ADMIN: ', route);
        } else if (route === 'diseaseAdmin') {
            navigate(diseaseAdminPath);
            console.log('DISEASE-ADMIN: ', route);
        }
    }

    const buttonLabelMap = 'Mapa';
    const buttonLabelDashboard = 'Dashboard';
    const buttonLabelCasesAdmin = 'Casos - Admin';
    const buttonLabelDiseaseAdmin = 'Doenças - Admin';

    const logoSectionWidth = 350;

    return (
        <>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: logoSectionWidth,
                    display: 'flex',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    <LogoSection isAdmin={true} />
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

            {/* Button Casos Admin */}
            <Box
                sx={{
                    width: 170,
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
                            width: '160px'
                        }}
                        onClick={() => routeChange('admin')}
                        color="inherit"
                    >
                        <AdminPanelSettingsIcon stroke={1.5} size="1.3rem" />
                        {buttonLabelCasesAdmin}
                    </Avatar>
                </ButtonBase>
            </Box>

            {/* Button Doenças Admin */}
            <Box
                sx={{
                    width: 190,
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
                            width: '180px'
                        }}
                        onClick={() => routeChange('diseaseAdmin')}
                        color="inherit"
                    >
                        <CoronavirusIcon stroke={1.5} size="1.3rem" />
                        {buttonLabelDiseaseAdmin}
                    </Avatar>
                </ButtonBase>
            </Box>

            {/* Button Mapa */}
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

            {/* Button Dashboard */}
            <Box
                sx={{
                    width: 140,
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
                            width: '130px'
                        }}
                        onClick={() => routeChange('dashboard')}
                        color="inherit"
                    >
                        <IconDashboard stroke={1.5} size="1.3rem" />
                        {buttonLabelDashboard}
                    </Avatar>
                </ButtonBase>
            </Box>

            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ flexGrow: 1 }} />

            {/* notification & profile */}
            {/* <NotificationSection />
            <ProfileSection /> */}
        </>
    );
};

AdminHeader.propTypes = {
    // handleLeftDrawerToggle: PropTypes.func
};

export default AdminHeader;
