typeExtra=['kk','ee','yy','oo'];
userExtraType='kk,ee';
console.log (userExtraType.split(',').length)
for (var i = 0; i < userExtraType.split(',').length; i++) {
   // document.write(arrayDeCadenas[i] + " / ");
    console.log(typeExtra.includes(userExtraType.split(',')[i]))
  }

  