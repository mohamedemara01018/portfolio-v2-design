'use client';
import React, { useState } from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { Mail, MapPin, Phone, Send } from 'lucide-react';

function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            alert("Message sent successfully!");
            setFormData({ name: "", email: "", subject: "", message: "" });
            setIsSubmitting(false);
        }, 1000);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const contactInfo = [
        {
            icon: Mail,
            title: "Email",
            value: "alex.johnson@email.com",
            link: "mailto:alex.johnson@email.com",
        },
        {
            icon: Phone,
            title: "Phone",
            value: "+1 (555) 123-4567",
            link: "tel:+15551234567",
        },
        {
            icon: MapPin,
            title: "Location",
            value: "San Francisco, CA",
            link: "#",
        },
    ];
    return (
        <section id='contact' className='py-24'>
            <div className='wrapper space-y-16'>
                <div className='flex flex-col items-center gap-4'>
                    <TitleOfSection title={'Get In Touch'} />
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                        Have a project in mind? Let's work together to create something amazing
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-2xl font-semibold text-foreground mb-4">
                                Let's Talk About Your Project
                            </h3>
                            <p className="text-muted-foreground mb-6">
                                I'm always interested in hearing about new projects and opportunities.
                                Whether you have a question or just want to say hi, feel free to reach out!
                            </p>
                        </div>

                        <div className="space-y-4">
                            {contactInfo.map((info, index) => {
                                const Icon = info.icon;
                                return (
                                    <a
                                        key={index}
                                        href={info.link}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-(--portfolio-accent) transition-all duration-300 group hover:shadow-(--portfolio-glow)"
                                    >
                                        <div className="p-3 rounded-lg bg-(--portfolio-accent)/10 group-hover:bg-(--portfolio-accent) transition-colors">
                                            <Icon className="w-5 h-5 text-(--portfolio-accent) group-hover:text-white transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground mb-1">{info.title}</p>
                                            <p className="font-medium text-foreground">{info.value}</p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-(--portfolio-accent) focus:ring-2 focus:ring-(--portfolio-accent)/20 outline-none transition-all text-foreground"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-(--portfolio-accent) focus:ring-2 focus:ring-(--portfolio-accent)/20 outline-none transition-all text-foreground"
                                placeholder="john@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-(--portfolio-accent) focus:ring-2 focus:ring-(--portfolio-accent)/20 outline-none transition-all text-foreground"
                                placeholder="Project Discussion"
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-(--portfolio-accent) focus:ring-2 focus:ring-(--portfolio-accent)/20 outline-none transition-all text-foreground resize-none"
                                placeholder="Tell me about your project..."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) text-white rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-(--portfolio-accent)/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactSection