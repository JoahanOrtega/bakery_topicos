import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from 'react';
import { AuthContext } from "../../components/AuthProvider";

function indexSell() {
    const { auth } = useContext(AuthContext);
    const token = auth.token;
    const [sellData, setSellData] = useState([]);
    const [userData, setUserData] = useState({});
    const [filteredSales, setFilteredSales] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (token) {
                    const userResponse = await axios.get("http://localhost/bakery_topicos/public/api/user_index", {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUserData(userResponse.data);
                }

                const carResponse = await axios.get('http://localhost/bakery_topicos/public/api/sells_index', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setSellData(carResponse.data);
            } catch (error) {
                console.log("Error: ", error);
            }
        };

        fetchData();
    }, [token]);

    useEffect(() => {
        const userId = Number(userData.id);
        const userRole = Number(userData.role);

        if (userRole === 1) {
            const filteredCars = sellData.filter(ventaData => ventaData.Id_foreign_key === userId);
            setFilteredSales(filteredCars);
        } else if (userRole === 2) {
            setFilteredSales(sellData);
        }
    }, [userData, sellData]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredSalesBySearch = filteredSales.filter(venta => {
        if (userData.role === 2) {
            return venta.Id_foreign_key.toString().toLowerCase().includes(searchTerm.toLowerCase());
        } else if (userData.role === 1) {
            return venta.Id_foreign_keycars.toString().toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
    });

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold text-pink-600">Panel de Administración de Ventas</h1>
                <div className="my-4">
                    <input
                        type="text"
                        placeholder="Buscar por cliente"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full p-2 border rounded border-pink-500"
                    />
                </div>
                <div className="flex flex-col mt-5">
                    <div className="overflow-x-auto">
                        <div className="align-middle inline-block min-w-full">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-pink-100">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-700 px-6 py-4 text-left">
                                                Id
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-700 px-6 py-4 text-left">
                                                Id del Comprador
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-700 px-6 py-4 text-left">
                                                Id del carro
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-700 px-6 py-4 text-left">
                                                Monto
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {filteredSalesBySearch.map((venta) => (
                                            <tr key={`${venta.id}-${venta.id_usuario_fk}`}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venta.id}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venta.Id_foreign_key}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venta.Id_foreign_keycars}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venta.amount}</td>
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

export default indexSell;
