"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getApplicationData } from "@/actions/products/getApplicationData";
import { fetchSubscriptionData } from "@/lib/api";
import { BarChartComponent as BarChart } from "@/app/dashboard/components/charts/bar-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";

export default function Billing() {
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  function generateMonthlyData(subscription: any) {
    if (!subscription?.start_date || !subscription?.monthly_price) return [];

    const startDate = new Date(subscription.start_date);
    const months = parseInt(subscription.period?.split(" ")[0] || "0", 10);
    const monthlyPrice = subscription.monthly_price;

    const data = [];
    for (let i = 0; i < months; i++) {
      const date = new Date(startDate);
      date.setMonth(date.getMonth() + i);
      data.push({
        month: format(date, "MMM yyyy"),
        value: monthlyPrice,
      });
    }
    return data;
  }

  const monthlyChartData = subscriptionData
    ? generateMonthlyData(subscriptionData.subscription)
    : [];

  const chartLabels = monthlyChartData.length > 0 ? monthlyChartData.map(d => d.month) : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  const chartData = monthlyChartData.length > 0 ? monthlyChartData.map(d => d.value) : [40, 60, 80, 90, 70, 85, 95, 100];

  const params = useParams();
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        let appId = params?.app;
        if (!appId) throw new Error("App ID not found");
        if (Array.isArray(appId)) {
          appId = appId[0];
        }
        const appData = await getApplicationData(appId);
        const orgId = appData?.org_id;
        if (!orgId) throw new Error("Organization ID not found");
        const data = await fetchSubscriptionData(orgId);
        setSubscriptionData(data);
      } catch (error) {
        console.error("Failed to fetch subscription data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscription();
  }, [params?.app]);

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
          <CardContent className="text-center pt-6">
            <div className="text-2xl font-bold text-white mb-2">
              ${subscriptionData?.subscription?.amount ?? "—"}
            </div>
            <div className="text-sm text-slate-400">Subscription Cost</div>
            <div className="text-xs text-emerald-400 mt-1">
              Plan: {subscriptionData?.subscription?.plan_name ?? "—"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center pt-6">
            <div className="text-2xl font-bold text-white mb-2">
              {subscriptionData?.subscription?.subscription_status ?? "—"}
            </div>
            <div className="text-sm text-slate-400">Status</div>
            <div className="text-xs text-emerald-400 mt-1">
              Ends in {subscriptionData?.subscription?.remaining_days ?? "—"} days
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center pt-6">
            <div className="text-2xl font-bold text-white mb-2">
              {subscriptionData?.subscription?.start_date ?? "—"}
            </div>
            <div className="text-sm text-slate-400">Start Date</div>
            <div className="text-xs text-emerald-400 mt-1">
              Expires on {subscriptionData?.subscription?.expires_on ?? "—"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center pt-6">
            <div className="text-2xl font-bold text-white mb-2">
              {subscriptionData?.Organisation?.org_name ?? "—"}
            </div>
            <div className="text-sm text-slate-400">Organization</div>
            <div className="text-xs text-slate-400 mt-1">
              Domain: {subscriptionData?.Organisation?.domain ?? "—"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graph & Top Usage Clients */}
      <div className="grid grid-cols-2 gap-6">
        {/* Usage Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-white">Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <BarChart data={monthlyChartData} /> */}
            <BarChart chartLabels={chartLabels} chartData={chartData} />
          </CardContent>
        </Card>


        {/* Top Usage Clients */}
        {/* <Card>
          <CardHeader>
            <CardTitle className="text-lg text-white">Top Usage Clients</CardTitle>
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
        </Card> */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Subscription Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-slate-300">
            <div className="flex justify-between">
              <span className="text-white">Application</span>
              <span>{subscriptionData?.application?.application_name ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Organization</span>
              <span>{subscriptionData?.Organisation?.org_name ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Domain</span>
              <span>{subscriptionData?.Organisation?.domain ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Plan Name</span>
              <span>{subscriptionData?.subscription?.plan_name ?? "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white">Status</span>
              <span className="capitalize">
                {subscriptionData?.subscription?.subscription_status ?? "—"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
