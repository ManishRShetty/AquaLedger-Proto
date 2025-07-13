import { motion } from "framer-motion";
import { ToolForm } from "@/components/sustainability-tool/ToolForm";

export default function SustainabilityToolPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-2xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Sustainability Improvement Tool</h1>
            <p className="text-muted-foreground mt-1 max-w-lg mx-auto">
              Get AI-powered recommendations to improve the sustainability of your future catches.
            </p>
          </div>
          <ToolForm />
      </div>
    </motion.div>
  );
}
