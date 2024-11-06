import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AreaChart,
  Area,
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  ScatterChart,
  Scatter,
  CartesianGrid 
} from 'recharts';
import { Clock, ArrowDown, ArrowUp } from 'lucide-react';

// Sample data
const timeCompletionData = {
  daily: Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    averageTime: 35 + Math.random() * 20 - 10,
    fastestTime: 20 + Math.random() * 10,
    slowestTime: 50 + Math.random() * 15,
    assignmentsCompleted: Math.floor(8 + Math.random() * 5)
  })),
  assignments: [
    { id: 1, subject: "Math", timeSpent: 45, difficulty: 4, date: "2024-03-01" },
    { id: 2, subject: "Science", timeSpent: 38, difficulty: 3, date: "2024-03-01" },
    { id: 3, subject: "English", timeSpent: 32, difficulty: 2, date: "2024-03-02" },
    { id: 4, subject: "History", timeSpent: 41, difficulty: 3, date: "2024-03-02" },
    { id: 5, subject: "Math", timeSpent: 43, difficulty: 4, date: "2024-03-03" }
  ],
  recentTrends: {
    averageTimeChange: -2.5,
    fastestCompletion: 18,
    slowestCompletion: 65,
    totalTimeSpent: 187
  }
};

export default function TimeCompletionTrends() {
  const [selectedView, setSelectedView] = useState('overview');
  const [timeRange, setTimeRange] = useState('week');

  const getTimeRangeData = () => {
    switch(timeRange) {
      case 'week':
        return timeCompletionData.daily.slice(-7);
      case 'month':
        return timeCompletionData.daily;
      default:
        return timeCompletionData.daily.slice(-7);
    }
  };

  const getTrendColor = (value) => {
    return value < 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Time to Completion Trends</CardTitle>
            <CardDescription>Analysis of assignment completion duration patterns</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant={selectedView === 'overview' ? 'default' : 'outline'}
              onClick={() => setSelectedView('overview')}
              size="sm"
            >
              Overview
            </Button>
            <Button 
              variant={selectedView === 'patterns' ? 'default' : 'outline'}
              onClick={() => setSelectedView('patterns')}
              size="sm"
            >
              Patterns
            </Button>
            <Button 
              variant={selectedView === 'analysis' ? 'default' : 'outline'}
              onClick={() => setSelectedView('analysis')}
              size="sm"
            >
              Analysis
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Time Range Selector */}
          <div className="flex gap-2 justify-end">
            <Button 
              variant={timeRange === 'week' ? 'default' : 'outline'}
              onClick={() => setTimeRange('week')}
              size="sm"
            >
              Week
            </Button>
            <Button 
              variant={timeRange === 'month' ? 'default' : 'outline'}
              onClick={() => setTimeRange('month')}
              size="sm"
            >
              Month
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg Time Change</span>
                <Badge 
                  variant="outline" 
                  className={getTrendColor(timeCompletionData.recentTrends.averageTimeChange)}
                >
                  {timeCompletionData.recentTrends.averageTimeChange}%
                  {timeCompletionData.recentTrends.averageTimeChange < 0 ? <ArrowDown className="h-4 w-4 ml-1 inline" /> : <ArrowUp className="h-4 w-4 ml-1 inline" />}
                </Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Fastest Time</span>
                <Badge variant="outline">{timeCompletionData.recentTrends.fastestCompletion} min</Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Slowest Time</span>
                <Badge variant="outline">{timeCompletionData.recentTrends.slowestCompletion} min</Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Time</span>
                <Badge variant="outline">{timeCompletionData.recentTrends.totalTimeSpent} min</Badge>
              </div>
            </div>
          </div>

          {selectedView === 'overview' && (
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={getTimeRangeData()}>
                <defs>
                  <linearGradient id="timeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="averageTime" 
                  stroke="hsl(var(--primary))" 
                  fill="url(#timeGradient)" 
                  name="Average Time (min)"
                />
                <Area 
                  type="monotone" 
                  dataKey="fastestTime" 
                  stroke="rgb(34, 197, 94)" 
                  fill="rgb(34, 197, 94, 0.1)" 
                  name="Fastest Time (min)"
                />
                <Area 
                  type="monotone" 
                  dataKey="slowestTime" 
                  stroke="rgb(239, 68, 68)" 
                  fill="rgb(239, 68, 68, 0.1)" 
                  name="Slowest Time (min)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {selectedView === 'patterns' && (
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid />
                <XAxis type="number" dataKey="timeSpent" name="Time Spent" unit=" min" />
                <YAxis type="number" dataKey="difficulty" name="Difficulty" domain={[0, 5]} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                {['Math', 'Science', 'English', 'History'].map((subject, index) => (
                  <Scatter
                    key={subject}
                    name={subject}
                    data={timeCompletionData.assignments.filter(a => a.subject === subject)}
                    fill={['#ff7300', '#82ca9d', '#8884d8', '#ffc658'][index]}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          )}

          {selectedView === 'analysis' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {timeCompletionData.assignments.map(assignment => (
                  <div key={assignment.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="font-medium">{assignment.subject}</span>
                      </div>
                      <Badge>{assignment.timeSpent} min</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Difficulty: {assignment.difficulty}/5</span>
                      <span>{assignment.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}