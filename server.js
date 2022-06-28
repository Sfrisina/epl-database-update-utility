//setting variables
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8005
require('dotenv').config()

let db, 
    dbConnectionStr = process.env.DB_STRING, 
    dbName = 'epl-info-api'

//connect to MongoDb
MongoClient.connect(dbConnectionStr, {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
//Set Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (request, response) => {
    db.collection('epl-info').find().toArray()
    .then(data => {
        let nameList = data.map(item => item.name)
        console.log(nameList)
        response.render('index.ejs', {info: nameList})
    })
    .catch(error => console.log(error))
 
})
app.post('/api', (request, response) => {
        console.log('Post Received')
        db.collection('epl-info').insertOne(
            request.body
        )
        .then(result => {
            console.log(result)
            response.redirect('/')
        })
})
app.put('/updateEntry', (request, response) => {
    console.log(request.body)
    Object.keys(request.body).forEach(key => {
        if (request.body[key] === null || request.body[key] === undefined || request.body[key] === ""){
            delete request.body[key];
        }
    })
    console.log(request.body)
    db.collection('epl-info').findOneAndUpdate(
        {name: request.body.name}, {
            $set: request.body
        }
    )
    .then(result => {
        console.log(result)
        response.json('Success')
    })
    .catch(error => console.error(error))
})
app.delete('/deleteEntry', (request, response) => {
        db.collection('epl-info').deleteOne(
            {name: request.body.name}
        )
        .then(result => {
            console.log('Entry Deleted')
            response.json('Entry Deleted')
        })
        .catch(error => console.error(error))
})

//Set up local host
app.listen(process.env.PORT || PORT, () => {
    console.log(`server is running on ${PORT}`)
})

