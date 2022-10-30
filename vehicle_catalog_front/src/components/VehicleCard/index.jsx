import {Card, CardMedia, CardContent, Typography} from "@mui/material";
import styles from './style.module.scss';

export function VehicleCard({vehicle}){
    return (
    <>
        <div>
            <div className={styles.vehicleCardConteiner}>
                <Card>
                    <CardMedia
                        component="img"
                        image={vehicle.image_url}
                        alt={"imagem de veículo de nome "+vehicle.image_url}
                    />
                    <CardContent>
                        <Typography>
                            {vehicle.name} R$ {vehicle.price}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    </>);
}