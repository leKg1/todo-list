import { Request, Response } from 'express';
import { validate } from 'class-validator';
import { RegisterDto } from '../dto/RegisterDto';
import { LoginDto } from '../dto/LoginDto';
import { User } from '../entities/User';
import dataSource from '../ormconfig';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthController {
  static async register(req: Request, res: Response) {
    const dto = Object.assign(new RegisterDto(), req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    const userRepo = dataSource.getRepository(User);
    const existing = await userRepo.findOne({ where: [{ username: dto.username }, { email: dto.email }] });
    if (existing) {
      return res.status(409).json({ message: 'Username or email already exists' });
    }
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = userRepo.create({ ...dto, password: hashed, role: 'user' });
    await userRepo.save(user);
    return res.status(201).json({ message: 'User registered' });
  }

  static async login(req: Request, res: Response) {
    const dto = Object.assign(new LoginDto(), req.body);
    const errors = await validate(dto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    const userRepo = dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { username: dto.username } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    return res.json({ token, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
  }
} 