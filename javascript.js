

const boxes = document.querySelector(".boxes");
createSketchBoxes(16);
addInk();
let setSize = document.querySelector(".setSize");
let getSize = document.querySelector("#sizeSlider");
let setSizeVal = document.querySelector("#sizeSliderValue");


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

//Adds Mouselistener to Darken on Event
function addInk() {
let boxArray = document.querySelectorAll(".box")
boxArray.forEach((item)=>{
    item.addEventListener("mouseenter", (event)=>{
        event.target.style.backgroundColor=getDarker(event.target.style.backgroundColor);
        event.target.style.borderColor = event.target.style.backgroundColor;
    });
});
};

//Takes RGB Values, parses them into 3 numbers. Calls reduce function to alter these values
function getDarker(rgb) {
    let stringRGB = String(rgb);
    if(rgb==""){ stringRGB = "rgb(255,255,255)"};
    //initialize value for getting color!
    const pieces = stringRGB.split("(",);
    const pieces2 = pieces[1].split(",");
    const pieces3 = pieces2.map((element) => reduceRGB(element));
    stringRGB = `rgb(${pieces3[0]},${pieces3[1]},${pieces3[2]})`
    return stringRGB ;
};

function reduceRGB(x){
    let rGBVal= parseInt(x)-25;
    return rGBVal<0 ?0: rGBVal;
};