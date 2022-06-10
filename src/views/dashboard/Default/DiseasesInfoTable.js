import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
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

    console.log('ENTREI NA DISEASES INFO TABLE');

    useEffect(() => {
        console.log(url + '/disease/info');
        // GET request using axios inside useEffect React hook
        const config = {
            method: 'get',
            url: url + '/diseaseInfo',
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
        axios(config).then((response) => {
            console.log('INFO TABLE RESPONSE.DATA:');
            console.log(response.data);
            setData(response.data);
            console.log('INFO TABLE -- ' + response.data);
        });

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <Grid container>
            <Grid container>
                <Grid container spacing={2}>
                    <Grid item xs="auto" sm container>
                        {data?.map((disease) => (
                            <Card
                                sx={{
                                    p: 1,
                                    margin: 1,
                                    maxWidth: 500,
                                    flexGrow: 1,
                                    backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#9fa')
                                }}
                            >
                                <Grid item xs container direction="column">
                                    <Grid item xs padding={1}>
                                        <Typography gutterBottom variant="subtitle1" component="div">
                                            Doença: {disease.name_id}
                                        </Typography>
                                        <Typography variant="body1" gutterBottom>
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
                            </Card>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
