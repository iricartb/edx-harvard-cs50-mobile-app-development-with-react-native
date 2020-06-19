let oTodosElements = [];

const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const oList = document.getElementById('todo-list')
const oItemCountSpan = document.getElementById('item-count')
const oUncheckedCountSpan = document.getElementById('unchecked-count')

function renderTodo(oTodo) {
   const oLiElement = document.createElement('li');
   let sTodoChecked = '';
   
   if (oTodo.checked) sTodoChecked = 'checked';
   
   oLiElement.innerHTML = `
      <input type="checkbox" onChange="toggleTodo(` + oTodo.id + `)" ` + sTodoChecked + `>
      <button onClick="deleteTodo(` + oTodo.id + `)">delete</button>
      <span>` + oTodo.text + `</span>  
   `;

   return oLiElement;
}

function render() {
   oList.innerHTML = '';
   oTodosElements.map(renderTodo).forEach(oTodo => oList.appendChild(oTodo));
   
   oItemCountSpan.innerHTML = oTodosElements.length;
   oUncheckedCountSpan.innerHTML = oTodosElements.filter(oTodo => oTodo.checked === false).length;
   
   return false;
}

function addTodo(sName) {
   const oAddTodo = {
      id: oTodosElements.length + 1,
      text: sName,
      checked: false
   }
   
   oTodosElements.push(oAddTodo);
   
   return render();
}

function removeTodo(nId) {
   oTodosElements = oTodosElements.filter(oTodo => oTodo.id !== nId);
   
   return render();
}

function toggleTodo(nId) {
   let oToggleTodo = oTodosElements.filter(oTodo => oTodo.id === nId)[0];
   oToggleTodo.checked = !oToggleTodo.checked;
   
   return render();
}

// --- Main functions ---
function newTodo() {
   const sText = prompt("Please, insert the todo text");
   
   addTodo(sText);
}

function deleteTodo(nId) {
   removeTodo(nId);
}