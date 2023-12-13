import Plusicon from "../../../Images/Icons/add.png"
import LinktoButton from "../../components/LinktoButton"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useContext } from 'react';
import { AuthContext } from "../../components/AuthProvider";

function IngredientsAdmon() {
    const [cakes, setCakes] = useState([]);
    const { auth } = useContext(AuthContext);//token
    const [search, setSearch] = useState('');

    const handleSearchChange = (e) => {
        setSearch(e.target.value); // Actualiza el estado del término de búsqueda
    };

    const filteredCakes = cakes.filter(cake =>
        cake.Desc.toLowerCase().includes(search.toLowerCase())
    );

    const token = auth.token;//token
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost/bakery_topicos/public/api/Ingredients_index', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            setCakes(result.data);

        };
        fetchData();
    }, []);

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold text-pink-600">Panel de Administración de Ingredientes</h1>
                <div className="my-4">
                    <input
                        type="text"
                        placeholder="Buscar por marca..."
                        value={search}
                        onChange={handleSearchChange}
                        className="w-full p-2 border rounded border-pink-500"
                    />
                </div>
                <LinktoButton to="/CreateBrands" className="inline-flex items-center bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-200 ease-in-out">
                    Crear registro
                    <img src={Plusicon} alt="" className="ml-2 w-4 h-4" />
                </LinktoButton>
                <div className="flex flex-col mt-5">
                    <div className="overflow-x-auto">
                        <div className="align-middle inline-block min-w-full">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-pink-100">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-700 px-6 py-4 text-center">
                                                ID
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-700 px-6 py-4 text-center">
                                                Ingrediente
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredCakes.map((cake) => (
                                            <tr key={cake.id} className="bg-gray-100 border-b text-center">
                                                <td className="text-sm text-gray-900 px-6 py-4 text-center">{cake.id}</td>
                                                <td className="text-sm text-gray-900 px-6 py-4 text-center">{cake.Desc}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default IngredientsAdmon;
