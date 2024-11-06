import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const subjectCompletionData = [
  { subject: "Math", completionRate: 85 },
  { subject: "Science", completionRate: 78 },
  { subject: "English", completionRate: 92 },
  { subject: "History", completionRate: 70 },
  { subject: "Art", completionRate: 95 },
]

export function SubjectCompletionRates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subject-wise Completion Rates</CardTitle>
        <CardDescription>Homework completion rates by subject</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={subjectCompletionData} layout="vertical">
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="subject" type="category" width={100} />
            <Tooltip />
            <Legend />
            <Bar dataKey="completionRate" fill="hsl(var(--primary))" name="Completion Rate (%)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}