import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import './Pages-Style/add-contact.css'

const initialState = {
    name: "",
    email: "",
    contact: ""
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const {name, email, contact} = state;
    const navigate = useNavigate();
    const {id} = useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then(response => {
            setState({...response.data[0]})
        })
    }, [id])
    
    const handleSubmit = e => {
        e.preventDefault();

        if(!name || !email || !contact) {
            toast.error("Please provide values in each input field!")
        } else {
            if (!id) {
                axios.post("http://localhost:5000/api/post", {
                    name,
                    email,
                    contact
                })
                .then(() => {
                    setState({name: "", email: "", contact: ""})
                })
                .catch(err => toast.error(err.response.data));
     
                toast.success("Contact Successfully Added!", {
                    autoClose: 500
                })
    
                setTimeout(() => {
                    navigate("/")
                }, 1500);
            } else {
                axios.put(`http://localhost:5000/api/update/${id}`, {
                    name,
                    email,
                    contact
                })
                .then(() => {
                    setState({name: "", email: "", contact: ""})
                })
                .catch(err => toast.error(err.response.data));
     
                toast.success("Contact Updated Successfully!!", {
                    autoClose: 500
                })
    
                setTimeout(() => {
                    navigate("/")
                }, 1500);
            }
            
        }
    }

    const handleInput = e => {
        const {name, value} = e.target;
        setState({...state, [name]: value});
    };

    return (
        <div className="add-edit">
            <div className="add-container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Enter your name..." value={name || ""} onChange={handleInput} />
                    
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Enter your email..." value={email || ""} onChange={handleInput} />
                    
                    <label htmlFor="contact">Contact</label>
                    <input type="number" id="contact" name="contact" placeholder="Enter your contact..." value={contact || ""} onChange={handleInput} />
            
                    <div className="contact-buttons">
                        <input type="submit" className="submit-btn" value={id ? "Update" : "Save"} />
                        <Link to="/">
                            <input type="button" className="back-btn" value="Go Back" />
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddEdit;