'use client';
import React, { useState, useEffect } from 'react';
import DashboardPageHeader from '@/components/dashboard-page-header/DashboardPageHeader';
import SearchInput from '@/components/search-input/SearchInput';
import { Plus, SquarePen, Trash, ExternalLink } from 'lucide-react';
import { CertificateService, CertificateData } from '@/services/certificate.service';
import CertificateDialog from '@/components/certificate-dialog/CertificateDialog';
import { useRouter } from 'next/navigation';
import Notification, { NotificationState } from '@/components/notification/Notification';

function DashboardCertificatesPage({ certificates }: { certificates: CertificateData[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setOpen] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [currentCertificate, setCurrentCertificate] = useState<CertificateData | null>(null);
    const [notification, setNotification] = useState<NotificationState | null>(null);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();



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
                setNotification({
                    message: `certificate deleted successfully`,
                    type: 'success'
                })
                router.refresh();
            } catch (error) {
                console.error("Error deleting certificate:", error);
                // toast.error("Failed to delete certificate");
            }
        }
    };

    const handleSubmit = async (formData: FormData) => {
        setLoading(true);
        try {
            if (isEdit && currentCertificate?._id) {
                await CertificateService.updateCertificate(currentCertificate._id, formData);
                setNotification({
                    message: `Certificate updated successfully`,
                    type: 'success'
                })
            } else {
                await CertificateService.createCertificate(formData);
                setNotification({
                    message: `Certificate created successfully`,
                    type: 'success'
                })
            }
            setOpen(false);
            router.refresh();
        } catch (error) {
            console.error("Error saving certificate:", error);
            setNotification({
                message: `Failed to save certificate`,
                type: 'error'
            })
        } finally {
            setLoading(false);
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
                search={setSearchTerm}
            // @ts-ignore - assuming SearchInput supports value/onChange or just use native if not
            />

            <div className='w-full overflow-x-auto'>
                <table className="min-w-full border border-border rounded-md text-sm">
                    <thead className="bg-muted">
                        <tr>
                            <th className="px-4 py-3 text-left">Image</th>
                            <th className="px-4 py-3 text-left">Title</th>
                            <th className="px-4 py-3 text-left">Description</th>
                            <th className="px-4 py-3 text-left">Organization</th>
                            <th className="px-4 py-3 text-left">Issue Date</th>
                            <th className="px-4 py-3 text-left">credential id</th>
                            <th className="px-4 py-3 text-left">credential link</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCertificates.length === 0 ? (
                            <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">No certificates found.</td></tr>
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
                                    <td className="px-4 py-3 font-medium max-w-40 truncate">{cert.description}</td>
                                    <td className="px-4 py-3">{cert.organization}</td>
                                    <td className="px-4 py-3">
                                        {cert.date ? new Date(cert.date).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs `}>
                                            {cert.credentialId}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs `}>
                                            <a href={cert.certificateLink} target="_blank" rel="noopener noreferrer" className=' text-muted-foreground w-8 h-8 hover:bg-accent rounded-md flex items-center justify-center transition-colors'>
                                                <ExternalLink className='w-4 h-4' />
                                            </a>
                                        </span>
                                    </td>

                                    <td className='px-4 py-3'>
                                        <div className="flex items-center justify-end gap-1">

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
                isLoading={isLoading}
                setOpen={setOpen}
                initialData={currentCertificate}
                onSubmit={handleSubmit}
            />
            <Notification notification={notification} onClose={() => setNotification(null)} />
        </div>
    );
}

export default DashboardCertificatesPage;
