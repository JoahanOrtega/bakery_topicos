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
    const { id, name, stock, flavors, size, image, price } = location.state;
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
            <div className="Container flex flex-col mt-5">
                <div className="w-full px-3">
                    <div className='bg-white rounded-lg shadow-md mx-10 my-5 p-6'>
                        <h1 className='font-bold text-xl mb-4 text-center'>{name}</h1>
                        <div className="w-full">
                            {console.log(image)}
                            <img className="rounded-lg shadow-lg mx-auto" src={'http://localhost/bakery_topicos/public/storage/' + image} alt="" />
                        </div>
                        <p className='text-lg mb-2'><strong>Precio:</strong> $ {price}</p>
                        <p className='text-lg mb-2'><strong>Tamaño:</strong> {size}</p>
                        <p className='text-lg mb-2'><strong>Sabor:</strong> {flavors}</p>
                        <p className='text-lg mb-2'><strong>Stock:</strong> {stock}</p>
                        <button onClick={ButtonBuy} className="w-full py-3 mt-5 bg-pink-500 hover:bg-pink-600 text-white rounded">Comprar pastel</button>
                        <button onClick={handleButtonClick} className='w-full py-3 mt-5 bg-gray-300 hover:bg-gray-400 rounded'>Regresar</button>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ViewCake
