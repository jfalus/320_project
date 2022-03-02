Important:
    You must install 2 new libraries to run the server/client. From 320_project, run the following
        npm install concurrently --save
        npm install nodemon --global
    Concurrently allows you to run multiple commands at once. Nodemon automatically restarts the server when it detects any changes made.


How to run the project:
    From the 320_project folder, run the command "npm run dev". This will start up both the server and the react app.
    The client is at http://localhost:3000 and the server is at http://localhost:5000

Connecting the frontend and the backend
    Using the fetch() api, https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch, check out the TestApp in the client folder for a simple example of sending a request to the server and receiving a JSON object in response.
    
    On the backend side, index.js in server folder has a few examples of responses. TestApp uses the "/api/testAPI" and receives a json object which it unpacks and outputs to the screen.