import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setTasks, setLoading, setError } from '../store/tasksSlice';
import { api } from '../utils/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import Pagination from '../components/Pagination';
import SortHeader from '../components/SortHeader';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../store/authSlice';
import { FaTasks } from 'react-icons/fa';

const PAGE_SIZE = 3;
const SORTABLE_COLUMNS = [
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'completed', label: 'Status' },
];

type SortOrder = 'ASC' | 'DESC';

const TaskListPage: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, total, loading, error } = useSelector((state: RootState) => state.tasks);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('username');
  const [order, setOrder] = useState<SortOrder>('ASC');
  const [creating, setCreating] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const dispatchRedux = useDispatch();

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [page, sort, order]);

  const fetchTasks = async () => {
    dispatch(setLoading(true));
    try {
      const data = await api.fetchTasks({ page, limit: PAGE_SIZE, sort, order });
      dispatch(setTasks({ tasks: data.tasks, total: data.total }));
      dispatch(setError(null));
    } catch (err: any) {
      dispatch(setError(err.message || 'Failed to fetch tasks'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCreate = async (data: { username: string; email: string; text: string }) => {
    setCreating(true);
    setSuccessMsg('');
    try {
      await api.createTask(data);
      setSuccessMsg('Task created successfully!');
      fetchTasks();
    } catch (err: any) {
      dispatch(setError(err.response?.data?.message || 'Failed to create task'));
    } finally {
      setCreating(false);
    }
  };

  const handleHeaderAuth = () => {
    if (user && token) {
      dispatchRedux(logout());
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200 flex flex-col items-center justify-center py-12 px-2">
      {/* Header Bar */}
      <header className="w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-md shadow-xl flex items-center justify-between px-8 py-5 mb-10 rounded-2xl">
        <span className="flex items-center gap-3 text-3xl font-extrabold text-blue-700 tracking-tight drop-shadow-lg">
          {React.createElement(FaTasks as any, { className: "text-blue-500 text-4xl" })}
          ToDo List
        </span>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold shadow-lg transition-all duration-200 text-lg"
          onClick={handleHeaderAuth}
        >
          {user && token ? 'Logout' : 'Admin Login'}
        </button>
      </header>
      {/* Main Content */}
      <main className="w-full max-w-2xl mx-auto flex flex-col gap-12">
        {/* Task Form Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col gap-6">
          <h2 className="text-3xl font-bold mb-4 text-blue-700 flex items-center gap-3 drop-shadow">
            {React.createElement(FaTasks as any, { className: "text-blue-400 text-2xl" })} Create a new task
          </h2>
          <TaskForm onSubmit={handleCreate} loading={creating} />
          {successMsg && <div className="text-green-700 bg-green-100 border border-green-300 rounded-xl mt-6 px-4 py-2 text-center font-medium shadow-lg">{successMsg}</div>}
          {error && <div className="text-red-700 bg-red-100 border border-red-300 rounded-xl mt-6 px-4 py-2 text-center font-medium shadow-lg">{error}</div>}
        </div>
        {/* Task List Card */}
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-2">
            <h2 className="text-3xl font-bold text-blue-700 flex items-center gap-3 drop-shadow">
              {React.createElement(FaTasks as any, { className: "text-blue-400 text-2xl" })} Tasks
            </h2>
            <SortHeader
              currentSort={sort}
              currentOrder={order}
              onSortChange={(s, o) => {
                setSort(s);
                setOrder(o);
                setPage(1);
              }}
              columns={SORTABLE_COLUMNS}
            />
          </div>
          {loading ? (
            <div className="flex justify-center py-12"><span className="loader"></span></div>
          ) : tasks.length === 0 ? (
            <div className="text-center text-gray-400 py-12 flex flex-col items-center gap-2">
              {React.createElement(FaTasks as any, { className: "text-5xl text-blue-200" })}
              No tasks yet. Be the first to add one!
            </div>
          ) : (
            <TaskList tasks={tasks} />
          )}
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      </main>
    </div>
  );
};

export default TaskListPage;
