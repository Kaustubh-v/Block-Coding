
export function dragElement(elmnt) {
  console.log("elmnt  = "+ elmnt.textContent);
    var down = 0;
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  var header = document.getElementById("Blockheader");
  console.log(header.textContent);
  if (header) {
    console.log("header is there");
    // if present, the header is where you move the DIV from:
    header.addEventListener("mousedown" , dragMouseDown);
  }
//   } else {
//     // otherwise, move the DIV from anywhere inside the DIV:
//     elmnt.onmousedown = dragMouseDown;
//   }

  function dragMouseDown(e) {
    e.preventDefault();
    down = 1
    // get the mouse cursor position at startup:     topleft:345,25  topright :
    pos3 = e.clientX;
    pos4 = e.clientY;
    // call a function whenever the cursor moves:
    document.addEventListener("mouseup" , closeDragElement);
    if(down == 1){
    document.addEventListener("mousemove" , elementDrag);

    }
}

  function elementDrag(e) {
    e.preventDefault();
    if(down == 1){
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    console.log("pos1 = "+ pos1 + " pos2 = " + pos2+" pos3 = "+ pos3 + " pos4 = " + pos4);
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    else{
        document.onmousedown = null;
        document.onmousemove = null;
    }
  }

  function closeDragElement() {
    elmnt.onmousedown = null;
    document.onmousemove =null;
    elmnt.onmouseup= null;
    down = 0;
  }
}

