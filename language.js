import { variables_list } from "./index.js"

export class Printstmt {
  static instanceCount = 0;
  constructor() {
    Printstmt.instanceCount++;
    this.name = "Printblock" + Printstmt.instanceCount;
    console.log("name = " + this.name);
    console.log("print block initated");
  }

  getname() {
    console.log(Printstmt.name);
    return Printstmt.name;
  }

  create() {

    console.log("print block created");
    var newBlock = document.createElement("div");
    newBlock.classList.add("Block");
    newBlock.id = "Printblock" + Printstmt.instanceCount;
    newBlock.setAttribute("draggable", "true");
    newBlock.style.backgroundColor = "red";

    var header = document.createElement("div");
    header.id = "Blockheader" + Printstmt.instanceCount;
    header.textContent = "PRINT";
    newBlock.appendChild(header);

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.classList.add("Text-Box");
    input.id = "txt-box" + this.name;
    console.log("input id = " + "txt-box" + this.name);
    input.setAttribute("placeholder", "Enter text here");
    newBlock.appendChild(input);
    newBlock.addEventListener('dragstart', drag);
    return newBlock;
  }


  display(txtboxid , variables_list) {
    console.log("text id = " + txtboxid)
    const txtbox = document.getElementById(txtboxid);
    const parent = txtbox.parentNode;
    const childrenblocks = parent.children;
    var variableValue = "";
    for(let i = 0; i < childrenblocks.length ; i++){
      var childid = childrenblocks[i].id;
      console.log("child id is " + childid);
      if(childid.includes("Var")){
        variableValue  = document.getElementById("txt-box" + childid).value    
      }
        }
       
    const txt = document.createTextNode(txtbox.value + variableValue + "\n");

    // console.log("print = "+ txt);
    var terminal = document.getElementById("Terminal");
    terminal.appendChild(txt);
    terminal.innerHTML = terminal.innerHTML.replace('\n', '<br>');
  }
}

export class Variable {
  static instanceCount = 0;
  constructor() {
    Variable.instanceCount++;
    this.name = "Varblock" + Variable.instanceCount;
    console.log("name = " + this.name);
    console.log("variable block initated");
  }

  getname() {
    console.log(Variable.name);
    return Variable.name;
  }

  create() {

    console.log("var block created");
    var newBlock = document.createElement("div");
    newBlock.classList.add("Block");
    newBlock.id = "Varblock" + Variable.instanceCount;
    newBlock.setAttribute("draggable", "true");
    newBlock.style.backgroundColor = "green";

    var header = document.createElement("div");
    header.id = "Blockheader" + Variable.instanceCount;
    header.textContent = "VAR";
    newBlock.appendChild(header);

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.classList.add("Text-Box");
    input.id = "txt-box" + this.name;
    console.log("input id = " + "txt-box" + this.name);
    input.setAttribute("placeholder", "var name here");
    newBlock.appendChild(input);
    newBlock.addEventListener('dragstart', drag);
    return newBlock;
  }
}

export class Assignment {
  static instanceCount = 0;
  constructor() {
    Assignment.instanceCount++;
    this.name = "Assignblock" + Assignment.instanceCount;
    console.log("name = " + this.name);
    console.log("assignment block initated");
  }

  getname() {
    console.log(Assignment.name);
    return Assignment.name;
  }

  create() {

    console.log("assignment block created");
    var newBlock = document.createElement("div");
    newBlock.classList.add("Block");
    newBlock.id = "Assignmentblock" + Assignment.instanceCount;
    newBlock.setAttribute("draggable", "true");
    newBlock.style.backgroundColor = "blue";

    var header = document.createElement("div");
    header.id = "Blockheader" + Assignment.instanceCount;
    header.textContent = "ASSIGN";
    newBlock.appendChild(header);

    var rowContainer = document.createElement('div');
    rowContainer.style.display = 'inline-block';

    var input_LHS = document.createElement("input");
    input_LHS.setAttribute("type", "text");
    input_LHS.classList.add("Text-Box");
    input_LHS.id = "txt-box-LHS" + this.name;
    console.log("input id = " + "txt-box-LHS" + this.name);
    input_LHS.setAttribute("placeholder", "Enter LHS");

    var input_RHS = document.createElement("input");
    input_RHS.setAttribute("type", "text");
    input_RHS.classList.add("Text-Box");
    input_RHS.id = "txt-box-RHS" + this.name;
    console.log("input id = " + "txt-box-RHS" + this.name);
    input_RHS.setAttribute("placeholder", "Enter RHS");

    rowContainer.appendChild(input_LHS);
    // Create the '=' symbol
    const equalsSymbol = document.createTextNode(' = ');
    rowContainer.appendChild(equalsSymbol);
    rowContainer.appendChild(input_RHS);
    newBlock.appendChild(rowContainer);
    newBlock.addEventListener('dragstart', drag);
    return newBlock;
  }

  assign(txtboxid_LHS, txtboxid_RHS) {
    const LHS_txt = document.getElementById(txtboxid_LHS);
    const RHS_txt = document.getElementById(txtboxid_RHS);
    console.log("LHS = " + LHS_txt.value);
    console.log("RHS = " + RHS_txt.value);
    if(!valid_string(txtboxid_RHS)){
      return;
    }

    var flag = false;
    for (const key in variables_list) {
      if (`${key}` == LHS_txt.value) {
        variables_list[key] = RHS_txt.value;
        console.log("value is assigned");
        flag = true;
        return;
      }
    }

    console.log("invalid variable name");
    return;


  }
}

export function valid_variable_name(txtboxid) {
  var txtbox = document.getElementById(txtboxid);
  const var_name = txtbox.value;
  const variableNameRegex = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

  if (variableNameRegex.test(var_name)) {
    console.log("The input is a valid variable name in C.");
    return true;
  } else {
    console.log("The input is not a valid variable name in C.");
    return false;
  }
}

export function valid_string(txtboxid) {
  var txtbox = document.getElementById(txtboxid);
  const input_txt = txtbox.value;
  const stringPattern = /^"([^"\\]|\\.)*"$/;

  if (stringPattern.test(input_txt)) {
    console.log("The input is a valid string.");
    return true;
  } else {
    console.log("The input is not a valid string.");
    return false;
  }
}


