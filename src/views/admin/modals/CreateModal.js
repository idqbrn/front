import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useState } from 'react';

import { diseases } from '../../map/diseases/disease1';
import brStates from '../../map/brStates';
import { vecPosCityState, CitiesFromState } from '../../map/LocalLatLng/vecCityState';

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
            <Button onClick={handleOpen}>Open Child Modal</Button>
            <Modal
                hideBackdrop
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 200 }}>
                    <h2 id="child-modal-title">Text in a child modal</h2>
                    <p id="child-modal-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    <Button onClick={handleClose}>Close Child Modal</Button>
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

    const [diseaseOption, setDisease] = useState(diseases[0].value);

    // console.log('Create');

    return (
        <div style={{ display: 'flex' }}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Create
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                <Box sx={{ ...style, width: '80%', '& .MuiTextField-root': { m: 1, width: '100%' } }} component="form">
                    <h2 id="parent-modal-title">Create</h2>
                    <p id="parent-modal-description">Insira os dados para a inserção dos casos no banco de dados:</p>
                    <div style={{ flexDirection: 'column', display: 'flex' }}>
                        <Autocomplete
                            disablePortal
                            id="autocomplete-diseases"
                            autoComplete
                            options={diseases}
                            sx={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} label="Nome da Doença" />}
                            value={brStates.find((option) => option === diseaseOption)}
                            onChange={async (option) => {
                                const op = parseInt(option.nativeEvent.path[0].getAttribute('data-option-index'), 10);
                                if (op > 0) {
                                    setDisease(op);
                                }
                            }}
                        />
                        <Autocomplete
                            disablePortal
                            id="autocomplete-states"
                            autoComplete
                            includeInputInList
                            options={brStates}
                            sx={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} label="Estado" />}
                            value={brStates.find(
                                (option) => brStates[option.nativeEvent?.path[0].getAttribute('data-option-index')]?.center === stateOption
                            )}
                            onChange={async (option) => {
                                const op = parseInt(option.nativeEvent.path[0].getAttribute('data-option-index'), 10);
                                setState(op);
                                if (op > 0) {
                                    const cities = CitiesFromState(stateOption);
                                    setCities(cities);
                                }
                            }}
                        />
                        <Autocomplete
                            disablePortal
                            id="autocomplete-cities"
                            autoComplete
                            includeInputInList
                            options={citiesState}
                            sx={{ width: '100%' }}
                            renderInput={(params) => <TextField {...params} label="Cidade" />}
                            value={brStates.find(
                                (option) => brStates[option.nativeEvent?.path[0].getAttribute('data-option-index')]?.center === cityOption
                            )}
                            onChange={async (option) => {
                                const op = parseInt(option.nativeEvent.path[0].getAttribute('data-option-index'), 10);
                                if (op >= 0) {
                                    const cityNum = op + vecPosCityState[stateOption];

                                    setCity(cityNum);
                                }
                            }}
                        />
                        <TextField id="input-quantidade" label="Quantidade" type="number" />

                        <Button variant="contained" component="span">
                            Adicionar
                        </Button>
                    </div>
                    <ChildModal />
                </Box>
            </Modal>
        </div>
    );
}
