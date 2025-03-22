"use client";

import React, { useCallback, useState } from 'react';
import { useHeroStore } from "@/app/stores/heroStore";
import { useSubscriptionStore } from "@/app/stores/subscriptionStore";
import { PageSkeleton } from "@/app/components/skeletons/page-skeleton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// Define the shape of the result object
interface SubscriptionResult {
  error?: string;
  success?: boolean;
}

// NewsletterForm Component
const NewsletterForm = ({
  isSubscribed,
  email,
}: {
  isSubscribed: boolean;
  email: string;
}) => {
  const {
    error: subscriptionError,
    isLoading,
    setEmail,
    subscribe,
    reset,
  } = useSubscriptionStore();
  const [showSuccessCard, setShowSuccessCard] = useState(false);

  // Handle form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Prepare the payload
      const payload = {
        data: {
          email: email,
        },
      };
      console.log('Payload:', payload);

      // Call the subscribe function
      try {
        const result = await subscribe() as unknown as SubscriptionResult; // Cast the result to SubscriptionResult

        if (result?.error) {
          if (result.error === 'This attribute must be unique') {
            reset(); // Reset the form state
            alert('This email is already subscribed.'); // Show a user-friendly message
          } else {
            alert(result.error); // Show other errors
          }
        } else {
          // Show the success card and hide it after 5 seconds
          setShowSuccessCard(true);
          setTimeout(() => {
            setShowSuccessCard(false);
            setEmail(''); // Reset the email field
          }, 5000); // 5 seconds
        }
      } catch (error) {
        console.error('Subscription failed:', error);
        alert('Subscription failed. Please try again.');
      }
    },
    [subscribe, setEmail, reset, email]
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-[600px] mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-2 sm:gap-0 w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (subscriptionError) reset();
            }}
            placeholder="Your Email"
            className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 border ${
              subscriptionError ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 ${
              subscriptionError ? 'focus:ring-red-300' : 'focus:ring-blue-500'
            } rounded sm:rounded-none text-sm sm:text-base md:text-lg`}
            aria-label="Email address"
            aria-describedby="email-error"
            aria-invalid={!!subscriptionError}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !email}
            className="bg-green-900 hover:bg-green-950 text-yellow-400 font-medium px-6 sm:px-8 py-3 sm:py-4 rounded sm:rounded-none 
                     transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-300
                     disabled:opacity-75 disabled:cursor-not-allowed whitespace-nowrap text-sm sm:text-base md:text-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-yellow-400"></div>
                <span>Subscribing...</span>
              </div>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>

        {subscriptionError && (
          <p id="email-error" className="text-red-500 text-xs sm:text-sm mt-2 text-left" aria-live="polite">
            {subscriptionError}
          </p>
        )}
      </form>

      {/* Success Card */}
      {showSuccessCard && (
        <div className="mt-6">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Success!</CardTitle>
              <CardDescription>
                You'll receive updates on <strong>{email}</strong>.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Thank you for subscribing to our newsletter.
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

// NewsletterSection Component
export default function NewsletterSection() {
  const { heroes, loading, error, fetchHeroes } = useHeroStore();
  const { email, isSubscribed } = useSubscriptionStore(); // Destructure email and isSubscribed

  React.useEffect(() => {
    fetchHeroes();
  }, [fetchHeroes]);

  if (loading) return <PageSkeleton />;
  if (error)
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  const hero = heroes.length > 0 ? heroes[0] : null;
  if (!hero) return <PageSkeleton />;

  return (
    <div className="bg-[#F5DE191A] py-8 sm:py-12 md:py-16 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs sm:text-sm font-bold text-green-900 uppercase tracking-wide mb-3 sm:mb-4">
          {hero.Newsletter}
        </p>

        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 px-2 sm:px-4">
          {hero.LittleMinds}
        </h2>

        <div className="mb-6 sm:mb-8 px-2 sm:px-4">
          <p className="text-base sm:text-lg text-black text-left lg:text-center">
            {hero.LittleMindsDesc}
          </p>
        </div>

        {/* Render the NewsletterForm without reCAPTCHA */}
        <NewsletterForm isSubscribed={isSubscribed} email={email} />
      </div>
    </div>
  );
}