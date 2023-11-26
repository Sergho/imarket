const express = require('express')
const authRouter = require('./routers/authRouter')
const customerRouter = require('./routers/customerRouter')
const adminRouter = require('./routers/adminRouter')
const authMiddleware = require('./middleware/authMiddleware')
const adminMiddleware = require('./middleware/adminMiddleware')

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).json({ message: 'Incorrect JSON format' });
    } else {
        next();
    }
});

app.use('/auth', authRouter)

app.use(authMiddleware)

app.use(customerRouter)

app.use(adminMiddleware)

app.use(adminRouter)

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server started at port: ${PORT}`)
        })
    } catch (e) {
        console.log(e);
    }
}

start()