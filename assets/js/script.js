document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    let ingresoUsuario = document.getElementById("inputId").value;
    $("#resultContainer").datosSuperHeroes(ingresoUsuario);

    console.log(ingresoUsuario);
});

jQuery.fn.datosSuperHeroes = function(ingresoUsuario) {
    var element = this;
    $.ajax({
        type: "GET",
        url: `https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/40cf87c2ea6cc2895e8c4977345d8f03/${ingresoUsuario}`, 
        // URL modificada para usar el proxy
        dataType: "json",
        success: function(data) {
            element.empty();

            // Generar la tarjeta de Bootstrap con los datos recibidos
            let card = `
                <div class="card" style="width: 18rem;">
                  <img src="https://via.placeholder.com/150" class="card-img-top" alt="Superhero Image">
                  <div class="card-body">
                    <h5 class="card-title">${data.name}</h5>
                    <p class="card-text">Intelligence: ${data.intelligence}</p>
                    <p class="card-text">Strength: ${data.strength}</p>
                    <p class="card-text">Speed: ${data.speed}</p>
                  </div>
                </div>
            `;
            
            // Insertar la tarjeta en el contenedor
            element.append(card);
        },
        error: function(xhr, status, error) {
            console.log("Error en la solicitud: ", error);
        }   
    });
    return this;
};







