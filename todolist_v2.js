// Revisions in this version:
// HTML headings used starting from level 1
// "Add new task" section in HTML in a form instead of a div element. This way, clicking Enter key when inside input element also triggers the Add button.
// placeholder changed to an example task and a label "Task" is used.
// icon <i> elements are changed to button elements and <span> elements are used inside buttons.
// EditTask(id) function relying on button classes rather than on icon classes
// EditTask(id) function relying on button dataset attributes rather than on button classes
// in EditTask(id) function, one single class "toggleDisplay" used for displaying or hiding "input" and "label" elements when editing and saving instead of two classes "editMode" and "savedMode"
// when removing an item, really remove it instead of simply hiding it.
// use camelCase for all naming.
// use "remove" instead of "close" for naming when removing a task
// change naming of "checking()" function to "toggleTaskComplete()"
// in editTask(id) function, use a more descriptive input of "editButnElem" instead of a vague input "id"

var removeButns = document.getElementsByClassName("remove");
for (var i=0; i<removeButns.length; i++) {
  removeButns[i].onclick = function() {
    var parent = this.parentElement;
    parent.parentElement.removeChild(parent);
  };
}

function editTask(editButnElem) {
  if (editButnElem.dataset.mode == "edit") {
    // codes for going to edit mode
    var parent = editButnElem.parentElement;
    var input = parent.querySelector("input[type='text']");
    var label = parent.querySelector("label");
    label.classList.toggle("toggleDisplay");
    input.classList.toggle("toggleDisplay");
    input.value = label.innerText;
    var editButn = parent.querySelector(".edit");
    var editSpan = parent.querySelector(".fa-edit");
    editButn.dataset.mode = "save";
    editButn.className = "save";
    editSpan.className = "fa fa-save";
  } else if (editButnElem.dataset.mode == "save") {
    // codes for saving
    var parent = editButnElem.parentElement;
    var input = parent.querySelector("input[type='text']");
    var label = parent.querySelector("label");
    label.innerText = input.value;
    label.classList.toggle("toggleDisplay");
    input.classList.toggle("toggleDisplay");
    var saveButn = parent.querySelector(".save");
    saveButn.dataset.mode = "edit";
    saveButn.className = "edit";
    var saveSpan = parent.querySelector(".fa-save");
    saveSpan.className = "fa fa-edit";
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
  
function toggleTaskComplete(checkBox, parentList) {
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

function addTask(event) {
  event.preventDefault(); //because we're using a form, clicking refreshes the page by default and this prevents the addTask function to get hit. We prevent this default behavior in this line.
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
    text.className = "toggleDisplay";
    var removeButn = document.createElement("button");
    removeButn.className = "remove";
    var removeSpan = document.createElement("span");
    removeSpan.className = "fa fa-close";
    removeButn.appendChild(removeSpan);
    //closeButn.innerText = "X";
    var editButn = document.createElement("button");
    editButn.className = "edit";
    editButn.dataset.mode = "edit";
    var editSpan = document.createElement("span");
    editSpan.className = "fa fa-edit";
    editButn.appendChild(editSpan);
    //editButn.innerText = "E";
    li.appendChild(checkBox); li.appendChild(label); li.appendChild(text);
    li.appendChild(removeButn); li.appendChild(editButn);
    var last = document.getElementById("incomplete").appendChild(li);
    removeButn.onclick = function() {
      var parent = this.parentElement;
      parent.parentElement.removeChild(parent);
    };
    
    editButn.onclick = function() {editTask(this)};
    checkBox.onchange = function() {toggleTaskComplete(this, this.parentElement.parentElement)};
  }
  document.getElementById("inputTask").value = "";
}

//Extension: add tool tips to add, close, edit and save buttons
