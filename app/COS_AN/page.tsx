'use client';

import { useState } from 'react';
import { DollarSign, Zap, Sun, Wind, Droplet, Leaf, Calculator, Brain, Database } from 'lucide-react';
import Link from 'next/link';

export default function COSAN() {
  const [electrolyzerResult, setElectrolyzerResult] = useState<string | null>(null);
  const [renewableResult, setRenewableResult] = useState<string | null>(null);
  const [pcdResult, setPcdResult] = useState<string | null>(null);
  const [desalResult, setDesalResult] = useState<string | null>(null);

  const handleElectrolyzerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      capacity: { value: string };
      costPerMW: { value: string };
    };

    const capacity = parseFloat(target.capacity.value);
    const costPerMW = parseFloat(target.costPerMW.value);

    const equipmentCost = capacity * costPerMW;

    setElectrolyzerResult(equipmentCost.toFixed(2));
  };

  const handleRenewableSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      SolarCapacity: { value: string };
      SolarPrice: { value: string };
      WindCapacity: { value: string };
      WindPrice: { value: string };
    };

    const scap = parseFloat(target.SolarCapacity.value);
    const spri = parseFloat(target.SolarPrice.value);
    const wcap = parseFloat(target.WindCapacity.value);
    const wpri = parseFloat(target.WindPrice.value);

    const SolarCost = scap * spri;
    const WindCost = wcap * wpri;
    const totalCost = SolarCost + WindCost;

    setRenewableResult(totalCost.toFixed(2));
  };

  const handlePcdSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      capacity: { value: string };
      costPerMW: { value: string };
    };

    const pcost = parseFloat(target.capacity.value);
    const cdcost = parseFloat(target.costPerMW.value);

    const totalCost = pcost + cdcost;

    setPcdResult(totalCost.toFixed(2));
  };

  const handleDesalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      capacity: { value: string };
      costPerMW: { value: string };
    };

    const wreq = parseFloat(target.capacity.value);
    const cospm = parseFloat(target.costPerMW.value);

    const equipmentCost = (wreq * cospm) * 365;

    setDesalResult(equipmentCost.toFixed(2));
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
        {/* Electrolyzer Section */}
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold title-font text-green-600 mb-4 text-center">
            Electrolyzer Cost Calculation
          </h1>
          <div className="flex flex-col lg:flex-row gap-8 justify-center">
            <div className="w-full lg:w-1/2 max-w-md bg-white rounded-lg shadow-lg p-6">
              <form onSubmit={handleElectrolyzerSubmit} className="space-y-4">
                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
                    Price Per kWh of Electrolyzer ($):
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm  text-gray-800">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="capacity"
                      name="capacity"
                      required
                      className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="costPerMW" className="block text-sm font-medium text-gray-700 mb-2">
                    Electrolyzer Capacity In kWh:
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm  text-gray-800">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Zap className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="costPerMW"
                      name="costPerMW"
                      required
                      className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="0"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">kWh</span>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                >
                  Calculate Electrolyzer Cost
                </button>
              </form>
            </div>

            <div className="w-full lg:w-1/2 max-w-md">
              {electrolyzerResult && (
                <div className="h-full flex items-center justify-center bg-white rounded-lg shadow-lg p-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-green-700 mb-2">Capital Expenditure Of Electrolyzer</h2>
                    <p className="text-3xl font-bold text-green-800">
                      <DollarSign className="inline-block w-8 h-8 mr-1 text-green-600" />
                      {electrolyzerResult}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Renewable Energy Section */}
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold title-font text-green-600 mb-4 text-center">
            Renewable Energy Cost Calculation
          </h1>
          <div className="flex flex-col lg:flex-row gap-8 justify-center">
            <div className="w-full lg:w-1/2 max-w-md bg-white rounded-lg shadow-lg p-6">
              <form onSubmit={handleRenewableSubmit} className="space-y-4">
                <div>
                  <label htmlFor="SolarCapacity" className="block text-sm font-medium text-gray-700 mb-2">
                    Solar Capacity In kWh:
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm  text-gray-800">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Sun className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="SolarCapacity"
                      name="SolarCapacity"
                      required
                      className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="SolarPrice" className="block text-sm font-medium text-gray-700 mb-2">
                    Solar Price Per kWh ($):
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm  text-gray-800">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="SolarPrice"
                      name="SolarPrice"
                      required
                      className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="WindCapacity" className="block text-sm font-medium text-gray-700 mb-2">
                    Wind Turbine Capacity In kWh:
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm  text-gray-800">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Wind className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="WindCapacity"
                      name="WindCapacity"
                      required
                      className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="WindPrice" className="block text-sm font-medium text-gray-700 mb-2">
                    Wind Price Per kWh ($):
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm  text-gray-800">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="WindPrice"
                      name="WindPrice"
                      required
                      className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                >
                  Calculate Renewable Energy Cost
                </button>
              </form>
            </div>

            <div className="w-full lg:w-1/2 max-w-md">
              {renewableResult && (
                <div className="h-full flex items-center justify-center bg-white rounded-lg shadow-lg p-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-green-700 mb-2">Capital Expenditure Of Renewable Energy</h2>
                    <p className="text-3xl font-bold text-green-800">
                      <DollarSign className="inline-block w-8 h-8 mr-1 text-green-600" />
                      {renewableResult}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PCD Section */}
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold title-font text-green-600 mb-4 text-center">
            Purification, Compression & Drying Units Cost Calculation
          </h1>
          <div className="flex flex-col lg:flex-row gap-8 justify-center">
            <div className="w-full lg:w-1/2 max-w-md bg-white rounded-lg shadow-lg p-6">
              <form onSubmit={handlePcdSubmit} className="space-y-4">
                <div>
                  <label htmlFor="pcd-capacity" className="block text-sm font-medium text-gray-700 mb-2">
                    Price Per Kg of Hydrogen Produced ($):
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm text-gray-800">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="pcd-capacity"
                      name="capacity"
                      required
                      className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="pcd-costPerMW" className="block text-sm font-medium text-gray-700 mb-2">
                    Cost of Compression & Drying ($):
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm text-gray-800">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="pcd-costPerMW"
                      name="costPerMW"
                      required
                      className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                >
                  Calculate PCD Cost
                </button>
              </form>
            </div>

            <div className="w-full lg:w-1/2 max-w-md">
              {pcdResult && (
                <div className="h-full flex items-center justify-center bg-white rounded-lg shadow-lg p-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-green-700 mb-2">Capital Expenditure Of Purification, Compression & Drying Units</h2>
                    <p className="text-3xl font-bold text-green-800">
                      <DollarSign className="inline-block w-8 h-8 mr-1 text-green-600" />
                      {pcdResult}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desalination Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold title-font text-green-600 mb-4 text-center">
            Desalination Cost Calculation
          </h1>
          <div className="flex flex-col lg:flex-row gap-8 justify-center">
            <div className="w-full lg:w-1/2 max-w-md bg-white rounded-lg shadow-lg p-6">
              <form onSubmit={handleDesalSubmit} className="space-y-4">
                <div>
                  <label htmlFor="desal-capacity" className="block text-sm font-medium text-gray-700 mb-2">
                    Water Requirements (m³ Per Day):
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm text-gray-800">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Droplet className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="desal-capacity"
                      name="capacity"
                      required
                      className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="desal-costPerMW" className="block text-sm font-medium text-gray-700 mb-2">
                    Cost Per m³ ($):
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm text-gray-800">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      id="desal-costPerMW"
                      name="costPerMW"
                      required
                      className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
                >
                  Calculate Desalination Cost
                </button>
              </form>
            </div>

            <div className="w-full lg:w-1/2 max-w-md">
              {desalResult && (
                <div className="h-full flex items-center justify-center bg-white rounded-lg shadow-lg p-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-green-700 mb-2">Operational Expenditure Of Desalination</h2>
                    <p className="text-3xl font-bold text-green-800">
                      <DollarSign className="inline-block w-8 h-8 mr-1 text-green-600" />
                      {desalResult}/year
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="text-gray-800 body-font bg-green-200">
        <div className="container px-4 py-6 mx-auto flex flex-col sm:flex-row items-center justify-center">
          <Link href="/" className="flex title-font font-medium items-center md:justify-start justify-center text-gray-800">
            <Leaf className="w-10 h-10 text-white p-2 bg-green-600 rounded-full" />
            <span className="ml-3 text-xl">Elysian Energy</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}