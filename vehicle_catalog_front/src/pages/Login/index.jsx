import React, { useEffect, useState } from 'react';
import { 
    Grid,Card, CardHeader,CardContent, 
    CardActions, InputLabel, OutlinedInput, 
    TextField, InputAdornment, FormControl, 
    IconButton, Stack,Button, FormHelperText, Alert
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import styles from './styles.module.scss'
import {HeaderUnauthenticated, LoadingBackdrop} from '../../components'
import { UserProvider } from '../../providers';
import { useNavigate } from 'react-router';
import { ALIAS_ROUTES } from '../../routes';

export function Login(){

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [feedbackError, setFeedbackError] = useState('');
    const userProvider = new UserProvider();
    const navigator = useNavigate();
    

    const hasErrorInForm = () =>{
        let hasError = false;
        if(!email){
            setEmailError('O email não foi informado');
            hasError =true;
        }else setEmailError('');
        
        if(!password){
            setPasswordError('A senha não foi informada');
            hasError =true;
        }else setPasswordError('');

        return hasError;
    }

    const goToAdmPage = async ()=>{
        navigator(ALIAS_ROUTES.adm);
    }

    const login = async ()=>{
        if(hasErrorInForm()) return;
        setIsLoading(true);
        try{
            const response = await userProvider.login({
                'email': email,
                'password': password
            });
            if(response.data.data.auth) {
                goToAdmPage();
                setFeedbackError('');
                return;
            }
        }catch(err){
            setFeedbackError(err.response.data.message);
        }finally{
            setIsLoading(false);
        }
       
    }

    return (
        <>
            <HeaderUnauthenticated withLoginButton={false}/>
            <Grid container className={styles.sectionLoginContainer} role="section">
                <Grid item xs={10} sm={10} md={4} xl={3} role="delimiter-container">
                    <Grid container className={styles.sectionLogin}>
                        <Grid item xs={12} sm={12} md={12}>
                            <form>
                                <Card className={styles.card}>
                                    <CardHeader className={styles.cardHeader}
                                        title="Login"
                                    />
                                    <CardContent >
                                        <Stack spacing={2} className={styles.content}>
                                            <TextField
                                                error={emailError!=''}
                                                helperText={emailError}
                                                id="email-field"
                                                label="E-mail"
                                                variant="outlined"
                                                value={email}
                                                onChange={(event)=>{
                                                    setEmail(event.target.value);
                                                }}
                                                fullWidth
                                                required
                                            />
                                            <FormControl fullWidth variant="outlined">
                                                <InputLabel htmlFor="password-field">Senha</InputLabel>
                                                <OutlinedInput
                                                    id="password-field"
                                                    required
                                                    error={passwordError!=''}
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={password}
                                                    onChange={(event)=>{setPassword(event.target.value);}}
                                                    endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={(event) => {setShowPassword(!showPassword)}}
                                                        onMouseDown={(event) => {setShowPassword(!showPassword)}}
                                                        edge="end"
                                                        >
                                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                    }
                                                    label="Senha"
                                                />
                                                {passwordError!='' && <FormHelperText error>{passwordError}</FormHelperText>}
                                            </FormControl>
                                            
                                        </Stack>
                                    </CardContent>
                                    <CardActions className={styles.cardActions}>
                                        <Stack direction='row' className={styles.actionsContainer}>
                                            
                                            <Button 
                                                type='submit' 
                                                className={styles.loginButton} 
                                                variant="contained"
                                                color='primary'
                                                onClick={(event) => {
                                                    event.preventDefault();
                                                    login();
                                                }}
                                            >
                                                Entrar 
                                            </Button>
                                        </Stack>
                                    </CardActions>
                                    {(feedbackError != '') && <Alert severity="error">{feedbackError}</Alert>}
                                </Card>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <LoadingBackdrop isLoading={isLoading} message="Entrando..." full={true}/>
        </>
    );
}
