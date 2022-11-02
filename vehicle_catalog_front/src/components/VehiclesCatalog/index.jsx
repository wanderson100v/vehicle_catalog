import React, { useEffect, useRef, useState } from 'react';
import {Button, Grid, TextField, Snackbar, Alert} from '@mui/material';
import styles from './styles.module.scss'
import {VehicleProvider} from '../../providers'
import {VehicleCard, LoadingBackdrop, FeedbackEmptyItems, CustomPaginator, PersistVehicleDialog } from '../../components'


export function VehiclesCatalog({canHandle=true}){

    const itemsPerPage = 12;

    const vehicleProvider = new VehicleProvider();
    
    const [vehicles, setVehicles] = useState([]);

    const vehiclesContainerRef = useRef(null)

    const [totalPages, setTotalPages] = useState(1);

    const [page, setPage] = useState(1);

    const [search, setSearch] = useState('');

    const [feddBackMessage, setFeddBackMessage] = useState();
    
    const [isLoading, setIsLoading] = useState(true);

    const [createDialogIsOpen, setCreateDialogIsOpen] = useState(false);
    
    const  openCreateDialog = ()=>{
        setCreateDialogIsOpen(true);
    };

    const closeCreateDialog = ()=>{
        setCreateDialogIsOpen(false);
    };

    const initialFeedbackMessage = {
        open: false,
        severity: 'success',
        message:''
    }
    const [feedbackMessage, setFeedbackMessage] = useState(initialFeedbackMessage);

    const closeFeedbackMessage = ()=>{
        setFeedbackMessage(initialFeedbackMessage);
    };

    const showMessage= (type, message)=>{
        setFeedbackMessage({
            open: true,
            severity: type,
            message: message
        })
    }

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

    const onDeleteHandle = (id)=>{
        const copyVechicles = [...vehicles].filter((vehicle) => vehicle.id !== id);
        setVehicles(copyVechicles);
    }

    const onPersistHandle = ()=>{
        searchVehicles(search);
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
                    {vehicles.map((vehicle)=>(<>
                        <Grid  className={styles.vehiclesGridItem} item xs={12} sm={6} md={3} lg={2}>
                            <VehicleCard 
                                vehicle={vehicle}  
                                defaultCanHandle={canHandle}
                                onDeleteHandle={onDeleteHandle}
                                onEditHandle={onPersistHandle}
                                showMessage={showMessage}
                            />
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
            {canHandle && (
                <div className={styles.addButttonContainer}>
                    <Button
                        onClick={(event) => {openCreateDialog()}}
                        variant="contained"
                    >
                        Adicionar veículo
                    </Button>
                </div>
            )}
            {content}
            <CustomPaginator page={page} totalPages={totalPages} handleChangePagination={handleChangePagination} />
            {createDialogIsOpen && 
                <PersistVehicleDialog 
                    title={'Cadastrar novo veículo'}
                    persistDialogIsOpen={createDialogIsOpen} 
                    closePersistDialog={onPersistHandle} 
                    showMessage={showMessage} 
                    setIsLoading={setIsLoading} 
                    onSucessHandle={onCreateHandle}
                />}
            <Snackbar open={feedbackMessage.open} autoHideDuration={6000} onClose={closeFeedbackMessage} anchorOrigin={{ 'vertical':'bottom', 'horizontal':'right' }} >
                <Alert onClose={closeFeedbackMessage} severity={feedbackMessage.severity} sx={{ width: '100%' }}>
                    {feedbackMessage.message}
                </Alert>
            </Snackbar>
        </>
    );
}