"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function() {
   $("#fileinput").change(calculate);
});

function generateOutput(contents) {
  return contents.replace(/\b([a-zA-Z_]\w*)(\s+)\1\b/g,"$1$2");
}

function calculate(evt) { //evt evento de seleccionar fichero
  var f = evt.target.files[0]; 
  var contents = '';

  if (f) {
    var r = new FileReader();
    r.onload = function(e) { //Es una asignación, la función no se ejecuta. Cuando ocurra el evento onload, se ejecuta
      contents = e.target.result;
      var escaped  = escapeHtml(contents);
      var outdiv = document.getElementById("out");
      outdiv.className = 'unhidden';   /* cambiamos la clase para que sea visible */
      finaloutput.innerHTML = generateOutput(escaped); //identificadores de HTML
      initialinput.innerHTML = escaped;
    }
    r.readAsText(f); // Ejemplo: f = function(x) { return x*x; } //no se ejecuta hasta que se haga f(2); 
  } else { 
    alert("Failed to load file");
  }
}

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

function escapeHtml(string) { //Escapar los elementos HTML para que no se vean en el <pre> </pre>
  return String(string).replace(/[&<>"'\/]/g, function (s) {
    return entityMap[s];
  });
}