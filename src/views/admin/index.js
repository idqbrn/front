// material-ui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import { useState } from 'react';

// other imports
import { diseases } from '../map/diseases/disease1';
import brStates from '../map/brStates';
import SearchTable from './table';
import OpenModal from './modals/OpenModal';
import JsonLatLng from '../map/LocalLatLng/states_latitudes_flat_name.json';
import { /* vecNumCityState, */ vecPosCityState } from '../map/LocalLatLng/vecCityState';

// ==============================|| SAMPLE PAGE ||============================== //

function Admin() {
    const [diseaseOption, setDisease] = useState(diseases[0]);
    const [stateOption, setState] = useState(brStates[0]);

    const [cityOption, setCity] = useState(0);

    const [citiesState, setCities] = useState([]);

    // const [deseaseOption, setDesease] = useState(diseases[0].value);
    // const [stateOption] = useState(brStates[0]);

    return (
        <MainCard title="DADOS SANITÁRIOS">
            <div style={{ display: 'flex', paddingBottom: 10, justifyContent: 'space-between' }}>
                <OpenModal value="Criar" />
                <OpenModal value="Atualizar" />
                <OpenModal value="Deletar" />
                <OpenModal value="Upload CSV" />
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex', padding: 10 }}>
                        <Autocomplete
                            id="disease_select"
                            options={diseases}
                            autoComplete
                            includeInputInList
                            renderInput={(params) => <TextField {...params} label="Doença" />}
                            sx={{ width: 200 }}
                            value={diseases.find((option) => option.currentTarget?.getAttribute('data-option-index') === diseaseOption)}
                            onChange={async (option) => {
                                console.log('diseases');
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
                                (option) => brStates[option.nativeEvent?.path[0].getAttribute('data-option-index')]?.center === stateOption
                            )}
                            onChange={async (option) => {
                                const op = parseInt(option.nativeEvent.path[0].getAttribute('data-option-index'), 10);
                                setState(op);
                                const local = brStates[op];
                                console.log('op: ', op);

                                setState(local.center);

                                const cities = [];

                                // eslint-disable-next-line no-plusplus
                                for (let i = vecPosCityState[op]; i < vecPosCityState[op + 1]; i++) cities.push(JsonLatLng[i].nome);

                                console.log('cities: ', cities);
                                setCities(cities);
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
                            sx={{ width: 200 }}
                            value={brStates.find(
                                (option) => brStates[option.nativeEvent?.path[0].getAttribute('data-option-index')]?.center === cityOption
                            )}
                            onChange={async (option) => {
                                console.log('CITYoption: ', option);
                                const op = option.nativeEvent.path[0].getAttribute('data-option-index');
                                console.log('value: ', document.getElementById('city_select').option);
                                console.log('op: ', op);
                                console.log('stateOption: ', stateOption);
                                console.log('vecPosCityState[stateOption]: ', vecPosCityState[stateOption]);

                                const cityNum = parseInt(op, 10) + parseInt(vecPosCityState[stateOption], 10);

                                console.log('cityNum: ', cityNum);

                                setCity(cityNum);

                                const local = JsonLatLng[cityNum];

                                console.log('JsonLatLng.UF: ', local.UF);
                                console.log('JsonLatLng[', cityNum, ']: ', JsonLatLng[cityNum]);

                                // if (brStates[stateOption].zoom > brStates[0].zoom) map.setZoom(local.zoom);
                                // console.log('heatmap.getData()=');
                                // console.log(heatmap.getData());
                            }}
                        />
                    </div>

                    <Button variant="contained" color="primary">
                        Buscar
                    </Button>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <SearchTable />
            </div>
        </MainCard>
    );
}

export default Admin;
