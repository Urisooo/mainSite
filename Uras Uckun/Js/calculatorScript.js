const display = document.getElementById("display");

function append(value){
    display.value += value;
}

function clearDisplay(){
    display.value = "";
}

function backspace(){
    display.value = display.value.slice(0, -1);
}

function calculate(){

    try{
        display.value = eval(display.value);
    }

    catch{
        display.value = "Error";
    }

}

function squareRoot(){

    try{
        display.value = Math.sqrt(eval(display.value));
    }

    catch{
        display.value = "Error";
    }

}

function cubeRoot(){

    try{
        display.value = Math.cbrt(eval(display.value));
    }

    catch{
        display.value = "Error";
    }

}

function powerTwo(){

    try{

        let number = eval(display.value);

        display.value = Math.pow(number, 2);

    }

    catch{
        display.value = "Error";
    }

}

function sin(){

    try{

        display.value =
            Math.sin(eval(display.value) * Math.PI / 180);

    }

    catch{
        display.value = "Error";
    }

}

function cos(){

    try{

        display.value =
            Math.cos(eval(display.value) * Math.PI / 180);

    }

    catch{
        display.value = "Error";
    }

}

function tan(){

    try{

        display.value =
            Math.tan(eval(display.value) * Math.PI / 180);

    }

    catch{
        display.value = "Error";
    }

}

function log(){

    try{

        display.value = Math.log10(eval(display.value));

    }

    catch{
        display.value = "Error";
    }

}

function ln(){

    try{

        display.value = Math.log(eval(display.value));

    }

    catch{
        display.value = "Error";
    }

}

function factorial(){

    try{

        let n = eval(display.value);

        if(n < 0){

            display.value = "Error";
            return;

        }

        let result = 1;

        for(let i = 2; i <= n; i++){

            result *= i;

        }

        display.value = result;

    }

    catch{

        display.value = "Error";

    }

}

function pi(){
    display.value += Math.PI.toFixed(8);
}

function e(){
    display.value += Math.E.toFixed(8);
}