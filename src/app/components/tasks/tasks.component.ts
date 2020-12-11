import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.sass']
})
export class TasksComponent implements OnInit {
  searchText='';

  editForm=false;
  myTask:Task = {
    label:'',
    complated:false,
  }
  tasks: Task[]=[];
  resultTasks: Task[]=[];
  constructor(private taskService:TaskService) { }

  ngOnInit(): void {
    this.getTasks();
  }
getTasks(){
  this.taskService.findall().subscribe(tasks =>{
    this.resultTasks=this.tasks=tasks;
  })
}
deleteTask(id){
  this.taskService.delete(id).subscribe(()=>{
    this.tasks=this.tasks.filter(task=> task.id != id)
  }) 
}
persistTask(){
  this.taskService.persist(this.myTask).subscribe((task)=>{
    this.tasks=[task, ...this.tasks];
    this.resetTask();
  })
 
}
resetTask(){
  this.myTask={
    label:'',
    complated:false,
  }
}
toggleComplated(task){
this.taskService.complated(task.id,task.complated).subscribe(()=>{
  task.complated= !task.complated
})
}
editTask(task){
  this.myTask=task;
  this.editForm=true;
}
updateTask(task){
  this.taskService.update(this.myTask).subscribe(()=>{
    this.resetTask();
    this.editForm=false;
  })
}
searchTasks(){
  this.resultTasks =this.tasks.filter((task)=>task.label.includes(this.searchText));
}

}
