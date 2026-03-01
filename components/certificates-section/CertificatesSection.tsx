'use client';
import React, { useEffect, useState } from 'react'
import TitleOfSection from '../title-of-section/TitleOfSection'
import { ExternalLink, Award, Calendar } from 'lucide-react'
import { CertificateService, CertificateData } from '@/services/certificate.service'

function CertificatesSection() {
    const [certificates, setCertificates] = useState<CertificateData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCertificates = async () => {
            try {
                const result = await CertificateService.getAllCertificates();
                // Handle different possible response structures
                const certsArray = result.data?.certificates || result.data || [];
                const finalArray = Array.isArray(certsArray) ? certsArray : [];
                // Filter only published ones if the API doesn't do it
                setCertificates(finalArray.filter((c: CertificateData) => c.isPublished));
            } catch (error) {
                console.error("Error fetching certificates:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    if (!isLoading && certificates.length === 0) return null;

    return (
        <section id='certificates' className='py-24 bg-portfolio-bg-secondary/50'>
            <div className='wrapper flex flex-col items-center gap-8'>
                <div className='text-center'>
                    <TitleOfSection title='Certificates' />
                    <p className='text-muted-foreground mt-4'>Professional certifications and completed courses</p>
                </div>

                <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full'>
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, idx) => (
                            <div key={idx} className="h-[400px] bg-card/50 animate-pulse rounded-xl border border-border"></div>
                        ))
                    ) : (
                        certificates.map((cert) => (
                            <div key={cert._id} className='group bg-card rounded-xl overflow-hidden border border-border hover:border-(--portfolio-accent) hover:-translate-y-1 transition-all duration-300 shadow-(--portfolio-shadow) hover:shadow-(--portfolio-glow) flex flex-col'>
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
