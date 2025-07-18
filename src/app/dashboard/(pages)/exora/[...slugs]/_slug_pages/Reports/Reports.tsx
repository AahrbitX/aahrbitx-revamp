import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Star, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ReportsContent() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Reports</h1>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="border-slate-600 text-white bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-emerald-500 hover:bg-emerald-600">Generate Report</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <Card className="bg-[#1e293b] border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg text-white">Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Downloads</span>
                <span className="text-white font-medium">47,403</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Average Listen Time</span>
                <span className="text-white font-medium">25.81 min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Completion Rate</span>
                <span className="text-white font-medium">76.7%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Subscriber Growth</span>
                <span className="text-emerald-400 font-medium">+15.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1e293b] border-slate-700">
          <CardHeader>
            <CardTitle className="text-lg text-white">Top Episodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "Remote Work Revolution", plays: "3.2k", rating: 4.9 },
                { title: "Cryptocurrency Future", plays: "2.7k", rating: 4.8 },
                { title: "AI Content Creation", plays: "2.1k", rating: 4.7 },
                { title: "Sustainable Business", plays: "1.8k", rating: 4.6 },
              ].map((episode, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-white">{episode.title}</div>
                    <div className="text-xs text-slate-400">{episode.plays} plays</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-white">{episode.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1e293b] border-slate-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">Detailed Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-2">
            {[65, 78, 82, 90, 75, 88, 95, 100, 85, 92, 87, 94].map((height, index) => (
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
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
