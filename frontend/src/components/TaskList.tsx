import React from 'react';
import { Task } from '../store/tasksSlice';
import { FaCheckCircle, FaEdit } from 'react-icons/fa';

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="space-y-8">
      {tasks.map((task) => (
        <div key={task.id} className="rounded-2xl p-6 bg-white/90 shadow-xl flex flex-col gap-2 transition hover:scale-[1.01] hover:shadow-2xl">
          <div className="font-semibold text-lg text-blue-800 flex items-center gap-2">{task.username} <span className="text-gray-500 text-base">({task.email})</span></div>
          <div className="mt-1 text-gray-700 text-base">{task.text}</div>
          <div className="mt-2 flex items-center space-x-3">
            {task.completed && <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">{React.createElement(FaCheckCircle as any, { className: "text-green-500 inline align-middle" })} Done</span>}
            {task.editedByAdmin && <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full shadow-sm">{React.createElement(FaEdit as any, { className: "text-blue-500 inline align-middle" })} Edited by admin</span>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
