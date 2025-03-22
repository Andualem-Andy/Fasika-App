"use client";

import { useEffect } from "react";
import { useAdmissionStore } from "@/app/stores/admissionStore"; // Import the Zustand store
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQsPage = () => {
  const { data, loading, error, fetchServiceData } = useAdmissionStore();

  useEffect(() => {
    fetchServiceData(); // Fetch data on component mount
  }, [fetchServiceData]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-md text-center">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#000000] mb-4">
        {data?.FAQS}
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-sm md:text-base mb-8">
        {data?.FAQsParagraph}
      </p>

      {/* Accordion FAQs */}
      <Accordion type="multiple" className="space-y-4">
        {[
          { question: data?.Q1, answer: data?.Q1answer },
          { question: data?.Q2, answer: data?.Q2answer },
          { question: data?.Q3, answer: data?.Q3answer },
          { question: data?.Q4, answer: data?.Q4answer },
          { question: data?.Q5, answer: data?.Q5answer },
          { question: data?.Q6, answer: data?.Q6answer },
          { question: data?.Q7, answer: data?.Q7answer },
          { question: data?.Q8, answer: data?.Q8answer },
          { question: data?.Q9, answer: data?.Q9answer },
          { question: data?.Q10, answer: data?.Q10answer },
          { question: data?.Q11, answer: data?.Q11answer },
          { question: data?.Q12, answer: data?.Q12answer },
        ]
          .filter((faq) => faq.question) // Ensure questions exist before rendering
          .map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-[#F5DE191A] rounded-lg p-4 md:p-8 shadow-sm w-full md:w-11/12 mx-auto"
            >
              {/* 🔹 QUESTION TITLE */}
              <AccordionTrigger className="text-lg md:text-2xl font-bold text-[#073F27] hover:no-underline">
                {faq.question}
              </AccordionTrigger>

              {/* 🔹 ANSWER WITH `---` DELIMITER HANDLING */}
              <AccordionContent className="text-gray-600 text-base md:text-xl text-left">
                {faq.answer
                  ? faq.answer.split("---").map((part, idx) => (
                      <div key={idx} className="mb-2">
                        {idx > 0}
                        {part.trim()}
                      </div>
                    ))
                  : "Answer coming soon..."}
              </AccordionContent>
            </AccordionItem>
          ))}
      </Accordion>
    </div>
    
  );
};

export default FAQsPage;