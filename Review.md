# Review Questions

## What is Node.js?
Node.js is an open source/cross platform JS runtime environment which will execute JS code on the server side.

## What is Express?
Express is framework for node which is used to abstract away some of the more challenging parts when it comes to setting up your node server. This is the most popular framework you can find. 

## Mention two parts of Express that you learned about this week.
This week I learned how easy Express makes creating backend software. Express also allos access to request an object as well as a response object which allows you to accept requests from clients. Then you can send a response back to them.

## What is Middleware?
Middleware basically is a mix of frameworks/functions that are commonly run between receiving a client request/sending a response, but can also be ran after a response has been sent. 

## What is a Resource?
A resource is something you can supply to a client via HTTP requests.

## What can the API return to help clients know if a request was successful?
API's return a variety of status codes based on what sort of json message corresponds to the task at hand: 
200-299 = Successful
300-399 = Redirect of some sort
400-499 = Errors by user of some kind
500-599 = Errors by serverof some kind

## How can we partition our application into sub-applications?
You can partition you app into sub-apps by utilizing Express Routers.

## What is CORS and why do we need it?
CORS stands for Cross-Origin Recourse Sharing. It's a mechanism that uses HTTP headers to let a user gain permission to access resources from the server on a different domain.