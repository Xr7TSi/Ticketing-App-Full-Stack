import { openNewTicketPending,
    openNewTicketSuccess,
    openNewTicketFailure} from './addTicketSlice';
import {createNewTicket} from '../../api/ticketAPI';  

export const openNewTicket = (formData) => dispatch => {
    return new Promise( async (resolve, reject) => {
        try {
            
            dispatch(openNewTicketPending());

            const result = await createNewTicket(formData);

            if(result.status === "error"){  
                dispatch(openNewTicketFailure(result.message));
                reject(result.message);
            };

            dispatch(openNewTicketSuccess(result.message));
            
        } catch (error) {
            console.log(error);
            dispatch(openNewTicketFailure("Error at openNewTicket /" + error.message));
        }
    })
}

