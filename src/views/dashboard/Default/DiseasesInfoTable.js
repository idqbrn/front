import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import axios from 'axios';

import url from '../../utilities/backendUrl';

// const Img = styled('img')({
//     margin: 'auto',
//     display: 'block',
//     maxWidth: '100%',
//     maxHeight: '100%'
// });

export default function DiseasesInfoTable() {
    const [data, setData] = useState();
    const [values, setValues] = useState();

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        const config = {
            method: 'get',
            url: url + '/diseases/info',
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
        axios(config).then((response) => {
            console.log(response.data);
            setData(response.data);
            console.log('DATA-TOTAL -- ' + response.data);
        });

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#7da')
            }}
        >
            <Grid container spacing={2}>
                {data?.map((disease) => (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                                <Grid item xs>
                                    <Typography gutterBottom variant="subtitle1" component="div">
                                        Doença: {disease.name_id}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Descrição: {disease.description}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Tratamentos: {disease.treatments}
                                    </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        Vetores de transmissão: {disease.vector}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}
