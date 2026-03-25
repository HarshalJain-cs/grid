import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqData } from '@/data/faq';

export default function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-28 px-6">
      <div className="max-w-[800px] mx-auto">
        <h2 className="font-display text-4xl md:text-5xl text-ink mb-4">Questions</h2>
        <p className="font-body text-base text-ink-muted mb-12">Everything you need to know before the event.</p>
        <Accordion type="single" collapsible>
          {faqData.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b border-cream-border">
              <AccordionTrigger className="py-5 text-left font-body text-base text-ink hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent>
                <p className="font-body text-sm text-ink-muted leading-relaxed">{f.a}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
