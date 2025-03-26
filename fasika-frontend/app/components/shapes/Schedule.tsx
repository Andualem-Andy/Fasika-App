"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import NewsletterSection from '@/app/components/Newsletter/Newsletter';
import Footer from '@/app/components/footer/footer';
import Image from 'next/image';
import toast from 'react-hot-toast';

interface FormData {
  name: string;
  email: string;
  phone: string;
  time: string;
  programme: string;
  age: string;
  source: string;
  center: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
  center?: string;
}

export default function Schedule() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    time: '09:00',
    programme: 'ft',
    age: '3',
    source: '',
    center: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Auto-save form data
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSelectChange = (id: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.center) newErrors.center = 'Center is required';

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) < 0 || Number(formData.age) > 18)) {
      newErrors.age = 'Age must be between 0-18';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/schedules`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formData }),
      });

      if (response.ok) {
        toast.success('Form submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          time: '09:00',
          programme: 'ft',
          age: '3',
          source: '',
          center: '',
          message: ''
        });
        localStorage.removeItem('formData');
      } else {
        const errorData = await response.json();
        toast.error(errorData.error?.message || 'Failed to submit form');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
        <CardHeader>
  <div className="flex items-center gap-4 mb-4">
    <div className="relative w-16 h-16">
      <Image 
        src="/images/logo.png" 
        alt="Fasika Logo"
        fill
        className="rounded-lg object-contain"
      />
    </div>
    <div>
      <CardTitle className="text-2xl font-bold">Enroll With Us Today!</CardTitle>
      <CardDescription>
        Use the form below to schedule a tour, register a child, or request more information.
      </CardDescription>
    </div>
  </div>
</CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0912625381"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Time */}
                <div className="space-y-2">
                  <Label htmlFor="time">Best Time To Reach You</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Programme */}
                <div className="space-y-2">
                  <Label>Programme</Label>
                  <Select 
                    value={formData.programme} 
                    onValueChange={(value) => handleSelectChange('programme', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select programme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ft">Full Time</SelectItem>
                      <SelectItem value="pt">Part Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age */}
<div className="space-y-2">
  {/* eslint-disable-next-line react/no-unescaped-entities */}
  <Label htmlFor="age">Child's Age</Label>
  <Input
    id="age"
    type="number"
    placeholder="Enter age"
    value={formData.age}
    onChange={handleChange}
    min="0"
    max="18"
    disabled={isSubmitting}
  />
  {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
</div>

                {/* Center */}
                <div className="space-y-2">
                  <Label>Center *</Label>
                  <Select 
                    value={formData.center} 
                    onValueChange={(value) => handleSelectChange('center', value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select center" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ayat-daycare">Ayat Daycare</SelectItem>
                      <SelectItem value="summit-daycare">Summit Daycare</SelectItem>
                      <SelectItem value="bole-daycare">Bole Daycare</SelectItem>
                      <SelectItem value="safari-preschool">Safari Preschool</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.center && <p className="text-red-500 text-sm">{errors.center}</p>}
                </div>

                {/* Source */}
                <div className="space-y-2">
                  <Label htmlFor="source">How You Heard About Us</Label>
                  <Input
                    id="source"
                    placeholder="Enter source"
                    value={formData.source}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">How Can We Help Your Family?</Label>
                <Input
                  id="message"
                  placeholder="Please describe..."
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <CardFooter className="p-0 pt-4">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">↻</span>
                      Submitting...
                    </span>
                  ) : 'Submit'}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </main>

      <NewsletterSection />
      <Footer />
    </div>
  );
}