const bcrypt = require('bcryptjs');

// class AuthController {
//     async login(req, res) {
//         try {
//             const { password } = req.body
//             var hash = bcrypt.hashSync('123', 7);
            
            
//             console.log(bcrypt.compareSync(password, '$2a$07$SsWkFLeOg1pXxxBxLZCvd.IyjJyNVH1PctkYA.wOBlJS5aAmywtTK'))
//         } catch(e) {
            
//         }
//     }
// }


const jwt = require('jsonwebtoken');

const secretKey = 'secret'; // Замените на ваш секретный ключ
const tokenG = jwt.sign({ admin: true }, secretKey, { expiresIn: '1h' });

class AuthController {
    async login(req, res) {
        try {
            const { password } = req.body;
            const storedHash = '$2a$07$SsWkFLeOg1pXxxBxLZCvd.IyjJyNVH1PctkYA.wOBlJS5aAmywtTK'; // Здесь должен быть хеш, сохраненный в вашем приложении

            if (bcrypt.compareSync(password, storedHash)) {
                // const token = jwt.sign({ admin: true }, secretKey, { expiresIn: '1h' });
                
                res.status(200).json({ message: 'Authentication successful', token: tokenG });
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
            if (token === tokenG) {
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