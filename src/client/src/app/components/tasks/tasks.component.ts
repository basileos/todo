import { Component, OnInit } from '@angular/core';
import { HttpService, TasksListResponse } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers:[DatePipe]
})
export class TasksComponent implements OnInit {
  tasks:Task[] = [];
  addTaskForm: FormGroup;
  loading = false;
  editedTask: Task = null;
  readonly DATE_FORMAT = "yyyy-MM-dd";

  constructor(
    private httpService: HttpService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.addTaskForm = this.formBuilder.group({
      description: ['', Validators.required],
      dueDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.loading = true;
    this.httpService.getTasks().pipe(finalize(()=> {
      this.loading = false;
    })).subscribe((res: TasksListResponse) => {
      this.tasks = res.items.map((item: Task) => {
        item.dueDate = this.datePipe.transform(item.dueDate, this.DATE_FORMAT);
        return item;
      });
    }, err => {
      console.warn(err);
    })
  }

  onSubmit() {
    this.handleTaskModifyRequest(this.editMode ? Action.Update : Action.Create);
  }

  onDelete() {
    this.handleTaskModifyRequest(Action.Delete);
  }

  handleTaskModifyRequest(action: Action) {
    this.loading = true;
    const payload = this.getPayload(action);
    this.getApiMethod(action).call(this.httpService, payload).pipe(finalize(()=> {
      this.loading = false;
    })).subscribe(res => {
      this.reset();
      this.getTasks();
    }, err => {
      console.warn(err);
    });
  }

  reset() {
    this.editedTask = null;
    this.addTaskForm.reset();
  }

  edit(task: Task) {
    this.editedTask = task;
    this.addTaskForm.setValue({
      description: task.description,
      dueDate: task.dueDate,
    })
  }

  get editMode() {
    return this.editedTask !== null;
  }

  get title() {
    return this.editMode ? 'Edit task:' : 'Create task';
  }

  getApiMethod(action: Action) {
    switch (action) {
      case Action.Create:
        return this.httpService.createTask;
      case Action.Update:
        return this.httpService.updateTask;
      case Action.Delete:
        return this.httpService.deleteTask;
    }
  }

  getPayload(action: Action) {
    switch (action) {
      case Action.Create:
        return Object.assign({}, this.addTaskForm.value);
      case Action.Update:
        return Object.assign({id: this.editedTask._id}, this.addTaskForm.value);
      case Action.Delete:
        return this.editedTask._id;
    }
  }

  get actionName() {
    return this.editMode ? 'Update Task' : 'Create Task';
  }

}

export interface Task {
  _id?: number;
  description: string;
  dueDate: string;
}

export enum Action {
  Create, Update, Delete
}
