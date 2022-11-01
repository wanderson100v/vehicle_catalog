import styles from './styles.module.scss';
import { Typography, Grid} from '@mui/material';

export function SectionHeader({title, description = null}){
    return (
        <>
           <header className={styles.centerSectionTitle}>
                <Grid container>
                    <Grid  item xs={12}>
                    <Typography variant='h6'>{title}</Typography>
                    </Grid>
                    
                    {description && 
                        (<Grid  item xs={12}>
                            <Typography variant='subtitle2'>{description}</Typography>
                        </Grid>)
                    }
                </Grid>
            </header>
            
        </>
    );
}