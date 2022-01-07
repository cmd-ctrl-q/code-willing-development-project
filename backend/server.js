const express = require('express')
const { json } = require('body-parser')
const cors = require('cors')
const { body, validationResult } = require('express-validator')

const app = express() 

// middlewares
app.use(cors())
app.use(json())
const modifyNumber = (req, res, next) => {
    let n = parseInt(req.body.number) * 2 
    if (isNaN(n)) {
        let err = new Error('Number unable to be parsed')
        err.status = 400
        next(err)
    }

    req.body.number = n
    next()
}

// routes 
app.post('/api/number', 
    modifyNumber, // custom middleware to modify number in request
    body('number').isLength({ min: 2, max: 10}) 
        .isNumeric(),
    (req, res) => {

        // check validation errors
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            res.status(400)
            throw new Error(errors[0].msg)
        } else {
            // modify number again 
            let number = parseInt(req.body.number) + 10;

            res.status(200).json({ number })
        }
})

const PORT = 5000
app.listen(PORT, console.log(`Server running on port ${PORT}`))