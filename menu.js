//const _ =  require('lodash');

import _ from "https://esm.sh/lodash";
import moment from "https://esm.sh/moment";

class MyError extends Error {
    constructor(msg = 'An error occurred during execution', ...params) {
      super(...params);
      this.msg = msg;
    }
  }

const menuBreakfast = [
    {'type':'principal','plato': 'Tortitas','precio':3}, 
    {'type':'principal','plato': 'Tostadas','precio':2},
    {'type':'principal','plato': 'Croassant','precio':4},
    {'type':'secundario','plato': 'Cafe','precio':1.6}, 
    {'type':'secundario','plato': 'Infusion','precio':1.5},
    {'type':'secundario','plato': 'ColaCao','precio':2}
]  
 
const menuLunch = [
    {'type':'principal','plato': 'Pasta','precio':3}, 
    {'type':'principal','plato': 'Arroz','precio':2},
    {'type':'principal','plato': 'Alubias','precio':4},
    {'type':'secundario','plato': 'Carne','precio':1.6}, 
    {'type':'secundario','plato': 'Pescado','precio':1.5},
    {'type':'secundario','plato': 'Hamburguesa','precio':2},
    {'type':'postre','plato': 'Cafe','precio':1.6}, 
    {'type':'postre','plato': 'Fruta','precio':1.5},
    {'type':'postre','plato': 'Yogurt','precio':2}

]

const menuDiner = [
    {'type':'principal','plato': 'Ensalada','precio':3}, 
    {'type':'principal','plato': 'Sopa','precio':2},
    {'type':'principal','plato': 'Gazpacho','precio':4},
    {'type':'secundario','plato': 'Pollo','precio':1.6}, 
    {'type':'secundario','plato': 'Sandwich','precio':1.5},
    {'type':'secundario','plato': 'Hamburguesa','precio':2},
    {'type':'postre','plato': 'Cafe','precio':1.6}, 
    {'type':'postre','plato': 'Fruta','precio':1.5},
    {'type':'postre','plato': 'Yogurt','precio':2}
]   

const extras = [
    {'name':'Patatas',  'precio': 0.50},
    {'name':'Aros de cebolla', 'precio': 1.75},
    {'name':'Nachos',  'precio': 1.80},
    {'name':'Aceitunas',  'precio': 1.0}
]

const comentarios = ['Buena elección!!','Uhmm... perfecta elección!!','Este menú esta de locos..'];

function ObtenerLista (obj, campo, type=null){
  /*Recorre un array de objetos en busca de todos los objetos con una propiedad 
  **Devuelve: un array con los valores de esa propiedad siempre y cuando tengan la propiedad type pasada como parámetro*/
  const newlist=[];
  for (let element in obj){
    if (obj[element]['type']===type){
      newlist.push(obj[element][campo]);
    }
  }
  return newlist;
}

//Obtener array con los extras que tenemos
const listtypeExtra = ObtenerLista(extras, 'name');

function ObtenerValor (listaobj, type, clave){
/* Obtiene dependiendo del tipo de item  seleccionado <<type>> 
** un array con el valor ó valores almacenados en el array de objetos <<listaobj>>
** cuya clave coincida con el parámetro <<clave>>. P.e: devolverá algo así los platos1 ['x','y','z'] ó los platos2 ['xx','yy','zz']
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
    

function SeleccionarPlato(opciones,userMenuType, coste=0, platotype){
/* Seleccionar el plato a degustar dependiendo del menú elegido . 
** Devuelve:
**  string que corresponde al plato elegido
**  "" en caso de cancelar el proceso
*/
    while (true){
        let userPlato = prompt(`Ha elegido el menú ${userMenuType}!!\nAhora toca elegir plato, díganos que prefiere: ${opciones}. `, "");
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

//try{
    let msgHora = prompt(`Bienvenido/a!! Por favor introduzca una hora con el formato hh:mm (24h hour)`, moment().format('HH:mm'));
    function isValidTime (time){
      let patron = /^(0[1-9]|1\d|2[0-3]):([0-5]\d)$/;
      if (patron.test(time)){
         return true;
      } 
      else{
         return false;
      }
    };
  

    const isTime = isValidTime(msgHora);
    let userMenuType ="";
    let pPrincipales = [];
    let pSecundarios = [];
    let pPostres = [];

    if (isTime){//La hora introducida es válida
      
      switch(parseInt(msgHora.substring(0,2))) {
        case 8:
        case 9:
        case 10:
        case 11:
          userMenuType="Breakfast"
          //Obtener arrays con los platos principales, secundarios y postres
          pPrincipales = ObtenerLista(menuBreakfast, 'plato','principal');
          pSecundarios= ObtenerLista(menuBreakfast, 'plato','secundario');
          pPostres = ObtenerLista(menuBreakfast, 'plato','postre');
          alert(pPrincipales);
          break;
        case 12:
        case 13:
        case 14:
        case 15:
          userMenuType="Lunch"
          //Obtener arrays con los platos principales, secundarios y postres
          pPrincipales = ObtenerLista(menuLunch, 'plato','principal');
          pSecundarios= ObtenerLista(menuLunch, 'plato','secundario');
          pPostres = ObtenerLista(menuLunch, 'plato','postre');
          break;
        case 20:
        case 21:
        case 22:
        case 23:
          userMenuType="Diner"
          pPrincipales = ObtenerLista(menuDiner, 'plato','principal');
          pSecundarios = ObtenerLista(menuDiner, 'plato','secundario');
          pPostres = ObtenerLista(menuDiner, 'plato','postre');
          break;
        default:
          alert('Lo sentimos pero estamos cerrados!!');
      }
    }
    else{
      alert('Lo sentimos la hora introducida no es correcta');
    }

    if (userMenuType != "") {
        //Obtener precio del menú seleccionado 
        //let userMenuPrecio = ObtenerValor(menus,userMenuType, 'precio');
        //userMenuPrecio = (userMenuPrecio[0] =="null")? 0: parseFloat(userMenuPrecio);
        
        //Mostrar todo el menú
        alert (`MENU: ${userMenuType}\nPRIMER PLATO: ${pPrincipales}\nSEGUNDO PLATO: ${pSecundarios}\nPOSTRE: ${pPostres}`);
        
        //Comentario aleatorio camarera
        let comentarioRnd = comentarios[lodashRandom(comentarios.length-1)];
        alert (comentarioRnd);  //Muestro comentario aleatorio
            
        //Obtener los platos a degustar 
        let userMenuPlato1=  (pPrincipales!="")? SeleccionarPlato (pPrincipales,userMenuType, 0, 'principal'):"";
        let userMenuPlato2=  (pSecundarios!="")? SeleccionarPlato (pSecundarios,userMenuType, 0, 'secundario'):"";
        let userMenuPostre=  (pPostres!="")? SeleccionarPlato (pPostres,userMenuType, 0, 'postre'):"";

        let userMenuExtras="";
        let textExtra = `¿Desea añadir algún extra?`;
        if (confirm(textExtra) === true) 
        {
          //Ofrecer plato extra máximo dos y obtener sus precios
          let userMenuPrecioExtras=0;
          userMenuExtras= SeleccionarExtra(listtypeExtra);
          if (userMenuExtras!="") {
              const menuextra= userMenuExtras.split(','); 
              let precioextra=0;
              for (let i in menuextra){
                  precioextra = ObtenerValor(extras,menuextra[i], 'precio');
                  userMenuPrecioExtras += (precioextra[0] =="null")? 0: parseFloat(precioextra);

              }
          }

          //Calcular total
          //const userMenuTotal= userMenuPrecioExtras +  ((userMenuPlato1=="" && userMenuPlato2=="" && userMenuPostre=="")? 0: userMenuPrecio);
        }
      
        //Mostrar Resumen comanda y precios
       let text = `Estos son los platos del menú ${userMenuType} seleccionados:\nPlato 1 -> ${userMenuPlato1}\nPlato 2 ->${userMenuPlato2}\nPlato 3 ->${userMenuPostre}\nExtras ->${userMenuExtras}\n`;
      
      // let text = `Estos son los platos del menú ${userMenuType} seleccionados:\nPlato 1 -> ${userMenuPlato1}\nPlato 2 ->${userMenuPlato2}\nPlato 3 ->${userMenuPostre}\nExtras ->${userMenuExtras}\n\nPRECIO Menú: ${userMenuPrecio} euros\nPRECIO Extras: ${userMenuPrecioExtras} euros\nTOTAL a pagar: ${userMenuTotal} euros`;

        if (confirm(text) === true) 
        {
            text = "Bon a pèttit!";
        } 
        else {
            text = "Su menú ha sido cancelado!";
        }
        alert(text);
        

    }
//}
//catch (e) {
  //  throw new MyError('DinerMenu',`DinerMenu App ha generado este error -> ${e}`);
//}