# Podcast Player

Podcast Player usando Silverlight y JS

## ¿Qué es Podcast Player?

Podcast Player es un reproductor de podcast que permite añadir a la lista de canales un sitio por medio de un link del RSS del canal. Una vez hecho esto es posible elegir entre los canales añadidos y los capítulos del canal elegido.

## ¿Cómo funciona Podcast Player?

Hay dos versiones del reproductor, la versión desarrollada en **Silverlight** y la versión sobre código HTML y **Javascript**. Dentro del index se encuentra un menú para elegir entre las dos opciones, cada una de las cuales funciona ligeramente diferente de la otra.
![Alt text](/docs/sc01_index.jpg?raw=true "Index Menu")

### Podcast Player Silverlight
![Alt text](/docs/sc03_slmain.jpg?raw=true "Podcast Player Silverlight")
La versión desarrollada en **Silverlight** contiene listas tanto de los podcast agregados, como de los episodios, además al seleccionar el podcast se puede visualizar el resumen del podcast. Por ahora el software solo permite descargar el podcast y **NO** reproducirlo en la página

#### Importante
Silverlight no funciona en versiones posteriores de Chrome 42+ : [Leer el reporte](https://support.microsoft.com/en-us/kb/3058254)
Tampoco es soportado por Edge.


### Podcast Player Html y Javascript
![Alt text](/docs/sc04_jsmain.jpg?raw=true "Podcast Player Javascript")
La versión desarrollada con **Javascript** contiene dos paneles principales, una barra de navegación, un reproductor de audio.
En el panel derecho aparecen los podcast agregados, estos pueden ser seleccionados a partir de la barra de navegación. Cuando eliges el podcast se muestra info dentro del panel izquierdo, además los últimos episodios del podcast, puedes escucharlos en el reproductor.

## Desarrollo
#### Bocetos(Wireframe)
<img src="/docs/Boceto_00.jpg" alt="en Chrome" height="400px"/>
<img src="/docs/Boceto_01.jpg" alt="en Chrome" height="400px"/>

## Test
#### Screenshot en Chrome
<img src="/docs/sc05_testChrome.jpg" alt="en Chrome" width="400px"/>
#### Screenshot en Firefox
<img src="/docs/sc05_testFirefox.jpg" alt="en Firefox" width="400px"/>
#### Screenshot en Edge
<img src="/docs/sc05_testEdge.jpg" alt="en Edge" width="400px"/>
#### Screenshot en IExplorer
<img src="/docs/sc05_testIExplorer.jpg" alt="en IExplorer" width="400px"/>
#### Screenshot en GalaxyS5
<img src="/docs/galaxyS5Test.png" alt="en GalaxyS5" height="400px"/>
#### Screenshot en Nokia Windows Mobile
<img src="/docs/wp_ss_20161227_0003.png" alt="en Nokia Windows Mobile" height="400px"/>
