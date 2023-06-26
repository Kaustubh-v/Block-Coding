import {
  Printstmt,
  Variable,
  Assignment,
  valid_variable_name,
  Arithmatic,
  Comparison,
  IFstatement,
  ELSEstatement
} from "./language.js";

var orderofelmnts = []; // contains the instance of each block created
export let variables_list = new Object();

const myButton = document.getElementById("run");
myButton.addEventListener("click", function () {
  Runprog("Canvas", orderofelmnts);
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
myButton5.addEventListener("click", function () {
  CreateBlock("compareblock");
});

const myButton6 = document.getElementById("ifstatement");
myButton6.addEventListener("click", function () {
  CreateBlock("ifblock");
});
const myButton7 = document.getElementById("elsestatement");
myButton7.addEventListener("click", function () {
  CreateBlock("elseblock");
});

function reorder(elmntarr, orderofexec) {
  let delflag = 0;
  let enterflag = 0;
  let j = 0;
  let i = 0;
  // console.log("elementarr contains : "+ elmntarr.length + " 0 : " + elmntarr[0].name + " 1 : " + elmntarr[1].name);
  for (i = 0; i < orderofexec.length; i++) {
    console.log("orderofexec contains : " + elmntarr[0].id);
    enterflag = 1;
    for (j = 0; j < elmntarr.length; j++) {
      if (elmntarr[j].name == orderofexec[i]) {
        delflag = 1;
        var temp = elmntarr[i];
        elmntarr[i] = elmntarr[j];
        elmntarr[j] = temp;
        console.log("elmntarr contains : " + elmntarr[i]);
      }
    }
    if (delflag == 0) {
      elmntarr.splice(j, 1);
    } else {
      console.log("----reached in delfag 0-----");
      delflag = 0;
    }
  }
  if (i < elmntarr.length) {
    console.log("-----reached i-1 -------");
    elmntarr.splice(i, elmntarr.length - orderofexec.length);
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
  } else if (block_type == "arithmaticblock") {
    var artblck = new Arithmatic();
    var newblock = artblck.create();
    var parent = document.getElementById("Menu");
    parent.appendChild(newblock);
    orderofelmnts.push(artblck);
  } else if (block_type == "compareblock") {
    var cmpblck = new Comparison();
    var newblock = cmpblck.create();
    var parent = document.getElementById("Menu");
    parent.appendChild(newblock);
    orderofelmnts.push(cmpblck);
  } else if (block_type == "ifblock") {
    var ifblck = new IFstatement();
    var newblock = ifblck.create();
    var parent = document.getElementById("Menu");
    parent.appendChild(newblock);
    orderofelmnts.push(ifblck);
  }else if (block_type == "elseblock") {
    var elseblck = new ELSEstatement();
    var newblock = elseblck.create();
    var parent = document.getElementById("Menu");
    parent.appendChild(newblock);
    orderofelmnts.push(elseblck);
  }

  // var parent = document.getElementById("Menu");
  // parent.appendChild(newblock);
}

function getElementsinOrder(Canvasid) {
  const parentElement = document.getElementById(Canvasid); // Replace 'parent' with the ID of the parent element
  let elmntarr = new Array();
  // Get all the children of the parent element
  const children = parentElement.childNodes;
  console.log("length of canvas children = " + children.length);
  // Loop through the children
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    // Filter out non-element nodes (such as text nodes)
    if (child.nodeType === Node.ELEMENT_NODE) {
      // Perform actions with each child element
      console.log("children of canvas  = " + child.id);
      elmntarr.push(child.id);
    }
  }
  return elmntarr;
}

export function Runprog(Canvasid) {
  console.log("runnig canvas : " + Canvasid);
  console.log("runnig canvas children : " + orderofelmnts[0].id);
  const terminal = document.getElementById("Terminal");
  terminal.textContent = "";
  variables_list = {};
  let orderofplacement = getElementsinOrder(Canvasid); // these contain the id of the elements
  console.log("length of orderofplacement = " + orderofplacement.length);
  let elmntarr = orderofelmnts.concat();
  let orderofexec = reorder(elmntarr, orderofplacement);
  console.log("length of orderofexec = " + orderofexec.length);
  for (let i = 0; i < orderofexec.length; i++) {
    const ele = orderofexec[i];
    console.log("running = " + ele.name);

    if (ele.name && ele instanceof Printstmt) {
      console.log("print block is being executed");
      ele.display("txt-box" + ele.name, variables_list);
    } else if (ele.name && ele instanceof Variable) {
      if (valid_variable_name("vartxt-box" + ele.name)) {
        const var_txtbox = document.getElementById("vartxt-box" + ele.name);
        let unique_flag = true;
        console.log("--------------------" + unique_flag);
        for (const key in variables_list) {
          if (`${key}` == var_txtbox.value) {
            console.log("redeclaration is not allowed");
            unique_flag = false;
            break;
          }
        }
        if (unique_flag == true) {
          console.log("-----reached in storing var-----");
          variables_list[var_txtbox.value] = 0;
        }
      }
    } else if (ele.name && ele instanceof Assignment) {
      ele.assign("txt-box-LHS" + ele.name, "txt-box-RHS" + ele.name);
    } else if (ele instanceof Arithmatic) {
      console.log("----reached here------" + ele.name);
      ele.calculate(
        "txt-box-LHS" + ele.name,
        "txt-box-RHS" + ele.name,
        "txt-box-add" + ele.name
      );
    } else if (ele instanceof Comparison) {
      console.log("comparision ele is : " + ele.name);
      if (
        ele.compare("txt-box-LHS" + ele.name, "txt-box-RHS" + ele.name) == true
      ) {
        console.log("comparison result : true");
      } else if (
        ele.compare("txt-box-LHS" + ele.name, "txt-box-RHS" + ele.name) == false
      ) {
        console.log("comparison result : false");
      }
    } else if (ele.name && ele instanceof IFstatement) {
      console.log("----------running if----------");
      let number = ele.name[ele.name.length - 1];
      let IFflag = 0;
      let Comparisionid = ele.getComparisionid("Logicblock" + number);
      let comparisionelmnt;
      for(let i = 0 ; i < orderofelmnts.length ; i++){
        if(orderofelmnts[i].name == Comparisionid){
          comparisionelmnt = orderofelmnts[i];
        }
      }
      if (
        comparisionelmnt.compare(
          "txt-box-LHS" + comparisionelmnt.name,
          "txt-box-RHS" + comparisionelmnt.name
        )
      ) {
        IFflag = 1;
        i+=1
        ele.Runcanvas("Canvasblock" + number);  
      } else if(IFflag == 0) {
        let elseElement = orderofexec[i+1];
        i+=1;
        number = elseElement.name[elseElement.name.length -1];
        elseElement.Runcanvas("Canvasblock" + number);
        console.log("condition is flase!!");
      }
    }

    console.log("printing variable list for verification");
    for (const key in variables_list) {
      console.log(`Key: ${key}, Value: ${variables_list[key]}`);
    }

    // prln.display();
  }
  for (var prop in variables_list) {
    if (variables_list.hasOwnProperty(prop)) {
      delete variables_list[prop];
    }
  }
}
