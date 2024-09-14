'use client';

import { useState, FormEvent } from 'react';
import { Leaf, Calculator, Brain, Database, DollarSign } from 'lucide-react';
import { Button } from "@/components/ui/button"
import Link from 'next/link';

export default function LCOHCalculator() {
  const [result, setResult] = useState<{ revenue: number; lcoh: number } | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const qcost = parseFloat(formData.get('qoo') as string);
    const rev = parseFloat(formData.get('poo') as string);
    const totalopex = parseFloat(formData.get('opex') as string);
    const totalcapex = parseFloat(formData.get('capex') as string);
    const totalhh = parseFloat(formData.get('hlife') as string);

    const totalRev = qcost * rev;
    const tlcoh = ((totalcapex + totalopex - totalRev) / totalhh) / 1000;

    setResult({ revenue: totalRev, lcoh: tlcoh });
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <header className="bg-green-600 text-white body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href="/" className="flex title-font font-medium items-center text-primary-foreground mb-4 md:mb-0">
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
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 flex items-center justify-center text-green-600">
          <Calculator className="w-8 h-8 mr-4" />
          Levelized Cost of Hydrogen Calculator
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <form onSubmit={handleSubmit} className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-2xl font-semibold text-green-600">Revenue From Oxygen</h2>
            <div className="flex flex-col text-gray-800">
              <label htmlFor="qoo" className="mb-1">Quantity of O<sub>2</sub> (Tons/year):</label>
              <input type="number" id="qoo" name="qoo" required className="border p-2 rounded" />
            </div>
            <div className="flex flex-col text-gray-800">
              <label htmlFor="poo" className="mb-1">Price Per Ton of O<sub>2</sub> ($):</label>
              <input type="number" id="poo" name="poo" required className="border p-2 rounded" />
            </div>
            <h2 className="text-2xl font-semibold text-green-600">Total CapEx & OpEx:</h2>
            <div className="flex flex-col text-gray-800">
              <label htmlFor="capex" className="mb-1">Total CapEx:</label>
              <input type="number" id="capex" name="capex" required className="border p-2 rounded" />
            </div>
            <div className="flex flex-col text-gray-800">
              <label htmlFor="opex" className="mb-1">Total OpEx:</label>
              <input type="number" id="opex" name="opex" required className="border p-2 rounded" />
            </div>
            <div className="flex flex-col text-gray-800">
              <label htmlFor="hlife" className="mb-1">Total Hydrogen Produced Over The Plant&apos;s Lifetime:</label>
              <input type="number" id="hlife" name="hlife" required className="border p-2 rounded" />
            </div>
            <h6 className="text-sm text-gray-600">
              Referenced CapEx: $300 million<br />
              Referenced OpEx: $8 million<br />
              Cost of Heat Exchanger & Steam Turbine Will Get Automatically Computed
            </h6>
            <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
              Calculate Total Cost
            </Button>
          </form>
          {result && (
            <div className="w-full lg:w-1/2">
              <div className="bg-green-100 p-6 rounded-lg shadow-md border border-green-300">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-green-700">LCOH Results</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md shadow">
                    <h4 className="text-lg font-semibold mb-2 text-green-600">Expected Yearly Revenue from Oxygen</h4>
                    <p className="text-2xl font-bold  text-gray-800">${result.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow">
                    <h4 className="text-lg font-semibold mb-2 text-green-600">Levelized Cost of Hydrogen (LCOH)</h4>
                    <p className="text-2xl font-bold  text-gray-800">${result.lcoh.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per kg</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="text-gray-800 body-font bg-green-200">
        <div className="container px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mx-auto flex flex-col sm:flex-row items-center justify-center">
          <Link href="/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-800">
            <Leaf className="w-10 h-10 text-white p-2 bg-green-600 rounded-full" />
            <span className="ml-3 text-xl">Elysian Energy</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}