"use client"; // Ensure this is at the top of the file
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useContactStore } from "@/app/stores/contactStore";
import PageLayout from "@/app/components/PageLayout/PageLayout";
import NewsletterSection from "../components/Newsletter/Newsletter";
import ContactInfo from "../contact/contactInfo";
import Footer from "../components/footer/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Printer } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Dynamically import the LeafletMap component with SSR disabled
const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false, // Disable SSR for this component
  loading: () => <p>Loading map...</p>, // Add a loading fallback
});

// Dynamically import ToastContainer with SSR disabled
const ToastContainer = dynamic(
  () => import("react-toastify").then((c) => c.ToastContainer),
  { ssr: false }
);

// Define validation schema using Zod
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  findUs: z.string().min(1, "Please select how you found us"),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

// Contact Form Component
const ContactForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track if component is mounted

  useEffect(() => {
    setIsMounted(true); // Set mounted to true after component mounts
  }, []);

  const onSubmit = async (data: ContactFormInputs) => {
    setIsSubmitting(true);
    try {
      const payload = {
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          findUs: data.findUs,
        },
      };

      console.log("Request payload:", payload); // Log the payload

      const response = await fetch("http://localhost:1337/api/contact-customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("API response status:", response.status); // Log the response status

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error response:", errorData);
        throw new Error(errorData.error.message || "Failed to submit form");
      }

      // Reset form on success
      reset();
      toast.success("Form submitted successfully!");
    } catch (error) {
      // Type-check the error
      if (error instanceof Error) {
        console.error("Error submitting form:", error);
        toast.error(error.message || "Failed to submit form. Please try again.");
      } else {
        console.error("Unknown error:", error);
        toast.error("An unknown error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Only render the form after the component has mounted
  if (!isMounted) {
    return null; // Return null during SSR to avoid hydration mismatch
  }

  return (
    <Card className="w-full bg-white shadow-none rounded-lg h-full border-none">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          <span className="text-green-800">Get in</span>
          <span className="text-yellow-500"> Touch</span>
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          Bnim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel ornare non id blandit netus.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Controller
              control={control}
              name="name"
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  id="name"
                  placeholder="Name"
                  required
                  className={errors.name ? "border-red-500" : ""}
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name="email"
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="Email"
                  required
                  className={errors.email ? "border-red-500" : ""}
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name="phone"
              defaultValue=""
              render={({ field }) => (
                <Input
                  {...field}
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className={errors.phone ? "border-red-500" : ""}
                />
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name="findUs"
              defaultValue=""
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="How did you find us?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="search">Search Engine</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.findUs && (
              <p className="text-red-500 text-sm mt-1">{errors.findUs.message}</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-[#073F27] hover:bg-green-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "SEND"}
          </Button>
        </form>
        <div className="flex justify-between mt-6">
          <div className="flex flex-col items-center space-y-1">
            <Phone className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Phone</span>
            <span className="text-lg font-semibold">+251 912625381</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Printer className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Fax</span>
            <span className="text-lg font-semibold">+251 116 123456</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Mail className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Email</span>
            <span className="text-lg font-semibold">info@example.com</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Contact Page Component
export default function ContactPage() {
  const { data, loading, error, fetchContactData } = useContactStore();
  const [bgImageUrl, setBgImageUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchContactData();
      } catch (err) {
        console.error("Failed to fetch contact data:", err);
      }
    };
    fetchData();
  }, [fetchContactData]);

  // Set background image URL
  useEffect(() => {
    if (data?.contactbg?.formats?.large?.url) {
      setBgImageUrl(`http://localhost:1337${data.contactbg.formats.large.url}`);
    } else {
      setBgImageUrl(""); // Fallback to no image
    }
  }, [data]);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageLayout
      title="Contact Us"
      bgImageUrl={bgImageUrl}
      loading={loading || isLoading}
      error={error}
    >
      {/* Page Content */}
      <div className="flex flex-col md:flex-row items-center justify-center p-4 space-y-8 md:space-y-0 md:space-x-8 h-[600px] relative">
        {/* Contact Form with White Background */}
        <div className="w-full md:w-1/3 h-full flex justify-center items-center relative z-10">
          <div
            className="absolute top-[-20%] left-[-40px] right-[-60%] h-[120%] w-auto bg-white shadow-xl z-0"
            style={{
              background: "white",
              boxShadow: "0px 98.75px 140.08px -56.03px #193A4B4D",
            }}
          ></div>
          <div className="absolute z-10 top-[-10%] h-full w-full">
            <ContactForm />
          </div>
        </div>

        {/* Map with SVG Border */}
        <div className="absolute w-full md:w-1/3 h-full relative flex justify-center items-center">
          <div className="relative z-10 top-[-10%] left-[-10px] right-[-80px] h-full w-full">
            <LeafletMap />
          </div>
          <div
            className="hidden md:block absolute top-[-20%] left-[-80px] right-[-80px] h-[120%] w-[calc(100%+10rem)] shadow-xl z-0 rounded-tr-3xl rounded-br-3xl"
            style={{
              background: "linear-gradient(to right, white 50%, #F5DE19 50%)",
              boxShadow: "0px 98.75px 140.08px -56.03px #193A4B4D",
            }}
          ></div>
        </div>
      </div>

      {/* Newsletter and Footer */}
      <div className="mt-16">
        <ContactInfo />
        <NewsletterSection />
        <Footer />
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </PageLayout>
  );
}