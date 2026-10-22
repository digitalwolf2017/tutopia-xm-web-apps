"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockCurrentUser } from "@/lib/mock-data";

export default function EditProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState({ ...mockCurrentUser });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => {
      router.push("/profile");
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-lg mx-auto pb-16">
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
          Edit Profile
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4"
      >
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Full Name
          </label>
          <Input
            value={profile.name}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Mobile Number
          </label>
          <Input
            value={profile.mobile}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, mobile: e.target.value }))
            }
            required
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            WhatsApp Number
          </label>
          <Input
            value={profile.whatsapp}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, whatsapp: e.target.value }))
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              City
            </label>
            <Input
              value={profile.city}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, city: e.target.value }))
              }
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Pincode
            </label>
            <Input
              value={profile.pincode}
              onChange={(e) =>
                setProfile((prev) => ({ ...prev, pincode: e.target.value }))
              }
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Address
          </label>
          <Input
            value={profile.address}
            onChange={(e) =>
              setProfile((prev) => ({ ...prev, address: e.target.value }))
            }
          />
        </div>

        <Button
          type="submit"
          variant="tutopia-blue"
          className="w-full h-12 text-sm font-bold mt-4"
        >
          {saved ? (
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4" /> Saved Successfully!
            </span>
          ) : (
            "Save Changes"
          )}
        </Button>
      </form>
    </div>
  );
}
