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
  ComposedChart,
  Cell
} from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const subjectData = [
  {
    subject: "Mathematics",
    currentRate: 85,
    previousRate: 80,
    weeklyTrend: [82, 83, 81, 84, 85, 83, 85],
    difficulty: 4.2,
    averageTimeSpent: 45
  },
  {
    subject: "Science",
    currentRate: 78,
    previousRate: 75,
    weeklyTrend: [75, 76, 77, 76, 78, 77, 78],
    difficulty: 3.8,
    averageTimeSpent: 40
  },
  {
    subject: "English",
    currentRate: 92,
    previousRate: 93,
    weeklyTrend: [90, 91, 92, 93, 91, 92, 92],
    difficulty: 3.2,
    averageTimeSpent: 35
  },
  {
    subject: "History",
    currentRate: 70,
    previousRate: 65,
    weeklyTrend: [65, 67, 68, 69, 68, 70, 70],
    difficulty: 3.5,
    averageTimeSpent: 38
  },
  {
    subject: "Art",
    currentRate: 95,
    previousRate: 94,
    weeklyTrend: [93, 94, 94, 95, 94, 95, 95],
    difficulty: 2.8,
    averageTimeSpent: 30
  }
];

export default function EnhancedSubjectCompletion() {
  const [selectedView, setSelectedView] = useState('current');
  const [sortBy, setSortBy] = useState('completion');

  const getTrendIcon = (current, previous) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getBarColor = (rate) => {
    if (rate >= 90) return 'rgb(34, 197, 94)';
    if (rate >= 80) return 'rgb(59, 130, 246)';
    if (rate >= 70) return 'rgb(234, 179, 8)';
    return 'rgb(239, 68, 68)';
  };

  const sortedData = [...subjectData].sort((a, b) => {
    switch (sortBy) {
      case 'completion':
        return b.currentRate - a.currentRate;
      case 'difficulty':
        return b.difficulty - a.difficulty;
      case 'time':
        return b.averageTimeSpent - a.averageTimeSpent;
      default:
        return 0;
    }
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Subject-wise Completion Analysis</CardTitle>
            <CardDescription>Detailed breakdown of homework completion by subject</CardDescription>
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
              variant={selectedView === 'trend' ? 'default' : 'outline'}
              onClick={() => setSelectedView('trend')}
              size="sm"
            >
              Trends
            </Button>
            <Button 
              variant={selectedView === 'comparison' ? 'default' : 'outline'}
              onClick={() => setSelectedView('comparison')}
              size="sm"
            >
              Comparison
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex gap-4 justify-end">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSortBy('completion')}
              className={sortBy === 'completion' ? 'bg-secondary' : ''}
            >
              Sort by Completion
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSortBy('difficulty')}
              className={sortBy === 'difficulty' ? 'bg-secondary' : ''}
            >
              Sort by Difficulty
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSortBy('time')}
              className={sortBy === 'time' ? 'bg-secondary' : ''}
            >
              Sort by Time
            </Button>
          </div>

          {selectedView === 'current' && (
            <div className="space-y-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={sortedData}>
                  <XAxis dataKey="subject" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="currentRate" name="Completion Rate (%)">
                    {sortedData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.currentRate)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedData.map(subject => (
                  <div key={subject.subject} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{subject.subject}</h3>
                      {getTrendIcon(subject.currentRate, subject.previousRate)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Completion Rate:</span>
                        <Badge variant="secondary">{subject.currentRate}%</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Difficulty:</span>
                        <Badge variant="outline">{subject.difficulty}/5</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Avg. Time:</span>
                        <Badge variant="outline">{subject.averageTimeSpent} min</Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedView === 'trend' && (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart>
                <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                <YAxis domain={[60, 100]} />
                <Tooltip />
                <Legend />
                {sortedData.map((subject) => (
                  <Line
                    key={subject.subject}
                    type="monotone"
                    data={subject.weeklyTrend.map((rate, index) => ({
                      name: `Day ${index + 1}`,
                      rate
                    }))}
                    dataKey="rate"
                    name={subject.subject}
                    stroke={getBarColor(subject.currentRate)}
                    dot={false}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          )}

          {selectedView === 'comparison' && (
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={sortedData}>
                <XAxis dataKey="subject" />
                <YAxis yAxisId="left" orientation="left" domain={[0, 100]} />
                <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
                <Tooltip />
                <Legend />
                <Bar 
                  yAxisId="left" 
                  dataKey="currentRate" 
                  name="Completion Rate (%)" 
                  fill="hsl(var(--primary))" 
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="difficulty"
                  name="Difficulty Level"
                  stroke="#ff7300"
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}