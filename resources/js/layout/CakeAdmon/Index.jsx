import PrimaryButton from "../../components/PrimaryButton"
import Plusicon from "../../../Images/Icons/add.png"
import DeleteIcon from "../../../Images/Icons/delete.png"
import EditIcon from "../../../Images/Icons/edit.png"
import LinktoButton from "../../components/LinktoButton"
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useContext } from 'react';
import { AuthContext } from "../../components/AuthProvider"


function CakesAdmon() {
    const [cakes, setCakes] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCakes, setFilteredCakes] = useState(cakes);
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);//token
    const token = auth.token;//token

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('http://localhost/bakery_topicos/public/api/cake_indexadm', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCakes(result.data);
            setFilteredCakes(result.data);
        };
        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        filterCakes(e.target.value);
    };

    const filterCakes = (searchValue) => {
        const filtered = cakes.filter(cake =>
            cake.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredCakes(filtered);
    };

    const deleteCake = (id) => {
        axios.post(`http://localhost/bakery_topicos/public/api/cake/${id}/delete`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setCakes(cakes.filter(cake => cake.id !== id));
                setFilteredCakes(filteredCakes.filter(cake => cake.id !== id));
            })
            .catch(error => {
                console.error('Error obteniendo la data', error);
            });
    };

    const handleModifyClick = (cake) => {
        navigate('/ModifyCake', { state: cake })
    };

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold text-pink-600">Panel de Administración de Pasteles</h1>
                <input
                    type="text"
                    placeholder="Buscar por modelo"
                    value={search}
                    onChange={handleSearchChange}
                    className="mt-1 block w-full p-2 border rounded border-pink-500"
                />


                <LinktoButton to="/CreateCakes" className="inline-flex items-center my-3 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition duration-200 ease-in-out">
                    Crear
                </LinktoButton>
                <div className="flex flex-col mt-5">
                    <div className="overflow-x-auto">
                        <div className="align-middle inline-block min-w-full">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-pink-100">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                                ID
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                                Ingredientes
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                                Nombre
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 ">
                                                Stock
                                            </th>

                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 ">
                                                Tipo
                                            </th>

                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 ">
                                                Tamaño
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 ">
                                                Sabor
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 ">
                                                Precio
                                            </th>
                                            <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4" colspan="2">
                                                ACCIONES
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredCakes.map((cake) => (
                                            <tr key={cake.id} className="bg-gray-100 border-b text-center">
                                                <td className="text-sm px-6 py-4 whitespace-nowrap text-gray-900">{cake.id}</td>
                                                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                    {cake.ingredients ? cake.ingredients.Desc : ''}
                                                </td>
                                                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">{cake.name}</td>
                                                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">{cake.stock}</td>
                                                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">{cake.type}</td>
                                                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">{cake.size}</td>
                                                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">{cake.flavors}</td>
                                                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">{cake.price}</td>

                                                <td>
                                                    <PrimaryButton onClick={() => handleModifyClick(cake)} className="bg-gray-600 text-black">
                                                        Editar
                                                    </PrimaryButton>
                                                </td>
                                                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                    <PrimaryButton className="bg-gray-600 text-black" onClick={() => deleteCake(cake.id)}>
                                                        Eliminar
                                                    </PrimaryButton>
                                                </td>
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

export default CakesAdmon;
