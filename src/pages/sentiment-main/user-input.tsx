import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface UserInputProps {
  loading: boolean;
  uploadTxts: string;
  setSentiments: any;
  setLoading: (loading: boolean) => void;
  setUploadTxts: (loading: string) => void;
  setCountsSentiments: any;
}

export const UserInput = ({
  loading,
  uploadTxts,
  setSentiments,
  setLoading,
  setUploadTxts,
  setCountsSentiments,
}: UserInputProps) => {
  const [text, setText] = useState("");
  const [prediction, setPrediction] = useState("");

  const handleChangeText = async (e: any) => {
    e.preventDefault();
    setText(e.target.value);
    if (e.target.value !== "") {
      try {
        const response = await api.post("/analyse_sentence", {
          text: e.target.value,
        });
        setPrediction(response.data.sentiment.label);
      } catch (err: any) {}
    }
  };

  const separateSentences = (texts: string) => {
    const parts = texts.split("\n");
    return parts;
  };

  const predictOne = async (text: string) => {
    try {
      setLoading(true);
      const response = await api.post("/analyse_sentence", {
        text: text,
      });
      setSentiments((prev: any) => [...prev, response.data.sentiment]);
      setText("");
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    } finally {
      setLoading(false);
    }
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
      setCountsSentiments(response.data.counts);
      setText("");
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAnalysis = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text !== "") {
      if (!text.includes("\n")) {
        predictOne(text);
      } else {
        predictMany(text);
      }
    } else {
      console.log("Texto vazio");
    }
  };

  useEffect(() => {
    if (typeof uploadTxts === "string" && uploadTxts !== "") {
      if (!uploadTxts.includes("\n")) {
        predictOne(uploadTxts);
        setUploadTxts("");
      } else {
        predictMany(uploadTxts);
        setUploadTxts("");
      }
    } else {
      console.log("Arquivo vazio");
    }
  }, [uploadTxts]);

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
