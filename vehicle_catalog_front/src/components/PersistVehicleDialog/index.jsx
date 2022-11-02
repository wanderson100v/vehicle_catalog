import { Stack, TextField,
    FormControl, InputLabel, Select, ListSubheader,
    MenuItem, FormHelperText, InputAdornment, Button, imageListClasses, 
} from "@mui/material";
import { useEffect, useState } from "react";
import styles from './styles.module.scss';
import {PersistDialog } from "..";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

import {BrandProvider, VehicleProvider, ModelProvider} from '../../providers'


export function PersistVehicleDialog({title,vehicle=null, persistDialogIsOpen, closePersistDialog, showMessage, setIsLoading, onSucessHandle}){
    
    if(!vehicle){
        vehicle = {
            name:'',
            price: 0,
            model_id: 0,
            image_url: ''
        }
    }

    const vehicleProvider = new VehicleProvider('multipart/form-data');
    const brandProvider = new BrandProvider();
    const modelProvider = new ModelProvider();

    const [name, setName] = useState(vehicle.name);
    const [nameError, setNameError] = useState('');
    const [price, setPrice] = useState(vehicle.price);
    const [priceError, setPriceError] = useState('');
    const [image, setImage] = useState();
    const [imageError, setImageError] = useState('');
    const [imagePreview, setImagePreview] = useState((vehicle.image_url)?vehicleProvider.baseUrl+vehicle.image_url: '');
    const [selectedModel, setSelectedModel] = useState(vehicle.model_id);
    const [selectedModelError, setSelectedModelError] = useState('');

    const [allBrands, setAllBrands] = useState([]);
    const [allModels, setAllModels] = useState([]);

    
   

    const generateModelsGroupByBrands = () =>{
        const newModelsGroupByBrands = [];
        {allBrands.forEach((brand)=>{
            newModelsGroupByBrands.push(<ListSubheader><strong>{brand.name}</strong></ListSubheader>);
            allModels
                .filter((model)=>model.brand_id == brand.id)
                .forEach((model)=>{
                    newModelsGroupByBrands.push(<MenuItem key={model.id} value={model.id}>{model.name}</MenuItem>);
                })
        })}
        return newModelsGroupByBrands;
    };

    const loadBrandsAndModels =  async ()=>{
        setIsLoading(true);
        try{
            const responseBrands = await brandProvider.getAll();
            setAllBrands(responseBrands.data.items);
            const modelsResponse = await modelProvider.getAll();
            setAllModels(modelsResponse.data.items);
        }catch(err){
            if(err.response.data.type){
                showMessage(err.response.data.type, err.response.data.message)
                return;
            }
            showMessage('error', 'Ocorreu um errro ao atualizar veículo, verifique sua conexão com a internet')
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(()=>{
        loadBrandsAndModels();
    },[]);


    const hasErrorInForm = () =>{
        let hasError = false;
        if(!name){
            setNameError('O nome é obrigatório');
            hasError =true;
        }else setNameError('');
        
        if(!price){
            setPriceError('O valor é obrigatório');
            hasError =true;
        }else setPriceError('');

        if(!selectedModel){
            setSelectedModelError('O modelo do veículo é obrigatório');
            hasError =true;
        }else setSelectedModelError('');

        if(!vehicle.id && !image){
            setImageError('A imagem do veículo é obrigatória');
            hasError =true;
        }else setImageError('');

        return hasError;
    };

    const onSetImage = (event)=>{
        if (event.target.files && event.target.files[0]) {
            const imageFile =event.target.files[0];
            const previewUrl = URL.createObjectURL(imageFile);
            setImagePreview(previewUrl);
            setImage(imageFile);
        }
    };


    const persistVehicle = async ()=>{
        if(hasErrorInForm()) return;
        setIsLoading(true);
        try{

            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", name);
            formData.append("price", price);
            formData.append("model_id", selectedModel);
            const response = await vehicleProvider.persist(formData, vehicle.id)
            if(onSucessHandle) onSucessHandle()
            showMessage(response.data.type, response.data.message)
            closePersistDialog();
        }catch(err){
            showMessage(err.response.data.type, err.response.data.message)
        }finally{
            setIsLoading(false);
        }
        
    };

    return <PersistDialog 
            title={title}
            open={persistDialogIsOpen}
            handleClose={(event)=>{
                closePersistDialog();
            }}
            handleAccept={(event)=>{
                persistVehicle();
            }}
        >
            <Stack spacing={2} className={styles.content}>
                {imagePreview && <img src={imagePreview} alt="imagem do veículo"/>}
                <FormControl>
                    <Button 
                        variant="contained" 
                        component="label"
                        startIcon={<PhotoCamera  />}
                    >
                        Selecionar Imagem
                        <input 
                            hidden 
                            accept="image/*" 
                            type="file" 
                            onChange={(event) => {onSetImage(event)}}
                        />
                    
                    </Button>
                    {imageError!='' && <FormHelperText error>{imageError}</FormHelperText>}
                </FormControl>
                
                <TextField
                    error={nameError!=''}
                    helperText={nameError}
                    id="name-field"
                    label="Nome"
                    variant="outlined"
                    value={name}
                    onChange={(event)=>{
                        setName(event.target.value);
                    }}
                    fullWidth
                    required
                />
                 <TextField
                    error={priceError!=''}
                    helperText={priceError}
                    id="price-field"
                    label="Valor"
                    variant="outlined"
                    value={price}
                    type="number"
                    onChange={(event)=>{
                        setPrice(event.target.value);
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                    fullWidth
                    required
                />
                <FormControl 
                    sx={{ m: 1, minWidth: 120 }}
                >
                    <InputLabel htmlFor="grouped-select">Modelo do veículo</InputLabel>
                    <Select 
                        defaultValue="" 
                        error={selectedModelError!=''}
                        value={selectedModel} 
                        id="grouped-select" 
                        label="Modelo do veículo"
                        onChange={(event)=>{setSelectedModel(event.target.value)}}
                    >
                        <MenuItem value="">
                            <em><strong>Nenhum</strong></em>
                        </MenuItem>
                        {generateModelsGroupByBrands().map(element=>element)}
                    </Select>
                    {selectedModelError!='' && <FormHelperText error>{selectedModelError}</FormHelperText>}
                </FormControl>
                </Stack>
        </PersistDialog>
}