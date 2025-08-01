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
import { cn } from "@/lib/utils"; // optional helper for classNames

const ROLES = ["CEO", "Financial Director", "Member", "Customer"];

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
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Create account</CardTitle>
        <CardDescription>Register with your details and verify your email.</CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <Label htmlFor="name">Name *</Label>
              <Input id="name" name="name" placeholder="Your name" required disabled={pending} />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="surname">Surname *</Label>
              <Input id="surname" name="surname" placeholder="Your surname" required disabled={pending} />
            </div>
          </div>

          <div className="flex flex-col">
            <Label htmlFor="email">Email *</Label>
            <Input id="email" name="email" type="email" placeholder="user@example.com" required disabled={pending} />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="company_code">Company code *</Label>
            <Input
              id="company_code"
              name="company_code"
              placeholder="oddiy"
              defaultValue="oddiy"
              required
              disabled={pending}
            />
          </div>

          <div className="flex flex-col">
            <Label htmlFor="telegram_id">Telegram ID (optional)</Label>
            <Input id="telegram_id" name="telegram_id" placeholder="@username or numeric ID" disabled={pending} />
          </div>

          <div className="flex flex-col">
            <Label>Role *</Label>
            <Select value={role} onValueChange={setRole} disabled={pending}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                minLength={6}
                required
                disabled={pending}
                autoComplete="new-password"
              />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="confirm">Confirm password *</Label>
              <Input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="••••••••"
                minLength={6}
                required
                disabled={pending}
                autoComplete="new-password"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Creating account…" : "Create account"}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
