const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
// Get Response from client

// This must be added before GET & POST routes.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// Routes would go here
let todo = require('./routes/todo');
app.use('/todo', todo);


/**
 * listen YO!
 */
app.listen(PORT, () => {
  console.log (`Connect to: http://localhost:${PORT}`);
})