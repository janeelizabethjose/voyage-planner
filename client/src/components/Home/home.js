import React, {useState, useRef} from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../../global';
import { theme } from '../Themes/theme';

import { useOnClickOutside } from '../../hooks';
import Burger from '../Burger/burger';
import Menu from '../Menu/menu';
import FocusLock from 'react-focus-lock';

import Link from '@material-ui/core/Link';
import VisibilityIcon from '@material-ui/icons/Visibility';

//table start
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  function createData(name, startDate, endDate, destination, actions) {
    return { name, startDate, endDate, destination, actions };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 'View'),
    createData('Ice cream sandwich', 237, 9.0, 37, 'View'),
    createData('Eclair', 262, 16.0, 24, 'View'),
    createData('Cupcake', 305, 3.7, 67,'View'),
    createData('Gingerbread', 356, 16.0, 49, 'View'),
  ];
  
  const useStyles = makeStyles({
    table: {
      minWidth: 800,
    },
  });
//table end

function Home() {
    const [open, setOpen] = useState(false);
    const node = useRef();
    const menuId = "main-menu";

    useOnClickOutside(node, () => setOpen(false));
    //table start
    const classes = useStyles();
    //table end
    return(
        <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Burger></Burger>
        <div ref={node}>
          <FocusLock disabled={!open}>
            <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
            <Menu open={open} setOpen={setOpen} id={menuId} />
          </FocusLock>
        </div>
        <div>
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                    <StyledTableCell>Trip Name</StyledTableCell>
                    <StyledTableCell align="right">Start Date</StyledTableCell>
                    <StyledTableCell align="right">End Date</StyledTableCell>
                    <StyledTableCell align="right">Destination</StyledTableCell>                    
                    <StyledTableCell align="right">Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                        {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.startDate}</StyledTableCell>
                        <StyledTableCell align="right">{row.endDate}</StyledTableCell>
                        <StyledTableCell align="right">{row.destination}</StyledTableCell>
                        <StyledTableCell align="right"><Link
                            component="button"
                            variant="body2"
                            onClick={() => {
                                console.info("I'm a button.");
                            }}
                            ><VisibilityIcon/>
                            </Link>
                        </StyledTableCell>
                    </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
        
      </>
    </ThemeProvider>
    )
}

export default Home;