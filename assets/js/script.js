const regexNumerico = /^\d+$/;
const maxNumero = 731;
const errorMessageElement = document.getElementById('errorMessage');

document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault();
    let ingresoUsuario = document.getElementById("inputId").value;

    // Validar si el ingreso es un número
    if (!regexNumerico.test(ingresoUsuario)) {
        errorMessageElement.textContent = "Por favor, ingrese solo valores numéricos positivos.";
        errorMessageElement.classList.remove('hidden');
        return;
    }

    // Validar si el número ingresado etá en el rango permitido
    if (parseInt(ingresoUsuario) > maxNumero) {
        errorMessageElement.textContent = `El número debe estar entre 1 y ${maxNumero}.`;
        errorMessageElement.classList.remove('hidden');
        return;
    }

    $("#resultContainer").datosSuperHeroes(ingresoUsuario);
});

jQuery.fn.datosSuperHeroes = function (ingresoUsuario) {
    var element = this;
    $.ajax({
        type: "GET",
        url: `https://cors-anywhere.herokuapp.com/https://superheroapi.com/api/40cf87c2ea6cc2895e8c4977345d8f03/${ingresoUsuario}`,
        dataType: "json",
        success: function (data) {
            // Limpiar el contenedor antes de mostrar resultados de una nueva consulta
            element.empty();

            // Mostrar el contenedor una vez que se tiene la respuesta
            $("#resultContainer").removeClass("hidden");
            $("#chartContainer").removeClass("hidden");

            // Acceder a los datos de la API
            let powerstats = data.powerstats;
            let image = data.image;
            let biography = data.biography;
            let firstAppearance = biography["first-appearance"];
            let fullName = biography["full-name"];
            let appearance = data.appearance;
            let connections = data.connections;
            let groupAffiliations = connections["group-affiliation"];

            console.log(powerstats.intelligence);

            //Función que crea el gráfico a partir de la información obtenida de la API
            function crearGrafico(powerstats) {
                var chart = new CanvasJS.Chart("chartContainer", {
                    title: {
                        text: "Estadísticas de Superhéroe"
                    },
                    axisY: {
                        title: "Puntos"
                    },
                    data: [{
                        type: "column",
                        dataPoints: [
                            { label: "Inteligencia", y: parseInt(powerstats.intelligence) },
                            { label: "Fuerza", y: parseInt(powerstats.strength) },
                            { label: "Velocidad", y: parseInt(powerstats.speed) },
                            { label: "Resistencia", y: parseInt(powerstats.durability) },
                            { label: "Poder", y: parseInt(powerstats.power) },
                            { label: "Combate", y: parseInt(powerstats.combat) }
                        ]
                    }]
                });

                chart.render();
            }


            // Crear la tarjeta con Tailwind CSS, mostrando la información importante del personaje
            let card = `
            <div class="flex max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <img class="w-1/3 h-auto object-cover" src="${image.url}" alt="Superhero Image">
                <div class="w-2/3 p-6">
                <div class="font-bold text-gray-700 text-2xl mb-2">${data.name}</div>
                    <p class="text-gray-700 text-base">
                        <i><b>Nombre</b></i>: ${fullName}<br>
                        <i><b>Alias</b></i>: ${biography.aliases}<br>
                        <i><b>Altura</b></i>: ${appearance.height}<br>
                        <i><b>Peso</b></i>: ${appearance.weight}<br>
                        <i><b>Primera aparición</b></i>: ${firstAppearance}<br>
                        <i><b>Afiliaciones</b></i>: ${groupAffiliations}<br>
                        <i><b>Publicado por</b></i>: ${biography.publisher}<br>
                    </p>
                </div>
            </div>

            `;

            // Insertar la tarjeta en el contenedor
            element.append(card);

            crearGrafico(powerstats);

            // Desplazar automáticamente hacia el resultado
            document.getElementById("resultContainer").scrollIntoView({ behavior: 'smooth' });
        },
        error: function (xhr, status, error) {
            console.log("Error en la solicitud: ", error);
        }
    });
    return this;
};





