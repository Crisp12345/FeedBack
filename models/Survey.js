const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    //TODO body can be changed to default
    body: String,
    subject: String,
    //comma-sperated list of recipients(email, click)
    recipients: [RecipientSchema],
    //record the result
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    //reference to a particular user, relationship field
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);
