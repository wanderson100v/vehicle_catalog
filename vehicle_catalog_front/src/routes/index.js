import React from 'react';

import {
    Routes,
    Route,
} from "react-router-dom";

import {
    Home,
    Page404,
} from '../pages';

export const ALIAS_ROUTES={
    'home':'/',
    'login':'/login',
    'vehicles':'/adm/vehicles'
}

export default function Router() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Home />} />
            <Route path="adm">
                <Route path="/adm" element={<Home />} />
                <Route path="vehicles/" element={<Home />} />
                <Route path="vehicles/:id" element={<Home />} />
            </Route>
            <Route path="*" element={<Page404 />} />
        </Routes>
    )
}