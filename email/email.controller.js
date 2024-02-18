const formData = require('form-data');
const Mailgun = require('mailgun.js');
const dotenv = require('dotenv')
const axios = require('axios');

dotenv.config()



// const mailgun = new Mailgun(formData);
// const client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });

class EmailController {
    async sendEmail(req, res) {
        try {
            const {fio, email, description } = req.body;

            const htmlContent = `
                <h1>Новое обращение с сайта!</h1>
                <p>ФИО отправителя: ${fio}</p>
                <p>E-mail отправителя: ${email}</p>
                <p>Описание заказа: ${description}</p>
            `;
            await axios.get('https://api.unisender.com/ru/api/sendEmail', {
            params: {
                format: 'json',
                api_key: '6gqzu9rys3eqw7ap4f69g453xgut91h5ue89qaao',
                email: 'ashurov.g13@gmail.com',
                sender_name: 'Новый клиент',
                sender_email: 'ashurov1308@gmail.com',
                subject: 'Вам поступило новое обращение',
                body: htmlContent,
                list_id:   1
            },
            headers: {
                'Origin': 'https://api.unisender.com'
            }
            });
            res.send({message: 'success'})
        } catch (e) {
            res.status(500).json({ message: 'Internal Server Error', error: e.toString() });
        }
    }
}

// const data = {
            //     from: '<ashurov1308@gmail.com>',
            //     to: 'ashurov.g13@gmail.com',
            //     subject: 'Новое обращение с сайта!',
            //     html: htmlContent
            // };

            // client.messages.create(process.env.MAILGUN_DOMAIN, data)
            //     .then((response) => {
            //         console.log(response);
            //     })
            //     .catch((error) => {
            //         console.error(error);
            //     });

module.exports = new EmailController()