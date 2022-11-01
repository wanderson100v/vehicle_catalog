import styles from './styles.module.scss';
import { Typography} from '@mui/material';

export function FeedbackEmptyItems({message}){
    return (
        <>
           <div className={styles.feedbackEmptyItems}>
                <Typography variant='body1'>{message}</Typography>
            </div>
        </>
    );
}