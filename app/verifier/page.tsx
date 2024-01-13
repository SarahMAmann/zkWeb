"use client";
import Footer from "@/components/Footer";
import Link from "next/link";
import { SetStateAction, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Verifier() {
  const [showError, setShowError] = useState<boolean>(false);
  const [responseData, setResponseData] = useState(null);
  const [selectedDataType, setSelectedDataType] = useState<string>("textData");
  const [textDataString, setTextDataString] = useState<string>("");
  const [dateDataObject, setDateDataObject] = useState<any>({});
  const [fileDataString, setFileDataString] = useState<
    string | ArrayBuffer | null
  >("");

  const initialFormData = {
    title: "",
    email: "",
  };

  const [formData, setFormData] = useState({
    title: "",
    email: "",
  });

  const proofDataTypes = [
    { id: "textData", title: "Text" },
    { id: "dateData", title: "Date" },
    { id: "fileData", title: "File" },
  ];

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onOptionChange = (e: { target: { value: SetStateAction<string> } }) => {
    setSelectedDataType(e.target.value);
  };

  const handleMessageInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setTextDataString(value);
  };

  function handleFileChange({ target: { files } }: any) {
    const maxSize = 50000;
    const [file] = files;
    const reader = new FileReader();

    if (file.size <= maxSize) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        const baseURL = reader.result;
        setFileDataString(baseURL);
      };
    } else {
      alert(
        `The file you are trying to upload is ${file.size} bytes. ` +
          `The maximum file size is ${maxSize} bytes.`,
      );
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const submitFormData = {
      ...formData,
      dataType: selectedDataType,
      inputData:
        selectedDataType === "textData"
          ? textDataString
          : selectedDataType === "dateData"
            ? new Date(dateDataObject.$d).getTime().toString()
            : selectedDataType === "fileData"
              ? fileDataString
              : "",
    };

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitFormData),
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
          <div className="w-20">
            <Link
              href="/"
              className="text-sm py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            >
              ← Home
            </Link>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Generate A Proof
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Verifier magna irure deserunt veniam aliqua magna enim voluptate.
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
                htmlFor="title"
                className="block text-sm font-semibold leading-6 text-gray-600"
              >
                Title
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  autoComplete="organization"
                  placeholder="Give your proof a name!"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold leading-6 text-gray-600"
              >
                Email{" "}
                <span className="italic text-xs">
                  (You will receive a notification at this email address
                  whenever your proof sends a successful verification response.)
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
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Your Secret Data
              </label>
              <p className="text-sm text-gray-600">
                What type of data would you like to create a proof for?
              </p>
              <fieldset className="mt-4">
                <legend className="sr-only">Data Type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {proofDataTypes.map((proofDataType) => (
                    <div key={proofDataType.id} className="flex items-center">
                      <input
                        id={proofDataType.id}
                        name={proofDataType.id}
                        type="radio"
                        onChange={onOptionChange}
                        value={proofDataType.id}
                        checked={selectedDataType == proofDataType.id}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor={proofDataType.id}
                        className="ml-3 block text-sm font-medium leading-6 text-gray-500"
                      >
                        {proofDataType.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
            {selectedDataType === "textData" && (
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-600"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    name="message"
                    id="message"
                    value={textDataString}
                    onChange={handleMessageInputChange}
                    rows={4}
                    maxLength={5000}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}
            {selectedDataType === "dateData" && (
              <div className="sm:col-span-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-semibold leading-6 text-gray-600"
                >
                  Date
                </label>
                <div className="mt-2.5">
                  <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        className="bg-white rounded-md"
                        onChange={(newValue) => setDateDataObject(newValue)}
                      />
                    </LocalizationProvider>
                  </div>
                </div>
              </div>
            )}
            {selectedDataType === "fileData" && (
              <div className="sm:col-span-2">
                <label
                  htmlFor="file"
                  className="block text-sm font-semibold leading-6 text-gray-600"
                >
                  File
                </label>
                <div className="mt-2.5">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="cursor-pointer hover:opacity-90"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="mt-10">
            <button
              onClick={handleSubmit}
              className="block w-full rounded-md bg-indigo-800 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Generate
            </button>
          </div>
        </form>
      </div>

      {showError && (
        <div className="-mt-48 text-red-500 w-1/2">
          Error: a proof could not be generated for this input. You can refer to
          the documentation to make sure your input meets the requirements:{" "}
          <span className="underline text-gray-500 cursor-pointer">
            https://docs.zkweb.io
          </span>
        </div>
      )}

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <Footer />
      </footer>
    </div>
  );
}
