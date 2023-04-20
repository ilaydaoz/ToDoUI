import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ITask } from 'src/app/model/ITask';
import { HttpClientService } from 'src/app/services/http-client.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {
todoForm! : FormGroup
tasks :ITask [] = [];
inprogress : ITask [] = [];
DueDate : ITask [] = [];


constructor(private fb: FormBuilder ,private readonly httpService:HttpClientService){}
  postToDo: ITask | undefined;

ngOnInit(): void{
  this.todoForm = this.fb.group({
    title :['', Validators.required],
  })
}
newToDo(): void{
  this.tasks.push({
    description:this.todoForm.value.title,
    DueDate:false,
    title:this.todoForm.value.title,
  })

  console.log(this.todoForm.value);
    this.httpService.Post(environment.apiUrl + "ToDoList", this.todoForm.value).subscribe(
      (res: any) => {
        this.postToDo = res.data as ITask;
        console.log(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

drop(event: CdkDragDrop<ITask[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }
}
}
