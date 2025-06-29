const captcha = document.querySelector(".captcha");

// operador de propagación
function obtenerCaracteresAleatorios() {
  const caracteres = [
    ...'0123456789',
    ...'abcdefghijkmnopqrstuvwxyz',
    ...'ABCDEFGHJKLMNOPQRSTUVWXYZ'
  ];

  const seleccionados = [];

  while (seleccionados.length < 5) {
    const indice = Math.floor(Math.random() * caracteres.length);
    const caracter = caracteres[indice];

    if (!seleccionados.includes(caracter)) {
      seleccionados.push(caracter);
    }
  }

  return seleccionados.join('');
}

let capcha = obtenerCaracteresAleatorios();
captcha.innerHTML = capcha;

// escucho el submit del formulario
const form = document.querySelector("form");
const boton = document.querySelector(".confirmar");

form.addEventListener("submit", (e) => {
  e.preventDefault(); //  el form no se envia asi  puedo mostrar en pantalla

  const captchauser = document.querySelector(".capchauser").value;
  const casilla = document.querySelector(".capchauser");

  if (capcha != captchauser) {
    capcha = obtenerCaracteresAleatorios();
    captcha.innerHTML = capcha + "<br>incorrecto, vuelva a intentarlo";
  } else {
    captcha.innerHTML = "correcto, vuelva al inicio";
    boton.remove();
    casilla.remove();
  }
});