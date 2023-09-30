const TopicModel = require('../Model/TopicModel');


// Helper function: clean_input
const cleanInput = (input) => {
  // Implement the actual clean_input logic here
  return input.trim(); // Placeholder
};


class TopicController {
  constructor() {
    this.topicModel = new TopicModel();
  }
  
  // show all topics
  showAllTopics(req, res) {
    this.topicModel.getAllTopics((err, Topic) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (!Topic) return res.status(404).json({ error: 'No topics found' });
      res.render('topics', { topics: Topic }); //render topics {ejs file: response data}
    });
  }

  // GET method to retrieve all topics
  getAllTopics(req, res) {
    this.topicModel.getAllTopics((err, Topic) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      res.status(200).json({ Topic, message: 'Success'  });
    });
  }

  // GET method to retrieve a topic by ID
  getTopicById(req, res) {
    const id = Number(req.params.id);
    this.topicModel.getTopicById(id, (err, Topic) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (!Topic) return res.status(404).json({ error: 'Topic not found' });
      res.status(200).json({ Topic, message: 'Success'  });
    });
  }

  // POST method to post a topic
  postTopic(req, res) {
    const name = cleanInput(req.body.top_name);
    this.topicModel.postTopic(name, (err, newTopic) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      return res.status(201).json({ newTopic, message: 'Success' });
    });
  }


  // PUT method to update a topic
  updateTopic(req, res) {
    const id = req.params.id;
    const name = cleanInput(req.body.top_name);
    this.topicModel.updateTopic(id, name, (err, result) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (result.rowsAffected === 0) return res.status(404).json({ error: 'Topic not found' });
      return res.status(200).json({ message: 'Success', result });
    });
  }

  // PATCH method to partially update a topic
  patchTopic(req, res) {
    const id = req.params.id;
    const name = cleanInput(req.body.top_name);
    this.topicModel.patchTopic(id, name, (err, result) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (result.rowsAffected === 0) return res.status(404).json({ error: 'Topic not found' });
      return res.status(200).json({ message: 'Success', result });
    });
  }

  // DELETE method to delete a topic
  deleteTopic(req, res) {
    const id = req.params.id;
    this.topicModel.deleteTopic(id, (err, result) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });
      if (result.rowsAffected === 0) return res.status(404).json({ error: 'Topic not found' });
      return res.status(200).json({ message: 'Topic successfully deleted', result });
    });
  }



  // Define more methods to handle other topic-related routes
}

module.exports = TopicController;


