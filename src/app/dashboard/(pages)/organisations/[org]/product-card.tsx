import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Database } from "@/types/database.types";
import { DollarSign, Settings } from "lucide-react";
import React from "react";

type ProductCardProps = Database["public"]["Tables"]["products"]["Row"];

type ProductPriceType = {
  name: string;
  price: string;
  price_type: string;
  validity_months: string;
};

function ProductCard({ props }: { props: ProductCardProps }) {
  // const priceData = props.price as ProductPriceType;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {props.name}{" "}
          <Badge className="float-end bg-emerald-400 animate-bounce">
            live
          </Badge>
        </CardTitle>
        <p className="line-clamp-2">{props.description}</p>
      </CardHeader>
      <CardContent>{/* <p>Price: ${props.price}</p> */}</CardContent>
      <CardFooter className=" space-x-2">
        <Button variant={"outline"} className="group">
          <Settings className="group-hover:animate-spin " />
          Config
        </Button>
        <Button variant={"outline"}>
          <DollarSign />
          Billings
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
