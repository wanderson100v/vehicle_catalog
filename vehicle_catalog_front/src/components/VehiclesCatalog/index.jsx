import React, { useEffect, useRef, useState } from 'react';
import {Button, Grid, TextField} from '@mui/material';
import styles from './styles.module.scss'
import {VehicleProvider} from '../../providers'
import {VehicleCard, LoadingBackdrop, FeedbackEmptyItems, CustomPaginator } from '../../components'


export function VehiclesCatalog(){

    const itemsPerPage = 12;

    const vehicleProvider = new VehicleProvider();
    
    const [vehicles, setVehicles] = useState([]);

    const vehiclesContainerRef = useRef(null)

    const [totalPages, setTotalPages] = useState(1);

    const [page, setPage] = useState(1);

    const [search, setSearch] = useState('');

    const [feddBackMessage, setFeddBackMessage] = useState();
    
    const [isLoading, setIsLoading] = useState(true);

    const searchVehicles = (newSearch)=>{
        const offset = (page-1) * itemsPerPage;
        setIsLoading(true);
        vehicleProvider.getVechicles(newSearch,offset,itemsPerPage)
            .then(response=>{
                const newVehicles = response['data']['data']['items']
                const possibleTotal = response['data']['data']['total']
                let newTotal = possibleTotal/itemsPerPage;
                newTotal = Math.ceil(newTotal);
                setVehicles(newVehicles);
                setTotalPages(newTotal);
                if(newVehicles.length == 0) setFeddBackMessage('Não foram encontrados veículos')
            }).catch(error =>{
                if(error.code = 'ERR_NETWORK') setFeddBackMessage("Não foi possível buscar veículos: Sem acesso ao servidor")
            })
            .finally(()=>{
                setIsLoading(false);
            });
    }

    useEffect(()=>{
        searchVehicles(search)
    },[page])

    let content = (<></>);

    if(isLoading) content = <LoadingBackdrop isLoading={isLoading} message="Carregando veículos..."/>
    else if(!vehicles || vehicles.length == 0){
        content =  (<FeedbackEmptyItems message={feddBackMessage}/>)
    }else{
        content = (
            <div className={styles.vehiclesContainer}>
                <Grid 
                    container 
                    spacing={1} 
                    className={styles.vehiclesGrid}
                >
                    {vehicles.map((evidendVehicle)=>(<>
                        <Grid className={styles.vehiclesGridItem} item key={evidendVehicle.id} xs={12} sm={6} md={3} lg={2}>
                            <VehicleCard vehicle={evidendVehicle}/>
                        </Grid>
                    </>))}
                </Grid>
            </div>
        )
    }

    const handleChangePagination = (event, value) => {
        setPage(value);
    };

    return (
        <>
            <Grid container spacing={1}
                ref={vehiclesContainerRef}
                sx={{
                    padding:'20px',
                }}
            >
                <Grid item xs={12} sm={12} md={11} lg={11}>
                    <TextField
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        variant="outlined"
                        size='smail'
                        fullWidth
                        placeholder="Digite o nome do véiculo"
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={1} lg={1}>
                    <Button
                        onClick={(event) => {
                            setPage(1);
                            searchVehicles(search)
                            vehiclesContainerRef.current.scrollIntoView();
                        }}
                        variant="outlined"
                        fullWidth
                        sx={{
                            height:'100%'
                        }}
                    >
                        Buscar
                    </Button>
                </Grid>
            </Grid>
            {content}
            <CustomPaginator page={page} totalPages={totalPages} handleChangePagination={handleChangePagination} />
        </>
    );
}