const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')

const ventilatedFacadesRouter = require('./ventilatedFacades/ventilated_facades.routes')
const ventilatedFacadeItemsRouter = require('./ventilated_facade_items/ventilated_facade_items.routes')
const exteriorDesignRouter = require('./exterior_design/exterior_design.routes')
const exteriorDesignItemsRouter = require('./exterior_design_items/exterior_design_items.routes')
const questionsItemsRouter = require('./questions/questions.routes')
const userRouter = require('./user/user.routes')
// const PORT = process.env.POST || 8000 // Берет порт окружения

const PORT = 8000
const app = express()
app.use("/static", express.static(path.join(__dirname, "static")))
app.use(cors()) // Используем CORS middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()) // Так как express не может по умолчанию распарсить json строку
app.use('/api', ventilatedFacadesRouter)
app.use('/api', ventilatedFacadeItemsRouter)
app.use('/api', exteriorDesignRouter)
app.use('/api', exteriorDesignItemsRouter)
app.use('/api', questionsItemsRouter)
app.use('/api', userRouter)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

