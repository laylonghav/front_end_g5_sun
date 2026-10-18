import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import InvoiceCard from "./InvoiceCard";
import { createData } from "@/func/order";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { clearAll } from "@/store/CartSlice";
import { setRefresh } from "@/store/refreshSlice";
export default function CheckoutCard({ data }) {
  // For react to print
  const ref = useRef();

  const dispatch = useDispatch();
  // ("paid_amount", "total_amount", "remark", "paymemt_method");
  const [form, setForm] = useState({
    paid_amount: "",
    total_amount: "",
    remark: "",
    paymemt_method: "",
  });

  const totalItem = data.reduce((acc, item) => acc + item?.qty, 0);
  const totalOrigenal = data.reduce(
    (acc, item) => acc + Number(item?.qty) * Number(item?.price),
    0,
  );

  const totalDiscount = data.reduce(
    (acc, item) =>
      acc +
      ((Number(item?.discount) * Number(item?.price)) / 100) *
        Number(item?.qty),
    0,
  );

  const items = [
    { label: "ABA", value: "ABA" },
    { label: "Ac", value: "ac" },
    { label: "Wing", value: "system" },
  ];

  const onPrint = useReactToPrint({
    contentRef: ref,
  });

  // console.log("Cart: ", data);

  const handleCheckout = async () => {
    // ["order_no", "paid_amount", "total_amount", "remark", "paymemt_method"]; // Order
    //  ["price", "qty", "discount", "total", "order_id", "product_id"]; // OrderDetail
    const payload = {
      paid_amount: form?.paid_amount,
      total_amount: form?.paid_amount,
      remark: form?.remark,
      paymemt_method: form?.paymemt_method,
      detail: data.map((item) => ({
        price: item?.price,
        qty: item?.qty,
        discount: item?.discount,
        total:
          item?.price * item?.qty -
          ((item?.price * item?.discount) / 100) * item?.qty,
        product_id: item?.id,
      })),
    };

    try {
      const res = await createData(payload);
      if (res) {
        console.log("Res: ", res);
        toast.success("created success");
        //reset form
        setForm({
          paid_amount: "",
          total_amount: "",
          remark: "",
          paymemt_method: "",
        });

        // set refresh
        dispatch(setRefresh(true));
        // clear all cart
        dispatch(clearAll());
      }
    } catch (error) {
      console.log("Error: ", error);
      toast.error("Error");
    }

    console.log("Payload: ", payload);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between border-b">
        <div className="">Items: </div>
        <div className="">{totalItem}</div>
      </div>
      <div className="flex flex-row justify-between border-b">
        <div className="">Total Oreginal: </div>
        <div className="">${totalOrigenal.toFixed(2)}</div>
      </div>
      <div className="flex flex-row justify-between border-b">
        <div className="">Total Discount: </div>
        <div className="">${totalDiscount.toFixed(2)}</div>
      </div>
      <div className="flex flex-row justify-between border-b">
        <div className="">Total: </div>
        <div className="">${(totalOrigenal - totalDiscount).toFixed(2)}</div>
      </div>
      <div className="flex flex-row justify-between border-b gap-1 pb-1">
        <Input
          value={form.paid_amount}
          placeholder="Amount payment"
          onChange={(e) => setForm({ ...form, paid_amount: e.target.value })}
        />
        <Select
          items={items}
          value={form?.paymemt_method}
          onValueChange={(value) => setForm({ ...form, paymemt_method: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Textarea
        value={form.remark}
        placeholder="remark"
        onChange={(e) => setForm({ ...form, remark: e.target.value })}
      />

      <div className="flex flex-row gap-1 justify-end">
        <Button variant="outline" onClick={onPrint}>
          Print
        </Button>
        <Button onClick={handleCheckout}>Check out</Button>
      </div>
      <div className="hidden">
        <InvoiceCard ref={ref} />
      </div>
    </div>
  );
}
