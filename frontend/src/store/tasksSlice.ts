import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: number;
  username: string;
  email: string;
  text: string;
  completed: boolean;
  editedByAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface TasksState {
  tasks: Task[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  total: 0,
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action: PayloadAction<{ tasks: Task[]; total: number }>) {
      state.tasks = action.payload.tasks;
      state.total = action.payload.total;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setTasks, setLoading, setError } = tasksSlice.actions;
export default tasksSlice.reducer;
