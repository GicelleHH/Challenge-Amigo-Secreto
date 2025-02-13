// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.

//Gicelle Hernandez Hernandez - G8. ( •̀ ω •́ )y


//Crear un array para almacenar los nombres.
let amigos =[]; // Se crea el arreglo amigos donde se guardarán temporalmente los nombres.
let numMaximoAmigos =parseInt(60); //Agrego un número máximo de participantes para jugar para así evitar conflictos con algun número extremo de amigos agregados.

function limpiarCaja() { //Limpiar el campo de entrada: Con esta función limpiamos el input para permitir escribir de nuevo.
    document.querySelector('#amigo').value = '';
    return;
}

//Añadiendo un evento por comodidad del usuario.
let elementoInput = document.getElementById('amigo');
elementoInput.addEventListener("keydown",(e)=> { //mediante el metodo addEventListener() visto en la documentación acerca de DOM, se crea un listener que reacciona al evento de presionar "Enter" en el input...
    if (e.code==="Enter") {//... se crea una función anonima (e)=> la cual hará que verifique mediante un if si se presiono un Enter ...
        agregarAmigo();//... y al presionar Enter dentro del input(el input #amigo) se ejecutará la función agregarAmigo() tal como si presionase el botón.
    }
 })


//Implementar función para agregar amigos.
function agregarAmigo(){ //Funcion que se ejecuta al clickear el boton de "Añadir".
    let nombreAmigo = document.getElementById('amigo').value;//Capturar el valor del campo de entrada: guardo el valor introducido en el input en esa variable para no repetir todo ese código en las validaciones.

    //Validar la entrada:
    if (nombreAmigo.trim().length===0) { //Detecta si el input está vacío y envía una alerta si es así.
        alert("Por favor ingresa un nombre ☺"); 
    }else if (/\d/.test(nombreAmigo)) {//Detecta si el valor ingresado contiene numeros.
        alert("No se permiten nombres con números!");
    }else if(/\s$/.test(nombreAmigo)){//Con la expresión regular /\s/ detectamos si hay algun espacio en blanco dentro del string, pero si agregamos el simbolo $ en la expresión entonces detectará si hay algo escrito despues del espacio, si no lo hay envia una alerta.
        alert("No se aceptan espacios en blanco al final!");
    } else  if (amigos.includes(document.getElementById('amigo').value)) {//Aqui validamos que el nuevo nombre no se encuentre ya guardado en el arreglo amigos para no repetirlo.
        alert("Este nombre ya se encuentra en la lista ");
    } else if(amigos.length===numMaximoAmigos){//Aqui valido que el arreglo no estè lleno aún con el numero máximo de amigos
        alert("Ya no puedes agregar más amigos, por favor, sortealos ^^");
    }
    else{
        amigos.push(nombreAmigo);//Actualizar el array de amigos: Si el valor pasa las anteriores validaciones se agrega al arreglo amigos.
    }

    limpiarCaja();//Limpiar el campo de entrada: Se manda a llamar la función ya creada para limpiar el input después de ingresar un nombre al sistema.
    enlistarAmigo();//Aqui mando a llamar la función que cree para listar a los amigos y sean visibles en el html.
    console.log(amigos); //un log para verificar que se agregen correctamente al arreglo.
    return;
 }

//Implementa una función para actualizar la lista de amigos
function enlistarAmigo() {
    let listaAmigos = document.getElementById("listaAmigos");//Obtener el elemento de la lista:  mediante el uso del DOM obtenemos el elemento necesario.
    listaAmigos.innerHTML = ""; //Limpiar la lista existente: con el uso del innerHTML asignandole un valor en blanco.
    
    for (let contador = 0; contador < amigos.length; contador++) {//Iterar sobre el arreglo: usando el bucle for recorremos todos los elementos del arreglo para al mismo tiempo crear los elementos <li> en html para cada índice de la lista.
        let etiquetaLi = document.createElement('li');//Creando los elementos <li>.
        etiquetaLi.innerText = amigos[contador];//Asignandole el contenido a las etiquetas <li> que son los nombres que el usuario agrega.
        
        // Crear botón de eliminar
        let botonEliminar = document.createElement('span'); //con la etiqueta span de html creamos un item que simulará un boton de de X para borrar algun elemento no deseado de la lista.
        botonEliminar.innerText = "❌";// Se le asigna el simbolo "X" (podria ser cualquiera)
        botonEliminar.onclick = function() { //aqui se esta ejecutando la funcion que hará que se eliminen los nombres
            eliminarAmigo(contador);
        };
        
        etiquetaLi.appendChild(botonEliminar); // Agregar botón al <li>
        listaAmigos.appendChild(etiquetaLi); // Agregar <li> a la lista//Agregar elementos a la lista: Con el método appendChild vamos insertando los nuevos elementos uno a uno al final de la lista para que se muestren todos.

}
}
function eliminarAmigo(indice) {//esta es la función que elimina a un amigo de la lista creada con el boton X
    amigos.splice(indice, 1); // Eliminar amigo del arreglo con el metodo splice
    enlistarAmigo(); // Actualiza la lista en la pantalla
}

//Implementa una función para sortear los amigos
function sortearAmigo(){ 
    let numeroAleatorio =  Math.floor(Math.random()*amigos.length); //Generar un índice aleatorio: con el metodo math.floor y math.random se genera un numero aleatorio el cual se usará como índice para sortear al amigo.
    console.log(numeroAleatorio);//console.log solo para verificar el resultado del número.
    
    if (amigos.length===0) {//Validar que haya amigos disponibles: mediante un condicional if validamos que el arreglo no esté vacío y se pueda sortear por lo menos un nombre.
        alert("Hey! No hay amigos a los que sortear! Ingresa al menos dos nombres por favor. ☺");
    }else{
        let mostrarResultado = document.getElementById("resultado"); 
        //Obtener el nombre sorteado: Utilizando el numero aleatorio generado como indice para obtener 1 elemento del arreglo amigos ( amigos[numeroAleatorio] ).
        mostrarResultado.innerHTML = "El elegido es "+amigos[numeroAleatorio] + "!!🐈‍⬛"; //Mostrar el resultado: Mediante la propiedad de innerHTML le asignamos lo que queremos mostrar que es el nombre obtenido mediante el numero aleatorio y un texto extra acorde a la tematica.
    }
    return;
}

//Función para resetear el juego
function resetJuego() {
    if (amigos.length>0) { //Verifico que el juego no se encuentre ya en blanco chequeando que el arreglo no esté vacío.
        amigos = [];//Si el arreglo no esta vacío entonces sí lo limpia.
        let listaAmigos = document.getElementById("listaAmigos");
        listaAmigos.innerHTML = " ";// Limpia la lista que se muestra de los amigos ingresados.
        let mostrarResultado = document.getElementById("resultado"); 
        mostrarResultado.innerHTML = " ";// Y limpia el resultado tambièn.
    }else{
        alert("Por favor ingresa un nombre! :D "); //Si el arreglo está vacío entonces no hay nada que limpiar y pido que ingrese un valor ^^.
    }

    return;
}


