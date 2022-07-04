const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'viajes',
    password: 'password',
    port: 5432,
})
const getChofer = (request, response) => {
    pool.query('SELECT * FROM chofer', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getChoferById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM chofer WHERE id_chofer = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const crearChofer = (request, response) => {
    const { nombre, dni, telefono } = request.body

    pool.query('INSERT INTO chofer (nombre_chofer, dni_chofer, telefono_chofer) VALUES ($1, $2, $3)', [nombre, dni, telefono], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${results.insertId}`)
    })
}

const actualizarChofer = (request, response) => {
    const id = parseInt(request.params.id)
    const { nombre, dni, telefono } = request.body

    pool.query(
        'UPDATE chofer SET nombre_chofer = $1, dni_chofer = $2, telefono_chofer = $3 WHERE id_chofer = $4',
        [nombre, dni, telefono, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const borrarChofer = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM chofer WHERE id_chofer = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getChofer,
    getChoferById,
    crearChofer,
    actualizarChofer,
    borrarChofer,
}