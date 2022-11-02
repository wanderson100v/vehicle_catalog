import React from 'react';

import {
    Routes,
    Route,
} from "react-router-dom";

import {
    Page404,
    Home,
    Login,
    AdmHome,
} from '../pages';

export const ALIAS_ROUTES={
    'home':'/',
    'login':'/login',
    'adm-home':'/adm',
    'adm-vehicles':'/adm/vehicles'
}

export default function Router() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="adm">
                <Route path="/adm" element={<AdmHome />} />
                <Route path="vehicles/" element={<Home />} />
                <Route path="vehicles/:id" element={<Home />} />
            </Route>
            <Route path="*" element={<Page404 />} />
        </Routes>
    )
}