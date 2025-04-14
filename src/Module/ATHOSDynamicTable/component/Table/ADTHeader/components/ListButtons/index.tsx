import { motion } from "framer-motion";
import { ListButtonClassname } from "../../styledWrappers";

const ListButtons = ({ children, onClick, className }: { children: React.ReactNode; onClick: () => void; className: string }) => (
  <motion.div layout="position" onClick={onClick} className={`${ListButtonClassname} !transition-colors ${className}`}>
    {children}
  </motion.div>
);

export default ListButtons;
