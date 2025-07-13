"use client";

import { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CatchContext } from "@/context/CatchContext";
import type { CatchResult } from "@/types";
import { format } from "date-fns";
import {
  Fish,
  MapPin,
  Calendar,
  Anchor,
  Leaf,
  Info,
  ArrowLeft,
  AlertTriangle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

function DetailItem({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | React.ReactNode }) {
    return (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                 <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-semibold text-foreground">{value}</p>
            </div>
        </div>
    )
}

export default function CatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const context = useContext(CatchContext);
  const [catchData, setCatchData] = useState<CatchResult | null | undefined>(undefined);

  useEffect(() => {
    if (context && params.id) {
      setCatchData(context.getCatchById(params.id as string));
    }
  }, [context, params.id]);

  if (catchData === undefined) {
    return (
      <div className="p-8">
        <Skeleton className="h-10 w-1/2 mb-4" />
        <Skeleton className="h-6 w-3/4 mb-8" />
        <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }

  if (catchData === null) {
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-full p-8 text-center"
      >
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">Catch Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The catch you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => router.push("/")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
      </motion.div>
    );
  }
  
  const formattedDate = format(new Date(catchData.date), 'MMMM d, yyyy');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <Button variant="outline" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="mb-8">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-accent">
                        <Fish className="h-8 w-8 text-accent-foreground" />
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold">{catchData.species}</CardTitle>
                        <CardDescription>Traceability and Sustainability Report</CardDescription>
                    </div>
                </div>
            </CardHeader>
        </Card>

        <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-3">
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Catch Details</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6">
                        <DetailItem icon={Fish} label="Species" value={catchData.species} />
                        <DetailItem icon={MapPin} label="Location" value={catchData.location} />
                        <DetailItem icon={Calendar} label="Date" value={formattedDate} />
                        <DetailItem icon={Anchor} label="Method" value={catchData.method} />
                    </CardContent>
                </Card>
            </div>

            <div className="md:col-span-2">
                 <Card className="bg-accent/30 border-primary/50">
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            <Leaf className="text-primary"/> Sustainability Analysis
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div>
                            <p className="text-sm text-muted-foreground">Sustainability Score</p>
                            <p className="text-4xl font-bold text-primary">{catchData.score}<span className="text-2xl text-muted-foreground">/100</span></p>
                            <Progress value={catchData.score} className="h-2 mt-2 [&>div]:bg-primary" />
                        </div>
                        <Separator/>
                         <div>
                            <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2"><Info className="h-4 w-4"/> Rationale</p>
                            <p className="text-sm text-foreground/80">{catchData.rationale}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
      </div>
    </motion.div>
  );
}
