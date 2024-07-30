import './style.css';
import {toDoList, Todo} from './todo.js';
import { toDoProject } from './toDoProject.js';

const form = document.getElementById("todo");
let projectList = [];
projectList.push(toDoList);

if (!localStorage.getItem("array")){
    populateStorage()
}else{
    setStyle();
}


form.addEventListener("submit", ()=>{
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const duedate = document.getElementById('duedate').value;
    const project = parseInt(document.getElementById("projects").value);
    const newTodo = new Todo(title, description, duedate, project);
    var tempLog = projectList[newTodo.project];
    tempLog.push(newTodo);
    updateDisplay(projectList); 
    populateStorage();
})



function updateDisplay(projectList){
    const toDoListDisplay = document.querySelector(".toDoListDisplay");
    const removeContent = document.querySelector(".toDoListDisplay");
        while (removeContent.hasChildNodes()){
            removeContent.removeChild(removeContent.firstChild);
        }

    for(let i =0; i<projectList.length;i++){
        if (projectList[i] === undefined){
            return;
        }
        const newDiv = document.createElement('div');
        toDoListDisplay.appendChild(newDiv);
        const titleContent = document.getElementById('projects').options[i];
        const newHeader = document.createElement('div');
        newHeader.textContent = titleContent.textContent;
        newDiv.className = "ProjectCard"
        newDiv.appendChild(newHeader);
        

        for(let j=0; j<projectList[i].length; j++){
            const div = document.createElement("div");
            const removeButton = document.createElement('button');
            var checkBox = document.createElement('input');
            
            checkBox.type = 'checkbox';
            checkBox.checked=projectList[i][j].completed;
            checkBox.addEventListener("change", ()=>{
                if(projectList[i][j].completed===false){
                    projectList[i][j].completed=true;
                }else{projectList[i][j].completed=false;}
                populateStorage();
            })

            removeButton.textContent = "X";
            removeButton.addEventListener('click', ()=>{
                div.parentNode.removeChild(div);
                projectList[i].splice(j, 1);
                populateStorage(); 
            } 


            )
            div.addEventListener('mouseenter', ()=>{
                div.appendChild(removeButton);
            })
            div.addEventListener('mouseleave', ()=>{
                div.removeChild(removeButton);
            })
            div.textContent = `${projectList[i][j].dueDate} Task: ${projectList[i][j].title}
             --- ${projectList[i][j].description}`;
            newDiv.appendChild(div);

            newDiv.appendChild(checkBox);
            div.prepend(checkBox);
        }
    }
}


const addProject = document.getElementById("addProject");
const addProjectForm = document.getElementById("newProject");

addProjectForm.addEventListener("submit", ()=>{
    event.preventDefault();
    
    const option = document.createElement("option");
    const select = document.getElementById("projects");
    const projectName = document.getElementById("project").value;
    option.value = (select.children.length);
    option.textContent = `${projectName}`;
    select.appendChild(option);
    const newList = [];
    projectList.push(newList);
    populateStorage();
})


class selectObject{
    constructor(value, name){
        this.value=value;
        this.name=name;
    }
}

function populateStorage(){
    localStorage.setItem("array", JSON.stringify(projectList))
    
    const selectArray=[];  
    const select = document.getElementById("projects");
    for (let i=0; i<select.children.length; i++){
        
        const name = document.getElementById('projects').options[i].textContent;
        const newSelect = new selectObject(i, name);

        selectArray.push(newSelect)
    }
    console.log(JSON.parse(localStorage.getItem("array")))
    localStorage.setItem("selectArray", JSON.stringify(selectArray))
    
}

function setStyle(){
    const array = JSON.parse(localStorage.getItem("array"))
    projectList = array;
    const selectArray = JSON.parse(localStorage.getItem("selectArray"))
    for (let i=1; i<array.length; i++){
        const option = document.createElement("option")
        const select = document.getElementById("projects")
        option.value = selectArray[i].value;
        option.textContent = selectArray[i].name;
        select.appendChild(option);
    }
    updateDisplay(projectList);
    console.log(array);
}


