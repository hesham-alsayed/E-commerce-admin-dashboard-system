"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MdOutlineViewInAr } from "react-icons/md";

export default function UsersTable({ users = [] }) {
  return (
    <div className="border rounded-xl overflow-hidden">
      <Table>
        {/* HEADER */}
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Verified</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user._id}>
                {/* USER */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>
                        {user.firstName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-medium">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ID: {user._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* EMAIL */}
                <TableCell>{user.email}</TableCell>

                {/* ROLE */}
                <TableCell>
                  <Badge
                    variant={
                      user.role === "admin" ? "destructive" : "secondary"
                    }
                  >
                    {user.role}
                  </Badge>
                </TableCell>

                {/* ACTIVE */}
                <TableCell>
                  <Badge
                    variant={user.isActive ? "default" : "outline"}
                    className={
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>

                {/* VERIFIED */}
                <TableCell>
                  <Badge
                    variant={user.isVerified ? "default" : "outline"}
                    className={
                      user.isVerified
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                    }
                  >
                    {user.isVerified ? "Verified" : "Not Verified"}
                  </Badge>
                </TableCell>

                {/* DATE */}
                <TableCell className="text-sm text-muted-foreground">
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <Link to={`/admin/system/users/user-details/${user._id}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2 ml-auto hover:cursor-pointer"
                    >
                      View & Control <MdOutlineViewInAr />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
