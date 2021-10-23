# Weather-Journal App Project

## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 
​
## Instructions
Our app runs from the main function "App", in this function we can find the sequance of functions runs as follow
<ol>
  <li>init function intilize an event handler for the generate button, that calls the main function</li>
  <li>main function gets the zip, and feelings inputs feelds and run the fetchWeatherApi async function</li>
  <li>fetchWeatherApi async function call the fetch method and start calling the weather Api with the zip code got from the user</li>
  <li>after fetchWeatherApi get a successful response, the then runs and continue working by calling a postReq async function </li>
  <li>postReq async function send a post request to our server to save the data came from the weatherApi</li>
  <li>postReq async function successfully send data to the server, and get response our app start updating the ui in the then method</li>
<ol>
