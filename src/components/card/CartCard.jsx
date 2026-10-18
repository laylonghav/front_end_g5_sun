import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { useDispatch } from "react-redux";
import { clear, decreaseCart, increaseCart } from "@/store/CartSlice";

export default function CartCard({ data }) {
  const dispatch = useDispatch();

  return (
    <div>
      <Card>
        <CardContent className={"flex flex-row gap-1"}>
          <img
            className=" h-20 w-20 rounded-md"
            src={data?.imageurl}
            alt="pic product"
          />
          <div className="flex-1 flex flex-col gap-2 ">
            <div className="font-bold text-md ">{data?.name} </div>
            <div className="flex flex-row gap-1">
              <div className="font-medium">{data?.brand?.name}</div> |
              <div className="font-medium">{data?.category?.name}</div>|
              <div className="font-medium">
                {data?.status ? (
                  <Badge variant="outline">Instock</Badge>
                ) : (
                  <Badge variant="destructive">Outstock</Badge>
                )}
              </div>
            </div>
            <div className="flex flex-row gap-1">
              <div className="">
                Qty: <Badge>{data?.qty}</Badge>
              </div>
              |
              <div className="">${Number(data?.qty) * Number(data?.price)}</div>
              <button
                className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full transition-all duration-300"
                onClick={() => {
                  dispatch(increaseCart(data));
                  // alert("hi");
                }}
              >
                <Plus />
              </button>
              <button
                className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full transition-all duration-300"
                onClick={() => {
                  dispatch(decreaseCart(data));
                  // alert("Hello");
                }}
              >
                <Minus />
              </button>
            </div>
          </div>
          <div className="">
            <button
              className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full transition-all duration-300"
              onClick={() => {
                dispatch(clear(data));
                // alert("Hello");
              }}
            >
              <X />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
