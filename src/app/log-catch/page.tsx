import { motion } from "framer-motion";
import { CatchForm } from "@/components/log-catch/CatchForm";

export default function LogCatchPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-4 sm:p-6 lg:p-8"
    >
       <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Log a New Catch</h1>
            <p className="text-muted-foreground mt-1">
              Enter the details of your catch to calculate its sustainability score.
            </p>
          </div>
          <CatchForm />
      </div>
    </motion.div>
  );
}
