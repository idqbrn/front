/* eslint-disable react/destructuring-assignment */
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import PropTypes from 'prop-types';

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

export default function SearchTable() {
    /* SearchTable.propTypes = {
        // resposta: PropTypes.array.isRequired
    }; */
    // get table heading data
    const ThData = () => (
        <TableHead>
            <TableRow>
                <StyledTableCell>Doença</StyledTableCell>
                <StyledTableCell align="right">Estado</StyledTableCell>
                <StyledTableCell align="right">Cidade</StyledTableCell>
                <StyledTableCell align="right">Total de casos</StyledTableCell>
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
                </TableBody>
            </Table>
        </TableContainer>
    );
}
