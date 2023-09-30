const express = require('express');
const TopicController = require('./src/Controller/TopicController');
const app = express();
const port = 3000;

const topicController = new TopicController();
const path = require('path');

app.set('views', path.join(__dirname, 'src', 'views')); //get root directory + src + views
app.set('view engine', 'ejs'); //allow you to embed javascript to html

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Set up routes
app.get('/topics', (req, res) => topicController.getAllTopics(req, res));
app.get('/topics/:id', (req, res) => topicController.getTopicById(req, res));

// Handling POST request
app.post('/topics', (req, res) => topicController.postTopic(req, res));

// Handling PUT request
app.put('/topics/:id', (req, res) => topicController.updateTopic(req, res));

// Handling PATCH request
app.patch('/topics/:id', (req, res) => topicController.patchTopic(req, res));

// Handling DELETE request
app.delete('/topics/:id', (req, res) => topicController.deleteTopic(req, res));

app.get('/', (req, res) => topicController.showAllTopics(req, res));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




