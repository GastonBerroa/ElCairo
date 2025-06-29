"use strict"

// declaro variables y llamo datos del DOM

const URL= "https://685aaf099f6ef961115768f4.mockapi.io/api/reviews";
let form = document.querySelector(".reviewform")
let tabla = document.querySelector("#tabla-datos");
let boton= document.querySelector(".borrar-btn");
let idapi= 0;


// traigo de la appi los datos y los muestro en pantalla
mostrar();



form.addEventListener ("submit", agregar);

//agrego los datos del usuario a la appi
function agregar(event){
    event.preventDefault();
    let formdata= new FormData(form);
    let nombre = formdata.get("name");
    let show = formdata.get("show");
    let puntajeevento = parseInt(formdata.get("puntajeev"));
    let puntajeatencion = parseInt(formdata.get("puntajeat"));
    let puntajeambiente = parseInt(formdata.get("puntajeamb"));

    let objetorreview = {  nombre:nombre,
                            show:show,
                            puntajeevento:puntajeevento,
                            puntajeatencion:puntajeatencion,
                            puntajeambiente:puntajeambiente

                        };
    fetch(URL, {
            method: "POST", // Indica que estás enviando datos
            headers: {
              "Content-Type": "application/json" // Le decís a la API que estás mandando JSON
            },
            body: JSON.stringify(objetorreview) // Convertís el objeto a texto JSON
          })
    .then(response => response.json()) // Convertís la respuesta a JSON
    .then(data => {
      console.log("Respuesta de la API:", data);
      mostrar();
    })
    .catch(error => {
      console.error("Hubo un error:", error);
    });
   
   
}

// traigo de la appi los datos y los muestro en pantalla
function mostrar() {
    tabla.innerHTML="";
    fetch(URL)
    .then(respuesta => respuesta.json())
    .then(datos => {
        datos.forEach(item => {
        const fila = document.createElement("tr");

        fila.innerHTML = `
          <td class="nombre">${item.nombre}</td>
          <td class="show">${item.show}</td>
          <td class="evento">${item.puntajeevento}</td>
          <td class="atencion">${item.puntajeatencion}</td>
          <td class="ambiente">${item.puntajeambiente}</td>
        `;

        // Botón Eliminar
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.classList.add("borrar-btn");
        btnEliminar.id = item.id;

        // Botón Modificar
        const btnModificar = document.createElement("button");
        btnModificar.textContent = "Modificar";
        btnModificar.classList.add("modificar-btn");
        btnModificar.id = item.id;
          
        //boton guardar oculto
        const btnGuardar = document.createElement("button");
        btnGuardar.textContent = "Guardar";
        btnGuardar.classList.add("guardar-btn");
        btnGuardar.classList.add("oculto");
        btnGuardar.id = item.id;  
          

        const contenedorBotones = document.createElement("td");
        contenedorBotones.appendChild(btnEliminar);
        contenedorBotones.appendChild(btnModificar);
        contenedorBotones.appendChild(btnGuardar);
        
        fila.appendChild(contenedorBotones);
        tabla.appendChild(fila);
    });

    
    // Metodo de borrar en api y recargo con mostrar
    tabla.querySelectorAll(".borrar-btn").forEach(boton => {
        boton.addEventListener("click", function () {
            const fila = boton.parentElement.parentElement;
            const idapi = boton.id;

            fetch(URL + "/" + idapi, {
                method: "DELETE"
            })
                .then(response => {
                    if (response.ok) {
                        fila.remove();
                        console.log("Elemento eliminado");
                        mostrar();
                    } else {
                        console.error("Error al borrar en la API");
                    }
                })
                .catch(error => {
                    console.error("Error en DELETE:", error);
                });
        });
    });
    
    
    // Metodo modificar
    tabla.querySelectorAll(".modificar-btn").forEach(boton => {
        boton.addEventListener("click", function () {
            const fila = boton.parentElement.parentElement;
            const idapi = boton.id;

            const celdaNombre = fila.querySelector(".nombre");
            const celdaShow = fila.querySelector(".show");
            const celdaEvento = fila.querySelector(".evento");
            const celdaAtencion = fila.querySelector(".atencion");
            const celdaAmbiente = fila.querySelector(".ambiente");

            // Reemplazo de texto por inputs
            celdaNombre.innerHTML = `<input type="text" value="${celdaNombre.textContent}">`;
            celdaShow.innerHTML = `<input type="text" value="${celdaShow.textContent}">`;
            celdaEvento.innerHTML = `<input type="number" value="${celdaEvento.textContent}" min="1" max="5">`; //le deja poner mas de 5 si escribe el usuario
            celdaAtencion.innerHTML = `<input type="number" value="${celdaAtencion.textContent}" min="1" max="5"> `;
            celdaAmbiente.innerHTML = `<input type="number" value="${celdaAmbiente.textContent}"min="1" max="5">`;

           // ACA HACE EL TOGGLE
            const contenedorBotones = boton.parentElement;
            const btnGuardar = contenedorBotones.querySelector(".guardar-btn");
            const btnEliminar = contenedorBotones.querySelector(".borrar-btn");

            boton.classList.add("oculto");         // ocultar Modificar
            btnEliminar.classList.add("oculto");   // ocultar Eliminar
            btnGuardar.classList.remove("oculto"); // mostrar Guardar  

            btnGuardar.dataset.idapi = boton.id; // Guardás el id dentro de un atributo personalizado para extraerlo en guardar
        });

        
    }); 
      
     
     
           
    //metodo de guardar datos modificados
    tabla.querySelectorAll(".guardar-btn").forEach(boton => {
        boton.addEventListener("click", function () {
            



            const fila = boton.parentElement.parentElement;
            const idapi = boton.dataset.idapi;  //extaigo el id que obtuve en modificar

            const celdaNombre = fila.querySelector(".nombre");
            const celdaShow = fila.querySelector(".show");
            const celdaEvento = fila.querySelector(".evento");
            const celdaAtencion = fila.querySelector(".atencion");
            const celdaAmbiente = fila.querySelector(".ambiente");



                const datosActualizados = {
                    nombre: celdaNombre.querySelector("input").value,
                    show: celdaShow.querySelector("input").value,
                    puntajeevento: parseInt(celdaEvento.querySelector("input").value),
                    puntajeatencion: parseInt(celdaAtencion.querySelector("input").value),
                    puntajeambiente: parseInt(celdaAmbiente.querySelector("input").value)
                };
            
            console.log(idapi);
                fetch(URL + "/" + idapi, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datosActualizados)
                })
                    .then(response => {
                        if (response.ok) {
                            console.log("Modificación exitosa");
                            mostrar(); // recarga la tabla actualizada
                        } else {
                            console.error("Error al modificar");
                        }
                    })
                    .catch(error => {
                        console.error("Error en PUT:", error);
                    });
            }, { once: true }); // evita múltiples eventos si se hace clic muchas veces
        
    });




  })
  .catch(error => {
    console.error("Error al obtener datos:", error);
  });

}
      


 
  