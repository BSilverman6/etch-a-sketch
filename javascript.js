

const boxes = document.querySelector(".boxes");
createSketchBoxes(16);
addInk();
let setSize = document.querySelector(".setSize");
let getSize = document.querySelector("#sizeSlider");
let setSizeVal = document.querySelector("#sizeSliderValue");
let colorGoal = "rgb(0,0,0)";






//creates an array of sketchboxes in the "Boxes Div"
function createSketchBoxes (x){
    let k=1;
    for (i=0; i<x; i++){
        const row = document.createElement("div");
        row.classList.add("row");
        row.id = `row${i+1}`;
        for (j=0; j<x;j++){
            const box = document.createElement("div");
            box.classList.add("box");
            box.id=`box${k}`; k++;
            row.appendChild(box);
        }
        boxes.appendChild(row);
    }
};

//Adds Mouselistener to Color on Event
function addInk() {
let boxArray = document.querySelectorAll(".box")
boxArray.forEach((item)=>{
    item.addEventListener("mouseenter", (event)=>{
       // event.target.style.backgroundColor=makeDarker(event.target.style.backgroundColor);
        event.target.style.backgroundColor=makeColor(event.target.style.backgroundColor)
        event.target.style.borderColor = event.target.style.backgroundColor;
    });
});
};


//takes a String of RGB(#,#,#) and turns it into an array [#,#,#]
function rgbToArray(rgbString){
    let string = rgbString.toString();
    if(rgbString==""){ string = "rgb(255,255,255)"};
    //initialize value for getting color!
    const pieces = string.split("(");
    let pieces2 = pieces[1].split(",");
    pieces2 = pieces2.map((element)=>parseInt(element));
    return pieces2;
    
}

//Takes RGB Values, parses them into 3 numbers. Calls reduceRGB function to alter these values
function makeDarker(rgb) {
    let rgbArray = rgbToArray(rgb)
    rgbArray = rgbArray.map((element) => reduceRGB(element));
    return `rgb(${rgbArray[0]},${rgbArray[1]},${rgbArray[2]})`
};
function reduceRGB(x){
    let rGBVal= x-25;
    return rGBVal<0 ?0: rGBVal;
};




function makeColor(rgb){
    const colorOld = rgbToArray(rgb);
    const colorGoalArray = rgbToArray(colorGoal);
    const colorModifier = getScale(colorGoal);
    const colorNew = [colorOld[0]-colorModifier[0],colorOld[1]-colorModifier[1],colorOld[2]-colorModifier[2],];
    if (colorNew[0]<colorGoalArray[0]||colorNew[1]<colorGoalArray[1]||colorNew[2]<colorGoalArray[2]){return colorGoal};
    return `rgb(${colorNew.toString()})`;
}
//This take RGB String. It Returns RGB Array of small Values to subtract
function getScale(rgbDarkString){
    let scale = rgbToArray(rgbDarkString);
    scale = scale.map((element)=> Math.floor((255-element)/10));
    return scale;
}

//Returns Color Black for changing color
function makeBlack(){
    return "rgb(0,0,0)";
}


//RANDOM COLOR RELATED - returns random color for changing color
function makeRandom(){
    return `rgb(${randomRGB()},${randomRGB()},${randomRGB()})`
}
function randomRGB(){
    return Math.floor(Math.random()*256);
}






setSize.addEventListener("click", ()=> {
    while (boxes.firstChild){
        boxes.removeChild(boxes.firstChild);
    };
    createSketchBoxes(getSize.value);
    addInk();
});
getSize.oninput = function(){ 
    setSizeVal.innerHTML = this.value;
};