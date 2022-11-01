import styles from './styles.module.scss';
import { useNavigate } from 'react-router';
import { Typography, Button} from '@mui/material';

export function HeaderAuthenticated({withLoginButton = false}){
    const navigator = useNavigate();

    return (
        <>
            <nav className={styles.headerNav}>
                <div>
                    <Typography variant='h5'>Catalogo de veículos</Typography>
                </div>
                {withLoginButton && (
                    <div>
                        <Button variant="contained" onClick={(event)=>{navigator(ALIAS_ROUTES.login)}}>Login</Button>
                    </div>
                )}
            </nav>
        </>
    );
}