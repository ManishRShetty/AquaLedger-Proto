"use client";

import { useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CatchContext } from "@/context/CatchContext";
import { Fish, MapPin, PlusCircle, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const context = useContext(CatchContext);
  const pathname = usePathname();

  if (!context) {
    // This can happen if the context is not yet available.
    return <div>Loading...</div>;
  }

  const { catches } = context;

  const getScoreColor = (score: number) => {
    if (score >= 75) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="p-4 sm:p-6 lg:p-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Catch Dashboard
          </h1>
          <p className="text-muted-foreground">
            View and manage your logged catches.
          </p>
        </div>
        <Link href="/log-catch" passHref>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Log New Catch
          </Button>
        </Link>
      </div>

      {catches.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-lg">
          <Fish className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">
            No catches logged yet
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Get started by logging your first sustainable catch.
          </p>
          <div className="mt-6">
            <Link href="/log-catch" passHref>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Log a Catch
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {catches.map((c, index) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Fish className="h-8 w-8 text-primary" />
                    <div>
                      <CardTitle className="text-xl">{c.species}</CardTitle>
                      <CardDescription className="flex items-center gap-1 text-sm">
                        <MapPin className="h-3 w-3" /> {c.location}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Sustainability Score: {c.score}/100
                      </p>
                      <Progress value={c.score} className="h-2 [&>div]:bg-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {c.rationale}
                    </p>
                  </div>
                  <Link href={`/catch/${c.id}`} passHref>
                    <Button variant="outline" className="w-full mt-4">
                      View Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
