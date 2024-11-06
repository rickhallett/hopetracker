import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const barriers = [
  { id: 1, text: "Lack of time", count: 15 },
  { id: 2, text: "Difficulty understanding", count: 8 },
  { id: 3, text: "Forgot assignment", count: 5 },
  { id: 4, text: "Technical issues", count: 3 },
]

export function BarrierIdentification() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Barrier Identification</CardTitle>
        <CardDescription>Top reasons for non-compliance</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {barriers.map(barrier => (
            <li key={barrier.id} className="flex justify-between items-center">
              <span>{barrier.text}</span>
              <Badge variant="secondary">{barrier.count}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}