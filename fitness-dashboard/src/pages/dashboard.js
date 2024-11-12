import React from 'react';
import { Activity, Bike, LogOut, User, Calendar, Clock, BarChart2 } from 'lucide-react';


const Dashboard = () => {
  const activities = [
    {
      date: "Thursday, Nov 11, 2024",
      type: "Run",
      metrics: [
        { label: "Miles", value: "6.00 mi" },
        { label: "Avg Pace", value: "7:22 /mi" }
      ],
      icon: Activity
    },
    {
      date: "Tuesday, Nov 9, 2024",
      type: "Yoga",
      metrics: [
        { label: "Time", value: "25m 36s" },
        { label: "Calories", value: "236 Cal" }
      ],
      icon: User
    },
    {
      date: "Monday, Nov 8, 2024",
      type: "Cycling",
      metrics: [
        { label: "Time", value: "30:00" },
        { label: "Avg Speed", value: "18.8 mi/h" },
        { label: "Distance", value: "10.00 mi" },
        { label: "Calories", value: "309 Cal" }
      ],
      icon: Bike
    }

  ];

  return (
    <>
      <div className="header">
        <h1 className="welcome-text">Welcome Back, Felipe J. F.</h1>
        <h2 className="activities-text">Activities in November, 2024</h2>
      </div>

      {/* Activity Cards Grid */}
      <div className="activity-cards">
        {activities.map((activity, index) => (
          <div key={index} className="activity-card">
            <div className="activity-header">
              <div>
                <p className="activity-date">{activity.date}</p>
                <h3 className="activity-type">{activity.type}</h3>
              </div>
              <activity.icon className="icon" />
            </div>
            
            <div className="activity-metrics">
              {activity.metrics.map((metric, idx) => (
                <div key={idx} className="metric">
                  <p className="metric-label">{metric.label}</p>
                  <p className="metric-value">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
