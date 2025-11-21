import { Eye, Heart, FolderDot, TrendingUp } from "lucide-react";
import { Lusitana } from "next/font/google";

const lusitana = Lusitana({ subsets: ["latin"], weight: "700" });

const iconMap = {
  projects: FolderDot,
  views: Eye,
  likes: Heart,
  engagements: TrendingUp,
};

export default async function CardWrapper() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card title="Projects" value={10} type="projects" />
      <Card title="Views" value={100} type="views" />
      <Card title="Likes" value={1000} type="likes" />
      <Card title="Engagements" value={10000} type="engagements" />
    </div>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "projects" | "views" | "likes" | "engagements";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
         rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
