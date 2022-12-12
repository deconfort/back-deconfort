// un middleware es una func que se ejecuta cuando sucede algo, este en particular no solo depende del req, resp, y next, sino tambien del schema.
// validate es un metodo de joi, a traves de este el middleware va a hacer la validacion, ya que compara el esquema definido con joi con lo que nos manda el usuario (req.body)
const validator = (schema) =>[
    (req,res,next) =>{
        const data = schema.validate(req.body, {abortEarly:false})
        // valido/comparo el schema de validacion con el objeto que viene en el req.body
        //abortEarly valida todos los campos juntos y nos devuelve el array con todos los errores de validación.
        //validate devuelve un objeto con propiedades, algunas de ellas tiene un array con todos los errores. El objeto que esta en data tiene una propiedad error con todos los detalles de validacion.
        if(data.error){
            return res.status(400).json({
                success: false,
                message: data.error.details.map(error =>error.message),
                // en details esta el array con todos los errores.
            })
        }
        next()
    }

]
module.exports = validator