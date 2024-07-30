export class Todo{
    constructor(title, description, dueDate, project, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
    }
}

export const toDoList = [];
