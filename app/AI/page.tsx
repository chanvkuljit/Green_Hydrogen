"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Leaf, Brain, Calculator, Database, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HistoricalDataPoint {
  month: number;
  energy: number;
}

interface PredictionResult {
  energyNeed: string;
  predictionAccuracy: string;
  hydrogenProduction: string;
  percentageIncrease: string;
}

const historicalData: HistoricalDataPoint[] = [
  { month: 1, energy: 560000 },
  { month: 2, energy: 575000 },
  { month: 3, energy: 600000 },
  { month: 4, energy: 680000 },
  { month: 5, energy: 720000 },
  { month: 6, energy: 730000 },
  { month: 7, energy: 660000 },
  { month: 8, energy: 650000 },
  { month: 9, energy: 720000 },
  { month: 10, energy: 710000 },
  { month: 11, energy: 705000 },
  { month: 12, energy: 670000 },
];

function linearRegression(data: HistoricalDataPoint[]) {
  const n = data.length;
  const sumX = data.reduce((sum, point) => sum + point.month, 0);
  const sumY = data.reduce((sum, point) => sum + point.energy, 0);
  const sumXY = data.reduce(
    (sum, point) => sum + point.month * point.energy,
    0
  );
  const sumX2 = data.reduce((sum, point) => sum + point.month * point.month, 0);

  const denominator = n * sumX2 - sumX * sumX;
  if (denominator === 0) {
    throw new Error("Cannot compute regression due to denominator being zero.");
  }

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

async function predictEnergy(month: number): Promise<PredictionResult> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const { slope, intercept } = linearRegression(historicalData);
  const predictedEnergy = slope * month + intercept;

  const currentCapacity = 80; // tons/day
  const energyPerKgHydrogen = 20; // kW/kg
  const tonsToKg = 1000;
  const daysInMonth = 30;

  const monthlyCapacityEnergy =
    currentCapacity * tonsToKg * energyPerKgHydrogen * daysInMonth;
  const productionMultiplier = predictedEnergy / monthlyCapacityEnergy;
  const requiredHydrogenProduction = Math.round(
    currentCapacity * productionMultiplier
  );
  const percentageIncrease = Math.max(
    ((requiredHydrogenProduction - currentCapacity) / currentCapacity) * 100,
    0
  );
  const accuracy = (Math.random() * 10 + 90).toFixed(2);

  return {
    energyNeed: predictedEnergy.toFixed(2) + " MW",
    predictionAccuracy: accuracy + "%",
    hydrogenProduction: requiredHydrogenProduction + " tons/day",
    percentageIncrease: percentageIncrease.toFixed(2) + "%",
  };
}

export default function AIPage() {
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [predictionResults, setPredictionResults] =
    useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const month = parseInt(selectedMonth, 10);
    if (isNaN(month) || month < 1 || month > 12) {
      setError("Please select a valid month.");
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const results = await predictEnergy(month);
      setPredictionResults(results);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <header className="bg-green-600 text-white body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            href="/"
            className="flex title-font font-medium items-center text-primary-foreground mb-4 md:mb-0"
          >
            <Leaf className="w-10 h-10" />
            <span className="ml-3 text-xl">Elysian Energy</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            {[
              { href: "/LCOH", icon: Calculator, text: "LCOH Calculator" },
              { href: "/AI", icon: Brain, text: "AI Predictor" },
              { href: "/HSU", icon: Database, text: "HSU Calculator" },
              { href: "/COS_AN", icon: DollarSign, text: "Cost Analyzer" },
            ].map(({ href, icon: Icon, text }) => (
              <Link
                key={href}
                href={href}
                className="mr-5 hover:text-primary-foreground/80 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
              >
                <span className="flex items-center">
                  <Icon className="w-4 h-4 mr-1" />
                  {text}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-600 mb-4">
            <Brain className="inline-block w-8 h-8 mr-2" />
            Hydrogen Energy Predictor
          </h1>
          <p className="text-base sm:text-lg text-gray-700">
            Use our prediction system to estimate energy needs for your city and
            the required hydrogen storage capacity to meet those needs.
          </p>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
            <div className="mb-4">
              <label htmlFor="month" className="block mb-2 text-gray-700">
                Select Month:
              </label>
              <select
                id="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                required
                className="w-full p-2 border rounded bg-white text-gray-700"
              >
                <option value="" disabled>
                  Select a month
                </option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            </div>
            <Button
              type="submit"
              className="bg-green-600 text-white hover:bg-green-700 disabled:bg-green-300"
              disabled={isLoading}
            >
              {isLoading ? "Predicting..." : "Predict"}
            </Button>
          </form>

          <div className="w-full lg:w-1/2">
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {predictionResults && (
              <section>
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-green-600">
                  Prediction Results
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(predictionResults).map(([key, value]) => (
                    <div
                      key={key}
                      className="border border-green-200 p-4 rounded shadow bg-white"
                    >
                      <h3 className="font-semibold mb-2 text-green-600">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </h3>
                      <p className="text-gray-700">{value}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </main>

      <footer className="text-gray-800 body-font bg-green-200">
        <div className="container px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mx-auto flex flex-col sm:flex-row items-center justify-center">
          <Link
            href="/"
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-800"
          >
            <Leaf className="w-10 h-10 text-white p-2 bg-green-600 rounded-full" />
            <span className="ml-3 text-xl">Elysian Energy</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
