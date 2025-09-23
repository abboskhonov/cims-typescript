"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { serializeRegisterForm, validateRegister } from "@/helpers/authHelpers";
import { registerUser } from "@/services/authServices";
import useAuthStore from "@/stores/useAuthStore";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const ROLES = ["Financial Director", "Member", "Customer"];

export default function RegisterForm() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);
  const setToken = useAuthStore((s) => s.setToken);

  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [role, setRole] = useState("Customer");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.currentTarget);
    form.set("role", role);
    const values = serializeRegisterForm(form);
    const validationError = validateRegister(values);
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      email: values.email,
      name: values.name,
      surname: values.surname,
      password: values.password,
      company_code: values.company_code,
      telegram_id: values.telegram_id || undefined,
      role: values.role,
    };

    try {
      setPending(true);
      const data = await registerUser(payload);
      if (data.access_token) setToken(data.access_token);
      if (data.user) setUser(data.user);
      router.push(`/verify-email?email=${encodeURIComponent(payload.email)}`);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || "Registration failed.");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Create account</CardTitle>
          <CardDescription>
            Enter your information to get started
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">First name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  required 
                  disabled={pending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="surname">Last name</Label>
                <Input 
                  id="surname" 
                  name="surname" 
                  required 
                  disabled={pending}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                required 
                disabled={pending}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company_code">Company code</Label>
              <Input
                id="company_code"
                name="company_code"
                defaultValue="oddiy"
                required
                disabled={pending}
              />
            </div>

            

            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={role} onValueChange={setRole} disabled={pending}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" name="role" value={role} />
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  minLength={6}
                  required
                  disabled={pending}
                  autoComplete="new-password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm</Label>
                <Input
                  id="confirm"
                  name="confirm"
                  type="password"
                  minLength={6}
                  required
                  disabled={pending}
                  autoComplete="new-password"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={pending}>
              {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {pending ? "Creating account..." : "Create account"}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}