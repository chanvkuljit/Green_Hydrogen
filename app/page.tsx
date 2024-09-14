'use client';

import Link from 'next/link'
import { Leaf, Zap, BarChart3, Calculator, Brain, Database, DollarSign } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-green-50">
      <header className="bg-green-600 text-white body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link href="/" className="flex title-font font-medium items-center text-primary-foreground mb-4 md:mb-0">
            <Leaf className="w-10 h-10" />
            <span className="ml-3 text-xl">Elysian Energy</span>
          </Link>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/LCOH" className="mr-5 hover:text-primary-foreground/80 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
              <span className="flex items-center">
                <Calculator className="w-4 h-4 mr-1" />
                LCOH Calculator
              </span>
            </Link>
            <Link href="/AI" className="mr-5 hover:text-primary-foreground/80 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
              <span className="flex items-center">
                <Brain className="w-4 h-4 mr-1" />
                AI Predictor
              </span>
            </Link>
            <Link href="/HSU" className="mr-5 hover:text-primary-foreground/80 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
              <span className="flex items-center">
                <Database className="w-4 h-4 mr-1" />
                HSU Calculator
              </span>
            </Link>
            <Link href="/COS_AN" className="mr-5 hover:text-primary-foreground/80 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
              <span className="flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Cost Analyzer
              </span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        <section id="about" className="text-gray-800 body-font">
          <div className="container px-4 py-12 mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold title-font text-green-600 mb-4">Green Hydrogen: The Future of Clean Energy</h1>
              <p className="text-base sm:text-lg leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                Green hydrogen is hydrogen produced using renewable energy sources, making it a clean and sustainable fuel option for the future.
              </p>
              <div className="flex mt-6 justify-center">
                <div className="w-16 h-1 rounded-full bg-primary inline-flex"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="text-gray-800 body-font bg-green-100">
          <div className="container px-4 py-12 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold title-font text-primary mb-4">Benefits of Green Hydrogen</h2>
              <p className="text-base sm:text-lg leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
                Green hydrogen offers numerous advantages as we transition to a cleaner energy future.
              </p>
            </div>
            <div className="flex flex-wrap -m-4">
              {[
                { icon: Leaf, title: "Zero Emissions", description: "Green hydrogen produces only water vapor when used, making it a zero-emission fuel source." },
                { icon: Zap, title: "Energy Storage", description: "Hydrogen can store excess renewable energy, solving intermittency issues of solar and wind power." },
                { icon: BarChart3, title: "Versatile Application", description: "Green hydrogen can be used in various sectors including transportation, industry, and power generation." }
              ].map((benefit, index) => (
                <div key={index} className="p-4 md:w-1/3">
                  <div className="flex rounded-lg h-full bg-card p-8 flex-col">
                    <div className="flex items-center mb-3">
                      <benefit.icon className="w-8 h-8 text-primary mr-3" />
                      <h3 className="text-foreground text-lg title-font font-medium">{benefit.title}</h3>
                    </div>
                    <div className="flex-grow">
                      <p className="leading-relaxed text-base">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="stats" className="text-gray-800 body-font">
          <div className="container px-4 py-12 mx-auto">
            <div className="flex flex-col text-center w-full mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold title-font mb-4 text-green-600">Green Hydrogen Statistics</h2>
              <p className="text-base sm:text-lg lg:w-2/3 mx-auto leading-relaxed">
                The green hydrogen market is growing rapidly as the world shifts towards cleaner energy sources.
              </p>
            </div>
            <div className="flex flex-wrap -m-4 text-center">
              {[
                { value: "530 Mt", label: "Potential CO2 Reduction by 2050" },
                { value: "$11 Trillion", label: "Potential Market Size by 2050" },
                { value: "30%", label: "Projected Share in Energy Mix by 2050" },
                { value: "5.4 Million", label: "Potential Jobs Created by 2050" }
              ].map((stat, index) => (
                <div key={index} className="p-4 w-full sm:w-1/2 lg:w-1/4">
                  <div className="border-2 border-green-500 px-4 py-6 rounded-lg">
                    <h3 className="title-font font-medium text-2xl sm:text-3xl text-green-600">{stat.value}</h3>
                    <p className="leading-relaxed text-sm sm:text-base">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
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
  )
}