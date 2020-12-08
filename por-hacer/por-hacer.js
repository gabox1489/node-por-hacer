//PARA PODER GUARDAR NUESTRAS TAREAS EN ALGUN LUGAR, IMPORTAMOS NUESTRA LIBRERIA FILE SYSTEM
const { throws } = require('assert');
const fs = require('fs');

//CREAMOS EL ARREGLO :

let listadoPorHacer = [];

//CREAMOS UNA NUEVA FUNCION PARA COLOCAR NUESTRAS TAREAS PERSISTENTES

const guardarDB = () => {
    //EL SIGUIENTE COMANDO ME CONVIERTE MI ARREGLO EN UN ARCHIVO JSON
    let data = JSON.stringify(listadoPorHacer); //ya tenemos la data que queremos guardar, ahora necesitamos guardar en file system:
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

//AHORA HACEMOS EL PROCESO INVERSO CARGAMOS NUESTRO ARCHIVO JSON Y LO PASAMOS A NUESTRO ARREGLO Y ACUMULAMOS
const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        listadoPorHacer = [];
    }

}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };
    //UTILIZAMOS PUSH PARA INGRESAR o GRABAR UNA TAREA EN EL ARREGLO
    listadoPorHacer.push(porHacer);
    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}


const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = listadoPorHacer.filter(tarea => { //FUNCION PARA QUITAR O FILTRAR UN ELEMENTO DEL ARREGLO
        return tarea.descripcion !== descripcion
    });

    if (listadoPorHacer.length === nuevoListado.length) {
        return console.log('Error');
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}