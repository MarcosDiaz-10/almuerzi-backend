import { parseISO, isValid, format } from 'date-fns';

export const validarFecha = (req, res, next) => {

    try {
        const parse = parseISO(req.body?.date);
        
        const valid = isValid( parse );

        if(!valid) return res.status(400).json({ok: false, msg: 'La fecha es invalida'})
    
        const formatDay = format( parse, 'kk/dd/LLL/yyyy/h:mmaaaa') // hora/dia/mes/año
    
        req.formattedDate = formatDay;
        
        next();
    } catch (error) {
        res.json({ ok: false, msg: error })
    }

}
