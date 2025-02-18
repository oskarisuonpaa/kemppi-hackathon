# Team Spark's Kemppi Hackathon 2025 Project

## Team Members

- Oskari Suonpää

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
