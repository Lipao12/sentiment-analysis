import { useEffect, useState } from "react";

interface CardSentimentProps {
  sentiment: string;
  confiability: number;
  text: string;
}

export const CardSentiment = ({
  sentiment,
  confiability,
  text,
}: CardSentimentProps) => {
  const sentiment_color: Record<string, string> = {
    positive: "bg-emerald-400 border-emerald-500",
    neutral: "bg-blue-400 border-blue-500",
    negative: "bg-red-400 border-red-500",
  };
  const confiability_color: Record<string, string> = {
    low: "red",
    mid: "yellow",
    high: "green",
  };
  const [conf, setConf] = useState<"low" | "mid" | "high">("low");

  console.log(confiability);

  useEffect(() => {
    if (confiability < 45) {
      setConf("low");
    } else if (confiability < 65) {
      setConf("mid");
    } else {
      setConf("high");
    }
  }, [confiability]);
  return (
    <div
      className={`flex flex-row w-auto px-4 py-3 border ${sentiment_color[sentiment]} bg- gap-5 rounded-lg shadow-sm `}
    >
      <div className="w-1/5 flex flex-col">
        <div>
          <h1 className="text-lg font-semibold text-slate-50 mb-2">
            Sentimento
          </h1>
        </div>
        <div>
          <span className="text-slate-50">Confiança</span>
          <div className="mt-1 rounded-md border border-secundary shadow-inner bg-gray-200 w-full">
            <div
              style={{ width: `${confiability}%` }}
              className={`py-2 bg-${confiability_color["low"]}-300 rounded-md bg-gradient-to-r from-${confiability_color[conf]}-300 to-${confiability_color[conf]}-500 border-r border-${confiability_color[confiability]}-500`}
            />
          </div>
        </div>
      </div>
      <div className="w-4/5 border py-2 px-3 rounded-md bg-slate-100 border-gray-300 shadow-inner flex items-center ">
        <span className="text-gray-700">{text}</span>
      </div>
    </div>
  );
};
