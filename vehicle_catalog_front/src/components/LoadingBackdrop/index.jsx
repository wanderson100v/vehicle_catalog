import {Typography, Backdrop, CircularProgress} from "@mui/material";
import styles from './style.module.scss';

export function LoadingBackdrop({isLoading, message, full=false}){
    
    const containerClass = (full)? styles.fullBackdropContainer:styles.lmitedBackdropContainer;

    if(isLoading){
        return (
            <div className={containerClass}>
                <Backdrop
                    open={true}
                    sx={{
                        position: (full)?'absolute':'relative',
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