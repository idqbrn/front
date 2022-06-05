import { CChart } from '@coreui/react-chartjs';

// material-ui
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainCard from 'ui-component/cards/MainCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.secondary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

export default function CoreUIChart() {
    return (
        <Grid>
            <CardWrapper>
                <CChart
                    type="line"
                    data={{
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                        datasets: [
                            {
                                label: 'My First dataset',
                                backgroundColor: 'rgba(220, 220, 220, 0.2)',
                                borderColor: 'rgba(220, 220, 220, 1)',
                                pointBackgroundColor: 'rgba(220, 220, 220, 1)',
                                pointBorderColor: '#fff',
                                data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                            },
                            {
                                label: 'My Second dataset',
                                backgroundColor: 'rgba(151, 187, 205, 0.2)',
                                borderColor: 'rgba(151, 187, 205, 1)',
                                pointBackgroundColor: 'rgba(151, 187, 205, 1)',
                                pointBorderColor: '#fff',
                                data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                            }
                        ]
                    }}
                />
            </CardWrapper>
        </Grid>
    );
}
