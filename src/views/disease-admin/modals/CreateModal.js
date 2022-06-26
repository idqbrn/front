import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
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

let childClosed = false;

function ConfirmModal(props) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        childClosed = true;
        return <></>;
    };

    if (!open && props.isConfirmOpen && !childClosed) handleOpen();
    if (!open && !props.isConfirmOpen && childClosed) childClosed = false;

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
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="child-modal-title">Doença Adicionada</h2>
                    <p id="child-modal-description">A doença e os dados inseridos foram corretamente adicionados ao banco de dados!</p>
                    <Button onClick={handleClose}>Ok</Button>
                </Box>
            </Modal>
        </>
    );
}

export default function NestedModal() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setConfirmOpen(false);
        setOpen(false);
    };

    const [isConfirmOpen, setConfirmOpen] = useState(false);

    const inputRefDisease = useRef('');
    const inputRefDescription = useRef('');
    const inputRefTreatments = useRef('');
    const inputRefVector = useRef('');
    // console.log('Create');

    function insertDisease() {
        if (!open) return;
        const config = {
            method: 'post',
            url: `${url}` + '/insertDisease',
            headers: { 'Access-Control-Allow-Origin': '*' },
            data: {
                name_id: inputRefDisease.current.value,
                description: inputRefDescription.current.value,
                treatments: inputRefTreatments.current.value,
                vector: inputRefVector.current.value,
                image: null
            }
        };
        axios(config)
            .then((response) => {
                console.log(response);
                setConfirmOpen(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div style={{ display: 'flex' }}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Adicionar Doença
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                <Box sx={{ ...style, width: '80%', '& .MuiTextField-root': { m: 1, width: '100%' } }} component="form">
                    <h2 id="parent-modal-title">Create</h2>
                    <p id="parent-modal-description">Insira os dados para a inserção dos casos no banco de dados:</p>

                    <div style={{ flexDirection: 'column', display: 'flex' }}>
                        <TextField id="disease_id" inputRef={inputRefDisease} label="Nome da Doença" />
                        <TextField id="description" inputRef={inputRefDescription} label="Descrição" />
                        <TextField id="treatments" inputRef={inputRefTreatments} label="Tratamentos" />
                        <TextField id="vector" inputRef={inputRefVector} label="Vetores de transmissão" />

                        <Button variant="contained" component="span" onClick={insertDisease}>
                            Adicionar
                        </Button>
                    </div>
                    <ConfirmModal isConfirmOpen={isConfirmOpen} />
                </Box>
            </Modal>
        </div>
    );
}
