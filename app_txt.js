var http = require("http");
var fs = require("fs");
var util = require("./ubigeos-util");

var departamentos = [];
var provincias = [];
var distritos = [];

http.createServer(function (request, response) {
   
   // Setea Status Code y tipo de contenido a la respuesta
   response.writeHead(200, {'Content-Type': 'text/html'});   

   fs.readFile('./ubigeos.txt',function(err,data){
   		if(err){
				console.log(err);
				response.end('Server Error');
			}else{
				//Guardando lineas del texto en un arreglo
				var datos = data.toString().split('\n');
				//Eliminando caracteres innecesarios: “ ”\r
				for (var i=0; i<datos.length; i++){
					datos[i] = datos[i].replace(/[“”\r]/g,'');
				}
				
				console.log(datos);
				departamentos = util.obtieneDepartamentos(datos);
				provincias = util.obtieneProvincias(datos);
				distritos = util.obtieneDistritos(datos);

				fs.readFile('./index.html',function(err,html){
					if(err){
						console.error(err);
						response.end('Server Error');
					} else{
						var tmpl = html.toString();
						// Uniendo los elementos del arreglo con JOIN y agregando al HTML
						var finalHtml = tmpl.replace('%data%',datos.join('</li><li>'));
						finalHtml = finalHtml.replace('%dep%',util.retornaHtml(departamentos));
						finalHtml = finalHtml.replace('%prov%',util.retornaHtml(provincias));
						finalHtml = finalHtml.replace('%dist%',util.retornaHtml(distritos));

						response.write(finalHtml);
						response.end();
					}
				});

			}
   });
   
}).listen(8080);

console.log('Servidor ejecutando http://127.0.0.1:8080/');