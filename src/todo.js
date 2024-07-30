export class Todo{
    constructor(title, description, dueDate, project, completed = false, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.completed = completed;
    }
}

export const toDoList = [];
