import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import { 
  Trophy,
  Flame,
  Calendar,
  Award,
  Star,
  Medal,
  Lock
} from 'lucide-react';

const streakData = {
  currentStreak: 7,
  longestStreak: 14,
  totalCompletedDays: 45,
  streakHistory: [
    { date: '2024-03-01', streak: 3, completed: true },
    { date: '2024-03-02', streak: 4, completed: true },
    { date: '2024-03-03', streak: 5, completed: true },
    { date: '2024-03-04', streak: 6, completed: true },
    { date: '2024-03-05', streak: 7, completed: true },
    { date: '2024-03-06', streak: 8, completed: true },
    { date: '2024-03-07', streak: 9, completed: true },
  ],
  monthlyStreak: [
    { month: 'Jan', maxStreak: 5, avgStreak: 3 },
    { month: 'Feb', maxStreak: 8, avgStreak: 4 },
    { month: 'Mar', maxStreak: 14, avgStreak: 6 },
  ],
  achievements: [
    { id: 1, name: '3 Day Streak', achieved: true, icon: <Flame className="h-4 w-4" /> },
    { id: 2, name: '7 Day Streak', achieved: true, icon: <Trophy className="h-4 w-4" /> },
    { id: 3, name: '14 Day Streak', achieved: true, icon: <Award className="h-4 w-4" /> },
    { id: 4, name: '30 Day Streak', achieved: false, icon: <Star className="h-4 w-4" /> },
  ]
};

const getStreakColor = (streak) => {
  if (streak >= 14) return 'rgb(34, 197, 94)';
  if (streak >= 7) return 'rgb(59, 130, 246)';
  if (streak >= 3) return 'rgb(234, 179, 8)';
  return 'rgb(156, 163, 175)';
};

export default function StreakAnalysis() {
  const [selectedView, setSelectedView] = useState('current');

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Streak Analysis</CardTitle>
            <CardDescription>Track your homework completion streaks</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedView === 'current' ? 'default' : 'outline'}
              onClick={() => setSelectedView('current')}
              size="sm"
            >
              Current
            </Button>
            <Button
              variant={selectedView === 'history' ? 'default' : 'outline'}
              onClick={() => setSelectedView('history')}
              size="sm"
            >
              History
            </Button>
            <Button
              variant={selectedView === 'achievements' ? 'default' : 'outline'}
              onClick={() => setSelectedView('achievements')}
              size="sm"
            >
              Achievements
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="h-5 w-5 text-orange-500" />
                  <span className="font-medium">Current Streak</span>
                </div>
                <Badge 
                  variant="secondary"
                  className="text-lg"
                  style={{ color: getStreakColor(streakData.currentStreak) }}
                >
                  {streakData.currentStreak} days
                </Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">Longest Streak</span>
                </div>
                <Badge 
                  variant="secondary"
                  className="text-lg"
                  style={{ color: getStreakColor(streakData.longestStreak) }}
                >
                  {streakData.longestStreak} days
                </Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Total Days</span>
                </div>
                <Badge variant="secondary" className="text-lg">
                  {streakData.totalCompletedDays} days
                </Badge>
              </div>
            </div>
          </div>

          {selectedView === 'current' && (
            <div className="space-y-6">
              <div className="h-48 flex items-center justify-center">
                <div className="text-center">
                  <Flame 
                    className="h-16 w-16 mx-auto mb-2"
                    style={{ color: getStreakColor(streakData.currentStreak) }}
                  />
                  <div className="text-4xl font-bold mb-2">
                    {streakData.currentStreak} Day Streak!
                  </div>
                  <p className="text-muted-foreground">
                    Keep it up! You're on fire! 🔥
                  </p>
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={streakData.streakHistory}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="streak" fill="hsl(var(--primary))">
                    {streakData.streakHistory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getStreakColor(entry.streak)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {selectedView === 'history' && (
            <div className="space-y-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={streakData.monthlyStreak}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="maxStreak" 
                    stroke="hsl(var(--primary))" 
                    name="Max Streak"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgStreak" 
                    stroke="rgb(234, 179, 8)" 
                    name="Average Streak"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {selectedView === 'achievements' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {streakData.achievements.map(achievement => (
                <div 
                  key={achievement.id} 
                  className={`p-4 border rounded-lg ${
                    achievement.achieved ? 'bg-card' : 'bg-muted opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {achievement.icon}
                      <span className="font-medium">{achievement.name}</span>
                    </div>
                    {achievement.achieved ? (
                      <Medal className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Lock className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}