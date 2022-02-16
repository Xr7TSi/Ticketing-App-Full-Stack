import axios from "axios";

const rootURL = "http://localhost:5000/v1/";

const ticketURL = rootURL + "ticket/";
const getAllTicketsURL = ticketURL + "all-tickets/";
const getAllOpenTicketsURL = ticketURL + "all-open-tickets/";
const getAllClosedTicketsURL = ticketURL + "all-closed-tickets/";
const closeTicketURL = rootURL + "ticket/close-ticket/";

export const getAllTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(getAllTicketsURL, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });
      resolve(result);
    } catch (error) {
      reject("Error at getAllTickets / " + error);
    }
  });
};

export const getAllOpenTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(getAllOpenTicketsURL, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });
      resolve(result);
    } catch (error) {
      reject("Error at getAllOpenTickets / " + error);
    }
  });
};

export const getAllClosedTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(getAllClosedTicketsURL, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });
      resolve(result);
    } catch (error) {
      reject("Error at getAllClosedTickets / " + error);
    }
  });
};

export const getSingleTicket = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(ticketURL + _id, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });
      resolve(result);
    } catch (error) {
      reject("Error at getSingleTicket / " + error);
    }
  });
};

export const addReplyToTicket = (_id, msgObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.put(ticketURL + _id, msgObj, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });
      resolve(result.data);
    } catch (error) {
      reject("Error at addReplyToTicket / " + error);
    }
  });
};

export const updateTicketStatusClosed = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // patch method expects to have a body, hence the empty object {}
      const result = await axios.patch(
        closeTicketURL + _id,
        {},
        {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
          },
        }
      );
      resolve(result.data);
    } catch (error) {
      reject("Error at updateTicketStatusClosed / " + error);
    }
  });
};

export const createNewTicket = (formData) => {
  console.log("Form Data from API ", formData);
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(ticketURL, formData, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result.data);
    } catch (error) {
      console.log(error.message);
      reject("Error at createNewTicket / " + error);
    }
  });
};
