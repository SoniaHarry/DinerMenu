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
    {'type':'Principal','plato': 'Tortitas','precio':3}, 
    {'type':'Principal','plato': 'Tostadas','precio':2},
    {'type':'Principal','plato': 'Croassant','precio':4},
    {'type':'Secundario','plato': 'Cafe','precio':1.6}, 
    {'type':'Secundario','plato': 'Infusion','precio':1.5},
    {'type':'Secundario','plato': 'ColaCao','precio':2}
]  
 
const menuLunch = [
    {'type':'Principal','plato': 'Pasta','precio':3}, 
    {'type':'Principal','plato': 'Arroz','precio':2},
    {'type':'Principal','plato': 'Alubias','precio':4},
    {'type':'Secundario','plato': 'Carne','precio':1.6}, 
    {'type':'Secundario','plato': 'Pescado','precio':1.5},
    {'type':'Secundario','plato': 'Hamburguesa','precio':2},
    {'type':'Postre','plato': 'Cafe','precio':1.6}, 
    {'type':'Postre','plato': 'Fruta','precio':1.5},
    {'type':'Postre','plato': 'Yogurt','precio':2}

]

const menuDiner = [
    {'type':'Principal','plato': 'Ensalada','precio':3}, 
    {'type':'Principal','plato': 'Sopa','precio':2},
    {'type':'Principal','plato': 'Gazpacho','precio':4},
    {'type':'Secundario','plato': 'Pollo','precio':1.6}, 
    {'type':'Secundario','plato': 'Sandwich','precio':1.5},
    {'type':'Secundario','plato': 'Hamburguesa','precio':2},
    {'type':'Postre','plato': 'Cafe','precio':1.6}, 
    {'type':'Postre','plato': 'Fruta','precio':1.5},
    {'type':'Postre','plato': 'Yogurt','precio':2}
]   

const extras = [
    {'name':'Patatas',  'precio': 0.50},
    {'name':'Aros de cebolla', 'precio': 1.75},
    {'name':'Nachos',  'precio': 1.80},
    {'name':'Aceitunas',  'precio': 1.0}
]

const comentarios = ['Buena elección!!','Uhmm... perfecta elección!!','Este menú esta de locos..'];

function ObtenerPropiedad (obj, campo, type=null, plato=null){
  /*Recorre un array de objetos en busca de todos los objetos con una propiedad 
  **Devuelve: un array con los valores de esa propiedad siempre y cuando tengan la propiedad type y plato pasada como parámetro*/
  const newlist=[];
  for (let element in obj){
    if ((obj[element]['type'].toUpperCase()===type || type===null) && (obj[element]['plato'].toUpperCase()===plato || plato===null))     {
      newlist.push(campo!="precio"? obj[element][campo].toUpperCase(): newlist.push(obj[element][campo]));
    }
  }
  //Eliminados elementos duplicados
  const uniquenewlist = newlist.filter((n, index) => newlist.indexOf(n) === index);
  return uniquenewlist;
}


function ObtenerExtras (obj, campo){
  /*Recorre un array de objetos en busca de todos los objetos con una propiedad 
  **Devuelve: un array con los valores de esa propiedad*/
  const newlist=[];
  for (let element in obj){
      newlist.push(obj[element][campo].toUpperCase());
  }
  return newlist;
}


function ObtenerPrecio (obj, name){
  /*Recorre un array de objetos en busca del precio de un ingrediente concreto 
  **Devuelve: el precio, sino encuentra devuelve 0*/
  const newlist=[];
  for (let element in obj){
    if (obj[element]['name'].toUpperCase()===name) {
      return obj[element]['precio'];
    }
  }
  return 0;
}


function lodashRandom(numtop){
/*Genera un número aleatorio entre 0 y numtop */
  return (_.random(0,numtop));
}
    

function SeleccionarPlato(opciones, titulo, aMenuActive, platotype=""){
/* Seleccionar el plato a degustar dependiendo del menú elegido . 
** Devuelve:
**  string que corresponde al plato elegido
**  "" en caso de cancelar el proceso
*/
    //Mostrar las opciones con el precio
    let newOpciones=[];
    for (let i in opciones){
      let precio = ObtenerPropiedad(aMenuActive, 'precio',platotype,opciones[i])[0];
      newOpciones.push(`${opciones[i].toUpperCase()} (${precio})€`);
    }
   
    while (true){
        let userPlato = prompt(`Ahora toca elegir plato ${titulo}, díganos que prefiere: ${newOpciones}. `, "");
        opciones = opciones.map(function (e) { 
            return e.toUpperCase()
        });
        
        if (userPlato === null || userPlato==="") {
            alert (`Vaya...!! No quiere ningún plato como ${platotype}!!`);
            return "";
        }  
        else if (opciones.includes(userPlato.toUpperCase()) && userPlato!="") {
            return userPlato.toUpperCase();
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
            listtypeExtra = listtypeExtra.map(function (e) { 
                return e.toUpperCase()
            });
            for (var i = 0; i < aUserExtra.length; i++) {
                 if(listtypeExtra.includes(aUserExtra[i].toUpperCase())===false){
                    bExiste=false;
                 }
            }
            if (bExiste && aUserExtra.length<=2 ) {
                return userExtraType.toUpperCase();
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

    let aMenuActive=[];
    let aTypeMenu =[];
    
    let pPrincipales = [];
    let pSecundarios = [];
    let pPostres = [];

    if (isTime){//La hora introducida es válida
      
      switch(parseInt(msgHora.substring(0,2))) {
        case 8:
        case 9:
        case 10:
        case 11:
          userMenuType = "BREAKFAST"
          aMenuActive = menuBreakfast;
          break;
        case 12:
        case 13:
        case 14:
        case 15:
          userMenuType="LUNCH"
          aMenuActive = menuLunch;
          break;
        case 20:
        case 21:
        case 22:
        case 23:
          userMenuType="DINER"
          aMenuActive = menuDiner;
          break;
        default:
          alert('Lo sentimos pero estamos cerrados!!');
      }
    }
    else{
      alert('Lo sentimos la hora introducida no es correcta');
    }

    if (userMenuType != "") {
        
        /*Mostrar resumen del menú que se le ofrecerá según la hora
        ** - Obtener array con los tipos de menús que tenemos
        *  - Recorrer los tipos de menú para sacar los platos correspondientes
        */
        const aTypeMenu = ObtenerPropiedad(aMenuActive, 'type');//[PRINCIPAL, SECUNDARIO, POSTRE]
        let menuGretting =`Bienvenido/a el menú que le corresponde es:\n\nMENU: ${userMenuType}`;
        for (let typemenu in aTypeMenu){
          menuGretting= menuGretting + `\n${aTypeMenu[typemenu]}: ${ObtenerPropiedad(aMenuActive, 'plato',aTypeMenu[typemenu])}`; 
        }
        alert (menuGretting);
        
        //Comentario aleatorio camarera
        let comentarioRnd = comentarios[lodashRandom(comentarios.length-1)];
        alert (comentarioRnd);  //Muestro comentario aleatorio
    
        //Obtener los platos a degustar 
        let userMenu=[];
        let totalFactura=0;
        for (let typemenu in aTypeMenu){
          let platoseleccionado="";
          platoseleccionado=SeleccionarPlato (ObtenerPropiedad(aMenuActive, 'plato',aTypeMenu[typemenu]),aTypeMenu[typemenu], aMenuActive, aTypeMenu[typemenu]);
          if (platoseleccionado!="") {
            //Añadir platos seleccionado junto con su precios al array de userPlatosSelec
            let precio=ObtenerPropiedad(aMenuActive, 'precio',aTypeMenu[typemenu],platoseleccionado)[0];
            
            let userPlatosSelec= {
              'name': userMenuType,
              'type': aTypeMenu[typemenu] ,
              'plato': platoseleccionado, 
              'precio': precio
            }
            userMenu.push(userPlatosSelec); //Añadir el plato
            //Añadimos el precio al total de la factura
            totalFactura+=precio;
          }
        }
      
        //Ofrecer platos extra
        let userMenuExtras="";
        let userMenuPrecioExtras=0;
        let textExtra = `¿Desea añadir algún extra?`;
        if (confirm(textExtra) === true) 
        {
          //Obtener array con los extras que tenemos
          const listtypeExtra = ObtenerExtras(extras, 'name');
          
          //Ofrecer plato extra máximo dos y obtener sus precios
          userMenuExtras= SeleccionarExtra(listtypeExtra);
          
          if (userMenuExtras!="") {
              const menuextra= userMenuExtras.split(','); 
              let userMenuExtra=[];
              for (let i in menuextra){
                
                //Añadir extrasjunto con su precios al array de userExtraSelec
                let precioextra = ObtenerPrecio(extras, menuextra[i]);

                let userExtraSelec= {
                  'name': menuextra[i],
                  'precio': precioextra
                }
                userMenuExtra.push(userExtraSelec); //Añadir el plato

                
                userMenuPrecioExtras += precioextra;
              }
          }
        }

        //Calcular total
        const userMenuTotal= userMenuPrecioExtras +  totalFactura;
      
        //Mostrar Resumen comanda y precios
        let setlineasFactura=(userMenu)=>{
          let linea="";
          for (let i in userMenu){
            linea = linea +  `${userMenu[i]["type"]}: ${userMenu[i]["plato"]} --> ${userMenu[i]["precio"]}€\n`; 
          }
          return linea;
        }
 
        
       let textFactura = `Estos son los platos del menú ${userMenuType.toUpperCase()} seleccionados:\n${setlineasFactura(userMenu)}\nExtras: ${userMenuExtras.toUpperCase()} --> ${userMenuPrecioExtras}€\n\nTOTAL: ${userMenuTotal.toFixed(2)}€`;
      
        if (confirm(textFactura) === true) 
        {
            alert("Bon a pèttit!");
        } 
        else {
            alert("Su menú ha sido cancelado!");
        }
    }
//}
//catch (e) {
  //  throw new MyError('DinerMenu',`DinerMenu App ha generado este error -> ${e}`);
//}