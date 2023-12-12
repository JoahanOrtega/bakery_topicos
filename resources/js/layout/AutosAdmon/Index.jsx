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


function CackesAdmon() {
    const [cackes, setCackes] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredCackes, setFilteredCackes] = useState(cackes);
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
            setCackes(result.data);
            setFilteredCackes(result.data);
        };
        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        filterCackes(e.target.value);
    };

    const filterCackes = (searchValue) => {
        const filtered = cackes.filter(cacke =>
            cacke.Model.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredCackes(filtered);
    };

    const deleteCacke = (id) => {
        axios.post(`http://localhost/bakery_topicos/public/api/cacke/${id}/delete`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setCackes(cackes.filter(cacke => cacke.id !== id));
                setFilteredCackes(filteredCackes.filter(cacke => cacke.id !== id));
            })
            .catch(error => {
                console.error('Error obteniendo la data', error);
            });
    };

    const handleModifyClick = (cacke) => {
        navigate('/ModifyCar', { state: cacke })
    };

    return (
        <>
            <div className="container my-5 mx-auto">
                <h1 className="text-xl">Panel de administracion de carros</h1>

                <input type="text"
                    placeholder="Buscar por modelo..."
                    value={search}
                    onChange={handleSearchChange}
                    className="mt-1 block p-2 border border-black" />


                <LinktoButton to="/CreateCackes" className="my-3 bg-gray-500 text-black">
                    Crear registro
                    <img src={Plusicon} alt="" className="ml-2 w-4 h-4" />
                </LinktoButton>
                <div className="flex flex-col mt-5">
                    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-white border-b text-center">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                                I D
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                                M A R C A
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                                M O D E L O
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 ">
                                                A Ñ O
                                            </th>

                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 ">
                                                K M
                                            </th>

                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 ">
                                                COSTO
                                            </th>
                                            <th scope="col" className="text-sm font-bold text-gray-900 px-6 py-4">
                                                A C C I O N E S
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCackes.map((cacke) => (
                                            <tr key={cacke.id} className="bg-gray-100 border-b text-center">
                                                <td className="text-sm px-6 py-4 whitespace-nowrap text-gray-900">{cacke.id}</td>
                                                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                    {cacke.ingredients ? cacke.ingredients.Desc : ''}
                                                </td>
                                                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">{cacke.Model}</td>
                                                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">{cacke.year}</td>
                                                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">{cacke.Km}</td>

                                                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">{cacke.price}</td>

                                                <td>
                                                    <PrimaryButton onClick={() => handleModifyClick(cacke)} className="bg-gray-600 text-black">
                                                        modificar vehiculo
                                                        <img src={EditIcon} alt="" className="ml-2 w-4 h-4" />
                                                    </PrimaryButton>
                                                </td>
                                                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                                                    <PrimaryButton className="bg-gray-600 text-black" onClick={() => deleteCacke(cacke.id)}>
                                                        Eliminar pastel
                                                        <img src={DeleteIcon} alt="" className="ml-2 w-4 h-4" />
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

export default CackesAdmon;
