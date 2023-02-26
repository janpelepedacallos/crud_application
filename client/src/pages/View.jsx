import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const View = () => {
    const [user, setUser] = useState({});
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then(response => setUser({...response.data[0]}));
    }, [id])

    return (
        <div className="view">
            <h1>View</h1>

            <div className="container">
                <h2>ID: </h2>
                <span>{id}</span>
                <br />
                
                <h2>Name: </h2>
                <span>{user.name}</span>
                <br />
                
                <h2>Email: </h2>
                <span>{user.email}</span>
                <br />
                
                <h2>Contact: </h2>
                <span>{user.contact}</span>
                <br />
                
                <Link to="/">
                    <button className="btn-edit-btn">
                        Go back
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default View;