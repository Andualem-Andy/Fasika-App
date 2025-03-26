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
import toast, { Toaster } from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  time: z.string().min(1, "Time is required"),
  programme: z.string().min(1, "Please select a programme"),
  age: z.number().min(1, "Age is required").max(18, "Age must be less than 18"),
  source: z.string().min(1, "Source is required"),
  center: z.string().min(1, "Please select a daycare center"),
  message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof formSchema>;

export default function ScheduleForm() {
  const { createSchedule } = useScheduleStore();
  const [isMounted, setIsMounted] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      time: "09:00",
      programme: "",
      age: 3,
      source: "",
      center: "",
      message: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        ...data,
        age: Number(data.age),
      };

      const success = await createSchedule(payload);

      if (success) {
        reset();
        toast.success("Form submitted successfully!");
      } else {
        toast.error("Failed to submit form. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-2xl w-full bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-green-800">
              Loading Form...
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center bg-gray-50 py-8">
        <Card className="max-w-2xl w-full bg-white shadow-lg mx-4">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-green-800 flex items-center gap-2">
              <FaChild className="text-green-800" /> Enroll Your Child Today!
            </CardTitle>
            <CardDescription className="text-gray-600">
              Fill out the form below to schedule a tour, register your child, or request more information.
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1">
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
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1">
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
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-1">
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
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Time Field */}
              <div className="space-y-1">
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
                  <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
                )}
              </div>

              {/* Programme Field */}
              <div className="space-y-1">
                <Label htmlFor="programme" className="flex items-center gap-2 text-green-800">
                  <FaSchool className="text-green-800" /> Programme *
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
                  <p className="text-red-500 text-sm mt-1">{errors.programme.message}</p>
                )}
              </div>

              {/* Age Field */}
              <div className="space-y-1">
                <Label htmlFor="age" className="flex items-center gap-2 text-green-800">
                  <FaChild className="text-green-800" /> Age of Child *
                </Label>
                <Input
                  id="age"
                  type="number"
                  min="1"
                  max="18"
                  placeholder="Enter age"
                  {...register("age", { valueAsNumber: true })}
                  className="bg-white border-green-300 focus:border-green-500"
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
                )}
              </div>

              {/* Source Field */}
              <div className="space-y-1">
                <Label htmlFor="source" className="flex items-center gap-2 text-green-800">
                  <FaInfoCircle className="text-green-800" /> How Did You Hear About Us? *
                </Label>
                <Input
                  id="source"
                  placeholder="Enter source"
                  {...register("source")}
                  className="bg-white border-green-300 focus:border-green-500"
                />
                {errors.source && (
                  <p className="text-red-500 text-sm mt-1">{errors.source.message}</p>
                )}
              </div>

              {/* Center Field */}
              <div className="space-y-1">
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
                  <p className="text-red-500 text-sm mt-1">{errors.center.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="space-y-1">
                <Label htmlFor="message" className="flex items-center gap-2 text-green-800">
                  <FaComments className="text-green-800" /> Additional Information *
                </Label>
                <Input
                  id="message"
                  placeholder="Please describe your needs..."
                  {...register("message")}
                  className="bg-white border-green-300 focus:border-green-500"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <CardFooter className="flex justify-end p-0 pt-4">
                <Button 
                  type="submit" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </main>

      <Footer />
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#fff',
            color: '#333',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
    </div>
  );
}