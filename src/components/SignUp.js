import React,{useState} from 'react'
import {useNavigate} from 'react-router'

export const SignUp = (props) => {
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", cpassword:""}) 
    let history = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        console.log(json);
        if (json.success){
        //  Save the auth token and redirect
            localStorage.setItem('token', json.authToken); 
            history("/home");
            props.showAlert(`Account created successfully ${name}`,"success");
        }
        else{
            props.showAlert("Invalid credentials", "danger");
        }
    }


    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="container mt-5">
        <h2 className="mb-4"> Register to access NoteBook</h2>
            <form onSubmit = {handleSubmit} className = "container">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name = "name" id="name" aria-describedby="name" onChange = {onChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name = "email" id="email" aria-describedby="emailHelp" onChange = {onChange} required/>
                    <div id="emailHelp" className="form-text ms-2">*We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name = "password" id="password" onChange = {onChange} minLength ={6} required/>
                    <div id="passwordHelp" className="form-text ms-2">*Password must contain a Number, Uppercase, Lowercase and special some Characters.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name = "cpassword" id="cpassword" onChange = {onChange} minLength ={6} required/>
                </div>
                <button type="submit" className="btn btn-primary ms-3">Sign up</button>
            </form>
        </div>
    )
}
