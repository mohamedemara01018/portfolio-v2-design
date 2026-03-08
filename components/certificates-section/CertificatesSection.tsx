'use client';
import React from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { ExternalLink, Award, Calendar } from 'lucide-react'
import { CertificateData } from '@/services/certificate.service'
import Image from 'next/image';
import { motion, Variants } from 'framer-motion'

interface CertificatesSectionProps {
    certificates: CertificateData[];
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

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1]
        }
    }
}

function CertificatesSection({ certificates }: CertificatesSectionProps) {

    if (!certificates || certificates.length === 0) return null;

    return (
        <section id='certificates' className='py-24 bg-card/30 overflow-hidden'>
            <div className='wrapper space-y-16'>
                <motion.div
                    className='flex flex-col items-center gap-4'
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <TitleOfSection title='Certificates' />
                    <p className='text-muted-foreground mt-4 text-center max-w-2xl'>Professional certifications and completed courses</p>
                </motion.div>

                <motion.div
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full'
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {[...certificates].reverse().map((cert) => (
                        <motion.div
                            key={cert._id}
                            variants={cardVariants}
                            className='group bg-background rounded-3xl overflow-hidden border border-border hover:border-(--portfolio-accent) transition-all duration-500 hover:shadow-(--portfolio-glow) flex flex-col'
                        >
                            <div className='relative aspect-video overflow-hidden bg-muted'>
                                {cert.coverImage ? (
                                    <Image
                                        src={typeof cert.coverImage === 'string' ? cert.coverImage : "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"}
                                        alt={cert.title}
                                        fill
                                        className='object-cover group-hover:scale-110 transition-transform duration-700'
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                        <Award size={48} strokeWidth={1} />
                                    </div>
                                )}
                                {cert.certificateLink && (
                                    <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center'>
                                        <motion.a
                                            href={cert.certificateLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-2 rounded-full bg-(--portfolio-accent) text-white font-bold hover:shadow-lg transition-all flex items-center gap-2"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            aria-label={`View certificate for ${cert.title}`}
                                        >
                                            <span>View Certificate</span>
                                            <ExternalLink className="w-4 h-4" />
                                        </motion.a>
                                    </div>
                                )}
                            </div>

                            <div className='p-8 flex flex-col grow space-y-4'>
                                <div className='space-y-2'>
                                    <h3 className='text-xl font-bold text-foreground group-hover:text-(--portfolio-accent) transition-colors line-clamp-2 leading-tight'>
                                        {cert.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-foreground font-semibold">
                                        {cert.organization}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={14} className="text-(--portfolio-accent)" />
                                        <span>{cert.date ? new Date(cert.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recent'}</span>
                                    </div>
                                    {cert.credentialId && (
                                        <div className="border-l border-border pl-4">
                                            ID: {cert.credentialId}
                                        </div>
                                    )}
                                </div>

                                <p className='text-muted-foreground text-sm line-clamp-3 group-hover:line-clamp-none leading-relaxed'>
                                    {cert.description}
                                </p>

                                {cert.certificateLink && (
                                    <div className="pt-4 border-t border-border lg:hidden">
                                        <a
                                            href={cert.certificateLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-bold text-(--portfolio-accent) hover:underline flex items-center gap-1"
                                            aria-label={`View certificate for ${cert.title} (mobile link)`}
                                        >
                                            View Certificate <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default CertificatesSection
