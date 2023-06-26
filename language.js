import { variables_list, Runprog } from "./index.js";

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
    newBlock.addEventListener("dragstart", drag);

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
    return "#FFC0C0";
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
    console.log("text id = " + txtboxid);
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
        const blockchild = document.getElementById(childid);
        var varchild = blockchild.children;
        for (let j = 0; j < varchild.length; j++)
          var varchildid = varchild[j].id;
        if (varchildid.includes("txt")) {
          var variableNameEle = document.getElementById(varchildid);
          variableName = variableNameEle.value;
          variableValue = variables_list[variableName];

          break;
          // var flag = false;
          // for (const key in variables_list) {
          //   if (`${key}` == variableName) {
          //     variableValue = variables_list[key];
          //     flag = true;
          //   }
          // }
        }
        break;
      }
    }

    console.log("value of variable is : " + variableValue);
    let textboxValue = txtbox.value;
    var txt = "";
    if (!variableValue) {
      // txt = document.createTextNode(txtbox.value);
      if(textboxValue[textboxValue.length-1] == "t" && textboxValue[textboxValue.length-2] == '\\'){
        txt = document.createTextNode(textboxValue.slice(0,textboxValue.length-2) + " ");
      }else{
        txt = document.createTextNode(textboxValue + "\n");
      }
    } else {
      // txt = document.createTextNode(txtbox.value + variableValue + "\n");
      if(textboxValue[textboxValue.length-1] == "t" && textboxValue[textboxValue.length-2] == '\\'){
        txt = document.createTextNode(textboxValue.slice(0,textboxValue.length-2) + variableValue + " ");
      }else{
        txt = document.createTextNode(textboxValue + variableValue + "\n");
      }
    }
    // console.log("print = "+ txt);
    var terminal = document.getElementById("Terminal");
    terminal.appendChild(txt);
    terminal.innerHTML = terminal.innerHTML.replace("\n", "<br>");
    // terminal.innerHTML = terminal.innerHTML.replace("\t", " ")
  }
}

export class Variable extends BaseBlock {
  constructor() {
    super();
    console.log("variable block initiated");
  }

  getBlockColor() {
    return "#C0FFC0";
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

    var rowContainer = document.createElement("div");
    rowContainer.style.display = "inline-block";

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
    return "#C0C0FF";
  }

  getHeaderText() {
    return "ASSIGN";
  }

  getSymbolElement() {
    const equalsSymbol = document.createTextNode(" = ");
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
    } else if (valid_variable_name(txtboxid_RHS)) {
      if (!is_declared_variable(txtboxid_RHS)) {
        console.log("undefined variable on RHS");
        return;
      }
      variables_list[LHS_txt.value] = variables_list[RHS_txt.value];
      console.log("value is assigned");
      return;
    } else {
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
    return "#FFD8B8";
  }

  getHeaderText() {
    return "COMPARE";
  }

  getSymbolElement() {
    const dropdown = document.createElement("select");
    dropdown.id = "dropdown" + this.name;

    const option1 = document.createElement("option");
    option1.value = "==";
    option1.text = "==";
    dropdown.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = ">";
    option2.text = ">";
    dropdown.appendChild(option2);

    const option3 = document.createElement("option");
    option3.value = "<";
    option3.text = "<";
    dropdown.appendChild(option3);

    const option4 = document.createElement("option");
    option4.value = ">=";
    option4.text = ">=";
    dropdown.appendChild(option4);

    const option5 = document.createElement("option");
    option5.value = "<=";
    option5.text = "<=";
    dropdown.appendChild(option5);

    return dropdown;
  }

  compare(txtboxLHSid, txtboxRHSid) {
    // Rest of the compare method implementation
    const dropmenu = document.getElementById("dropdown" + this.name);
    const selectedop = dropmenu.value;

    const LHSele = document.getElementById(txtboxLHSid);
    const RHSele = document.getElementById(txtboxRHSid);

    let lhskey = 0,
      rhskey = 0;
    // var flag = false;
    for (const key in variables_list) {
      if (`${key}` == LHSele.value) {
        lhskey = key;
        console.log("lhs key = " + lhskey);
      }
      if (`${key}` == RHSele.value) {
        rhskey = key;
        console.log("rhs key = " + rhskey);
      }
    }

    console.log("operatorno is = " + this.operatorno);
    if (selectedop == "==") {
      return this.equal_equal(lhskey, rhskey, LHSele, RHSele);
    } else if (selectedop == ">") {
      return this.greater_than(lhskey, rhskey, LHSele, RHSele);
    } else if (selectedop == "<") {
      return this.less_than(lhskey, rhskey, LHSele, RHSele);
    } else if (selectedop == ">=") {
      return this.greater_than_equal_to(lhskey, rhskey, LHSele, RHSele);
    } else if (selectedop == "<=") {
      return this.less_than_equal_to(lhskey, rhskey, LHSele, RHSele);
    }
  }

  equal_equal(lhskey, rhskey, LHSele, RHSele) {
    if (lhskey && rhskey) {
      console.log("compare both variables");
      if (
        parseFloat(variables_list[lhskey]) == parseFloat(variables_list[rhskey])
      ) {
        return true;
      }
      return false;
    } else if (lhskey) {
      console.log("compare one variable");
      if (parseFloat(variables_list[lhskey]) == parseFloat(RHSele.value)) {
        return true;
      }
      return false;
    } else if (rhskey) {
      console.log("compare one variable");
      if (parseFloat(variables_list[rhskey]) == parseFloat(LHSele.value)) {
        return true;
      }
      return false;
    } else {
      console.log("compare two non-variables");
      if (parseFloat(LHSele.value) == parseFloat(RHSele.value)) {
        return true;
      }
      return false;
    }
  }

  greater_than(lhskey, rhskey, LHSele, RHSele) {
    if (lhskey && rhskey) {
      console.log("compare both variables");
      if (
        parseFloat(variables_list[lhskey]) > parseFloat(variables_list[rhskey])
      ) {
        return true;
      }
      return false;
    } else if (lhskey) {
      console.log("compare one variable");
      if (parseFloat(variables_list[lhskey]) > parseFloat(RHSele.value)) {
        return true;
      }
      return false;
    } else if (rhskey) {
      console.log("compare one variable");
      if (parseFloat(variables_list[rhskey]) < parseFloat(LHSele.value)) {
        return true;
      }
      return false;
    } else {
      console.log("compare two non-variables");
      if (parseFloat(LHSele.value) > parseFloat(RHSele.value)) {
        return true;
      }
      return false;
    }
  }

  less_than(lhskey, rhskey, LHSele, RHSele) {
    if (lhskey && rhskey) {
      console.log("compare both variables");
      if (
        parseFloat(variables_list[lhskey]) < parseFloat(variables_list[rhskey])
      ) {
        return true;
      }
      return false;
    } else if (lhskey) {
      console.log("compare one variable");
      if (parseFloat(variables_list[lhskey]) < parseFloat(RHSele.value)) {
        return true;
      }
      return false;
    } else if (rhskey) {
      console.log("compare one variable");
      if (parseFloat(variables_list[rhskey]) > parseFloat(LHSele.value)) {
        return true;
      }
      return false;
    } else {
      console.log("compare two non-variables");
      if (parseFloat(LHSele.value) < parseFloat(RHSele.value)) {
        return true;
      }
      return false;
    }
  }

  greater_than_equal_to(lhskey, rhskey, LHSele, RHSele) {
    if (lhskey && rhskey) {
      console.log("compare both variables");
      if (
        parseFloat(variables_list[lhskey]) >= parseFloat(variables_list[rhskey])
      ) {
        return true;
      }
      return false;
    } else if (lhskey) {
      console.log("compare one variable");
      if (parseFloat(variables_list[lhskey]) >= parseFloat(RHSele.value)) {
        return true;
      }
      return false;
    } else if (rhskey) {
      console.log("compare one variable");
      if (parseFloat(variables_list[rhskey]) <= parseFloat(LHSele.value)) {
        return true;
      }
      return false;
    } else {
      console.log("compare two non-variables");
      if (parseFloat(LHSele.value) >= parseFloat(RHSele.value)) {
        return true;
      }
      return false;
    }
  }

  less_than_equal_to(lhskey, rhskey, LHSele, RHSele) {
    if (lhskey && rhskey) {
      console.log("compare both variables");
      if (
        parseFloat(variables_list[lhskey]) <= parseFloat(variables_list[rhskey])
      ) {
        return true;
      }
      return false;
    } else if (lhskey) {
      console.log("compare one variable");
      if (parseFloat(variables_list[lhskey]) <= parseFloat(RHSele.value)) {
        return true;
      }
      return false;
    } else if (rhskey) {
      console.log("compare one variable");
      if (parseFloat(variables_list[rhskey]) >= parseFloat(LHSele.value)) {
        return true;
      }
      return false;
    } else {
      console.log("compare two non-variables");
      if (parseFloat(LHSele.value) <= parseFloat(RHSele.value)) {
        return true;
      }
      return false;
    }
  }
}

export class LogicalOperator extends BaseBlock {
  constructor() {
    super();
    console.log("logical operator block initiated");
  }

  create() {
    var newBlock = super.create();

    var rowContainer = document.createElement("div");
    rowContainer.style.display = "inline-block";

    var lhsSlot = document.createElement("div");
    lhsSlot.classList.add("Slot");
    lhsSlot.id = "slot-LHS" + this.name;
    lhsSlot.textContent = "Drag Comparison Block Here";
    lhsSlot.addEventListener("drop", drop);
    lhsSlot.addEventListener("dragover", allowDrop);

    var symbolElement = this.getSymbolElement();

    var rhsSlot = document.createElement("div");
    rhsSlot.classList.add("Slot");
    rhsSlot.id = "slot-RHS" + this.name;
    rhsSlot.textContent = "Drag Comparison Block Here";
    rhsSlot.addEventListener("drop", drop);
    rhsSlot.addEventListener("dragover", allowDrop);

    rowContainer.appendChild(lhsSlot);
    rowContainer.appendChild(symbolElement);
    rowContainer.appendChild(rhsSlot);

    newBlock.appendChild(rowContainer);

    return newBlock;
  }

  getSymbolElement() {
    const dropdown = document.createElement("select");
    dropdown.id = "dropdown" + this.name;

    const option1 = document.createElement("option");
    option1.value = "&&";
    option1.text = "&&";
    dropdown.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = "||";
    option2.text = "||";
    dropdown.appendChild(option2);

    return dropdown;
  }

  getComparisionid_left(logical_name){
    const logicalBlock = document.getElementById(logical_name);

    const leftSlot = document.getElementById("slot-LHS" + logical_name);

    const leftComparisonBlock = leftSlot.children[0];
  
    console.log("Left Comparison Block ID: " + leftComparisonBlock.id);
    return leftComparisonBlock.id;
  }

  getComparisionid_right(logical_name){
    const logicalBlock = document.getElementById(logical_name);


    const rightSlot = document.getElementById("slot-RHS" + logical_name);

    const rightComparisonBlock = rightSlot.children[0];

    console.log("Right Comparison Block ID: " + rightComparisonBlock.id);
    return rightComparisonBlock.id;
  }

  performLogicalOperation(logical_name, lhsResult, rhsResult) {

    const operator = document.getElementById("dropdown" + logical_name).value;
  
    console.log("LHS Result: " + lhsResult);
    console.log("RHS Result: " + rhsResult);
  

    if (operator === "&&") {
      return lhsResult && rhsResult;
    } else if (operator === "||") {
      return lhsResult || rhsResult;
    } else {
      throw new Error("Invalid operator: " + operator);
    }
  }

}

export class Arithmatic extends BaseBlock {
  static operatorno = 0;
  constructor() {
    super();
    console.log("addition block initiated");
  }

  getBlockColor() {
    return "#FFFFC0";
  }

  getHeaderText() {
    return "Arithmatic";
  }

  getSymbolElement() {
    const dropdown = document.createElement("select");
    dropdown.id = "dropdown" + this.name;

    const option1 = document.createElement("option");
    option1.value = "+";
    option1.text = "+";
    dropdown.appendChild(option1);

    const option2 = document.createElement("option");
    option2.value = "-";
    option2.text = "-";
    dropdown.appendChild(option2);

    const option3 = document.createElement("option");
    option3.value = "*";
    option3.text = "*";
    dropdown.appendChild(option3);

    const option4 = document.createElement("option");
    option4.value = "/";
    option4.text = "/";
    dropdown.appendChild(option4);

    const option5 = document.createElement("option");
    option5.value = "%";
    option5.text = "%";
    dropdown.appendChild(option5);

    return dropdown;
  }

  create() {
    var newblock = super.create();

    var rowContainer = document.createElement("div");
    rowContainer.style.display = "inline-block";

    var input_LHS = document.createElement("input");
    input_LHS.setAttribute("type", "text");
    input_LHS.classList.add("Text-Box");
    input_LHS.id = "txt-box-LHS" + this.name;
    console.log("input id = " + "txt-box-LHS" + this.name);
    input_LHS.setAttribute("placeholder", "Enter VAR");

    var input_RHS = document.createElement("input");
    input_RHS.setAttribute("type", "text");
    input_RHS.classList.add("Text-Box");
    input_RHS.id = "txt-box-RHS" + this.name;
    console.log("input id = " + "txt-box-RHS" + this.name);
    input_RHS.setAttribute("placeholder", "Enter LHS");

    rowContainer.appendChild(input_LHS);

    const eqsymbol = document.createTextNode(" = ");
    rowContainer.appendChild(eqsymbol);

    rowContainer.appendChild(input_RHS);

    const addsymbol = this.getSymbolElement();
    rowContainer.appendChild(addsymbol);

    var input_add = document.createElement("input");
    input_add.setAttribute("type", "text");
    input_add.classList.add("Text-Box");
    input_add.id = "txt-box-add" + this.name;
    console.log("input id = " + "txt-box-add" + this.name);
    input_add.setAttribute("placeholder", "Enter RHS");

    rowContainer.appendChild(input_add);
    newblock.appendChild(rowContainer);
    return newblock;
  }

  doadd(eqkey, lhskey, rhskey, LHSele, RHSele) {
    if (eqkey && lhskey && rhskey) {
      var answer =
        parseFloat(variables_list[lhskey]) + parseFloat(variables_list[rhskey]);
      variables_list[eqkey] = answer.toString();
      console.log("-added using 3 variables");
      return;
    } else if (eqkey && lhskey) {
      var answer =
        parseFloat(variables_list[lhskey]) + parseFloat(RHSele.value);
      variables_list[eqkey] = answer.toString();
      console.log("added in one variable");
      return;
    } else if (eqkey && rhskey) {
      var answer =
        parseFloat(variables_list[rhskey]) + parseFloat(LHSele.value);
      variables_list[eqkey] = answer.toString();
      console.log("added in one variable");
      return;
    } else if (eqkey) {
      var answer = parseFloat(LHSele.value) + parseFloat(RHSele.value);
      variables_list[eqkey] = answer.toString();
      console.log("added in one variable");
      return;
    } else {
      console.log("invalid input");
      return;
    }
  }

  dosub(eqkey, lhskey, rhskey, LHSele, RHSele) {
    if (eqkey && lhskey && rhskey) {
      var answer =
        parseFloat(variables_list[lhskey]) - parseFloat(variables_list[rhskey]);
      variables_list[eqkey] = answer.toString();
      console.log("-added using 3 variables");
      return;
    } else if (eqkey && lhskey) {
      var answer =
        parseFloat(variables_list[lhskey]) - parseFloat(RHSele.value);
      variables_list[eqkey] = answer.toString();
      console.log("added in one variable");
      return;
    } else if (eqkey && rhskey) {
      var answer =
        parseFloat(LHSele.value) - parseFloat(variables_list[rhskey]);
      variables_list[eqkey] = answer.toString();
      console.log("added in one variable");
      return;
    } else if (eqkey) {
      var answer = parseFloat(LHSele.value) - parseFloat(RHSele.value);
      variables_list[eqkey] = answer.toString();
      console.log("added in one variable");
      return;
    } else {
      console.log("invalid input");
      return;
    }
  }

  domul(eqkey, lhskey, rhskey, LHSele, RHSele) {
    if (eqkey && lhskey && rhskey) {
      var answer =
        parseFloat(variables_list[lhskey]) * parseFloat(variables_list[rhskey]);
      variables_list[eqkey] = answer.toString();
      console.log("-added using 3 variables");
      return;
    } else if (eqkey && lhskey) {
      var answer =
        parseFloat(variables_list[lhskey]) * parseFloat(RHSele.value);
      variables_list[eqkey] = answer.toString();
      console.log("added in one variable");
      return;
    } else if (eqkey && rhskey) {
      var answer =
        parseFloat(LHSele.value) * parseFloat(variables_list[rhskey]);
      variables_list[eqkey] = answer.toString();
      console.log("added in one variable");
      return;
    } else if (eqkey) {
      var answer = parseFloat(LHSele.value) * parseFloat(RHSele.value);
      variables_list[eqkey] = answer.toString();
      console.log("added in one variable");
      return;
    } else {
      console.log("invalid input");
      return;
    }
  }

  dodiv(eqkey, lhskey, rhskey, LHSele, RHSele) {
    if (eqkey && lhskey && rhskey) {
      var answer =
        parseFloat(variables_list[lhskey]) / parseFloat(variables_list[rhskey]);
      variables_list[eqkey] = answer.toString();
      console.log("-added using 3 variables");
      return;
    } else if (eqkey && lhskey) {
      var answer =
        parseFloat(variables_list[lhskey]) / parseFloat(RHSele.value);
      variables_list[eqkey] = answer.toString();
      console.log("added in one variable");
      return;
    } else if (eqkey && rhskey) {
      var answer =
        parseFloat(LHSele.value) / parseFloat(variables_list[rhskey]);
      variables_list[eqkey] = answer.toString();
      console.log("added in one variable");
      return;
    } else if (eqkey) {
      var answer = parseFloat(LHSele.value) / parseFloat(RHSele.value);
      variables_list[eqkey] = answer.toString();
      console.log("added in one variable");
      return;
    } else {
      console.log("invalid input");
      return;
    }
  }

  domod(eqkey, lhskey, rhskey, LHSele, RHSele) {
    if (eqkey && lhskey && rhskey) {
      var answer =
        parseFloat(variables_list[lhskey]) % parseFloat(variables_list[rhskey]);
      variables_list[eqkey] = answer.toString();
      console.log("-added using 3 variables");
      return;
    } else if (eqkey && lhskey) {
      var answer =
        parseFloat(variables_list[lhskey]) % parseFloat(RHSele.value);
      variables_list[eqkey] = answer.toString();
      console.log("added in one variable");
      return;
    } else if (eqkey && rhskey) {
      var answer =
        parseFloat(LHSele.value) % parseFloat(variables_list[rhskey]);
      variables_list[eqkey] = answer.toString();
      console.log("added in one variable");
      return;
    } else if (eqkey) {
      var answer = parseFloat(LHSele.value) % parseFloat(RHSele.value);
      variables_list[eqkey] = answer.toString();
      console.log("added in one variable");
      return;
    } else {
      console.log("invalid input");
      return;
    }
  }

  calculate(txtboxeqid, txtboxLHSid, txtboxRHSid) {
    const dropmenu = document.getElementById("dropdown" + this.name);
    const selectedop = dropmenu.value;
    console.log("---------started adding-------");
    const eqele = document.getElementById(txtboxeqid);
    const LHSele = document.getElementById(txtboxLHSid);
    const RHSele = document.getElementById(txtboxRHSid);

    // if (
    //   !valid_string(txtboxRHSid) &&
    //   !valid_number(txtboxRHSid) &&
    //   !valid_string(txtboxLHSid) &&
    //   !valid_number(txtboxLHSid)
    // ) {
    //   return;
    // }

    var lhskey = 0,
      rhskey = 0,
      eqkey = 0;
    // var flag = false;
    for (const key in variables_list) {
      if (`${key}` == eqele.value) {
        eqkey = key;
        console.log("eq key = " + eqkey);
      }
      if (`${key}` == LHSele.value) {
        lhskey = key;
        console.log("lhs key = " + lhskey);
      }
      if (`${key}` == RHSele.value) {
        rhskey = key;
        console.log("rhs key = " + rhskey);
      }
    }

    console.log("operatorno is = " + this.operatorno);
    if (selectedop == "+") {
      this.doadd(eqkey, lhskey, rhskey, LHSele, RHSele);
    } else if (selectedop == "-") {
      this.dosub(eqkey, lhskey, rhskey, LHSele, RHSele);
    } else if (selectedop == "*") {
      this.domul(eqkey, lhskey, rhskey, LHSele, RHSele);
    } else if (selectedop == "/") {
      this.dodiv(eqkey, lhskey, rhskey, LHSele, RHSele);
    } else if (selectedop == "%") {
      this.domod(eqkey, lhskey, rhskey, LHSele, RHSele);
    }
  }
}

export class IFstatement extends BaseBlock {
  constructor() {
    super();
    console.log("IF block initiated");
  }

  getBlockColor() {
    return "turquoise";
  }

  getHeaderText() {
    return "IF";
  }

  create() {
    var newblock = super.create();
    var logicarea = document.createElement("div");
    logicarea.id = "Logic" + this.name;
    logicarea.style.backgroundColor = this.getBlockColor();
    logicarea.style.border = "solid";
    logicarea.style.borderWidth = "3px";
    logicarea.style.margin = "5px";
    logicarea.style.padding = "10px";
    var addarea = document.createElement("div");
    addarea.id = "ifCanvas" + this.name;
    addarea.style.backgroundColor = this.getBlockColor();
    addarea.style.border = "solid";
    addarea.style.borderWidth = "3px";
    addarea.style.margin = "5px";
    addarea.style.padding = "25px";
    newblock.appendChild(logicarea);
    newblock.appendChild(addarea);

    return newblock;
  }

  getComparisionid(Logicid) {
    let Value = document.getElementById(Logicid);
    let ele = Value.children;
    console.log("comparision block id is : " + ele[0].id);
    return ele[0].id;
  }

  Runcanvas(Canvasid) {
    let Value = document.getElementById(Canvasid);
    let orederofelmnts = Value.children;
    console.log("orderofelmnts in canvasBlock = " + orederofelmnts[0].id);
    orederofelmnts = Array.from(orederofelmnts);
    Runprog(Canvasid, orederofelmnts);
    return;
  }
}

export class ELSEstatement extends BaseBlock {
  constructor() {
    super();
    console.log("ELSE block initiated");
  }

  getBlockColor() {
    return "turquoise";
  }

  getHeaderText() {
    return "ELSE";
  }

  create() {
    var newblock = super.create();
    var addarea = document.createElement("div");
    addarea.id = "elseCanvas" + this.name;
    addarea.style.backgroundColor = this.getBlockColor();
    addarea.style.border = "solid";
    addarea.style.borderWidth = "3px";
    addarea.style.margin = "5px";
    addarea.style.padding = "25px";
    newblock.appendChild(addarea);
    return newblock;
  }
  Runcanvas(Canvasid) {
    let Value = document.getElementById(Canvasid);
    let orederofelmnts = Value.children;
    console.log("orderofelmnts in canvasBlock = " + orederofelmnts[0].id);
    orederofelmnts = Array.from(orederofelmnts);
    Runprog(Canvasid, orederofelmnts);
    return;
  }
}

export class FORloop extends BaseBlock{
  
  constructor() {
    super();
    console.log("FOR block initiated");
  }

  getBlockColor() {
    return "silver";
  }

  getHeaderText() {
    return "FOR";
  }

  create() {
    var newblock = super.create();

    var defineblock = document.createElement("div");
    defineblock.id = "loopdefinitions" + this.name;
    defineblock.style.height = "20px"
    defineblock.style.display = "flex";
    defineblock.style.alignItems = "row";
    defineblock.style.justifyContent = "center";
    defineblock.style.alignContent = "center";

    let fortxt = document.createElement("h4");
    fortxt.textContent = "FOR";
    fortxt.style.marginTop = "0";
    fortxt.style.marginBottom = "0";
    fortxt.style.marginLeft = "10px";
    fortxt.style.marginRight = "10px";
    defineblock.appendChild(fortxt);

    var input_increment = document.createElement("input");
    input_increment.setAttribute("type", "text");
    input_increment.style.height = "10px";
    input_increment.style.width = "20px";
    input_increment.id = "incremnent-box" + this.name;
    console.log("input id = " + "increment-box" + this.name);
    input_increment.setAttribute("placeholder", "i");
    defineblock.appendChild(input_increment);

    let fromtxt = document.createElement("h4");
    fromtxt.textContent = "FROM";
    fromtxt.style.marginTop = "0";
    fromtxt.style.marginBottom = "0";
    fromtxt.style.marginLeft = "10px";
    fromtxt.style.marginRight = "10px";
    defineblock.appendChild(fromtxt);

    var input_start = document.createElement("input");
    input_start.setAttribute("type", "text");
    input_start.style.height = "10px";
    input_start.style.width = "20px";
    input_start.id = "start-box" + this.name;
    console.log("input id = " + "start-box" + this.name);
    input_start.setAttribute("placeholder", "0");
    defineblock.appendChild(input_start);

    let totxt = document.createElement("h4");
    totxt.style.marginTop = "0";
    totxt.style.marginBottom = "0";
    totxt.style.marginLeft = "10px";
    totxt.style.marginRight = "10px";
    totxt.textContent = "END";
    defineblock.appendChild(totxt);

    var input_end = document.createElement("input");
    input_end.setAttribute("type", "text");
    input_end.style.height = "10px";
    input_end.style.width = "20px";
    input_end.id = "end-box" + this.name;
    console.log("input id = " + "end-box" + this.name);
    input_end.setAttribute("placeholder", "0");
    defineblock.appendChild(input_end);

    let steptxt = document.createElement("h4");
    steptxt.style.marginTop = "0";
    steptxt.style.marginBottom = "0";
    steptxt.style.marginLeft = "10px";
    steptxt.style.marginRight = "10px";
    steptxt.textContent = "STEP";
    defineblock.appendChild(steptxt);

    var input_step = document.createElement("input");
    input_step.setAttribute("type", "text");
    input_step.style.height = "10px";
    input_step.style.width = "20px";
    input_step.id = "step-box" + this.name;
    console.log("input id = " + "step-box" + this.name);
    input_step.setAttribute("placeholder", "1");
    defineblock.appendChild(input_step);
    
    newblock.appendChild(defineblock);

    var addarea = document.createElement("div");
    addarea.id = "forCanvas" + this.name;
    addarea.style.backgroundColor = this.getBlockColor();
    addarea.style.border = "solid";
    addarea.style.borderWidth = "3px";
    addarea.style.margin = "5px";
    addarea.style.padding = "25px";
    newblock.appendChild(addarea);
    
    return newblock;
  }

  Runcanvas(Forid , canvasid){
    const loopdef = document.getElementById("loopdefinitions" + Forid);
    let childlist  = loopdef.children;
    const incrementTxtbox = childlist[1];
    const startTxtbox = childlist[3];
    const endTxtbox = childlist[5]
    const stepTxtbox = childlist[7];

    let incrementval = incrementTxtbox.value;
    let startval = startTxtbox.value;
    startval = parseInt(startval);
    let endval = endTxtbox.value;
    console.log("endval = " + endval);
    let stepval = stepTxtbox.value;
    stepval = parseInt(stepval);

    if(endval in variables_list){
      endval = variables_list[endval];
      console.log("=====end val = " + endval);
    }else{
      if(!endval){
        alert("please enter TO value");
      }
      endval = parseInt(endval);
    }
    if(!startval){
      startval = 0;
    }
    if(!incrementval){
      incrementval = "i"
      variables_list["i"] = startval;
    }else{
      variables_list[incrementval] = startval;
    }
    
    if(!stepval){
      stepval = 1;
    }

      let Value = document.getElementById(canvasid);
        let orederofelmnts = Value.children;
        console.log("orderofelmnts in canvasBlock = " + orederofelmnts[0].id);
        orederofelmnts = Array.from(orederofelmnts);
      for(let k = startval ; k < endval ; k+=stepval){
        variables_list[incrementval] =k;
        Runprog(canvasid, orederofelmnts);
      }
    }

  
}

export function valid_variable_name(txtboxid) {
  const txtbox = document.getElementById(txtboxid);
  // if(!txtbox){
  //   return false;
  // }
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
  // if(!txtbox){
  //   return false;
  // }
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
  // if(!txtbox){
  //   return false;
  // }
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
