const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Document = require('../models/document');

const documentSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    url: { type: String },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
  });
  
  module.exports = mongoose.model('Document', documentSchema);

// GET all documents
router.get('/', (req, res, next) => {
  Document.find()
    .populate('children') // optional: include nested documents
    .then(documents => {
      res.status(200).json({
        message: 'Documents fetched successfully!',
        documents: documents
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching documents failed.',
        error: error
      });
    });
});

// POST a new document
router.post('/', (req, res, next) => {
  const maxDocumentId = sequenceGenerator.nextId("documents");

  const document = new Document({
    id: maxDocumentId.toString(),
    name: req.body.name,
    description: req.body.description,
    url: req.body.url,
    children: req.body.children || []
  });

  document.save()
    .then(createdDocument => {
      res.status(201).json({
        message: 'Document added successfully',
        document: createdDocument
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating document failed.',
        error: error
      });
    });
});

// PUT (update) a document by ID
router.put('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      if (!document) {
        throw new Error('Document not found');
      }

      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;
      document.children = req.body.children || [];

      return Document.updateOne({ id: req.params.id }, document);
    })
    .then(result => {
      res.status(204).json({ message: 'Document updated successfully' });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Updating document failed.',
        error: error
      });
    });
});

// DELETE a document by ID
router.delete('/:id', (req, res, next) => {
  Document.findOne({ id: req.params.id })
    .then(document => {
      if (!document) {
        throw new Error('Document not found');
      }

      return Document.deleteOne({ id: req.params.id });
    })
    .then(result => {
      res.status(204).json({ message: 'Document deleted successfully' });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting document failed.',
        error: error
      });
    });
});

module.exports = router;