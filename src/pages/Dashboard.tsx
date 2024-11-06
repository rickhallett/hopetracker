import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart2, Clock, Target, TrendingUp } from 'lucide-react';

// Import existing components
import { ProgressVisualization } from '@/components/progress/ProgressVisualization';
import { AutomatedCheckIns } from '@/components/check-ins/AutomatedCheckIns';
import { BarrierIdentification } from '@/components/analytics/BarrierIdentification';
import { CompletionAnalytics } from '@/components/analytics/CompletionAnalytics';
import { SubjectCompletionRates } from '@/components/analytics/SubjectCompletionRates';
import { TimeCompletionTrends } from '@/components/analytics/TimeCompletionTrends';
import { CheckinCompletionCorrelation } from '@/components/analytics/CheckinCompletionCorrelation';
import { DifficultyDistribution } from '@/components/analytics/DifficultyDistribution';
import { ImprovementAnalysis } from '@/components/analytics/ImprovementAnalysis';
import { StreakAnalysis } from '@/components/analytics/StreakAnalysis';

export default function Dashboard() {
  const [checkInCount, setCheckInCount] = useState(0);
  const [completionRate, setCompletionRate] = useState(78);
  const [selectedView, setSelectedView] = useState('overview');

  // Sample data for completion analytics
  const completionData = [
    { day: "Mon", rate: 78 },
    { day: "Tue", rate: 82 },
    { day: "Wed", rate: 75 },
    { day: "Thu", rate: 85 },
    { day: "Fri", rate: 80 },
    { day: "Sat", rate: 72 },
    { day: "Sun", rate: 70 },
  ];

  const simulateCheckIn = () => {
    setCheckInCount(prev => prev + 1);
    setCompletionRate(prev => Math.min(100, prev + Math.floor(Math.random() * 5)));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completionRate}%</div>
              <p className="text-xs text-muted-foreground">
                +2.5% from last week
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Daily Streak
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7 days</div>
              <p className="text-xs text-muted-foreground">
                Personal best this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Time Spent
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.5 hrs</div>
              <p className="text-xs text-muted-foreground">
                Average per day
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tasks Completed
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24/30</div>
              <p className="text-xs text-muted-foreground">
                This week's progress
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProgressVisualization completionRate={completionRate} />
              <AutomatedCheckIns 
                checkInCount={checkInCount} 
                onCheckIn={simulateCheckIn} 
              />
              <BarrierIdentification />
              <SubjectCompletionRates />
            </div>
            <CompletionAnalytics completionData={completionData} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <TimeCompletionTrends />
              <CheckinCompletionCorrelation />
              <DifficultyDistribution />
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <StreakAnalysis />
              <ImprovementAnalysis />
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Schedule more breaks between study sessions</li>
                    <li>Focus on challenging subjects earlier in the day</li>
                    <li>Increase check-in frequency for better accountability</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Areas for Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Mathematics completion rate below target</li>
                    <li>Weekend productivity could be improved</li>
                    <li>Study session duration consistency needed</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}