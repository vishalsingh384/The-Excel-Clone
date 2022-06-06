let rows=100;
let cols=26;//A-Z

let addressColCont=document.querySelector(".address-col-cont");//1,2,3,4.....
let addressRowCont=document.querySelector(".address-row-cont");//A,B,C,D.....
let cellsCont=document.querySelector(".cells-cont");
let addressBar=document.querySelector(".address-bar");
for(let i=0;i<rows;i++){
    let addressCol=document.createElement("div");
    addressCol.setAttribute("class","address-col");
    addressCol.innerText=i+1;
    addressColCont.appendChild(addressCol);
}

for(let i=0;i<cols;i++){
    let addressRow=document.createElement("div");
    addressRow.setAttribute("class","address-row");
    addressRow.innerText=String.fromCharCode(65+i);
    addressRowCont.appendChild(addressRow);
}

for(let i=0;i<rows;i++){
    let rowCont=document.createElement("div");
    rowCont.setAttribute("class","row-cont");
    for(let j=0;j<cols;j++){
        let cell=document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable","true");
        rowCont.appendChild(cell);
        addressbarDisplay(cell,i,j);
    }
    cellsCont.appendChild(rowCont);
}

function addressbarDisplay(cell,i,j){
    cell.addEventListener("click",(e)=>{//arrow function-> function(e){}
        let coldID=String.fromCharCode(65+j);
        let rowId=i+1;
        addressBar.value=`${coldID}${rowId}`;
    })
}
