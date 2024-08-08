### Hexlet tests and linter status:
[![Actions Status](https://github.com/nokrepilov/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/nokrepilov/frontend-project-12/actions) [![Maintainability](https://api.codeclimate.com/v1/badges/2592ae9fd7d5f665762a/maintainability)](https://codeclimate.com/github/nokrepilov/frontend-project-12/maintainability)


## Description: 

Chat (Slack) is a real-time application on React/Redux of the Slack app that allows you to exchange messages in various channels. 

The project included working with web sockets, interacting with REST API, using React (with hooks), Redux (via reduxjs/toolkit), organizing routing on the client, authorization and authentication, assembly (webpack) and deployment.

### Link to [Chat](https://chat-iv1v.onrender.com)

Link to documentation for Backend Chat [@hexlet/chat-server](https://www.npmjs.com/package/@hexlet/chat-server)

## The project included:

* Create React App for building single-page React applications;
* Deployment on Render;
* Monitoring Errors in Production Using Rollbar;
* Using React Router Routing; 
* Styling using Bootstrap for React— html/css framework;
* Asynchronous requests using axios;
* Using the Socket.IO library, which provides two-way communication between clients and servers in real-time; 
* Forms using the Formik library;
* Using the Yup library for data validation;
* Using an internationalisation framework i18next;
* Leo-profanity library for filtering obscene words; 
* GitHub Actions, Eslint, Prettier for maintain code quality;
* Building a project architecture (MVC);

## How to use it?

Sign up by the next login and password:

* Login: admin
* Password: admin

Or register your own account.

* Send a message in the default channels (#general and #random) or create your own channel;
* You can delete or rename the created channel;
* Send and receive messages in real-time;
* There is a filter for words in messages and channels; bad words will be hidden by '*';

## How to install the app?

- git clone this repository to your computer;
- make sure that you have node.js and npm installed;
- install dependencies and let your system run the package:
```bash
make install
```
- build the project:
```bash
make build
```
- to run app:
```bash
make start
```
Other commands can be found in the Makefile.