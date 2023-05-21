import {
  Printstmt,
  Variable,
  Assignment,
  valid_variable_name,
  Arithmatic,
  Comparison
} from "./language.js";

const myButton = document.getElementById("run");
myButton.addEventListener("click", function () {
  Runprog();
});

const myButton1 = document.getElementById("print");
myButton1.addEventListener("click", function () {
  CreateBlock("printblock");
});

const myButton2 = document.getElementById("variable");
myButton2.addEventListener("click", function () {
  CreateBlock("varblock");
});

const myButton3 = document.getElementById("assign");
myButton3.addEventListener("click", function () {
  CreateBlock("assignblock");
});

const myButton4 = document.getElementById("arithmatic");
myButton4.addEventListener("click", function () {
  CreateBlock("arithmaticblock");
});
const myButton5 = document.getElementById("compare");
myButton5.addEventListener("click", function () { CreateBlock("compareblock") });

var orderofelmnts = [];
export let variables_list = new Object();

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
  } else if (block_type == "varblock") {
    var varblck = new Variable();
    var newBlock = varblck.create();
    var parent = document.getElementById("Menu");
    parent.appendChild(newBlock);
    orderofelmnts.push(varblck);
  } else if (block_type == "assignblock") {
    var assblck = new Assignment();
    var newblock = assblck.create();
    var parent = document.getElementById("Menu");
    parent.appendChild(newblock);
    orderofelmnts.push(assblck);
  }
  else if (block_type == "arithmaticblock") {
    var artblck = new Arithmatic();
    var newblock = artblck.create();
    var parent = document.getElementById("Menu");
    parent.appendChild(newblock);
    orderofelmnts.push(artblck);
  }
  else if (block_type == "compareblock") {
    var cmpblck = new Comparison();
    var newblock = cmpblck.create();
    var parent = document.getElementById("Menu");
    parent.appendChild(newblock);
    orderofelmnts.push(cmpblck);
  }


  // var parent = document.getElementById("Menu");
  // parent.appendChild(newblock);
}

function getElementsinOrder() {
  const parentElement = document.getElementById("Canvas"); // Replace 'parent' with the ID of the parent element
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
  terminal.textContent = "";
  variables_list = {};

  const orderofplacement = getElementsinOrder();
  const orderofexec = reorder(orderofelmnts, orderofplacement);
  for (let i = 0; i < orderofexec.length; i++) {
    const ele = orderofexec[i];
    console.log("running = " + ele.name);

    if (ele.name && ele instanceof Printstmt) {
      ele.display("txt-box" + ele.name, variables_list);
    } else if (ele.name && ele instanceof Variable) {

      if (valid_variable_name("vartxt-box" + ele.name)) {
        const var_txtbox = document.getElementById("vartxt-box" + ele.name);
        var unique_flag = true;
        for (const key in variables_list) {
          if (`${key}` == var_txtbox.value) {
            console.log("redeclaration is not allowd");
            unique_flag = false;
            break;
          }
        }
        if (unique_flag == true) {
          variables_list[var_txtbox.value] = 0;
        }
      }

      ele.assign("txt-box-LHS" + ele.name, "txt-box-RHS" + ele.name);
    } else if (ele instanceof Arithmatic) {
      console.log("----reached here------" + ele.name);
      ele.calculate(
        "txt-box-LHS" + ele.name,
        "txt-box-RHS" + ele.name,
        "txt-box-add" + ele.name
      );
    }

    else if (ele instanceof Comparison) {
      if (ele.compare("txt-box-LHS" + ele.name, "txt-box-RHS" + ele.name) == true) {
        console.log("comparison result : true");
      }
      else if (ele.compare("txt-box-LHS" + ele.name, "txt-box-RHS" + ele.name) == false) {
        console.log("comparison result : false");


      }
    }

    console.log("printing variable list for verification");
    for (const key in variables_list) {
      console.log(`Key: ${key}, Value: ${variables_list[key]}`);
    }

    // prln.display();
  }
}
