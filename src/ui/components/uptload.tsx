import { useRef } from "react";
import { FaFileUpload } from "react-icons/fa";

interface UploadComponentProps {
  setUploadTxts: (sentiment: string) => void;
}

export const UploadComponent = ({ setUploadTxts }: UploadComponentProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        console.log(content);
        setUploadTxts(content);
      };
      reader.readAsText(file);
    }
  };

  return (
    <>
      <button
        className="flex flex-row gap-3 items-center"
        type="button"
        onClick={handleUploadFile}
      >
        {""}
        <FaFileUpload className="text-2xl" />
        {""}
        <span className="text-lg">Upload um arquivo de texto</span>
        {""}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".txt"
        placeholder="_"
      />
    </>
  );
};
