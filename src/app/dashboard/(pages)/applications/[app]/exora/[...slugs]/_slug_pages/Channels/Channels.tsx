import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Settings, ExternalLink, Plus } from "lucide-react";
import { getApplicationData } from "@/actions/products/getApplicationData";
import {
  IconBrandApplePodcast,
  IconBrandGooglePodcasts,
  IconBrandSpotify,
  IconBrandYoutube,
} from "@tabler/icons-react";
import Link from "next/link";



export default function ChannelsContent() {


  // Example: get current slug from router (if needed for dynamic routing)
  // import { useParams } from "next/navigation";
  // const params = useParams();
  // const { app, slugs } = params;

  // Only show channels, clicking a card navigates to dynamic channel page
  const channels = [
    {
      name: "Web-Integration",
      status: "Connected",
      subscribers: "5,234",
      lastSync: "2 hours ago",
      color: "bg-green-500",
      Icon: IconBrandSpotify,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Distribution Channels</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {channels.map((channel, index) => (
          <Link
            key={index}
            href={`./${channel.name.toLowerCase()}`}
            passHref
          >
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="px-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 ${channel.color} rounded-lg flex items-center justify-center`}
                    >
                      <channel.Icon className="w-6 h-6 text-white" />
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
                  <Link
                    href={`./${channel.name.toLowerCase()}`}
                    passHref
                  >
                    <Button variant="ghost" size="icon" aria-label={`Settings for ${channel.name}`}>
                      <Settings className="w-5 h-5 text-slate-400 hover:text-white" />
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">
                    Last sync: {channel.lastSync}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
