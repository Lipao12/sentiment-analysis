import { motion } from "framer-motion";
import { CardSentiment } from "../../ui/components/card-sentiment";

export const ShowResults = () => {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      initial="hidden"
      whileInView="visible"
      className="mt-2 p-4 gap-4 flex flex-col"
    >
      <CardSentiment
        sentiment={"positive"}
        confiability={50}
        text="Aqui irá vir o texto que será escrito pela pessoa Aqui irá vir o texto
          que será escrito pela pessoa Aqui irá vir o texto que será escrito
          pela pessoa Aqui irá vir o texto que será escrito pela pessoa"
      />
      <CardSentiment
        sentiment={"neutral"}
        confiability={20}
        text="Aqui irá vir o texto que será escrito pela pessoa Aqui irá vir o texto
          que será escrito pela pessoa Aqui irá vir o texto que será escrito
          pela pessoa Aqui irá vir o texto que será escrito pela pessoa"
      />
      <CardSentiment
        sentiment={"negative"}
        confiability={70}
        text="Aqui irá vir o texto que será escrito pela pessoa Aqui irá vir o texto
          que será escrito pela pessoa Aqui irá vir o texto que será escrito
          pela pessoa Aqui irá vir o texto que será escrito pela pessoa"
      />
    </motion.div>
  );
};
