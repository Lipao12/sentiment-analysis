import { useState } from "react";
import { CardSentiment } from "../../ui/components/card-sentiment";
import { PieChart } from "../../ui/components/pie-chart";

interface ShowChartResultProps {
  counts: {
    positive: number;
    negative: number;
    neutral: number;
  };
  sentiments: any;
}

export const ShowChartResult = ({
  counts,
  sentiments,
}: ShowChartResultProps) => {
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const data = {
    labels: ["Positivo", "Negativo", "Neutro"],
    datasets: [
      {
        data: [counts.positive, counts.negative, counts.neutral],
        backgroundColor: ["#34d399", "#f87171", "#60a5fa"],
      },
    ],
  };
  const handleChartClick = (label: string) => {
    setSelectedLabel(label);
  };

  const filteredSentiments = sentiments.filter(
    (sentiment: any) => sentiment.label === selectedLabel
  );

  return (
    <div className="mt-2 p-4 gap-4 flex flex-col items-center">
      <span>
        Este gráfico mostra a distribuição dos sentimentos nos comentários desse
        Twitter.
      </span>
      <PieChart data={data} onClick={handleChartClick} />
      {filteredSentiments.length > 0 ? (
        <div className="mt-2 p-4 gap-4 flex flex-col-reverse">
          {filteredSentiments.map((sentiment: any) => (
            <CardSentiment
              key={sentiment.id}
              sentiment={sentiment.label}
              confiability={Math.floor(sentiment.score * 100)}
              text={sentiment.text}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full p-4">
          <h1 className="text-slate-700 text-xl">
            Aqui virá as frases de determinado sentimento
          </h1>
        </div>
      )}
    </div>
  );
};
