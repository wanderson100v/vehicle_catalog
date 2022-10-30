import {Typography, Backdrop, CircularProgress} from "@mui/material";
import styles from './style.module.scss';

export function LoadingBackdrop({isLoading, message}){
    if(isLoading){
        return (
            <div className={styles.backdropContainer}>
                <Backdrop
                    open={true}
                    sx={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Typography 
                    variant='body1'  
                        sx={{ 
                            paddingRight:'20px',
                        }}
                    >
                        {message}
                    </Typography> 
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
         );
    };
    return (<></>);
}