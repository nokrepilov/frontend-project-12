### Hexlet tests and linter status:
[![Actions Status](https://github.com/nokrepilov/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/nokrepilov/frontend-project-12/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/2592ae9fd7d5f665762a/maintainability)](https://codeclimate.com/github/nokrepilov/frontend-project-12/maintainability)

# [Real-time Chat Application](https://frontend-project-12-6635.onrender.com) (like Slack).
## Description
Project using Hexlet backend server for requests and auth operations. The registration, authorization, and logout functions have been implemented. You can register as a new user or, for convenience, use the following login and password combination to sign in: admin admin. The user can interact with various channels, add-edit-delete them. Also, the user has access to the function of changing the interface locale (Russian and English languages are available). The functionality of pop-up notifications (react-toastify) is operational. Censorship (leo-profanity) has been applied to the interface.

## Features

- Registration user
- Login user
- Send messages
- Receive messages online from another users
- Add new channels
- Rename new channels
- Delete new channels

## System requirements

For the project to work, you must have an installed Node.js 10+ version

## Installation

### Clone repository
    git clone https://github.com/nokrepilov/frontend-project-12.git

### Install dependencies
    make install

### Run server
    make start

### Run frontend
    make start-frontend

### Or you can run both in dev-mode
    make develop

### Build project
    make build