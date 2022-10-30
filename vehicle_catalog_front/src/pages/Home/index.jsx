import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { Typography, Button, Grid, Pagination as MuiPagination, TextField } from '@mui/material';
import styles from './style.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import {VehicleProvider} from '../../providers'
import {VehicleCard, LoadingBackdrop} from '../../components'
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { ALIAS_ROUTES } from '../../routes';

export function Home(){

    const navigator = useNavigate();

    return (
        <>
            <nav className={styles.headerNav}>
                <div>
                    <Typography variant='h5'>Catalogo de veículos</Typography>
                </div>
                <div>
                    <Button variant="contained" onClick={(event)=>{navigator(ALIAS_ROUTES.login)}}>Login</Button>
                </div>
            </nav>
            <div className={styles.centerSectionTitle}>
                <Typography variant='h6'>Novidades</Typography>
            </div>
            <CustomSwiper/>
            <div className={styles.centerSectionTitle}>
                <Typography variant='h6'>Catalogo completo</Typography>
            </div>
            <VehicleCatalog/>
        </>
    );
}

function CustomSwiper(){

    const vehicleProvider = new VehicleProvider();
    
    const [evidendVehicles, setEvidendVehicles] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        vehicleProvider.getEvidencedsVechicles()
            .then(response=>{
                const newEvidendVehicles = response['data']['items']
                setEvidendVehicles(newEvidendVehicles);
                setIsLoading(false);
            }).catch(error =>{});
    },[])

    if(isLoading) return (<LoadingBackdrop isLoading={isLoading} message="Carregando veículos em destaque..."/>)

    if(!evidendVehicles || evidendVehicles.length == 0){
        return (
            <div className={styles.feedbackEmptyItems}>
                <Typography variant='body1'>Não há veículos em evidência</Typography>
            </div>
         );
    };
    return (
        <>
            <div className={styles.mySwiperContainer}>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        350: { slidesPerView: 2},
                        640: { slidesPerView: 3},
                        800: { slidesPerView: 4},
                        1024: { slidesPerView: 5},
                    }}
                    modules={[Pagination]}
                    className={styles.mySwiper}
                >
                    {evidendVehicles.map((evidendVehicle)=>(<>
                        <SwiperSlide><VehicleCard vehicle={evidendVehicle}/></SwiperSlide>
                    </>))}
                    
                </Swiper>
            </div>
        </>
    );
}

function VehicleCatalog(){

    const itemsPerPage = 10;

    const vehicleProvider = new VehicleProvider();
    
    const [vehicles, setVehicles] = useState([]);

    const vehiclesContainerRef = useRef(null)

    const [totalPages, setTotalPages] = useState(1);

    const [page, setPage] = useState(1);

    const [search, setSearch] = useState('');
    
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
                vehiclesContainerRef.current.scrollIntoView() 
            }).catch(error =>{})
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
        content =  (
            <div className={styles.feedbackEmptyItems}>
                <Typography variant='body1'>Não foram encontrados veículos</Typography>
            </div>
         );
    }else{
        content = (
            <div className={styles.vehiclesContainer} ref={vehiclesContainerRef}>
                <Grid 
                    container 
                    spacing={2} 
                    className={styles.vehiclesGrid}
                >
                    {vehicles.map((evidendVehicle)=>(<>
                        <Grid item xs={12} sm={4} md={3} lg={2}>
                            <VehicleCard key={evidendVehicle.id} vehicle={evidendVehicle}/>
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
                        onClick={(event) => setPage(1)}
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
            <div className={styles.paginationContainer}>
                <MuiPagination 
                    color="primary"
                    count={totalPages} 
                    page={page}
                    sx={{
                        color:'white'
                    }} 
                    shape="rounded" 
                    onChange={handleChangePagination} 
                />
            </div>
        </>
    );
    
}

