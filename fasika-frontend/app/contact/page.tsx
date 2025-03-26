"use client";
import React, { useEffect, useState, useMemo } from "react";
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
import { Phone, Mail } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:1337";
const DEFAULT_CONTACT_EMAIL = process.env.NEXT_PUBLIC_DEFAULT_CONTACT_EMAIL || "info@example.com";
const DEFAULT_CONTACT_PHONE = process.env.NEXT_PUBLIC_DEFAULT_CONTACT_PHONE || "+251 912625381";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-100 animate-pulse" />,
});

const ToastContainer = dynamic(
  () => import("react-toastify").then((c) => c.ToastContainer),
  { ssr: false }
);

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  findUs: z.string().min(1, "Please select how you found us"),
});

type ContactFormInputs = z.infer<typeof contactFormSchema>;

const ContactDetails = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
    <div className="flex flex-col items-center space-y-1 p-4 bg-gray-50 rounded-lg">
      <Phone className="text-gray-500" />
      <span className="text-sm font-medium text-gray-700">Phone</span>
      <span className="text-lg font-semibold">{DEFAULT_CONTACT_PHONE}</span>
    </div>
    <div className="flex flex-col items-center space-y-1 p-4 bg-gray-50 rounded-lg">
      <Mail className="text-gray-500" />
      <span className="text-sm font-medium text-gray-700">Email</span>
      <span className="text-lg font-semibold break-all">{DEFAULT_CONTACT_EMAIL}</span>
    </div>
  </div>
);

const ContactForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: useMemo(() => ({
      name: "",
      email: "",
      phone: "",
      findUs: "",
    }), [])
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

      const response = await fetch(`${API_BASE_URL}/api/contact-customers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to submit form");
      }

      reset();
      toast.success("Form submitted successfully!");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full bg-white shadow-none rounded-lg h-full border-none">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          <span className="text-green-800">Get in</span>
          <span className="text-yellow-500"> Touch</span>
        </CardTitle>
        <CardDescription className="text-gray-600">
          Have questions or need assistance? Fill out the form below and our team will respond within 24 hours.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Name"
                  className={errors.name ? "border-red-500" : ""}
                />
              )}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="Email"
                  className={errors.email ? "border-red-500" : ""}
                />
              )}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="tel"
                  placeholder="Phone Number"
                  className={errors.phone ? "border-red-500" : ""}
                />
              )}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <Controller
              name="findUs"
              control={control}
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
            {errors.findUs && <p className="text-red-500 text-sm mt-1">{errors.findUs.message}</p>}
          </div>
          <Button
            type="submit"
            className="w-full bg-[#073F27] hover:bg-green-700 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "SEND"}
          </Button>
        </form>
        <ContactDetails />
      </CardContent>
    </Card>
  );
};

export default function ContactPage() {
  const { data, loading, error, fetchContactData } = useContactStore();
  const [bgImageUrl, setBgImageUrl] = useState<string>("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    fetchContactData();
  }, [fetchContactData]);

  useEffect(() => {
    if (data?.contactbg?.formats?.large?.url) {
      setBgImageUrl(`${API_BASE_URL}${data.contactbg.formats.large.url}`);
    }
  }, [data]);

  if (!hasMounted) return null;

  return (
    <PageLayout
      title="Contact Us"
      bgImageUrl={bgImageUrl}
      loading={loading}
      error={error}
    >
      {/* Mobile View */}
      <div className="md:hidden flex flex-col p-4 space-y-8">
        <div className="w-full z-10 mb-8">
          <ContactForm />
        </div>
        <div className="w-full h-[400px] z-10">
          <LeafletMap />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:flex flex-row items-center justify-center p-4 space-x-8 h-[600px] relative">
        <div className="w-1/3 h-full flex justify-center items-center relative z-10">
          <div
            className="absolute top-[-20%] left-[-40px] right-[-60%] h-[120%] w-auto bg-white shadow-xl z-0"
            style={{
              background: "white",
              boxShadow: "0px 98.75px 140.08px -56.03px #193A4B4D",
            }}
          />
          <div className="absolute z-10 top-[-10%] h-full w-full">
            <ContactForm />
          </div>
        </div>

        <div className="w-1/3 h-full relative flex justify-center items-center">
          <div className="relative z-10 top-[-10%] left-[-10px] right-[-80px] h-full w-full">
            <LeafletMap />
          </div>
          <div
            className="absolute top-[-20%] left-[-80px] right-[-80px] h-[120%] w-[calc(100%+10rem)] shadow-xl z-0 rounded-tr-3xl rounded-br-3xl"
            style={{
              background: "linear-gradient(to right, white 50%, #F5DE19 50%)",
              boxShadow: "0px 98.75px 140.08px -56.03px #193A4B4D",
            }}
          />
        </div>
      </div>

      <div className="mt-16">
        <ContactInfo />
        <NewsletterSection />
        <Footer />
      </div>

      {hasMounted && (
        <ToastContainer
          position="top-right"
          autoClose={3000}
          pauseOnHover={false}
          newestOnTop
        />
      )}
    </PageLayout>
  );
}