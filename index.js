var moment = require('moment'); 
const _ =  require('lodash');

//import moment from "https://esm.sh/moment";
//import _ from "https://esm.sh/lodash";

class MyError extends Error {
    constructor(msg = 'An error occurred', ...params) {
      super(...params);
      this.msg = msg;
    }
  }

const data = moment().format('dddd, MMMM Do YYYY');

const menus = [
    {'name':'Breakfast', 'plato1': 'Tortitas,Tostadas', 'plato2': 'Café,Colacao,Infusión', 'plato3':'', 'precio':10},
    {'name':'Lunch', 'plato1': 'Pasta,Arroz', 'plato2': 'Carne,Pescado', 'plato3':'Flan,Crepes,Yogurt,Café','precio':15},
    {'name':'Diner', 'plato1': 'Ensalada,Sopa', 'plato2': 'Pollo,Sandwich', 'plato3':'Café,Fruta','precio':20}  
]

const extras = [
    {'name':'Patatas',  'precio': 1.50},
    {'name':'Aros de cebolla', 'precio': 1.75},
    {'name':'Nachos',  'precio': 1.80}
]

const comentarios = [
    {'plato':'Patatas Fritas', 'Comment': 'Ha elegido el mejor acompañamiento!!'},
    {'plato':'Aros de cebolla', 'Comment': 'Enhorabuena!! ha elegido los mejores aros de cebolla del planeta!!'},
    {'plato':'Nachos', 'Comment': 'Enhorabuena!! ha elegido los mejores nachos del planeta!!'},    
]

function ObtenerLista (obj, campo){
  /*Recorre un objeto y obtiene un array con todos los valores del campo pasado como argumento
  **Devuelve: array*/
  const newlist=[];
  for (let element in obj){
    newlist.push(obj[element][campo]);
  }
  return newlist;
}

//Obtener lista con los tipos de menús que tenemos
const listtypeMenu = ObtenerLista(menus, 'name');

//Obtener lista con los ingedientes extra que tenemos
const listtypeExtra = ObtenerLista(extras, 'name');

function ObtenerValor (listaobj, type, clave){
/* Obtiene dependiendo del tipo de menú seleccionado <<type>> 
** obtendrá el valor ó valores almacenados en una lista de objetos <<listaobj>>
** cuya clave coincida con el parametro <<clave>>. 
*/
    const keyname = _.keyBy(listaobj, 'name');
    return keyname[type][clave];
}

function SeleccionarMenu(listtypeMenu){
/* Seleccionar menú a degustar. 
** Devuelve:
**  string que corresponde al menú seleccionado
**  null en caso de cancelar el proceso
*/
    while (true){
        let userMenuType = prompt(`Bienvenido/a!! estos son los menús de hoy: ${listtypeMenu} \nIntroduzca el nombre del menú a degustar:`, "");
        
        if (listtypeMenu.includes(userMenuType)  && userMenuType!="") {
          //Si el nombre del menú introducido esta en la lista, continuar
            alert ('Buena elección!!');
            return userMenuType;
        }
        else if (userMenuType === null){
            alert ('Adios esperamos verle pronto!!');
            return null;
        }  
    }
}

function SeleccionarPlato(userMenuType, coste=0, platotype){
/* Seleccionar el plato a degustar dependiendo del menú elegido . 
** Devuelve:
**  string que corresponde al plato elegido
**  null en caso de cancelar el proceso
*/
    while (true){
        const platos = ObtenerValor(menus,userMenuType, platotype);
      //console.log (platos);
        let userPlato = prompt(`Ha elegido el menú ${userMenuType}!! de ${coste} euros.\nAhora toca elegir plato, digános que prefiere: ${platos}. `, "");
        if (platos.includes(userPlato) && userPlato!="") {
            return userPlato;
        }
        else if (userPlato === null){
            alert (`Vaya...!! No quiere ningún plato como ${platotype}!!`);
            return null;
        }  
    }
}

function SeleccionarExtra(listtypeExtra){
/* Seleccionar platos extras a degustar. 
** Devuelve:
**  string que corresponde al extra seleccionado
**  null en caso de cancelar el proceso
*/
    while (true){
        let userExtraType = prompt(`Seleccione platos extra <<máximo 2>> (separa cada plato con una coma): ${listtypeExtra}. `, "");
        
        if  ( userExtraType!="" && userExtraType!=null) {
            //Comprobamos cuantos extras se han introducido y si estan en la lista de extras
            let aUserExtra = userExtraType.split(','); //Convertimos en array
            let bExiste = true;
            for (var i = 0; i < aUserExtra.length; i++) {
                 if(listtypeExtra.includes(aUserExtra[i])===false){
                    bExiste=false;
                 }
            }
            if (bExiste && aUserExtra.length<=2 ) {
                alert ('ok');
                return userExtraType;
            }
        }
        else if (userExtraType === null){
            alert ('Entendemos que no quiere platos extra!!');
            return null;
        }  
    }
}

try{
  //Obtener el menu a degustar
  const userMenuType = SeleccionarMenu(listtypeMenu); 
  if (userMenuType != null) {
      //Obtener precio del menú seleccionado 
      const userMenuPrecio = ObtenerValor(menus,userMenuType, 'precio')
      //Obtener los platos a degustar 
      const userMenuPlato1= SeleccionarPlato (userMenuType, userMenuPrecio, 'plato1');
      const userMenuPlato2= SeleccionarPlato (userMenuType, userMenuPrecio, 'plato2');
      const userMenuPlato3= SeleccionarPlato (userMenuType, userMenuPrecio, 'plato3');

      //Ofrecer plato extra máximo dos y sus precios
      let userMenuPrecioExtras=0;
      const userMenuExtras= SeleccionarExtra(listtypeExtra);
      if (userMenuExtras!=null) {
        const menuextra= userMenuExtras.split(','); 
        for (let i in menuextra){
          userMenuPrecioExtras += ObtenerValor(extras,menuextra[i], 'precio')
        }
      }

      //Calcular total
      const userMenuTotal= userMenuPrecioExtras + userMenuPrecio;

      //Mostrar Resumen comanda y precios
    let text = `Estos son los platos del menú ${userMenuType} seleccionados:\nPlato 1 -> ${userMenuPlato1}\nPlato 2 ->${userMenuPlato2}\nPlato 3 ->${userMenuPlato3}\nExtras ->${userMenuExtras}\n\nPRECIO Menú: ${userMenuPrecio} euros\nPRECIO Extras: ${userMenuPrecioExtras} euros\nTOTAL a pagar: ${userMenuTotal} euros`;

    if (confirm(text) === true) {
      text = "Bon a pèttit!";
    } else {
      text = "Su menú ha sido cancelado!";
    }
    alert(text);

  }
}
catch (e){
  throw new MyError('DinerMenu',`DinerMenu App ha generado este error -> ${e}`);
}