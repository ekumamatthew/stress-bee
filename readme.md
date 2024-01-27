
## API Endpoints

This document outlines the available API endpoints, their expected inputs, and the expected outputs.


### User Registration

- **Endpoint**: `/api/auth/register`
- **Method**: `POST`
- **Input**:
  - `username`: String (required)
  - `password`: String (required)
- **Output**:
  - Success: Status 201 with user details (excluding password)
  - Error: Status 400 with error message
- **Description**: Registers a new user. Passwords are hashed before storage.


### User Login

- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Input**:
  - `username`: String (required)
  - `password`: String (required)
- **Output**:
  - Success: Status 200 with user details and JWT token
  - Error: Status 401 for login failure, Status 400 for other errors
- **Description**: Authenticates a user and returns a JWT for accessing protected routes.


### Add Participant (Supervisor Only)

- **Endpoint**: `/api/participants`
- **Method**: `POST`
- **Input**:
  - `name`: String (required)
  - `Authorization`: Bearer Token (JWT)
- **Output**:
  - Success: Status 201 with participant details
  - Error: Status 401 for unauthorized access, Status 400 for other errors
- **Description**: Adds a new participant to the database. Requires supervisor privileges.


### Add Episode Data to Participant (Supervisor Only)

- **Endpoint**: `/api/participants/:id/episodes`
- **Method**: `POST`
- **Input**:
  - `STAI`: Number
  - `NASA`: Number
  - `Authorization`: Bearer Token (JWT)
- **Output**:
  - Success: Status 200 with updated participant details
  - Error: Status 404 if participant not found, Status 401 for unauthorized access, Status 400 for other errors
- **Description**: Adds episode data to an existing participant. Requires supervisor privileges.


## Get All Participants

- **Endpoint**: `/api/participants`
- **Method**: `GET`
- **Input**:
  - `Authorization`: Bearer Token (JWT)
- **Output**:
  - Success: Status 200 with an array of all participant details
  - Error: Status 401 for unauthorized access, Status 400 for other errors
- **Description**: Retrieves a list of all participants in the database. Accessible to both admin and user roles.

### Example Response:

```json
[
    {
        "_id": "5f50c31f1234567890abcdef",
        "name": "Participant One",
        "episodes": [
            { "STAI": 8, "NASA": 31 },
            { "STAI": 9, "NASA": 30 }
        ]
    },
    {
        "_id": "5f50c31f1234567890fedcba",
        "name": "Participant Two",
        "episodes": [
            { "STAI": 7, "NASA": 32 }
        ]
    }
    // ... more participants
]
```

