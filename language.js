import { variables_list } from "./index.js"

export class BaseBlock {
  static instanceCount = 0;
  constructor() {
    BaseBlock.instanceCount++;
    this.name = "Block" + BaseBlock.instanceCount;
    console.log("name = " + this.name);
    console.log("block initiated");
  }

  getname() {
    console.log(BaseBlock.name);
    return BaseBlock.name;
  }

  create() {
    console.log("block created");
    var newBlock = document.createElement("div");
    newBlock.classList.add("Block");
    newBlock.id = this.name;
    newBlock.setAttribute("draggable", "true");
    newBlock.style.backgroundColor = this.getBlockColor();

    var header = document.createElement("div");
    header.id = "Blockheader" + BaseBlock.instanceCount;
    header.textContent = this.getHeaderText();
    newBlock.appendChild(header);

    newBlock.addEventListener('dragstart', drag);
    return newBlock;
  }

  getBlockColor() {
    // This method should be overridden in child classes
    return "";
  }

  getHeaderText() {
    // This method should be overridden in child classes
    return "";
  }
}

export class Printstmt extends BaseBlock {
  constructor() {
    super();
    console.log("print block initiated");
  }

  getBlockColor() {
    return "red";
  }

  getHeaderText() {
    return "PRINT";
  }

  create() {
    var newBlock = super.create();

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.classList.add("Text-Box");
    input.id = "txt-box" + this.name;
    console.log("input id = " + "txt-box" + this.name);
    input.setAttribute("placeholder", "Enter text here");
    newBlock.appendChild(input);

    return newBlock;
  }

  // Rest of the methods specific to Printstmt class
  display(txtboxid, variables_list) {
    console.log("text id = " + txtboxid)
    const txtbox = document.getElementById(txtboxid);
    const parent = txtbox.parentNode;
    const childrenblocks = parent.children;
    var variableName = "";
    var variableValue = "";
    for (let i = 0; i < childrenblocks.length; i++) {
      var childid = childrenblocks[i].id;
      console.log("child id is " + childid);
      if (childid.includes("Var")) {
        variableName = document.getElementById("txt-box" + childid).value

        var flag = false;
        for (const key in variables_list) {
          if (`${key}` == variableName) {
            variableValue = variables_list[key];
            flag = true;
          }
        }

      }
    }

    const txt = document.createTextNode(txtbox.value + variableValue + "\n");

    // console.log("print = "+ txt);
    var terminal = document.getElementById("Terminal");
    terminal.appendChild(txt);
    terminal.innerHTML = terminal.innerHTML.replace('\n', '<br>');
  }

}

export class Variable extends BaseBlock {
  constructor() {
    super();
    console.log("variable block initiated");
  }

  getBlockColor() {
    return "green";
  }

  getHeaderText() {
    return "VAR";
  }

  create() {
    var newBlock = super.create();

    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.classList.add("Text-Box");
    input.id = "txt-box" + this.name;
    console.log("input id = " + "txt-box" + this.name);
    input.setAttribute("placeholder", "var name here");
    newBlock.appendChild(input);

    return newBlock;
  }

  // Rest of the methods specific to Variable class
}

export class Assignment extends BaseBlock {
  constructor() {
    super();
    console.log("assignment block initiated");
  }

  getBlockColor() {
    return "blue";
  }

  getHeaderText() {
    return "ASSIGN";
  }

  create() {
    var newBlock = super.create();

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

    return newBlock;
  }

  // Rest of the methods specific to Assignment class
  assign(txtboxid_LHS, txtboxid_RHS) {
    const LHS_txt = document.getElementById(txtboxid_LHS);
    const RHS_txt = document.getElementById(txtboxid_RHS);
    console.log("LHS = " + LHS_txt.value);
    console.log("RHS = " + RHS_txt.value);
    if (!valid_string(txtboxid_RHS) && !valid_number(txtboxid_RHS)) {
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

export function valid_number(txtboxid) {

  var txtbox = document.getElementById(txtboxid);
  const input_txt = txtbox.value;
  const numberPattern = /^-?\d+(\.\d+)?$/;


  if (numberPattern.test(input_txt)) {
    console.log("The input is a valid number.");
    return true;
  } else {
    console.log("The input is not a valid number.");
    return false;
  }
}


