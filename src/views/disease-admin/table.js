/* eslint-disable react/destructuring-assignment */
import { useState, Fragment, useEffect } from 'react';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

// icons imports
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// import PropTypes from 'prop-types';
import EditCellModal from './modals/EditCellModal';
// import { IconLetterA } from '@tabler/icons';
// import { legacy_createStore } from 'redux';

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

export default function DiseaseTable(props) {
    /* SearchTable.propTypes = {
        // resposta: PropTypes.array.isRequired
    }; */
    // get table heading data

    const [allExpanded, setAll] = useState(false);

    const TbHead = () => (
        <TableHead>
            <StyledTableRow>
                <StyledTableCell align="center">Doença</StyledTableCell>
                {/* <StyledTableCell align="center">Estado</StyledTableCell>
                {props.values[0]?.city != '' ? <StyledTableCell align="center">Cidade</StyledTableCell> : <></>}
                <StyledTableCell align="center">Total de casos</StyledTableCell> */}
                <StyledTableCell align="center" width="90">
                    <Button
                        align="center"
                        onClick={() => {
                            setAll(!allExpanded);
                        }}
                    >
                        {allExpanded ? 'Minimizar' : 'Expandir'}
                    </Button>
                </StyledTableCell>
                <StyledTableCell align="center" width="50">
                    Edição
                </StyledTableCell>
            </StyledTableRow>
        </TableHead>
    );

    function TbRow(props) {
        const { row, index } = props;
        const [open, setOpen] = useState(false);
        // if (allExpanded != open) setOpen(!open);

        return (
            <Fragment>
                {console.log('renreders?')}
                <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <StyledTableCell component="th" scope="row">
                        {row.name_id}
                    </StyledTableCell>
                    <StyledTableCell aligh="center" width="50">
                        <IconButton aria-label="expand row" size="medium" onClick={() => setOpen(!open)}>
                            {open || allExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </StyledTableCell>
                    <StyledTableCell align="center" width="50">
                        <EditModal values={row} align="center" />
                    </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                    <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open || allExpanded} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                {/* <Typography variant="h6" gutterBottom component="div">
                                    History
                                </Typography> */}
                                <Table size="small" aria-label="purchases">
                                    {/* <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Customer</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="right">Total price ($)</TableCell>
                                        </TableRow>
                                    </TableHead> */}
                                    <TableBody>
                                        {/* {row.history.map((historyRow) => (
                                            <TableRow key={historyRow.date}>
                                                <TableCell component="th" scope="row">
                                                    {historyRow.date}
                                                </TableCell>
                                                <TableCell>{historyRow.customerId}</TableCell>
                                                <TableCell align="right">{historyRow.amount}</TableCell>
                                                <TableCell align="right">{Math.round(historyRow.amount * row.price * 100) / 100}</TableCell>
                                            </TableRow>
                                        ))} */}
                                        <StyledTableRow>
                                            <StyledTableCell component="th" scope="row" width="200px">
                                                Descrição
                                            </StyledTableCell>
                                            <StyledTableCell>{row.description}</StyledTableCell>
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <StyledTableCell component="th" scope="row">
                                                Tratamento
                                            </StyledTableCell>
                                            <StyledTableCell>{row.treatments}</StyledTableCell>
                                        </StyledTableRow>
                                        <StyledTableRow>
                                            <StyledTableCell component="th" scope="row">
                                                Vetores
                                            </StyledTableCell>
                                            <StyledTableCell>{row.vector}</StyledTableCell>
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </StyledTableCell>
                </StyledTableRow>
            </Fragment>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TbHead />
                <TableBody>
                    {props.values.map((row, index) => (
                        <TbRow key={row.name_id} row={row} index={index} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
