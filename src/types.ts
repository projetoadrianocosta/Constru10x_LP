export interface TicketLot {
  id: number;
  name: string;
  price: number;
  priceFormatted: string;
  installments: string;
  status: 'active' | 'upcoming' | 'closed';
  label?: string;
  deadlineDescription: string;
}

export interface PreLaunchClass {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  badge: string;
  summary: string;
  takeaways: string[];
}

export interface ScheduleBlock {
  time: string;
  title: string;
  description: string;
  highlights: string[];
}

export interface TestimonialCase {
  id: string;
  name: string;
  role: string;
  location: string;
  tag: string;
  result: string;
  story: string;
  metricLabel: string;
  metricValue: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}
