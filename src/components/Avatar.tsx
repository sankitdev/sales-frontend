"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User } from "lucide-react";
import { Profile } from "./Profile";
import { useState } from "react";
import { logoutUser } from "@/api/UserApi";

export function AvatarComponent() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    await logoutUser();
    localStorage.clear();
    router.push("/");
  };
  const handleToggle = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  const email = localStorage.getItem("email") || "";
  const fullName = localStorage.getItem("fullName") || "";
  const imageUrl = localStorage.getItem("imageUrl") || "";
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className='cursor-pointer'>
          <AvatarImage
            src={imageUrl}
            alt='@sankitdev'
            className='w-16 h-16 object-cover'
          />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className='w-56'>
        <div className='grid gap-4'>
          <div className='flex items-center space-x-2'>
            <Avatar>
              <AvatarImage
                src={imageUrl}
                alt='@sankitdev'
                className='w-16 h-16 object-cover'
              />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-medium'>{fullName}</p>
              <p className='text-xs text-muted-foreground'>{email}</p>
            </div>
          </div>
          <div className='grid gap-2'>
            <Button
              variant='outline'
              className='w-full justify-start'
              onClick={handleToggle}
            >
              <User className='mr-2 h-4 w-4' />
              Profile
            </Button>
            <Profile
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
            />
            <Button
              variant='outline'
              className='w-full justify-start'
              onClick={handleLogout}
            >
              <LogOut className='mr-2 h-4 w-4' />
              Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
