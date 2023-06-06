const express = require('express')
const ventilatedFacadesRouter = require('./routes/ventilated_facades.routes')
const ventilatedFacadeItemsRouter = require('./routes/ventilated_facade_items.routes')

const PORT = process.env.POST || 8000 // Берет порт окружения

const app = express()
app.use(express.json()) // Так как express не может по умолчанию распарсить json строку
app.use('/api', ventilatedFacadesRouter)
app.use('/api', ventilatedFacadeItemsRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

