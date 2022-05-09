// material-ui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import { useState } from 'react';

// other imports
import { deseases } from '../map/deseases/desease1';
import brStates from '../map/brStates';
import SearchTable from './table';
import OpenModal from './modals/OpenModal';

// ==============================|| SAMPLE PAGE ||============================== //

function Admin() {
    /* const [deseaseOption, setDesease] = useState(deseases[0]);
    const [stateOption, setState] = useState(brStates[0]); */
    const [deseaseOption] = useState(deseases[0]);
    const [stateOption] = useState(brStates[0]);
    return (
        <MainCard title="DADOS SANITÁRIOS">
            <div style={{ display: 'flex', paddingBottom: 10, justifyContent: 'space-between' }}>
                <OpenModal value="Criar" />
                <OpenModal value="Atualizar" />
                <OpenModal value="Deletar" />
                <OpenModal value="Upload CSV" />
                <div style={{ display: 'flex' }}>
                    <div style={{ display: 'flex' }}>
                        <Autocomplete
                            id="desease_select"
                            options={deseases}
                            autoComplete
                            includeInputInList
                            renderInput={(params) => <TextField {...params} label="Doença" />}
                            sx={{ width: 150 }}
                            value={deseases.find((option) => option.currentTarget?.getAttribute('data-option-index') === deseaseOption)}
                            /* onChange={async (option) => {
                                console.log('deseases');
                                const op = option.currentTarget.getAttribute('data-option-index');
                                console.log('option: ', op);

                                if (op !== deseaseOption) {
                                    setDesease(op);
                                    console.log('deseaseOption: ', deseaseOption);
                                }
                            }} */
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Autocomplete
                            id="state_select"
                            options={brStates}
                            autoComplete
                            includeInputInList
                            renderInput={(params) => <TextField {...params} label="Estado" />}
                            sx={{ width: 150 }}
                            value={deseases.find((option) => option.currentTarget?.getAttribute('data-option-index') === stateOption)}
                            /* onChange={async (option) => {
                                console.log('states');
                                const op = option.currentTarget.getAttribute('data-option-index');
                                console.log('option: ', op);

                                if (op !== stateOption) {
                                    setState(op);
                                    console.log('stateOption: ', stateOption);
                                }
                            }} */
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
