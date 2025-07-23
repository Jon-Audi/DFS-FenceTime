import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getTimeEntries } from "@/lib/data"
import { Download, FileText } from "lucide-react"
import { format } from "date-fns"

export default async function LogsPage() {
  const logs = await getTimeEntries()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-bold">Time Logs</h1>
          <p className="text-muted-foreground">Review and export all time entries.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Export PDF
            </Button>
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export CSV
            </Button>
        </div>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Clock In</TableHead>
                <TableHead>Clock Out</TableHead>
                <TableHead className="text-right">Total Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.employeeName}</TableCell>
                  <TableCell>{format(log.clockIn, "PPP p")}</TableCell>
                  <TableCell>{log.clockOut ? format(log.clockOut, "PPP p") : "Still clocked in"}</TableCell>
                  <TableCell className="text-right font-mono">{log.totalHours?.toFixed(2) ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
