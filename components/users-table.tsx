"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, UserCheck, UserX, Mail, User, GripVertical, Edit, Trash } from "lucide-react"
import useDashboardStore from "@/stores/useAdminStats"

export function UsersTable() {
  const users = useDashboardStore((s) => s.users)
  const loading = useDashboardStore((s) => s.loading)
  const error = useDashboardStore((s) => s.error)
  const fetchDashboard = useDashboardStore((s) => s.fetchDashboard)

  React.useEffect(() => {
    fetchDashboard()
  }, [fetchDashboard])

  const getInitials = (name: string, surname: string) => {
    return `${name?.charAt(0) || ''}${surname?.charAt(0) || ''}`.toUpperCase()
  }

  if (loading) {
    return (
      <div className="mx-4 my-6">
        <div className="border border-border rounded-md overflow-x-auto bg-card">
          <div className="flex items-center justify-center p-12">
            <div className="text-center space-y-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-sm text-muted-foreground">Loading users...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mx-4 my-6">
        <div className="border border-border rounded-md overflow-x-auto bg-card">
          <div className="flex items-center justify-center p-12">
            <div className="text-center space-y-3">
              <div className="text-destructive font-medium">Error loading users</div>
              <p className="text-sm text-muted-foreground">{error}</p>
              <Button variant="outline" size="sm" onClick={fetchDashboard}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!users || users.length === 0) {
    return (
      <div className="mx-4 my-6">
        <div className="border border-border rounded-md overflow-x-auto bg-card">
          <Table className="min-w-full border border-border border-collapse">
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50 border-b border-border">
                <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border w-8" />
                <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border">User</TableHead>
                <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border">Email</TableHead>
                <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border">Role</TableHead>
                <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border">Company</TableHead>
                <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border">Telegram</TableHead>
                <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border">Salary</TableHead>
                <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border">Status</TableHead>
                <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border w-24">Message</TableHead>
                <TableHead className="px-4 py-2 text-center text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-muted/50 border border-border">
                <TableCell colSpan={10} className="text-center py-6 text-muted-foreground border border-border">
                  No users found.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-4 my-6">
      <div className="border border-border rounded-md overflow-x-auto bg-card">
        <Table className="min-w-full border border-border border-collapse">
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50 border-b border-border">
              <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border w-8" />
              <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border">User</TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border">Email</TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border">Role</TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border">Company</TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border">Telegram</TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border">Salary</TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border">Status</TableHead>
              <TableHead className="px-4 py-2 text-left text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border w-24">Message</TableHead>
              <TableHead className="px-4 py-2 text-center text-sm font-semibold text-muted-foreground whitespace-nowrap border border-border w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any, idx: number) => (
              <TableRow 
                key={user.id || idx} 
                className="hover:bg-muted/50 border border-border text-foreground"
              >
                <TableCell className="w-8 text-muted-foreground border border-border cursor-grab">
                  <GripVertical size={16} />
                </TableCell>

                <TableCell className="border border-border">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-xs font-semibold">
                        {getInitials(user.name, user.surname)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-foreground">
                        {user.name} {user.surname}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="border border-border text-muted-foreground">
                  <span className="font-mono text-sm">{user.email}</span>
                </TableCell>

                <TableCell className="border border-border">
                  <span className={`inline-block px-2 py-1 rounded-sm text-xs font-medium ${
                    user.role === 'CEO' 
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400'
                      : user.role === 'Financial Director'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'  
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                  }`}>
                    {user.role}
                  </span>
                </TableCell>

                <TableCell className="border border-border text-sm">
                  {user.company_code}
                </TableCell>

                <TableCell className="border border-border text-sm text-blue-600 dark:text-blue-400">
                  @{user.telegram_id}
                </TableCell>

                <TableCell className="border border-border font-medium text-green-600 dark:text-green-400">
                  ${user.default_salary?.toLocaleString() || '0'}
                </TableCell>

                <TableCell className="border border-border">
                  <span className={`inline-block px-2 py-1 rounded-sm text-xs font-medium ${
                    user.is_active
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                      : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                  }`}>
                    {user.is_active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>

                <TableCell className="border border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label="Send Message"
                    className="h-8 w-8 p-0 hover:bg-muted"
                  >
                    <Mail size={14} />
                  </Button>
                </TableCell>

                <TableCell className="border border-border text-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="More options"
                        className="h-8 w-8 p-0 hover:bg-muted"
                      >
                        <MoreHorizontal size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel className="text-xs font-semibold">Actions</DropdownMenuLabel>
                      <DropdownMenuItem className="cursor-pointer text-sm">
                        <Edit size={14} className="mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer text-sm">
                        <User size={14} className="mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      {user.permissions && user.permissions.length > 0 && (
                        <DropdownMenuItem className="cursor-pointer text-sm">
                          Manage Permissions ({user.permissions.length})
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer text-sm text-destructive hover:text-destructive">
                        <Trash size={14} className="mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}1