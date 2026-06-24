'use client';

import React from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { CertificateData } from '@/services/certificate.service'
import { motion, Variants } from 'framer-motion'
import CertificateCard from './CertificateCard';

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
                    className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full'
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {[...certificates].reverse().map((cert) => (
                        <CertificateCard key={cert._id} certificate={cert} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default CertificatesSection
