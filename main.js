const inputTF = document.querySelector(".inputField input");
const addButton = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const clearAll = document.querySelector(".footer button")

inputTF.onkeyup = ()=>{
    let userInput = inputTF.value; //user input getter
    if(userInput.trim() != 0){ //checking if values are not only spaces
        addButton.classList.add("active"); //activates the add button
    }else{
        addButton.classList.remove("active"); //deactivates the add button
    }
}
showTasks(); //tasks getting its data locally = not deleted when refreshed

//button click events
addButton.onclick = ()=>{
    let userInput = inputTF.value; //user input getter
    let getLocalStorage = localStorage.getItem("New To Do"); 
    if(getLocalStorage == null){
        array = [];        
    }else{
        array = JSON.parse(getLocalStorage);
    }
    array.push(userInput); //adding user input
    localStorage.setItem("New To Do", JSON.stringify(array));
    showTasks();
    inputTF.value = ""; //autoclear after a task is added
    addButton.classList.remove("active");
}
//Function to add lists inside ul
function showTasks(){
    let getLocalStorage = localStorage.getItem("New To Do");
    if(getLocalStorage == null){
        array = [];        
    }else{
        array = JSON.parse(getLocalStorage);
    }
    const pendingNum = document.querySelector(".pendingNum");
    pendingNum.textContent = array.length;
    //clear all button activates when array is >0
    if(array.length >0){
        clearAll.classList.add("active");
    }else{
        clearAll.classList.remove("active");
    }

    let newliTag = '';
    array.forEach((element, index) => {
        newliTag += `<li> ${element} <span onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newliTag; //adding new li tag inside ul todoList
    
}

//delete function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New To Do");
    array = JSON.parse(getLocalStorage);
    array.splice(index, 1); //deleting
    //updating
    localStorage.setItem("New To Do", JSON.stringify(array));
    showTasks();
}

//delete all function
clearAll.onclick = ()=>{
    array = []; 
    localStorage.setItem("New To Do", JSON.stringify(array));
    showTasks();
}