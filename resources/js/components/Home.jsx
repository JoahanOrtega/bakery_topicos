import image from '../../Images/banner.jpg';

import axios from "axios";

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Outlet, Link } from 'react-router-dom';
import Icon from './Icon';




function Home() {
    const navigate = useNavigate();
    const location = useLocation();//los importantes par  token
    var token = location.state && location.state.token;//los importantes para token
    const queryParams = new URLSearchParams(location.search);;
     

    if (token === null) {
        console.log("entro"); 
        console.log("querry "+ queryParams);
        token = queryParams.get('token');
        console.log("entro token " + token);
    }
    const [userData, setUserData] = useState({});//para el token


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
    console.log("role en consumerinf" + userData.role);


    return (
        <>

            <div className="flex flex-col my-10 h-screen rounded-lg">

                <div className="w-full ">
                    <h1 className="text-2xl font-semibold ml-5">Nuestra Pasión por la Repostería</h1>
                    <p className='mx-5 my-10 text-justify'>
                        En SweetBakery, los pasteles son nuestra pasión. Cada delicia que llega a nuestra tienda es elaborada con amor y dedicación, garantizando la mejor calidad y sabor. Nuestro compromiso con la excelencia se refleja en cada bocado.
                    </p>
                </div>

                <div className="w-full">
                    <img src={image} alt="Cacke" className="w-full object-cover transition-opacity duration-500" />
                </div>
            </div>
        </>
    )
}
export default Home;
