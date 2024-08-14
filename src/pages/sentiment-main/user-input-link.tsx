import { useState } from "react";
import { FaLink } from "react-icons/fa";
import { api } from "../../lib/axios";

interface UserInputLinkProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setSentiments: any;
  setCountsSentiments: any;
}

export const UserInputLink = ({
  loading,
  setLoading,
  setSentiments,
  setCountsSentiments,
}: UserInputLinkProps) => {
  const [text, setText] = useState("");

  const handleChangeText = async (e: any) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const handleGetAnalysis = async () => {
    try {
      setLoading(true);
      const response = await api.post("/analyse_twitter_comments", {
        text: text,
      });
      setSentiments((prev: any) => [...prev, response.data.sentiment]);
      setCountsSentiments(response.data.count);
      setText("");
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="p-4 flex flex-col items-end space-y-4"
      onSubmit={handleGetAnalysis}
    >
      <div className="flex items-center w-3/4 space-x-3 self-start border border-gray-300 rounded-full bg-slate-50 focus-within:ring-2 focus-within:ring-secundary">
        <span className="pl-4 text-gray-500">
          <FaLink />
        </span>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            handleChangeText(e);
          }}
          className="p-2 w-full rounded-e-full bg-transparent focus:outline-none"
          placeholder="Insira o link aqui"
          aria-label="Input de link"
        />
      </div>
      <button
        type="submit"
        className="ml-4 w-auto p-2 bg-secundary text-slate-50 rounded hover:bg-gray-900 transition-colors duration-200"
        disabled={loading}
      >
        Analisar Sentimento
      </button>
    </form>
  );
};
