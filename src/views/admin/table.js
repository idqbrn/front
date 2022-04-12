import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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

function createData([desease, state, city, cases]) {
    return { desease, state, city, cases };
}

const rows = [
    createData(['Frozen yoghurt', 159, 6.0, 24]),
    createData(['Ice cream sandwich', 237, 9.0, 37]),
    createData(['Eclair', 262, 16.0, 24]),
    createData(['Cupcake', 305, 3.7, 67]),
    createData(['Gingerbread', 356, 16.0, 49])
];

export default function SearchTable() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Doença</StyledTableCell>
                        <StyledTableCell align="right">Estado</StyledTableCell>
                        <StyledTableCell align="right">Cidade</StyledTableCell>
                        <StyledTableCell align="right">Número de casos</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.desease}>
                            <StyledTableCell component="th" scope="row">
                                {row.desease}
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
