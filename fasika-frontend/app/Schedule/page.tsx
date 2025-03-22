"use client";

import React, { useState, useEffect } from "react";
import { useScheduleStore } from "../stores/useScheduleStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { FaUser, FaEnvelope, FaPhone, FaClock, FaChild, FaSchool, FaInfoCircle, FaComments } from "react-icons/fa";
import Navbar from "@/app/components/header/Navbar";
import Footer from "@/app/components/footer/footer";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Dynamically import Toaster from react-hot-toast with SSR disabled
const Toaster = dynamic(
  () => import("react-hot-toast").then((c) => c.Toaster),
  { ssr: false }
);

// Define validation schema using Zod
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  time: z.string().min(1, "Time is required"), // Make time required
  programme: z.string().min(1, "Please select a programme"),
  age: z.number().min(1, "Age is required").max(18, "Age must be less than 18"),
  source: z.string().min(1, "Source is required"),
  center: z.string().min(1, "Please select a daycare center"),
  message: z.string().min(1, "Message is required"), // Make message required
});

type FormData = z.infer<typeof formSchema>;

export default function ScheduleForm() {
  const { createSchedule } = useScheduleStore();

  // Initialize React Hook Form
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      time: "00:00", // Provide a default value for time
      programme: "",
      age: 0,
      source: "",
      center: "",
      message: "", // Provide a default value for message
    },
  });

  // Ensure the form is only rendered on the client side
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (data: FormData) => {
    const payload = {
      ...data,
      age: Number(data.age),
      time: data.time || "00:00:00.000", // Ensure time is always a string
      message: data.message || "No message provided", // Ensure message is always a string
    };

    console.log('Payload:', payload); // Log the payload

    const success = await createSchedule(payload);

    // Reset the form if the submission was successful
    if (success) {
      reset();
      toast.success("Form submitted successfully!");
    } else {
      toast.error("Failed to submit form. Please try again.");
    }
  };

  // Render nothing on the server side
  if (!isClient) {
    return null;
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Form Card */}
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-2xl w-full bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-green-800 flex items-center gap-2">
              <FaChild className="text-green-800" /> Enroll Your Child Today!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Fill out the form below to schedule a tour, register your child, or request more information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2 text-green-800">
                  <FaUser className="text-green-800" /> Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  {...register("name")}
                  className="bg-white border-green-300 focus:border-green-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-green-800">
                  <FaEnvelope className="text-green-800" /> Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  className="bg-white border-green-300 focus:border-green-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2 text-green-800">
                  <FaPhone className="text-green-800" /> Phone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  {...register("phone")}
                  className="bg-white border-green-300 focus:border-green-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}
              </div>

              {/* Time Field */}
              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2 text-green-800">
                  <FaClock className="text-green-800" /> Best Time to Reach You *
                </Label>
                <Input
                  id="time"
                  type="time"
                  {...register("time")}
                  className="bg-white border-green-300 focus:border-green-500"
                />
                {errors.time && (
                  <p className="text-red-500 text-sm">{errors.time.message}</p>
                )}
              </div>

              {/* Programme Field */}
              <div className="space-y-2">
                <Label htmlFor="programme" className="flex items-center gap-2 text-green-800">
                  <FaSchool className="text-green-800" /> Programme (FT/PT) *
                </Label>
                <Controller
                  name="programme"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-white border-green-300 focus:border-green-500">
                        <SelectValue placeholder="Select programme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ft">Full Time</SelectItem>
                        <SelectItem value="pt">Part Time</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.programme && (
                  <p className="text-red-500 text-sm">{errors.programme.message}</p>
                )}
              </div>

              {/* Age Field */}
              <div className="space-y-2">
                <Label htmlFor="age" className="flex items-center gap-2 text-green-800">
                  <FaChild className="text-green-800" /> Age of Child *
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter age"
                  {...register("age", { valueAsNumber: true })}
                  className="bg-white border-green-300 focus:border-green-500"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm">{errors.age.message}</p>
                )}
              </div>

              {/* Source Field */}
              <div className="space-y-2">
                <Label htmlFor="source" className="flex items-center gap-2 text-green-800">
                  <FaInfoCircle className="text-green-800" /> Where Did You Hear About Us? *
                </Label>
                <Input
                  id="source"
                  placeholder="Enter source"
                  {...register("source")}
                  className="bg-white border-green-300 focus:border-green-500"
                />
                {errors.source && (
                  <p className="text-red-500 text-sm">{errors.source.message}</p>
                )}
              </div>

              {/* Center Field */}
              <div className="space-y-2">
                <Label htmlFor="center" className="flex items-center gap-2 text-green-800">
                  <FaSchool className="text-green-800" /> Choose a Center *
                </Label>
                <Controller
                  name="center"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-white border-green-300 focus:border-green-500">
                        <SelectValue placeholder="Select center" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ayat daycare">Ayat Daycare</SelectItem>
                        <SelectItem value="sumit daycare">Sumit Daycare</SelectItem>
                        <SelectItem value="bole daycare">Bole Daycare</SelectItem>
                        <SelectItem value="safari preschool">Safari Preschool</SelectItem>
                        <SelectItem value="megenagna Nanny Center">Megnagna Nanny Center</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.center && (
                  <p className="text-red-500 text-sm">{errors.center.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-2">
                <Label htmlFor="message" className="flex items-center gap-2 text-green-800">
                  <FaComments className="text-green-800" /> How Can We Help Your Family? *
                </Label>
                <Input
                  id="message"
                  placeholder="Please describe..."
                  {...register("message")}
                  className="bg-white border-green-300 focus:border-green-500"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <CardFooter className="flex justify-end p-0">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                  Submit
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Footer />

      {/* Add the Toaster component here */}
      <Toaster position="top-right" />
    </div>
  );
}