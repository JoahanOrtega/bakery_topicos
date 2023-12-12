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
            <div className="mt-5 shadow-md border border-gray-200 rounded-lg max-w-sm bg-white dark:border-gray-700 text-white mx-2">
                {console.log(Image)};
                <img className="rounded-t-lg" src={'http://localhost/bakery_topicos/public/storage/' + Image} alt="" />
                <div className="p-5">
                    <a href="#">
                        <h5 className="text-black font-bold text-2xl tracking-tight">{name}</h5>
                    </a>

                    <p className="font-normal text-black mb-3 ">
                        Precio: {price} $
                    </p>
                    <button onClick={handleButtonClick} className="mt-5 text-black font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex border-solid border-2">
                        Mas informacion
                        <img src={NextIcon} className="w-6 h-6" alt="" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default Cards;
