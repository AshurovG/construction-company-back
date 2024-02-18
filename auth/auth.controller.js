const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

// const secretKey = 'secret'; // Замените на ваш секретный ключ
// const tokenG = jwt.sign({ admin: true }, secretKey, { expiresIn: '1h' });

class AuthController {
    async login(req, res) {
        try {
            const { password } = req.body;
            const storedHash = '$2a$07$SsWkFLeOg1pXxxBxLZCvd.IyjJyNVH1PctkYA.wOBlJS5aAmywtTK'; // Здесь должен быть хеш, сохраненный в вашем приложении

            if (bcrypt.compareSync(password, storedHash)) {
                // const token = jwt.sign({ admin: true }, secretKey, { expiresIn: '1h' });
                
                res.status(200).json({ message: 'Authentication successful', token: process.env.JWT_TOKEN });
            } else {
                res.status(401).json({ message: 'Invalid password' });
            }
        } catch (e) {
            res.status(500).json({ message: 'Internal Server Error', error: e.toString() });
        }
    }

    async check(req, res) {
        console.log('aaauuttth')
        try {
            const { token } = req.body
            if (token === process.env.JWT_TOKEN) {
                res.status(200).json({ message: 'success' });
            } else {
                res.status(401).json({ message: 'Invalid JWT' });
            }
        } catch (e) {
            res.status(500).json({ message: 'Internal Server Error', error: e.toString() });
        }
    }
}
module.exports = new AuthController()