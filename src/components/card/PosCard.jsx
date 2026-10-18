import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function PosCard({ data }) {
  return (
    <div>
      <Card className={"transition-all duration-300 hover:scale-101"}>
        <img
          className="w-full h-87.5  bg-gray-300"
          src={data?.imageurl}
          alt="pic product"
        />
        <CardHeader>
          <CardTitle className={"flex gap-2"}>
            <div className="">{data?.name} </div>|
            <div className="font-medium">{data?.brand?.name}</div> |
            <div className="font-medium">{data?.category?.name}</div>|
            <div className="font-medium">
              {data?.status ? (
                <Badge variant="outline">Instock</Badge>
              ) : (
                <Badge variant="destructive">Outstock</Badge>
              )}
            </div>{" "}
          </CardTitle>
          <CardDescription className={"line-clamp-1"}>
            {data?.description}
          </CardDescription>
        </CardHeader>
        <CardContent className={""}>
          <div className="flex gap-1 ">
            <div>
              Price: <span className="font-bold">${data?.price}</span>
            </div>
            |
            <div className="">
              Quantity: <Badge>{data?.qty}</Badge>
            </div>
            |
            <div>
              Discount:{" "}
              <span className="text-green-600">{data?.discount}%</span>
            </div>
          </div>
          <div className="flex gap-1 "></div>
        </CardContent>
        <CardFooter className={"flex gap-3 justify-between"}>
          <Button variant="outline">Detail</Button>
          <Button
            className={
              "hover:cursor-pointer transition-all duration-300 hover:scale-105"
            }
            onClick={() => data.addToCart?.(data)}
          >
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
