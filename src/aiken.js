var vm = new Vue({
	el: '#app',
	data: {
		contenido: '',
		preguntas: [],
		actual: [],
		index: -1
	},
	created: function () {
		this.nueva_pregunta();
	},
	methods: {
		nueva_pregunta: function() {
			var textEjemplo = "Ejemplo Pregunta #" + (this.preguntas.length + 1)
				 + "\nA. Opcion 1\nB. Opcion dos";
			this.preguntas.push(textEjemplo);
			this.index = this.preguntas.length - 1;
		},
/**
 * Se encarga de generar el archivo:
 **/
		renderFile: function() {
			return this.preguntas.join('\n\n');
		},
/**
 * Agrega una nueva linea del tipo opcion, por ejemplo, para
 *  esto convierte el indice con el código ascii:
 * A.
 * B.
 **/
		addLine: function() {
			var lastOptIndex = this.pregunta.options.length;
			this.contenido += String.fromCharCode(65 + lastOptIndex) + ". ";
		},
/**
 * Extrae de una linea tipo opción, el indice por ejemplo:
 * A.-ssssss        Extrae A
 * B. asfsafasf     Extrae B
 **/
		indexOpt: function(lineOption) {
			return lineOption.toUpperCase().split(/\.|\)/)[0];
		},
		renderPregunta2Aiken: function() {
			var answer = "";
			var lines = [];
			lines.push(this.pregunta.title);
			for (i = 0; i<this.pregunta.options.length; i++) {
				var optText = this.pregunta.options[i].text;
				lines.push(optText);
				if (this.pregunta.options[i].correct) {
					var indexOption = this.indexOpt(optText);
					var answer = "ANSWER: " + indexOption;
				}
			}
			if (answer.length > 0) {
				lines.push(answer);
			}
			this.contenido = lines.join('\n'); 
		},
		set_correct: function(_i) {
			for(i = 0; i<this.pregunta.options.length; i++) {
				this.pregunta.options[i].correct = false;
			}
			this.pregunta.options[_i].correct = true;
			this.renderPregunta2Aiken();
		}
	}, //end method
	computed: {
		lineas: function() {
			return this.contenido.split(/\r\n|\r|\n/);
		},
		num_lineas: function() {
			return this.lineas.length;
		},
		pregunta: function() {
			var result = {title: '', options: []};
			for(i = 0; i<this.num_lineas; i++) {
				var line = $.trim(this.lineas[i]);
				if (line.length == 0) { continue;}
				if (result.title == '') {
					result.title = line;
					continue;
				}
				if (line.indexOf('ANSWER') === 0) {
					var parts = line.split(':');
					if (parts.length == 2) {
						var correct  = $.trim(parts[1]).toLowerCase();
						console.log('[' + correct+ ']');
						for (j = 0; j<result.options.length; j++) {
							var textOpt = result.options[j].text.toLowerCase();
							var option_index = textOpt.split(/\.|\)/)[0];
							console.log('[' + option_index + ']');
							if (option_index == correct) {
								result.options[j].correct = true;
							}
						}
					}
					break;
				}
				result.options.push({text: line, correct: false});
			}
			return result;
		},
		paginas: function() {
			var pags = [];
			var dec = Math.floor(this.index/10);
			var inicio = dec*10;
			var final = inicio + 10;
			if (final > this.preguntas.length) {
				final = this.preguntas.length;
			}
			for(var i= inicio; i<final; i++) {
				pags.push(i);
			}
			return pags;
		}
	},
	watch: {
		index: function(n) {
			this.contenido = this.preguntas[n];
		}
	}
});
