import React from 'react';
import Menu from './Menu'
import Home from './Home';
import Example from './Example';
import Login from '../layout/Usersform/login';
import Register from '../layout/Usersform/Register';
import AdRegister from '../layout/AdmsForm/AdRegister';
import AdPassword from '../layout/AdmsForm/AdPassword';
import Cakes from '../layout/Cakes';
import CakesAdmon from '../layout/CakeAdmon/Index';
import SellsAdmon from '../layout/Sellsadmon/Index';
import CreateCakes from '../layout/CakeAdmon/CreateCake';
import IngredientsAdmon from '../layout/Ingredients/index'
import CreateBrands from '../layout/Ingredients/Create'
import ViewCake from '../layout/CakeAdmon/ViewCake'
import { Routes, Route, Navigate } from "react-router-dom";
import ConsumerInf from '../layout/ConsumerAdmon/ConsumerInf';
import ModifyCake from '../layout/CakeAdmon/Modifycake';
import { AuthProvider } from './AuthProvider';

function Main() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Menu />}>
                    <Route path="Example" element={<Example />} />
                    <Route index element={<Home />} />
                    <Route path="Login" element={<Login />} />
                    <Route path="Register" element={<Register />} />
                    <Route path='ConsumerInf' element={<ConsumerInf />} />
                    <Route path='AdRegister' element={<AdRegister />} />
                    <Route path='AdPassword' element={<AdPassword />} />
                    <Route path="Cakes" element={<Cakes />} />
                    <Route path="CakesAdmon" element={<CakesAdmon />} />
                    <Route path="SellsAdmon" element={<SellsAdmon />} />
                    <Route path="CreateCakes" element={<CreateCakes />} />
                    <Route path="IngredientsAdmon" element={<IngredientsAdmon />} />
                    <Route path="CreateBrands" element={<CreateBrands />} />
                    <Route path="ViewCake" element={<ViewCake />} />
                    <Route path="ModifyCake" element={<ModifyCake />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default Main
