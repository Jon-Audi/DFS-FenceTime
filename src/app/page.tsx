"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock, Fingerprint, Nfc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Keypad } from "@/components/Keypad"
import { useToast } from "@/hooks/use-toast"
import { employees } from "@/lib/data"
import Link from "next/link"

export default function KioskPage() {
  const [currentTime, setCurrentTime] = useState("")
  const [pin, setPin] = useState("")
  const [rfid, setRfid] = useState("")
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handlePinKeyPress = (key: string) => {
    if (pin.length < 4) {
      setPin(pin + key)
    }
  }

  const handlePinDelete = () => {
    setPin(pin.slice(0, -1))
  }

  const handlePinClear = () => {
    setPin("")
  }

  const handleClockIn = (method: 'pin' | 'rfid') => {
    const identifier = method === 'pin' ? pin : rfid;
    if (!identifier) {
        toast({
            variant: "destructive",
            title: "Error",
            description: `Please enter a ${method.toUpperCase()} to clock in/out.`,
        });
        return;
    }

    const employee = employees.find(e => (method === 'pin' ? e.pin : e.rfid) === identifier);

    if (employee) {
        const newStatus = employee.status === 'Clocked In' ? 'Clocked Out' : 'Clocked In';
        // Here you would update the employee status in your database
        employee.status = newStatus; 
        
        toast({
            title: `Success, ${employee.name}!`,
            description: `You have successfully ${newStatus.toLowerCase().replace(' ', '-')} at ${new Date().toLocaleTimeString()}.`,
        })
        
        setPin('');
        setRfid('');

    } else {
        toast({
            variant: "destructive",
            title: "Authentication Failed",
            description: "Invalid PIN or RFID. Please try again.",
        })
    }
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
       <div className="absolute top-4 right-4">
          <Button asChild variant="outline">
            <Link href="/login">Admin Portal</Link>
          </Button>
        </div>
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Clock className="w-10 h-10 text-primary" />
            <h1 className="text-5xl font-headline font-bold">FenceTime</h1>
          </div>
          <p className="text-6xl font-mono font-bold tracking-wider text-primary">
            {currentTime || "00:00 AM"}
          </p>
          <p className="text-muted-foreground text-lg">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pin"><Fingerprint className="mr-2" /> PIN</TabsTrigger>
              <TabsTrigger value="rfid"><Nfc className="mr-2" /> RFID</TabsTrigger>
            </TabsList>
            <TabsContent value="pin" className="mt-4">
              <div className="flex justify-center mb-4">
                <div className="w-48 h-16 bg-muted rounded-lg flex items-center justify-center">
                  <p className="text-4xl font-mono tracking-[0.5em]">
                    {"*".repeat(pin.length)}
                  </p>
                </div>
              </div>
              <Keypad onKeyPress={handlePinKeyPress} onDelete={handlePinDelete} onClear={handlePinClear} />
              <Button onClick={() => handleClockIn('pin')} className="w-full mt-4 h-16 text-xl bg-accent hover:bg-accent/90">
                Clock In / Out
              </Button>
            </TabsContent>
            <TabsContent value="rfid" className="mt-4 space-y-4">
               <div className="flex flex-col items-center justify-center h-64 space-y-4">
                    <p className="text-muted-foreground">Scan your RFID tag or enter it manually.</p>
                    <Input 
                        type="text" 
                        placeholder="RFID Tag" 
                        className="h-14 text-center text-lg" 
                        value={rfid}
                        onChange={(e) => setRfid(e.target.value)}
                        aria-label="RFID Tag Input"
                    />
               </div>
               <Button onClick={() => handleClockIn('rfid')} className="w-full h-16 text-xl bg-accent hover:bg-accent/90">
                 Clock In / Out
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
