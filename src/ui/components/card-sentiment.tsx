import { motion } from "framer-motion";
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
  const [conf, setConf] = useState<"low" | "mid" | "high">("low");
  const [tooltipVisible, setTooltipVisible] = useState(false);

  console.log(sentiment, confiability);
  const sentiment_color: Record<string, string> = {
    positive: "bg-emerald-400 border-emerald-500",
    neutral: "bg-blue-400 border-blue-500",
    negative: "bg-red-400 border-red-500",
  };

  useEffect(() => {
    if (confiability < 45) {
      setConf("low");
    } else if (confiability < 65) {
      setConf("mid");
    } else {
      setConf("high");
    }
  }, [confiability]);

  console.log(tooltipVisible);

  const getSentmentClass = (sentiment: string) => {
    return (
      `flex flex-row w-auto px-4 py-3 border  bg- gap-5 rounded-lg shadow-md ` +
      sentiment_color[sentiment]
    );
  };

  const getConfiabilityClass = (conf: "low" | "mid" | "high") => {
    const confiability_color: Record<string, string> = {
      low: "py-2 rounded-md bg-gradient-to-r from-red-300 to-red-500 border-r border-red-500",
      mid: "py-2 rounded-md bg-gradient-to-r from-yellow-300 to-yellow-500 border-r border-yellow-500",
      high: "py-2 rounded-md bg-gradient-to-r from-green-300 to-green-500 border-r border-green-500",
    };
    return confiability_color[conf];
  };

  const handleSentiment = (str: string) => {
    if (str === "positive") return "Positivo";
    else if (str === "neutral") return "Neutro";
    return "Negativo";
  };

  return (
    <div className={getSentmentClass(sentiment)}>
      <div className="w-1/5 flex flex-col">
        <div>
          <h1 className="text-lg font-semibold text-slate-50 mb-2">
            {handleSentiment(sentiment)}
          </h1>
        </div>
        <div>
          <span className="text-slate-50">Confiança</span>
          <div
            className="mt-1 rounded-md border border-secundary shadow-inner bg-gray-200 w-full relative"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <div
              style={{ width: `${confiability}%` }}
              className={getConfiabilityClass(conf)}
            />
            {tooltipVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded z-10"
              >
                {confiability}%
              </motion.div>
            )}
          </div>
        </div>
      </div>
      <div className="w-4/5 border py-2 px-3 rounded-md bg-slate-100 border-gray-300 shadow-inner flex items-center ">
        <span className="text-gray-700">{text}</span>
      </div>
    </div>
  );
};
