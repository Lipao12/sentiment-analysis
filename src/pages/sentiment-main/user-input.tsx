import { useState } from "react";
import { api } from "../../lib/axios";

interface UserInputProps {
  sentiments: any;
  setSentiments: any;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const UserInput = ({
  sentiments,
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
        const response = await api.post("/analyse_sentence", {
          text: text,
        });
        setPrediction(response.data.sentiment.label);
      } catch (err: any) {}
    }
  };

  const separeteSentences = (texts: string) => {
    const parts = texts.split("\n");
    return parts;
  };

  const predictMany = async (texts: string) => {
    const sentences = separeteSentences(texts);
    console.log("Sentensas: ", sentences);
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
      if (text != "") {
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
        console.log("Text vazio");
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
