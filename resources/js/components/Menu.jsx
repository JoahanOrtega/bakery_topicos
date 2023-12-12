import { Outlet, Link } from 'react-router-dom';
import Icon from './Icon';

import axios from "axios";

import React, { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';//token

function Menu() {
    const { logout } = useContext(AuthContext);//logout

    const [formValue, setFormValue] = useState(false);
    const [email, setEmail] = useState('');
    // const [navigate, setNavigate] = useState(false);
    const { auth } = useContext(AuthContext);//token

    const token = auth.token;//token
    console.log("token menu auth es la b" + token)

    const location = useLocation();//los importantes par  token
    // const token = location.state && location.state.token;//los importantes para token
    const [userInfo, setUserInfo] = useState(null);
    const [userData, setUserData] = useState({});//para el token
    const navigate = useNavigate();

    console.log("este es token en menu con auth " + token);

    const handleLogout = () => {
        // Llama a la función de logout para limpiar el token
        logout();
        alert("Se ha cerrado la sesión ")

        // Además, podrías redirigir al usuario a la página de inicio o a donde desees
        navigate("/"); // Asegúrate de importar 'navigate' desde 'react-router-dom'
    };



    useEffect(() => {
        if (token) {
            axios.get("http://localhost/bakery_topicos/public/api/user_index", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => setUserData(response.data))
                .catch(error => {
                    console.log("Error al obtener información del usuario: ", error);
                });
        }
    }, [token]);

    console.log("role" + userData.role);
    if (token != null) {
        if (userData.role === 1) {//cliente
            return (
                <>
                    <nav className="bg-pink-300">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Icon className="text-white font-cursiva "></Icon>
                                    <Link to={`/home?token=${token}`} className="text-white hover:bg-pink-600 hover:text-white px-3 py-3 rounded-md text-sm font-medium">
                                        Home
                                    </Link>
                                    <Link to={`/Cakes?token=${token}`} className="text-white hover:bg-pink-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pasteles</Link>
                                    <Link to={`/SellsAdmon?token=${token}`} className="text-white hover:bg-pink-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Ventas realizadas</Link>
                                </div>
                                <div>
                                    <div className="group relative">
                                        <span id="dropdownDefaultButton" className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-2 focus:ring-pink-500 focus:outline-none" type="button">
                                            Cliente: {userData.name}
                                            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                            </svg>
                                        </span>

                                        <div id="dropdown" className="z-10 absolute hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 group-hover:block">
                                            <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                                                <li>
                                                    <button onClick={handleLogout} className="text-gray-700 hover:bg-pink-100 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium">Cerrar Sesión</button>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>


                            </div>
                        </div>
                    </nav>
                    <section>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <Outlet>

                            </Outlet>
                        </div>
                    </section>
                </>
            );

        } else if (userData.role === 2) {
            return (
                <>
                    <nav className="bg-pink-300">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Icon className="text-white font-cursiva "></Icon>
                                    <Link to={`/home?token=${token}`} className="text-white hover:bg-pink-600 hover:text-white px-3 py-3 rounded-md text-sm font-medium">
                                        Home
                                    </Link><Link to="Cakes" className="text-white hover:bg-pink-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pasteles</Link>
                                    <Link to="CakesAdmon" className="text-white hover:bg-pink-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">CRUD Pasteles</Link>
                                    <Link to="IngredientsAdmon" className="text-white hover:bg-pink-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">CRUD Ingredientes</Link>
                                    <Link to="SellsAdmon" className="text-white hover:bg-pink-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Ventas realizadas</Link>
                                </div>
                                <div>
                                    <div className="group relative">
                                        <span id="dropdownDefaultButton" className="text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center focus:ring-2 focus:ring-pink-500 focus:outline-none" type="button">
                                            Administrador: {userData.name}
                                            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                            </svg>
                                        </span>

                                        <div id="dropdown" className="z-10 absolute hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 group-hover:block">
                                            <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                                                <li>
                                                    <button onClick={handleLogout} className="text-gray-700 hover:bg-pink-100 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium">Cerrar Sesión</button>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </nav>
                    <section>
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <Outlet>

                            </Outlet>
                        </div>
                    </section>
                </>
            );
        }
    } else {
        return (
            <>
                <nav className="bg-pink-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Icon className="text-white font-cursiva "></Icon>
                                <Link to="home" className="text-white hover:bg-pink-600 hover:text-white px-3 py-3 rounded-md text-sm font-medium">Home</Link>
                                <Link to="Cakes" className="text-white hover:bg-pink-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pasteles</Link>


                            </div>

                            <Link to="login" className="text-white hover:bg-pink-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Iniciar Sesion</Link>
                        </div>
                    </div>
                </nav>
                <section>
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <Outlet>

                        </Outlet>
                    </div>
                </section>
            </>
        )
    }


}

export default Menu
