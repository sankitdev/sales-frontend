"use client";
import { updateUser } from "@/api/UserApi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormValues } from "@/types/types";
import { saveUserData } from "@/utils/saveUserData";
import { useForm, Controller } from "react-hook-form";
type Profile = {
  isOpen: boolean;
  onClose: () => void;
};

export function Profile({ isOpen, onClose }: Profile) {
  const email = localStorage.getItem("email") || "";
  const fullName = localStorage.getItem("fullName") || "";
  const image = localStorage.getItem("imageUrl") || "";
  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm({
    defaultValues: {
      email: email,
      fullName: fullName,
      image: image, // This will be used for the image input
    },
  });
  const handleUpdate = async (data: FormValues) => {
    const { email, fullName, image } = data;
    const userData = {
      email,
      fullName,
      image,
    };

    await updateUser(userData);
    await saveUserData();
    onClose();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleUpdate)}>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='fullName' className='text-right'>
                Name
              </Label>
              <Controller
                name='fullName'
                control={control}
                render={({ field }) => (
                  <Input id='fullName' {...field} className='col-span-3' />
                )}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='email' className='text-right'>
                Email
              </Label>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <Input id='email' {...field} className='col-span-3' />
                )}
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='picture' className='text-right'>
                Image
              </Label>
              <Controller
                name='image'
                control={control}
                render={({ field }) => (
                  <Input
                    id='image'
                    type='text'
                    {...field}
                    className='col-span-3'
                  />
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
