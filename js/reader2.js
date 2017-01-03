$(document).ready(function() {
    LeerPodcast("https://youarenotsosmart.libsyn.com/rss"); 

});

function EnviarUrl() {
    LeerPodcast(document.getElementById("podcast-url").value);
}

var idPodcast = 0;

function LeerPodcast(url) {
    // jQuery cross domain ajax
    $.get(url).done(function (data) {
        console.log(data);
    });

    // using XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
        console.log(xhr.responseText);
    };
    xhr.send();
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