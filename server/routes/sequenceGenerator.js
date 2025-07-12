const Sequence = require('../models/sequence');

let maxDocumentId;
let maxMessageId;
let maxContactId;
let sequenceId = null;

function SequenceGenerator() {
  Sequence.findOne().exec((err, sequence) => {
    if (err) {
      console.log('An error occurred while finding the sequence: ', err);
      return;
    }

    if (!sequence) {
      console.log('No sequence document found.');
      return;
    }

    sequenceId = sequence._id;
    maxDocumentId = sequence.maxDocumentId;
    maxMessageId = sequence.maxMessageId;
    maxContactId = sequence.maxContactId;
  });
}

SequenceGenerator.prototype.nextId = function (collectionType) {
  let updateObject = {};
  let nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = { maxDocumentId };
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = { maxMessageId };
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject = { maxContactId };
      nextId = maxContactId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({ _id: sequenceId }, { $set: updateObject }, (err) => {
    if (err) {
      console.log('nextId error = ' + err);
    }
  });

  return nextId;
};

module.exports = new SequenceGenerator();