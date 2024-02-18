const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const exteriorDesignRouter = require('./exterior_design/exterior_design.routes')
const exteriorDesignItemsRouter = require('./exterior_design_items/exterior_design_items.routes')
const questionsItemsRouter = require('./questions/questions.routes')
const authRouter = require('./auth/auth.routes')
const emailRouter = require('./email/email.routes')

const PORT = 8000
const app = express()

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/static", express.static(path.join(__dirname, "static")))
app.use(cors()) // Используем CORS middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()) // Так как express не может по умолчанию распарсить json строку
app.use('/api', exteriorDesignRouter)
app.use('/api', exteriorDesignItemsRouter)
app.use('/api', questionsItemsRouter)
app.use('/api', authRouter)
app.use('/api', emailRouter)


app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

