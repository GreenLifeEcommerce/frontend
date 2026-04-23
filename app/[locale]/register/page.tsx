"use client";

import AuthPage from "../login/page";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthPage defaultTab="register" />
    </div>
  );
}
