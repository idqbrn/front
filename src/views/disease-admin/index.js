// material-ui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// other imports
import DiseaseTable from './table';
import OpenModal from './modals/OpenModal';
import url from '../utilities/backendUrl';

// ==============================|| SAMPLE PAGE ||============================== //

function DiseaseAdmin() {
    // const [tableData, setTableData] = useState([]);

    const [diseaseData, setData] = useState([]);
    const [reloadTableData, setReload] = useState(false);
    const reloadTable = () => setReload(!reloadTableData);

    useEffect(() => {
        console.log(url + '/diseaseInfo');
        // GET request using axios inside useEffect React hook
        const config = {
            method: 'get',
            url: url + '/diseaseInfo',
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
        axios(config).then((response) => {
            console.log('INFO TABLE RESPONSE.DATA:');
            console.log(response.data);
            setData(response.data);
            console.log('INFO TABLE -- ' + response.data);
        });

        // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [reloadTableData]);

    DiseaseTable.propTypes = {
        values: PropTypes.any.isRequired
    };

    return (
        <MainCard title="INFORMAÇÕES DAS DOENÇAS">
            <div style={{ display: 'flex', paddingBottom: 10, justifyContent: 'space-between' }}>
                <OpenModal value="Criar" />
                {/* <OpenModal value="Atualizar" />
                <OpenModal value="Deletar" /> */}
                <Button variant="contained" color="primary" onClick={reloadTable}>
                    Recarregar Tabela
                </Button>
            </div>
            <div style={{ display: 'flex', paddingBottom: 10, justifyContent: 'space-between' }}>
                <DiseaseTable id="search-table" values={diseaseData} />
            </div>
        </MainCard>
    );
}

export default DiseaseAdmin;
