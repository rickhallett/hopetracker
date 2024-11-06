import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, XCircle } from "lucide-react"

export function EngagementOptimization() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Engagement Optimization</CardTitle>
        <CardDescription>Suggestions to improve compliance</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            Send personalized reminders
          </li>
          <li className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            Implement a reward system
          </li>
          <li className="flex items-center">
            <XCircle className="mr-2 h-4 w-4 text-red-500" />
            Avoid overloading with assignments
          </li>
          <li className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            Provide clear instructions and resources
          </li>
        </ul>
      </CardContent>
    </Card>
  )
}