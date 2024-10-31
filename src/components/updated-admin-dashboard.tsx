"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Save, Ban, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { User } from '@prisma/client'
// import toast, { Toaster }  from "react-hot-toast"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export function UpdatedAdminDashboardComponent({ users }: { users: User[] }) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [pointsToAdd, setPointsToAdd] = useState(0)
  const [totalPoints, setTotalPoints] = useState(0);

  const handleUserSelect = (userId: string) => {
    const user = users.find(u => u.id === userId)
    setSelectedUser(user || null)
    setPointsToAdd(0)
    setTotalPoints(user?.total_points_IW || 0)
  }

  const handleAddPoint = () => {
    if (selectedUser && pointsToAdd < 10) {
      setPointsToAdd(prev => Math.min(prev + 1, 10))
    }
  }

  const handleSubtractPoint = () => {
    if (selectedUser && pointsToAdd > -10) {
      setPointsToAdd(prev => Math.max(prev - 1, -10))
    }
  }

  const handleSave = async () => {
    if (selectedUser) {
      setSelectedUser(prev => ({
        ...prev!,
        points: Math.max(0, prev!.total_points_IW + pointsToAdd)
      }))


      
      const toastPromise = fetch("/api/integration_week/admin/update_player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: "ADD",
          user_id: selectedUser.id,
          points: pointsToAdd
        })
      })
      toast.promise(
        toastPromise,
        {
          pending: 'Pending...',
          success: 'Saved successfully 🎉',
          error: 'Something went wrong 🤯'
        }
    )
      // setTotalPoints(selectedUser.total_points_IW + pointsToAdd)// this has a problem
      setTotalPoints(prev => prev + pointsToAdd)
      setPointsToAdd(0)
      console.log("Changes saved for user:", selectedUser.user_name)
    }
  }

  const handleToggleBan = () => {
    if (selectedUser) {
      setSelectedUser(prev => ({
        ...prev!,
        is_banned_IW: !prev!.is_banned_IW
      }))

      const toastPromise = fetch("/api/integration_week/admin/update_player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          action: selectedUser.is_banned_IW ? "UNBAN" : "BAN",
          user_id: selectedUser.id,
          points: 0
        })
      })
      toast.promise(
        toastPromise,
        {
          pending: 'Pending...',
          success: 'Saved successfully 🎉',
          error: 'Something went wrong 🤯'
        }
    )
      console.log("Ban status toggled for user:", selectedUser.user_name)
    }
  }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <ToastContainer autoClose={1000}/>
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold text-center">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Select onValueChange={handleUserSelect}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select a user" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id} className="flex items-center justify-between">
                  <span>{user.user_name}</span>
                  {user.is_banned_IW && <Badge variant="destructive" className="ml-2">Banned</Badge>}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedUser && (
            <div className="space-y-6 rounded-lg bg-slate-50 p-6 shadow-inner">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-sm font-medium text-slate-500">Current Points</span>
                  <p className="text-2xl font-bold">{totalPoints}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-sm font-medium text-slate-500">Points to Add</span>
                  <p className="text-2xl font-bold">{pointsToAdd}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={handleSubtractPoint} 
                    variant="outline" 
                    size="icon"
                    className="h-8 w-8"
                  >
                    -
                  </Button>
                  <Button 
                    onClick={handleAddPoint} 
                    variant="outline" 
                    size="icon"
                    className="h-8 w-8"
                  >
                    +
                  </Button>
                </div>
                <Button 
                  onClick={handleSave} 
                  size="sm"
                  className="w-24"
                  disabled={pointsToAdd === 0}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>

              <Separator />

              <div className="pt-2">
                <Button 
                  onClick={handleToggleBan}
                  variant={selectedUser.is_banned_IW ? "outline" : "destructive"}
                  size="sm"
                  className="w-full"
                >
                  {selectedUser.is_banned_IW ? (
                    <>
                      <UserCheck className="mr-2 h-4 w-4" />
                      Unban User
                    </>
                  ) : (
                    <>
                      <Ban className="mr-2 h-4 w-4" />
                      Ban User
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}