import './style.css';
import {toDoList, Todo} from './todo.js';
import { toDoProject } from './toDoProject.js';

const form = document.getElementById("todo");
const projectList = [];
projectList.push(toDoList);


form.addEventListener("submit", ()=>{
    event.preventDefault();
    console.log('hello');
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const duedate = document.getElementById('duedate').value;
    const project = parseInt(document.getElementById("projects").value);

    const newTodo = new Todo(title, description, duedate, project);
    console.log(newTodo);
    var tempLog = projectList[newTodo.project];
    console.log(newTodo.project);
    tempLog.push(newTodo);
    console.log(projectList);
    updateDisplay(projectList); 

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

            removeButton.textContent = "X";
            removeButton.addEventListener('click', ()=>{
                div.parentNode.removeChild(div);
                toDoList.splice(i, 1); 
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
})



