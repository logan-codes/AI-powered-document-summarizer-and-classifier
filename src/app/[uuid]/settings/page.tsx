"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const supabase = createClient();

  // Fetch current user info
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        toast.error("Please login first");
        router.push("/login");
      } else {
        setName(user.user_metadata.name || "");
        setEmail(user.email || "");
        setLoading(false);
      }
    };
    fetchUser();
  }, [router, supabase]);

  // Update name in user profile
  const handleSave = async () => {
    const { error } = await supabase.auth.updateUser({
      data: { name },
    });

    if (error) {
      toast.error("Failed to update profile");
    } else {
      toast.success("Profile updated successfully!");
    }
  };

  // Trigger password reset email
  const handlePasswordReset = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      toast.success("Password reset email sent!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to send password reset email.");
      }
    }
  };

  // Sign out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast("Logged out successfully!");
    router.push("/login");
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="p-6 flex-1 overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Profile */}
      <div className="mb-6 space-y-4">
        <h2 className="text-lg font-semibold">Profile</h2>
        <div className="flex flex-col gap-4 max-w-md">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              disabled
              placeholder="Your email"
            />
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>

      {/* Preferences */}
      <div className="mb-6 space-y-4">
        <h2 className="text-lg font-semibold">Preferences</h2>
        <div className="flex items-center gap-4">
          <span>Enable Notifications</span>
          <Switch
            checked={notifications}
            onCheckedChange={(val) => setNotifications(val)}
          />
        </div>
      </div>

      {/* Password Reset */}
      <div className="mb-6 space-y-2">
        <h2 className="text-lg font-semibold">Password</h2>
        <Button variant="outline" onClick={handlePasswordReset}>
          Send Password Reset Email
        </Button>
      </div>

      {/* Danger Zone */}
      <div className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
        <Button
          variant="destructive"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
