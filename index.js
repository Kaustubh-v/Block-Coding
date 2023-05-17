import { Printstmt, prln } from "./language.js";
const myButton = document.getElementById("run");
myButton.addEventListener("click", function(){Runprog()});
	
const myButton1 = document.getElementById("print");
myButton1.addEventListener("click", function(){CreateBlock()});

var orderofelmnts = [];
// const canvas = document.getElementById("Canvas");
// canvas.addEventListener("mousedown" , function(event){
//     const block =  event.target.closest(".Blockheader");
//     console.log("im here");
//     if(block){
//       dragElement(block);
//       console.log("function called here");
//     }
// });
// var canvas = document.getElementById("Canvas");
// canvas.addEventListener("mouseover" , function(event){
//   console.log("first here");
//   var blocks = document.querySelectorAll('.Block');
//   blocks.forEach(function(block) {
//     console.log("im here");
//     block.addEventListener('mouseover', function() {
//       dragElement(block);
//   });
// })
// });

function reorder(elmntarr , orderofexec){
  for(let i = 0 ; i < orderofexec.length ; i++){
    for(let j = 0 ; j < elmntarr.length ; j++){
      if(elmntarr[j].name == orderofexec[i]){
        var temp = elmntarr[i];
        elmntarr[i] = elmntarr[j];
        elmntarr[j] = temp;
      }
    }
  }
  return elmntarr;
}

function CreateBlock() {

	console.log("init here");
    var prnblck = new Printstmt();
    var newBlock = prnblck.create();
	var parent = document.getElementById("Menu");
    parent.appendChild(newBlock);
  orderofelmnts.push(prnblck);
	// dragElement(newBlock);
  }

function getElementsinOrder(){
const parentElement = document.getElementById('Canvas'); // Replace 'parent' with the ID of the parent element
var elmntarr = [];
// Get all the children of the parent element
const children = parentElement.childNodes;

// Loop through the children
for (let i = 0; i < children.length; i++) {
  const child = children[i];
  // Filter out non-element nodes (such as text nodes)
  if (child.nodeType === Node.ELEMENT_NODE) {
    // Perform actions with each child element
    elmntarr.push(child.id);
  }
}
return elmntarr;
}

function Runprog() {
  const terminal  = document.getElementById("Terminal");
  terminal.textContent='';
  
  const orderofplacement = getElementsinOrder();
  const orderofexec = reorder(orderofelmnts , orderofplacement);
  for(let i = 0 ; i < orderofexec.length ; i++){
    const ele = orderofexec[i];
    console.log("running = " + ele.name);
    ele.display("txt-box" + ele.name);
  }
  // prln.display();
}

