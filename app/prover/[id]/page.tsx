"use client";
import Footer from "@/components/Footer";
import InvalidModal from "@/components/InvalidModal";
import ValidModal from "@/components/ValidModal";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Prover() {
  // use params.id to fetch the associated proof data from the api
  const params = useParams<{ tag: string; item: string }>();
  const [showValidModal, setShowValidModal] = useState(false);
  const [showInvalidModal, setShowInvalidModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [responseData, setResponseData] = useState(null);

  const initialFormData = {
    email: "",
    message: "",
  };

  const [formData, setFormData] = useState({
    email: "",
    message: "",
  });

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/prove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          //TODO: dynamic value
          id: "fb570078-d199-4e75-95c8-6905846b7722",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseData(data);
        setShowError(false);
      } else {
        setShowError(true);
      }
      setFormData(initialFormData);
    } catch (error) {
      setShowError(true);
    }
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      {showValidModal && <ValidModal />}
      {showInvalidModal && <InvalidModal />}
      <div className="isolate px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <div className="w-20 mb-8">
            <Link
              href="/"
              className="text-sm py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              ← Home
            </Link>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Prove What You Know
          </h2>
          <h3 className="mt-6">Proof Title</h3>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Prover magna irure deserunt veniam aliqua magna enim voluptate.
          </p>
        </div>
        <form
          action="#"
          method="POST"
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-600"
              >
                Email{" "}
                <span className="italic">
                  (You will receive a message at this email address upon
                  receiving a successful response from this proof. The verifier
                  who generated this proof will also receive an email
                  notification.)
                </span>
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your-email@example.com"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold leading-6 text-gray-600"
              >
                Your Secret Data
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              onClick={handleSubmit}
              className="block w-full rounded-md bg-indigo-800 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Prove
            </button>
          </div>
        </form>
      </div>

      {showError && (
        <div className="-mt-48 text-red-500">
          There was an error processing the request, please try again.
        </div>
      )}

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <Footer />
      </footer>
    </div>
  );
}
