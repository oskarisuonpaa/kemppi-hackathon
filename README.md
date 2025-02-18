# Team Spark's Kemppi Hackathon 2025 Project

## Team Members

- [Oskari Suonpää](https://github.com/oskarisuonpaa)
- [Aleksi Sorjonen](https://github.com/SorjonenA)
- [Sergei Roitonen](https://github.com/roitonen)
- [Joona Kivelä](https://github.com/Jomppa69)

## Project Description

The project is a web application for managing the Kemppi welding data. The application allows users, depeding on their role, to view data of differing degrees of detail. The application also allows admin users to manage other users and their roles. The application is built using MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

The project is divided into two main folders: backend and frontend. The backend folder contains the backend code for the project, while the frontend folder contains the frontend code for the project.

## How to Run

The project can be run from the root folder by running the following commands:

- ```npm run init```: This command will install the necessary dependencies for both the frontend and the backend.
- ```npm run dev```: This command will start the backend and the frontend concurrently.


However, the backend and the frontend can also be ran separately. To run the backend, navigate to the backend folder and run the following command:
```npm run dev```.

To run the frontend, navigate to the frontend folder and run the following command:
```npm run dev```.

> [!IMPORTANT]  
> Both the backend and the frontend need to be running concurrently for the project to work properly.  

> [!IMPORTANT]  
> Both the backend and the frontend need .env files to work properly. Templates for the .env files can be found in the backend and frontend folders.

## How to Test

Testing was implemented on the backend using Jest. To run the tests, navigate to the backend folder and run the following command:
```npm test```.






# Application Structure

## Backend Application Overview

### Table of Contents


- [controllers](#controllers)
  - [data](#data)
  - [login](#login)
  - [users](#users)
  - [visitor](#visitor)
- [models](#models)
  - [user](#user)
  - [weldingData](#weldingData)
- [utils](#utiös)
  - [dataHelper](#dataHelper)
  - [middleware](#middleware)
  - [roleDataFilter](#roleDataFilter)

  ## controllers

  ### data
  `data.ts` contains and handles all endpoints that are used for handling the welding data. Also allows extensive filtering of data, which was not implemented in final product.

  ### users
  `user.ts` contains all endpoints used for creating, modifying, deleting and getting users.

  ### visitor
  `visitor.ts` contains single endpoint for getting simplified visitor data.

  ### login
  `login.ts` contains post endpoint for logging in.

  ## models

  ### user
  `user.ts` contains mongoose schema and model for getting user data from database server.

  ### weldingData
  `weldingData.ts` contains mongoose schema for data thats received from Kemppi api and a model for database server.

  ## utils

  ### dataHelper
  `dataHelper.ts` contains functions for manipulating data(at the moment only for visitor endpoint).

  ### middleware
  `middleware.ts` contains important middleware used in the backend. Logger for requests that is used in backends debugging. Unknown endpoint and errorhandlers are also defined here. 
  Middleware also contains tokenExtractor and userExtractor functions, which are important for security. tokenExtractor gets the authorization token from requests, confirms its correct and attaches it to the request. userExtractor gets the confirmed token from the request and finds the user with it. User is then attached to the request. `/api/users` and `/api/data` endpoints require user and token to be attached to the request.

  ### roleDataFilter
  `roleDataFilter.ts` filters the data received from `/api/data` endpoint according to the users groups. 


## Frontend Application Overview

### Table of Contents

- [Application Structure](#application-structure)
- [Sections](#sections)
  - [NavBar](#navbar)
  - [MainSection](#mainsection)
  - [ChartSection](#chartsection)
  - [adminPanel](#adminpanel)
  - [visitorSection](#visitorsection)
  - [FooterSection](#footersection)
- [ChartSection Components](#chartsection-components)
  - [WeldingList](#weldinglist)
  - [Charts](#charts)
- [Authorization](#authorization)
- [User Management](#user-management)
   
  The `App.tsx` file controls the rendering logic based on user roles, ensuring that users see content relevant to their permissions.

  ## Sections

  ### NavBar

  The `NavBar` component contains the login logic, allowing users to authenticate and access the application.

  ### MainSection

  The `MainSection` serves as the primary content area, displaying information and components based on the user's role and interactions.

  ### ChartSection

  The `ChartSection` is dedicated to displaying various charts and data visualizations related to welding operations.

  ### adminPanel

  The `adminPanel` provides administrative functionalities, allowing admins to manage users and other settings.

  ### visitorSection

  The `visitorSection` is designed for visitors, offering limited access to certain features and information.

  ### FooterSection

  The `FooterSection` contains footer information, such as links and copyright details.

  ## ChartSection Components

  ### WeldingList

  The `WeldingList` component displays a list of welding operations, providing an overview of the data available for visualization.

  ### Charts

  - **WeldingComparisonChartEnergy**: Compares energy consumption across different welding operations.
  - **WeldingComparisonChartPower**: Visualizes power usage in welding processes.
  - **UsedWeldingMachinesChart**: Shows the utilization of welding machines over time.
  - **WeeklyConsumptionChart**: Displays weekly consumption metrics, including weld time, wire consumption, filler consumption, and gas consumption.

  ## Authorization

  ### authContext

  The `authContext` manages user authentication by retrieving the username, token, and role from `localStorage`. This information is used to control what content is rendered based on the user's role.

  **Note**: Storing authentication details in `localStorage` is not secure. Consider using more secure storage solutions for production environments.

  ## User Management

  The `adminPanel` includes user management functionalities, allowing admins to:

  - **addUser**: Add new users to the system.
  - **deleteUser**: Remove users from the system.
  - **userManager**: Manage user details and permissions.
