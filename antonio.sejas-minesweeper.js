/********************************************************           
*                Minesweeper                            *
*                                                       *
* Autor:  Antonio Sejas (antonio@sejas.es)              *
* Fecha: 2014.01.27                                     *
* Proposito:Resolver el reto                            *
*           http://www.beatmycode.com/challenge/3/show  *
*                                                       *
********************************************************/  


// Variable para TEST
// var entrada = "O O O O X O O O O O\n"+
// "X X O O O O O O X O\n"+
// "O O O O O O O O O O\n"+
// "O O O O O O O O O O\n"+
// "O O O O O X O O O O\n";


var entrada = "BMC_TEST_INPUT_MAGIC";

function MinasConstructor (entrada) {
    // Inicializamos la primera columna.
    this.entrada = entrada;
    this.minasResultado = {0:{}};
    this.columnas = 0;
    this.filas = 0;   

    this.init = function  () {
     // calcula el numero de elementos por columna
     this.columnas = this.encontrarColumnas(entrada);
     this.filas = this.encontrarFilas(entrada,this.columnas);   
    }
    // Busca la cantidad de elementos por Columna.
    this.encontrarColumnas = function  (entrada) {
        return Math.round(entrada.indexOf("\n")/2);
    };
    this.encontrarFilas = function  (entrada,ancho) {
        //Dividimos entre dos por los espacios en blanco.
        return entrada.length/2/ancho;
    };
    // Pasa del string de entrada a la matriz minasResultado
    // Para facilitar la logica del procesamiento
    this.transformar = function  () {
        var filai = 0;
        var columnai = 0;
        // Cambiamos de formato a array.
        for (var i = 0; i < this.entrada.length; i+=2) {
            if(columnai == this.columnas){
                // Hemos llegado al final de la columna.
                //Incrementamos la fila y creamos el siguiente objeto fila
                columnai = 0;
                filai ++;            
                this.minasResultado[filai] = {};
            }
            caracter =  entrada.charAt(i);
            this.minasResultado[filai][columnai++] = ("X" != caracter)?0:"X";
        };
    }
    this.procesar = function  () {
        // Una vez transformado a una matriz, lo recorremos e incrementamos facilmente.
        for (var i = 0; i < this.filas; i++) {
            for (var j = 0; j < this.columnas; j++) {
                if ("X" == this.minasResultado[i][j]){
                    this.incrementarVecinos(this.minasResultado,i,j);
                }
            };
        };
    }
    // Recorremos la matriz 3x3 con centro en i,j, incrementando en 1 a sus vecinos.
    this.incrementarVecinos = function  (unaMatriz,iElemento,jElemento) {
        for (var i = iElemento-1; i <= iElemento+1; i++) {
            for (var j = jElemento-1; j <= jElemento+1; j++) {
                //Sólo incrementamos si existe el elemento en la Matriz y si el elmento no es una mina ("X")
                if (typeof this.minasResultado[i] !== "undefined" && typeof this.minasResultado[i][j] !== "undefined") {
                    if ("X" != this.minasResultado[i][j]) {
                        this.minasResultado[i][j]++;
                    }
                }
            }         
        }
    };
    // devuelve el array en formato string
    this.mostrar = function  () {
        var cadena = '';
        // el ultimo elemento de cada fila lleva un salto en vez de blanco
        var espacio = ' '
        for (var i = 0; i < this.filas; i++) {
            for (var j = 0; j < this.columnas; j++) {
                espacio = (j == this.columnas-1)?"\n":" ";
                cadena += this.minasResultado[i][j]+espacio;
            };
        }
        return cadena;
    };

    //Inicializamos el objeto
    this.init();
}

var minas = new MinasConstructor(entrada);
minas.transformar();
minas.procesar();
// Mostramos por consola la matriz en formato String 
console.log(minas.mostrar());