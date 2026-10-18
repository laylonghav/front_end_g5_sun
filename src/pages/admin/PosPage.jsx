import CartCard from "@/components/card/CartCard";
import CheckoutCard from "@/components/card/CheckoutCard";
import PosCard from "@/components/card/PosCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getData } from "@/func/product";
import { addToCart, clearAll } from "@/store/CartSlice";
import { setRefresh } from "@/store/refreshSlice";
import { Search, SearchSlash, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PosPage() {
  const [data, setData] = useState([]);
  const [loadind, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const refresh = useSelector((state) => state.refresh);

  //   Fetching data
  const fetchingData = async () => {
    setLoading(true);
    const res = await getData();
    if (res) {
      console.log("Res product: ", res);
      setData(res?.data);
      setLoading(false);
    }
  };

  const total = cart.reduce((acc, item) => acc + item?.qty, 0);

  useEffect(() => {
    fetchingData();

    // Auto refresh data
    if (refresh) {
      fetchingData();
      dispatch(setRefresh(false));
    }
  }, [refresh, useSelector]);

  const addToCarted = (item) => {
    console.log("Item add to card: ", item);
    dispatch(addToCart(item));
    // alert(item?.name);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex flex-row gap-2 items-center">
          <h1>Product </h1>
          <div className="">
            <Input
              value={query}
              placeholder="Search category"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={async () => {
              //
            }}
          >
            <Search />
          </Button>
          <Button
            onClick={() => {
              fetchingData();
              // Clear text search
              setQuery("");
            }}
          >
            <SearchSlash />
          </Button>
        </div>

        <div className=""></div>
      </div>
      <div className="grid grid-cols-4 mt-5">
        <div className="col-span-3 grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.isArray(data) &&
            data?.map((item, index) => (
              <PosCard
                key={index}
                data={{ ...item, addToCart: () => addToCarted(item) }}
              />
            ))}
        </div>
        <div className="col-span-1 ml-2 pl-2 border-l-2">
          <div className="flex flex-row justify-between my-1">
            <div className="font-medium flex gap-1 ">
              <div className="">Total item: </div>
              <div className="">{total}</div>
            </div>

            <button
              className="p-1 bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-full transition-all duration-300"
              onClick={() => {
                dispatch(clearAll(data));
                // alert("hi");
              }}
            >
              <Trash />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {Array.isArray(cart) &&
              cart.map((item, index) => <CartCard key={index} data={item} />)}
          </div>

          <div className="my-2">
            <CheckoutCard data={cart} />
          </div>
        </div>
      </div>
    </div>
  );
}
