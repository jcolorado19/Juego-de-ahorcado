var canvas, hombre, texto, b, mostar, j="";
var espacio, largo, pista, mostrarIntentos;

var fraseElegida = Math.floor(Math.random()* (5 - 0 + 1) + 0);
var bdFrases = ["Hola", "Amar", "Seguramente", "Carlos", "Colorado", "Televisor"];
var frase = bdFrases[fraseElegida];


//Declacarion de la clase Ahorcado
var Ahorcado = function(cont)
{
	this.contexto = cont;
	this.maximo = 5;
	this.intentos = 0;
	this.vivo = true;

	this.dibujar();

}

Ahorcado.prototype.dibujar = function()
{
	
	var dibujo = this.contexto;

	dibujo.beginPath();
	dibujo.moveTo(250, 150);
	dibujo.lineTo(250, 100);
	dibujo.lineTo(450, 100);
	dibujo.lineTo(450, 400);
	dibujo.lineWidth = 20;
	dibujo.strokeStyle = "#00DD00";
	dibujo.stroke();
	dibujo.closePath();

	if(this.intentos > 0)
	{
		// intentos = 1 --> Dibujar rostro
		dibujo.beginPath();
		dibujo.arc(250, 170, 20, 0, Math.PI * 2, false);
		dibujo.strokeStyle = "red";
		dibujo.lineWidth = 5;
		dibujo.stroke();
		dibujo.closePath();

		
		if(this.intentos > 1)
		{
			// intento = 2 --> Dibujar tronco
			dibujo.beginPath();
			dibujo.moveTo(250, 190);
			dibujo.lineTo(250, 260);
			dibujo.strokeStyle = "red";
			dibujo.stroke();
			dibujo.closePath();
			
			if(this.intentos > 2)
			{
				// intento = 3 --> Dibujar manos
				dibujo.beginPath();
				dibujo.moveTo(250, 190);
				dibujo.lineTo(220, 220);
				dibujo.moveTo(250, 190);
				dibujo.lineTo(280, 220);
				dibujo.strokeStyle = "red";
				dibujo.stroke();
				dibujo.closePath();

				if(this.intentos > 3)
				{
					// intento = 4 --> Dibujar pies
					dibujo.beginPath();
					dibujo.moveTo(250, 260);
					dibujo.lineTo(220, 290);
					dibujo.moveTo(250, 260);
					dibujo.lineTo(280, 290);
					dibujo.strokeStyle = "red";
					dibujo.stroke();
					dibujo.closePath();

					if(this.intentos > 4)
					{
						// intento = 5 --> Dibujar ojos muertos
						
						//Ojo izquierdo
						dibujo.beginPath();
						dibujo.moveTo(237, 165);
						dibujo.lineTo(245, 173);
						dibujo.moveTo(245, 165);
						dibujo.lineTo(237, 173);
						dibujo.strokeStyle = "blue";
						dibujo.stroke();
						dibujo.closePath();	

						//Ojo derecho
						dibujo.beginPath();
						dibujo.moveTo(255, 165);
						dibujo.lineTo(263, 173);
						dibujo.moveTo(263, 165);
						dibujo.lineTo(255, 173);
						dibujo.strokeStyle = "blue";
						dibujo.stroke();
						dibujo.closePath();	

					}
					
				}
				
			}

		}


	}
}

Ahorcado.prototype.trazar = function()
{
	this.intentos++;

	mostrarIntentos.value = this.maximo - this.intentos;

	if(this.intentos >= this.maximo)
	{
		this.vivo = false;
		alert("Lo sentimos has perdido");
	}

	this.dibujar();
}

function inicio()
{
	canvas = document.getElementById("campo");
	canvas.width = 500;
	canvas.height = 400;
	var contexto = canvas.getContext("2d");

	hombre = new Ahorcado(contexto);

	texto = document.getElementById("palabra");
	b = document.getElementById("digitar");
	mostrarIntentos = document.getElementById("cant_intentos");

	mostrarIntentos.value = hombre.maximo;
	
	frase = frase.toUpperCase();
	

	//Declaro un array con n de espacios de acuerdo al largo de la palabra escojida
	espacio = new Array(frase.length);

	//Agrego la función que se disparará al dar click en el botón
	b.addEventListener("click", adivina);

	mostrarPista(espacio);


}

function mostrarPista(espacio)
{
	pista = document.getElementById("mostrar_frase");
	var i, texto = "";
	largo = espacio.length;

	for(i = 0; i < largo; i++)
	{
		if(espacio[i] != undefined)
		{
			texto += espacio[i]+" ";
		}
		else
		{
			texto += "_ ";
		}
	}

	pista.innerHTML = texto;

}

function adivina()
{
	var letra = texto.value;

	if(texto.value.length == 1)
	{
		texto.value = "";

		mostrarPalabra(frase, hombre, letra);	
	}
	
}

function mostrarPalabra(frase, ahorcado, letra)
{
	var encontrado = false;
	var p;
	var bandera = 0;
	var verGanar = (largo * 2);

	letra = letra.toUpperCase();

	for(p in frase)
	{
		if(letra == frase[p])
		{
			espacio[p] = letra;
			encontrado = true;
		}
	}

	mostrarPista(espacio)

	if(encontrado == false)
	{
		ahorcado.trazar();
	}

	if(ahorcado.vivo == false)
	{
		texto="";

		for(i = 0; i < largo; i++)
		{
			texto += frase[i] + " ";
		}
		pista.innerHTML = texto;

		
	}

	for(i=0; i < largo; i++)
	{
		if(espacio[i] == undefined)
		{
			bandera = 1;
		}
		
	}

	if(bandera == 0)
	{
		alert("Felicitaciones acabas de ganar un moto");
		
		b.removeEventListener("click", adivina);
	}
}
