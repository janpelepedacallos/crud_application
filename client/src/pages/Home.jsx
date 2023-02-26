import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Pages-Style/home.css'
import { toast } from 'react-toastify';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState([]);
    
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = id => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            axios.delete(`http://localhost:5000/api/remove/${id}`);
            toast.success("Contact Deleted Successfuly", {
                autoClose: 500
            });

            setTimeout(() => {
                loadData();
            }, 1500);
        }
    }

    return (
        <div className="home"> 
            <div className="home-container">
                <Link to="/addContact">
                    <button className="btn contact-btn">Add Contact</button>
                </Link>

                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item, index) => {
                            return (
                                <tr key={item.id}>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.contact}</td>

                                    <td className="row-btn">
                                        <Link to={`/update/${item.id}`}>
                                            <button className="btn edit-btn">Edit</button>
                                        </Link>
                                        <button className="btn delete-btn" onClick={() => deleteContact(item.id)}>Delete</button>
                                        <Link to={`/view/${item.id}`}>
                                            <button className="btn view-btn">View</button>
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;