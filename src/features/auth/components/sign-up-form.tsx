import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"

import {Button} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter} from "@/components/ui/card"
import {signUp} from "@/features/auth/service.ts";
import {NavLink} from "react-router";
import {Loader2} from "lucide-react";
import useHandleRequest from "@/hooks/use-handle-request.tsx";
import {signUpFormSchema, SignUpFormValues} from "@/features/auth/form-validation.ts";

export default function SignUpForm() {
  const {run, isLoading} = useHandleRequest();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const handleSubmit = (values: SignUpFormValues) => run(
    async () => { await signUp(values); }
  )

  return (
    <Card className="max-w-[350px] w-[95%]">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Enter your email and password to sign in to your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="animate-spin mr-2 h-4 w-4"/>}
              Sign up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Have an account? <NavLink to={"/sign-in"} className="text-primary hover:underline">Sign in</NavLink>
        </p>
      </CardFooter>
    </Card>
  )
}

