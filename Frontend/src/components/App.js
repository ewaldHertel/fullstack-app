import React, {useState, useEffect, Fragment} from 'react';
import { connect } from "react-redux";
import {getCustomers, deleteCustomer} from '../redux';
import Footer from './Layout/Footer';
import CustomModal from './CustomModal';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import CustomerList from './CustomerList';

const App = ({customers, getCustomers}) => {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState([]);

    useEffect(() => {
        getCustomers();
    }, [])

    const handleUpdate = (props) => {
        if(props) {
            setCustomer(props);
            setOpen(!open);
        }
    }

    const handleDelete = (id) => {
        deleteCustomer(id);
    }

    const handleOpen = () => {
        setCustomer([]);
        setOpen(!open);
    }

    const handleClose = () => {
        setOpen(!open);
    }
    return (
        <Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className="appBar">
                <Toolbar className="toolbar">
                <Typography variant="h6" color="inherit" noWrap>
                    Kunden-Manager
                </Typography>
                </Toolbar>
            </AppBar>
            <main className="wrapper">
                <Paper className="paper">
                    <Button 
                        className="addButton"
                        onClick={handleOpen}
                        >
                        <AddIcon/>
                    </Button>
                    
                    <CustomerList 
                        rows={customers}
                        handleUpdate={handleUpdate} 
                        handleDelete={handleDelete}
                    />
                </Paper>
                <CustomModal 
                    open={open} 
                    modalEvent={handleClose} 
                    customer={customer} 
                    title="Kunde hinzufügen"
                />
                <Footer />
            </main>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        customers: state.customers.customers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getCustomers: () => dispatch(getCustomers())
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
