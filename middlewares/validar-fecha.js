

export const validarFecha = (req, res, next) => {

    const date = req.header('x-date');

    if ( !date ){
        return res.status(400).json( { msg: 'no hay fecha en la peticion'});
    }
    
    try {
     
        const dateArr = date.split('/');
        if( dateArr.length < 3){
            return res.status(400).json( { msg: 'El formato de la fecha no es valido, este debe ser dd/mm/yyyy'});
        }

        if(dateArr[0] > 31){
            return res.status(400).json( { msg: 'El formato de la fecha no es valido, este debe ser dd/mm/yyyy'});
        }

        if( dateArr[1] > 12 ){
            return res.status(400).json( { msg: 'El formato de la fecha no es valido, este debe ser dd/mm/yyyy'});
        }

        else if( dateArr[2].length < 4){
            return res.status(400).json( { msg: 'El formato de la fecha no es valido, este debe ser dd/mm/yyyy'});
        }

        const dateFormat = dateArr.map( d => {
            if( d.length < 2){
                d = '0' + d
            }
            return d
        })

        req.dateUser = dateFormat.join('/')

        next();        
    } catch (error) {
        res.status( 500 ).jso({msg: 'Hable con el administrador', error})
    }
}