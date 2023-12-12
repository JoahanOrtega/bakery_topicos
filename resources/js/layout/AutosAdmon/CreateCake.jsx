import TextInput from "../../components/TextInput"
import InputLabel from "../../components/Inputlabel"
import PrimaryButton from "../../components/PrimaryButton"
import BackIcon from "../../../Images/Icons/Back.png"
import LinktoButton from "../../components/LinktoButton"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { AuthContext } from "../../components/AuthProvider"

function CreateCakes() {
    const [ingredients, setIngredients] = useState([
    ]);
    const [setToken] = useState(null);
    const [formValue, setFormValue] = useState({})
    const navigate = useNavigate();
    const { auth } = useContext(AuthContext);//token

    const token = auth.token;//token

    //para poner los datos en las marcas
    useEffect(() => {
        axios.get('http://localhost/bakery_topicos/public/api/cake_ingredients', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setIngredients(response.data);
            })
            .catch(error => {
                console.error('Error obtenendo la data '.error);

            });
    }, []);

    const onChange = (e) => {
        e.persist();
        const name = e.target.name;
        const value = e.target.type === 'select-one' ? e.target.options[e.target.selectedIndex].value : e.target.value;
        setFormValue({ ...formValue, [name]: value });
    }


    const handleSubmit = async e => {
        if (e && e.preventDefault()) e.preventDefault();

        const formData = new FormData();
        formData.append("Id_Ingredients_fk", formValue.Id_Ingredient_fk);
        formData.append("name", formValue.name);
        formData.append("stock", formValue.stock);
        formData.append("type", formValue.type);
        formData.append("size", formValue.size);
        formData.append("Available", formValue.Available);
        formData.append("Image", e.target.elements.Image.files[0]);
        formData.append("flavors", formValue.flavors);
        formData.append("price", formValue.price);

        console.log('lo que estoy guardando en la imagen '+e.target.elements.Image.files[0]);

        const response = await axios.post(
            "http://localhost/bakery_topicos/public/api/insert",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Accept: "application/json",
                    'Authorization': `Bearer ${token}`
                }

            }
        );

        // Add a console log to see the response object before the if statement
        console.log(response);

        if (response.status === 200) {
            console.log("Registration successful!");
            navigate("/CakesAdmon");//desde el nombre
        } else {
            console.log("Error during registration: ", response.data.message);
            alert("Llena todos los campos, si no hay ingredientes, agregalos previamente");
        }
    };

    return (
        <>
            <div className="Container my-12">
                <h1 className="text-xl text-center">Agregar pastel</h1>
                <div className="flex justify-center items-center">

                    <form onSubmit={handleSubmit} style={{ width: '50%', maxWidth: '500px' }} encType="multipart/form-data">

                        <div className="mt-4 mb-4">
                            <InputLabel htmlFor="Id_Ingredient_fk" value="Ingredientes" />

                            <select value={formValue.Id_Ingredient_fk} onChange={onChange} id="Id_Ingredient_fk" name="Id_Ingredient_fk" className="mt-1 block w-full p-2 border border-black">
                                <option value="0">Selecciona los ingredientes</option>
                                {ingredients.map(ingredient => (
                                    <option key={ingredient.id} value={ingredient.id}>
                                        {ingredient.Desc}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <div className="mt-4 mb-4" >
                            <InputLabel htmlFor="name" value="Nombre del pastel" />
                            <TextInput value={formValue.name} onChange={onChange} id="name" type="text" name="name" className="mt-1 block w-full p-2 border border-black" required />
                        </div>

                        <div className="mt-4 mb-4" >
                            <InputLabel htmlFor="stock" value="Stock disponible" />
                            <TextInput min="0" value={formValue.stock} onChange={onChange} id="stock" type="number" name="stock" className="mt-1 block w-full p-2 border border-black" required />
                        </div>

                        <div className="mt-4 mb-4" >
                            <InputLabel htmlFor="flavors" value="Sabores" />
                            <TextInput value={formValue.flavors} onChange={onChange} id="flavors" type="text" name="flavors" className="mt-1 block w-full p-2 border border-black" required />
                        </div>
                        <div className="mt-4 mb-4" >
                            <InputLabel htmlFor="size" value="tamaño" />
                            <TextInput value={formValue.size} onChange={onChange} id="size" type="text" name="size" className="mt-1 block w-full p-2 border border-black" required />
                        </div>

                        <InputLabel htmlFor="type" value="Tipos" />
                        <select value={formValue.type} onChange={onChange} id="type" name="type" className="mt-1 block w-full p-2 border border-black">
                            <option value="0">Selecciona un tipo de postre</option>
                            <option value="Cake">Pastel</option>
                            <option value="Gelatina">Gelatina</option>
                            <option value="Cupcake">Cupcake</option>
                        </select>

                        <div className="mt-4 mb-4" >
                            <InputLabel htmlFor="price" value="Precio del pastel" />
                            <TextInput min="0" value={formValue.price} onChange={onChange} id="price" type="number" name="price" className="mt-1 block w-full p-2 border border-black" required />
                        </div>


                        <div className="mt-4 mb-4">
                            <InputLabel htmlFor="Available" value="Disponibilidad" />

                            <select value={formValue.Available} onChange={onChange} id="Available" name="Available" className="mt-1 block w-full p-2 border border-black">
                                <option value="2">Selecciona una opcion</option>
                                <option value="1">Disponible</option>
                                <option value="0">No disponible</option>
                            </select>

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
}

export default CreateCakes
