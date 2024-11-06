import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell
} from 'recharts';
import {
  Clock,
  Sun,
  Moon,
  Zap,
  Calendar,
} from 'lucide-react';

// Sample data
const productivityData = {
  hourly: [
    { hour: '6AM', productivity: 65, assignments: 2, quality: 75 },
    { hour: '8AM', productivity: 75, assignments: 3, quality: 82 },
    { hour: '10AM', productivity: 90, assignments: 5, quality: 88 },
    { hour: '12PM', productivity: 85, assignments: 4, quality: 85 },
    { hour: '2PM', productivity: 80, assignments: 4, quality: 83 },
    { hour: '4PM', productivity: 75, assignments: 3, quality: 80 },
    { hour: '6PM', productivity: 70, assignments: 3, quality: 78 },
    { hour: '8PM', productivity: 60, assignments: 2, quality: 72 },
  ],
  weekly: [
    { day: 'Monday', productivity: 85, assignments: 8, quality: 82 },
    { day: 'Tuesday', productivity: 88, assignments: 9, quality: 85 },
    { day: 'Wednesday', productivity: 82, assignments: 7, quality: 80 },
    { day: 'Thursday', productivity: 78, assignments: 6, quality: 78 },
    { day: 'Friday', productivity: 75, assignments: 5, quality: 75 },
    { day: 'Saturday', productivity: 70, assignments: 4, quality: 72 },
    { day: 'Sunday', productivity: 72, assignments: 4, quality: 74 },
  ],
  insights: {
    peakHour: '10AM',
    peakDay: 'Tuesday',
    bestQualityTime: '10AM',
    mostProductiveBlock: 'Morning',
    averageProductivity: 78,
    productivityTrend: 'upward',
  }
};

const getTimeBlock = (hour) => {
  const hourNum = parseInt(hour);
  if (hourNum >= 5 && hourNum < 12) return 'Morning';
  if (hourNum >= 12 && hourNum < 17) return 'Afternoon';
  if (hourNum >= 17 && hourNum < 21) return 'Evening';
  return 'Night';
};

const getProductivityColor = (value) => {
  if (value >= 85) return 'rgb(34, 197, 94)';
  if (value >= 75) return 'rgb(59, 130, 246)';
  if (value >= 65) return 'rgb(234, 179, 8)';
  return 'rgb(239, 68, 68)';
};

export default function PeakProductivityAnalysis() {
  const [selectedView, setSelectedView] = useState('daily');
  const [metric, setMetric] = useState('productivity');

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Peak Productivity Times</CardTitle>
            <CardDescription>Analyze when you're most productive and efficient</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedView === 'daily' ? 'default' : 'outline'}
              onClick={() => setSelectedView('daily')}
              size="sm"
            >
              Daily
            </Button>
            <Button
              variant={selectedView === 'weekly' ? 'default' : 'outline'}
              onClick={() => setSelectedView('weekly')}
              size="sm"
            >
              Weekly
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
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Peak Hour</span>
                </div>
                <Badge variant="secondary">
                  {productivityData.insights.peakHour}
                </Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Best Day</span>
                </div>
                <Badge variant="secondary">
                  {productivityData.insights.peakDay}
                </Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">Best Block</span>
                </div>
                <Badge variant="secondary">
                  {productivityData.insights.mostProductiveBlock}
                </Badge>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="h-5 w-5 text-orange-500" />
                  <span className="font-medium">Avg. Productivity</span>
                </div>
                <Badge 
                  variant="secondary"
                  className={getProductivityColor(productivityData.insights.averageProductivity)}
                >
                  {productivityData.insights.averageProductivity}%
                </Badge>
              </div>
            </div>
          </div>

          {/* Metric Selection */}
          <div className="flex gap-2 justify-end">
            <Button
              variant={metric === 'productivity' ? 'default' : 'outline'}
              onClick={() => setMetric('productivity')}
              size="sm"
            >
              Productivity
            </Button>
            <Button
              variant={metric === 'assignments' ? 'default' : 'outline'}
              onClick={() => setMetric('assignments')}
              size="sm"
            >
              Assignments
            </Button>
            <Button
              variant={metric === 'quality' ? 'default' : 'outline'}
              onClick={() => setMetric('quality')}
              size="sm"
            >
              Quality
            </Button>
          </div>

          {selectedView === 'daily' && (
            <div className="space-y-6">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={productivityData.hourly}>
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey={metric}
                    stroke="hsl(var(--primary))"
                    fill="url(#colorGradient)"
                    name={`${metric.charAt(0).toUpperCase() + metric.slice(1)} Score`}
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Morning', 'Afternoon', 'Evening', 'Night'].map((timeBlock) => (
                  <div key={timeBlock} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {timeBlock === 'Morning' && <Sun className="h-5 w-5 text-yellow-500" />}
                        {timeBlock === 'Afternoon' && <Sun className="h-5 w-5 text-orange-500" />}
                        {timeBlock === 'Evening' && <Moon className="h-5 w-5 text-blue-500" />}
                        {timeBlock === 'Night' && <Moon className="h-5 w-5 text-slate-500" />}
                        <span className="font-medium">{timeBlock}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {productivityData.hourly
                        .filter(item => getTimeBlock(item.hour) === timeBlock)
                        .map(item => (
                          <div key={item.hour} className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">{item.hour}</span>
                            <Badge 
                              variant="outline"
                              className={getProductivityColor(item[metric])}
                            >
                              {item[metric]}%
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'weekly' && (
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={productivityData.weekly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey={metric} name={`${metric.charAt(0).toUpperCase() + metric.slice(1)} Score`}>
                  {productivityData.weekly.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getProductivityColor(entry[metric])} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}