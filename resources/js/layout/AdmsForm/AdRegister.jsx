import TextInput from "../../components/TextInput";
import InputLabel from "../../components/Inputlabel";
import PrimaryButton from "../../components/PrimaryButton";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";


import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider";

function Register() {


    const { setAuth } = useContext(AuthContext);




    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({

    });
    const [token, setToken] = useState(null);//token


    const onChange = (e) => {
        e.persist();
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    }

    const handleSubmit = async e => {
        if (e && e.preventDefault()) e.preventDefault();
        const formData = new FormData();
        formData.append("name", formValue.name);
        formData.append("email", formValue.email);
        formData.append("password", formValue.password);
        formData.append("password_confirmation", formValue.password_confirmation);
        formData.append("role", 2);


        const response = await axios.post("http://localhost/bakery_topicos/public/api/register",//aqui pon el link que tu tienes
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(response => {
                console.log("Registration successful. Response: ", response);

                // console.log(response);
                const token = response.data.token;//valor del token
                setToken(token);
                setAuth({ token });//este sirve
                console.log("tokem: " + token);


                navigate("/ConsumerInf", { state: { token } });//desde el nombre

            }).catch(error => {
                console.log("Error during registration: ", error);
                console.log("Error details: ", error.response);
                alert("Error al crear la cuenta ");
            });


    };

    return (
        <div className="flex justify-center items-center mt-12">
            <form onSubmit={handleSubmit} style={{ width: '50%', maxWidth: '500px' }}>
                <div className="mt-4 mb-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput value={formValue.email} onChange={onChange} id="email" type="text" name="email" className="mt-1 block w-full p-2 border rounded border-pink-500" autoComplete="username" required />
                </div>
    
                <div className="mt-4 mb-4">
                    <InputLabel htmlFor="Name" value="Nombre" />
                    <TextInput value={formValue.name} onChange={onChange} id="name" type="text" name="name" className="mt-1 block w-full p-2 border rounded border-pink-500" required />
                </div>
    
                <div className="mt-4 mb-4">
                    <InputLabel htmlFor="Password" value="Password" />
                    <TextInput value={formValue.password} onChange={onChange} id="password" type="password" name="password" className="mt-1 block w-full p-2 border rounded border-pink-500" required />
                </div>
    
                <div className="mt-4 mb-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                    <TextInput value={formValue.password_confirmation} onChange={onChange} id="password_confirmation" type="password" name="password_confirmation" className="mt-1 block w-full p-2 border rounded border-pink-500" required />
                </div>
    
                <div className="flex flex-col gap-3">
                    <PrimaryButton className="w-full bg-pink-500 hover:bg-pink-600 text-white rounded">Registrarse</PrimaryButton>
    
                    <Link to="/login">
                        <PrimaryButton className="bg-pink-700 hover:bg-pink-800 w-full text-white rounded">Regresar</PrimaryButton>
                    </Link>
    
                    <Link to="/login" className="text-center text-pink-500 hover:text-pink-600">¿Ya tienes cuenta? Inicia sesión aquí</Link>
                </div>
            </form>
        </div>
    );
    
}

export default Register;
