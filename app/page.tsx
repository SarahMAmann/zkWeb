import Header from "@/components/Header";
import GridCards from "@/components/GridCards";
import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";

export default async function Index() {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <Navbar />

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <GridCards />
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <Footer />
      </footer>
    </div>
  );
}
