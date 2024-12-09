import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What kinds of charities are there, and how can I locate them?",
    answer:
      "There are various types of charities focusing on different causes...",
  },
  {
    question: "What payment can we use to make a donation?",
    answer: "We accept various payment methods including credit cards...",
  },
  {
    question: "Can I donate used goods to reduce the nominal amount of money?",
    answer: "Yes, we accept in-kind donations depending on the program...",
  },
  {
    question: "Where is the platform that I can do to make a donation?",
    answer: "You can donate directly through our website...",
  },
  {
    question: "Can I donate goods or money as anonymous?",
    answer: "Yes, we support anonymous donations...",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 text-white w-full ">
      <div className="w-full max-w-[840px] mx-auto">
        <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
