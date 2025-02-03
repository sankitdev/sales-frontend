"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { FormValues } from "@/types/types";
import { loginUser, signUsers } from "@/api/UserApi";
import { saveUserData } from "@/utils/saveUserData";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [isSignup, setIsSignup] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
  } = useForm<FormValues>({
    mode: "onTouched",
    defaultValues: { password: "", fullName: "", email: "" },
  });

  const router = useRouter();
  const { toast } = useToast();
  const toggleMode = () => {
    setIsSignup(!isSignup);
    reset(undefined, {
      keepValues: false,
      keepDirty: false,
      keepErrors: false,
    });
  };
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    if (isSignup) {
      signUsers(values);
    } else {
      try {
        const { email, password } = values;
        const response = await loginUser({ email, password });
        if (response?.status === 200) {
          console.log(response);
          router.push("/dashboard");
          await saveUserData();
          const name = localStorage.getItem("fullName");
          toast({
            title: `Welcome back ${name}`,
            description: "You have successfully logged in 😊",
          });
        } else {
          toast({
            title: "Invalid credentials",
            description: "Please check your email and password",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error logging in", error);
        toast({
          title: "Error",
          description: "An unexpected error occured. Please try again.",
          variant: "destructive",
        });
      }
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl'>
            {isSignup ? "Sign up" : "Login"}
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-6'>
              {isSignup && (
                <>
                  <div className='grid gap-2'>
                    <Label htmlFor='firsName'>Full Name</Label>
                    <Input
                      id='firstName'
                      type='text'
                      placeholder='Enter full Name'
                      {...register("fullName", {
                        required: "Full Name is required",
                      })}
                    />
                  </div>
                  {touchedFields.fullName && errors.fullName && (
                    <p className='text-red-500 text-sm'>
                      {errors.fullName.message}
                    </p>
                  )}
                </>
              )}
              <div className='grid gap-2'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='m@example.com'
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Enter a valid email",
                    },
                  })}
                />
              </div>
              {touchedFields.email && errors.email && (
                <p className='text-red-500 text-sm'>{errors.email.message}</p>
              )}
              <div className='grid gap-2'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  id='password'
                  type='password'
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {touchedFields.password && errors.password && (
                  <p className='text-red-500 text-sm'>
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type='submit' className='w-full'>
                {isSignup ? "Sign Up" : "Login"}
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              {isSignup
                ? "Already have an account "
                : "Don't have an account? "}
              <Button variant='ghost' onClick={toggleMode}>
                {isSignup ? "Login" : "Sign Up"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
