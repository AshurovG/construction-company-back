class UserController {
    async auth(req, res) {
        const { login, pass } = req.body
        const loginCheck = 'admin'
        const passCheck = '1234'
        if (pass != passCheck || login != loginCheck) {
            res.json({
                check: false
            })
        } else if (pass == passCheck && login == loginCheck) {
            res.json({
                check: true
            })
        }
    }
}

module.exports = new UserController()