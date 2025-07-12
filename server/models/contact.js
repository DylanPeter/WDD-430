const mongoose   = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const express = require('express');
const router = express.Router();

const Message = require('../models/message');
const sequenceGenerator = require('./sequenceGenerator');

// GET all messages
router.get('/', (req, res, next) => {
  Message.find()
    .populate('sender') // Populate sender reference
    .then(messages => {
      res.status(200).json({
        message: 'Messages fetched successfully!',
        messages: messages
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// POST new message
router.post('/', (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender // This should be an ObjectId reference
  });

  message.save()
    .then(createdMessage => {
      res.status(201).json({
        message: 'Message added successfully',
        messageData: createdMessage
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// PUT update message
router.put('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      return Message.updateOne({ id: req.params.id }, message);
    })
    .then(result => {
      res.status(204).json({ message: 'Message updated successfully' });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// DELETE message
router.delete('/:id', (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then(message => {
      return Message.deleteOne({ id: req.params.id });
    })
    .then(result => {
      res.status(204).json({ message: 'Message deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

module.exports = router;

const contactSchema = mongoose.Schema({
  id:       { type: String, required: true, unique: true },  // natural id (validated as unique)
  name:     { type: String, required: true },
  email:    { type: String, required: true },
  phone:    { type: String },
  imageUrl: { type: String },
  // group is an *array* of ObjectIds that reference other contacts
  group:    [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

// optional add-on to enforce uniqueness at the Mongo level
contactSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Contact', contactSchema);