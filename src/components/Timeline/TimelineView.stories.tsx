import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Meta, StoryObj } from "@storybook/react";
import TimelineView from "./TimelineView";
import type { TimelineTask, TimelineRow } from "../../types/timeline.types";
import { TaskDetailSidebar } from "./TaskDetailSidebar";

const meta: Meta<typeof TimelineView> = {
  title: "Timeline/Full Dashboard Editable",
  component: TimelineView,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;
type Story = StoryObj<typeof TimelineView>;

export const FullDashboard: Story = {
  render: () => {
    const [dark, setDark] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(9);
    const [rows, setRows] = useState<TimelineRow[]>([
      { id: "row-1", label: "Frontend Team", tasks: ["task-1", "task-2"] },
      { id: "row-2", label: "Backend Team", tasks: ["task-3"] },
      { id: "row-3", label: "Design Team", tasks: ["task-4"] },
    ]);

    const [tasks, setTasks] = useState<Record<string, TimelineTask>>({
      "task-1": {
        id: "task-1",
        title: "UI Component Development",
        startDate: new Date(2024, 9, 1),
        endDate: new Date(2024, 9, 6),
        progress: 50,
        assignee: "Frontend Team",
        rowId: "row-1",
        dependencies: [],
        color: "#3b82f6",
        isMilestone: false,
      },
      "task-2": {
        id: "task-2",
        title: "State Management Setup",
        startDate: new Date(2024, 9, 7),
        endDate: new Date(2024, 9, 12),
        progress: 30,
        assignee: "Frontend Team",
        rowId: "row-1",
        dependencies: [],
        color: "#06b6d4",
        isMilestone: false,
      },
      "task-3": {
        id: "task-3",
        title: "API Integration",
        startDate: new Date(2024, 9, 3),
        endDate: new Date(2024, 9, 14),
        progress: 65,
        assignee: "Backend Team",
        rowId: "row-2",
        dependencies: [],
        color: "#10b981",
        isMilestone: false,
      },
      "task-4": {
        id: "task-4",
        title: "Design Review",
        startDate: new Date(2024, 9, 10),
        endDate: new Date(2024, 9, 13),
        progress: 90,
        assignee: "Design Team",
        rowId: "row-3",
        dependencies: [],
        color: "#f59e0b",
        isMilestone: false,
      },
    });

    const [selectedTask, setSelectedTask] = useState<TimelineTask | null>(null);

    const start = new Date(2024, currentMonth, 1);
    const end = new Date(2024, currentMonth + 1, 0);

    const handlePrev = () => setCurrentMonth((m) => (m > 0 ? m - 1 : 11));
    const handleNext = () => setCurrentMonth((m) => (m < 11 ? m + 1 : 0));

    // ✅ Add + Open Sidebar for edit
    const handleAddTask = () => {
      const id = `task-${Object.keys(tasks).length + 1}`;
      const newTask: TimelineTask = {
        id,
        title: "",
        startDate: new Date(2024, currentMonth, 10),
        endDate: new Date(2024, currentMonth, 15),
        progress: 0,
        assignee: "Frontend Team",
        rowId: "row-1",
        dependencies: [],
        color: "#6366f1",
        isMilestone: false,
      };

      setTasks((prev) => ({ ...prev, [id]: newTask }));
      setRows((prev) =>
        prev.map((r) =>
          r.id === "row-1" ? { ...r, tasks: [...r.tasks, id] } : r
        )
      );

      // 👉 Open sidebar instantly for editing
      setSelectedTask(newTask);
    };

    // ✅ Update any field live
    const handleTaskUpdate = (taskId: string, updates: Partial<TimelineTask>) => {
      setTasks((prev) => ({
        ...prev,
        [taskId]: { ...prev[taskId], ...updates },
      }));
    };

    const handleTaskMove = (taskId: string,  newStartDate: Date) => {
      const task = tasks[taskId];
      if (!task) return;
      const diff = task.endDate.getTime() - task.startDate.getTime();
      setTasks({
        ...tasks,
        [taskId]: {
          ...task,
          startDate: newStartDate,
          endDate: new Date(newStartDate.getTime() + diff),
        },
      });
    };

    const monthName = new Date(2024, currentMonth).toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    const bgGradient = dark
      ? "bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
      : "bg-gradient-to-b from-blue-50 via-indigo-50 to-blue-100";

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`${dark ? "dark text-white" : "text-slate-800"} ${bgGradient} min-h-screen transition-all duration-500`}
      >
        {/* HEADER */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center px-8 py-5 shadow-md border-b border-slate-200 dark:border-slate-700"
        >
          <div>
            <h1 className="text-3xl font-bold">
              <span className="text-blue-500">Project Timeline</span>{" "}
              <span className="text-slate-400">/ Dashboard</span>
            </h1>
            <p className="text-sm opacity-80">Add, edit & manage tasks visually</p>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddTask}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm shadow-md transition"
            >
              ➕ Add Task
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setDark(!dark)}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm shadow-md border border-white/30"
            >
              {dark ? "☀️ Light" : "🌙 Dark"}
            </motion.button>
          </div>
        </motion.header>

        {/* MONTH NAV */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrev}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm shadow-md"
          >
            ⏪ Prev
          </button>
          <span className="font-semibold text-lg">{monthName}</span>
          <button
            onClick={handleNext}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm shadow-md"
          >
            Next ⏩
          </button>
        </div>

        {/* MAIN TIMELINE */}
        <motion.div
          key={monthName}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="p-8"
        >
        <TimelineView
  rows={rows}
  tasks={tasks}
  startDate={start}
  endDate={end}
  viewMode="week"
  onTaskUpdate={handleTaskUpdate}
  onTaskMove={(id, _rowId, date) => handleTaskMove(id, date)}
/>

        </motion.div>

        {/* 🧩 Task Edit Sidebar */}
        <AnimatePresence>
          {selectedTask && (
            <TaskDetailSidebar
              task={selectedTask}
              onClose={() => setSelectedTask(null)}
              onUpdate={(updates) => {
                handleTaskUpdate(selectedTask.id, updates);
                setSelectedTask((prev) =>
                  prev ? { ...prev, ...updates } : prev
                );
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    );
  },
};
