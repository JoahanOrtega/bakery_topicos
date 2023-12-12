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
            <div className='container'>
                <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Buscar por tipo..." className="mt-1 block p-2 border border-black" />
                <div className="relative inline-block text-left">
                    <select
                        className="mt-1 block p-2 border border-black w-40"
                        name="type"
                        id="type"
                        value={selectedType}
                        onChange={handleTypeChange}
                    >
                        <option value="">Tipos de postres</option>
                        <option value="Pastel">Pastel</option>
                        <option value="Gelatina">Gelatina</option>
                        <option value="Cupcacke">Cupcacke</option>
                    </select>


                </div>


                <div className='flex flex-wrap justify-around'>
                    {filteredCackes.length ? (
                        filteredCackes.map((cacke) => (
                            <Cards
                                key={cacke.id}
                                id={cacke.id}
                                name={cacke.name}
                                stock={cacke.stock}
                                type={cacke.type}
                                size={cacke.size}
                                disponibility={cacke.Available}
                                image={cacke.Image}
                                flavors={cacke.flavors}
                                price={cacke.price}
                            />
                        ))
                    ) : (
                        <span className="visually-hidden">Parece que no hay pasteles</span>
                    )}
                </div>
            </div>
        </>
    );
}

export default ListCards;
