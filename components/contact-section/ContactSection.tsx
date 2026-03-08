'use client';
import React, { useState } from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { ProfileInfoData } from '@/services/profileInfo.service';
import { MessageService } from '@/services/message.service';
import Notification, { NotificationState } from '../notification/Notification';
import { motion, Variants } from 'framer-motion'

interface HeroSectionProps {
    profileInfo: ProfileInfoData | null
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

function ContactSection({ profileInfo }: HeroSectionProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState<NotificationState | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await MessageService.createMessage(formData);
            setNotification({ message: 'Message sent successfully!', type: 'success' })
            setFormData({ name: "", email: "", subject: "", message: "" });
        } catch (error: any) {
            console.error(error?.message || 'Error in sending message');
            setNotification({ message: 'Error sending message', type: 'error' })
        } finally {
            setIsSubmitting(false)
        }
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
            value: profileInfo?.email,
            link: `mailto:${profileInfo?.email}`,
        },
        {
            icon: Phone,
            title: "Phone",
            value: profileInfo?.phone,
            link: `tel:${profileInfo?.phone}`,
        },
        {
            icon: MapPin,
            title: "Location",
            value: profileInfo?.location,
            link: "#",
        },
    ];

    return (
        <>
            <section id='contact' className='py-24 overflow-hidden'>
                <div className='wrapper space-y-16'>
                    <motion.div
                        className='flex flex-col items-center gap-4'
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <TitleOfSection title={'Get In Touch'} />
                        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-center">
                            Have a project in mind? Let's work together to create something amazing
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <motion.div
                            className="space-y-10"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div>
                                <h3 className="text-2xl font-bold text-foreground mb-4">
                                    Let's Talk About Your Project
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    I'm always interested in hearing about new projects and opportunities.
                                    Whether you have a question or just want to say hi, feel free to reach out!
                                </p>
                            </div>

                            <motion.div
                                className="space-y-4"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {contactInfo.map((info, index) => {
                                    const Icon = info.icon;
                                    return (
                                        <motion.a
                                            key={index}
                                            href={info.link}
                                            variants={itemVariants}
                                            className="flex items-center gap-5 p-5 rounded-3xl bg-card border border-border hover:border-(--portfolio-accent) transition-all duration-300 group hover:shadow-(--portfolio-glow)"
                                            whileHover={{ x: 10 }}
                                            aria-label={`Contact me via ${info.title}: ${info.value}`}
                                        >
                                            <div className="p-4 rounded-2xl bg-(--portfolio-accent)/10 group-hover:bg-(--portfolio-accent) transition-colors shadow-sm">
                                                <Icon className="w-6 h-6 text-(--portfolio-accent) group-hover:text-white transition-colors" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">{info.title}</p>
                                                <p className="font-bold text-foreground group-hover:text-(--portfolio-accent) transition-colors">{info.value || 'N/A'}</p>
                                            </div>
                                        </motion.a>
                                    );
                                })}
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6 bg-card/30 p-8 rounded-3xl border border-border backdrop-blur-sm shadow-xl">
                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold text-foreground ml-1">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-(--portfolio-accent) focus:ring-4 focus:ring-(--portfolio-accent)/10 outline-none transition-all text-foreground font-medium"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-bold text-foreground ml-1">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-(--portfolio-accent) focus:ring-4 focus:ring-(--portfolio-accent)/10 outline-none transition-all text-foreground font-medium"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-sm font-bold text-foreground ml-1">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-(--portfolio-accent) focus:ring-4 focus:ring-(--portfolio-accent)/10 outline-none transition-all text-foreground font-medium"
                                        placeholder="Project Discussion"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-foreground ml-1">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-(--portfolio-accent) focus:ring-4 focus:ring-(--portfolio-accent)/10 outline-none transition-all text-foreground font-medium resize-none"
                                        placeholder="Tell me about your project..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-8 py-4 bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-(--portfolio-accent)/20"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                    <Send className="w-5 h-5" />
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
            <Notification notification={notification} onClose={() => setNotification(null)} />
        </>
    )
}

export default ContactSection
