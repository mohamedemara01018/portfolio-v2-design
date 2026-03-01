'use client';
import React, { useState, useEffect } from 'react';
import DashboardPageHeader from '@/components/dashboard-page-header/DashboardPageHeader';
import SearchInput from '@/components/search-input/SearchInput';
import { Plus, SquarePen, Trash, ExternalLink } from 'lucide-react';
import { CertificateService, CertificateData } from '@/services/certificate.service';
import CertificateDialog from '@/components/certificate-dialog/CertificateDialog';

function DashboardCertificatesPage() {
    const [certificates, setCertificates] = useState<CertificateData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setOpen] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [currentCertificate, setCurrentCertificate] = useState<CertificateData | null>(null);

    const fetchCertificates = async () => {
        setIsLoading(true);
        try {
            const result = await CertificateService.getAllCertificates();
            // Handle different possible response structures
            const certsArray = result.data?.certificates || result.data || [];
            setCertificates(Array.isArray(certsArray) ? certsArray : []);
        } catch (error) {
            console.error("Error fetching certificates:", error);
            // toast.error("Failed to load certificates");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCertificates();
    }, []);

    const handleAdd = () => {
        setEdit(false);
        setCurrentCertificate(null);
        setOpen(true);
    };

    const handleEdit = (cert: CertificateData) => {
        setEdit(true);
        setCurrentCertificate(cert);
        setOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this certificate?")) {
            try {
                await CertificateService.deleteCertificate(id);
                setCertificates(prev => prev.filter(c => c._id !== id));
                // toast.success("Certificate deleted successfully");
            } catch (error) {
                console.error("Error deleting certificate:", error);
                // toast.error("Failed to delete certificate");
            }
        }
    };

    const handleSubmit = async (formData: FormData) => {
        try {
            if (isEdit && currentCertificate?._id) {
                await CertificateService.updateCertificate(currentCertificate._id, formData);
                // toast.success("Certificate updated successfully");
            } else {
                await CertificateService.createCertificate(formData);
                // toast.success("Certificate created successfully");
            }
            setOpen(false);
            fetchCertificates();
        } catch (error) {
            console.error("Error saving certificate:", error);
            // toast.error("Failed to save certificate");
        }
    };

    const filteredCertificates = certificates.filter(cert =>
        cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.organization.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='space-y-8 w-full'>
            <DashboardPageHeader
                title='Certificates'
                desc='Manage your professional certifications and course completions'
                action={{ label: 'Add New', icon: <Plus />, onClick: handleAdd }}
            />

            <SearchInput
                id='search-certificates'
                placeholder='Search certificates by title or organization...'
                onClick={() => { }}
            // @ts-ignore - assuming SearchInput supports value/onChange or just use native if not
            />

            <div className='w-full overflow-x-auto'>
                <table className="min-w-full border border-border rounded-md text-sm">
                    <thead className="bg-muted">
                        <tr>
                            <th className="px-4 py-3 text-left">Image</th>
                            <th className="px-4 py-3 text-left">Title</th>
                            <th className="px-4 py-3 text-left">Organization</th>
                            <th className="px-4 py-3 text-left">Issue Date</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">Loading certificates...</td></tr>
                        ) : filteredCertificates.length === 0 ? (
                            <tr><td colSpan={6} className="px-4 py-8 text-center text-muted-foreground">No certificates found.</td></tr>
                        ) : (
                            filteredCertificates.map((cert) => (
                                <tr key={cert._id} className="border-t border-border hover:bg-accent/50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="w-12 h-12 rounded bg-muted flex items-center justify-center overflow-hidden border border-border">
                                            {cert.coverImage ? (
                                                <img src={typeof cert.coverImage === 'string' ? cert.coverImage : URL.createObjectURL(cert.coverImage)} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-xs text-muted-foreground">No img</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-medium">{cert.title}</td>
                                    <td className="px-4 py-3">{cert.organization}</td>
                                    <td className="px-4 py-3">
                                        {cert.date ? new Date(cert.date).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${cert.isPublished ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'}`}>
                                            {cert.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className='px-4 py-3'>
                                        <div className="flex items-center justify-end gap-1">
                                            {cert.certificateLink && (
                                                <a href={cert.certificateLink} target="_blank" rel="noopener noreferrer" className='text-muted-foreground w-8 h-8 hover:bg-accent rounded-md flex items-center justify-center transition-colors'>
                                                    <ExternalLink className='w-4 h-4' />
                                                </a>
                                            )}
                                            <button onClick={() => handleEdit(cert)} className='text-muted-foreground w-8 h-8 hover:bg-accent rounded-md flex items-center justify-center transition-colors'>
                                                <SquarePen className='w-4 h-4' />
                                            </button>
                                            <button onClick={() => cert._id && handleDelete(cert._id)} className='text-muted-foreground w-8 h-8 hover:bg-destructive hover:text-destructive-foreground rounded-md flex items-center justify-center transition-colors'>
                                                <Trash className='w-4 h-4' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <CertificateDialog
                isOpen={isOpen}
                isEdit={isEdit}
                setOpen={setOpen}
                initialData={currentCertificate}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default DashboardCertificatesPage;
