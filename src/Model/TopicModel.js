const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class TopicModel {
  constructor() {
    const dbPath = path.join(__dirname, '..', '..', 'db.sqlite3');
    this.db = new sqlite3.Database(dbPath);
  }

  showAllTopics(callback) {
    const sql = "SELECT * FROM first_app_topic";
    return this.db.all(sql, function(err, rows) {
      callback(err, rows);
    });
  }

  // get all topics
  getAllTopics(callback) {
    const sql = "SELECT * FROM first_app_topic";
    return this.db.all(sql, function(err, rows) {
      callback(err, rows);
    });
  }
  //get topic by id
  getTopicById(id, callback) {
    const sql = "SELECT * FROM first_app_topic WHERE id = ?";
    return this.db.get(sql, [id], function(err, row) {
      callback(err, row);
    });
  }

   // Method to create a new topic
  postTopic(name, callback) {
    const sql = "INSERT INTO first_app_topic (top_name) VALUES (?)";
    this.db.run(sql, [name], function(err) {
      callback(err, { id: this.lastID, name: name }); // 'this.lastID' contains the ID of the newly inserted row
    });
  }

  // Method to update a topic by ID
  updateTopic(id, name, callback) {
    const sql = "UPDATE first_app_topic SET top_name = ? WHERE id = ?";
    this.db.run(sql, [name, id], function(err) {
      callback(err, { rowsAffected: this.changes }); // 'this.changes' contains the number of rows affected
    });
  }

  // Method to partially update a topic by ID (adjust as needed)
  patchTopic(id, name, callback) {
    const sql = "UPDATE first_app_topic SET top_name = ? WHERE id = ?";
    this.db.run(sql, [name, id], function(err) {
      callback(err, { rowsAffected: this.changes });
    });
  }

  // Method to delete a topic by ID
  deleteTopic(id, callback) {
    const sql = "DELETE FROM first_app_topic WHERE id = ?";
    this.db.run(sql, [id], function(err) {
      callback(err, { rowsAffected: this.changes });
    });
  }


}

module.exports = TopicModel;
