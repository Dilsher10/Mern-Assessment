import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const Update = () => {


    // Read

    const [inputUser, setInputUser] = useState({
        name: "",
        email: "",
        mobile: "",
    });

    const { id } = useParams();

    const fetchSingleUser = async () => {
        const res = await axios.get(`http://localhost:5000/read/${id}`);
        setInputUser({
            name: res.data.name,
            email: res.data.email,
            mobile: res.data.mobile,
        })
    }
    useEffect(() => {
        fetchSingleUser();
    }, []);



    const handleChange = (e) => {
        setInputUser({
            ...inputUser,
            [e.target.name]: e.target.value,
        });
    };



    // On Submit

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = await axios.put(`http://localhost:5000/update/${id}`, inputUser);
        if (data.data.success) {
            alert(data.data.message);
            window.location = "/";
        }
    };



    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <input type="text" className='form-control' name='name' placeholder='name' value={inputUser.name} onChange={handleChange} />
                <input type="email" className='form-control' name='email' placeholder='email' value={inputUser.email} onChange={handleChange}/>
                <input type="text" className='form-control' name='mobile' placeholder='mobile' value={inputUser.mobile} onChange={handleChange}/>
                <button type="submit" className='btn btn-primary'>Save</button>
            </form>
        </div>
    )
}

export default Update