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

    // useEffect(() => {
    //     // GET request using axios inside useEffect React hook
    //     console.log('TAMO NO USEEFFECT');
    //     const config = {
    //         method: 'get',
    //         url: url + '/diseasesName',
    //         headers: { 'Access-Control-Allow-Origin': '*' }
    //     };
    //     axios(config).then((response) => {
    //         console.log(response.data);
    //         const nameDiseases = [];
    //         for (let i = 0; i < response.data.length; i += 1) {
    //             nameDiseases.push(response.data[i].name_id);
    //         }
    //         setDiseasesResp(nameDiseases);
    //         console.log('DATA-TOTAL');
    //     });

    //     // empty dependency array means this effect will only run once (like componentDidMount in classes)
    // }, []);

    // console.log('Create');

    const inputRef = useRef('');

    function sendChange() {
        if (open) {
            axios
                .put(url + '/updateCase', {
                    disease: row.disease_id,
                    state: row.state,
                    city: row.city,
                    total: inputRef.current.value
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    return (
        <div style={{ display: 'flex' }}>
            <Button width="100%" variant="contained" color="primary" onClick={handleOpen}>
                Editar
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                <Box sx={{ ...style, width: '40%', '& .MuiTextField-root': { m: 1, width: '100%' } }} component="form">
                    <h2 id="parent-modal-title">Alterar Casos</h2>
                    <p id="parent-modal-description">Insira o novo valor para o número de casos para as dadas informações:</p>
                    <div>Doença: {row.disease_id}</div>
                    <div>Estado: {row.state}</div>
                    <div>Cidade: {row.city}</div>
                    <div>Casos a serem atualizados: {row.total}</div>
                    <div style={{ flexDirection: 'column', display: 'flex' }}>
                        <TextField
                            id="new-cases-total"
                            inputRef={inputRef}
                            label="Novo total de casos"
                            type="number"
                            defaultValue={row?.total}
                        />
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
        </div>
    );
}
