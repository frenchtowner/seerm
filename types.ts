export interface Contact {
    id: string;
    user_id: string;
    name: string;
    email?: string;
    phone?: string;
    mailing_address?: string;
    status: "healthy" | "neglected" | "critical";
    urgency: number;
    last_contact_date?: string;
    contact_frequency_days?: number;
    notes?: string;
    tags?: string[];
    created_at: string;
  }
  