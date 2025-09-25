"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { VerifyEmailForm } from "@/components/verify-email-form";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
  const value = searchParams.get("email")
  if (!value) {
    window.location.href = "/login"
    return
  }
  setEmail(value)
}, [searchParams])


  if (!email) return null;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <VerifyEmailForm email={email} />
    </div>
  );
}
