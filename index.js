import { Printstmt, Variable, Assignment} from "./language.js";
const myButton = document.getElementById("run");
myButton.addEventListener("click", function () { Runprog() });

const myButton1 = document.getElementById("print");
myButton1.addEventListener("click", function () { CreateBlock("printblock") });

const myButton2 = document.getElementById("variable");
myButton2.addEventListener("click", function () { CreateBlock("varblock") });

const myButton3 = document.getElementById("assign");
myButton3.addEventListener("click", function () { CreateBlock("assignblock") });

var orderofelmnts = [];
let variables_list = new Object();

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

function reorder(elmntarr, orderofexec) {
  for (let i = 0; i < orderofexec.length; i++) {
    for (let j = 0; j < elmntarr.length; j++) {
      if (elmntarr[j].name == orderofexec[i]) {
        var temp = elmntarr[i];
        elmntarr[i] = elmntarr[j];
        elmntarr[j] = temp;
      }
    }
  }
  return elmntarr;
}

function CreateBlock(block_type) {

  console.log("init" + block_type + " here");
  if (block_type == "printblock") {
    var prnblck = new Printstmt();
    var newBlock = prnblck.create();
    var parent = document.getElementById("Menu");
    parent.appendChild(newBlock);
    orderofelmnts.push(prnblck);
    // dragElement(newBlock);
  }

  else if (block_type == "varblock") {
    var varblck = new Variable();
    var newBlock = varblck.create();
    var parent = document.getElementById("Menu");
    parent.appendChild(newBlock);
    orderofelmnts.push(varblck);

  }

  else if (block_type == "assignblock"){
    var assblck = new Assignment();
    var newblck = assblck.create();
    var parent = document.getElementById("Menu");
    parent.appendChild(newblck);
    orderofelmnts.push(assblck);
  }
}


function getElementsinOrder() {
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
  const terminal = document.getElementById("Terminal");
  terminal.textContent = '';

  const orderofplacement = getElementsinOrder();
  const orderofexec = reorder(orderofelmnts, orderofplacement);
  for (let i = 0; i < orderofexec.length; i++) {
    const ele = orderofexec[i];
    console.log("running = " + ele.name);
    if(ele instanceof Printstmt){
      ele.display("txt-box" + ele.name);
    }

    else if(ele instanceof Variable){
      variables_list[ele.name] = 0;
    }

  }

  console.log("printing variable list for verification");
  for (const key in variables_list) {
    console.log(`Key: ${key}, Value: ${variables_list[key]}`);
  }
  
  // prln.display();
}

