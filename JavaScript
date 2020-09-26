var closeButns = document.getElementsByClassName("fa fa-close");
for (var i=0; i<closeButns.length; i++) {
  closeButns[i].onclick = function() {
    var parent = this.parentElement;
    parent.style.display = "none";
  };
}

function EditTask(id) {
  if (id.className == "fa fa-edit") {
    // codes for going to edit mode
    var parent = id.parentElement;
    //parent.className = "editMode";
    var input = parent.querySelector("input[type='text']");
    var label = parent.querySelector("label");
    label.classList.toggle("editMode");
    input.classList.toggle("savedMode");
    input.value = label.innerText;
    var edit = parent.querySelector(".fa-edit");
    //edit.className = "saveButn";
    edit.className = "fa fa-save";
  } else if (id.className == "fa fa-save") {
    // codes for saving
    var parent = id.parentElement;
    var input = parent.querySelector("input[type='text']");
    var label = parent.querySelector("label");
    label.innerText = input.value;
    label.classList.toggle("editMode");
    input.classList.toggle("savedMode");
    //input.classList.toggle("savedMode");
    var save = parent.querySelector(".fa-save");
    save.className = "fa fa-edit";
  }
}

// following codes can also be used instead of above codes for EditTask but the onclick="EditTask(this)" should be removed from HTML editButn buttons.
/* var editButns = document.getElementsByClassName("editButn");
for (j=0; j<editButns.length; j++) {  
  editButns[j].onclick = function() {    
    if (this.innerText == "E") {      
      // codes for going to edit mode      
      var parent = this.parentElement;      
      //parent.className = "editMode";      
      var input = parent.querySelector("input[type='text']");      
      var label = parent.querySelector("label");      
      label.classList.toggle("editMode");      
      input.classList.toggle("savedMode");      
      input.value = label.innerText;      
      var edit = parent.querySelector("span[class='editButn']");      
      //edit.className = "saveButn";      
      edit.innerText = "S";    
    } else if (this.innerText == "S") {      
      // codes for saving      
      var parent = this.parentElement;      
      var input = parent.querySelector("input[type='text']");      
      var label = parent.querySelector("label");      
      label.innerText = input.value;      
      label.classList.toggle("editMode");      
      input.classList.toggle("savedMode");      
      //input.classList.toggle("savedMode");      
      var save = parent.querySelector("span[class='editButn']");      
      save.innerText = "E";    
    }  
  }
}  */
  
function checking(checkBox, parentList) {
  //listItem = id.parentElement;
  //list = listItem.parentElement;
  if (parentList.id == "incomplete") {
    // codes for going from incomplete to completed
    var listItem = checkBox.parentElement;
    destinationList = document.getElementById("completed");
    destinationList.appendChild(listItem);
  } else if (parentList.id == "completed") {
    // codes for returning from completed to incomplete
    var listItem = checkBox.parentElement;
    destinationList = document.getElementById("incomplete");
    destinationList.appendChild(listItem);
  }
}

function addTask() {
  var inputTask = document.getElementById("inputTask").value;
  if (inputTask == "") {
    alert("Please enter a task!");
  } else {
    var li = document.createElement("li");
    var checkBox = document.createElement("input");
    checkBox.type = "checkBox";
    checkBox.className = "checkBox";
    var label = document.createElement("label");
    label.innerText = inputTask;
    var text = document.createElement("input");
    text.type = "text";
    text.className = "savedMode";
    var closeButn = document.createElement("i");
    closeButn.className = "fa fa-close";
    //closeButn.innerText = "X";
    var editButn = document.createElement("i");
    editButn.className = "fa fa-edit";
    //editButn.innerText = "E";
    li.appendChild(checkBox); li.appendChild(label); li.appendChild(text);
    li.appendChild(closeButn); li.appendChild(editButn);
    var last = document.getElementById("incomplete").appendChild(li);
    closeButn.onclick = function() {
      var parent = this.parentElement;
      parent.style.display = "none";
    };
    
    editButn.onclick = function() {EditTask(this)};
    checkBox.onchange = function() {checking(this, this.parentElement.parentElement)};
  }
  document.getElementById("inputTask").value = "";
}

//Extension: add tool tips to add, close, edit and save buttons
