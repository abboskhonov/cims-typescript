"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // ✅ correct
import { verifyOtp } from "@/services/authServices";
import { Loader2 } from "lucide-react";

export function VerifyEmailForm({ email }: { email: string }) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (code.length !== 4) return;

    setIsLoading(true);
    setError(null);

    try {
      await verifyOtp(email, code);
      toast.success("Email verified. You can now log in.");
      localStorage.removeItem("unverifiedEmail");
      router.push("/login");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Verification failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          We sent a 6-digit code to <strong>{email}</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <InputOTP maxLength={4} value={code} onChange={setCode}>
          <InputOTPGroup>
            {Array.from({ length: 4 }).map((_, i) => (
              <InputOTPSlot key={i} index={i} />
            ))}
          </InputOTPGroup>
        </InputOTP>

        {error && (
          <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <Button
          onClick={handleVerify}
          disabled={isLoading || code.length !== 4}
        >
          {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : "Verify"}
        </Button>
      </CardContent>
    </Card>
  );
}
