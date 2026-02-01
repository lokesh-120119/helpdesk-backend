# Helpdesk Backend Application

This is a backend project built using Node.js and Express.
It is a simple Helpdesk system where users can create support tickets
and view existing tickets using REST APIs.

## Module 1: Project Setup & Database Connection
- Node.js project initialized
- Express installed and configured
- MySQL database connection established
- Server running on port 3000

## Module 2: Fetch Tickets API
- GET /tickets API implemented
- Fetches all tickets from the database
- Tested using Postman

## Module 3: Create Ticket API
- POST /tickets API implemented
- Accepts user_id, title, and description
- Validates required fields
- Inserts ticket into database with status as 'open'
- Tested successfully using Postman

## Technologies Used
- Node.js
- Express.js
- MySQL

## How to Run This Project
1. Clone the repository
2. Run npm install
3. Start the server using node server.js
4. Server will run on http://localhost:3000

## API Endpoints
- POST /tickets : Create a new ticket
- GET /tickets  : Fetch all tickets

## Note
node_modules folder is ignored using .gitignore and is not pushed to GitHub.

## Module 4 – Update Ticket Status

- PUT /tickets/:id
- Update ticket status (open / closed)
- Request body validation
- MySQL UPDATE query implemented
- Tested using Postman

## Module 5 – Delete Ticket

### Description
This module handles deleting a ticket from the helpdesk system using ticket ID.

### API Endpoint
DELETE /tickets/:id

### Functionality
- Deletes a ticket based on the provided ID
- Returns success message if deleted
- Returns error if ticket not found

### Example Request
DELETE http://localhost:3000/tickets/1

### Example Response
{
  "message": "Ticket deleted successfully"
}

### Status
Module 5 completed and tested successfully using Postman.

## Module 6 – Update Ticket Status

This module allows updating the status of an existing helpdesk ticket.

### API Endpoint
PUT /tickets/:id

### Request Params
- id: Ticket ID

### Request Body (JSON)
{
  "status": "closed"
}

### Success Response
{
  "message": "Ticket status updated successfully"
}

### Error Responses
- 400: Status is required
- 404: Ticket not found
- 500: Update failed

### Testing
Tested using Postman by updating ticket status with valid and invalid ticket IDs.