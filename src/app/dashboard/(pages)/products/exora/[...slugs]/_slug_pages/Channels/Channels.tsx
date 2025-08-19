"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { SkeletonHeader, SkeletonGrid, SkeletonCard, SkeletonProgressBar } from "@/components/ui/skeleton";
import { 
  Globe, 
  Settings, 
  ExternalLink, 
  Plus, 
  Wifi, 
  WifiOff, 
  TrendingUp, 
  Users, 
  Activity, 
  Zap,
  Target,
  Award,
  Clock,
  BarChart3,
  RefreshCw,
  AlertCircle,
  CheckCircle2
} from "lucide-react";

export default function ChannelsContent() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [isAddingChannel, setIsAddingChannel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const channels = [
    {
      name: "Spotify",
      status: "Connected",
      subscribers: "5,234",
      lastSync: "2 hours ago",
      color: "from-green-500 to-green-600",
      icon: "🎵",
      growth: "+12.5%",
      syncStatus: "active",
      platform: "Music Streaming"
    },
    {
      name: "Apple Podcasts",
      status: "Connected",
      subscribers: "3,891",
      lastSync: "1 hour ago",
      color: "from-gray-500 to-gray-600",
      icon: "🍎",
      growth: "+8.3%",
      syncStatus: "active",
      platform: "Podcast Platform"
    },
    {
      name: "Google Podcasts",
      status: "Connected",
      subscribers: "2,156",
      lastSync: "3 hours ago",
      color: "from-blue-500 to-blue-600",
      icon: "🔍",
      growth: "+15.7%",
      syncStatus: "active",
      platform: "Search Platform"
    },
    {
      name: "YouTube",
      status: "Connected",
      subscribers: "1,266",
      lastSync: "30 minutes ago",
      color: "from-red-500 to-red-600",
      icon: "📺",
      growth: "+22.1%",
      syncStatus: "active",
      platform: "Video Platform"
    },
    {
      name: "Stitcher",
      status: "Disconnected",
      subscribers: "892",
      lastSync: "2 days ago",
      color: "from-orange-500 to-orange-600",
      icon: "📻",
      growth: "-5.2%",
      syncStatus: "inactive",
      platform: "Podcast Platform"
    },
    {
      name: "Overcast",
      status: "Connected",
      subscribers: "654",
      lastSync: "1 hour ago",
      color: "from-purple-500 to-purple-600",
      icon: "☁️",
      growth: "+9.8%",
      syncStatus: "active",
      platform: "Podcast App"
    },
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

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status: string) => {
    if (status === "Connected") return <Wifi className="w-4 h-4 text-emerald-400" />;
    return <WifiOff className="w-4 h-4 text-red-400" />;
  };

  const getSyncStatusColor = (syncStatus: string) => {
    if (syncStatus === "active") return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
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
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                <Globe className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Distribution Channels</h1>
                <p className="text-slate-400">Manage your content distribution across multiple platforms</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                className="bg-emerald-500 hover:bg-emerald-600 transition-all duration-200 hover:scale-105"
                onClick={() => setIsAddingChannel(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Channel
              </Button>
            </div>
          </motion.div>
        )}

        {/* Enhanced Channel Grid */}
        {isLoading ? (
          <SkeletonGrid cols={6} />
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
            variants={itemVariants}
          >
            {channels.map((channel, index) => (
              <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="cursor-pointer"
              onClick={() => setSelectedChannel(selectedChannel === channel.name ? null : channel.name)}
            >
              <Card className={`bg-gradient-to-br ${channel.color} border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
                <CardContent className="p-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{channel.icon}</div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">{channel.name}</h3>
                        <p className="text-xs text-white/70">{channel.platform}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        className={`${
                          channel.status === "Connected"
                            ? "bg-emerald-500/20 text-emerald-200 border-emerald-500/30"
                            : "bg-red-500/20 text-red-200 border-red-500/30"
                        } text-xs border`}
                      >
                        {getStatusIcon(channel.status)}
                        <span className="ml-1">{channel.status}</span>
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/80">Subscribers</span>
                      <span className="text-lg font-bold text-white">{channel.subscribers}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/80">Growth</span>
                      <Badge className={`${
                        channel.growth.startsWith('+') 
                          ? 'bg-emerald-500/20 text-emerald-200' 
                          : 'bg-red-500/20 text-red-200'
                      } text-xs border-0`}>
                        {channel.growth.startsWith('+') ? <TrendingUp className="w-3 h-3 mr-1" /> : <AlertCircle className="w-3 h-3 mr-1" />}
                        {channel.growth}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/80">Last Sync</span>
                      <span className="text-xs text-white/70">{channel.lastSync}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/80">Sync Status</span>
                      <Badge className={`${getSyncStatusColor(channel.syncStatus)} text-xs border`}>
                        {channel.syncStatus === "active" ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Clock className="w-3 h-3 mr-1" />}
                        {channel.syncStatus === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>

                  <Separator className="my-4 bg-white/20" />

                  <div className="flex items-center justify-between">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Settings className="w-4 h-4 mr-1" />
                      Settings
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </div>

                  {selectedChannel === channel.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-3 bg-white/10 rounded-lg"
                    >
                      <div className="text-xs text-white/80 space-y-1">
                        <div className="flex justify-between">
                          <span>API Calls:</span>
                          <span>1,234</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Error Rate:</span>
                          <span className="text-emerald-400">0.2%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Uptime:</span>
                          <span className="text-emerald-400">99.8%</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
            ))}
          </motion.div>
        )}

        {/* Enhanced Analytics Section */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={itemVariants}
        >
          {/* Channel Performance */}
          <motion.div variants={cardVariants}>
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-emerald-400" />
                  Channel Performance
                </CardTitle>
                <p className="text-sm text-slate-400">Monthly subscriber growth across platforms</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {channels.slice(0, 4).map((channel, index) => (
                  <motion.div 
                    key={index}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${channel.color}`}></div>
                        <span className="text-sm text-white font-medium">{channel.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-white font-semibold">{channel.subscribers}</div>
                        <div className={`text-xs ${
                          channel.growth.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {channel.growth}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div 
                        className={`h-2 rounded-full bg-gradient-to-r ${channel.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(parseInt(channel.subscribers.replace(/,/g, '')) / 100, 100)}%` }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.8 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Sync Status Overview */}
          <motion.div variants={cardVariants}>
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  Sync Status Overview
                </CardTitle>
                <p className="text-sm text-slate-400">Real-time synchronization status</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <div className="text-2xl font-bold text-emerald-400">
                      {channels.filter(c => c.syncStatus === "active").length}
                    </div>
                    <div className="text-xs text-emerald-300">Active Channels</div>
                  </div>
                  <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                    <div className="text-2xl font-bold text-red-400">
                      {channels.filter(c => c.syncStatus === "inactive").length}
                    </div>
                    <div className="text-xs text-red-300">Inactive Channels</div>
                  </div>
                </div>
                
                <Separator className="bg-slate-700" />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Total Subscribers</span>
                    <span className="text-lg font-bold text-white">
                      {channels.reduce((acc, c) => acc + parseInt(c.subscribers.replace(/,/g, '')), 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Avg Growth</span>
                    <span className="text-emerald-400 font-medium">+12.3%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">Last Sync</span>
                    <span className="text-blue-400 text-sm">30 minutes ago</span>
                  </div>
                </div>

                <Button className="w-full bg-blue-500 hover:bg-blue-600 transition-colors">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync All Channels
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Enhanced Quick Actions */}
        <motion.div 
          className="mt-8"
          variants={itemVariants}
        >
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Button variant="outline" className="border-slate-600 text-emerald-400 hover:bg-emerald-500/20 h-20 flex-col">
                  <RefreshCw className="w-5 h-5 mb-2" />
                  <span className="text-xs">Sync All</span>
                </Button>
                <Button variant="outline" className="border-slate-600 text-blue-400 hover:bg-blue-500/20 h-20 flex-col">
                  <BarChart3 className="w-5 h-5 mb-2" />
                  <span className="text-xs">Analytics</span>
                </Button>
                <Button variant="outline" className="border-slate-600 text-purple-400 hover:bg-purple-500/20 h-20 flex-col">
                  <Settings className="w-5 h-5 mb-2" />
                  <span className="text-xs">Settings</span>
                </Button>
                <Button variant="outline" className="border-slate-600 text-orange-400 hover:bg-orange-500/20 h-20 flex-col">
                  <Plus className="w-5 h-5 mb-2" />
                  <span className="text-xs">Add New</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </TooltipProvider>
  );
}
