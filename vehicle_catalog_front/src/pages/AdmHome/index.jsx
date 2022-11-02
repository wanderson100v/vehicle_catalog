import React from 'react';
import {VehiclesCatalog,HeaderAuthenticated, SectionHeader} from '../../components';

export function AdmHome(){

    return (
        <>
            <HeaderAuthenticated/>
            <SectionHeader title="Véiculos"/>
            <VehiclesCatalog/>
        </>
    );
}
