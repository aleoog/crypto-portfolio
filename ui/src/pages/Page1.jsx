export default function Page1() {
    return (
 <div className="min-h-screen gradient-primary">
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <main className="p-4 space-y-6">
        {/* Top Section: 70% - 30% */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 min-h-[500px]">
          {/* Portfolio Table - 70% */}
          <div className="lg:col-span-7">
            <PortfolioTable />
          </div>
          
          {/* Diversification Treemap - 30% */}
          <div className="lg:col-span-3">
            <DiversificationTreemap />
          </div>
        </div>
        
        {/* Bottom Section: 40% - 30% - 30% */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 min-h-[400px]">
          {/* Investment Chart - 40% */}
          <div className="lg:col-span-4">
            <InvestmentChart />
          </div>
          
          {/* Additional Charts/Info - 30% each */}
          <div className="lg:col-span-3">
            <div className="glass shadow-luxury rounded-2xl p-6 h-full animate-slide-in-right">
              <div className="flex items-center justify-center mb-4">
                <h3 className="text-xl font-bold text-white">Portfolio Summary</h3>
                <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 ml-3 rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-300 text-sm">Total Portfolio Value</p>
                  <p className="text-white text-2xl font-bold">$62,835</p>
                  <p className="text-green-400 text-sm font-semibold">+3.2% (24h)</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-300 text-sm">Total Invested</p>
                  <p className="text-white text-2xl font-bold">$58,530</p>
                  <p className="text-blue-400 text-sm font-semibold">Principal Amount</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-300 text-sm">Total P&L</p>
                  <p className="text-green-400 text-2xl font-bold">+$2,405</p>
                  <p className="text-green-400 text-sm font-semibold">+4.1% ROI</p>
                </div>
                
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-300 text-sm">Best Performer</p>
                  <p className="text-white text-xl font-bold">DOGE</p>
                  <p className="text-green-400 text-sm font-semibold">+20% ROI</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="glass shadow-luxury rounded-2xl p-6 h-full animate-fade-in-up">
              <div className="flex items-center justify-center mb-4">
                <h3 className="text-xl font-bold text-white">Market Insights</h3>
                <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 ml-3 rounded-full"></div>
              </div>
              
              <div className="space-y-4">
                <div className="border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">Market Cap</span>
                    <span className="text-green-400 text-sm">+2.1%</span>
                  </div>
                  <p className="text-gray-300 text-sm">$2.89T Total Crypto Market</p>
                </div>
                
                <div className="border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">BTC Dominance</span>
                    <span className="text-blue-400 text-sm">58.2%</span>
                  </div>
                  <p className="text-gray-300 text-sm">Bitcoin market share</p>
                </div>
                
                <div className="border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">Fear & Greed</span>
                    <span className="text-yellow-400 text-sm">Neutral (52)</span>
                  </div>
                  <p className="text-gray-300 text-sm">Market sentiment index</p>
                </div>
                
                <div className="border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-semibold">24h Volume</span>
                    <span className="text-purple-400 text-sm">$127.5B</span>
                  </div>
                  <p className="text-gray-300 text-sm">Global trading volume</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
    
}