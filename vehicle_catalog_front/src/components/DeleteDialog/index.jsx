import { Alert, DialogContentText, Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import styles from './styles.module.scss';


export function DeleteDialog({
    open, 
    handleClose, 
    title, 
    handleAccept,
    children
}){
    return (
    <>
        {open && (
            <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">
                    <div className={styles.titleContainer}>
                        <Alert 
                            variant="filled" 
                            severity="error"  
                            >
                            {title}
                        </Alert>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={handleClose}>Cancelar</Button>
                    <Button color="primary" onClick={handleAccept}>Aceitar</Button>
                </DialogActions>
            </Dialog>
        )}
    </>
    );
}