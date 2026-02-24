"use client";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProfilePasswordSchema,
  updateProfilePasswordTypeSchema,
  updateProfileSchema,
  updateProfileTypeSchema,
} from "@/lib/schema/authSchema";
import { addressSchema, addressTypeSchema } from "@/lib/schema/addressSchema";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  User,
  Settings as SettingsIcon,
  MapPin,
  Lock,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Plus,
  Trash2,
} from "lucide-react";
import { updateProfile, updateProfilePassword, addAddress, getAddress, removeAddress } from "@/actions/profile.action";
import { signOut } from "next-auth/react";
import { AddressI } from "@/interfaces/address";

export default function Profile() {
  const [activeTab, setActiveTab] = useState<"settings" | "addresses">("settings");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [addresses, setAddresses] = useState<AddressI[]>([]);
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const form = useForm({
    mode: "all",
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function handleUpdate(values: updateProfileTypeSchema) {
    const resposne = await updateProfile(values);
    if (resposne.message == "success") {
      toast.success("Profile Updated Successfully", {
        position: "top-center",
      });
    } else {
      toast.error(resposne.errors?.msg, {
        position: "top-center",
      });
    }
  }


  const passwordForm = useForm({
    mode: "all",
    resolver: zodResolver(updateProfilePasswordSchema),
    defaultValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
  });

  async function handleUpdatePassowrd(passwordValues: updateProfilePasswordTypeSchema) {
    const resposne = await updateProfilePassword(passwordValues);
    if (resposne.message == "success") {
      toast.success("Password Changed Successfully", {
        position: "top-center",
      });
      await signOut({ callbackUrl: "/login" });
    } else {
      toast.error(resposne.errors?.msg, {
        position: "top-center",
      });
    }
  }


  const addressForm = useForm({
    mode: "all",
    resolver: zodResolver(addressSchema),
    defaultValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },
  });


  async function fetchAddresses() {
    setIsLoadingAddresses(true);
    try {
      const response = await getAddress();
      if (response?.status === "success") {
        setAddresses(response.data || []);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load addresses", {
        position: "top-center",
      });
    } finally {
      setIsLoadingAddresses(false);
    }
  }


  async function handleAddAddress(values: addressTypeSchema) {
    try {
      const response = await addAddress(values);
      if (response?.status === "success") {
        toast.success("Address added successfully", {
          position: "top-center",
        });
        setAddresses(response.data || []);
        addressForm.reset();
        setShowAddressForm(false);
      } else {
        toast.error(response?.message || "Failed to add address", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  }


  async function handleDeleteAddress(addressId: string) {
    try {
      const response = await removeAddress(addressId);
      if (response?.status === "success") {
        toast.success("Address deleted successfully", {
          position: "top-center",
        });
        await fetchAddresses();
      } else {
        toast.error(response?.message || "Failed to delete address", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", {
        position: "top-center",
      });
    }
  }


  useEffect(() => {
    if (activeTab === "addresses") {
      fetchAddresses();
    }
  }, [activeTab]);

  return (
    <main className="min-h-screen py-12 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2 bg-linear-to-r from-[#0D9D9A] to-[#C89B14] dark:from-[#5FD0CD] dark:to-[#F0C75E] bg-clip-text text-transparent">
            My Account
          </h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <Card className="p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "addresses"
                      ? "bg-[#0D9D9A]/10 dark:bg-[#5FD0CD]/10 text-[#0D9D9A] dark:text-[#5FD0CD] font-bold"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <MapPin className="size-5" />
                  <span>My Addresses</span>
                </button>

                <button
                  onClick={() => setActiveTab("settings")}
                  className={`cursor-pointer w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    activeTab === "settings"
                      ? "bg-[#0D9D9A]/10 dark:bg-[#5FD0CD]/10 text-[#0D9D9A] dark:text-[#5FD0CD] font-bold"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <SettingsIcon className="size-5" />
                  <span>Settings</span>
                </button>
              </nav>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            {activeTab === "settings" && (
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-linear-to-br from-[#0D9D9A]/20 to-[#C89B14]/20 dark:from-[#5FD0CD]/20 dark:to-[#F0C75E]/20 rounded-xl flex items-center justify-center">
                      <User className="size-6 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Profile Information</h2>
                      <p className="text-sm text-muted-foreground">
                        Update your personal details
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <form
                      onSubmit={form.handleSubmit(handleUpdate)}
                      className="space-y-5"
                    >
                      <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                              htmlFor={field.name}
                              className="text-sm font-semibold"
                            >
                              Full Name
                            </FieldLabel>
                            <div className="relative">
                              <User
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                size={18}
                              />
                              <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your full name"
                                type="text"
                                className="pl-10 h-12"
                              />
                            </div>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                              htmlFor={field.name}
                              className="text-sm font-semibold"
                            >
                              Email Address
                            </FieldLabel>
                            <div className="relative">
                              <Mail
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                size={18}
                              />
                              <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your email"
                                type="email"
                                className="pl-10 h-12"
                              />
                            </div>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel
                              htmlFor={field.name}
                              className="text-sm font-semibold"
                            >
                              Phone Number
                            </FieldLabel>
                            <div className="relative">
                              <Phone
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                size={18}
                              />
                              <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Enter your phone number"
                                type="tel"
                                className="pl-10 h-12"
                              />
                            </div>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      <Button className="cursor-pointer w-full h-12 text-base font-semibold bg-[#0D9D9A] hover:bg-[#087370] dark:bg-[#5FD0CD] dark:hover:bg-[#3BB9B6] transition-all">
                        {form.formState.isSubmitting ? (
                          <Spinner />
                        ) : (
                          "Save Changes"
                        )}
                      </Button>
                    </form>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-linear-to-br from-[#C89B14]/20 to-[#A67F10]/20 dark:from-[#F0C75E]/20 dark:to-[#E0B74E]/20 rounded-xl flex items-center justify-center">
                      <Lock className="size-6 text-[#C89B14] dark:text-[#F0C75E]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Change Password</h2>
                      <p className="text-sm text-muted-foreground">
                        Update your account password
                      </p>
                    </div>
                  </div>

                  <div className="bg-card border rounded-2xl shadow-xl p-8">
                    <form
                      onSubmit={passwordForm.handleSubmit(handleUpdatePassowrd)}
                      className="space-y-5"
                    >
                      <div className="grid md:grid-cols-1 gap-5">
                        <Controller
                          name="currentPassword"
                          control={passwordForm.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel
                                htmlFor={field.name}
                                className="text-sm font-semibold"
                              >
                                Current Password
                              </FieldLabel>
                              <div className="relative">
                                <Lock
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                  size={18}
                                />
                                <Input
                                  {...field}
                                  id={field.name}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Current password"
                                  type={showCurrentPassword ? "text" : "password"}
                                  className="pl-10 pr-10 h-12"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                >
                                  {showCurrentPassword ? (
                                    <EyeOff className="size-4 text-muted-foreground" />
                                  ) : (
                                    <Eye className="size-4 text-muted-foreground" />
                                  )}
                                </button>
                              </div>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="password"
                          control={passwordForm.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel
                                htmlFor={field.name}
                                className="text-sm font-semibold"
                              >
                                New Password
                              </FieldLabel>
                              <div className="relative">
                                <Lock
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                  size={18}
                                />
                                <Input
                                  {...field}
                                  id={field.name}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="New password"
                                  type={showNewPassword ? "text" : "password"}
                                  className="pl-10 pr-10 h-12"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                >
                                  {showNewPassword ? (
                                    <EyeOff className="size-4 text-muted-foreground" />
                                  ) : (
                                    <Eye className="size-4 text-muted-foreground" />
                                  )}
                                </button>
                              </div>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                        <Controller
                          name="rePassword"
                          control={passwordForm.control}
                          render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                              <FieldLabel
                                htmlFor={field.name}
                                className="text-sm font-semibold"
                              >
                                Confirm Password
                              </FieldLabel>
                              <div className="relative">
                                <Lock
                                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                  size={18}
                                />
                                <Input
                                  {...field}
                                  id={field.name}
                                  aria-invalid={fieldState.invalid}
                                  placeholder="Confirm password"
                                  type={showConfirmPassword ? "text" : "password"}
                                  className="pl-10 pr-10 h-12"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="size-4 text-muted-foreground" />
                                  ) : (
                                    <Eye className="size-4 text-muted-foreground" />
                                  )}
                                </button>
                              </div>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                            </Field>
                          )}
                        />
                      </div>
                      <Button className="cursor-pointer w-full h-12 text-base font-semibold bg-[#0D9D9A] hover:bg-[#087370] dark:bg-[#5FD0CD] dark:hover:bg-[#3BB9B6] transition-all">
                        {passwordForm.formState.isSubmitting ? (
                          <Spinner />
                        ) : (
                          "Update Password"
                        )}
                      </Button>
                    </form>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === "addresses" && (
              <div className="space-y-6">
                {isLoadingAddresses ? (
                  <Card className="p-12 flex justify-center">
                    <Spinner />
                  </Card>
                ) : addresses.length === 0 && !showAddressForm ? (
                  <Card className="cursor-pointer p-6 border-2 border-dashed border-[#0D9D9A]/30 dark:border-[#5FD0CD]/30 hover:border-[#0D9D9A] dark:hover:border-[#5FD0CD] transition-colors">
                    <button
                      onClick={() => setShowAddressForm(true)}
                      className="cursor-pointer w-full flex flex-col items-center justify-center py-8 gap-3 group"
                    >
                      <div className="w-16 h-16 bg-[#0D9D9A]/10 dark:bg-[#5FD0CD]/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="size-8 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-1">Add New Address</h3>
                        <p className="text-sm text-muted-foreground">
                          Click to add a new delivery address
                        </p>
                      </div>
                    </button>
                  </Card>
                ) : null}
                {showAddressForm && (
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-linear-to-br from-[#0D9D9A]/20 to-[#C89B14]/20 dark:from-[#5FD0CD]/20 dark:to-[#F0C75E]/20 rounded-xl flex items-center justify-center">
                          <Plus className="size-6 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold">Add New Address</h2>
                          <p className="text-sm text-muted-foreground">
                            Fill in the details below
                          </p>
                        </div>
                      </div>
                      <Button
                        className="cursor-pointer"
                        variant="ghost"
                        onClick={() => {
                          setShowAddressForm(false);
                          addressForm.reset();
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                    <form onSubmit={addressForm.handleSubmit(handleAddAddress)} className="space-y-5">
                      <Controller
                        name="name"
                        control={addressForm.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name} className="text-sm font-semibold">
                              Name
                            </FieldLabel>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                              <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="e.g., Home, Office"
                                type="text"
                                className="pl-10 h-12"
                              />
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />
                      <Controller
                        name="details"
                        control={addressForm.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name} className="text-sm font-semibold">
                              Details
                            </FieldLabel>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                              <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Street, Building, Apartment"
                                type="text"
                                className="pl-10 h-12"
                              />
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />
                      <Controller
                        name="phone"
                        control={addressForm.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name} className="text-sm font-semibold">
                              Phone
                            </FieldLabel>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                              <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="01xxxxxxxxx"
                                type="tel"
                                className="pl-10 h-12"
                              />
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />
                      <Controller
                        name="city"
                        control={addressForm.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor={field.name} className="text-sm font-semibold">
                              City
                            </FieldLabel>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                              <Input
                                {...field}
                                id={field.name}
                                aria-invalid={fieldState.invalid}
                                placeholder="Alexandria"
                                type="text"
                                className="pl-10 h-12"
                              />
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                          </Field>
                        )}
                      />
                      <Button className="cursor-pointer w-full h-12 bg-[#0D9D9A] hover:bg-[#087370] dark:bg-[#5FD0CD] dark:hover:bg-[#3BB9B6] font-bold">
                        {addressForm.formState.isSubmitting ? <Spinner /> : "Add Address"}
                      </Button>
                    </form>
                  </Card>
                )}

                {addresses.length > 0 && (
                  <>
                    {!showAddressForm && (
                      <Button
                        onClick={() => setShowAddressForm(true)}
                        className="cursor-pointer w-full h-12 bg-[#0D9D9A] hover:bg-[#087370] dark:bg-[#5FD0CD] dark:hover:bg-[#3BB9B6] font-bold"
                      >
                        <Plus className="size-5 mr-2" />
                        Add New Address
                      </Button>
                    )}
                    {addresses.map((address) => (
                      <Card key={address._id} className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 bg-linear-to-br from-[#0D9D9A]/20 to-[#C89B14]/20 dark:from-[#5FD0CD]/20 dark:to-[#F0C75E]/20 rounded-xl flex items-center justify-center">
                            <MapPin className="size-6 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                          </div>
                          <div>
                            <h2 className="text-xl font-bold">{address.name}</h2>
                          </div>
                        </div>

                        <div className="space-y-4 text-muted-foreground">
                          <div className="flex items-start gap-3">
                            <MapPin className="size-5 mt-0.5 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                            <div>
                              <p className="text-sm font-semibold text-foreground mb-1">Details</p>
                              <p className="text-sm">{address.details}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <Phone className="size-5 mt-0.5 text-[#0D9D9A] dark:text-[#5FD0CD]" />
                            <div>
                              <p className="text-sm font-semibold text-foreground mb-1">Phone</p>
                              <p className="text-sm">{address.phone}</p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3">
                            <MapPin className="size-5 mt-0.5 text-[#C89B14] dark:text-[#F0C75E]" />
                            <div>
                              <p className="text-sm font-semibold text-foreground mb-1">City</p>
                              <p className="text-sm">{address.city}</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <Button
                            variant="outline"
                            onClick={() => handleDeleteAddress(address._id)}
                            className="cursor-pointer w-full border-destructive/50 text-destructive hover:text-amber-100"
                          >
                            <Trash2 className="size-4 mr-2" />
                            Delete Address
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}