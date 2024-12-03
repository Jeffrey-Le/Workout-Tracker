import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import './chart.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
);

const ActivityTracker = () => {
  const [selectedDate, setSelectedDate] = useState(22);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 7 }, (_, i) => i + 18);

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Distance Covered',
        data: [8, 6, 9, 10, 7, 5, 8],
        borderColor: '#50a0e0',
        backgroundColor: 'rgba(80, 160, 224, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#50a0e0',
        pointRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(224, 224, 224, 0.1)',
        },
        ticks: {
          color: '#e0e0e0',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#e0e0e0',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(30, 30, 46, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 12,
        displayColors: false,
      },
    },
  };

  return (
    <div className="bg-[#222F59] p-5 rounded-2xl shadow-lg w-full" >
      <div className="text-white mb-4">
        <h1 className="text-xl font-bold">Activity Tracking</h1>
        <p className="text-sm text-gray-400">Thursday, 22 Sep</p>
      </div>

      {/* Calendar */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {days.map((day) => (
          <div key={day} className="text-center text-sm text-gray-400">
            {day}
          </div>
        ))}
        {dates.map((date) => (
          <div
            key={date}
            className={`text-center p-1 font-bold cursor-pointer ${
              date === selectedDate
                ? 'bg-[#5050a0] text-white rounded-full'
                : 'text-gray-300'
            }`}
            onClick={() => setSelectedDate(date)}
          >
            {date}
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-48 mb-6">
        <Line data={chartData} options={chartOptions} />
      </div>

    </div>
  );
};

export default ActivityTracker;