import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarApp() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("pro");
  const [workHours, setWorkHours] = useState({});

  const handleAddTask = () => {
    const dateKey = selectedDate.toDateString();
    const dayTasks = tasks[dateKey] || [];
    setTasks({
      ...tasks,
      [dateKey]: [...dayTasks, { text: newTask, category }],
    });
    setNewTask("");
  };

  const handleHoursChange = (e) => {
    setWorkHours({
      ...workHours,
      [selectedDate.toDateString()]: e.target.value,
    });
  };

  const dateKey = selectedDate.toDateString();
  const dayTasks = tasks[dateKey] || [];

  return (
    <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2">
      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-bold mb-2">Calendrier</h2>
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          calendarType="US"
        />
      </div>

      <div className="bg-white shadow rounded p-4">
        <h2 className="text-xl font-bold mb-2">Tâches du {selectedDate.toDateString()}</h2>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Nouvelle tâche"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="border rounded px-2 py-1 flex-1"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded px-2"
          >
            <option value="pro">Pro</option>
            <option value="perso">Perso</option>
          </select>
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-3 rounded"
          >
            Ajouter
          </button>
        </div>

        <div className="mb-2">
          <label className="block text-sm">Amplitude de travail (ex: 9h-17h)</label>
          <input
            type="text"
            placeholder="9h-17h"
            value={workHours[dateKey] || ""}
            onChange={handleHoursChange}
            className="border rounded px-2 py-1 w-full"
          />
        </div>

        <ul>
          {dayTasks.map((task, index) => (
            <li
              key={index}
              className={`p-2 rounded mb-1 ${
                task.category === "pro" ? "bg-blue-100" : "bg-green-100"
              }`}
            >
              {task.text} <span className="text-xs">({task.category})</span>
            </li>
          ))}
        </ul>

        {dayTasks.length === 0 && <p>Aucune tâche pour ce jour.</p>}
      </div>
    </div>
  );
}
