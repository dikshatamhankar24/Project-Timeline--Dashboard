import { useState} from "react";
import TimelineView from "./components/Timeline/TimelineView";
import type { TimelineRow, TimelineTask } from "./types/timeline.types";
import { Modal } from "./components/primitives/Modal";
import { Button } from "./components/primitives/Button";
import Input from "./components/primitives/Input";
import Select from "./components/primitives/Select";

import "./styles/global.css";
import "./styles/animation.css";
import "./App.css";

// ✅ force clear old data once for debugging
localStorage.removeItem("timeline-rows");
localStorage.removeItem("timeline-tasks");

const initialRows: TimelineRow[] = [
  { id: "row-1", label: "Frontend Team", tasks: ["task-1", "task-2"] },
  { id: "row-2", label: "Backend Team", tasks: ["task-3"] },
  { id: "row-3", label: "Design Team", tasks: ["task-4"] }, // ✅ ensure task-4 exists here
];

const initialTasks: Record<string, TimelineTask> = {
  "task-1": {
    id: "task-1",
    title: "UI Component Development",
    startDate: new Date(2024, 9, 1),
    endDate: new Date(2024, 9, 8),
    progress: 50,
    rowId: "row-1",
    dependencies: [],
    color: "#3b82f6",
    isMilestone: false,
    assignee: "Frontend Team", // added missing property
  },
  "task-2": {
    id: "task-2",
    title: "Unit Testing",
    startDate: new Date(2024, 9, 10),
    endDate: new Date(2024, 9, 15),
    progress: 10,
    rowId: "row-1",
    dependencies: ["task-1"],
    color: "#0ea5e9",
    isMilestone: false,
    assignee: "Frontend Team", // added missing property
  },
  "task-3": {
    id: "task-3",
    title: "API Integration",
    startDate: new Date(2024, 9, 1),
    endDate: new Date(2024, 9, 20),
    progress: 60,
    rowId: "row-2",
    dependencies: [],
    color: "#10b981",
    isMilestone: false,
    assignee: "Backend Team", // added missing property
  },
    "task-4": {
    id: "task-4",
    title: "Design Handoff",
    startDate: new Date(2024, 9, 5),
    endDate: new Date(2024, 9, 10),
    progress: 100,
    rowId: "row-3",
    dependencies: [],
    color: "#f59e0b",
    isMilestone: false,
    assignee: "Design Team", // added missing property
  },

};

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export default function App() {
  const [rows, setRows] = useState<TimelineRow[]>(initialRows);
  const [tasks, setTasks] = useState<Record<string, TimelineTask>>(initialTasks);
  const [darkMode, setDarkMode] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(9);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [newTask, setNewTask] = useState({
    title: "",
    rowId: "row-1",
    startDate: "",
    endDate: "",
    color: "#3b82f6",
  });

  const startDate = new Date(selectedYear, selectedMonth, 1);
  const endDate = new Date(selectedYear, selectedMonth + 1, 0);

  const handleTaskUpdate = (taskId: string, updates: Partial<TimelineTask>) =>
    setTasks((prev) => ({ ...prev, [taskId]: { ...prev[taskId], ...updates } }));

  const handleTaskMove = (taskId: string, newRowId: string, newStartDate: Date) => {
    setTasks((prev) => {
      const t = prev[taskId];
      if (!t) return prev;
      const newEnd = new Date(newStartDate.getTime() + (t.endDate.getTime() - t.startDate.getTime()));
      return { ...prev, [taskId]: { ...t, startDate: newStartDate, endDate: newEnd, rowId: newRowId } };
    });
  };

  const addNewTask = () => {
    if (!newTask.title || !newTask.startDate || !newTask.endDate) {
      alert("Please fill all fields!");
      return;
    }
    const id = `task-${Date.now()}`;
    const task: TimelineTask = {
  id: "task-id",
  title: "Task title",
  startDate: new Date("2024-10-01"),
  endDate: new Date("2024-10-07"),
  progress: 0,
  rowId: "row-1",
  dependencies: [],
  color: "#3b82f6",
  isMilestone: false,
  assignee: "Frontend Team"  // Required property added to fix error
};

    setTasks((prev) => ({ ...prev, [id]: task }));
    setRows((prev) =>
      prev.map((r) =>
        r.id === newTask.rowId ? { ...r, tasks: [...r.tasks, id] } : r
      )
    );
    setNewTask({ title: "", rowId: "row-1", startDate: "", endDate: "", color: "#3b82f6" });
    setOpenModal(false);
  };

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else setSelectedMonth((m) => m - 1);
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else setSelectedMonth((m) => m + 1);
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-indigo-50 via-white to-blue-100 text-gray-900"
      }`}
    >
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 pt-6 pb-4">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-indigo-500">Project Timeline</span> / Gantt
          </h1>
          <p className="text-sm opacity-80">Manage your tasks efficiently</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setOpenModal(true)} className="bg-indigo-600 hover:bg-indigo-700">
            ➕ Add Task
          </Button>
          <Button onClick={() => setDarkMode(!darkMode)} className="bg-gray-800 border text-sm">
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </Button>
        </div>
      </header>

      {/* Month Controls */}
      <div className="flex justify-center gap-4 mb-4">
        <Button onClick={handlePrevMonth}>⏮ Prev</Button>
        <span className="text-lg font-semibold">
          {months[selectedMonth]} {selectedYear}
        </span>
        <Button onClick={handleNextMonth}>Next ⏭</Button>
      </div>

      <main className="p-4">
        <div
          className={`rounded-2xl shadow-xl border ${
            darkMode ? "border-gray-700 bg-slate-800/70" : "border-gray-200 bg-white/80"
          }`}
        >
          <TimelineView
            rows={rows}
            tasks={tasks}
            startDate={startDate}
            endDate={endDate}
            viewMode="week"
            onTaskUpdate={handleTaskUpdate}
            onTaskMove={handleTaskMove}
          />
        </div>
      </main>

      {/* Add Task Modal */}
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title="Add Task">
        <div className="space-y-4">
          <Input
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <Select
            options={rows.map((r) => ({ label: r.label, value: r.id }))}
            value={newTask.rowId}
            onChange={(e) => setNewTask({ ...newTask, rowId: e.target.value })}
          />
          <div className="flex gap-2">
            <Input
              type="date"
              value={newTask.startDate}
              onChange={(e) => setNewTask({ ...newTask, startDate: e.target.value })}
            />
            <Input
              type="date"
              value={newTask.endDate}
              onChange={(e) => setNewTask({ ...newTask, endDate: e.target.value })}
            />
          </div>
          <Input
            type="color"
            value={newTask.color}
            onChange={(e) => setNewTask({ ...newTask, color: e.target.value })}
          />
          <div className="flex justify-end gap-2">
            <Button onClick={() => setOpenModal(false)} className="bg-gray-500 hover:bg-gray-600">
              Cancel
            </Button>
            <Button onClick={addNewTask} className="bg-indigo-600 hover:bg-indigo-700">
              Save Task
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
