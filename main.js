const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const ejs = require('ejs');
const connection = require('./js/database');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + './views'));
app.use('/js', express.static(__dirname + './js'));
app.use('/css', express.static(__dirname + './css'));


app.get('/', (req, res) => {
    connection.query("select * from dotask;").then(results => {
        let finalResult = results[1];
        console.log(finalResult.length)
        res.render('main', { data: finalResult })
    }
    )
})
app.post('/new', (req, res) => {
    async function myFunction() {
        console.log(req.body)

        let insertQuery = `insert into dotask (task, due_date) values("${req.body.task}", "${req.body.due_date}");`
        console.log(insertQuery)
        connection.query(insertQuery).then(result => {
            console.log(result)
        })
    }
    myFunction().then(
        res.redirect('/')
    );
})

app.get('/mark/:id', (req, res) => {
    async function myFunction() {
        let task_id = req.params.id;
        console.log(task_id)
        let updateQuery = `UPDATE dotask SET status = 'complete'WHERE id = ${task_id};`
        connection.query(updateQuery).then(result => {
            console.log(result)
            res.redirect('/')
        })
    }
    myFunction().then(
        res.redirect('/')
    );
})

app.get('/del/:id', (req, res) => {
    async function myFunction() {
        let task_id = req.params.id;
        console.log(task_id)
        let deleteQuery = `DELETE FROM dotask WHERE id = ${task_id};`
        console.log(deleteQuery)
        connection.query(deleteQuery).then(result => {
            console.log(result)
            res.redirect('/')
        })
    }
    myFunction().then(
        res.redirect('/')
    );
})

app.listen(4200, (req, res) => {
    console.log("Running...")
});