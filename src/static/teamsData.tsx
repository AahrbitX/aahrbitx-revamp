import { Atom, LucideProps, Users } from "lucide-react";

export type Team = {
    id: string;
    name:string;
    logo: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    description : string;
}

export const teamsData: Team[] = [
    {
        id: "01",
        name: "AahrbitX°",
        logo: Atom,
        description:"Main team"
    },
    {
        id: "02",
        name : "OpenMinds Community",
        logo: Users,
        description: "Community team of AahrbitX°",
    }
]