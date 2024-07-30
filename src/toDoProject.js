import { Todo, toDoList } from "./todo";

export class toDoProject{
    constructor(toDoList, name){
        this.name = name;
        this.toDoList = toDoList;
    }
}