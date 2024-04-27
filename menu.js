class MyError extends Error {
    constructor(msg = 'An error occurred', ...params) {
      super(...params);
      this.msg = msg;
    }
  }

//const data = moment().format('dddd, MMMM Do YYYY');

const menus = [
    {'name':'Breakfast', 'plato1': 'Tortitas, Tostadas', 'plato2': 'Café, Colacao, Infusión', 'plato3':'', 'precio':10},
    {'name':'Lunch', 'plato1': 'Pasta, Arroz', 'plato2': 'Carne del día, Pescado del día', 'plato3':'Flan, Crepes, Yogurt, Café','precio':15},
    {'name':'Diner', 'plato1': 'Ensalada ventresca, Sopa', 'plato2': 'Tostada Jamón, sandwich', 'plato3':'Café','precio':20}  
]

const extras = [
    {'plato':'Patatas Fritas',  'coste': 1.50},
    {'plato':'Aros de cebolla', 'coste': 1.75},
]

const comentarios = [
    {'plato':'Patatas Fritas', 'Comment': 'Ha elegido el mejor acompañamiento!!'},
    {'plato':'Aros de cebolla', 'Comment': 'Enhorabuena!! ha elegido los mejores aros de cebolla del planeta!!'},
    
]

//Obtener la lista con los tipos de menús que tenemos
const typeMenu=[]
for (let menu in menus){
    typeMenu.push(menus[menu]['name']);
}
console.log(typeMenu);

function ObtenerPlatos (lista, type,numPlato){
    const keyname = _.keyBy(lista, 'name');
    return keyname[type][numPlato];
}

//alert(`Bienvenido/a!! Seleccione uno de nuestros menús de hoy ${data} : ${typeMenu}. `)
let userMenuType="";
do {
  try{
    let userMenuType = prompt(`Bienvenido/a!! estos son los menús de hoy : ${typeMenu}. ` + "\n" + "Introduzca el menú a degustar", "");
  }
  catch{
    alert('Introduzca un menú');
  }
}
while (typeMenu.includes(userMenuType)===false)

  /*
do {
    let userMenuType = prompt(`A elegido el menú ${userMenuType}!! ahora toca elegir plato, digános que prefiere: ${ObtenerPlatos(menus,userMenuType, 'plato1')}. `, "");
}
while (typeMenu.includes(userMenuType)===false)
*/
