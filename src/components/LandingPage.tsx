import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  BarChart,
  Bell,
  Clock,
  LineChart,
  Calendar,
  ArrowRight,
  Menu,
  X,
  TrendingUp,
  Play,
  LogIn
} from 'lucide-react';

const features = [
  {
    icon: BarChart,
    title: "Smart Analytics",
    description: "Track completion rates and patterns across subjects",
    badge: "Core Feature"
  },
  {
    icon: Bell,
    title: "Automated Check-ins",
    description: "Regular reminders and progress tracking",
    badge: "Automation"
  },
  {
    icon: Clock,
    title: "Time Management",
    description: "Monitor study duration and peak productivity hours",
    badge: "Productivity"
  },
  {
    icon: LineChart,
    title: "Progress Tracking",
    description: "Visualize improvement over time with detailed metrics",
    badge: "Analytics"
  },
  {
    icon: Calendar,
    title: "Streak System",
    description: "Build consistent study habits with streak tracking",
    badge: "Motivation"
  },
  {
    icon: TrendingUp,
    title: "Performance Insights",
    description: "Get personalized recommendations for improvement",
    badge: "AI-Powered"
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">


      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Turn Homework from
              <span className="text-primary"> Hope</span> to
              <span className="text-primary"> Habit</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Track, analyze, and improve your homework completion rates with our intelligent tracking system.
              Get insights, build streaks, and develop consistent study habits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg">
                Watch Demo
                <Play className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-4 py-16 bg-slate-50 dark:bg-slate-900">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const FeatureIcon = feature.icon;
            return (
              <Card key={index} className="relative">
                <CardHeader>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary">{feature.badge}</Badge>
                  </div>
                  <FeatureIcon className="h-8 w-8 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Study Habits?</h2>
              <p className="text-lg mb-8 opacity-90">
                Join thousands of students who have improved their homework completion rates
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}