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
    if (text !== "") {
      try {
        const response = await api.post("/analyse_sentence", {
          text: text,
        });
        setPrediction(response.data.sentiment.label);
      } catch (err: any) {}
    }
  };

  const separateSentences = (texts: string) => {
    const parts = texts.split("\n");
    return parts;
  };

  const predictMany = async (texts: string) => {
    const sentences = separateSentences(texts);
    console.log("Sentenças: ", sentences);
    try {
      setLoading(true);
      const response = await api.post("/analyse_sentences", {
        text: sentences,
      });

      console.log(response.data.sentiment);
      setSentiments((prev: any) => [...prev, ...response.data.sentiment]);
      setText("");
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAnalysis = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.includes("\n")) {
      if (text !== "") {
        try {
          setLoading(true);
          const response = await api.post("/analyse_sentence", {
            text: text,
          });

          console.log(response.data);
          setSentiments((prev: any) => [...prev, response.data.sentiment]);
          setText("");
        } catch (err: any) {
          console.error(err.response?.data?.message || err);
        } finally {
          setLoading(false);
        }
      } else {
        console.log("Texto vazio");
      }
    } else {
      predictMany(text);
    }
  };

  return (
    <form
      className="p-4 flex flex-col justify-end items-end relative"
      onSubmit={handleGetAnalysis}
    >
      <textarea
        className="w-full p-4 border border-gray-300 rounded-md bg-slate-50 focus:outline-none focus:ring-2 focus:ring-secundary"
        placeholder="Digite ou cole o texto aqui, incluindo quebras de linha. As frases serão analisadas separadamente..."
        value={text}
        onChange={(e) => {
          handleChangeText(e);
        }}
      />
      <div className="flex flex-row justify-between items-center w-full mt-4">
        {
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="px-2 py-1 bg-gray-600 text-gray-300 text-xs rounded"
          >
            Preview: {text && prediction}
          </motion.div>
        }
        <button
          type="submit"
          className="ml-4 w-auto p-2 bg-secundary text-slate-50 rounded hover:bg-gray-900 transition-colors duration-200"
          disabled={loading}
        >
          Analisar Sentimento
        </button>
      </div>
    </form>
  );
};
