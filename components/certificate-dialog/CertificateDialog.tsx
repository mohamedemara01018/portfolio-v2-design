'use client';
import React, { ChangeEvent, useState, useEffect } from 'react'
import DialogHeader from '../dialog-header/DialogHeader'
import InputFile from '../input-file/InputFile'
import InputForm from '../input-form/InputForm'
import TextareaForm from '../textarea-form/TextareaForm'
import { CertificateData } from '@/services/certificate.service';

interface CertificateDialogProps {
    isOpen: boolean;
    isEdit: boolean;
    isLoading: boolean;
    setOpen: (val: boolean) => void;
    initialData?: CertificateData | null;
    onSubmit: (formData: FormData) => void;
}

function CertificateDialog({ isOpen, isEdit, isLoading, setOpen, initialData, onSubmit }: CertificateDialogProps) {
    const [formData, setFormData] = useState<CertificateData>({
        title: "",
        organization: "",
        date: "",
        description: "",
        credentialId: "",
        certificateLink: "",
        coverImage: null
    });

    useEffect(() => {
        if (isEdit && initialData) {
            setFormData({
                ...initialData,
                date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : ""
            });
        } else {
            setFormData({
                title: "",
                organization: "",
                date: "",
                description: "",
                credentialId: "",
                certificateLink: "",
                coverImage: null
            });
        }
    }, [isEdit, initialData, isOpen]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.currentTarget;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0])
            setFormData(prev => ({ ...prev, coverImage: e.target.files![0] }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'coverImage') {
                if (formData.coverImage instanceof File) {
                    data.append('coverImage', formData.coverImage);
                }
            } else {
                data.append(key, String((formData as any)[key]));
            }
        });
        onSubmit(data);
    };

    return (
        <div className={`fixed inset-0 bg-accent/40 flex items-center max-md:items-start max-md:p-4 justify-center z-50 ${isOpen ? 'scale-100' : 'scale-0'} transition duration-150 shadow-sm overflow-auto`}>
            <div className='space-y-8 w-140 p-8 bg-background rounded-md border border-border shadow-accent-foreground my-8'>
                <DialogHeader
                    title={isEdit ? 'Edit Certificate' : 'Add New Certificate'}
                    desc={isEdit ? 'Update the certificate details below' : 'Add a new professional certification or course'}
                    onClick={() => setOpen(false)}
                />
                <form onSubmit={handleSubmit} className='space-y-4'>
                    <InputFile id='certificate-image' label='Upload Certificate Image' name='coverImage' onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e)} />
                    <input
                        type="file"
                        id="certificate-image-input"
                        className="hidden"
                        onChange={handleFileChange}
                        accept="image/*"
                    />

                    <InputForm id={'title'} label='Certificate Title' placeholder="e.g. AWS Certified Solutions Architect" name='title' value={formData.title} handleChange={handleChange} />
                    <TextareaForm id={'description'} label='Description' placeholder="Briefly describe what you learned or achieved (2-3 lines max)" name='description' value={formData.description} handleChange={handleChange} />
                    <InputForm id={'organization'} label='Issuing Organization' placeholder="e.g. Amazon Web Services" name='organization' value={formData.organization} handleChange={handleChange} />

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <InputForm id={'date'} type="date" label='Issue Date' placeholder="" name='date' value={formData.date} handleChange={handleChange} />
                        <InputForm id={'credentialId'} label='Credential ID (Optional)' placeholder="e.g. ABC-123-XYZ" name='credentialId' value={formData.credentialId} handleChange={handleChange} />
                    </div>


                    <InputForm id={'certificateLink'} label='Certificate Link' placeholder="https://..." name='certificateLink' value={formData.certificateLink || ''} handleChange={handleChange} />

                    <div className='flex items-center justify-end gap-4 pt-4'>
                        <button type='button' onClick={() => setOpen(false)} className='w-25 p-2 border border-border rounded-md hover:bg-accent hover:scale-105 transition duration-300'>Cancel</button>
                        <button type="submit" className='w-fit p-2 border border-border rounded-md bg-(--portfolio-accent) hover:bg-(--portfolio-accent-hover) hover:scale-105 transition duration-300 text-white'>
                            {isLoading ? 'processing...' : isEdit ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CertificateDialog
