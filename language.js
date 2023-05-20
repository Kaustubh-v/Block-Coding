import { variables_list } from "./index.js"

export class BaseBlock {
  static instanceCount = 0;
  constructor() {
    BaseBlock.instanceCount++;
    this.name = "block" + BaseBlock.instanceCount;
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
    const blocknamepattern = /^block\d+$/;
    for (let i = 0; i < childrenblocks.length; i++) {
      var childid = childrenblocks[i].id;
      console.log("child id is " + childid);
      if (blocknamepattern.test(childid)) {
        const blockchild = document.getElementById(childid)
        var varchild = blockchild.children;
        for (let j = 0; j < varchild.length; j++)
          var varchildid = varchild[j].id;
        if (varchildid.includes("txt")) {
          variableName = document.getElementById(varchildid).value
          break;

        }
        break;
      }
    }

    variableValue = variables_list[variableName];
    console.log("value of variable is : " + variableName);
    var txt = "";
    if (!variableValue) {
      txt = document.createTextNode(txtbox.value + "\n");
    }
    else {
      txt = document.createTextNode(txtbox.value + variableValue + "\n");
    }

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
    input.id = "vartxt-box" + this.name;
    console.log("input id = " + "txt-box" + this.name);
    input.setAttribute("placeholder", "var name here");
    newBlock.appendChild(input);

    return newBlock;
  }

  // Rest of the methods specific to Variable class
}

export class BinaryOp extends BaseBlock {
  constructor() {
    super();
    console.log("binaryOp block initiated");
  }

  getBlockColor() {
    return "";
  }

  getHeaderText() {
    return "";
  }

  getSymbolElement() {

    return null;
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
    rowContainer.appendChild(this.getSymbolElement());
    rowContainer.appendChild(input_RHS);
    newBlock.appendChild(rowContainer);

    return newBlock;
  }

}

export class Assignment extends BinaryOp {
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

  getSymbolElement() {
    const equalsSymbol = document.createTextNode(' = ');
    return equalsSymbol;
  }

  create() {
    var newBlock = super.create();
    return newBlock;
  }

  // Rest of the methods specific to Assignment class
  assign(txtboxid_LHS, txtboxid_RHS) {
    const LHS_txt = document.getElementById(txtboxid_LHS);
    const RHS_txt = document.getElementById(txtboxid_RHS);
    console.log("LHS = " + LHS_txt.value);
    console.log("RHS = " + RHS_txt.value);

    if (!valid_variable_name(txtboxid_LHS)) {
      console.log("syntax error: cannot assign to non-variable entity");
      return;
    }

    if (!is_declared_variable(txtboxid_LHS)) {
      console.log("undefined variable on LHS");
      return;
    }

    if (valid_string(txtboxid_RHS) || valid_number(txtboxid_RHS)) {
      variables_list[LHS_txt.value] = RHS_txt.value;
      console.log("value is assigned");
      return;
    }

    else if (valid_variable_name(txtboxid_RHS)) {

      if(! is_declared_variable(txtboxid_RHS)){
        console.log("undefined variable on RHS");
        return;
      }
      variables_list[LHS_txt.value] = variables_list[RHS_txt.value]
      console.log("value is assigned");
      return;
    }
    else{
      console.log("undefined symbol in RHS");
    }
    return;




  }
}

export class Comparison extends BinaryOp {
  constructor() {
    super();
    console.log("comparison block initiated");
  }

  getBlockColor() {
    return "orange";
  }

  getHeaderText() {
    return "compare";
  }

  getSymbolElement() {
    const dropdown = document.createElement("select");
    dropdown.id = "dropdown" + this.name;

    const option1 = document.createElement("option");
    option1.value = "==";
    option1.text = "==";
    dropdown.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = "<";
    option2.text = "<";
    dropdown.appendChild(option2);

    const option3 = document.createElement("option");
    option3.value = ">";
    option3.text = ">";
    dropdown.appendChild(option3);

    const option4 = document.createElement("option");
    option4.value = "<=";
    option4.text = "<=";
    dropdown.appendChild(option4);

    const option5 = document.createElement("option");
    option5.value = ">=";
    option5.text = ">=";
    dropdown.appendChild(option5);

    return dropdown;
  }

  create() {
    var newBlock = super.create();
    return newBlock;
  }

  compare(txtboxid_LHS, txtboxid_RHS) {
    const dropdown = document.getElementById("dropdown" + this.name);
    const selectedOption = dropdown.options[dropdown.selectedIndex];
    const selectedValue = selectedOption.value;
    const selectedText = selectedOption.text;

    console.log("Selected value: " + selectedValue);
    console.log("Selected text: " + selectedText);

    const LHS_txt = document.getElementById(txtboxid_LHS);
    const RHS_txt = document.getElementById(txtboxid_RHS);
    console.log("LHS = " + LHS_txt.value);
    console.log("RHS = " + RHS_txt.value);

    if(same_dtype(txtboxid_LHS, txtboxid_RHS)){
      console.log("same d type");
    }
    else{
      console.log("non matching dtype");
    }

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

export function is_declared_variable(txtboxid) {
  if (!valid_variable_name(txtboxid)) {
    return false;
  }

  var txtbox = document.getElementById(txtboxid);

  var flag = false;
  for (const key in variables_list) {
    if (`${key}` == txtbox.value) {
      flag = true;
      break;
    }
  }
  if (flag == false) {
    console.log("undefined variable on RHS");
    return false;
  }
  return true;
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

export function same_dtype(txtboxid_LHS, txtboxid_RHS){
  const LHS_txt = document.getElementById(txtboxid_LHS);
  const RHS_txt = document.getElementById(txtboxid_RHS);
  if((valid_string(txtboxid_LHS) && valid_string(txtboxid_RHS)) || (valid_number(txtboxid_LHS) && valid_number(txtboxid_RHS))){
    return true;
  }

  else if(valid_variable_name(txtboxid_LHS) && valid_variable_name(txtboxid_RHS)){
    if(is_declared_variable(txtboxid_LHS) && is_declared_variable(txtboxid_RHS)){
      var LHS_value = variables_list[LHS_txt.value];
      var RHS_value = variables_list[RHS_txt.value];

      const stringPattern = /^"([^"\\]|\\.)*"$/;
      const numberPattern = /^-?\d+(\.\d+)?$/;
      if (stringPattern.test(LHS_value) && stringPattern.test(RHS_value)) {
        return true;
      }

      else if (numberPattern.test(LHS_value) && numberPattern.test(RHS_value)) {
        return true;
      }
      else{
        return false;
      }

    }
    else{
      return false;
    }
  }
  else{
    return false;
  }
}

