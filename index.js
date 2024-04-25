//const _ =  require('lodash');

import _ from "https://esm.sh/lodash";

class MyError extends Error {
    constructor(msg = 'An error occurred during execution', ...params) {
      super(...params);
      this.msg = msg;
    }
  }

const menus = [
    {'name':'Breakfast', 'plato1': 'Tortitas,Tostadas', 'plato2': '', 'postre':'Café,ColaCao,Infusión', 'precio':10},
    {'name':'Lunch', 'plato1': 'Pasta,Arroz', 'plato2': 'Carne,Pescado', 'postre':'Flan,Crepes,Yogurt,Café','precio':15},
    {'name':'Diner', 'plato1': 'Ensalada,Sopa', 'plato2': 'Pollo,Sandwich', 'postre':'Café,Fruta','precio':20}  
]

const extras = [
    {'name':'Patatas',  'precio': 0.50},
    {'name':'Aros de cebolla', 'precio': 1.75},
    {'name':'Nachos',  'precio': 1.80},
    {'name':'Aceitunas',  'precio': 1.0}
]

const comentarios = ['Buena elección!!','Uhmm... perfecta elección!!','Este menú esta de locos..'];

function ObtenerLista (obj, campo){
  /*Recorre un objeto y obtiene un array con todos los valores del campo pasado como argumento
  **Devuelve: un array*/
  const newlist=[];
  for (let element in obj){
    newlist.push(obj[element][campo]);
  }
  return newlist;
}

//Obtener lista con los tipos de menús que tenemos
const listtypeMenu = ObtenerLista(menus, 'name');

//Obtener lista con los extras que tenemos
const listtypeExtra = ObtenerLista(extras, 'name');

function ObtenerValor (listaobj, type, clave){
/* Obtiene dependiendo del tipo de menú seleccionado <<type>> 
** un array con el valor ó valores almacenados en la lista de objetos <<listaobj>>
** cuya clave coincida con el parametro <<clave>>. P.e: devolverá algo así los platos1 ['x','y','z'] ó los platos2 ['xx','yy','zz']
*/
    const keyname = _.keyBy(listaobj, 'name');  
    const text =  '' + keyname[type][clave];
    const myArray = text.split(",");
    return myArray;
}

function lodashRandom(numtop){
/*Genera un número aleatorio entre 0 y numtop */
  return (_.random(0,numtop));
}
    
function SeleccionarMenu(listtypeMenu, litscomment,ilodashRandom=0){
/* Seleccionar menú a degustar y mostrar comentario camarera aleatorio. 
** Devuelve:
**  string que corresponde al menú seleccionado
**  null en caso de cancelar el proceso
*/
   
    while (true){
        let userMenuType = prompt(`Bienvenido/a!! estos son los menús de hoy: ${listtypeMenu}\nIntroduzca el nombre del menú a degustar:`, "");
        
        if (listtypeMenu.includes(userMenuType)  && userMenuType!="") {
        //Si el nombre del menú introducido esta en la lista, continuar
            let comentarioRnd = litscomment[ilodashRandom];
            alert (comentarioRnd);  //Muestro comentario aleatorio
            return userMenuType;
        }
        else if (userMenuType === null){
            alert ('Adios esperamos verle pronto!!');
            return null;
        }  
    }
}

function SeleccionarPlato(opciones,userMenuType, coste=0, platotype){
/* Seleccionar el plato a degustar dependiendo del menú elegido . 
** Devuelve:
**  string que corresponde al plato elegido
**  "" en caso de cancelar el proceso
*/
    while (true){
        let userPlato = prompt(`Ha elegido el menú ${userMenuType}!! de ${coste} euros.\nAhora toca elegir plato, díganos que prefiere: ${opciones}. `, "");
        if (opciones.includes(userPlato) && userPlato!="") {
            return userPlato;
        }
        else if (userPlato === null){
            alert (`Vaya...!! No quiere ningún plato como ${platotype}!!`);
            return "";
        }  
    }
}

function SeleccionarExtra(listtypeExtra){
/* Seleccionar platos extras a degustar comprobando que no excedan de dos extras. 
** Devuelve:
**  string que corresponde al extra seleccionado
**  null en caso de cancelar el proceso
*/
    while (true){
        let userExtraType = prompt(`Seleccione algún extra <<máximo 2>> (separa cada plato con una coma): ${listtypeExtra}. `, "");
        
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
                return userExtraType;
            }
        }
        else if (userExtraType === null){
            alert ('Entendemos que no quiere ningún extra!!');
            return "";
        }  
    }
}

try{
    //Obtener el menu a degustar
    const userMenuType = SeleccionarMenu(listtypeMenu, comentarios, lodashRandom(comentarios.length-1)); 
    if (userMenuType != null) {
        //Obtener precio del menú seleccionado 
        let userMenuPrecio = ObtenerValor(menus,userMenuType, 'precio');
        userMenuPrecio = (userMenuPrecio[0] =="null")? 0: parseFloat(userMenuPrecio);
        
        //Mostrar todo el menú
        const platos1 = ObtenerValor(menus,userMenuType, 'plato1');
        const platos2 = ObtenerValor(menus,userMenuType, 'plato2');
        const postres = ObtenerValor(menus,userMenuType, 'postre');
        
        alert (`MENU: ${userMenuType}\nPRIMER PLATO: ${platos1}\nSEGUNDO PLATO: ${platos2}\nPOSTRE: ${postres}`);
        
        //Obtener los platos a degustar 
        let userMenuPlato1=  (platos1!="")? SeleccionarPlato (platos1,userMenuType, userMenuPrecio, 'plato1'):"";
        let userMenuPlato2=  (platos2!="")? SeleccionarPlato (platos2,userMenuType, userMenuPrecio, 'plato2'):"";
        let userMenuPostre=  (postres!="")? SeleccionarPlato (postres,userMenuType, userMenuPrecio, 'postre'):"";

        //Ofrecer plato extra máximo dos y obtener sus precios
        let userMenuPrecioExtras=0;
        const userMenuExtras= SeleccionarExtra(listtypeExtra);
        if (userMenuExtras!="") {
            const menuextra= userMenuExtras.split(','); 
            for (let i in menuextra){
                userMenuPrecioExtras += parseFloat(ObtenerValor(extras,menuextra[i], 'precio').toString());
            }
        }

        //Calcular total
        const userMenuTotal= userMenuPrecioExtras +  ((userMenuPlato1=="" && userMenuPlato2=="" && userMenuPostre=="")? 0: userMenuPrecio);

        //Mostrar Resumen comanda y precios
        let text = `Estos son los platos del menú ${userMenuType} seleccionados:\nPlato 1 -> ${userMenuPlato1}\nPlato 2 ->${userMenuPlato2}\nPlato 3 ->${userMenuPostre}\nExtras ->${userMenuExtras}\n\nPRECIO Menú: ${userMenuPrecio} euros\nPRECIO Extras: ${userMenuPrecioExtras} euros\nTOTAL a pagar: ${userMenuTotal} euros`;

        if (confirm(text) === true) 
        {
            text = "Bon a pèttit!";
        } 
        else {
            text = "Su menú ha sido cancelado!";
        }
        alert(text);

    }
}
catch (e) {
    throw new MyError('DinerMenu',`DinerMenu App ha generado este error -> ${e}`);
}