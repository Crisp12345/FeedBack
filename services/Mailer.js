const sendgrid = require('sendgrid');
//convention in sendgrid
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
    //destructuring first parameter
    constructor({ subject, recipients }, content) {
        super();
        //communicate with sendgrid api
        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = new helper.Email('dgz15gs1b@163.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();
    }

    //set recipients address
    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email);
        });
    }

    //follow doc of sendgrid
    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();

        this.recipients.forEach((recipient) => {
            personalize.addTo(recipient);
        });

        this.addPersonalization(personalize);
    }

    //take mail as json and send through sendgrid
    async send() {
        const request = this.sgApi.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: this.toJSON()
        });

        const response = await this.sgApi.API(request);
        return response;
    }
}

module.exports = Mailer;
