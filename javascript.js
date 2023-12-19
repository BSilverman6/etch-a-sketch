

const boxes = document.querySelector(".boxes");
let setSize = document.querySelector(".setSize");
let getSize = document.querySelector("#sizeSlider");
let setSizeVal = document.querySelector("#sizeSliderValue");
let radios = document.querySelectorAll(`input[type="radio"]`)
const colorPicker = document.querySelector(`input[type="color"]`)
let colorStyle = "gradual";
let colorGoal = "rgb(255,0,0)";
createSketchBoxes(16);
addInk();


radios.forEach((item)=>{
    item.addEventListener("change", (event)=>{
        colorStyle = event.target.value;
        console.log(event.target.value);
        console.log (event.target.checked);
        console.log(radios[1].value);
        console.log(radios[1].checked);

    });
});

colorPicker.addEventListener("change", (event)=>{
    colorGoal = hexToRGBString(event.target.value);
});

function hexToRGBString(hex){
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return `rgb(${r},${g},${b})`

}

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

//Adds Mouselistener to Color on Event
function addInk() {
let boxArray = document.querySelectorAll(".box")
boxArray.forEach((item)=>{
    item.addEventListener("mouseenter", (event)=>{
        switch (colorStyle){
            case "gradual":
                colorGoal = "rgb(0,0,0)";
                event.target.style.backgroundColor=makeColor(event.target.style.backgroundColor)
                break;
            case "colorGradual":
                colorGoal = hexToRGBString(colorPicker.value);
                event.target.style.backgroundColor=makeColor(event.target.style.backgroundColor);
                break;
            case "bAndW":
                colorGoal = "rgb(0,0,0)";
                event.target.style.backgroundColor=colorGoal;
                break;
            case "random":
                event.target.style.backgroundColor=makeRandom();
                break;
            case "colorSolid":
                colorGoal = hexToRGBString(colorPicker.value);
                event.target.style.backgroundColor=colorGoal;
                break;
        };
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

//Color Related
function makeColor(rgb){
    const colorOld = rgbToArray(rgb);
    const colorGoalArray = rgbToArray(colorGoal);
    const colorModifier = getScale(colorGoal);
    const colorNew = [colorOld[0]-colorModifier[0],colorOld[1]-colorModifier[1],colorOld[2]-colorModifier[2],];
    if (colorNew[0]<colorGoalArray[0]&&colorNew[0]<colorOld[0]) {colorNew[0]= Math.min(colorGoalArray[0], colorOld[0])};
    if (colorNew[1]<colorGoalArray[1]&&colorNew[1]<colorOld[1]) {colorNew[1]= Math.min(colorGoalArray[1], colorOld[1])};
    if (colorNew[2]<colorGoalArray[2]&&colorNew[2]<colorOld[2]) {colorNew[2]= Math.min(colorGoalArray[2], colorOld[2])};
    return `rgb(${colorNew.toString()})`;
}
//This take RGB String. It Returns RGB Array of small Values to subtract
function getScale(rgbDarkString){
    let scale = rgbToArray(rgbDarkString);
    scale = scale.map((element)=> Math.floor((255-element)/10));
    return scale;
}

//RANDOM COLOR RELATED - returns random color for changing color
function makeRandom(){
    return `rgb(${randomRGB()},${randomRGB()},${randomRGB()})`
}
function randomRGB(){
    return Math.floor(Math.random()*256);
}
