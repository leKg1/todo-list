import axios from 'axios';
import { Task } from '../store/tasksSlice';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export interface TaskCreatePayload {
  username: string;
  email: string;
  text: string;
}

export interface TaskUpdatePayload {
  text?: string;
  completed?: boolean;
}

export interface AuthPayload {
  username: string;
  password: string;
}

export const api = {
  async fetchTasks(params: { page?: number; limit?: number; sort?: string; order?: string }) {
    const res = await axios.get(`${API_URL}/tasks`, { params });
    return res.data as { tasks: Task[]; total: number };
  },
  async createTask(payload: TaskCreatePayload) {
    const res = await axios.post(`${API_URL}/tasks`, payload);
    return res.data;
  },
  async updateTask(id: number, payload: TaskUpdatePayload, token: string) {
    const res = await axios.put(`${API_URL}/tasks/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
  async login(payload: AuthPayload) {
    const res = await axios.post(`${API_URL}/auth/login`, payload);
    return res.data as { token: string; user: any };
  },
  async register(payload: AuthPayload & { email: string }) {
    const res = await axios.post(`${API_URL}/auth/register`, payload);
    return res.data;
  },
};
