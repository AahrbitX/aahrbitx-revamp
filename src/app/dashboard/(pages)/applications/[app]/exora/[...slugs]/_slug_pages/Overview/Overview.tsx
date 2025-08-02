"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, RefreshCw } from "lucide-react";
import { getOrgUsage } from "@/lib/api";
import { useAuthOrg } from "@/providers/auth-org-provider";
import { RadialChartComponent } from "@/app/dashboard/components/charts/radial-chart";
import { BarChartComponent } from "@/app/dashboard/components/charts/bar-chart";

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
  const { user: AppUser } = useAuthOrg();

  const topMetrices = [
    {
      title: "Total sessions",
      value: loading ? "..." : data?.total_sessions ?? "-",
      subtitle: "Unique users:",
      subvalue: loading ? "..." : data?.unique_users ?? "-",
    },
    {
      title: "Total input tokens",
      value: loading ? "..." : data?.total_input_tokens ?? "-",
      subtitle: "Output tokens:",
      subvalue: loading ? "..." : data?.total_output_tokens ?? "-",
    },
    {
      title: "Avg response time",
      value: loading
        ? "..."
        : data?.avg_response_time_ms
        ? `${data.avg_response_time_ms} ms`
        : "-",
      subtitle: "Max:",
      subvalue: loading
        ? "..."
        : data?.max_response_time_ms
        ? `${data.max_response_time_ms} ms`
        : "-",
    },
    {
      title: "Weekly usage",
      value: loading ? "..." : data?.weekly_usage.length ?? "-",
      subtitle: "Monthly usage:",
      subvalue: loading ? "..." : data?.monthly_usage.length ?? "-",
    },
  ];

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
      const json = await getOrgUsage(AppUser?.id ?? "");
      console.log("Org Usage Data:", json);
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

  return (
    <div className="p-6 @container">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Overview</h2>
        {error && <div className=" text-red-400 text-sm">{error}</div>}
        <Button
          variant="ghost"
          size="sm"
          onClick={fetchData}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={loading ? "animate-spin" : ""} size={16} />
          Refresh
        </Button>
      </div>
      {/* Top Metrics */}
      <div className="grid grid-cols-1 grid-rows-4 @lg:grid-rows-2 @lg:grid-cols-2 @2xl:grid-cols-4 @2xl:grid-rows-1 gap-4 mb-4">
        {topMetrices.map((metric, index) => (
          <Card key={index}>
            <CardContent className="py-1 px-4">
              <h3 className="text-sm text-slate-400 mb-2">{metric.title}</h3>
              <p className="text-2xl font-bold text-white mb-1">
                {metric.value}
              </p>
              <p className="text-xs text-emerald-400 mt-6">
                {metric.subtitle} {metric.subvalue}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-y-4 @lg:gap-x-4 @lg:grid-cols-2 @2xl:grid-cols-3">
        {/* Main Chart Area */}
        <div className="@2xl:col-span-2 @lg:col-span-1 space-y-4">
          {/* Large Number Display */}
          <Card className="bg-card ">
            <CardContent className="p-6">
              <BarChartComponent />
            </CardContent>
          </Card>

          {/* Top Questions */}
          <Card className="bg-card ">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-white">
                Top Questions
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-emerald-400 text-xs"
                disabled
              >
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
        <div className="space-y-4 w-full">
          {/* Audience Satisfaction */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm text-slate-400">
                Audience satisfaction
              </CardTitle>
              <MoreHorizontal className="w-4 h-4 text-slate-400" />
            </CardHeader>
            <CardContent className="flex-1">
              <RadialChartComponent />
            </CardContent>
            <CardFooter className="px-6 pb-6 justify-center">
              <div className="text-sm text-slate-400 text-center">
                Based on likes / dislikes · 100%
              </div>
            </CardFooter>
          </Card>

          {/* Webinars Promotion */}
          <Card className="bg-emerald-500 border-emerald-400">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm text-white">Webinars</CardTitle>
              <Badge className="bg-white/20 text-white text-xs">PRO</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-white mb-2">
                Learn how you can earn more then 20% each month!
              </div>
              <div className="text-sm text-emerald-100 mb-4">
                Join our webinar and learn how to increase more then 20% your
                monthly income
              </div>
              <Button className="bg-white/20 hover:bg-white/30 text-white border-0 w-full">
                Learn more
              </Button>
            </CardContent>
          </Card>

          {/* Last Upload */}
          <Card className="bg-card ">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm text-slate-400">
                Last upload
              </CardTitle>
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
