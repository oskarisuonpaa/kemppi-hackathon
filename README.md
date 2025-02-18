# Team Spark's Kemppi Hackathon 2025 Project

## Team Members

- Oskari Suonpää
- Aleksi Sorjonen

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

# Frontend Application Overview

## Table of Contents

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

## Application Structure

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

This README provides a high-level overview of the frontend application. For more detailed information, refer to the individual component files and their respective documentation.
