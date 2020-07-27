const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  //the recepient has click or not
  responded: { type: Boolean, default: false }
});

module.exports = recipientSchema;
