const express = require('express')
// const path = require('path')

const ventilatedFacadesRouter = require('./routes/ventilated_facades.routes')
const ventilatedFacadeItemsRouter = require('./routes/ventilated_facade_items.routes')
const exteriorDesignRouter = require('./routes/exterior_design.routes')
const exteriorDesignItemsRouter = require('./routes/exterior_design_items.routes')

const PORT = process.env.POST || 8000 // Берет порт окружения

const app = express()
// app.use(express.static(path.resolve(__dirname, 'client')))
// app.get('*', (req, res) => {
//   res.redirect('https://frolfasd.netlify.app/?anch=faqs');
// });
app.use(express.json()) // Так как express не может по умолчанию распарсить json строку
app.use('/api', ventilatedFacadesRouter)
app.use('/api', ventilatedFacadeItemsRouter)
app.use('/api', exteriorDesignRouter)
app.use('/api', exteriorDesignItemsRouter)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

