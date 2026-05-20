import { z } from "zod";

// B2C Registration Schema (Individual training signup)
export const b2cSchema = z.object({
  fullName: z.string().min(3, "Emri duhet të jetë minimalisht 3 shkronja"),
  email: z.string().email("Ju lutem vendosni një email të saktë"),
  phone: z.string().min(9, "Vendosni një numër telefoni valid"),
  trainingSlug: z.string().optional(),
});

export type B2CFormData = z.infer<typeof b2cSchema>;

// B2B Proposal Request Schema (Corporate inquiries)
export const b2bSchema = z.object({
  companyName: z.string().min(2, "Emri i kompanisë është i detyrueshëm"),
  contactPerson: z.string().min(3, "Emri i personit të kontaktit"),
  email: z.string().email("Ju lutem vendosni një email të saktë"),
  phone: z.string().min(9, "Vendosni një numër telefoni valid"),
  participants: z.enum(["1-10", "11-50", "50+"]),
  inquiry: z.string().min(10, "Përshkruani thelbin e nevojës suaj"),
});

export type B2BFormData = z.infer<typeof b2bSchema>;

// Contact form schema
export const contactSchema = z.object({
  name: z.string().min(2, "Emri është i detyrueshëm"),
  email: z.string().email("Ju lutem vendosni një email të saktë"),
  subject: z.string().min(3, "Tema është e detyrueshme"),
  message: z.string().min(10, "Mesazhi duhet të ketë minimalisht 10 karaktere"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
