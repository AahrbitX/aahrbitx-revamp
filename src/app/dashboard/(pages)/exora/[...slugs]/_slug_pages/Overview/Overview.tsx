import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export default function OverviewContent() {
  return (
    <div className="p-6">
      {/* Top Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#1e293b] border-slate-700">
          <CardContent className="p-6">
            <div className="text-xs text-slate-400 mb-2">Total listens</div>
            <div className="text-2xl font-bold text-white mb-1">5,097</div>
            <div className="text-xs text-emerald-400">▲ +33.46%</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1e293b] border-slate-700">
          <CardContent className="p-6">
            <div className="text-xs text-slate-400 mb-2">Downloads</div>
            <div className="text-2xl font-bold text-white mb-1">47,403</div>
            <div className="text-xs text-red-400">▼ -112.45%</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1e293b] border-slate-700">
          <CardContent className="p-6">
            <div className="text-xs text-slate-400 mb-2">Average time</div>
            <div className="text-2xl font-bold text-white mb-1">25.81</div>
            <div className="text-xs text-emerald-400">▲ +102.52%</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1e293b] border-slate-700">
          <CardContent className="p-6">
            <div className="text-xs text-slate-400 mb-2">Episode time</div>
            <div className="text-2xl font-bold text-white mb-1">45.4 min</div>
            <div className="text-xs text-emerald-400">▲ +4.46%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="col-span-2 space-y-6">
          {/* Large Number Display */}
          <Card className="bg-[#1e293b] border-slate-700">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-white mb-2">301,097</div>
              <div className="text-sm text-emerald-400 mb-6">▲ +25.41% for 7 last days</div>

              {/* Bar Chart */}
              <div className="h-48 flex items-end justify-between space-x-2">
                {[40, 60, 80, 90, 70, 85, 95, 100].map((height, index) => (
                  <div key={index} className="flex-1 bg-emerald-500 rounded-t" style={{ height: `${height}%` }}></div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
              </div>
            </CardContent>
          </Card>

          {/* Popular Activity */}
          <Card className="bg-[#1e293b] border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-white">Popular activity</CardTitle>
              <Button variant="ghost" size="sm" className="text-emerald-400 text-xs">
                See all
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-600 rounded flex items-center justify-center">
                  <span className="text-xs">33</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white">Kuji Podcast 33: Live</div>
                  <div className="text-xs text-slate-400">Guest: Nathan Sebhatu</div>
                </div>
                <div className="text-xs text-slate-400">1.09m</div>
                <Badge className="bg-emerald-500 text-white text-xs">Live</Badge>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-600 rounded flex items-center justify-center">
                  <span className="text-xs">20</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white">Kuji Podcast 20: Live</div>
                  <div className="text-xs text-slate-400">Guest: Nathan Sebhatu</div>
                </div>
                <div className="text-xs text-slate-400">1.14m</div>
                <Badge className="bg-slate-600 text-slate-300 text-xs">Offline</Badge>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-slate-600 rounded flex items-center justify-center">
                  <span className="text-xs">24</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-white">Kuji Podcast 24: Live</div>
                  <div className="text-xs text-slate-400">Guest: Nathan Sebhatu</div>
                </div>
                <div className="text-xs text-slate-400">1.04m</div>
                <Badge className="bg-emerald-500 text-white text-xs">Live</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Audience Satisfaction */}
          <Card className="bg-[#1e293b] border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm text-slate-400">Audience satisfaction</CardTitle>
              <MoreHorizontal className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="76.7, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">76.7%</div>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="px-6 pb-6">
              <div className="text-xs text-slate-400 text-center">Based on likes / dislikes · 100%</div>
            </div>
          </Card>

          {/* Webinars Promotion */}
          <Card className="bg-emerald-500 border-emerald-400">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm text-white">Webinars</CardTitle>
              <Badge className="bg-white/20 text-white text-xs">PRO</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-white mb-2">Learn how you can earn more then 20% each month!</div>
              <div className="text-sm text-emerald-100 mb-4">
                Join our webinar and learn how to increase more then 20% your monthly income
              </div>
              <Button className="bg-white/20 hover:bg-white/30 text-white border-0 w-full">Learn more</Button>
            </CardContent>
          </Card>

          {/* Last Upload */}
          <Card className="bg-[#1e293b] border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm text-slate-400">Last upload</CardTitle>
              <MoreHorizontal className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-white">2 days ago</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
