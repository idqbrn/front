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

// ==============================|| SAMPLE PAGE ||============================== //

function Admin() {
    /* const [diseaseOption, setDesease] = useState(diseases[0]);
    const [stateOption, setState] = useState(brStates[0]); */
    const [diseaseOption] = useState(diseases[0]);
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
                            id="disease_select"
                            options={diseases}
                            autoComplete
                            includeInputInList
                            renderInput={(params) => <TextField {...params} label="Doença" />}
                            sx={{ width: 150 }}
                            value={diseases.find((option) => option.currentTarget?.getAttribute('data-option-index') === diseaseOption)}
                            /* onChange={async (option) => {
                                console.log('diseases');
                                const op = option.currentTarget.getAttribute('data-option-index');
                                console.log('option: ', op);

                                if (op !== diseaseOption) {
                                    setDesease(op);
                                    console.log('diseaseOption: ', diseaseOption);
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
                            value={diseases.find((option) => option.currentTarget?.getAttribute('data-option-index') === stateOption)}
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
