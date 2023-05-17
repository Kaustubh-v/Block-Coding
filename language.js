
export class Printstmt {    
  static instanceCount = 0;
  constructor() {
    Printstmt.instanceCount++;
    console.log("print block initated");
  }

  create() {
    this.count += 1;
    console.log("print no here :" + this.count);
    console.log("print block created");
    var newBlock = document.createElement("div");
    newBlock.classList.add("Block");
    newBlock.id = "Printblock" + Printstmt.instanceCount;
    newBlock.setAttribute("draggable" , "true");
    newBlock.style.backgroundColor = "red";
   
    var header = document.createElement("div");
    header.id = "Blockheader" + Printstmt.instanceCount;
    header.textContent = "PRINT";
    newBlock.appendChild(header);
   
    var input = document.createElement("input");
    input.setAttribute("type", "text");
    input.id =  "print-txt-box";
    input.setAttribute("placeholder", "Enter text here");
    newBlock.appendChild(input);
    newBlock.addEventListener('dragstart' , drag);
    return newBlock;
  }

  display() {
    console.log("print block no: " + this.count);
    const txtbox = document.getElementById("print-txt-box");
    const txt = txtbox.value;

    var terminal = document.getElementById("Terminal");
    terminal.textContent = txt;
  }
}

export const prln = new Printstmt();
