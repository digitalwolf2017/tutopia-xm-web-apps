"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Loader2,
  AlertCircle,
  MapPin,
  Phone,
  MessageCircle,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/features/auth/auth-context";
import {
  useMeQuery,
  useCitiesQuery,
  useUpdateProfileMutation,
} from "@/features/auth/api/hooks";
import { TutopiaLoader } from "@/components/common/tutopia-loader";

export default function EditProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: me, isLoading: isLoadingProfile } = useMeQuery();
  const { data: cities } = useCitiesQuery();
  const updateProfileMutation = useUpdateProfileMutation();

  const profileImage = me?.profile_image || user?.profile_image || null;
  const displayName =
    (me && [me.first_name, me.last_name].filter(Boolean).join(" ")) ||
    user?.name ||
    "Student";
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    whatsapp: "",
    cityId: "",
    pincode: "",
    address: "",
  });

  const [saved, setSaved] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Initialize form with live profile or session fallback
  useEffect(() => {
    if (me) {
      const fullName =
        [me.first_name, me.last_name].filter(Boolean).join(" ") ||
        user?.name ||
        "";
      setFormData({
        name: fullName,
        mobile: me.phone || user?.mobile || "",
        whatsapp: me.whatsapp_number || "",
        cityId: me.city_id ? String(me.city_id) : "",
        pincode: me.pincode || "",
        address: me.address || "",
      });
    } else if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        mobile: user.mobile || "",
        whatsapp: user.mobile || "",
        pincode: "700006",
        address: "West Bengal, India",
      }));
    }
  }, [me, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSaved(false);

    try {
      await updateProfileMutation.mutateAsync({
        whatsapp_number: formData.whatsapp.trim() || undefined,
        city_id: formData.cityId || undefined,
        pin_code: formData.pincode.trim() || undefined,
        address: formData.address.trim() || undefined,
      });

      setSaved(true);
      setTimeout(() => {
        router.push("/profile");
      }, 1200);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to update profile. Please try again.";
      setErrorMessage(message);
    }
  };

  const isSaving = updateProfileMutation.isPending;

  return (
    <div className="space-y-6 max-w-lg mx-auto pb-16">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          href="/profile"
          className="p-2 -ml-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Edit Profile
          </h1>
          <p className="text-xs text-slate-500">
            Update your contact and residential information
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="flex items-start gap-2.5 p-3 text-xs bg-rose-50 border border-rose-200 text-rose-800 rounded-md">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">{errorMessage}</div>
        </div>
      )}

      {saved && (
        <div className="flex items-start gap-2.5 p-3 text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-md">
          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1 font-medium">Profile updated successfully! Redirecting...</div>
        </div>
      )}

      {isLoadingProfile ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
          <TutopiaLoader size="md" label="Loading student profile..." />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4"
        >
          {/* Avatar Header Preview */}
          <div className="flex items-center gap-3.5 pb-3 border-b border-slate-100">
            <Avatar className="w-12 h-12 rounded-lg border border-slate-200 shadow-2xs ring-0">
              {profileImage && (
                <AvatarImage
                  src={profileImage}
                  alt={displayName}
                  className="object-cover rounded-lg"
                />
              )}
              <AvatarFallback className="bg-sky-50 text-sky-700 font-bold text-base rounded-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs font-bold text-slate-900">{displayName}</p>
              <p className="text-[11px] text-slate-500">
                {formData.mobile ? `+91 ${formData.mobile}` : "Registered Student"}
              </p>
            </div>
          </div>

          {/* Full Name (Read-Only) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Full Name
            </label>
            <Input
              value={formData.name}
              disabled
              className="bg-slate-50 text-slate-500 cursor-not-allowed"
            />
            <p className="text-[11px] text-slate-400">
              Name is registered to your exam roll and cannot be changed here.
            </p>
          </div>

          {/* Mobile Number (Read-Only) */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              Registered Mobile Number
            </label>
            <Input
              value={formData.mobile}
              disabled
              className="bg-slate-50 text-slate-500 cursor-not-allowed"
            />
          </div>

          {/* WhatsApp Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              WhatsApp Number
            </label>
            <Input
              value={formData.whatsapp}
              maxLength={10}
              placeholder="10-digit WhatsApp number"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  whatsapp: e.target.value.replace(/\D/g, ""),
                }))
              }
            />
          </div>

          {/* City & Pincode Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                City
              </label>
              {cities && cities.length > 0 ? (
                <select
                  value={formData.cityId}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, cityId: e.target.value }))
                  }
                  className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm text-slate-800 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                >
                  <option value="">Select city...</option>
                  {cities.map((c) => (
                    <option key={c.id} value={String(c.id)}>
                      {c.name}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  value={me?.cityNmae || "Kolkata"}
                  disabled
                  className="bg-slate-50 text-slate-500"
                />
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Pincode
              </label>
              <Input
                value={formData.pincode}
                maxLength={6}
                placeholder="6-digit pincode"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pincode: e.target.value.replace(/\D/g, ""),
                  }))
                }
              />
            </div>
          </div>

          {/* Residential Address */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-slate-400" />
              Address
            </label>
            <Input
              value={formData.address}
              placeholder="e.g. 12/B College Street, Kolkata"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, address: e.target.value }))
              }
            />
          </div>

          {/* Save Button */}
          <Button
            type="submit"
            variant="tutopia-blue"
            disabled={isSaving}
            className="w-full h-11 text-sm font-bold mt-4 cursor-pointer"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Updating Profile...
              </>
            ) : saved ? (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" /> Changes Saved!
              </span>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
