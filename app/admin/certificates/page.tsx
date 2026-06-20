import DashboardCertificatesPage from '@/views/dashboard-certificates-page/DashboardCertificatesPage';
import { CertificateService } from '@/services/certificate.service';
import React from 'react';

const CertificatesAdminPage = async () => {

    let certificates = []

    try {
        const result = await CertificateService.getAllCertificates();
        // Handle different possible response structures
        const certsArray = result.data?.certificates || result.data || [];
        certificates = (Array.isArray(certsArray) ? certsArray : []);
    } catch (error) {
        console.error("Error fetching certificates:", error);
        // toast.error("Failed to load certificates");
    }

    console.log(certificates)


    return <DashboardCertificatesPage certificates={certificates} />;
};

export default CertificatesAdminPage;
