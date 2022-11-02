import styles from './styles.module.scss';
import { useNavigate } from 'react-router';
import { Typography, Button, Stack} from '@mui/material';
import { ALIAS_ROUTES } from '../../routes';
import { useEffect, useState} from 'react';

export function HeaderAuthenticated(){
    const navigator = useNavigate();
    const [user, setUser] = useState({});

    useEffect(()=>{
        const loginData = JSON.parse(localStorage.getItem('login_data'))
        if(!loginData){
            navigator(ALIAS_ROUTES.login);
            return;
        }
        setUser(loginData.user);
    },[]);

    const logout = ()=>{
        localStorage.removeItem('login_data');
        navigator(ALIAS_ROUTES.login)
    }
    
    return (
        <>
            <nav className={styles.headerNav}>
                <div>
                    <Typography variant='h5'>Catalogo de veículos</Typography>
                </div>
                <div>
                    <Stack direction='row' spacing={2} className={styles.headerRight}>
                        <Typography variant={'p'}>Olá, {user.name}</Typography>
                        <Button variant="contained" onClick={(event)=>{logout()}}>Sair</Button>
                    </Stack>
                </div>
            </nav>
        </>
    );
}