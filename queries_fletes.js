const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'viajes',
    password: 'password',
    port: 5432,
})
const getFletes = (request, response) => {
    pool.query('SELECT * FROM fletes ORDER BY id_flete DESC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getFleteById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM cliente WHERE id_cliente = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const crearFlete = (request, response) => {
    const { fecha, procede, destino, cp, km, tn, tarifa, importeFlete, 
    ltsGasOil, precioGasOil, totalGasOil, proveedorGasOil, gastosPeaje, gastosPuerto,
    otrosGastos, totalGastos, porcentajeDescuento, totalDescuento, porcentajeChofer, totalChofer, 
    chofer, cliente } = request.body

    pool.query('INSERT INTO fletes (fecha_flete, procede_flete, destino_flete, cartadeporte_flete, kilometros_flete, toneladas_flete, tarifa_flete, importe_flete, gasoil_flete, preciogasoil_flete, totalgasoil_flete, proveedorgasoil_flete, gastopeaje_flete, gastopuerto_flete, otrosgastos_flete, totalgastos_flete, porcentajedescuento_flete, totaldescuento_flete, porcentajechofer_flete, totalchofer_flete, idchofer_flete, idcliente_flete) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)', 
    [fecha, procede, destino, cp, km, tn, tarifa, importeFlete, ltsGasOil, precioGasOil, totalGasOil, 
        proveedorGasOil, gastosPeaje, gastosPuerto, otrosGastos, totalGastos, porcentajeDescuento, 
        totalDescuento, porcentajeChofer, totalChofer, chofer, cliente], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`Cliente added with ID: ${results.insertId}`)
    })
}

/*
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
*/

module.exports = {
    getFletes,
    crearFlete,
}