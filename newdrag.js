import { variables_list } from "./index.js";

function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    console.log(ev.target.id);
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var draggedelement = document.getElementById(data);
    var parent = document.getElementById("Canvas");
    var droppedonelementid = ev.target.id;
    var droppedonelement = document.getElementById(droppedonelementid);
    console.log("dropeed on element = "+ droppedonelementid);
    droppedparent = droppedonelement.parentNode;
    // hasclassblock = droppedonelement.classList.contains("Block");
    // console.log("has class = " + hasclassblockheader);
    if(data && droppedonelementid.includes("Block") || droppedonelementid.includes("text")){
      parent.removeChild(draggedelement);
      try {parent.insertBefore(draggedelement, droppedparent);}
      catch(error){
        parent.insertBefore(draggedelement, droppedonelement);
      }
    }
    else if(data && droppedonelementid.includes("block")){
      droppedonelement.insertAdjacentElement('beforeend' , draggedelement);
    }
    else if(droppedonelementid == "Delete"){
      var draggedelement_txtbox = document.getElementById("Var") ; 
      draggedelement.remove();
    }
    else{
    parent.appendChild(draggedelement);
  }
}