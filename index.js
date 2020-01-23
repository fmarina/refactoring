$(document).ready(function () {
  cargarPeliculas();
  cargarGenerosEnTag();
  filtrarXGeneroPeliculas();  
  filtrarXRatePelicula();  
});

//funcion que carga los generos de las peliculas en el combobox Tag
function cargarGenerosEnTag(){
  var tagsValidos = [];
  var contenedorTag = $("#tag");
  movies.movies.forEach(function(movie){
    movie.tags.forEach(function(tag){
      if(!tagsValidos.includes(tag.name)){
        tagsValidos.push(tag.name);
      }
    });
  });
  tagsValidos.unshift("All");
  tagsValidos.forEach(function(tag){
    var etiquetaOption = $("<option></option>");
    etiquetaOption.text(tag);
    etiquetaOption.addClass("optionTag");    
    etiquetaOption.val(tag);
    contenedorTag.append(etiquetaOption);
  });
}

//muestra todos los generos posibles que tenga cada pelicula en el listado
function mostarTodosLosTagsEnPelicula(movieTags){
  var tags = "";
  var espacio = " ";
  movieTags.forEach(function(tag){
    tags += espacio + tag.name;
  });
  return tags;
}

//se crean las etiquetas para darle diseño al listado de peliculas en el documento html
function cargarElementosAlHtml(movie){
  var nuevoTag = mostarTodosLosTagsEnPelicula(movie.tags);  
    var movieHTML = $(
      '<li class="movie"><img class="movie__image" src="' + 
        movie.img + 
        '" alt=""><div class="movie__summary"><div><h2 class="movie__title">' + 
        movie.title + 
        '</h2><span class="year">(' + 
        movie.year + 
        ')</span></div><div><img class="movie__star" src="https://img.icons8.com/plasticine/2x/star--v1.png" alt=""><span class="movie__rate">' + 
        movie.rating + 
        '</span><span class="genre"> ' +
        nuevoTag + 
        '</span></div><p class="movie__description">' + 
        movie.description + 
        '</p></div></li>');
    $('.movies__list').append(movieHTML);
}

//carga todos las peliculas en el document html
function cargarPeliculas(){
  movies.movies.forEach(movie => { 
    cargarElementosAlHtml(movie);
  });
}

//función que al seleccionar un genero en el combobox Tag filtra por la pelicula seleccionada
function filtrarXGeneroPeliculas(){
  $("#tag").change(function (e){
    $('.movies__list').empty();
    movies.movies.forEach(movie => {
      if(e.target.value === "All"){
        cargarElementosAlHtml(movie);
      }
      if (movie.tags[0].name === e.target.value) {
        cargarElementosAlHtml(movie);
      }
    });
  });
}

//función que al seleccionar un rate en el combobox Rate filtra por el rating de la pelicula
function filtrarXRatePelicula(){
  $("#rate").change(function (e){
    $('.movies__list').empty();

    movies.movies.forEach(movie =>{
      if(e.target.value === "/"){
        cargarElementosAlHtml(movie);
      }
      if(e.target.value === "top"){
        if(movie.rating >= 8){
          cargarElementosAlHtml(movie);
        }
      }
      else if(e.target.value === "medium"){
        if(movie.rating >=6 && movie.rating < 8){
          cargarElementosAlHtml(movie);
        }
      }
      else if(e.target.value === "low"){
        if(movie.rating >=4 && movie.rating < 6){
          cargarElementosAlHtml(movie);
        }         
      }
    });
  });
}



