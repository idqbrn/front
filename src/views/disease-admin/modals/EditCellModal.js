import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

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

export default function NestedModal(row) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const inputRefDescription = useRef('');
    const inputRefTreatments = useRef('');
    const inputRefVector = useRef('');

    function sendChange() {
        if (open) {
            let config = {
                method: 'put',
                url: `${url}` + '/updateDisease',
                headers: { 'Access-Control-Allow-Origin': '*' },
                data: {
                    name_id: row.name_id,
                    description: inputRefDescription.current.value,
                    treatments: inputRefTreatments.current.value,
                    vector: inputRefVector.current.value
                }
            };
            axios(config)
                .then((response) => {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (
        <>
            <Button width="100%" variant="contained" color="primary" onClick={handleOpen}>
                Editar
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                <Box sx={{ ...style, width: '40%', '& .MuiTextField-root': { m: 1, width: '100%' } }} component="form">
                    <h2 id="parent-modal-title">Alterar Doença</h2>
                    <p id="parent-modal-description">Insira as novas informações para a doença escolhida:</p>
                    <div>Doença: {row.name_id}</div>
                    <TextField
                        id="new-description"
                        inputRef={inputRefDescription}
                        label="Descrição"
                        multiline
                        rows={2}
                        type="text"
                        defaultValue={row?.description}
                    />
                    <TextField
                        id="new-treatment"
                        inputRef={inputRefTreatments}
                        label="Tratamento"
                        multiline
                        type="text"
                        defaultValue={row?.treatments}
                    />
                    <TextField
                        id="new-vector"
                        inputRef={inputRefVector}
                        label="Vetores de transmissão"
                        multiline
                        type="text"
                        defaultValue={row?.vector}
                    />
                    <div style={{ flexDirection: 'column', display: 'flex' }}>
                        <Button
                            variant="contained"
                            component="span"
                            onClick={() => {
                                sendChange();
                            }}
                        >
                            Alterar
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
    );
}
