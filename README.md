# Bitespeed-Backend-Task-Identity-Reconciliation
This repository contains a Node.js application that can be deployed using Docker.

## Prerequisites

Make sure you have the following dependencies installed on your system:

- Docker: [Installation Guide](https://docs.docker.com/get-docker/)

## Getting Started

To run the Node.js app using Docker, follow these steps:

1. Clone the repository:

`git clone https://github.com/pratikmystery/Bitespeed-Backend-Task-Identity-Reconciliation.git`

2. Navigate to the project directory:

`cd dir`

3. Build the Docker image:

`docker-compose up --build`

Now the Docker container will start and map port 3000 of the container to port 3000 of your local machine

5. Access the application:
Open your web browser or postman to access the running Node.js app.

### GET

`localhost:3000/contacts` 

Returns all the contacts in the db

### POST

`localhost:3000/identity`

Accepts json data and return a response, based on the following [requirements](https://bitespeed.notion.site/Bitespeed-Backend-Task-Identity-Reconciliation-53392ab01fe149fab989422300423199) 
