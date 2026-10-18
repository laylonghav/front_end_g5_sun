import { forwardRef } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Image } from "lucide-react";
import { Badge } from "../ui/badge";
const htbl = [
  "No",
  "Name",
  "Price",
  "Quantity",
  "Discount",
  "Category",
  "Brand",
  "Image",
];
const InvoiceCard = forwardRef((props, ref) => {
  const cart = useSelector((state) => state.cart);
  return (
    <div
      ref={ref}
      style={{
        width: "183mm",
        minHeight: "250mm",
        padding: "5mm",
        margin: "0 auto",
        background: "#ffffff",
        color: "#000000",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        boxSizing: "border-box",
        textAlign: "left",
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      <Table>
        <TableCaption>A list of your product.</TableCaption>
        <TableHeader>
          <TableRow>
            {htbl.map((head, index) => (
              <TableHead key={index}>{head}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(cart) &&
            cart.map((item, index) => (
              <TableRow index={index}>
                <TableCell className="=">{index + 1}</TableCell>
                <TableCell className="font-medium">{item?.name}</TableCell>
                {/* <TableCell className="font-medium">
                  {item?.description}
                </TableCell> */}
                <TableCell className="font-medium">${item?.price}</TableCell>
                <TableCell className="font-medium">{item?.qty}</TableCell>
                <TableCell className="font-medium">
                  <Badge variant="destructive">{item?.discount}%</Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {item?.category?.name ? item?.category?.name : "No category"}
                </TableCell>
                <TableCell className="font-medium">
                  {item?.brand?.name ? item?.brand?.name : "No brand"}
                </TableCell>

                <TableCell className="font-medium">
                  {/* {item?.image ? item?.image : "No url image"} */}
                  {item?.image ? (
                    <div className="w-20 h-20">
                      <img
                        className="w-full h-full p-1 bg-gray-300 rounded-md"
                        src={item?.image_url}
                        alt="pic product"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20">
                      <div className="w-full h-full p-1 bg-gray-300 rounded-md flex gap-1 flex-col items-center justify-center">
                        <Image className="text-muted-foreground size-8" />
                        <p className="text-muted-foreground">No image</p>
                      </div>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
});

export default InvoiceCard;
