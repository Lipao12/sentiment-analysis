import { ArcElement, Chart as ChartJS, Legend, Title, Tooltip } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
  onClick?: (label: string) => void;
}

const labelMap: Record<string, string> = {
  Positivo: "positive",
  Negativo: "negative",
  Neutro: "neutral",
};
export const PieChart = ({ data, onClick }: PieChartProps) => {
  const options = {
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const label = data.labels ? data.labels[index] : null;

        if (label && labelMap[label]) {
          onClick?.(labelMap[label]);
        }
      }
    },
  };
  return (
    <div className="p-4 w-[500px] h-[500px]">
      <Pie data={data} options={options} />
    </div>
  );
};
