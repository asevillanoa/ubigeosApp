var obtieneDepartamentos = function (datosJson) {
	var departamentos = [];
	var linea = [];
	
	var departamento;
	var codDepartamento;
	var descDepartamento;

	for (var i=0; i<datosJson.length; i++){
		
		linea = datosJson[i].split('/');

		// Verifica 1er tramo de linea, lo cual corresponde a departamento
		if (linea[0] !== 'undefined') {
			if (linea[0].trim().length > 0) {
				
				departamento = linea[0].trim();

				codDepartamento = departamento.substring(0,departamento.indexOf(' '));
				descDepartamento = departamento.substring(departamento.indexOf(' ')+1);

				if (departamentos.length === 0){
					departamentos.push({codigo: codDepartamento, nombre: descDepartamento, codPadre: "", descPadre: ""});
				}else{
					// Verifica duplicado antes de agregar al arreglo de departamentos.
					if (!existeDuplicado(departamentos,codDepartamento)){
						departamentos.push({codigo: codDepartamento, nombre: descDepartamento, codPadre: "", descPadre: ""});
					}
				}
				
			}
		}
	}
	console.log(' >>> departamentos');
	console.log(departamentos);
	return departamentos;
};

var obtieneProvincias = function (datosJson) {
	var provincias = [];
	var linea = [];

	var provincia;
	var padre;
	var codProvincia;
	var descProvincia;
	var codPadre;
	var descPadre;

	for (var i=0; i<datosJson.length; i++){
		
		linea = datosJson[i].split('/');

		// Verifica 2do tramo de linea, lo cual corresponde a provincia
		if (linea[1] !== 'undefined') {
			if (linea[1].trim().length > 0) {

				provincia = linea[1].trim();
				padre = linea[0].trim();

				codProvincia = provincia.substring(0,provincia.indexOf(' '));
				descProvincia = provincia.substring(provincia.indexOf(' ')+1);
				
				codPadre = padre.substring(0,padre.indexOf(' '));
				descPadre = padre.substring(padre.indexOf(' ')+1);

				if (provincias.length === 0){
					provincias.push({codigo: codProvincia, nombre: descProvincia, codPadre: codPadre, descPadre: descPadre});
				}else{
					// Verifica duplicado antes de agregar al arreglo de provincias.
					if (!existeDuplicado(provincias,codProvincia)){
						provincias.push({codigo: codProvincia, nombre: descProvincia, codPadre: codPadre, descPadre: descPadre});
					}
				}
				
			}
		}
	}
	console.log(' >>> provincias');
	console.log(provincias);
	return provincias;
};

var obtieneDistritos = function (datosJson) {
	var distritos = [];
	var linea = [];

	var distrito;
	var padre;
	var codDistrito;
	var descDistrito;
	var codPadre;
	var descPadre;

	for (var i=0; i<datosJson.length; i++){
		
		linea = datosJson[i].split('/');

		// Verifica 3er tramo de linea, lo cual corresponde a distrito
		if (linea[2] !== 'undefined') {
			if (linea[2].trim().length > 0) {

				distrito = linea[2].trim();
				padre = linea[1].trim();

				codDistrito = distrito.substring(0,distrito.indexOf(' '));
				descDistrito = distrito.substring(distrito.indexOf(' ')+1);
				
				codPadre = padre.substring(0,padre.indexOf(' '));
				descPadre = padre.substring(padre.indexOf(' ')+1);

				if (distritos.length === 0){
					distritos.push({codigo: codDistrito, nombre: descDistrito, codPadre: codPadre, descPadre: descPadre});
				}else{
					// Verifica duplicado antes de agregar al arreglo de distritos.
					if (!existeDuplicado(distritos,codDistrito)){
						distritos.push({codigo: codDistrito, nombre: descDistrito, codPadre: codPadre, descPadre: descPadre});
					}
				}
				
			}
		}
	}
	console.log(' >>> distritos');
	console.log(distritos);
	return distritos;
};

function existeDuplicado(arrayObjetos,codigo){
	for (var i=0; i<arrayObjetos.length; i++){
		if (arrayObjetos[i]["codigo"] === codigo){
			return true;
		}
	}
	return false;
}

var retornaHtml = function (arregloObjetos){
	var html = '';
	for (var i=0; i<arregloObjetos.length; i++){
		html = html + '<tr><td>'+arregloObjetos[i]["codigo"]+'</td><td>'+arregloObjetos[i]["nombre"]+'</td><td>'+arregloObjetos[i]["codPadre"]+'</td><td>'+arregloObjetos[i]["descPadre"]+'</td></tr>';
	}
	return html;
};

exports.obtieneDepartamentos = obtieneDepartamentos;
exports.obtieneProvincias = obtieneProvincias;
exports.obtieneDistritos = obtieneDistritos;
exports.retornaHtml = retornaHtml;
