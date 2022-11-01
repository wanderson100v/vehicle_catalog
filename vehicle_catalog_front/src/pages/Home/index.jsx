import React, { useEffect, useState } from 'react';
import { Typography} from '@mui/material';
import styles from './style.module.scss'
import {VehicleProvider} from '../../providers'
import {VehicleCard, VehiclesCatalog, LoadingBackdrop, HeaderUnauthenticated, SectionHeader} from '../../components'
import { Swiper, SwiperSlide} from 'swiper/react';
import { Pagination,Navigation} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';

export function Home(){

    return (
        <>
            <HeaderUnauthenticated withLoginButton={true}/>
            <SectionHeader title="Novidades" description="Novos veículos mais em conta"/>
            <CustomSwiper/>
            <SectionHeader title="Catalogo completo"/>
            <VehiclesCatalog/>
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
                    navigation
                    breakpoints={{
                        350: { slidesPerView: 2},
                        640: { slidesPerView: 3},
                        800: { slidesPerView: 4},
                        1024: { slidesPerView: 5},
                    }}
                    modules={[Pagination, Navigation]}
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

