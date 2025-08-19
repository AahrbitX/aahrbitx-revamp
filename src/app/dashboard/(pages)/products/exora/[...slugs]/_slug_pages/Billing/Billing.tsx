"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { 
  Download, 
  TrendingUp, 
  CreditCard, 
  Users, 
  Activity, 
  DollarSign, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Zap,
  Target,
  Award,
  RefreshCw
} from "lucide-react";
import { CustomDropdown } from "@/components/ui/custom-dropdown";
import { SkeletonHeader, SkeletonGrid, SkeletonCard, SkeletonChart, SkeletonProgressBar } from "@/components/ui/skeleton";

export default function Billing() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const billingStats = [
    {
      title: "Total Revenue",
      value: "$12,547",
      change: "+18.3%",
      changeType: "positive",
      icon: DollarSign,
      color: "from-emerald-500 to-emerald-600",
      subtitle: "This month"
    },
    {
      title: "Active Subscriptions",
      value: "1,234",
      change: "+6.7%",
      changeType: "positive",
      icon: Users,
      color: "from-blue-500 to-blue-600",
      subtitle: "Growing steadily"
    },
    {
      title: "API Requests",
      value: "98,243",
      change: "+11.4%",
      changeType: "positive",
      icon: Activity,
      color: "from-purple-500 to-purple-600",
      subtitle: "This month"
    },
    {
      title: "Current Bill",
      value: "$128",
      change: "Due in 3 days",
      changeType: "warning",
      icon: CreditCard,
      color: "from-orange-500 to-orange-600",
      subtitle: "Payment pending"
    }
  ];

  const topUsageSources = [
    { platform: "Exora API", usage: "45,234", percentage: 42, color: "from-emerald-500 to-emerald-600" },
    { platform: "Webhook Engine", usage: "29,891", percentage: 31, color: "from-blue-500 to-blue-600" },
    { platform: "AI Insights", usage: "15,156", percentage: 17, color: "from-purple-500 to-purple-600" },
    { platform: "Data Sync", usage: "9,126", percentage: 10, color: "from-orange-500 to-orange-600" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
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
        className="p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Enhanced Header */}
        {isLoading ? (
          <SkeletonHeader />
        ) : (
          <motion.div 
            className="flex items-center justify-between mb-8"
            variants={itemVariants}
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl">
                <CreditCard className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Billing & Usage</h1>
                <p className="text-slate-400">Monitor your Exora subscription and usage analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CustomDropdown
                options={[
                  { value: "week", label: "Weekly" },
                  { value: "month", label: "Monthly" },
                  { value: "year", label: "Yearly" }
                ]}
                value={selectedPeriod}
                onChange={setSelectedPeriod}
                className="w-32"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsRefreshing(true);
                  setIsLoading(true);
                  // Simulate refresh - you can add actual refresh logic here
                  setTimeout(() => {
                    setIsRefreshing(false);
                    setIsLoading(false);
                  }, 1000);
                }}
                disabled={isRefreshing}
                className="border-slate-600 text-white bg-transparent hover:bg-slate-700/50 transition-colors"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Refreshing...' : 'Refresh'}
              </Button>
              <Button
                variant="outline"
                className="border-slate-600 text-white bg-transparent hover:bg-slate-700/50 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </Button>
            </div>
          </motion.div>
        )}

        {/* Enhanced Top Stats */}
        {isLoading ? (
          <SkeletonGrid cols={4} />
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            variants={itemVariants}
          >
            {billingStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card className={`bg-gradient-to-br ${stat.color} border-0 shadow-lg hover:shadow-xl transition-all duration-300`}>
                  <CardContent className="p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <stat.icon className="w-6 h-6 text-white/80" />
                        <Badge 
                          className={`${
                            stat.changeType === "positive" 
                              ? "bg-emerald-500/20 text-emerald-200" 
                              : stat.changeType === "warning"
                              ? "bg-orange-500/20 text-orange-200"
                              : "bg-red-500/20 text-red-200"
                          } text-xs border-0`}
                        >
                          {stat.changeType === "positive" && <TrendingUp className="w-3 h-3 mr-1" />}
                          {stat.changeType === "warning" && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {stat.change}
                        </Badge>
                      </div>
                      <h3 className="text-sm text-white/80 mb-2 font-medium">{stat.title}</h3>
                      <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                      <p className="text-xs text-white/70">{stat.subtitle}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Enhanced Graph & Top Users/Platforms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Usage Over Time */}
          {isLoading ? (
            <SkeletonCard />
          ) : (
            <motion.div variants={cardVariants}>
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-400" />
                    Usage Over Time
                  </CardTitle>
                  <p className="text-sm text-slate-400">API requests and usage patterns</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-48 flex items-end justify-between space-x-2">
                      {[30, 45, 60, 75, 85, 90, 95, 100].map((height, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger asChild>
                            <motion.div
                              className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t cursor-pointer relative group"
                              style={{ height: `${height}%` }}
                              whileHover={{ scale: 1.05 }}
                              onHoverStart={() => setHoveredBar(index)}
                              onHoverEnd={() => setHoveredBar(null)}
                            >
                              {hoveredBar === index && (
                                <motion.div
                                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10"
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                >
                                  {height}% usage
                                </motion.div>
                              )}
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Month {index + 1}: {height}% usage</p>
                          </TooltipContent>
                        </Tooltip>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((month, idx) => (
                        <span key={idx} className="font-medium">{month}</span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Enhanced Top Usage Sources */}
          {isLoading ? (
            <SkeletonCard />
          ) : (
            <motion.div variants={cardVariants}>
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-400" />
                    Top Usage Sources
                  </CardTitle>
                  <p className="text-sm text-slate-400">Breakdown by platform and service</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topUsageSources.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`}></div>
                          <span className="text-sm text-white font-medium">{item.platform}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-white font-semibold">{item.usage}</div>
                          <div className="text-xs text-slate-400">{item.percentage}%</div>
                        </div>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <motion.div 
                          className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Enhanced Additional Features */}
        {isLoading ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <motion.div 
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={itemVariants}
          >
            {/* Payment Methods */}
            <motion.div variants={cardVariants}>
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-emerald-400" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm text-white">•••• •••• •••• 4242</span>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">Default</Badge>
                  </div>
                  <Button variant="outline" className="w-full border-slate-600 text-emerald-400 hover:bg-emerald-500/20">
                    + Add Payment Method
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Billing History */}
            <motion.div variants={cardVariants}>
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    Billing History
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    {[
                      { month: "August 2024", amount: "$128", status: "Paid" },
                      { month: "July 2024", amount: "$128", status: "Paid" },
                      { month: "June 2024", amount: "$128", status: "Paid" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700/50 transition-colors">
                        <span className="text-sm text-slate-300">{item.month}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-white font-medium">{item.amount}</span>
                          <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">{item.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full border-slate-600 text-blue-400 hover:bg-blue-500/20">
                    View All Invoices
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Usage Alerts */}
            <motion.div variants={cardVariants}>
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-orange-400" />
                    Usage Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <AlertTriangle className="w-4 h-4 text-orange-400" />
                      <span className="text-xs text-orange-400">80% of monthly limit reached</span>
                    </div>
                    <div className="flex items-center space-x-2 p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-emerald-400">Payment successful</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full border-slate-600 text-orange-400 hover:bg-orange-500/20">
                    Manage Alerts
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </TooltipProvider>
  );
}
