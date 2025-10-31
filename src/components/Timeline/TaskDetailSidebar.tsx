import React, { useState, useEffect } from "react";
import type { TimelineTask } from "../../types/timeline.types";

interface TaskDetailSidebarProps {
  task: TimelineTask;
  onClose: () => void;
  onUpdate: (task: TimelineTask) => void;
}

export const TaskDetailSidebar: React.FC<TaskDetailSidebarProps> = ({
  task,
  onClose,
  onUpdate,
}) => {
  const [localTask, setLocalTask] = useState(task);

  useEffect(() => {
    setLocalTask(task);
  }, [task]);

  const handleChange = (key: keyof TimelineTask, value: any) => {
    setLocalTask((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onUpdate(localTask);
    alert("✅ Task updated successfully!");
  };

  return (
    <div
      className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 
      shadow-2xl z-50 transform transition-all duration-500 ease-in-out animate-slideIn 
      overflow-y-auto border-l border-gray-300 dark:border-gray-700"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-5 py-4 bg-indigo-700 text-white shadow-md">
        <h2 className="text-lg font-semibold">Task Details</h2>
        <button
          onClick={onClose}
          className="text-white hover:text-yellow-300 text-xl"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        {/* Task Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            value={localTask.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 
            dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Assignee */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Assignee
          </label>
          <input
            type="text"
            value={localTask.assignee}
            onChange={(e) => handleChange("assignee", e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 
            dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Start & End Dates */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={localTask.startDate.toISOString().substring(0, 10)}
              onChange={(e) =>
                handleChange("startDate", new Date(e.target.value))
              }
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 
              dark:bg-gray-800 dark:text-white"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={localTask.endDate.toISOString().substring(0, 10)}
              onChange={(e) =>
                handleChange("endDate", new Date(e.target.value))
              }
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 
              dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Progress */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Progress ({localTask.progress}%)
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={localTask.progress}
            onChange={(e) => handleChange("progress", Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        {/* Color */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Task Color
          </label>
          <input
            type="color"
            value={localTask.color}
            onChange={(e) => handleChange("color", e.target.value)}
            className="w-16 h-8 border rounded-md cursor-pointer"
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-md 
            shadow-md font-semibold transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
