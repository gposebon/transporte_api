const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express()
const db_chofer = require('./queries_chofer')
const db_clientes = require('./queries_clientes')
const port = 3000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(cors());


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/chofer', db_chofer.getChofer)
app.get('/chofer/:id', db_chofer.getChoferById)
app.post('/chofer', db_chofer.crearChofer)
app.put('/chofer/:id', db_chofer.actualizarChofer)
app.delete('/chofer/:id', db_chofer.borrarChofer)

app.get('/cliente', db_clientes.getCliente)
app.get('/cliente/:id', db_clientes.getClienteById)
app.post('/cliente', db_clientes.crearCliente)
app.put('/cliente/:id', db_clientes.actualizarCliente)
app.delete('/cliente/:id', db_clientes.borrarCliente)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})