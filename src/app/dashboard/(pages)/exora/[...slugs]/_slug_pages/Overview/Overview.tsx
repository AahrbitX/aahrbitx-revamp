'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, RefreshCw } from "lucide-react";
import { getOrgUsage } from "@/lib/api";
import { useAuth } from "@/providers/auth-provider";

interface OrgUsage {
  total_sessions: number;
  total_input_tokens: number;
  total_output_tokens: number;
  avg_response_time_ms: number;
  max_response_time_ms: number;
  unique_users: number;
  top_questions: string[];
  daily_usage: [string, number][];
  weekly_usage: [string, number][];
  monthly_usage: [string, number][];
}

export default function Overview() {


const [data, setData] = useState<OrgUsage | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const { user: AppUser } = useAuth();

// const fetchData = async () => {
//   setLoading(true);
//   setError("");
//   try {

//   } catch (err: any) {
//     setError(err?.message || "Unknown error");
//   } finally {
//     setLoading(false);
//   }
// };

    const fetchData = async () => {
    setLoading(true);
    setError("");
      try {
        const json = await getOrgUsage(AppUser?.id ?? '');
        setData(json);
      } catch (err: any) {
        setError(err?.message || "Unknown error");
      } finally {
        setLoading(false);
      }
  };

useEffect(() => {
  fetchData();
  // eslint-disable-next-line
}, []);

  // Helper for usage chart
const usageChart = data?.daily_usage?.map((item: [string, number]) => item[1]) || [40, 60, 80, 90, 70, 85, 95, 100];
const usageLabels = data?.daily_usage?.map((item: [string, number]) => item[0].slice(5)) || ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Overview</h2>
        <Button variant="ghost" size="sm" onClick={fetchData} disabled={loading} className="flex items-center gap-2">
          <RefreshCw className={loading ? "animate-spin" : ""} size={16} />
          Refresh
        </Button>
      </div>
      {error && (
        <div className="mb-4 text-red-400 text-sm">{error}</div>
      )}
      {/* Top Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card className="bg-[#1e293b] border-slate-700">
          <CardContent className="p-6">
            <div className="text-xs text-slate-400 mb-2">Total sessions</div>
            <div className="text-2xl font-bold text-white mb-1">{loading ? "..." : data?.total_sessions ?? "-"}</div>
            <div className="text-xs text-emerald-400">Unique users: {loading ? "..." : data?.unique_users ?? "-"}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1e293b] border-slate-700">
          <CardContent className="p-6">
            <div className="text-xs text-slate-400 mb-2">Total input tokens</div>
            <div className="text-2xl font-bold text-white mb-1">{loading ? "..." : data?.total_input_tokens ?? "-"}</div>
            <div className="text-xs text-emerald-400">Output tokens: {loading ? "..." : data?.total_output_tokens ?? "-"}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1e293b] border-slate-700">
          <CardContent className="p-6">
            <div className="text-xs text-slate-400 mb-2">Avg response time</div>
            <div className="text-2xl font-bold text-white mb-1">{loading ? "..." : (data?.avg_response_time_ms ? `${data.avg_response_time_ms} ms` : "-")}</div>
            <div className="text-xs text-emerald-400">Max: {loading ? "..." : (data?.max_response_time_ms ? `${data.max_response_time_ms} ms` : "-")}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1e293b] border-slate-700">
          <CardContent className="p-6">
            <div className="text-xs text-slate-400 mb-2">Top questions</div>
            <div className="text-2xl font-bold text-white mb-1">{loading ? "..." : (data?.top_questions?.length ?? 0)}</div>
            <div className="text-xs text-emerald-400">{!loading && data?.top_questions?.slice(0, 2)?.join(", ")}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <div className="col-span-2 space-y-6">
          {/* Large Number Display */}
          <Card className="bg-[#1e293b] border-slate-700">
            <CardContent className="p-6">
              <div className="text-4xl font-bold text-white mb-2">{loading ? "..." : data?.total_sessions ?? "-"}</div>
              <div className="text-sm text-emerald-400 mb-6">{loading ? "Loading..." : `▲ +${data?.total_input_tokens ?? "-"} tokens`}</div>

              {/* Bar Chart */}
              <div className="h-48 flex items-end justify-between space-x-2">
                {usageChart.map((height, index) => (
                  <div key={index} className="flex-1 bg-emerald-500 rounded-t" style={{ height: `${height / Math.max(...usageChart) * 100}%` }}></div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                {usageLabels.map((label, idx) => (
                  <span key={idx}>{label}</span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Questions */}
          <Card className="bg-[#1e293b] border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-white">Top Questions</CardTitle>
              <Button variant="ghost" size="sm" className="text-emerald-400 text-xs" disabled>
                See all
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {loading ? (
                <div className="text-slate-400">Loading...</div>
              ) : (
                data?.top_questions?.map((q, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm text-white">{q}</span>
                  </div>
                ))
              )}
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