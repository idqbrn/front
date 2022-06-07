/* eslint-disable no-useless-concat */
import { useEffect, useState } from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';
import axios from 'axios';
// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
// import CoreUIChart from './CoreUIChart';
import DoubleChart from './DoubleChart';

// material-ui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// import Button from '@mui/material/Button';
// import PropTypes from 'prop-types';

// other imports
import { diseases } from '../../map/diseases/disease1';
import brStates from '../../map/brStates';
// import SearchTable from '../../admin/table';
// import OpenModal from '../../admin/modals/OpenModal';
import JsonLatLng from '../../map/LocalLatLng/states_latitudes_flat_name.json';
import { /* vecNumCityState, */ vecPosCityState } from '../../map/LocalLatLng/vecCityState';
import { LineAxisOutlined } from '@mui/icons-material';
// import response from '../../admin/response-test';
import url from '../../utilities/backendUrl';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [diseaseOption, setDisease] = useState(null);

    const [stateOption, setState] = useState(0);

    const [cityOption, setCity] = useState(0);

    let cityNum = useState(0);

    const [citiesState, setCities] = useState([]);

    const [isLoading, setLoading] = useState(true);
    const [values, setValues] = useState({});

    const [advancedHeader, setHeader] = useState('Brasil');

    const [diseasesResponse, setDiseasesResp] = useState([]);

    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (diseaseOption != undefined) {
            let variacao = 0;
            let percentual = 0;
            let estado = 'RJ';
            const diseaseLabel = diseasesResponse[diseaseOption];
            console.log('DISEASEOPTION=' + `${diseaseLabel}`);

            console.log(url + '/dashboard/total/' + `${diseaseLabel}`);

            setValues({
                disease: diseaseLabel,
                total: 0,
                variacao: 10,
                percentual: 5,
                estado: 'SP'
            });

            let config = {
                method: 'get',
                url: url + '/dashboard/total/' + `${diseaseLabel}`,
                headers: { 'Access-Control-Allow-Origin': '*' }
            };
            axios(config)
                .then((response) => {
                    console.log(response.data);
                    setTotal(response.data[0].sum);
                    console.log('total=' + `${total}`);
                    // setDiseasesResp(nameDiseases);
                })
                .catch(function (error) {
                    console.log(error);
                });
            setLoading(false);
            setValues({
                disease: diseaseLabel,
                total: total,
                variacao: 10,
                percentual: 5,
                estado: 'SP'
            });
        }
    }, [diseaseOption]);

    useEffect(() => {
        // GET request using axios inside useEffect React hook
        console.log('TAMO NO USEEFFECT');
        const config = {
            method: 'get',
            url: url + '/diseasesName',
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
        axios(config).then((response) => {
            console.log(response.data);
            const nameDiseases = [];
            for (let i = 0; i < response.data.length; i += 1) {
                nameDiseases.push(response.data[i].name_id);
            }
            setDiseasesResp(nameDiseases);
            console.log('DATA-TOTAL');
        });

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '80' }}>
                                <div style={{ display: 'flex', padding: 10, width: '80' }}>
                                    <Typography variant="h2">Casos das Doenças em um Local</Typography>
                                </div>
                                {/* <div style={{ display: 'flex', padding: 10 }}>
                            <Autocomplete
                                id="disease_select"
                                options={diseases}
                                getOptionLabel={(option) => option.label}
                                autoComplete
                                includeInputInList
                                renderInput={(params) => <TextField {...params} label="Doença" />}
                                sx={{ width: 200 }}
                                value={diseases.find((option) => option.currentTarget?.getAttribute('data-option-index') === diseaseOption)}
                                onChange={async (option) => {
                                    console.log('diseases');
                                    console.log(option);
                                    const op = option.currentTarget.getAttribute('data-option-index');
                                    console.log('option: ', op);

                                    if (op !== diseaseOption) {
                                        setDisease(op);
                                        console.log('diseaseOption: ', diseaseOption);
                                    }
                                }}
                            />
                            </div>
                            { <div style={{ display: 'flex' }}>
                                <Autocomplete
                                    id="state_select"
                                    options={brStates}
                                    autoComplete
                                    includeInputInList
                                    renderInput={(params) => <TextField {...params} label="Estado" />}
                                    sx={{ width: 150 }}
                                    value={diseases.find((option) => option.currentTarget?.getAttribute('data-option-index') === stateOption)}
                                    onChange={async (option) => {
                                        console.log('states');
                                        const op = option.currentTarget.getAttribute('data-option-index');
                                        console.log('option: ', op);

                                        if (op !== stateOption) {
                                            setState(op);
                                            console.log('stateOption: ', stateOption);
                                        }
                                    }} 
                                />
                                </div> 
                            {/* <div style={{ display: 'flex' }}>
                                <Autocomplete
                                    id="city_select"
                                    options={brStates}
                                    autoComplete
                                    includeInputInList
                                    renderInput={(params) => <TextField {...params} label="Cidade" />}
                                    sx={{ width: 150 }}
                                    value={diseases.find((option) => option.currentTarget?.getAttribute('data-option-index') === stateOption)}
                                    onChange={async (option) => {
                                        console.log('states');
                                        const op = option.currentTarget.getAttribute('data-option-index');
                                        console.log('option: ', op);

                                        if (op !== stateOption) {
                                            setState(op);
                                            console.log('stateOption: ', stateOption);
                                        }
                                    }} 
                                />
                                </div> */}

                                <div style={{ display: 'flex', padding: 10 }}>
                                    <Autocomplete
                                        id="state_select"
                                        options={brStates}
                                        autoComplete
                                        includeInputInList
                                        renderInput={(params) => <TextField {...params} label="Estado" />}
                                        sx={{ width: 200 }}
                                        value={brStates.find(
                                            (option) => option.nativeEvent?.path[0].getAttribute('data-option-index') === stateOption
                                        )}
                                        onChange={async (option) => {
                                            const op = parseInt(option.nativeEvent.path[0].getAttribute('data-option-index'), 10);
                                            setState(op);
                                            setCity(null);
                                            // const citySelect = document.getElementById('city_select');
                                            // console.log('citySelect: ');
                                            // console.log(citySelect);
                                            // citySelect.value = 'coe';
                                            console.log(`\ncitySelect.value: ${cityOption}`);
                                            /* if (!cityOption) {
                                                const ev = new Event('input', { bubbles: true, cancelable: false });
                                                ev.simulated = true;
                                                const searchTable = document.getElementById('search-table');
                                                // searchTable.value = 'Something new';
                                                searchTable?.dispatchEvent(ev);
                                            } */
                                            const local = vecPosCityState[op];
                                            console.log('op: ', op);
                                            if (!isNaN(local)) {
                                                setState(op);
                                                const localLabel = JsonLatLng[local];
                                                console.log('localLabel: ' + localLabel.UF);
                                                setHeader(`${localLabel.UF}`);

                                                const cities = [];

                                                // eslint-disable-next-line no-plusplus
                                                for (let i = vecPosCityState[op]; i < vecPosCityState[op + 1]; i++)
                                                    cities.push(JsonLatLng[i].nome);

                                                // console.log('cities: ', cities);
                                                setCities(cities);
                                            } else {
                                                setState(null);
                                                setCities([]);
                                                // citiesState.push('');
                                            }
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', padding: 10 }}>
                                    <Autocomplete
                                        id="city_select"
                                        options={citiesState}
                                        autoComplete
                                        includeInputInList
                                        renderInput={(params) => <TextField {...params} label="Cidade" />}
                                        isOptionEqualToValue={(option, value) => option === value}
                                        sx={{ width: 200 }}
                                        value={brStates.find(
                                            (option) => option.nativeEvent?.path[0].getAttribute('data-option-index') === cityOption
                                        )}
                                        onChange={async (option) => {
                                            const op = option.nativeEvent.path[0].getAttribute('data-option-index');

                                            // console.log('CITYoption: ', option);
                                            console.log('value: ', document.getElementById('city_select').value);
                                            console.log('op: ', op);
                                            console.log('stateOption: ', stateOption);
                                            console.log('vecPosCityState[stateOption]: ', vecPosCityState[stateOption]);

                                            cityNum = parseInt(op, 10) + parseInt(vecPosCityState[stateOption], 10);

                                            console.log('cityNum: ', cityNum);

                                            setCity(cityNum);

                                            const local = JsonLatLng[cityNum];
                                            console.log(local);
                                            if (local != undefined) {
                                                console.log('JsonLatLng[', cityNum, ']: ', JsonLatLng[cityNum]);
                                                // console.log(`${local.UF}` + ' - ' + `${local.nome}`); console.log(`${stateOption}`); console.log(`${cityOption}`);
                                                setHeader(`${local.nome}` + ', ' + `${local.UF}`);
                                            } else {
                                                setCity(NaN);
                                                const state = vecPosCityState[stateOption];
                                                if (!isNaN(state)) {
                                                    setState(op);
                                                    const stateLabel = JsonLatLng[state];
                                                    setHeader(`${stateLabel.UF}`);
                                                }
                                            }

                                            // if (brStates[stateOption].zoom > brStates[0].zoom) map.setZoom(local.zoom);
                                            // console.log('heatmap.getData()=');
                                            // console.log(heatmap.getData());
                                        }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Typography variant="h4">{`${advancedHeader}`}</Typography>
                                </div>
                                <DoubleChart state={brStates[stateOption]?.value} city={JsonLatLng[cityOption]?.nome} />
                            </div>
                        </div>
                    </Grid>
                </MainCard>
            </Grid>
            <Grid item xs={12}>
                <MainCard style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', padding: 5, paddingLeft: 5, alignContent: 'center', paddingTop: 20 }}>
                            <Typography variant="h3">Selecione a doença a ser analisada abaixo:</Typography>
                        </div>
                        <div style={{ display: 'flex', padding: 5, paddingRight: 5 }}>
                            <Autocomplete
                                id="disease_select"
                                options={diseasesResponse}
                                autoComplete
                                includeInputInList
                                renderInput={(params) => <TextField {...params} label="Doença" />}
                                sx={{ width: 200 }}
                                value={diseases.find((option) => option.currentTarget?.getAttribute('data-option-index') === diseaseOption)}
                                onChange={async (option) => {
                                    console.log('diseases');
                                    console.log(option);
                                    const op = option.currentTarget.getAttribute('data-option-index');
                                    console.log('option: ', op);

                                    if (op !== diseaseOption) {
                                        setDisease(op);
                                        console.log('diseaseOption: ', diseaseOption);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </MainCard>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} style={{ justifyContent: 'center' }}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <EarningCard isLoading={isLoading} values={values} />
                    </Grid>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <TotalOrderLineChartCard isLoading={isLoading} values={values} />
                    </Grid>
                    {/* <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeDarkCard isLoading={isLoading} values={values} />
                            </Grid>
                            <Grid item sm={6} xs={12} md={6} lg={12}>
                                <TotalIncomeLightCard isLoading={isLoading} values={values} />
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Grid>
            </Grid>
            {/* <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <TotalGrowthBarChart isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid> */}
            {/* <CoreUIChart /> */}
        </Grid>
    );
};

export default Dashboard;
