import React from 'react';
import Menu from './Menu'
import Home from './Home';
import Example from './Example';
import Login from '../layout/Usersform/login';
import Register from '../layout/Usersform/Register';
import AdRegister from '../layout/AdmsForm/AdRegister';
import AdPassword from '../layout/AdmsForm/AdPassword';
import Cackes from '../layout/Cakes';
import CackesAdmon from '../layout/AutosAdmon/Index';
import SellsAdmon from '../layout/Sellsadmon/Index';
import CreateCackes from '../layout/AutosAdmon/CreateCake';
import IngredientsAdmon from '../layout/Ingredients/index'
import CreateBrands from '../layout/Ingredients/Create'
import ViewCar from '../layout/AutosAdmon/ViewCar'
import { Routes, Route, Navigate } from "react-router-dom";
import ConsumerInf from '../layout/ConsumerAdmon/ConsumerInf';
import ModifyCar from '../layout/AutosAdmon/Modifycar';
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
                    <Route path="Cackes" element={<Cackes />} />
                    <Route path="CackesAdmon" element={<CackesAdmon />} />
                    <Route path="SellsAdmon" element={<SellsAdmon />} />
                    <Route path="CreateCackes" element={<CreateCackes />} />
                    <Route path="IngredientsAdmon" element={<IngredientsAdmon />} />
                    <Route path="CreateBrands" element={<CreateBrands />} />
                    <Route path="ViewCar" element={<ViewCar />} />
                    <Route path="ModifyCar" element={<ModifyCar />} />
                    <Route path="*" element={<Navigate replace to="/" />} />
                </Route>
            </Routes>
        </AuthProvider>
    )
}

export default Main
