import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Papa from 'papaparse';
import axios from 'axios';

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
    const [files, setFiles] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const changeHandler = (event) => {
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                console.log(results.data);
                setFiles(results.data);
            }
        });
    };
    const deseasesid = {
        BOTULISMO: 1,
        LEISHMANIOSE_VISCERAL: 2,
        LEISHMANIOSE_TEGUMENTAR: 3,
        FEBRE_AMARELA: 4,
        DENGUE: 5,
        HEPATITE_VIRAL: 6,
        FEBRE_MACULOSA: 7,
        LEPTOSPIROSE: 8,
        DOENCA_DE_CHAGAS: 9,
        PICADAS_DE_COBRAS: 10,
        ZIKA_VIRUS: 11,
        FEBRE_TIFOIDE: 12,
        HANTAVIROSE: 13,
        MENINGITE: 14,
        RAIVA: 15
    };
    const myFunction = (value) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = mm + '-' + dd + '-' + yyyy;

        const places = {
            code: value['IBGE'],
            state: value['UF'],
            city: value['Municipio'],
            latitude: value['latitude'],
            longitude: value['longitude'],
            region: value['Região']
        };
        const value_return = [
            {
                total: value['ZIKA VÍRUS'],
                disease_id: 'zika_virus',
                place_id: value['IBGE'],
                user_id: 1,
                created_at: today,
                deleted_at: null
            },
            {
                total: value['BOTULISMO'],
                disease_id: 'botulismo',
                place_id: value['IBGE'],
                user_id: 1,
                created_at: today,
                deleted_at: null
            },
            {
                total: value['LEISHMANIOSE VISCERAL'],
                disease_id: 'leishmaniose_visceral',
                place_id: value['IBGE'],
                user_id: 1,
                created_at: today,
                deleted_at: null
            },
            {
                total: value['LEISHMANIOSE TEGUMENTAR'],
                disease_id: 'leishmaniose_tegumentar',
                place_id: value['IBGE'],
                user_id: 1,
                created_at: today,
                deleted_at: null
            },
            {
                total: value['FEBRE AMARELA'],
                disease_id: 'febre_amarela',
                place_id: value['IBGE'],
                user_id: 1,
                created_at: today,
                deleted_at: null
            },
            {
                total: value['DENGUE'],
                disease_id: 'dengue',
                place_id: value['IBGE'],
                user_id: 1,
                created_at: today,
                deleted_at: null
            },
            {
                total: value['HEPATITE VIRAL'],
                disease_id: 'hepatite_viral',
                place_id: value['IBGE'],
                user_id: 1,
                created_at: today,
                deleted_at: null
            },
            {
                total: value['FEBRE MACULOSA'],
                disease_id: 'febre_maculosa',
                place_id: value['IBGE'],
                user_id: 1,
                created_at: today,
                deleted_at: null
            },
            {
                total: value['LEPTOSPIROSE'],
                disease_id: 'leptospirose',
                place_id: value['IBGE'],
                user_id: 1,
                created_at: today,
                deleted_at: null
            },
            {
                total: value['DOENÇA DE CHAGAS'],
                disease_id: 'doenca_de_chagas',
                place_id: value['IBGE'],
                user_id: 1,
                created_at: today,
                deleted_at: null
            },
            {
                total: value['PICADAS DE COBRAS'],
                disease_id: 'picadas_de_cobras',
                place_id: value['IBGE'],
                user_id: 1,
                created_at: today,
                deleted_at: null
            },
            {
                total: value['FEBRE TIFÓIDE'],
                disease_id: 'febre_tifoide',
                place_id: value['IBGE'],
                user_id: 1,
                created_at: today,
                deleted_at: null
            },
            {
                total: value['HANTAVIROSE'],
                disease_id: 'hantavirose',
                place_id: value['IBGE'],
                user_id: 1,
                created_at: today,
                deleted_at: null
            },
            {
                total: value['MENINGITE'],
                disease_id: 'meningite',
                place_id: value['IBGE'],
                user_id: 1,
                created_at: today,
                deleted_at: null
            },
            {
                total: value['RAIVA'],
                disease_id: 'raiva',
                place_id: value['IBGE'],
                user_id: 1,
                created_at: today,
                deleted_at: null
            }
        ];
        return { place: places, diseases_result: value_return };
    };
    const submitbutton = () => {
        let quero = [];
        let lugares = [];
        let child;
        for (let i = 0; i < files.length; i++) {
            child = myFunction(files[i]);
            quero = quero.concat(child['diseases_result']);
            lugares = lugares.concat(child['place']);
        }
        let arrays = [];
        const chunkSize = 500;
        let chunk = null;
        for (let i = 0; i < array.length; i += chunkSize) {
            chunk = quero.slice(i, i + chunkSize);
            arrays.push(chunk);
        }
        for (let i = 0; i < arrays.length; i += 1) {
            axios
                .post('http://localhost:5000/upload', {
                    vector: arrays[i]
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        console.log(lugares);
    };
    // console.log('UploadCSVModal');
    return (
        <div style={{ display: 'flex' }}>
            <Button variant="contained" color="primary" onClick={handleOpen}>
                Realizar Upload de CSV
            </Button>
            <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
                <Box sx={{ ...style, width: 400 }}>
                    <h2 id="parent-modal-title">UploadCSVModal</h2>
                    <p id="parent-modal-description">Faça upload do csv de doenças e locais</p>
                    <Input accept=".csv" id="contained-button-file" type="file" onChange={changeHandler} />
                    <Button variant="contained" component="span" onClick={submitbutton}>
                        Upload
                    </Button>
                    <ChildModal />
                </Box>
            </Modal>
        </div>
    );
}
