import {
  fetchTicketLoading,
  fetchTicketSuccess,
  fetchTicketFailure,
  searchTickets,
  fetchSingleTicketLoading,
  fetchSingleTicketSuccess,
  fetchSingleTicketFailure,
  replyTicketLoading,
  replyTicketSuccess,
  replyTicketFailure,
  closeTicketLoading,
  closeTicketSuccess,
  closeTicketFailure,
} from "./ticketSlice";
import {
  getAllTickets,
  getSingleTicket,
  addReplyToTicket,
  updateTicketStatusClosed
} from "../../api/ticketAPI";

export const fetchAllTickets = () => async (dispatch) => {
  dispatch(fetchTicketLoading());

  try {
    const result = await getAllTickets();

    // if there are tickets, dispatch 
    result.data.result.length && dispatch(fetchTicketSuccess(result.data.result));
  } catch (error) {
    dispatch(fetchTicketFailure("Error at fetchAllTickets / " + error.message));
  }
};

export const filterSearchedTickets = (str) => (dispatch) => {
  dispatch(searchTickets(str));
};

export const fetchSingleTicket = (_id) => async (dispatch) => {
  dispatch(fetchSingleTicketLoading());

  try {
    const result = await getSingleTicket(_id);
    // if there are multiple tickets, use the first one
    dispatch(fetchSingleTicketSuccess(result.data.result));
  } catch (error) {
    dispatch(
      fetchSingleTicketFailure("Error at fetchSingleTicket / " + error.message)
    );
  }
};

export const replyToTicket = (_id, msgObj) => async (dispatch) => {
  dispatch(replyTicketLoading());

  try {
    const result = await addReplyToTicket(_id, msgObj);
    console.log(result);
    if(result.status === "error"){
      return dispatch(replyTicketFailure("Error at replyToTicket / " + result.message));
    }
    dispatch(fetchSingleTicket(_id));
    dispatch(replyTicketSuccess(result.message));
  } catch (error) {
    dispatch(replyTicketFailure("Error at replyToTicket / " + error.message));
  }
};

export const closeTicket = (_id) => async (dispatch) => {
  dispatch(closeTicketLoading());

  try {
    const result = await updateTicketStatusClosed(_id);
    console.log(result);
    if(result.status === "error"){
      return dispatch(closeTicketFailure("Error at updateTicketStatusClosed / " + result.message));
    }
    dispatch(fetchSingleTicket(_id));
    dispatch(closeTicketSuccess(result.message));
  } catch (error) {
    dispatch(closeTicketFailure("Error at updateTicketStatusClosed / " + error.message));
  }
};
