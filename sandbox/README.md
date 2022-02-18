 # ![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)


# CRM Client API

This is the back-end of a Customer Relationship Ticketing application.

## How to use

-run `npm start`

Note: make sure you have nodemon installed on your system or install it as a dependency.

## API Resources

### User API Resources

All the user API router follows `/v1/user/`

| #   | Routers                   | Verbs  | Progress | Private | Description                                      |
| --- | ------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1   | `/v1/user`                | GET    | Done     | Yes        | Get user Info                                    |
| 2   | `/v1/user`                | POST   | Done     | No         | Create a user                                    |
| 3   | `/v1/user/login`          | POST   | Done     | No         | Verify user Authentication and return JWT        |
| 4   | `/v1/user/reset-password` | POST   | Done     | No         | Verify email and email pin to reset the password |
| 5   | `/v1/user/reset-password` | PATCH  | Done     | No         | Replace with new password                        |
| 6   | `/v1/user/logout`         | DELETE | Done     | Yes        | Delete user accessJWT                            |

### Ticket API Resources

All the user API router follows `/v1/ticket/`

| #   | Routers                        | Verbs | Progress | Private | Description                             |
| --- | ------------------------------ | ----- | -------- | ---------- | --------------------------------------- |
| 1   | `/v1/ticket`                   | GET   | Done     | Yes        | Get all tickets for the logged in user  |
| 2   | `/v1/ticket/{id}`              | GET   | Done     | Yes        | Get a ticket's details                    |
| 3   | `/v1/ticket`                   | POST  | Done     | Yes        | Create a new ticket                     |
| 4   | `/v1/ticket/{id}`              | PUT   | Done     | Yes        | Update ticket details |
| 5   | `/v1/ticket/close-ticket/{id}` | PATCH | Done     | Yes        | Update ticket status to closed           |
| 6   | `/v1/ticket/{id}`              | DELETE | Done     | Yes        | Delete a ticket                         |

### Tokens API Resources

All the user API router follows `/v1/tokens`

&nbsp;

## The front-end of this application can be found here:

  #### Repository: https://github.com/Xr7TSi/crm-frontend
  &nbsp;

## [Link to deployed application](https://xr7tsi.com/)

![CRM image](assets/PostCenterResize.png)


&nbsp;

 ## Github: 
 https://github.com/Xr7TSi
 &nbsp;
  #### Email me at jrein1296@gmail.com
  #### Repository: https://github.com/Xr7TSi/crm-client-api
  &nbsp;


