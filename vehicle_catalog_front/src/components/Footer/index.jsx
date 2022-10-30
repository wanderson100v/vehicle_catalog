import {Typography} from "@mui/material";
import styles from './style.module.scss';

export function Footer(){
    return (
    <>
        <div className={styles.footer}>
            <Typography variant='p'>Catalogo de véiculos - Desenvolvido por Wânderson Lira</Typography>
        </div>
    </>);
}