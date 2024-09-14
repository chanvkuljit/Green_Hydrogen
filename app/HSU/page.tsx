'use client';

import { useState, FormEvent } from 'react';
import { Calculator, Leaf, Brain, Database, DollarSign } from 'lucide-react';
import Link from 'next/link';

export default function HSU() {
  const [results, setResults] = useState({
    totalCost: 0,
    levelizedCost: 0,
    paybackPeriod: 0,
    internalRate: 0,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const cost1 = parseFloat(formData.get('cost1') as string) || 0;
    const cost2 = parseFloat(formData.get('cost2') as string) || 0;
    const cost3 = parseFloat(formData.get('cost3') as string) || 0;

    const totalCost = cost1 + cost2 + cost3;
    const levelizedCost = totalCost / 200000; // Assuming 200,000 kg production
    const paybackPeriod = totalCost / 200000;
    const internalRate = (totalCost / 1000000) * 100;

    setResults({
      totalCost,
      levelizedCost,
      paybackPeriod,
      internalRate,
    });
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
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold title-font text-green-600 mb-4">
            <Calculator className="w-8 h-8 inline-block mr-2" />
            Hydrogen Storage Unit Cost Calculator
          </h1>
          <p className="text-base sm:text-lg leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-800">
            Calculate the costs and financial metrics for your hydrogen storage unit.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-center items-start space-y-8 lg:space-y-0 lg:space-x-8">
          <form onSubmit={handleSubmit} className="w-full lg:w-1/2 max-w-md">
            <div className="flex flex-wrap -m-2">
              {['Cost 1', 'Cost 2', 'Cost 3'].map((label, index) => (
                <div key={index} className="p-2 w-full">
                  <input
                    type="number"
                    name={`cost${index + 1}`}
                    placeholder={label}
                    required
                    className="w-full bg-green-100 rounded border border-green-300 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              ))}
            </div>
            <div className="p-2 w-full mt-4">
              <button type="submit" className="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg">Calculate</button>
            </div>
          </form>

          <div className="w-full lg:w-1/2 max-w-md">
            <h2 className="text-2xl font-bold text-green-600 mb-4 text-center">Results</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              {[
                { label: 'Total Cost', value: `$${results.totalCost.toLocaleString()}` },
                { label: 'Levelized Cost', value: `$${results.levelizedCost.toFixed(2)}/kg` },
                { label: 'Payback Period', value: `${results.paybackPeriod.toFixed(1)} years` },
                { label: 'Internal Rate of Return', value: `${results.internalRate.toFixed(1)}%` },
              ].map((item, index) => (
                <div key={index} className={`px-6 py-4 ${index % 2 === 0 ? 'bg-green-50' : 'bg-white'}`}>
                  <p className="text-gray-700"><span className="font-semibold">{item.label}:</span> {item.value}</p>
                </div>
              ))}
            </div>
          </div>
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