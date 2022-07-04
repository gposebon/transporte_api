const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'viajes',
    password: 'password',
    port: 5432,
})
const getCliente = (request, response) => {
    pool.query('SELECT * FROM cliente', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getClienteById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM cliente WHERE id_cliente = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const crearCliente = (request, response) => {
    const { nombre, direccion, telefono, cuit } = request.body

    pool.query('INSERT INTO cliente (nombre_cliente, direccion_cliente, telefono_cliente, cuit_cliente) VALUES ($1, $2, $3, $4)', [nombre, direccion, telefono, cuit], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Cliente added with ID: ${results.insertId}`)
    })
}

const actualizarCliente = (request, response) => {
    const id = parseInt(request.params.id)
    const { nombre, direccion, telefono, cuit } = request.body

    pool.query(
        'UPDATE cliente SET nombre_cliente = $1, direccion_cliente = $2, telefono_cliente = $3, cuit_cliente = $4 WHERE id_cliente = $5',
        [nombre, direccion, telefono, cuit, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`Cliente modified with ID: ${id}`)
        }
    )
}

const borrarCliente = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM cliente WHERE id_cliente = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`Cliente deleted with ID: ${id}`)
    })
}

module.exports = {
    getCliente,
    getClienteById,
    crearCliente,
    actualizarCliente,
    borrarCliente,
}