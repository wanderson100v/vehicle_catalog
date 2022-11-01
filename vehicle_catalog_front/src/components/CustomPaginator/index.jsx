import { Pagination} from '@mui/material';
import styles from './styles.module.scss';

export function CustomPaginator({totalPages, page, handleChangePagination}){

    return (
        <>
            <div className={styles.paginationContainer}>
                <Pagination 
                    color="primary"
                    count={totalPages} 
                    page={page}
                    sx={{
                        color:'white'
                    }} 
                    shape="rounded" 
                    onChange={handleChangePagination} 
                />
            </div>
        </>
    );
}