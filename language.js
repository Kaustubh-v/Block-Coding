
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
    //    this.count += 1;
    //    console.log("print no here :" + this.count);
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
    //    this.count += 1;
    //    console.log("print no here :" + this.count);
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

//   display(txtboxid) {
//     console.log("text id = " + txtboxid)
//     const txtbox = document.getElementById(txtboxid);
//     const txt = document.createTextNode(txtbox.value + "\n");

//     // console.log("print = "+ txt);
//     var terminal = document.getElementById("Terminal");
//     terminal.appendChild(txt);
//     terminal.innerHTML = terminal.innerHTML.replace('\n', '<br>');
//   }
}

//export const prln = new Printstmt();

