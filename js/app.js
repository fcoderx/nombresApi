
class Datos { 

    obtenerDatos() {

        // Leer las variables
        const origen = document.getElementById('origen');
        const origenSelect = origen.options[origen.selectedIndex].value;

        const genero = document.getElementById('genero');
        const generoSelect = genero.options[genero.selectedIndex].value;

        const cantidad = document.getElementById('numero').value;

        let url = 'http://uinames.com/api/?';

        // Si hay origen, agregarlo a la url
        if (origenSelect !== '') {
            url += `region=${origenSelect}&`;
        }

        // Si hay un genero, agregarlo a la url
        if (generoSelect !== '') {
            url += `gender=${generoSelect}&`;
        }

        // Si hay una cantidad, agregarlo a la url
        if (cantidad !== '') {
            url += `amount=${cantidad}&`;
        }

        return url;
    }
}


class NombresAPI {

    cargarNombres(e){

        e.preventDefault();

        // Instanciar la clase donde obtenemos todos los datos
        const dtos = new Datos();

        // Conectar con Ajax
        const xhr = new XMLHttpRequest();

        // Abrir conexión
        xhr.open('GET', dtos.obtenerDatos(), true);
        // Datos eh impresión del template
        xhr.onload = function() {
            if (this.status === 200) {
                const nombres = JSON.parse(this.responseText);

                let contenido = '<h2>Nombres Generados</h2>';
                
                contenido += '<ul class="lista">';

                nombres.map(function(nombre) {
                    contenido += `
                        <li>${nombre.name} ${nombre.surname}</li>
                    `;
                }); 

                contenido += '</ul>';

                document.querySelector('#resultado').innerHTML = contenido;
            }
        }; 

        // Mandar el request
        xhr.send();

    }
}

const nombres = new NombresAPI();
document.querySelector('#generar-nombre').addEventListener('submit', nombres.cargarNombres);
