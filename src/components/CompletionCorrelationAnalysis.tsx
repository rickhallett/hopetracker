import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ComposedChart,
  Bar,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Clock,
  Bell,
  CheckCircle2,

} from 'lucide-react';

// Sample data
const correlationData = {
  daily: Array.from({ length: 30 }, (_, i) => ({
    day: `Day ${i + 1}`,
    checkIns: Math.floor(3 + Math.random() * 5),
    completionRate: Math.floor(70 + Math.random() * 25),
    averageGap: Math.floor(2 + Math.random() * 4)
  })),
  timeOfDay: [
    { hour: '6AM', checkIns: 5, completionRate: 85 },
    { hour: '9AM', checkIns: 8, completionRate: 90 },
    { hour: '12PM', checkIns: 12, completionRate: 95 },
    { hour: '3PM', checkIns: 10, completionRate: 88 },
    { hour: '6PM', checkIns: 6, completionRate: 82 },
    { hour: '9PM', checkIns: 4, completionRate: 78 }
  ],
  insights: {
    correlationStrength: 0.85,
    optimalCheckIns: 4,
    completionThreshold: 85,
    topPerformanceTime: '12PM'
  }
};

export default function CheckinCompletionCorrelation() {
  const [selectedView, setSelectedView] = useState('timeline');
  const [timeRange, setTimeRange] = useState('week');

  const getTimeRangeData = () => {
    return timeRange === 'week' 
      ? correlationData.daily.slice(-7) 
      : correlationData.daily;
  };

  const getCorrelationColor = (strength) => {
    if (strength >= 0.8) return 'text-green-500';
    if (strength >= 0.6) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Check-in & Completion Correlation</CardTitle>
            <CardDescription>Analyzing the relationship between check-ins and homework completion</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedView === 'timeline' ? 'default' : 'outline'}
              onClick={() => setSelectedView('timeline')}
              size="sm"
            >
              Timeline
            </Button>
            <Button
              variant={selectedView === 'correlation' ? 'default' : 'outline'}
              onClick={() => setSelectedView('correlation')}
              size="sm"
            >
              Correlation
            </Button>
            <Button
              variant={selectedView === 'patterns' ? 'default' : 'outline'}
              onClick={() => setSelectedView('patterns')}
              size="sm"
            >
              Patterns
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-medium">Correlation</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={getCorrelationColor(correlationData.insights.correlationStrength)}
                >
                  {(correlationData.insights.correlationStrength * 100).toFixed(0)}%
                </Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  <span className="font-medium">Optimal Check-ins</span>
                </div>
                <Badge variant="outline">
                  {correlationData.insights.optimalCheckIns} per day
                </Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="font-medium">Success Rate</span>
                </div>
                <Badge variant="outline">
                  {correlationData.insights.completionThreshold}%
                </Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-medium">Peak Time</span>
                </div>
                <Badge variant="outline">
                  {correlationData.insights.topPerformanceTime}
                </Badge>
              </div>
            </div>
          </div>

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

          {selectedView === 'timeline' && (
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={getTimeRangeData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" orientation="left" domain={[0, 100]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
                <Tooltip />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="completionRate"
                  fill="rgb(59, 130, 246, 0.1)"
                  stroke="rgb(59, 130, 246)"
                  name="Completion Rate (%)"
                />
                <Bar
                  yAxisId="right"
                  dataKey="checkIns"
                  fill="hsl(var(--primary))"
                  name="Check-ins"
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}

          {selectedView === 'correlation' && (
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart>
                <CartesianGrid />
                <XAxis type="number" dataKey="checkIns" name="Check-ins" />
                <YAxis type="number" dataKey="completionRate" name="Completion Rate" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter
                  name="Check-ins vs Completion"
                  data={correlationData.daily}
                  fill="hsl(var(--primary))"
                />
              </ScatterChart>
            </ResponsiveContainer>
          )}

          {selectedView === 'patterns' && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={correlationData.timeOfDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis yAxisId="left" orientation="left" domain={[0, 100]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 15]} />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="completionRate"
                  stroke="rgb(59, 130, 246)"
                  name="Completion Rate (%)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="checkIns"
                  stroke="hsl(var(--primary))"
                  name="Check-ins"
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}