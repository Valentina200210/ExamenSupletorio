var url = "https://carlosreneas.github.io/endpoints/noticias.json";
var urlDep = "https://carlosreneas.github.io/endpoints/categoria_deporte.json";
var urlTecn = "https://carlosreneas.github.io/endpoints/categoria_tecnologia.json";

var noticias;
var deportes;
var tecnologias;

function leernoticias(){
  var cabecera = new Headers();

  var myInit = { method: 'GET',
                 headers: cabecera,
                 mode: 'cors',
                 cache: 'default' 
               };

  var miPeticion = new Request(url, myInit);

  fetch(miPeticion)  
    .then(res => res.json())
    .catch(error => console.error('Error:',error))
    .then(response => {
       noticias = response; 
       text = "<div id='todo'>";
       for(let i in noticias){
        if (i<3){
          let noti    = "n" + noticias[i].id;
          let resumen = "r" + noticias[i].id;
          let detalle = "d" + noticias[i].id;
          text += "<article id='"+noti+"'>";
          text += "<div id='"+resumen+"' >";
          text += "<span style='color:rgb(93 121 234);'><b>"+ noticias[i].titulo + " - " + noticias[i].categoria + " - " + noticias[i].fecha + "</b></span>";
          text += "<div style='border-style: ridge;'>"+ noticias[i].descripcion;
          const proceso1 = "mostrarDetalle(\'"+detalle+"\')";
          text += "<a href='#' onclick=\""+proceso1+"\">ver Mas</a>";
          text += "</div>";
          text += "</div>";
          text += "<div  id='"+detalle+"' style='display:none;'>";
          text += "<img src='"+noticias[i].img+"'>";
          text += "<div>"+ noticias[i].detalle;
          const proceso2 = "ocultarDetalle(\'"+detalle+"\')";
          text += "<a href='#' onclick=\""+proceso2+"\">ver Menos</a>";
          text +=  "</div>";
          text += "</div>";          
          text += "</article><br>";          
        }
       }
       text += "</div>";       
      document.getElementById("salida").innerHTML = text;       
    });
}

function leerDepoTecno(laurl,salida,idsalida,titulo){
  var cabecera = new Headers();

  var myInit = { method: 'GET',
                 headers: cabecera,
                 mode: 'cors',
                 cache: 'default' 
               };

  var miPeticion = new Request(laurl, myInit);

  fetch(miPeticion)  
    .then(res => res.json())
    .catch(error => console.error('Error:',error))
    .then(response => {
       salida = response; 
       text = "<div style='border-style: ridge;'>";
       text += "<div><b>"+titulo+"</b></div><br>";
       for(let i in salida){
        if (i<3){
          text += "<article>";
          text += "<a href='https://carlosreneas.github.io/endpoints/noticia_6.json'>"+salida[i].titulo+"</a>";
          text += "</article><br>";          
        }
       }
       text += "</div><br>";       
      document.getElementById(idsalida).innerHTML = text;       
    });
}

function leerDeportes(){
  leerDepoTecno(urlDep,deportes,"salidaDep","Deportes");
}

function leerTecnologia(){
 leerDepoTecno(urlTecn,tecnologias,"salidaTecn","Tecnologia"); 
}


function cargarnoticias(){
  leernoticias();
  leerDeportes();
  leerTecnologia();
}

function mostrarDetalle(elid){
    document.getElementById(elid).style.display = '';
}
function ocultarDetalle(elid){
    document.getElementById(elid).style.display = 'none';
}