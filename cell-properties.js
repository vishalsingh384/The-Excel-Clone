//Storage
let sheetDB=[];

for(let i=0;i<rows;i++){
    let sheetRow=[];
    for(let j=0;j<cols;j++){
        let cellProp={
            bold:false,
            italic:false,
            underline:false,
            alignment:"left",
            fontFamily:"monospace",
            fontSize:"14",
            fontColor:"#000000",
            BGcolor:"#000000",
            fontColorProperty:"#000000",
            BGcolorProperty:"#000000"
        };
        sheetRow.push(cellProp);    
    }
    sheetDB.push(sheetRow);
}

let bold = document.querySelector(".bold");
let italic = document.querySelector(".italic");
let underline = document.querySelector(".underline");
let fontSize = document.querySelector(".font-size-prop");
let fontFamily = document.querySelector(".font-family-prop");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let alignment = document.querySelectorAll(".alignment");//NodeList
let leftAlign=alignment[0];
let centerAlign=alignment[1];
let rightAlign=alignment[2];
let fontColorProp=document.querySelector(".fontColorProperty");
let bgColorProp=document.querySelector(".bgColorProperty");


let activeColorProp="#d1d8e0";
let inactiveColorProp="#ecf0f1";

bold.addEventListener("click", (e)=>{
    let address=addressBar.value;
    let[cell,cellProp]=getCellandCellProp(address);

    //Modification
    cellProp.bold=!cellProp.bold;//Storage data change
    cell.style.fontWeight=cellProp.bold?"bold":"normal";
    bold.style.backgroundColor=cellProp.bold?activeColorProp : inactiveColorProp;
});
italic.addEventListener("click", (e)=>{
    let address=addressBar.value;
    let[cell,cellProp]=getCellandCellProp(address);

    //Modification
    cellProp.italic=!cellProp.italic;//Storage data change
    cell.style.fontStyle=cellProp.italic?"italic":"normal";
    italic.style.backgroundColor=cellProp.italic?activeColorProp : inactiveColorProp;
});
underline.addEventListener("click", (e)=>{
    let address=addressBar.value;
    let[cell,cellProp]=getCellandCellProp(address);

    //Modification
    cellProp.underline=!cellProp.underline;//Storage data change
    cell.style.textDecoration=cellProp.underline?"underline":"none";
    underline.style.backgroundColor=cellProp.underline?activeColorProp : inactiveColorProp;
});
fontSize.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let[cell,cellProp]=getCellandCellProp(address);

    cellProp.fontSize=fontSize.value;
    cell.style.fontSize=cellProp.fontSize+"px";
    fontSize.value=cellProp.fontSize;
});
fontFamily.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let[cell,cellProp]=getCellandCellProp(address);

    cellProp.fontFamily=fontFamily.value;
    cell.style.fontFamily=cellProp.fontFamily;
    fontFamily.value=cellProp.fontFamily;
});
fontColor.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let[cell,cellProp]=getCellandCellProp(address);


    cellProp.fontColor=fontColor.value;
    cell.style.color=cellProp.fontColor;
    fontColor.value=cellProp.fontColor;
});
BGcolor.addEventListener("change",(e)=>{
    let address=addressBar.value;
    let[cell,cellProp]=getCellandCellProp(address);

    cellProp.BGcolor=BGcolor.value;
    cell.style.backgroundColor=cellProp.BGcolor;
    BGcolor.value=cellProp.BGcolor;
});
alignment.forEach((alignElem)=>{
    alignElem.addEventListener("click",(e)=>{
        let address=addressBar.value;
        let[cell,cellProp]=getCellandCellProp(address);

        let alignValue=e.target.classList[0];
        cellProp.alignment=alignValue;
        cell.style.textAlign=alignValue;

        switch(alignValue){
            case "left":
                leftAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;        
        }
    })
});

let allCells=document.querySelectorAll(".cell");
for(let i=0;i<allCells.length;i++){
    addListenerToAttachCellProperties(allCells[i]);
}

function addListenerToAttachCellProperties(cell){
    cell.addEventListener("click",(e)=>{
        let address=addressBar.value;
        let [rid,cid]=decodeRIDCIDFromAddress(address);
        let cellProp=sheetDB[rid][cid];

        //cell properties
        cell.style.fontWeight=cellProp.bold?"bold":"normal";
        cell.style.fontStyle=cellProp.italic?"italic":"normal";
        cell.style.textDecoration=cellProp.underline?"underline":"none";
        cell.style.fontSize=cellProp.fontSize+"px";
        cell.style.fontFamily=cellProp.fontFamily;
        cell.style.color=cellProp.fontColor;
        cell.style.backgroundColor=cellProp.BGcolor==="#000000"?"transparent":cellProp.BGcolor;
        cell.style.textAlign=cellProp.alignment;

        //Apply properties in UI container
        bold.style.backgroundColor=cellProp.bold?activeColorProp : inactiveColorProp;
        italic.style.backgroundColor=cellProp.italic?activeColorProp : inactiveColorProp;
        underline.style.backgroundColor=cellProp.underline?activeColorProp : inactiveColorProp;
        fontFamily.value=cellProp.fontFamily;
        fontSize.value=cellProp.fontSize;
        fontColor.value=cellProp.fontColor;
        BGcolor.value=cellProp.BGcolor;
        fontColorProp.style.color=cellProp.fontColor;
        bgColorProp.style.color=cellProp.BGcolor;
        switch(cellProp.alignment){
            case "left":
                leftAlign.style.backgroundColor=activeColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "center":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=activeColorProp;
                rightAlign.style.backgroundColor=inactiveColorProp;
                break;
            case "right":
                leftAlign.style.backgroundColor=inactiveColorProp;
                centerAlign.style.backgroundColor=inactiveColorProp;
                rightAlign.style.backgroundColor=activeColorProp;
                break;        
        }
    })
}

function getCellandCellProp(address){
    let[rid,cid]=decodeRIDCIDFromAddress(address);
    //Access cell and storage object
    let cell=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    let cellProp=sheetDB[rid][cid];
    return [cell,cellProp];//Array destructuring
}
function decodeRIDCIDFromAddress(address){
    //address->A1,B2....etc
    let rid=Number(address.slice(1))-1;//"1" -> 0
    let cid=(address.charCodeAt(0))-65;//"A" -> 65
    return [rid,cid];
}




