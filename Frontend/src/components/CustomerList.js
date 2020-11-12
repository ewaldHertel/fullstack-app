import React, {useEffect, useState} from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import {columns} from '../settings';


createTheme('solarized', {
    
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
});

const CustomerList = props => {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const data = props.rows;
        setRows(data);
    }, [props]);

    const handleDelete = (id) => {
        props.handleDelete(id);
    }

    const handleChange = (row) => {
        props.handleUpdate(row);
    }

    return (
        
        <div className="customerList">
            <DataTable
                columns={columns(handleChange, handleDelete)}
                theme="solarized"
                data={rows}
                onRowClicked={handleChange}
            />
        </div>
    )
}

export default CustomerList;
