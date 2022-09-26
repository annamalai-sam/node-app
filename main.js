const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const ejs = require('ejs');
const connection = require('./js/database');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + './views'));

var data
app.get('/', (req, res) => {
    const connect = connection.getDBConnection()

    // connect.connect(function (err) {
    //     if (err) throw err
    // })

    connect.query("select * from dotask;", (err, result) => {
        if (err) throw err
  
         data = result  
             console.log("inside the function",data)
        res.render('main', { data: result })
       
    })

    connect.end()

})


console.log("out",data)

app.post('/new', (req, res) => {
    async function myFunction() {
        console.log(req.body)
        const connect = connection.getDBConnection()
        let insertQuery = `insert into dotask (task, due_date) values("${req.body.task}", "${req.body.due_date}");`
        console.log(insertQuery)
        connect.query(insertQuery, (err, result) => {
            if (err) throw err,
                console.log(result)
        })
        connect.end()
    }
    myFunction().then(
        res.redirect('/')
    );
})

app.get('/mark/:id', (req, res) => {
    async function myFunction() {
        let task_id = req.params.id;
        console.log(task_id)
        const connect = connection.getDBConnection()
        let updateQuery = `UPDATE dotask SET status = 'complete'WHERE id = ${task_id};`
        connect.query(updateQuery, (err, result) => {
            if (err) throw err,
                console.log(result)
        })
        connect.end()
    }
    myFunction().then(
        res.redirect('/')
    );
})

app.get('/del/:id', (req, res) => {
    async function myFunction() {
        let task_id = req.params.id;
        console.log(task_id)
        const connect = connection.getDBConnection()
        let deleteQuery = `DELETE FROM dotask WHERE id = ${task_id};`
        console.log(deleteQuery)
        connect.query(deleteQuery, (err, result) => {
            if (err) throw err,
                console.log(result)
        })
        connect.end()
    }
    myFunction().then(
        res.redirect('/')
    );
})

app.listen(4200, (req, res) => {
    console.log("Running...")
});