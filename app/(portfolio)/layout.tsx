import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";


export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
