/**
  *
  * main() will be run when you invoke this action
  *
  * @param Cloud Functions actions accept a single parameter, which must be a JSON object.
  *
  * @return The output of this action, which must be a JSON object.
  *
  */
 function main(params) {
    
    if(params.action === 'hello_world'){
        return { message: 'Hello World' };
    }
    else if(params.action === 'hoteles_punta'){
        return { hoteles: ['Conrad', 'Torreon']};
    }
    else if(params.action === 'precio_habitacion'){
        if(params.hotel === 'Conrad'){
             return { respuesta: 'El precio promedio de habitación en el hotel Conrad es de $200' }
        }
        else if(params.hotel === 'Esplendor'){
            return { respuesta: 'El precio promedio de habitación en el hotel Esplendor es de $50' }
        }
        else if(params.hotel === 'Radisson'){
            return { respuesta: 'El precio promedio de habitación en el hotel Radisson es de $100' }
        }
        else if(params.hotel === 'Sheraton'){
            return { respuesta: 'El precio promedio de habitación en el hotel Sheraton es de $75' }
        }
        else if(params.hotel === 'Vivaldi'){
            return { respuesta: 'El precio promedio de habitación en el hotel Vivaldi es de $130' }
        }
        else{
            return { respuesta: 'No cuento con la información de los precios para ese hotel.' }
        }
    }
    else{
        return { message: 'World' };
    }
    
	
}