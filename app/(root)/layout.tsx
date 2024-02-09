import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="w-full">
            <Navbar/>
            {children}
            <Footer />
        </main>
    );
}