// material-ui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// other imports
import { diseases } from '../map/diseases/disease1';
import brStates from '../map/brStates';
import SearchTable from './table';
import OpenModal from './modals/OpenModal';
import JsonLatLng from '../map/LocalLatLng/states_latitudes_flat_name.json';
import { /* vecNumCityState, */ vecPosCityState } from '../map/LocalLatLng/vecCityState';
import stateToInitial from '../map/LocalLatLng/stateToInitial';
import url from '../utilities/backendUrl';

// ==============================|| SAMPLE PAGE ||============================== //

function Admin() {
    const [diseaseOption, setDisease] = useState('');
    const [stateOption, setState] = useState(0);
    // const [cityOption, setCity] = useState(0);

    const [citiesState, setCities] = useState([]);

    const [diseasesResponse, setDiseasesResp] = useState([]);

    const [tableData, setTableData] = useState([]);

    // const [deseaseOption, setDesease] = useState(diseases[0].value);
    // const [stateOption] = useState(brStates[0]);

    function requestTableData(disease, state) {
        console.log('requestTableData');

        console.log(disease.value);
        console.log(state.value);
        // console.log(city.value);

        if (state.value != undefined && state.value != null && state.value != '') {
            const stateInitial = stateToInitial[state.value];
            console.log(stateInitial);

            const config = {
                method: 'get',
                url: url + '/admin/search/' + `${disease.value}` + '/' + `${stateInitial}`,
                headers: { 'Access-Control-Allow-Origin': '*' }
            };
            axios(config).then((response) => {
                console.log(response);
                console.log(response.data);
                setTableData(response.data);
                console.log('DATA-TOTAL');
            });
        } else {
            const config = {
                method: 'get',
                url: `${url}` + '/admin/diseaseStatesSum/' + `${disease.value}`,
                headers: { 'Access-Control-Allow-Origin': '*' }
            };
            axios(config).then((response) => {
                console.log('response.data');
                console.log(response.data);
                setTableData(response.data);
            });
        }
    }

    SearchTable.propTypes = {
        values: PropTypes.any.isRequired
    };

    useEffect(() => {
        // GET request using axios inside useEffect React hook
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
        <MainCard title="DADOS SANITÁRIOS">
            <div style={{ display: 'flex', paddingBottom: 10, justifyContent: 'space-between' }}>
                <OpenModal value="Criar" />
                {/* <OpenModal value="Atualizar" />
                    <OpenModal value="Deletar" /> */}
                <OpenModal value="Upload CSV" />
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', padding: 10 }}>
                        <Autocomplete
                            id="disease_select"
                            options={diseasesResponse}
                            getOptionLabel={(option) => option}
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
                    {/* <div style={{ display: 'flex' }}>
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
                            </div> */}
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
                                (option) => brStates[option.nativeEvent?.path[0].getAttribute('data-option-index')]?.value === stateOption
                            )}
                            onChange={async (option) => {
                                const op = parseInt(option.nativeEvent.path[0].getAttribute('data-option-index'), 10);
                                setState(op);
                                // setCity(null);
                                // setCities([]);

                                // const citySelect = document.getElementById('city_select');
                                // console.log('citySelect: ');
                                // console.log(citySelect);
                                // citySelect.value = 'coe';
                                // console.log(`\ncitySelect.value: ${cityOption}`);
                                /* if (!cityOption) {
                                        const ev = new Event('input', { bubbles: true, cancelable: false });
                                        ev.simulated = true;
                                        const searchTable = document.getElementById('search-table');
                                        // searchTable.value = 'Something new';
                                        searchTable?.dispatchEvent(ev);
                                    } */
                                const local = brStates[op];
                                console.log('op: ', op);
                                if (local) {
                                    setState(op);

                                    const cities = [];

                                    // eslint-disable-next-line no-plusplus
                                    for (let i = vecPosCityState[op]; i < vecPosCityState[op + 1]; i++) cities.push(JsonLatLng[i].nome);

                                    // console.log('cities: ', cities);
                                    // setCities(cities);
                                } else {
                                    setState(null);
                                    // citiesState.push('');
                                }
                            }}
                        />
                    </div>
                    {/* <div style={{ display: 'flex', padding: 10 }}>
                            <Autocomplete
                                id="city_select"
                                options={citiesState}
                                autoComplete
                                includeInputInList
                                renderInput={(params) => <TextField {...params} label="Cidade" />}
                                isOptionEqualToValue={(option, value) => option === value}
                                sx={{ width: 200 }}
                                value={brStates.find(
                                    (option) => brStates[option.nativeEvent?.path[0].getAttribute('data-option-index')]?.center === cityOption
                                )}
                                onChange={async (option) => {
                                    const op = option.nativeEvent.path[0].getAttribute('data-option-index');

                                    // console.log('CITYoption: ', option);
                                    console.log('value: ', document.getElementById('city_select').option);
                                    console.log('op: ', op);
                                    console.log('stateOption: ', stateOption);
                                    console.log('vecPosCityState[stateOption]: ', vecPosCityState[stateOption]);

                                    cityNum = parseInt(op, 10) + parseInt(vecPosCityState[stateOption], 10);

                                    console.log('cityNum: ', cityNum);

                                    setCity(cityNum);

                                    const local = JsonLatLng[cityNum];
                                    if (local) {
                                        console.log('JsonLatLng.UF: ', local.UF);
                                        console.log('JsonLatLng[', cityNum, ']: ', JsonLatLng[cityNum]);
                                    } else {
                                        setCity(NaN);
                                    }

                                    // if (brStates[stateOption].zoom > brStates[0].zoom) map.setZoom(local.zoom);
                                    // console.log('heatmap.getData()=');
                                    // console.log(heatmap.getData());
                                }}
                            />
                        </div> */}

                    <Button
                        onClick={() => {
                            const disease = document.getElementById('disease_select');
                            const state = document.getElementById('state_select');
                            // const city = document.getElementById('city_select');
                            requestTableData(disease, state);
                        }}
                        variant="contained"
                        color="primary"
                        id="search-button"
                    >
                        Buscar
                    </Button>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <SearchTable id="search-table" values={tableData} />
            </div>
        </MainCard>
    );
}

export default Admin;
