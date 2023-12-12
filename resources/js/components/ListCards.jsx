import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cards from './Cards';

function ListCards() {
    const [cackeData, setCackeData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        const getCackes = async () => {
            await axios.get('http://localhost/bakery_topicos/public/api/cake_index')
                .then(function (response) {
                    console.log(response);
                    console.log('API Response:', response.data);
                    setCackeData(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                    console.error('API Error:', error);
                });
        }
        getCackes();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };


    const filteredCackes = cackeData.filter(cacke =>
        cacke.Model.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedType === '' || cacke.type === selectedType)
    );
    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };


    console.log('Selected type:', selectedType);

    cackeData.forEach(cacke => {
        console.log('cacke type:', cacke.type);
    });


    return (
        <>
            <div className='container mx-full p-4'>
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Buscar por tipo..."
                        className="flex-1 p-2 border rounded border-pink-500"
                    />
                    <select
                        className="p-2 border rounded border-pink-500"
                        name="type"
                        id="type"
                        value={selectedType}
                        onChange={handleTypeChange}
                    >
                        <option value="">Selecciona un Tipo de Postre</option>
                        <option value="Pastel">Pastel</option>
                        <option value="Gelatina">Gelatina</option>
                        <option value="Cupcake">Cupcake</option>
                    </select>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {filteredCackes.length ? (
                        filteredCackes.map((cacke) => (
                            <Cards
                                key={cacke.id}
                                {...cacke}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-600">
                            No hay postres disponibles.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ListCards;
