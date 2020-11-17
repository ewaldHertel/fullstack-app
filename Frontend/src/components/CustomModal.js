import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { addCustomer, updateCustomer, uploadFile } from '../redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

const CustomModal = props => {
    const data = {
        id: '',
        firstname: '',
        lastname: '',
        street: '',
        zip: '',
        city: '',
        birthday: '',
        birthplace: '',
        phone: '',
        email: '',
        avatar: '',
    }
    const [file, setFile] = useState([]);
    const [customer, setCustomer] = useState({});

    useEffect(() => {
        if(props.customer.id) {
            setCustomer(props.customer);
            setFile({
                path: customer.avatar,
                preview: customer.avatar
            })
        }else {
            setCustomer(data);
        }
    }, [props]);

    const onChange = (e) => {
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [e.target.name]: e.target.value
        }));
    };

    const onFileChange = (e) => {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.onloadend = () => {
            setFile({
                path: file,
                preview: reader.result
            });
        }  
        reader.readAsDataURL(file)      
    };

    const handleSubmit = () => {
        let path = 'http://localhost:8000/public/';
        if(file.path !== customer.avatar && file.path) {
            props.uploadFile(file.path);
            props.customer.avatar = path + file.path.name;
        }

        if(customer.id !== '')
        {
            props.updateCustomer(customer);
        }else{
            props.addCustomer(customer);
        }
        
        props.modalEvent();
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="uiModal"
            open={props.open}
            onClose={props.modalEvent}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={props.open}>
            <div className="modalBody">
                <h2 id="transition-modal-title">{props.title}</h2>
                <form>
                    <div className="inp_row">
                    <TextField 
                        className="inp_5" 
                        name="firstname" 
                        label="Vorname" 
                        value={customer.firstname}
                        onChange={onChange}
                    />
                    <TextField 
                        className="inp_5" 
                        name="lastname" 
                        label="Nachname"
                        value={customer.lastname}
                        onChange={onChange} 
                    />
                    </div>
                    <div className="inp_row">
                    <TextField 
                        className="inp_10" 
                        name="street" 
                        label="Anschrift"
                        value={customer.street}
                        onChange={onChange} 
                    />
                    </div>
                    <div className="inp_row">
                    <TextField 
                        className="inp_3" 
                        name="zip" 
                        label="PLZ"
                        value={customer.zip}
                        onChange={onChange} 
                    />
                    <TextField 
                        className="inp_7" 
                        name="city" 
                        label="Ort"
                        value={customer.city}
                        onChange={onChange} 
                    />
                    </div>
                    <div className="inp_row">
                    <TextField 
                        className="inp_5" 
                        name="birthplace" 
                        label="Geburtsort"
                        value={customer.birthplace}
                        onChange={onChange} 
                    />
                    <TextField 
                        className="inp_5" 
                        name="birthday" 
                        label="Geburtsdatum" 
                        type="date"
                        value={customer.birthday}
                        onChange={onChange} 
                    />
                    </div>
                    <div className="inp_row">
                    <TextField 
                        className="inp_5" 
                        name="phone" 
                        label="Telefon" 
                        type="tel"
                        value={customer.phone}
                        onChange={onChange} 
                    />
                    <TextField 
                        className="inp_5" 
                        name="email" 
                        label="E-Mail" 
                        type="email"
                        value={customer.email}
                        onChange={onChange} 
                    />
                    </div>
                    <div className="inp_row">
                    <TextField 
                        className="inp_10" 
                        name="avatar" 
                        label="Avatar"
                        type="file"
                        onChange={onFileChange} 
                    />
                    </div>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        onClick={handleSubmit}
                        startIcon={<SaveIcon />} 
                    >
                        Speichern
                    </Button>
                </form>
                <div className="thumbContainer">
                    <div className="thumb">
                        <img src={file.preview} alt="avatar" className="preview" />
                    </div>
                    
                </div>
            </div>
            </Fade>
        </Modal>
    )
}

export default connect(null, { addCustomer, updateCustomer, uploadFile })(CustomModal)
