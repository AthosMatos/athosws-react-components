import { motion } from "framer-motion";

export const listButtonClassname = `flex transition-colors
          cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-zinc-300
          text-zinc-600 dark:text-zinc-200 hover:dark:bg-zinc-600`;

const ListButtons = ({ children, onClick, className }: { children: React.ReactNode; onClick: () => void; className: string }) => (
  <motion.div
    layout="position"
    transition={{
      duration: 0.25,
    }}
    onClick={onClick}
    className={`${listButtonClassname} ${className}`}
  >
    {children}
  </motion.div>
);

export default ListButtons;
