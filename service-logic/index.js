const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
    host: 'service-database',
    user: 'expressuser',
    port: "3306",
    password: 'expresspassword',
    database: 'expressdb'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


app.use(bodyParser.json());


// Create table in db
app.get('/create-table', async (req, res) => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS todos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                content VARCHAR(100) NOT NULL
                
            )
        `;
        await connection.query(createTableQuery);

        res.send('Table created successfully');
    } catch (error) {
        console.error('Error creating table:', error);
        res.status(500).send('Internal Server Error');
    }
});


// Create a todo object
app.post('/todos', (req, res) => {
    const newTodo = req.body;

    console.log("r", newTodo);
    console.log("c", newTodo.content);

    const createTodoQuery = "INSERT INTO todos (content) VALUES (?)";

    connection.query(
        createTodoQuery,
        [newTodo.content],
        (err, result) => {
            if (err) {
                console.error('Error creating todo:', err);
                res.status(500).send('Error creating todo');
            } else {
                res.status(201).send('Todo created successfully');
            }
        }
    );
});



// Read all todos
app.get('/todos', (req, res) => {
    connection.query(
        'SELECT * FROM todos',
        (err, result) => {
            if (err) {
                console.error('Error fetching todos:', err);
                res.status(500).send('Error fetching todos');
            } else {
                res.status(200).json(result);
            }
        }
    );
});

// Read one todo by id
app.get('/todos/:id', (req, res) => {
    const todoId = req.params.id;

    connection.query(
        'SELECT * FROM todos WHERE id = ?',
        [todoId],
        (err, result) => {
            if (err) {
                console.error('Error fetching todo:', err);
                res.status(500).send('Error fetching todo');
            } else {
                if (result.length === 0) {
                    res.status(404).send('Todo not found');
                } else {
                    res.status(200).json(result[0]);
                }
            }
        }
    );
});


// Update a todo by id
app.put('/todos/:id', (req, res) => {
    const todoId = req.params.id;
    const updatedTodo = req.body;

    connection.query(
        'UPDATE todos SET ? WHERE id = ?',
        [updatedTodo, todoId],
        (err, result) => {
            if (err) {
                console.error('Error updating todo:', err);
                res.status(500).send('Error updating todo');
            } else {
                res.status(200).send('Todo updated successfully');
            }
        }
    );
});

// Delete a todo by id
app.delete('/todos/:id', (req, res) => {
    const todoId = req.params.id;

    connection.query(
        'DELETE FROM todos WHERE id = ?',
        [todoId],
        (err, result) => {
            if (err) {
                console.error('Error deleting todo:', err);
                res.status(500).send('Error deleting todo');
            } else {
                res.status(200).send('Todo deleted successfully');
            }
        }
    );
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
