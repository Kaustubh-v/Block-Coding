import { Printstmt, prln } from "./language.js";
import {dragElement} from "./drag.js"

const myButton = document.getElementById("run");
myButton.addEventListener("click", function(){Runprog()});
	
const myButton1 = document.getElementById("print");
myButton1.addEventListener("click", function(){CreateBlock()});

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

function CreateBlock() {

	console.log("init here");
    var prnblck = new Printstmt();
    var newBlock = prnblck.create();
	var parent = document.getElementById("Menu");
    parent.appendChild(newBlock);
	// dragElement(newBlock);
  }


function Runprog() {
  prln.display();
}

