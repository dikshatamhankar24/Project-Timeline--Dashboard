import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TimelineViewProps, TimelineTask } from "../../types/timeline.types";
import TimelineGrid from "./TimelineGrid";
import { useTimeline } from "../../hooks/useTimeline";
import { TaskDetailSidebar } from "./TaskDetailSidebar";
import "../../styles/global.css";
import "../../styles/animation.css";
import "./Timeline.css";

const teamColors = {
  "Frontend Team": "border-l-4 border-cyan-400",
  "Backend Team": "border-l-4 border-emerald-400",
  "Design Team": "border-l-4 border-fuchsia-400",
};

const TimelineView: React.FC<TimelineViewProps> = ({
  rows,
  tasks,
  startDate,
  endDate,
  viewMode,
  onTaskUpdate,
  onTaskMove,
}) => {
  const { pixelsPerDay, todayPosition } = useTimeline(startDate, endDate, viewMode);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [expandedTeams, setExpandedTeams] = useState<string[]>(rows.map((r) => r.id));
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const timelineContainerRef = useRef<HTMLDivElement | null>(null);
  const todayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollHandler = () => {
      if (todayRef.current && timelineContainerRef.current) {
        const scrollLeft = timelineContainerRef.current.scrollLeft || 0;
        todayRef.current.style.left = `${todayPosition - scrollLeft}px`;
      }
    };
    const container = timelineContainerRef.current;
    container?.addEventListener("scroll", scrollHandler);
    return () => container?.removeEventListener("scroll", scrollHandler);
  }, [todayPosition]);

  const toggleTeam = (rowId: string) => {
    setExpandedTeams((prev) =>
      prev.includes(rowId) ? prev.filter((id) => id !== rowId) : [...prev, rowId]
    );
  };

  // ✅ Fixed version — removed the stray brace and added proper block
  const handleTaskUpdateWrapper = (taskId: string, updates: Partial<TimelineTask>) => {
    onTaskUpdate(taskId, updates);
  };

  const handleTaskMoveWrapper = (taskId: string, newStartDate: Date) => {
    const task = tasks[taskId];
    if (task) onTaskMove(taskId, task.rowId, newStartDate);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Delete this task?")) onTaskUpdate(taskId, { title: "[deleted]" });
  };

  const handleTaskClick = (task: TimelineTask) => {
    setSelectedTaskId(task.id);
    if (window.innerWidth < 768) setShowSidebar(false);
  };

  const selectedTask = selectedTaskId ? tasks[selectedTaskId] : undefined;
  const tasksArray = Object.values(tasks);

  return (
    <div className="flex flex-col md:flex-row w-full h-full min-h-[650px] rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 shadow-xl">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md">
        <h2 className="text-lg font-semibold">Teams</h2>
        <button
          onClick={() => setShowSidebar(!showSidebar)}
          className="bg-white text-blue-600 rounded-md px-3 py-1 text-sm font-medium shadow-sm hover:bg-slate-100"
        >
          {showSidebar ? "Hide" : "Show"}
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.aside
            key="sidebar"
            initial={{ x: -250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -250, opacity: 0 }}
            transition={{ type: "spring", stiffness: 90, damping: 18 }}
            className="w-full md:w-72 shrink-0 bg-gradient-to-b from-blue-50 via-cyan-50 to-indigo-100 
                       dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
                       text-slate-800 dark:text-white border-r border-slate-300 dark:border-slate-700 py-5 overflow-y-auto"
          >
            <h2 className="px-5 pb-3 text-sm font-bold uppercase tracking-wider border-b border-slate-300 dark:border-slate-700 text-blue-700 dark:text-cyan-300">
              Teams
            </h2>

            {rows.map((row) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`mx-3 mt-3 rounded-xl border ${
                  teamColors[row.label as keyof typeof teamColors]
                } bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm`}
              >
                <button
                  onClick={() => toggleTeam(row.id)}
                  className="w-full flex justify-between items-center px-4 py-3 text-sm font-semibold hover:text-indigo-500 dark:hover:text-cyan-400"
                >
                  {row.label}
                  <span className="text-lg">{expandedTeams.includes(row.id) ? "▾" : "▸"}</span>
                </button>

                {expandedTeams.includes(row.id) && (
                  <ul className="px-4 pb-3 text-xs space-y-2 mt-2">
                    {row.tasks.map((taskId) => {
                      const task = tasks[taskId];
                      if (!task) return null;
                      return (
                        <motion.li
                          key={taskId}
                          whileHover={{ scale: 1.02 }}
                          className="flex flex-col gap-1 border-l-2 pl-3 pb-2 hover:bg-blue-100/60 dark:hover:bg-slate-700/40 rounded-md transition-all"
                          style={{ borderColor: task.color }}
                        >
                          <div className="flex justify-between items-center">
                            <span
                              className="font-medium text-[13px] cursor-pointer hover:text-blue-600 dark:hover:text-cyan-300 truncate"
                              onClick={() => handleTaskClick(task)}
                            >
                              {task.title}
                            </span>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-red-400 hover:text-red-600 text-xs font-bold"
                            >
                              ✕
                            </button>
                          </div>
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={task.progress}
                            onChange={(e) =>
                              onTaskUpdate(task.id, { progress: Number(e.target.value) })
                            }
                            className="w-full accent-blue-500"
                          />
                        </motion.li>
                      );
                    })}
                  </ul>
                )}
              </motion.div>
            ))}
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Timeline */}
      <motion.main
        ref={timelineContainerRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-1 overflow-x-auto relative bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-4"
      >
        {/* Header Dates */}
        <div className="sticky top-0 z-20 flex border-b border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md">
          {Array.from(
            { length: Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) },
            (_, i) => {
              const date = new Date(startDate);
              date.setDate(startDate.getDate() + i);
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              return (
                <div
                  key={i}
                  className={`min-w-[90px] text-xs sm:text-sm text-center py-3 border-r border-slate-300 dark:border-slate-700 font-semibold ${
                    isWeekend
                      ? "bg-gradient-to-t from-purple-400/40 to-indigo-500/60 text-white"
                      : "bg-white/20 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 hover:bg-blue-200/30 dark:hover:bg-slate-700/40 hover:text-indigo-800"
                  }`}
                >
                  <div>{date.toLocaleDateString("en-US", { month: "short", day: "2-digit" })}</div>
                  <div className="text-[10px] opacity-70">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                </div>
              );
            }
          )}
        </div>

        {/* Grid */}
        <div className="relative mt-4 min-h-[400px]">
          <TimelineGrid
            rows={rows}
            tasks={tasksArray}
            startDate={startDate}
            endDate={endDate}
            viewMode={viewMode}
            pixelsPerDay={pixelsPerDay}
            onTaskUpdate={handleTaskUpdateWrapper}
            onTaskMove={handleTaskMoveWrapper}
            selectedTaskId={selectedTaskId || undefined}
            onTaskClick={handleTaskClick}
          />

          {/* Today Line */}
          <motion.div
            ref={todayRef}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-0 bottom-0 border-l-2 border-pink-500 z-30"
          >
            <div className="absolute -top-4 left-[-14px] bg-pink-500 text-white text-[10px] px-1 rounded-b-md shadow-sm">
              Today
            </div>
          </motion.div>
        </div>
      </motion.main>

      {/* Detail Sidebar */}
      <AnimatePresence>
        {selectedTask && (
          <TaskDetailSidebar
            task={selectedTask}
            onClose={() => setSelectedTaskId(null)}
            onUpdate={(updates) => handleTaskUpdateWrapper(selectedTask.id, updates)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default TimelineView;
