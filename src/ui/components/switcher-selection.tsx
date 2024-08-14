import { motion } from "framer-motion";
import { FaFileAlt, FaLink } from "react-icons/fa";

interface SwitchSelectionProps {
  selected: string;
  setSelected: (str: string) => void;
}

export const SwitchSelection = ({
  selected,
  setSelected,
}: SwitchSelectionProps) => {
  const switch2File = () => {
    setSelected("file");
  };

  const switch2Link = () => {
    setSelected("link");
  };

  return (
    <motion.div className="relative flex items-center justify-between w-32 h-10 rounded-full border cursor-pointer bg-gray-200">
      <motion.div
        className="absolute top-0 bottom-0 w-1/2 bg-secundary rounded-full"
        animate={{ x: selected === "file" ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />

      <div
        className="flex justify-center items-center w-1/2 z-10"
        onClick={switch2File}
      >
        <FaFileAlt
          className={`${
            selected === "file"
              ? "opacity-100 text-slate-300"
              : "opacity-50 text-gray-600"
          }`}
        />
      </div>
      <div
        className="flex justify-center items-center w-1/2 z-10"
        onClick={switch2Link}
      >
        <FaLink
          className={` ${
            selected === "link"
              ? "opacity-100 text-slate-300"
              : "opacity-50 text-gray-600"
          }`}
        />
      </div>
    </motion.div>
  );
};
