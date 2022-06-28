import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

import { diseases } from '../../map/diseases/disease1';
import brStates from '../../map/brStates';
import { vecPosCityState, CitiesFromState } from '../../map/LocalLatLng/vecCityState';
import JsonLatLng from '../../map/LocalLatLng/states_latitudes_flat_name.json';
import url from '../../utilities/backendUrl';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};

function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {/* <Button onClick={handleOpen}>Open Child Modal</Button> */}
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Adicionado</h2>
                    <p id="child-modal-description">Caso adicionado com êxito.</p>
                    <Button onClick={handleClose}>Ok</Button>
                </Box>
            </Modal>
        </>
    );
}

export default function NestedModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [stateOption, setState] = useState(0);

    const [cityOption, setCity] = useState(0);

    const [citiesState, setCities] = useState([]);

    const [diseaseOption, setDisease] = useState('');

    const [diseasesResponse, setDiseasesResp] = useState([]);

    const inputRefDisease = useRef('');
    const inputRefState = useRef('');
    const inputRefCity = useRef('');
    const inputRefTotal = useRef('');

    let localLabel;
    let cityNum = useState(0);

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

    function insertCase() {
        // const disease_id = document.getElementById('disease_select');
        console.log('disease option:');
        console.log(diseaseOption);
        // console.log(disease_id);
        // console.log(inputRefDisease.current);

        const disease_id = diseaseOption;
        // const state = document.getElementById('state_select').value;
        // console.log(state);
        const state = JsonLatLng[cityOption].UF;
        console.log(state);
        // console.log('JsonLatLng[cityNum] UF');

        const city = document.getElementById('city_select').value;
        console.log(city);
        const total = inputRefTotal.current.value;
        console.log(total);

        if (!open) return;

        const config = {
            method: 'post',
            url: `${url}` + '/insertCase',
            headers: { 'Access-Control-Allow-Origin': '*' },
            data: {
                disease_id: disease_id,
                state: state,
                city: city,
                total: total,
                user_id: 1
            }
        };
        axios(config)
            .then((response) => {
                console.log(response);
                // setConfirmOpen(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // console.log('Create');

    return (
        <div style={{ display: 'flex' }}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Adicionar casos
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                <Box sx={{ ...style, width: '30%', '& .MuiTextField-root': { m: 1, width: '100%' } }} component="form">
                    <h2 id="parent-modal-title">Adicionar Caso</h2>
                    <p id="parent-modal-description">Insira os dados para a inserção dos casos no banco de dados:</p>
                    <div style={{ flexDirection: 'column', display: 'flex' }}>
                        <Autocomplete
                            id="disease_select"
                            options={diseasesResponse}
                            autoComplete
                            includeInputInList
                            ref={inputRefDisease}
                            renderInput={(params) => <TextField {...params} label="Doença" />}
                            // sx={{ width: 200 }}
                            value={diseases.find((option) => option.currentTarget?.getAttribute('data-option-index') === diseaseOption)}
                            onChange={async (option) => {
                                console.log('diseases');
                                console.log(option);
                                const op = option.currentTarget.getAttribute('data-option-index');
                                console.log('option: ', op);

                                if (op !== diseaseOption) {
                                    setDisease(diseasesResponse[op]);
                                    console.log('diseaseOption: ', diseaseOption);
                                }
                            }}
                        />
                        <Autocomplete
                            id="state_select"
                            options={brStates}
                            autoComplete
                            includeInputInList
                            ref={inputRefState}
                            renderInput={(params) => <TextField {...params} label="Estado" />}
                            // sx={{ width: 200 }}
                            value={brStates.find((option) => option.nativeEvent?.path[0].getAttribute('data-option-index') === stateOption)}
                            onChange={async (option) => {
                                const op = parseInt(option.nativeEvent.path[0].getAttribute('data-option-index'), 10);
                                // setState(op);
                                setCity(null);
                                console.log(`\ncitySelect.value: ${cityOption}`);
                                const local = vecPosCityState[op];
                                console.log('op: ', op);
                                if (!isNaN(local)) {
                                    setState(op);
                                    localLabel = JsonLatLng[local];
                                    console.log('localLabel: ' + localLabel.UF);

                                    const cities = [];
                                    for (let i = vecPosCityState[op]; i < vecPosCityState[op + 1]; i += 1) cities.push(JsonLatLng[i].nome);

                                    // console.log('cities: ', cities);
                                    setCities(cities);
                                } else {
                                    setState(null);
                                    setCities([]);
                                    // citiesState.push('');
                                }
                            }}
                        />
                        <Autocomplete
                            id="city_select"
                            options={citiesState}
                            autoComplete
                            includeInputInList
                            ref={inputRefCity}
                            renderInput={(params) => <TextField {...params} label="Cidade" />}
                            isOptionEqualToValue={(option, value) => option === value}
                            // sx={{ width: 200 }}
                            value={brStates.find((option) => option.nativeEvent?.path[0].getAttribute('data-option-index') === cityOption)}
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
                                } else {
                                    setCity(NaN);
                                    const state = vecPosCityState[stateOption];
                                    if (!isNaN(state)) {
                                        setState(op);
                                        const stateLabel = JsonLatLng[state];
                                    }
                                }

                                // if (brStates[stateOption].zoom > brStates[0].zoom) map.setZoom(local.zoom);
                                // console.log('heatmap.getData()=');
                                // console.log(heatmap.getData());
                            }}
                        />
                        <TextField id="input-quantidade" inputRef={inputRefTotal} label="Quantidade" type="number" />

                        <Button variant="contained" component="span" onClick={insertCase}>
                            Adicionar
                        </Button>
                    </div>
                    <ChildModal />
                </Box>
            </Modal>
        </div>
    );
}
