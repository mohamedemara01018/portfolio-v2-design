'use client';

import React from 'react';
import { ExternalLink, Award, Calendar } from 'lucide-react';
import { CertificateData } from '@/services/certificate.service';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

interface CertificateCardProps {
    certificate: CertificateData;
}

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

export default function CertificateCard({ certificate }: CertificateCardProps) {
    const formattedDate = certificate.date
        ? new Date(certificate.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'Recent';

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className='group bg-card/65 backdrop-blur-md rounded-2xl overflow-hidden border border-border/80 hover:border-(--portfolio-accent)/50 transition-all duration-300 shadow-(--portfolio-shadow) hover:shadow-(--portfolio-glow) flex flex-col h-full'
        >
            {/* Image / Icon container */}
            <div className='relative aspect-video overflow-hidden bg-muted flex items-center justify-center'>
                {certificate.coverImage ? (
                    <Image
                        src={typeof certificate.coverImage === 'string' ? certificate.coverImage : "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"}
                        alt={certificate.title}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-500'
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-accent/20">
                        <Award size={40} strokeWidth={1.5} className="text-(--portfolio-accent)/70" />
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className='p-6 flex flex-col grow space-y-4 justify-between'>
                <div className='space-y-3'>
                    <div className='space-y-1.5'>
                        <h3 className='text-lg font-bold text-foreground group-hover:text-(--portfolio-accent) transition-colors line-clamp-1 leading-snug'>
                            {certificate.title}
                        </h3>
                        <p className="text-sm text-foreground/80 font-semibold flex items-center gap-1.5">
                            <Award size={14} className="text-(--portfolio-accent)" />
                            {certificate.organization}
                        </p>
                    </div>

                    {/* Metadata: Date and ID */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground font-medium">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={13} className="text-(--portfolio-accent)" />
                            <span>{formattedDate}</span>
                        </div>
                        {certificate.credentialId && (
                            <div className="border-l border-border/60 pl-3 leading-none">
                                ID: {certificate.credentialId}
                            </div>
                        )}
                    </div>

                    {/* Description */}
                    <p className='text-muted-foreground text-sm leading-relaxed line-clamp-3 min-h-[3.8rem]'>
                        {certificate.description}
                    </p>
                </div>

                {/* Verify Credential Button */}
                {certificate.certificateLink && (
                    <div className="pt-4 border-t border-border/40 mt-auto">
                        <a
                            href={certificate.certificateLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 py-2 px-4 rounded-xl bg-(--portfolio-accent)/10 hover:bg-(--portfolio-accent) text-(--portfolio-accent) hover:text-white text-xs font-bold transition-all duration-300 active:scale-[0.98] shadow-sm hover:shadow-md"
                            aria-label={`Verify certificate credentials for ${certificate.title}`}
                        >
                            <span>Verify Credential</span>
                            <ExternalLink size={13} />
                        </a>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
