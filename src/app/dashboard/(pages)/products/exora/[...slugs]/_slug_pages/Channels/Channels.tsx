import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Settings, ExternalLink, Plus } from "lucide-react";

export default function ChannelsContent() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Distribution Channels</h1>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Channel
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {[
          {
            name: "Spotify",
            status: "Connected",
            subscribers: "5,234",
            lastSync: "2 hours ago",
            color: "bg-green-500",
          },
          {
            name: "Apple Podcasts",
            status: "Connected",
            subscribers: "3,891",
            lastSync: "1 hour ago",
            color: "bg-gray-500",
          },
          {
            name: "Google Podcasts",
            status: "Connected",
            subscribers: "2,156",
            lastSync: "3 hours ago",
            color: "bg-blue-500",
          },
          {
            name: "YouTube",
            status: "Connected",
            subscribers: "1,266",
            lastSync: "30 minutes ago",
            color: "bg-red-500",
          },
          {
            name: "Stitcher",
            status: "Disconnected",
            subscribers: "892",
            lastSync: "2 days ago",
            color: "bg-orange-500",
          },
          {
            name: "Overcast",
            status: "Connected",
            subscribers: "654",
            lastSync: "1 hour ago",
            color: "bg-purple-500",
          },
        ].map((channel, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 ${channel.color} rounded-lg flex items-center justify-center`}
                  >
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{channel.name}</h3>
                    <p className="text-sm text-slate-400">
                      {channel.subscribers} subscribers
                    </p>
                  </div>
                </div>
                <Badge
                  className={`${
                    channel.status === "Connected"
                      ? "bg-emerald-500"
                      : "bg-red-500"
                  } text-white`}
                >
                  {channel.status}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">
                  Last sync: {channel.lastSync}
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-white bg-transparent"
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Settings
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-white bg-transparent"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
