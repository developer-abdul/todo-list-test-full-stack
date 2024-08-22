import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  private tasks: Task[] = [
    {
      title: 'Create todo list',
      id: 1,
      status: true,
    },
  ];
  private iTaskCounter = 2;

  create(createTaskDto: CreateTaskDto) {
    this.tasks.push({
      ...createTaskDto,
      id: this.iTaskCounter++,
      status: false,
    });
    return this.tasks;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: number) {
    const task = this.tasks.find((task) => task.id === id);
    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((task) => task.id === id);
    task.status = updateTaskDto.status;
    return this.tasks;
  }

  remove(id: number) {
    const newTasks = this.tasks.filter((task) => task.id !== id);
    this.tasks = newTasks;
    return this.tasks;
  }
}
