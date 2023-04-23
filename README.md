# CA2GroupAProject
------------------------------

# House Rental System

The Housing Rental System Application is a web-based platform that allows house owners in Ireland to post their properties for rent or sale. The platform enables property owners to create listings with all relevant information, including photographs, pricing, and contact details, making it easy for potential renters or buyers to find and inquire about available properties. The platform also allows users to filter listings based on their preferences, such as property type and city helping them to find suitable options quickly and easily. The Housing System Application is a valuable tool for anyone looking to rent or buy a property in Ireland, as well as for landlords and property owners who wish to reach a larger audience of potential tenants or buyers.  


## Table of Contents

Features 

Technologies Used 

Installation and Setup 

Context Diagram

Use Case Diagram

API Documentation 

Contributing 

References 
## Features

- House owners can create an account and post their properties for rent or sale. 
- Users can view the properties and contact the owners through a form on the property page. 
- House owners can update or delete their properties. 
- Search functionality to search for properties based on location and other criteria. 


## Tech Stack

**Client:** ReactJS, React Router, Tailwind CSS, Flowbit, Axios  

**Server:** Python Flask, MYSQL, FLask-CORS


## Installation and Setup

Clone the repository:

```bash
  git clone https://github.com/KRVaghani/CA2GroupAProject.git
```

First setup database:

```bash
  cd CA2GroupAProject/Backend/Database 
```

Install the backend required packages:

```bash
  cd CA2GroupAProject/Backend/HouseRentalService
  pip install -r requirements.txt 
```
    
Start the server: 

This will start the Flask server on localhost:5000
```bash
  python app.py 	 
``` 

Install the frontend required packages:

```bash
  cd CA2GroupAProject/Frontend/HouseRentalPortal
  we are used nodejs 16.19.1 version in our project frontend
  npm install 
```

Start the client: 

This will start the React development server on localhost:3000 
```bash
  cd client 
  npm start  
``` 
## Context Diagram

![App Screenshot](https://github.com/KRVaghani/CA2GroupAProject/blob/main/Screenshots/Context%20Diagram.png?raw=true)

In this diagram, we have added two main components: Property Endpoints and Authentication Endpoints. Property Endpoints represent the functionality related to property management, such as creating, updating, and deleting property listings. Authentication Endpoints represent the functionality related to user authentication and authorization. 

## Use Case Diagram

![App Screenshot](https://github.com/KRVaghani/CA2GroupAProject/blob/main/Screenshots/Use%20Case%20Diagram.jpg?raw=true)

View Properties: This action allows the user to view all available properties in the system. 

Search Properties: This action allows the user to search for properties based on specific criteria, such as location, price range, or number of bedrooms. 

Contact Property Owner: This action allows the user to contact the owner of a specific property for more information or to arrange a viewing. 

Create Property Listing: This action allows the user to create a new property listing, which will then be displayed to other users in the system. 

Edit Property Listing: This action allows the user to edit an existing property listing that they have created. 

Delete Property Listing: This action allows the user to delete an existing property listing that they have created. 

Each of these actions is connected to the relevant endpoints in the system that allow the user to perform 
them. For example, View Properties is connected to the View Properties Endpoint, while Contact Property Owner is connected to the Contact Property Owner Endpoint. The arrows in the diagram show the direction of communication between the user and the different components of the system. 

## API Reference

#### The request method is the way we distinguish what kind of action our endpoint is being "asked" to perform. For example, GET pretty much gives itself. But we also have a few other methods that we use quite often.

| Method | URL     | Description                |
| :-------- | :------- | :------------------------- |
| `post` | `/login` | Login |
| `post` | `/property` | Add property |
| `get` | `/properties` | Retrieve all properties |
| `get` | `/existing-property-endpoint/{id}` | View specific property |
| `post` | `/register` |Registration |
| `post` | `/change_password` | Change password|
| `put` | `/update_property` | Update specific  property |
| `delete` | `/delete_property` | Delete specific property|
| `get` | `/my_properties` |  View owner's property|
| `get` | `/search_properties` | Search properties  |
| `get` | `/filter_properties` | Filter properties |
| `post` | `/submit_property_request` | Submit property request |


```


## Authentication

To perform the actions on the property listing, the user must be authenticated and authorized to perform the action. We are using JSON Web Tokens (JWT) for authentication. A JSON Web Token (JWT) is a method of encoding security tokens in a JSON format, which allows for the sharing of identity and security information across different security domains. The token is created by an Identity Provider and is used by a Relying Party to verify the identity of the token's subject for security-related purposes (Jones, M., Campbell, B. and Mortimore, C., 2015).

 

To authenticate, send a POST request to the /api/auth/login endpoint with the user's email and password in the request body. If the login is successful, the server will respond with a JWT token. 

 To authorize a user to perform action on property listing, we check that the user ID associated with the property listing matches the ID of the authenticated user. 

To include the JWT token in subsequent requests, include an Authorization header in the request with the value Bearer <token>, where <token> is the JWT token returned by the login endpoint. 


```bash
POST /login HTTP/1.1 
Content-Type: application/json

{ 
    "email": "user@example.com", 
    "password": "password123" 
} 

HTTP/1.1 200 OK 
Content-Type: application/json

{ 
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6
    IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5
    jb20iLCJpYXQiOjE2MTk1NzU5NTYsImV4cCI
    6MTYxOTU3OTU1Nn0.VJiD9X6lIoe6bZUq3dC6hJuF2yJhN_rdtPh_xDnvwek" 
} 
```


## Contributions

Kaushik's Contribution:

- Seting up Project Structure
- Implemented UI and API call in ReactJS
- Seting up Backend in Flask
- Seting up MYSQl Database
- Login and Registration API end point
- Property Create And Properties View API end point


Vibhav's Contribution:

- Made user and contex diagram to make better understanding of the system & requirement.
- Backend Implementation Using Flask
- Update Property API end point
- Submit Property Request API end point

Ankur's Contribution:

- Filter Property API end point
- Change Password Property API end point
- Implemented UI in ReactJS with group members
- Seting up tables with relationship in Database


Victor's Contribution:

- Delete Property API end point
- Search Properties



## Design screenshots

![App Screenshot](https://raw.githubusercontent.com/KRVaghani/CA2GroupAProject/main/Screenshots/ss1.png)
![App Screenshot](https://github.com/KRVaghani/CA2GroupAProject/blob/main/Screenshots/ss2.png?raw=true)


## Refernces

Jones, M., Campbell, B. and Mortimore, C., 2015. JSON Web Token (JWT) profile for OAuth 2.0 client authentication and authorization Grants (No. rfc7523).

flask.https://flask.palletsprojects.com/en/2.2.x/

ReactJS.https://react.dev/

How To Use MySQL Database With Flask.2021. [Youtube]. Available at online:https://www.youtube.com/watch?v=hQl2wyJvK5k&t=11s [Accessed on 15 April, 2023]

To write a readme file:https://readme.so/

