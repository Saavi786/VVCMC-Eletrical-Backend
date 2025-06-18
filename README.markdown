# Meter Management API Backend

This is a Node.js Express backend for managing meter-related data and user authentication. The API provides RESTful endpoints for handling meter data (e.g., consumer information, images, responses) and user management (e.g., registration, login, password updates). This README is structured as Swagger-like documentation for backend developers to understand the API's functionality, endpoints, and raw request/response formats.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
  - [Meter Data Endpoints](#meter-data-endpoints)
  - [User Authentication Endpoints](#user-authentication-endpoints)
- [Error Handling](#error-handling)
- [File Structure](#file-structure)
- [Dependencies](#dependencies)

## Overview

The Meter Management API supports two primary functionalities:

- **Meter Data Management**: Create, read, update, and delete meter-related data, including Base64-encoded images for meters, timer panels, and poles. It also supports ward-wise counts and date-based filtering.
- **User Authentication**: Register, login, update passwords, and delete admin users, with JWT-based authentication and bcrypt password hashing.

All endpoints expect **Content-Type: application/json** for requests. Base64 images are saved to the filesystem, and unique identifiers are generated for records.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for routing and middleware.
- **MongoDB/Mongoose**: NoSQL database and ORM for data storage.
- **Multer**: Handles Base64 image uploads.
- **Moment-timezone**: Date/time handling in Asia/Kolkata timezone.
- **UUID**: Generates unique ApplicationIDs.
- **fs/path**: Node.js modules for filesystem operations.
- **bcryptjs**: Password hashing for secure storage.
- **jsonwebtoken**: JWT-based authentication.
- **authMiddleware**: Custom middleware for protecting routes.

## Setup

### Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### Install Dependencies
```bash
npm install
```

### Configure MongoDB
- Ensure MongoDB is running locally or provide a MongoDB URI.
- Update the connection string in your app (e.g., in `index.js` or a config file).

### Set Environment Variables
- Create a `.env` file in the root directory with:
```
PORT=3000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=vvcm
```

### Start the Server
```bash
npm start
```
The server runs on `http://localhost:3000` (or the configured port).

## API Endpoints

### Meter Data Endpoints

#### POST /add-data
**Description**: Add new meter data with optional Base64 images.  
**Request Body**:
```json
{
  "WardCommittee": "string",
  "ConsumerID": "string",
  "NewMeterNumber": "string",
  "Purpose": "string",
  "Type": "string",
  "Address": "string",
  "MeterLatitude": "number",
  "MeterLongitude": "number",
  "SanctionLoad": "number",
  "TimerPanel": "boolean",
  "MeterImage": "string (Base64)",
  "TimerPanelImage": "string (Base64)"
}
```
**Responses**:
- **201 Success**:
```json
{
  "message": "Data saved successfully",
  "data": {
    "ApplicationID": "string",
    "WardCommittee": "string",
    "ConsumerID": "string",
    "NewMeterNumber": "string",
    "Purpose": "string",
    "Type": "string",
    "Address": "string",
    "MeterLatitude": "number",
    "MeterLongitude": "number",
    "SanctionLoad": "number",
    "TimerPanel": "boolean",
    "Date": "string (YYYY-MM-DD)",
    "Time": "string (HH:mm:ss)",
    "MeterImageData": "string (filename)",
    "TimerPanelImage": "string (filename)",
    "_id": "string",
    "__v": 0
  }
}
```
- **400**: ConsumerID already exists
- **500**: Server error

#### GET /get-new-data
**Description**: Retrieve all meter data.  
**Response**:
- **200 Success**:
```json
[
  {
    "_id": "string",
    "ApplicationID": "string",
    "WardCommittee": "string",
    "ConsumerID": "string",
    "NewMeterNumber": "string",
    "Purpose": "string",
    "Type": "string",
    "Address": "string",
    "MeterLatitude": "number",
    "MeterLongitude": "number",
    "SanctionLoad": "number",
    "TimerPanel": "boolean",
    "Date": "string (YYYY-MM-DD)",
    "Time": "string (HH:mm:ss)",
    "MeterImageData": "string (filename)",
    "TimerPanelImage": "string (filename)",
    "Response": []
  }
]
```
- **500**: Server error

#### DELETE /delete-data/:ConsumerID
**Description**: Delete meter data by ConsumerID.  
**Parameters**:
- **ConsumerID** (path): String  
**Responses**:
- **200 Success**:
```json
{
  "message": "Data deleted successfully",
  "data": {}
}
```
- **404**: Data not found
- **500**: Server error

#### POST /add-response/:ConsumerID
**Description**: Add a response to the Response array for a ConsumerID.  
**Parameters**:
- **ConsumerID** (path): String  
**Request Body**:
```json
{
  "WardCommittee": "string",
  "PoleName": "string",
  "HightofPole": "number",
  "TypeofBracket": "string",
  "Bracket": "string",
  "NumberLight": "number",
  "LightName": "string",
  "Watts": "number",
  "PoleLatitude": "number",
  "PoleLongitude": "number",
  "CableType": "string",
  "SubTypeName": "string",
  "CableWatts": "number",
  "PoleImage": "string (Base64)"
}
```
**Responses**:
- **200 Success**:
```json
{
  "message": "Response data added successfully",
  "data": {
    "_id": "string",
    "ConsumerID": "string",
    "Response": [
      {
        "WardCommittee": "string",
        "ConsumerID": "string",
        "TypeofPole": {
          "PoleName": "string",
          "HightofPole": "number",
          "TypeofBracket": "string",
          "Bracket": "string"
        },
        "TypeofLight": {
          "LightName": "string",
          "Watts": "number"
        },
        "NumberLight": "number",
        "PoleImageData": "string (filename)",
        "PoleLatitude": "number",
        "PoleLongitude": "number",
        "TypesofCable": {
          "CableType": "string",
          "SubTypeName": "string",
          "CableWatts": "number"
        },
        "Date": "string (YYYY-MM-DD)",
        "Time": "string (HH:mm:ss)",
        "_id": "string"
      }
    ]
  }
}
```
- **404**: ConsumerID not found
- **500**: Server error

#### DELETE /delete-response/:ConsumerID/:responseId
**Description**: Delete a specific response by ID.  
**Parameters**:
- **ConsumerID** (path): String
- **responseId** (path): String  
**Responses**:
- **200 Success**:
```json
{
  "message": "Response deleted successfully",
  "data": {}
}
```
- **404**: ConsumerID or Response not found
- **500**: Server error

#### GET /new-ward-count
**Description**: Get ward-wise meter count.  
**Response**:
- **200 Success**:
```json
[
  {
    "wardCommittee": "string",
    "count": "number"
  }
]
```
- **500**: Server error

#### GET /ward-wise-response-count
**Description**: Get ward-wise response count.  
**Response**:
- **200 Success**:
```json
[
  {
    "wardCommittee": "string",
    "count": "number"
  }
]
```
- **500**: Server error

#### GET /data/today
**Description**: Get meter data for the current day.  
**Response**:
- **200 Success**:
```json
[
  {
    "_id": "string",
    "ApplicationID": "string",
    "WardCommittee": "string",
    "ConsumerID": "string",
    "Date": "2025-06-18"
  }
]
```
- **500**: Server error

#### GET /data/year-month?month=MM&year=YYYY
**Description**: Get meter data for a specific month and year.  
**Query Parameters**:
- **month**: String (MM)
- **year**: String (YYYY)  
**Response**:
- **200 Success**:
```json
[
  {
    "_id": "string",
    "ApplicationID": "string",
    "WardCommittee": "string",
    "ConsumerID": "string",
    "Date": "string (YYYY-MM-DD)"
  }
]
```
- **400**: Missing month or year
- **500**: Server error

#### PUT /update-consumer/:consumerId
**Description**: Update consumer data, including optional Base64 images.  
**Parameters**:
- **consumerId** (path): String  
**Request Body**:
```json
{
  "WardCommittee": "string",
  "NewMeterNumber": "string",
  "MeterImageData": "string (Base64)",
  "TimerPanelImage": "string (Base64)",
  "Response": [
    {
      "PoleImageData": "string (Base64)"
    }
  ]
}
```
**Responses**:
- **200 Success**:
```json
{
  "_id": "string",
  "WardCommittee": "string",
  "ConsumerID": "string",
  "NewMeterNumber": "string",
  "MeterImageData": "string (filename)",
  "Response": [
    {
      "PoleImageData": "string (filename)",
      "_id": "string"
    }
  ]
}
```
- **404**: Document not found
- **400**: Invalid request
- **500**: Server error

### User Authentication Endpoints

#### POST /login
**Description**: Authenticate a user and return a JWT token.  
**Request Body**:
```json
{
  "Email": "string",
  "Password aldrin": "string"
}
```
**Responses**:
- **200 Success**:
```json
{
  "token": "string",
  "data": {
    "_id": "string",
    "Name": "string",
    "Email": "string",
    "Phone": "string",
    "Role": "string",
    "Ward": "string",
    "SuperAdmin": "boolean"
  }
}
```
- **400**: Invalid credentials
- **500**: Server error

#### POST /add-user
**Description**: Register a new user with hashed password.  
**Request Body**:
```json
{
  "Name": "string",
  "Email": "string",
  "Phone": "string",
  "Password": "string",
  "Role": "string",
  "Ward": "string",
  "SuperAdmin": "boolean"
}
```
**Responses**:
- **201 Success**:
```json
{
  "message": "User registered successfully"
}
```
- **400**: User already exists
- **500**: Server error

#### DELETE /delete-user/:Email
**Description**: Delete a user by Email.  
**Parameters**:
- **Email** (path): String  
**Responses**:
- **200 Success**:
```json
{
  "message": "User deleted successfully"
}
```
- **404**: User not found
- **500**: Server error

#### PUT /update-password
**Description**: Update a user's password.  
**Request Body**:
```json
{
  "Email": "string",
  "newPassword": "string"
}
```
**Responses**:
- **200 Success**:
```json
{
  "message": "Password updated successfully",
  "user": {
    "_id": "string",
    "Name": "string",
    "Email": "string",
    "Phone": "string",
    "Role": "string",
    "Ward": "string",
    "SuperAdmin": "boolean"
  }
}
```
- **404**: User not found
- **500**: Server error

#### GET /user
**Description**: Get authenticated user data (requires JWT).  
**Headers**:
- **Authorization**: Bearer <token>  
**Response**:
- **200 Success**:
```json
{
  "userData": {
    "user": {
      "Email": "string",
      "id": "string",
      "SuperAdmin": "boolean"
    }
  }
}
```
- **500**: Server error

#### GET /get-user
**Description**: Retrieve all admin users.  
**Response**:
- **200 Success**:
```json
[
  {
    "_id": "string",
    "Name": "string",
    "Email": "string",
    "Phone": "string",
    "Role": "string",
    "Ward": "string",
    "SuperAdmin": "boolean"
  }
]
```
- **500**: Server error

## Error Handling

The API uses standard HTTP status codes with JSON error messages:

- **400**: Bad request (e.g., duplicate ConsumerID, invalid credentials).
- **404**: Resource not found (e.g., ConsumerID, user, or response not found).
- **500**: Internal server error (e.g., database or filesystem issues).

**Example Error Response**:
```json
{
  "message": "Consumer ID already exists"
}
```

## File Structure

```
├── config/
│   └── multerConfig.js           # Multer configuration for Base64 uploads
├── controllers/
│   ├── newController.js          # Meter data API logic
│   └── adminLoginController.js   # User authentication API logic
├── middleware/
│   └── authMiddleware.js         # JWT authentication middleware
├── Model/
│   ├── newschema.js              # Mongoose schema for meter data
│   └── adminLoginSchema.js       # Mongoose schema for user data
├── routes/
│   ├── newRoutes.js              # Meter data routes
│   └── adminLoginRoutes.js       # User authentication routes
├── Uploads/                      # Directory for saved images
├── README.md                     # API documentation
├── package.json                  # Dependencies and scripts
└── index.js                      # Server entry point
```

## Dependencies

Install dependencies using:
```bash
npm install express mongoose multer moment-timezone uuid bcryptjs jsonwebtoken
```

- **express**: Web framework.
- **mongoose**: MongoDB ORM.
- **multer**: Base64 image uploads.
- **moment-timezone**: Date/time formatting.
- **uuid**: Unique ID generation.
- **bcryptjs**: Password hashing.
- **jsonwebtoken**: JWT authentication.
- **fs, path**: Filesystem operations.