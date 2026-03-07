'use client';
import React from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { ExternalLink, Award, Calendar } from 'lucide-react'
import { CertificateService, CertificateData } from '@/services/certificate.service'

interface CertificatesSectionProps {
    certificates: CertificateData[];
}

function CertificatesSection({ certificates }: CertificatesSectionProps) {

    // The isLoading state is removed, so we only check if certificates are empty.
    // If the component receives an empty array, it should return null.
    if (certificates.length === 0) return null;
    // console.log(certificates)
    return (
        <section id='certificates' className='py-24 bg-portfolio-bg-secondary/50'>
            <div className='wrapper flex flex-col items-center gap-8'>
                <div className='text-center'>
                    <TitleOfSection title='Certificates' />
                    <p className='text-muted-foreground mt-4'>Professional certifications and completed courses</p>
                </div>

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
                    {!certificates || certificates.length === 0 ? (
                        <div className="text-center w-full py-12 text-muted-foreground col-span-full">
                            No certificates to display.
                        </div>
                    ) : (
                        certificates.map((cert) => (
                            <div key={cert._id} className='group bg-card rounded-xl overflow-hidden border border-border hover:border-(--portfolio-accent) hover:-translate-y-1 transition-all duration-300 shadow-[color:var(--portfolio-shadow)] hover:shadow-[color:var(--portfolio-glow)] flex flex-col'>
                                <div className='relative aspect-video overflow-hidden bg-muted'>
                                    {cert.coverImage ? (
                                        <img
                                            className='w-full h-full object-cover group-hover:scale-110 transition duration-500'
                                            src={typeof cert.coverImage === 'string' ? cert.coverImage : URL.createObjectURL(cert.coverImage)}
                                            alt={cert.title}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                            <Award size={48} strokeWidth={1} />
                                        </div>
                                    )}
                                    {cert.certificateLink && (
                                        <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center'>
                                            <a
                                                href={cert.certificateLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-2 rounded-full bg-white text-black font-medium hover:bg-(--portfolio-accent) hover:text-white transition-colors flex items-center gap-2"
                                            >
                                                <span>View Certificate</span>
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className='p-6 flex flex-col flex-1'>
                                    <h3 className='text-xl font-semibold group-hover:text-(--portfolio-accent) transition-colors line-clamp-1'>
                                        {cert.title}
                                    </h3>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                        <span className="font-medium text-foreground">{cert.organization}</span>
                                    </div>

                                    <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            <span>{cert.date ? new Date(cert.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'N/A'}</span>
                                        </div>
                                        {cert.credentialId && (
                                            <div className="border-l border-border pl-4">
                                                ID: {cert.credentialId}
                                            </div>
                                        )}
                                    </div>

                                    <p className='text-muted-foreground text-sm mt-4 line-clamp-3 flex-1'>
                                        {cert.description}
                                    </p>

                                    {cert.certificateLink && (
                                        <div className="mt-6 pt-4 border-t border-border lg:hidden">
                                            <a
                                                href={cert.certificateLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-medium text-(--portfolio-accent) hover:underline flex items-center gap-1"
                                            >
                                                View Certificate <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    )
}

export default CertificatesSection
