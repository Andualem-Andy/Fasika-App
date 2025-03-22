"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';
import NewsletterSection from '@/app/components/Newsletter/Newsletter';
import Footer from '@/app/components/footer/footer';

// Dynamically import Select components with SSR disabled
const Select = dynamic(
  () => import('@/components/ui/select').then((mod) => mod.Select),
  { ssr: false }
);
const SelectTrigger = dynamic(
  () => import('@/components/ui/select').then((mod) => mod.SelectTrigger),
  { ssr: false }
);
const SelectValue = dynamic(
  () => import('@/components/ui/select').then((mod) => mod.SelectValue),
  { ssr: false }
);
const SelectContent = dynamic(
  () => import('@/components/ui/select').then((mod) => mod.SelectContent),
  { ssr: false }
);
const SelectItem = dynamic(
  () => import('@/components/ui/select').then((mod) => mod.SelectItem),
  { ssr: false }
);

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
    time: '',
    programme: '',
    age: '',
    source: '',
    center: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    // Client-side logic (if needed)
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSelectChange = (id: keyof FormData, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.center.trim()) newErrors.center = 'Center is required';

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (formData.age && (isNaN(Number(formData.age)) || Number(formData.age) < 0)) {
      newErrors.age = 'Age must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:1337/api/schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: formData }), // Ensure the data is wrapped in a "data" object
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          time: '',
          programme: '',
          age: '',
          source: '',
          center: '',
          message: ''
        });
        setErrors({});
      } else {
        const errorData = await response.json();
        console.error('Error from Strapi:', errorData);
        alert('Failed to submit form. Please check the console for details.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  return (
    <>
      <Card className="max-w-[700px] h-auto mx-auto mt-10">
        <CardHeader>
          <CardTitle>Enroll With Us Today!</CardTitle>
          <CardDescription>
            Use the form below to schedule a tour, register a child, or to request more information.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Best Number To Reach You</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0912625381"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Best Time To Reach You</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="programme">Programme (FT/PT)</Label>
              <Select onValueChange={(value) => handleSelectChange('programme', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select programme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ft">Full Time</SelectItem>
                  <SelectItem value="pt">Part Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age Of Child</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                value={formData.age}
                onChange={handleChange}
                min="0" // Ensure age is not negative
              />
              {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="source">Where Did You Hear About Us</Label>
              <Input
                id="source"
                placeholder="Enter source"
                value={formData.source}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="center">Choose A Center *</Label>
              <Select onValueChange={(value) => handleSelectChange('center', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select center" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crystal-city">Ayat Daycare</SelectItem>
                  <SelectItem value="fair-oaks">Summit Daycare</SelectItem>
                  <SelectItem value="fair-oaks">Bole Daycare</SelectItem>
                  <SelectItem value="fair-oaks">Safari Preschool</SelectItem>
                </SelectContent>
              </Select>
              {errors.center && <p className="text-red-500 text-sm">{errors.center}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">How Can FASIKA! Help Your Family?</Label>
              <Input
                id="message"
                placeholder="Please describe..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>
            <CardFooter>
              <Button type="submit" className="w-full">Submit</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>

      <NewsletterSection />
      <Footer />
    </>
  );
}