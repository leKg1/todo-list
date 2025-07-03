import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setTasks, setLoading, setError } from '../store/tasksSlice';
import { logout } from '../store/authSlice';
import { api } from '../utils/api';
import { useAuth } from '../hooks/useAuth';
import { FaUserShield } from 'react-icons/fa';

const AdminPage: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state: RootState) => state.tasks);
  const { token, user } = useAuth();
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  const fetchTasks = async () => {
    dispatch(setLoading(true));
    try {
      const data = await api.fetchTasks({ page: 1, limit: 100, sort: 'id', order: 'ASC' });
      dispatch(setTasks({ tasks: data.tasks, total: data.total }));
      dispatch(setError(null));
    } catch (err: any) {
      dispatch(setError(err.message || 'Failed to fetch tasks'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleEdit = (taskId: number, text: string) => {
    setEditTaskId(taskId);
    setEditText(text);
    setSuccessMsg('');
  };

  const handleSave = async (taskId: number, completed: boolean) => {
    if (!token) return;
    try {
      await api.updateTask(taskId, { text: editText, completed }, token);
      setSuccessMsg('Task updated successfully!');
      setEditTaskId(null);
      fetchTasks();
    } catch (err: any) {
      dispatch(setError(err.response?.data?.message || 'Failed to update task'));
    }
  };

  const handleComplete = async (taskId: number, text: string) => {
    if (!token) return;
    try {
      await api.updateTask(taskId, { text, completed: true }, token);
      setSuccessMsg('Task marked as completed!');
      fetchTasks();
    } catch (err: any) {
      dispatch(setError(err.response?.data?.message || 'Failed to complete task'));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-200 flex flex-col items-center justify-center py-12 px-2">
      <main className="w-full max-w-2xl mx-auto flex flex-col gap-12">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col gap-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-extrabold text-blue-700 flex items-center gap-3 drop-shadow-lg">
              {React.createElement(FaUserShield as any, { className: "text-blue-500 text-3xl" })}
              Admin Dashboard
              <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full shadow">ADMIN</span>
            </h1>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-full font-semibold shadow transition" onClick={handleLogout}>Logout</button>
          </div>
          {successMsg && <div className="text-green-700 bg-green-100 border border-green-300 rounded-xl px-4 py-2 text-center font-medium shadow-lg">{successMsg}</div>}
          {error && <div className="text-red-700 bg-red-100 border border-red-300 rounded-xl px-4 py-2 text-center font-medium shadow-lg">{error}</div>}
          {loading ? (
            <div className="flex justify-center py-12"><span className="loader"></span></div>
          ) : (
            <div className="space-y-6">
              {tasks.map(task => (
                <div key={task.id} className="border border-blue-100 rounded-2xl p-6 bg-white/90 shadow-xl flex flex-col gap-2 transition hover:scale-[1.01] hover:shadow-2xl">
                  <div className="font-semibold text-lg text-blue-800 flex items-center gap-2">{task.username} <span className="text-gray-500 text-base">({task.email})</span></div>
                  {editTaskId === task.id ? (
                    <>
                      <textarea
                        className="w-full border border-blue-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 text-lg shadow-sm transition"
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                      />
                      <div className="mt-2 flex items-center space-x-3">
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full font-semibold shadow transition"
                          onClick={() => handleSave(task.id, task.completed)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-full font-semibold shadow transition"
                          onClick={() => setEditTaskId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mt-1 text-gray-700 text-base">{task.text}</div>
                      <div className="mt-2 flex items-center space-x-3">
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-full font-semibold shadow transition"
                          onClick={() => handleEdit(task.id, task.text)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full font-semibold shadow transition"
                          disabled={task.completed}
                          onClick={() => handleComplete(task.id, task.text)}
                        >
                          {task.completed ? 'Completed' : 'Mark as Done'}
                        </button>
                        {task.completed && <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">✔ Done</span>}
                        {task.editedByAdmin && <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">✎ Edited by admin</span>}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
