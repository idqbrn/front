/* eslint-disable react/destructuring-assignment */
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

// import PropTypes from 'prop-types';
import EditCellModal from './modals/EditCellModal';
import response from './response-test';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));

function EditModal(values) {
    const row = values.values;
    return EditCellModal(row);
}

export default function SearchTable(props) {
    /* SearchTable.propTypes = {
        // resposta: PropTypes.array.isRequired
    }; */
    // get table heading data
    const ThData = () => (
        <TableHead>
            <TableRow>
                <StyledTableCell align="center">Doença</StyledTableCell>
                <StyledTableCell align="center">Estado</StyledTableCell>
                <StyledTableCell align="center">Cidade</StyledTableCell>
                <StyledTableCell align="center">Total de casos</StyledTableCell>
                <StyledTableCell align="center">Edição</StyledTableCell>
            </TableRow>
        </TableHead>
    );
    // get table row data
    /* const tdData = () => {
        // console.log(props?.resposta);
        <TableBody>
            {response.resposta.map((row) => (
                <StyledTableRow key={(row.disease, row.state, row.city)}>
                    <StyledTableCell component="th" scope="row">
                        {row.disease}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.state}</StyledTableCell>
                    <StyledTableCell align="right">{row.city}</StyledTableCell>
                    <StyledTableCell align="right">{row.cases}</StyledTableCell>
                </StyledTableRow>
            ))}
        </TableBody>;
    }; */

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <ThData />
                <TableBody>
                    {props.values.map((row) => (
                        <StyledTableRow key={(row.disease_id, row.state, row.city)}>
                            <StyledTableCell align="center" component="th" scope="row">
                                {row.disease_id}
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.state}</StyledTableCell>
                            <StyledTableCell align="center">{row.city}</StyledTableCell>
                            <StyledTableCell align="center">{row.total}</StyledTableCell>
                            <StyledTableCell align="center">
                                <EditModal values={row} align="center" />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
