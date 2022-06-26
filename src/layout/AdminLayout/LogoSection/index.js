import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = (props) => (
    <ButtonBase disableRipple component={Link} to={props.isAdmin == true ? '/admin' : config.defaultPath}>
        <Logo isAdmin={props.isAdmin} />
    </ButtonBase>
);

export default LogoSection;
