import { BarChartHorizontal } from "@/app/dashboard/components/charts/bar-chart-horizontal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Billing() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Billing & Usage</h1>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="border-slate-600 text-white bg-transparent"
          >
            Download Invoice
          </Button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className=" text-center">
            <div className="text-2xl font-bold text-white mb-2">$12,547</div>
            <div className="text-sm text-slate-400">Total Revenue</div>
            <div className="text-xs text-emerald-400 mt-1">▲ +18.3%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className=" text-center">
            <div className="text-2xl font-bold text-white mb-2">1,234</div>
            <div className="text-sm text-slate-400">Active Subscriptions</div>
            <div className="text-xs text-emerald-400 mt-1">▲ +6.7%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className=" text-center">
            <div className="text-2xl font-bold text-white mb-2">98,243</div>
            <div className="text-sm text-slate-400">
              API Requests (This Month)
            </div>
            <div className="text-xs text-emerald-400 mt-1">▲ +11.4%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className=" text-center">
            <div className="text-2xl font-bold text-white mb-2">$128</div>
            <div className="text-sm text-slate-400">Current Bill</div>
            <div className="text-xs text-red-400 mt-1">● Due in 3 days</div>
          </CardContent>
        </Card>
      </div>

      {/* Graph & Top Users/Platforms */}
      <div className="grid grid-cols-2 gap-6">
        {/* Usage Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Usage Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BarChartHorizontal />
          </CardContent>
        </Card>

        {/* Top Usage Sources */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Top Usage Clients
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { platform: "Exora API", usage: "45,234", percentage: 42 },
              { platform: "Webhook Engine", usage: "29,891", percentage: 31 },
              { platform: "AI Insights", usage: "15,156", percentage: 17 },
              { platform: "Data Sync", usage: "9,126", percentage: 10 },
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white">{item.platform}</span>
                  <span className="text-slate-400">{item.usage}</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
