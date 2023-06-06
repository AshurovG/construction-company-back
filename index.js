const express = require('express')

const PORT = process.env.POST || 8000 // Берет порт окружения

const app = express()

app.get('/', (req, res) => {
    res.send('Hello this is backend')
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

