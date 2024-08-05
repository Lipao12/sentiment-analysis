import { motion } from "framer-motion";
import { useState } from "react";
import { api } from "../../lib/axios";

interface UserInputProps {
  setSentiments: any;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const UserInput = ({
  setSentiments,
  loading,
  setLoading,
}: UserInputProps) => {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleChangeText = async (e: any) => {
    e.preventDefault();
    setText(e.target.value);
    if (text != "") {
      try {
        const response = await api.post("/analyse", {
          text: text,
        });
        setPrediction(response.data.sentiment.label);
      } catch (err: any) {}
    }
  };
  const handleGetAnalysis = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text != "") {
      try {
        setLoading(true);
        const response = await api.post("/analyse", {
          text: text,
        });
        console.log(response.data);
        setSentiments((prev: any) => [...prev, response.data]);
        setText("");
      } catch (err: any) {
        console.error(err.response?.data?.message || err);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Text vazio");
    }
  };

  return (
    <form
      className="p-4 flex flex-col justify-end items-end relative"
      onSubmit={handleGetAnalysis}
    >
      <textarea
        className="w-full p-4 border border-gray-300 rounded-md bg-slate-50 focus:outline-none focus:ring-2 focus:ring-secundary"
        placeholder="Digite ou cole o texto aqui..."
        value={text}
        onChange={(e) => {
          handleChangeText(e);
        }}
      />
      {text && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-full mb-2 left-1/4 transform -translate-x-1/2 px-2 py-1 bg-gray-500 text-gray-300 text-xs rounded z-10"
        >
          Preview: {prediction}
        </motion.div>
      )}
      <button
        type="submit"
        className="mt-4 w-auto p-2 bg-secundary text-slate-50 rounded hover:bg-gray-900 transition-colors duration-200"
        disabled={loading}
      >
        Analisar Sentimento
      </button>
    </form>
  );
};
