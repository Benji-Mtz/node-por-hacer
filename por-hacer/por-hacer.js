const fs = require('fs');

let listadoPorHacer = [];


const guardarDB = () => {
  let data = JSON.stringify(listadoPorHacer);

  fs.writeFile ('db/data.json', data, (err) => {
      if (err) throw new Error('No se pudo grabar', err)
    });

}

const cargarDB = () => {

  try {
      listadoPorHacer = require('../db/data.json');
  } catch (e) {
    listadoPorHacer = [];
  }

}


const crear = (descripcion) => {

  cargarDB();

  let porhacer = {
    descripcion,
    completado: false
  };

  listadoPorHacer.push(porhacer);

  guardarDB();

  return porhacer;

}

const getListado = () => {
      cargarDB();
  return listadoPorHacer;
}

const actualizar = (descripcion, completado) => {
  cargarDB();

  let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);

  if ( index>= 0){
    listadoPorHacer[index].completado = completado;
    guardarDB();
    return true;
  }else {
    return false;
  }
}

const borrar = (descripcion) => {

  cargarDB();

  let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion);

  if ( index>= 0){
    //listadoPorHacer[index].completado = completado;
    var elementoEliminado = listadoPorHacer.splice(index, 1);
    console.log('Se elimino la tarea: ',elementoEliminado);
    guardarDB();
    return true;
  }else {
    console.log('No se elimino algo');
    return false;
  }

}

module.exports = {
  crear,
  getListado,
  actualizar,
  borrar
};
