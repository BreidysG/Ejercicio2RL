document.getElementById('startButton').addEventListener('click', function() {
    startTimer();
    startExercise();
});

let wordSlot = document.getElementById("wordSlot");
let visualInterval;
let timerInterval;
let originalWords = [
    "Elefante", "Guitarra", "Playa", "Computadora", "Montaña", "Chocolate","Universo", "Libro", "Estrella", "Fresa", "Camino", "Perro","Aventura", "Canción", "Bosque", "Cielo", "Amor", "Piano",
    "Viaje", "Helado", "Océano", "Luna", "Sol", "Arcoiris",
    "Casa", "Flor", "Abeja", "Mariposa", "Aurora", "Nube",
    "Relámpago", "Héroe", "Sonrisa", "Bailarín", "Viento", "Catarata",
    "Girasol", "Desierto", "Reloj", "Mar", "Arena", "Coral",
    "Sirena", "Nave", "Olas", "Sueño", "Despertar", "Ocaso",
    "Horizonte", "Tranquilidad", "Reflejo", "Colina", "Neblina", "Silencio","Meditación", "Árbol", "Río", "Pájaro", "Hojas", "Cascada",
    "Escalera", "Barco", "Isla", "Nieve", "Copo", "Diamante",
    "Perla", "Brisa", "Murmullo", "Estanque", "Atardecer", "Montura",
    "Estrella fugaz", "Caballo", "Niebla", "Fuego", "Trueno","Relajación","Descanso", "Paseo", "Huella", "Paraíso", "Amistad","Corazón","Recuerdo", "Música", "Inspiración", "Creación","Nacimiento", "Juventud","Niñez", "Libertad", "Refugio", "Jardín","Orquídea", "Espejo","Caverna", "Templo", "Faro", "Armonía", "Esperanza", "Cascabel", "Lágrima", "Destello", "Alba",
    "Colores", "Luz", "Cristal", "Arco", "Río", "Bosquejo", "Marea", "Constelación", "Cúpula", "Tierra", "Relato",
    "Sonido", "Travesía", "Cabaña", "Fragancia", "Nube", "Trigal",
    "Cosecha", "Bruma", "Ondas", "Espuma", "Arena", "Lluvia",
    "Alondra", "Rocío", "Eco", "Ceniza", "Raíz", "Madera",
    "Barro", "Molino", "Mirada", "Silencio", "Susurro", "Gaviota",
    "Tallo", "Floración", "Ritmo", "Sombra", "Camino", "Mirador",
    "Vigía", "Montículo", "Estalactita", "Velero", "Náufrago", "Corriente",
    "Tótem", "Huerto", "Nebulosa", "Brillante", "Estrella polar", "Constancia",
    "Serenidad", "Compás", "Rayo", "Observatorio", "Torre", "Puente",
    "Atalaya", "Caverna","Césped", "Prado", "Madera",
    "Esplendor", "Firmamento", "Golondrina", "Melodía", "Sinfonía", "Calma",
    "Bravura", "Bravura", "Viento", "Corriente", "Canoa", "Sendero", "Espejismo", "Bosquecillo", "Sierra", "Solsticio", "Equinoccio", "Viento", "Brisa", "Huracán", "Tormenta", "Lluvia", "Neblina",
    "Vapor", "Niebla", "Cielo", "Noche", "Luz", "Amanecer",
    "Sol", "Luna", "Estrella", "Cometa", "Nube", "Rayo",
    "Relámpago", "Trueno", "Río", "Corriente", "Cascada", "Lago",
    "Laguna", "Charca", "Mar", "Océano", "Marea", "Arena",
    "Duna", "Desierto", "Tierra", "Valle", "Colina", "Montaña",
    "Cumbre", "Glaciar", "Sierra", "Bosque", "Selva", "Pradera",
    "Campo", "Jardín", "Cueva", "Gruta", "Acantilado", "Risco",
    "Volcán", "Cráter", "Fumarola", "Géiser", "Pantano", "Roca",
    "Arroyo", "Sendero", "Camino", "Carretera", "Calle", "Plaza",
    "Ciudad", "Pueblo", "Aldea", "Cabaña", "Mansión", "Palacio",
    "Castillo", "Fortaleza", "Muralla", "Puente", "Túnel", "Callejón",
    "Avenida", "Mercado", "Granero", "Establo", "Viñedo", "Huerto",
    "Prado", "Pinar", "Bahía", "Costa", "Playa", "Horizonte",
    "Nieve", "Nevada", "Viento", "Frío", "Cima", "Colina",
    "Árbol", "Pino", "Cedro", "Roble", "Sauce", "Abeto",
    "Almendro", "Cerezo", "Naranjo", "Olivo", "Higuera", "Ciprés",
    "Hiedra", "Enredadera", "Rosa", "Tulipán", "Orquídea", "Girasol",
    "Dalia", "Clavel", "Violeta", "Azucena", "Jazmín", "Lirio",
    "Magnolia", "Camelia", "Hortensia", "Geranio", "Petunia", "Verbena",
    "Amapola", "Diente", "Margarita", "Caléndula", "Zinnia", "Ruda",
    "Salvia", "Romero", "Tomillo", "Albahaca", "Lavanda", "Menta",
    "Hierbabuena", "Manzanilla", "Melisa", "Poleo", "Cúrcuma", "Jengibre",
    "Canela", "Nuez", "Clavo", "Pimienta", "Café", "Cacao",
    "Vainilla", "Azúcar", "Miel", "Caramelo", "Chocolate", "Pastel",
    "Tarta", "Galleta", "Bizcocho", "Flan", "Natilla", "Crema",
    "Merengue", "Helado", "Sorbet", "Granizado", "Yogur", "Queso",
    "Pan", "Baguette", "Croissant", "Sándwich", "Ensalada", "Verduras",
    "Sopa", "Guiso", "Paella", "Arroz", "Curry", "Sushi",
    "Tempura", "Pizza", "Pasta", "Espaguetis", "Risotto", "Pollo",
    "Filete", "Estofado", "Cordero", "Pescado", "Mariscos", "Langosta",
    "Calamares", "Camarones", "Mejillones", "Ostras", "Cangrejo", "Pulpo",
    "Sardinas", "Atún", "Salmón", "Trucha", "Merluza", "Bacalao",
    "Lenguado", "Boquerones", "Cocido", "Fabada", "Tortilla", "Gazpacho",
    "Salmorejo", "Caldo", "Churros", "Crema", "Turrón", "Polvorones",
    "Mantecados", "Empanada", "Pisto", "Escalivada", "Rabo", "Jamón",
    "Chorizo", "Morcilla", "Lomo", "Queso", "Tortas", "Pan",
    "Aceitunas", "Aceite", "Vino", "Cava", "Sidra", "Sangría",
    "Horchata", "Agua", "Zumo", "Limonada", "Café", "Té",
    "Infusión", "Cerveza", "Whisky", "Ron", "Vodka", "Gin",
    "Cóctel", "Margarita", "Piña", "Mojito", "Caipirinha", "Martini",
    "Bloody", "Daiquiri", "Negroni", "Manhattan", "Old", "Mai",
    "Sazerac", "Tequila", "Brandy", "Licor", "Baileys", "Jägermeister",
    "Absenta", "Champán", "Tormenta", "Aurora", "Rayo", "Mariposa",
    "Héroe", "Sonrisa", "Bailarín", "Piano", "Beso", "Cascada",
    "Viaje", "Amor", "Caricia", "Sonido", "Viento", "Canto",
    "Sombra", "Mirada", "Calor", "Templo", "Luz", "Silencio",
    "Aroma", "Risa", "Rueda", "Canción", "Ritmo", "Poema",
    "Corazón", "Llama", "Magia", "Cielo", "Melodía", "Reflejo",
    "Palabra", "Cuento", "Pasión", "Joya", "Paz", "Estrella",
    "Ceniza", "Velo", "Espejo", "Sabor", "Plenitud", "Lago",
    "Aventura", "Desafío", "Sueño", "Escudo", "Rayo", "Salto",
    "Fuerza", "Grito", "Libertad", "Sendero", "Poesía", "Explosión",
    "Caída", "Luz", "Golpe", "Destello", "Gema", "Susurro",
    "Destino", "Pasado", "Presente", "Futuro", "Guía", "Brillo",
    "Eco", "Sombras", "Tierra", "Lejanía", "Encuentro", "Voz",
    "Llamada", "Escalera", "Amanecer", "Horizonte", "Épica", "Roca",
    "Conquista", "Colores", "Esfera", "Orilla", "Cristal", "Tejido",
    "Brisa", "Niebla", "Amanecer", "Cascada", "Palacio", "Bailarina",
    "Fábula", "Fortaleza", "Nostalgia", "Fortuna", "Rayo", "Poeta",
    "Alba", "Neblina", "Labio", "Piel", "Luz", "Olvido",
    "Sombras", "Llama", "Tierra", "Pasión", "Eco", "Viaje",
    "Silencio", "Tiempo", "Destino", "Guía", "Cuento", "Amistad",
    "Sol", "Lluvia", "Viento", "Trueno", "Frío", "Despertar",
    "Vuelo", "Recuerdo", "Leyenda", "Destello", "Aventura", "Oscuridad",
    "Fuego", "Infinito", "Relámpago", "Espejo", "Río", "Susurro"
];
function startExercise() {
    
    // Ocultar instrucciones y botones
    var instructionParagraphs = document.querySelectorAll('.instruction');
    for (var i = 0; i < instructionParagraphs.length; i++) {
        instructionParagraphs[i].style.display = 'none';
    }
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('containerInputButton').style.display = 'none';
    
    // Mostrar la ranura
    document.getElementById('slotContainer').classList.remove('hidden');
    
    // Obtener la velocidad del recorrido desde el campo de entrada
    var speedInput = document.getElementById('speedInput');
    var velocidadRecorrido = parseInt(speedInput.value);
    
    // Iniciar temporizador
    
    // Iniciar el recorrido visual
    startVisualRecorrido(velocidadRecorrido);
}

function startVisualRecorrido(velocidadRecorrido) {
    var wordIndex = 0;
    clearInterval(visualInterval);
    
    visualInterval = setInterval(function() {
        // Mostrar la palabra en la ranura central
        wordSlot.innerHTML = ''; // Limpiar ranura
        var p = document.createElement('p');
        p.textContent = originalWords[wordIndex];
        wordSlot.appendChild(p);
        
        // Incrementar el índice de las palabras
        wordIndex++;
        if (wordIndex >= originalWords.length) {
            wordIndex = 0;
        }
    }, velocidadRecorrido);
}

function startTimer() {
    var timerElement = document.getElementById('timer');
    var totalTime = 180; // 3 minutos en segundos
    var minutes, seconds;
    
    timerInterval = setInterval(function() {
        minutes = Math.floor(totalTime / 60);
        seconds = totalTime % 60;
        timerElement.innerHTML = 'Tiempo restante: ' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

        if (totalTime <= 0) {
            clearInterval(timerInterval);
            clearInterval(visualInterval);
            alert('¡El ejercicio ha terminado!');
            return;
        }
        totalTime--;
    }, 1000);
}

