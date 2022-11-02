import {Card, CardMedia, CardContent, Typography, 
    CardActions, IconButton, Stack 
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import styles from './styles.module.scss';
import { DeleteDialog, PersistVehicleDialog } from "../";

import { BrandProvider, ModelProvider, VehicleProvider} from '../../providers'
import { LoadingBackdrop } from "../";

export function VehicleCard({vehicle, defaultCanHandle = true, onDeleteHandle=null, onEditHandle, showMessage=null}){


    const vehicleProvider = new VehicleProvider();
    const brandProvider = new BrandProvider();
    const modelProvider = new ModelProvider();

    const [deleteDialogIsOpen, setDeleteDialogIsOpen] = useState(false);
    const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);
    const [brandName, setBrandName] = useState('');
    const [modelName, setModelName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const loadModelAndBrand = async()=>{
        try{
            const modelResponse = await modelProvider.getFromId(vehicle.model_id);
            setModelName(modelResponse.data.data.name)
            const brandResponse = await brandProvider.getFromId(modelResponse.data.data.brand_id);
            setBrandName(brandResponse.data.data.name)
        }
        catch(error){};
    }

    useEffect(() => {
        loadModelAndBrand();
    },[]);
    
    const  openDeleteDialog = ()=>{
        setDeleteDialogIsOpen(true);
    };

    const closeDeleteDialog = ()=>{
        setDeleteDialogIsOpen(false);
    };

    const  openEditDialog = ()=>{
        setEditDialogIsOpen(true);
    };

    const closeEditDialog = ()=>{
        setEditDialogIsOpen(false);
    };

    const validShowMessage = (type, message)=>{
        if(showMessage) showMessage(type, message);
    }
    
    const deleteVehicle = async ()=>{
        setIsLoading(true);
        try{
            const response = await vehicleProvider.deleteFromId(vehicle.id)
            if(onDeleteHandle) onDeleteHandle(vehicle.id);
            validShowMessage(response.data.type, response.data.message)
        }catch(err){
            validShowMessage(err.response.data.type, err.response.data.message)
        }finally{
            setIsLoading(false);
        }
        
    };

    return (
    <>
        <div className={styles.vehicleCardConteiner}>
            <Card>
                <CardMedia
                    component="img"
                    image={vehicleProvider.baseUrl+vehicle.image_url}
                    alt={"imagem de veículo de nome "+vehicle.image_url}
                />
                <CardContent className={styles.cardContent}>
                    <Typography >
                        <span className={styles.price}> R$ {vehicle.price}</span>
                        <strong>{vehicle.name}</strong>
                    </Typography>
                    {(brandName || modelName) &&
                        <Typography >
                            <span className={styles.brand}> {brandName}:</span> <span className={styles.model}> {modelName}</span>
                        </Typography>
                    }
                </CardContent>
                {defaultCanHandle && 
                    <CardActions className={styles.actionsContainer}>
                        <Stack direction='row' className={styles.actions}>
                            <IconButton onClick={(event)=>{openDeleteDialog()}} color="error" aria-label="excluir veículo">
                                <DeleteIcon/>
                            </IconButton>
                            <IconButton onClick={(event)=>{openEditDialog()}} color="primary" aria-label="editar veículo">
                                <EditIcon />
                            </IconButton>
                        </Stack>
                    </CardActions>
                }
            </Card>
        </div>
        <DeleteDialog 
            title={'Deletar veículo'}
            open={deleteDialogIsOpen}
            handleClose={(event)=>{
                closeDeleteDialog();
            }}
            handleAccept={(event)=>{
                deleteVehicle();
            }}
        >
            Realmente deseja deletar o veículo de nome: {vehicle.name}
        </DeleteDialog>
        {editDialogIsOpen && 
            <PersistVehicleDialog 
                title={`Editar veículo: ${vehicle.name}`}
                vehicle={vehicle} 
                persistDialogIsOpen={editDialogIsOpen} 
                closePersistDialog={closeEditDialog} 
                showMessage={showMessage} 
                setIsLoading={setIsLoading} 
                onSucessHandle={onEditHandle}
            />}
        <LoadingBackdrop isLoading={isLoading} message="Entrando..." full={true} />
    </>);
}


