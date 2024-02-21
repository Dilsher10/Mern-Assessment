import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Home = () => {

    // On Change

    const [inputUser, setInputUser] = useState({
        name: "",
        email: "",
        mobile: "",
    })

    const handleChange = (e) => {
        setInputUser({
            ...inputUser,
            [e.target.name]: e.target.value,
        });
    };



    // On Submit

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await axios.post("http://localhost:5000/create", inputUser);
        if (data.status === 200) {
            fetchAllUser();
        }
        event.target.reset();
    };




    // Read

    const [userData, setUserData] = useState([]);

    const fetchAllUser = async () => {
        const res = await axios.get('http://localhost:5000/');
        console.log(res);
        setUserData(res.data);
    }
    useEffect(() => {
        fetchAllUser();
    }, []);




    // Delete 

    const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:5000/delete/${id}`);
        if (res.status === 200) {
            fetchAllUser();
        }
    };


    return (
        <>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1>Add User</h1>
                    <input type="text" className='form-control' name='name' placeholder='Enter Name' onChange={handleChange} />
                    <input type="email" className='form-control' name='email' placeholder='Enter Email' onChange={handleChange} />
                    <input type="text" className='form-control' name='mobile' placeholder='Enter Number' onChange={handleChange} />
                    <button type="submit" className='btn btn-primary'>Add</button>
                </form>
            </div>

            <div className="container">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">S.No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userData.map((item, i) => (
                                <tr>
                                    <th scope="row">{i + 1}</th>
                                    <td>{item?.name}</td>
                                    <td>{item?.email}</td>
                                    <td>{item?.mobile}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item?._id)} className="btn btn-danger">Delete</button>
                                        <NavLink className='btn btn-success' to={`/update/${item._id}`}>Edit</NavLink>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Home;