import PrimaryButton from '../../components/PrimaryButton'
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../components/AuthProvider';//token
import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";


function ViewCake() {
    const location = useLocation();
    const navigate = useNavigate();
    const { id, name, stock, favlors, size, type, Available, image, price } = location.state;
    const { auth } = useContext(AuthContext);//token
    const token = auth.token;//token
    console.log("id en viw nuevo" + id);

    console.log("token en ventas " + token);
    const [userData, setUserData] = useState({});
    const handleButtonClick = () => {
        navigate(-1);
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


    console.log("usuario", userData && userData.name);
    const ButtonBuy = async e => {
        if (token) {
            if (e && e.preventDefault()) e.preventDefault();
            const formData = new FormData();
            formData.append("Id_foreign_key", userData.id);
            formData.append("Id_foreign_keycakes", id);
            formData.append("amount", price);

            const response = await axios.post("http://localhost/bakery_topicos/public/api/createV",//aqui pon el link que tu tienes
                formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
            ).then(response => {
                console.log("Compra hecha", response);

                // console.log(response);

                console.log("usuario" + userData.name);
                console.log("id-usuario_fk", userData.id, "id_Cake_fk", id, "monto", price);
                alert("Compra hecha");

                const responsedisp = axios.post(`http://localhost/bakery_topicos/public/api/disable/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Accept: "application/json",
                            'Authorization': `Bearer ${token}`
                        }

                    }
                );

                navigate("/home");//desde el nombre

            }).catch(error => {
                console.log("error en la compra", error);
                alert("error en la compra  ");

            });

        } else {
            navigate("/login");
        }

    };
    return (
        <div className=''>
            <div className="Container flex mt-5">
                <div className="w-3/4">
                    {console.log(image)}
                    <img className="rounded-t-lg" src={'http://localhost/bakery_topicos/public/storage/' + image} alt="" />
                </div>
                <div className="w-1/4 pl-3 mr-2">
                    <div className='border border-gray-300 mx-10 h-auto w-full'>
                        <h1 className='m-3 font-bold text-xl'>{name}</h1>
                    </div>

                    <div className='border border-gray-300 mx-10 h-auto w-full mt-5'>
                        <h1 className='m-3 font-bold text-xl'>$ {price}</h1>
                    </div>

                    <div className='border border-gray-300 mx-10 h-auto w-full mt-5'>
                        <h1 className='m-3 font-bold text-xl'>Tamaño:</h1>
                        <p className='m-3'>{size}</p>
                    </div>

                    <div className='border border-gray-300 mx-10 h-auto w-full mt-5'>
                        <h1 className='m-3 font-bold text-xl'>Sabor</h1>
                        <p className='m-3'>{favlors}</p>
                    </div>

                    <div className='border border-gray-300 mx-10 h-auto w-full mt-5'>
                        <h1 className='m-3 font-bold text-xl'>Stock</h1>
                        <p className='m-3'>{stock}</p>
                    </div>

                    <div className='border border-gray-300 mx-10 h-auto w-full'>
                        <PrimaryButton onClick={ButtonBuy} className='w-full mt-5'>Comprar pastel</PrimaryButton>
                        <PrimaryButton onClick={handleButtonClick} className='w-full mt-5 bg-red-500 hover:bg-red-600'>Regresar</PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ViewCake
