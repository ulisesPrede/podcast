$(document).ready(function() {
    LeerPodcast("https://youarenotsosmart.libsyn.com/rss");
    LeerPodcast("https://grumpyoldgeeks.libsyn.com/rss");
    LeerPodcast("https://thecyberwire.libsyn.com/rss");
    LeerPodcast("https://learntocodewithme.libsyn.com/rss");
    LeerPodcast("https://radiomotherboard.libsyn.com/rss");
    LeerPodcast("https://owltail.github.io/redrock/feed-bo-ts.xml");
    LeerPodcast("https://rss.acast.com/internetexplorer");
    LeerPodcast("https://eventualmillionaire.libsyn.com/rss");

});

function EnviarUrl() {
    LeerPodcast(document.getElementById("podcast-url").value);
}

var idPodcast = 0;

function LeerPodcast(url)
{
    $.ajax(url, {
        accepts:{
            xml:"application/rss+xml"
        },
        dataType:"xml",
        success:function(data) {

            var cont = 0;

            var album = ";"

            var canal = $(data).find("channel").first();

            $(data).find("image").each(function () { 
                var imagen = $(this);
                if (imagen.attr("href")!=null) { album = imagen.attr("href"); return; }
            });

            var codigo = "";
            codigo += "<h2>" + canal.find("title").first().text() + "</h2>" ;
            codigo += canal.find("summary").first().text();

            var div = document.createElement('div');
            div.id = "id"+idPodcast;
            div.className = "div-podcast";
            /*div.style.background = 'url('+ album +')';
            div.style.backgroundRepeat = "no-repeat";
            div.style.backgroundPosition = "right"; 
            div.style.backgroundAttachment = "fixed";
            div.style.backgroundSize = "contain";
            */div.style.cursor = 'pointer';

            div.onclick = function() {
                LeerItems(url,5);
            }
            document.getElementById('lateral-info').appendChild(div);
            div.innerHTML = codigo;


            // actualizar animacion
            /*
            var img = document.createElement('img');
            img.src = album;
            img.style.cursor = 'pointer';
            img.onclick = function() {
                div.scrollIntoView({ behavior: 'smooth' });
            }
            document.getElementById('lateral-lista').appendChild(img);
            */            
            document.getElementById('lateral-lista').innerHTML += '<a onClick="LeerItems(\''+url+'\',5,\''+album+'\')" href="#id'+idPodcast+'"><img src="'+album+'"></a>'
            AnimarScroll();

            idPodcast++;
            codigo = "";

        } ,
        error: function (request, textStatus, errorThrown) {
            alert("Intente con un RSS de podcast válido.");
        }  
    });

}

function LeerItems(url,limite,album)
{
    $.ajax(url, {
        accepts:{
            xml:"application/rss+xml"
        },
        dataType:"xml",
        success:function(data) {

            var codigo = '<ul class="list-group">';
            var cont = 0;

            codigo += '<li class="list-group-item" id="div-info">';
            var canal = $(data).find("channel").first();
            codigo += canal.find("title").first().text()+"<br>";
            codigo += canal.find("pubDate").first().text()+"<br>";
            var link = canal.find("docs").first().text();
            if (link!=null) {
                codigo += '<a href="'+link+'">'+link+"</a>";
            }
            codigo +="</li>";


            $(data).find("item").each(function () { if (cont>=limite) { return; } cont++;
                var item = $(this);

                codigo += '<li class="list-group-item">';

                var u = item.find("enclosure").attr("url");
                codigo += '<span class="badge"><button type="button" class="glyphicon glyphicon-play-circle" onclick="AgregarAudioHTML(\''+u+'\')"></button></span>'

                codigo += "<h4>" + item.find("title").text() + "</h4>" ;

                codigo += AgregarDescarga(u);

                codigo +="</li>";

            });
                
            document.getElementById("lateral-album").innerHTML = codigo+"</ul>";

        } ,
        error: function (request, textStatus, errorThrown) {
            alert("Intente con un RSS de podcast válido.");
        }  
    });
}

function AgregarDescarga(url) {
    return '<a class="link-descarga" href="'+url+'"><span class="badge">Descargar mp3</span></a>'
}

var audioElement = null;

function AgregarAudioHTML(url) {
    var ap = document.getElementById("audio-player");
    document.getElementById("audio-src").src = url;
    ap.load();
    ap.play();
}

function AnimarScroll(url,limite) {
   $('a[href*="#"]:not([href="#"])').click(function() {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        if (target.length) {
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;
        }
      }
    });
}