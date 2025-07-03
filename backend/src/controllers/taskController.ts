import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { Task } from '../entities/Task';
import dataSource from '../ormconfig';
import { TaskCreateDto } from '../dto/TaskCreateDto';
import { TaskUpdateDto } from '../dto/TaskUpdateDto';

export class TaskController {
  static async create(req: Request, res: Response) {
    const dto = Object.assign(new TaskCreateDto(), req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    const taskRepo = dataSource.getRepository(Task);
    const task = taskRepo.create({ ...dto });
    await taskRepo.save(task);
    return res.status(201).json({ message: 'Task created', task });
  }

  static async list(req: Request, res: Response) {
    const { page = 1, limit = 3, sort = 'id', order = 'ASC' } = req.query;
    const taskRepo = dataSource.getRepository(Task);
    const [tasks, total] = await taskRepo.findAndCount({
      order: { [sort as string]: order as 'ASC' | 'DESC' },
      skip: (Number(page) - 1) * Number(limit),
      take: Number(limit),
    });
    return res.json({ tasks, total });
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const dto = Object.assign(new TaskUpdateDto(), req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    const taskRepo = dataSource.getRepository(Task);
    const task = await taskRepo.findOne({ where: { id } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    let editedByAdmin = false;
    if (dto.text && dto.text !== task.text) {
      editedByAdmin = true;
    }
    Object.assign(task, dto);
    if (editedByAdmin) {
      task.editedByAdmin = true;
    }
    await taskRepo.save(task);
    return res.json({ message: 'Task updated', task });
  }
} 