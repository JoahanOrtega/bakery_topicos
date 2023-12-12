import TextInput from "../../components/TextInput"
import InputLabel from "../../components/Inputlabel"
import PrimaryButton from "../../components/PrimaryButton"
// import SelectInput from "../../components/InputSelect"
import BackIcon from "../../../Images/Icons/Back.png"
import LinktoButton from "../../components/LinktoButton"
// import FileInput from "../../components/Fileinput"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
// import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from "../../components/AuthProvider"

const ModifyCake = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cake = location.state;
    const { auth } = useContext(AuthContext);//token

    const token = auth.token;//token
    const [formValue, setFormValue] = useState({
        name: cake.name,
        stock: cake.stock,
        flavors: cake.flavors,
        size: cake.size,
        type: cake.type,
        price: cake.price,
        Available: cake.Available,
        // Image: car.Image
    });


    const onChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        if (e && e.preventDefault()) e.preventDefault();

        const formData = new FormData();
        // formData.append("Id_Brand_fk", formValue.Id_Brand_fk);
        formData.append("name", formValue.name);
        formData.append("stock", formValue.stock);
        formData.append("flavors", formValue.flavors);
        formData.append("size", formValue.size);
        formData.append("type", formValue.type);
        formData.append("Available", formValue.Available);
        formData.append("Image", e.target.elements.Image.files[0]); // Adjunta el archivo
        formData.append("price", formValue.price);

        console.log('lo que estoy guardando en la imagen x2 ' + e.target.elements.Image.files[0]);

        try {
            const response = await axios.post(`http://localhost/bakery_topicos/public/api/Updatecake/${cake.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Accept: "application/json",
                        'Authorization': `Bearer ${token}`
                    }

                }
            );
            console.log("Registration successful!", response.data);
            navigate("/CakesAdmon");//desde el nombre
        } catch (error) {
            if (error.response) {
                // El servidor respondió con un estado fuera del rango de 2xx
                console.log("Error en la respuesta del servidor: ", error.response.data);
                alert("Error: " + error.response.data.message);
            } else if (error.request) {
                // La solicitud fue hecha pero no se recibió respuesta
                console.log("La solicitud fue hecha pero no se recibió respuesta", error.request);
            } else {
                // Algo sucedió al configurar la petición que generó un Error
                console.log('Error', error.message);
            }
        }
    };

    return (
        <>
            <div className="Container my-12">
                <h1 className="text-xl text-center">Agregar pastel</h1>
                <div className="flex justify-center items-center">

                    <form onSubmit={handleSubmit} style={{ width: '50%', maxWidth: '500px' }} encType="multipart/form-data">
                        {/*
                        <div className="mt-4 mb-4">
                            <InputLabel htmlFor="Id_marca_fk" value="Marca del auto" />

                            <select value={formValue.Id_Brand_fk} onChange={onChange} id="Id_Brand_fk" name="Id_Brand_fk" className="mt-1 block w-full p-2 border border-black">
                                <option value="0">Selecciona una marca</option>
                                {brands.map(brand => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.Desc}
                                    </option>
                                ))}
                            </select>

                        </div> */}

                        <select value={formValue.Available} onChange={onChange} id="Available" name="Available" className="mt-1 block w-full p-2 border border-black">
                            <option value="00">Disponibilidad del carro</option>
                            <option value="1">Disponible</option>
                            <option value="0">No disponible</option>
                        </select>
                        <div className="mt-4 mb-4" >
                            <InputLabel htmlFor="name" value="Nombre del producto" />
                            <TextInput value={formValue.name} onChange={onChange} id="name" type="text" name="name" className="mt-1 block w-full p-2 border border-black" required />
                        </div>

                        <div className="mt-4 mb-4" >
                            <InputLabel htmlFor="stock" value="Stock del producto" />
                            <TextInput min="1" value={formValue.stock} onChange={onChange} id="stock" type="number" name="stock" className="mt-1 block w-full p-2 border border-black" required />
                        </div>

                        <div className="mt-4 mb-4" >
                            <InputLabel htmlFor="flavors" value="Sabor" />
                            <TextInput value={formValue.flavors} onChange={onChange} id="flavors" type="text" name="flavors" className="mt-1 block w-full p-2 border border-black" required />
                        </div>

                        <div className="mt-4 mb-4" >
                            <InputLabel htmlFor="size" value="Tamaño" />
                            <TextInput value={formValue.size} onChange={onChange} id="size" type="text" name="size" className="mt-1 block w-full p-2 border border-black" required />
                        </div>

                        <div className="mt-4 mb-4" >
                            <InputLabel htmlFor="type" value="Tipo de postre" />
                            <TextInput value={formValue.type} onChange={onChange} id="type" type="text" name="type" className="mt-1 block w-full p-2 border border-black" required />
                        </div>
                        {/* <div className="mt-4 mb-4" >
                            <InputLabel htmlFor="version" value="Versión" />
                            <TextInput value={formValue.version} onChange={onChange} id="version" type="text" name="version" className="mt-1 block w-full p-2 border border-black" required />
                        </div>
                        <div className="mt-4 mb-4" >
                            <InputLabel htmlFor="TM" value="Tipo de transmisión" />
                            <TextInput value={formValue.TM} onChange={onChange} id="TM" type="text" name="TM" className="mt-1 block w-full p-2 border border-black" required />
                        </div>
                        <div className="mt-4 mb-4" >
                            <InputLabel htmlFor="liters" value="Capacidad de litros" />
                            <TextInput value={formValue.liters} onChange={onChange} id="liters" type="number" name="liters" className="mt-1 block w-full p-2 border border-black" required />
                        </div> */}

                        <div className="mt-4 mb-4" >
                            <InputLabel htmlFor="price" value="Costo del producto" />
                            <TextInput value={formValue.price} onChange={onChange} id="price" type="number" name="price" className="mt-1 block w-full p-2 border border-black" required />
                        </div>

                        <div className="mt-4 mb-4">
                            <InputLabel htmlFor="Image" value="Subir imagen." />
                            <input value={formValue.Image} onChange={onChange} id="Image" name="Image" className="mt-1 block w-full p-2 border border-black" type="file" />
                        </div>

                        <div className="">
                            <PrimaryButton className="w-full">Registrar</PrimaryButton>

                            <LinktoButton to="/CakesAdmon" className="my-3 w-full bg-red-700 text-black">
                                Regresar
                                <img src={BackIcon} alt="" className="ml-2 w-4 h-4" />
                            </LinktoButton>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};

export default ModifyCake;
