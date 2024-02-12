const formData = require('form-data');
const Mailgun = require('mailgun.js');
const dotenv = require('dotenv')
dotenv.config()

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

// const data = {
//   from: 'Excited User <ashurov1308@gmail.com>',
//   to: 'ashurov.g13@gmail.com',
//   subject: 'Заказ на постройку здания',
//   text: 'Тема заказа в !'
// };

// client.messages.create(process.env.MAILGUN_DOMAIN, data)
//   .then((response) => {
//     console.log(response);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

class EmailController {
    async sendEmail(req, res) {
        try {
            const {fio, email, description } = req.body;
            res.send({message: 'success'})
            const data = {
                from: '<ashurov1308@gmail.com>',
                to: 'ashurov.g13@gmail.com',
                subject: 'Новое обращение с сайта!',
                text: `ФИО: ${fio}. E-mail отправителя: ${email}. Описание заказа: ${description}`
            };

            client.messages.create(process.env.MAILGUN_DOMAIN, data)
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (e) {
            res.status(500).json({ message: 'Internal Server Error', error: e.toString() });
        }
    }
}
module.exports = new EmailController()