import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export const columns = (handleUpdate, handleDelete) => [
    {
        selector: 'avatar',
        name: 'Avatar',
        width: 80,
        sortable: false,
        cell: (param) => 
            <div className="avatarCell">
                {param.avatar ?
                    <img className="avatar" src={param.avatar} alt="avatar" /> : ''
                }  
            </div>
        },
    {
        name: 'ID',
        selector: 'id',
        hide: true
    },
    {
        name: 'Vorname',
        selector: 'firstname',
        width: 100,
        sortable: true,
    },
    {
        name: 'Nachname',
        selector: 'lastname',
        width: 120,
        sortable: true,
    },
    {
        name: 'Anschrift',
        selector: 'street',
        width: 150,
    },
    {
        name: 'PLZ',
        selector: 'zip',
        width: 100,
        sortable: true,
    },
    {
        name: 'Ort',
        selector: 'city',
        width: 150,
    },
    {
        name: 'Geburtstag',
        selector: 'birthday',
        width: 150,
        sortable: true,
    },
    {
        name: 'Geburtsort',
        selector: 'birthplace',
        width: 150,
        sortable: true,
    },
    {
        name: 'Telefon',
        selector: 'phone',
        width: 150,
    },
    {
        name: 'E-Mail',
        selector: 'email',
        width: 150,
    },
    {
        selector: '',
        name: '',
        minWidth: 150,
        cell: (row) => <div>
                        <Button color="primary" onClick={() => handleUpdate(row)}>
                            <EditIcon/>
                        </Button>
                        <Button color="secondary" onClick={() => handleDelete(row.id)}>
                            <DeleteIcon/>
                        </Button>
                    </div>,
                    
        },
    ]
