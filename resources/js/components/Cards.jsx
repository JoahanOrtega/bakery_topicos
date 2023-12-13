import React from 'react';
import { useNavigate } from 'react-router-dom';
import NextIcon from '../../Images/Icons/Next.png';

function Cards(props) {
    const navigate = useNavigate();
    const name = props.name;
    const stock = props.stock;
    const type = props.type;
    const size = props.size;
    const Image = props.Image;
    const flavors = props.flavors;
    const price = props.price;
    const cakeId = props.id;
    const Available = props.Available;


    const handleButtonClick = () => {
        console.log("id en cards" + cakeId);
        navigate('/ViewCake', {
            state: {
                name: name,
                stock: stock,
                type: type,
                size: size,
                Available: Available,
                image: Image,
                flavors: flavors,
                price: price,
                id: cakeId,
            }
        });
    };

    return (
        <>
            <div className="mt-5 shadow-lg border border-gray-300 rounded-xl max-w-sm bg-white dark:border-gray-700 mx-2">
                <img className="rounded-t-xl" src={'http://localhost/bakery_topicos/public/storage/' + Image} alt="" />
                <div className="p-6">
                    <a href="#">
                        <h5 className="text-gray-900 font-semibold text-2xl tracking-tight">{name}</h5>
                    </a>
                    <p className="font-normal text-gray-800 mb-4">
                        Precio: $ {price}
                    </p>
                    <button onClick={handleButtonClick} className="mt-4 text-white font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center justify-center bg-blue-500 hover:bg-blue-600 border-0">
                        Más información
                        <img src={NextIcon} className="w-5 h-5 ml-2" alt="" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default Cards;
