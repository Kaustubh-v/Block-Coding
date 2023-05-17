function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    console.log(ev.target.id);
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    var data = ev.dataTransfer.getData("text");
    var parent = document.getElementById("Canvas");
    parent.appendChild(document.getElementById(data));
    ev.preventDefault();
  }