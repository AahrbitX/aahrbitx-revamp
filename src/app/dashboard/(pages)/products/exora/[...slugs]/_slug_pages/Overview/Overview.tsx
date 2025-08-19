"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, RefreshCw, TrendingUp, Users, Clock, BarChart3, Activity, Zap, Target, Award, Calendar, DollarSign } from "lucide-react";
import { getOrgUsage } from "@/lib/api";
import { useParams } from "next/navigation";
import { getApplicationData } from "@/actions/products/getApplicationData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";
import { CustomDropdown } from "@/components/ui/custom-dropdown";
import { SkeletonHeader, SkeletonGrid, SkeletonCard, SkeletonChart, SkeletonProgressBar } from "@/components/ui/skeleton";

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
  const [selectedMetric, setSelectedMetric] = useState<number | null>(null);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState("week");
  const [forceUpdate, setForceUpdate] = useState(0);
  const params = useParams();

  const topMetrices = [
    {
      title: "Total sessions",
      value: loading ? "..." : data?.total_sessions ?? "-",
      subtitle: "Unique users:",
      subvalue: loading ? "..." : data?.unique_users ?? "-",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      trend: "+12.5%",
      trendColor: "text-emerald-400"
    },
    {
      title: "Total input tokens",
      value: loading ? "..." : data?.total_input_tokens ?? "-",
      subtitle: "Output tokens:",
      subvalue: loading ? "..." : data?.total_output_tokens ?? "-",
      icon: Activity,
      color: "from-purple-500 to-purple-600",
      trend: "+8.3%",
      trendColor: "text-emerald-400"
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
      icon: Clock,
      color: "from-orange-500 to-orange-600",
      trend: "-5.2%",
      trendColor: "text-red-400"
    },
    {
      title: "Weekly usage",
      value: loading ? "..." : data?.weekly_usage.length ?? "-",
      subtitle: "Monthly usage:",
      subvalue: loading ? "..." : data?.monthly_usage.length ?? "-",
      icon: BarChart3,
      color: "from-emerald-500 to-emerald-600",
      trend: "+15.7%",
      trendColor: "text-emerald-400"
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const appId = params?.app;
      const appData = await getApplicationData(appId as string);
      let orgIdToUse = appData?.org_id || "";
      const json = await getOrgUsage(orgIdToUse || "");
      setData(json);
      setForceUpdate(prev => prev + 1); // Force re-render
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
  const usageChart = data?.daily_usage?.map(
    (item: [string, number]) => item[1]
  ) || [40, 60, 80, 90, 70, 85, 95, 100];
  const usageLabels = data?.daily_usage?.map((item: [string, number]) =>
    item[0].slice(5)
  ) || ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  return (
    <TooltipProvider>
      <motion.div 
        className="p-6 @container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Header */}
        {loading ? (
          <SkeletonHeader />
        ) : (
          <motion.div 
            className="flex items-center justify-between mb-6"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Exora Overview</h2>
                <p className="text-sm text-slate-400">Your AI assistant performance dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {error && (
                <motion.div 
                  className="text-red-400 text-sm bg-red-500/10 px-3 py-2 rounded-lg border border-red-500/20"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {error}
                </motion.div>
              )}
                          <CustomDropdown
              options={[
                { value: "day", label: "Daily" },
                { value: "week", label: "Weekly" },
                { value: "month", label: "Monthly" }
              ]}
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              className="w-32"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-2 hover:bg-slate-700/50 transition-all duration-200"
            >
              <RefreshCw className={loading ? "animate-spin" : ""} size={16} />
              Refresh
            </Button>
            </div>
          </motion.div>
        )}

        {/* Enhanced Top Metrics */}
        {loading ? (
          <SkeletonGrid cols={4} />
        ) : (
          <motion.div 
            className="grid grid-cols-1 grid-rows-4 @lg:grid-rows-2 @lg:grid-cols-2 @2xl:grid-cols-4 @2xl:grid-rows-1 gap-4 mb-6"
            variants={itemVariants}
          >
            {topMetrices.map((metric, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onClick={() => setSelectedMetric(selectedMetric === index ? null : index)}
              >
                <Card className={`bg-gradient-to-br ${metric.color} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <CardContent className="py-4 px-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <metric.icon className="w-5 h-5 text-white/80" />
                        <Badge className="bg-white/20 text-white text-xs border-0">
                          {metric.trend}
                        </Badge>
                      </div>
                      <h3 className="text-sm text-white/80 mb-2 font-medium">{metric.title}</h3>
                      <p className="text-2xl font-bold text-white mb-2">
                        {metric.value}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-white/70">
                          {metric.subtitle} {metric.subvalue}
                        </p>
                        {selectedMetric === index && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-2 h-2 bg-white rounded-full"
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="grid grid-cols-1 gap-y-6 @lg:gap-x-6 @lg:grid-cols-2 @2xl:grid-cols-3">
          {/* Enhanced Main Chart Area */}
          <motion.div 
            className="@2xl:col-span-2 @lg:col-span-1 space-y-6"
            variants={itemVariants}
          >
            {/* Enhanced Large Number Display */}
            <motion.div variants={cardVariants}>
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-4xl font-bold text-white mb-2">
                        {loading ? "..." : data?.total_sessions ?? "-"}
                      </div>
                      <div className="text-sm text-emerald-400 mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        {loading
                          ? "Loading..."
                          : `▲ +${data?.total_input_tokens ?? "-"} tokens`}
                      </div>
                    </div>
                    <div className="p-3 bg-emerald-500/20 rounded-full">
                      <Target className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>

                  {/* Enhanced Bar Chart */}
                  <div className="space-y-4">
                    <div className="h-48 flex items-end justify-between space-x-2">
                      {usageChart.map((height, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <motion.div
                              className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t cursor-pointer relative group transition-all duration-200"
                              style={{
                                height: `${(height / Math.max(...usageChart)) * 100}%`,
                              }}
                              whileHover={{ 
                                scale: 1.05, 
                                y: -2,
                                boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)"
                              }}
                              onHoverStart={() => setHoveredBar(index)}
                              onHoverEnd={() => setHoveredBar(null)}
                            >
                              {/* Enhanced hover effect with glow */}
                              <div className="absolute inset-0 bg-gradient-to-t from-emerald-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-t"></div>
                              
                              {/* Enhanced tooltip */}
                              {hoveredBar === index && (
                                <motion.div
                                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap border border-emerald-500/20 shadow-xl z-10"
                                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                  <div className="text-center">
                                    <div className="font-bold text-emerald-400">{height}</div>
                                    <div className="text-xs text-slate-300">sessions</div>
                                  </div>
                                  {/* Tooltip arrow */}
                                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                                </motion.div>
                              )}
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent className="bg-slate-800 border-slate-600 text-white">
                            <p className="font-medium">{usageLabels[index]}: {height} sessions</p>
                            <p className="text-xs text-slate-400 mt-1">Click for details</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                    
                    {/* Enhanced X-axis labels */}
                    <div className="flex justify-between text-xs text-slate-400">
                      {usageLabels.map((label, idx) => (
                        <motion.span 
                          key={idx} 
                          className="font-medium cursor-pointer hover:text-emerald-400 transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                        >
                          {label}
                        </motion.span>
                      ))}
                    </div>
                    
                    {/* Enhanced chart stats */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                      <div className="text-xs text-slate-400">
                        <span className="text-emerald-400 font-medium">Peak:</span> {Math.max(...usageChart)} sessions
                      </div>
                      <div className="text-xs text-slate-400">
                        <span className="text-emerald-400 font-medium">Total:</span> {usageChart.reduce((a, b) => a + b, 0)} sessions
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Top Questions */}
            <motion.div variants={cardVariants}>
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-400" />
                    Top Questions
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-emerald-400 text-xs hover:bg-emerald-500/20 transition-colors"
                    disabled
                  >
                    See all
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {loading ? (
                    <div className="text-slate-400 flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                      Loading...
                    </div>
                  ) : (
                    data?.top_questions?.map((q, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <span className="text-sm text-white flex items-center gap-2">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                          {q}
                        </span>
                        <Badge className="bg-slate-700 text-slate-300 text-xs">
                          #{i + 1}
                        </Badge>
                      </motion.div>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Enhanced Right Column */}
          <motion.div 
            className="space-y-6 w-full"
            variants={itemVariants}
          >
            {/* Enhanced Audience Satisfaction */}
            <motion.div variants={cardVariants}>
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    Audience satisfaction
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex items-center justify-center pb-4">
                  <div className="relative w-32 h-32">
                    <svg
                      className="w-32 h-32 transform -rotate-90"
                      viewBox="0 0 36 36"
                    >
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#374151"
                        strokeWidth="2"
                      />
                      <motion.path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeDasharray="76.7, 100"
                        initial={{ strokeDasharray: "0, 100" }}
                        animate={{ strokeDasharray: "76.7, 100" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                      />
                    </svg>
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">76.7%</div>
                        <div className="text-xs text-emerald-400">Excellent</div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
                <div className="px-6 pb-6">
                  <div className="text-xs text-slate-400 text-center mb-3">
                    Based on likes / dislikes · 100% response rate
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="h-2 bg-emerald-500 rounded-full transition-all duration-300" style={{ width: '76.7%' }}></div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Enhanced Webinars Promotion */}
            <motion.div variants={cardVariants}>
              <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-400 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <CardHeader className="flex flex-row items-center justify-between pb-4 relative z-10">
                  <CardTitle className="text-sm text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Webinars
                  </CardTitle>
                  <Badge className="bg-white/20 text-white text-xs border-0">PRO</Badge>
                </CardHeader>
                <CardContent className="relative z-10">
                  <div className="text-lg font-bold text-white mb-2">
                    Learn how you can earn more than 20% each month!
                  </div>
                  <div className="text-sm text-emerald-100 mb-4">
                    Join our webinar and learn how to increase more than 20% your
                    monthly income
                  </div>
                  <Button className="bg-white/20 hover:bg-white/30 text-white border-0 w-full transition-all duration-200 hover:scale-105">
                    Learn more
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Last Upload */}
            <motion.div variants={cardVariants}>
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                  <CardTitle className="text-sm text-slate-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    Last upload
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-white">2 days ago</div>
                    <Badge className="bg-blue-500/20 text-blue-400 text-xs border border-blue-500/30">
                      Recent
                    </Badge>
                  </div>
                  <Separator className="my-3 bg-slate-700" />
                  <div className="text-xs text-slate-400">
                    File: exora_analytics_report.pdf
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}
