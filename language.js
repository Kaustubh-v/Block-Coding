
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

  display(txtboxid) {
    console.log("text id = " + txtboxid)
    const txtbox = document.getElementById(txtboxid);
    const txt = document.createTextNode(txtbox.value + "\n");

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
    //    newBlock.appendChild(input_LHS);


    var input_RHS = document.createElement("input");
    input_RHS.setAttribute("type", "text");
    input_RHS.classList.add("Text-Box");
    input_RHS.id = "txt-box-LHS" + this.name;
    console.log("input id = " + "txt-box-RHS" + this.name);
    input_RHS.setAttribute("placeholder", "Enter RHS");
    //    newBlock.appendChild(input_RHS);


    rowContainer.appendChild(input_LHS);
    // Create the '=' symbol
    const equalsSymbol = document.createTextNode(' = ');
    rowContainer.appendChild(equalsSymbol);
    rowContainer.appendChild(input_RHS);
    newBlock.appendChild(rowContainer);
    newBlock.addEventListener('dragstart', drag);
    return newBlock;
  }
}

//export const prln = new Printstmt();

