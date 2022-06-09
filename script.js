let res = ['_','_','_','_','_','_','_','_','_'];
let quantity = localStorage.getItem('quantity');
let name = localStorage.getItem("alias");
let combinations = true;
var aux;
var id = 0;

function start(){
    recovername();
    display = document.getElementById("display");
    let width = document.getElementsByClassName('quiniela')[0].offsetWidth;
    document.getElementById("quiniela").style.height = width*0.9375 + "px";
    let container = document.getElementById("text");
    container.innerHTML = res.join("\xa0\xa0");
    if (quantity)
        document.querySelector('.botonenviar span').textContent = quantity;
    let results = localStorage.getItem("results");
    if (results){
        results = results.split("*");
        for (var i = 0; i < quantity; i++){
            if (results[i] && results[i] != undefined){

                let fila = display.insertRow(i);

                if (results[i].split("\xa0\xa0")[0][0]!="L" && results[i].split("\xa0\xa0")[0][0]!="E" && results[i].split("\xa0\xa0")[0][0]!="V")
                	results[i] = results[i].slice(1);

			    for (var j =0; j < 9; j++) {
			    	cell1 = fila.insertCell(j)
			    	cell1.innerHTML += results[i].split("\xa0\xa0")[j];
			    	cell1.style.width = "7%";
			    	if (results[i].split("\xa0\xa0")[j].length == 2)
			    		cell1.style.fontSize = "small";
			    	if (results[i].split("\xa0\xa0")[j].length == 3)
			    		cell1.style.fontSize = "x-small";
			    }

			  	let cell2 = fila.insertCell(9);
			  	cell2.innerHTML += "<pre>" +results[i].split("\xa0\xa0")[9] + "</pre>";
			  	cell2.style.fontSize = "small";
			  	cell2.style.overflow = "hidden";
			  	cell2.style.overflowY = "hidden";
			  	cell2.style.border = "none";
			  	cell2.className = "cellname";
			  	cell2.scrollTo(80,0);

			  	if(results[i].split("\xa0\xa0")[9].length > 15)
			  		cell2.style.fontSize = "xx-small";
			  	else if(results[i].split("\xa0\xa0")[9].length > 10)
			  		cell2.style.fontSize = "x-small";

			  	let cell3 = fila.insertCell(10);
			  	cell3.innerHTML += "<img src=\"borrar.png\" width=\"75%\">";
			  	cell3.style.width = "7%";
			  	cell3.style.border = "none";
			  	cell3.id = "x" + i;
                		cell3.className = "deleter"
			  	cell3.addEventListener('click', function(){remove(this);  this.replaceWith(this.cloneNode(true));});
			} 
            else
                break;
        }
        id = i;
    document.getElementById("total").innerHTML = "Total: $" + quantity*10 +"\n";
	}  
}
function updatedisplay(modo){
    let display = document.getElementById("display");
    let lastIndex = display.getElementsByTagName("tr").length;

    if (modo == 1){
        if (aux == undefined)
            aux=0;
        
        let fila = display.insertRow(lastIndex);

        for (var j =0; j < 9; j++) {
        	cell1 = fila.insertCell(j)
        	cell1.innerHTML += res[j];
        	cell1.style.width = "7%";
        	if (res[j].length == 2)
        		cell1.style.fontSize = "small";
        	if (res[j].length == 3)
        		cell1.style.fontSize = "x-small";
        }

        if (aux>1){
    		var cellname = fila.insertCell(9);
    		cellname.innerHTML += name;}
    	else{
    		var cellname = fila.insertCell(9);
    		cellname.innerHTML += name;}

      	cellname.style.fontSize = "small";
      	cellname.style.overflow = "hidden";
      	cellname.style.overflowY = "hidden";
      	cellname.style.border = "none";
      	cellname.className = "cellname";
      	cellname.scrollTo(80,0);

    	if(name.length > 15)
      		cellname.style.fontSize = "xx-small";
      	else if(name.length > 10)
      		cellname.style.fontSize = "x-small";

    	let cell3 = fila.insertCell(10);
      	cell3.innerHTML += "<img src=\"img/borrar.png\" width=\"75%\">";
      	cell3.style.width = "7%";
      	cell3.style.border = "none";
      	cell3.id = "x" + id;
        cell3.className = "deleter";
      	cell3.addEventListener('click', function(){remove(this); this.replaceWith(this.cloneNode(true));});
      	id++;
        aux = 1;
    }
    else if (modo == 2){
        id = 0;
        deleters = display.getElementsByClassName("deleter");
        for (var i = 0; i < lastIndex ;i++) {
            deleters[i].id = "x" + id;
            id++;
        }
    }
    document.getElementById("total").innerHTML = "Total: $" + quantity*10;
}
function selection(element){ 	//Pinta la casilla y actualiza el texto de la quiniela.
    let index = parseInt(element.id.slice(1)) - 1;
    let container = document.getElementById("text");
    if (!element.style.backgroundColor){
        if (!combinations){
            validation(element);
            res[index] = element.id.slice(0,1);
            }
        else{
            res[index] += element.id.slice(0,1);
            res[index] = res[index].split('_').join('');
        }
        element.style.backgroundColor = "#2E2E2E";
    }
    else{
        if(combinations){
        element.style.backgroundColor = "";
        console.log(res[index].length);
        if (res[index] != "_" && res[index].length>1)
            res[index] = res[index].split(element.id.slice(0,1)).join('');
        else    
            res[index] = "_";
        }
    }
    costoactual();
    container.innerHTML = res.join("\xa0\xa0");
}
function validation(element){	 //Despinta todas las casillas y asigna el index con el número de la casilla seleccionada.
    let index = parseInt(element.id.slice(1));
    document.getElementById("L"+index).style.backgroundColor = null;
    document.getElementById("E"+index).style.backgroundColor = null;
    document.getElementById("V"+index).style.backgroundColor = null;
}
function number(){ 				//Actualiza el número del boton "Enviar"
    quantity = localStorage.getItem("quantity");
    if (quantity)
        localStorage.setItem('quantity', ++quantity);
    else{
        localStorage.setItem('quantity', 1);
        quantity = localStorage.getItem("quantity");}
    document.querySelector('.botonenviar span').textContent = quantity;
    localStorage.setItem('alias', name);
}
function result(){ 	//Actualiza el localstorage cuando se añade una nueva quiniela
    results = localStorage.getItem("results");
    name = document.getElementById("nombre").value;
    name  = name.split('*').join('');
    if (results){
        if (aux > 1)
        localStorage.setItem('results', results + "\n" + res.join("\xa0\xa0") + "\xa0\xa0" + name + "*");
        else
            localStorage.setItem('results', results + "\n" + res.join("\xa0\xa0") + "\xa0\xa0" + name + "*");
    }
    else
    {
        if (aux > 1)
        localStorage.setItem('results',res.join("\xa0\xa0") + "\xa0\xa0" + name + "*");
        else    
            localStorage.setItem('results',res.join("\xa0\xa0") + "\xa0\xa0" + name + "*");
    }       
}
function save(){				//Se añade la quiniela actual a la lista 
	if(id < 150){
	    name = document.getElementById("nombre").value;
	    if (res.join("\xa0\xa0").includes("_"))
	        alert("Debes llenar todas las casillas");
	    else if (!name){
	        alert("Debes elegir un nombre");
	        document.getElementById("nombre").focus();
	        return 0;}
	    else{
	        if (combinations)
	            calculate();
	        else
                number();
                result();
                updatedisplay(1);
                clean();
            }
    }
    else
    	alert("Envía tus quinielas registradas antes de capturar más.");
}
function clean(){				//Boton para limpiar la quinela
    res = ['_','_','_','_','_','_','_','_','_']
    let container = document.getElementById("text");
    container.innerHTML = res.join("\xa0\xa0");
    spans = document.querySelectorAll(".quiniela span");
    for (var i=0; i<27;i++)
        spans[i].style.backgroundColor = "";
    document.getElementById("costo").innerHTML = "Costo: $0";
    document.getElementById("numquinielas").innerHTML = "0 Quiniela(s)";
}
//UPDATEDISPLAY
function recovername(){
    name = localStorage.getItem("alias");
    if (name !=  null && name !="null")
        document.getElementById("nombre").value = name;
}
function clearname(){
    document.getElementById("nombre").value = "";
}
function allowcombination(){
    if (!combinations) 
    {
        combinations = true; /*confirm("¿Desea registrar quinielas multiples?");*/
        document.getElementById("checkcombinaciones").style.backgroundColor = "rgb(0,117,255)";
        document.getElementById("checkcombinaciones").style.border = "black solid 1px";
        document.getElementById("checkcombinaciones").style.color = "white";
    }
    else
    {
        combinations= false;
        document.getElementById("checkcombinaciones").style.backgroundColor = "rgb(255,255,255,0.35)";
        document.getElementById("checkcombinaciones").style.border = "#777777 solid 1px";
        document.getElementById("checkcombinaciones").style.color = "#777777";
        clean();
    }
}
function calculate(){
    aux = 1;
    for (var i=0;i<9;i++){
        aux*= res[i].length;
    }
    quantity = localStorage.getItem("quantity");
    if (quantity){
        localStorage.setItem('quantity', parseInt(quantity)+aux);
        quantity = localStorage.getItem('quantity');}
    else{
        localStorage.setItem('quantity', aux);
        quantity = localStorage.getItem("quantity");}
    document.querySelector('.botonenviar span').textContent = quantity;
    localStorage.setItem('alias', name);
}
function random(){
    clean();
    let container = document.getElementById("text");
    let partidos = document.getElementsByClassName("partido");
    for (var i = 0; i < 9; i++){
        var r = getRandomInt(0,2);
        partidos[i].getElementsByTagName("span")[r].style.backgroundColor = "#017d08";
        res[i] = ["L","E","V"][r];
    }
    container.innerHTML = res.join("\xa0\xa0");
    costoactual();
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function costoactual(){
    if (true){
        let aux2 = 1;
        for (var i=0;i<9;i++){
             aux2*= res[i].length;
        }
        document.getElementById("costo").innerHTML = "Costo: $" + aux2*10;
        document.getElementById("numquinielas").innerHTML = aux2 + " Quiniela(s)"
    }
}
function remove(e){
	display = document.getElementById("display");
	eindex = e.id.slice(1);
	tr = display.getElementsByTagName("tr")[eindex];
	display.deleteRow(eindex);
    results = localStorage.getItem("results");
    results = results.split("*");
	removing = results[eindex].split("\xa0\xa0");
	if (removing[0][0]!="L" && removing[0][0]!="E" && removing[0][0]!="V")
        removing[0] = removing[0].slice(1);
	let aux3 = 1;
    for (var i=0;i<9;i++)
        aux3*= removing[i].length;
    quantity -= aux3;
    localStorage.setItem("quantity",quantity);
	results.splice(eindex,1);
    results = results.join("*");
    localStorage.setItem("results",results);
    document.querySelector('.botonenviar span').textContent = quantity;
    document.getElementById("total").innerHTML = "Total: $" + quantity*10 +"\n";
    updatedisplay(2);
}
function removeLastLine(){
    if(resultsx.lastIndexOf("\n")>0) {
        return resultsx.substring(0, resultsx.lastIndexOf("\n"));
    } else {
        return resultsx;
    }
}
function deleteall(){
    if(confirm("Se borrará todo."))
        {localStorage.setItem("quantity","");
        localStorage.setItem("results","");
        localStorage.setItem("alias","");
        location.reload();}
}
function send(){ //Envía quiniela al whatsapp
    if (!quantity || quantity < 1)
        save();
    if (quantity > 0){
    let whatsapptext = res.join("%20%20")
    const ganagol = "*Quiniela GanaGol*%0A%0A";
    whatsapptext = encodeURI(localStorage.getItem("results"));
    whatsapptext = whatsapptext.split('*').join('%0D').replace(/#/g,"");
    window.location.href = "https://wa.me/524776494400?text=" + ganagol + whatsapptext;}
}
window.addEventListener("load",start,false);
