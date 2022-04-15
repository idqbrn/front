// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

function Admin() {
    /* const [deseaseOption, setDesease] = useState(deseases[0]);
    const [stateOption, setState] = useState(brStates[0]); */
    const [deseaseOption] = useState(deseases[0]);
    const [stateOption] = useState(brStates[0]);
    return (
        <MainCard title="DADOS SANITÁRIOS">
            <div style={{ display: 'flex', paddingBottom: 10, justifyContent: 'space-between' }}>
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
                <div style={{ display: 'flex' }}>
                    <Button variant="contained" color="primary">
                        Criar
                    </Button>
                    <Button variant="contained" color="primary">
                        Atualizar
                    </Button>
                    <Button variant="contained" color="primary">
                        Deletar
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
