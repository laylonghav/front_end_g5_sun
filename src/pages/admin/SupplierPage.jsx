import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Download,
  Edit,
  Import,
  Plus,
  Search,
  SearchSlash,
  Trash,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utility/helper/formartDate";
import { request } from "@/utility/helper/request";
import {
  createData,
  deleteData,
  getData,
  ImportData,
  searchData,
  updateData,
} from "@/func/supplier";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
  pdf,
} from "@react-pdf/renderer";
import logo from "../../assets/logo/logo.png";

export default function SupplierPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenPDF, setIsOpenPDF] = useState(false);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    code: "",
    website: "",
    address: "",
    email: "",
  });

  // Query for search supplier
  const [query, setQuery] = useState("");

  // function fetching data
  const fetchingData = async () => {
    setLoading(true);
    const res = await getData();
    console.log("Res: ", res?.data);
    if (res) {
      setData(res?.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data: ", form);

    // return;

    if (isEdit) {
      const res = await updateData(form?.id, form);
      if (res) {
        console.log("Res updated supplier: ", res);
      }
      // reset isEdit
      setIsEdit(false);
    } else {
      const res = await createData(form);
      if (res) {
        console.log("Res created supplier: ", res);
      }
    }

    fetchingData();
    // close form
    setIsOpen(false);
    // clear form data
    setForm({
      id: "",
      name: "",
      code: "",
      website: "",
      address: "",
      email: "",
    });
  };

  const handleExelFile = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = async (event) => {
      const stringBuffer = event.target.result;
      const workSheet = XLSX.read(stringBuffer, { type: "binary" });
      const sheetName = workSheet.SheetNames[0];
      const sheet = workSheet.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      console.log("JSON data from sheet: ", json);
      const res = await ImportData({ supplier: json });
      if (res) {
        console.log("Res: ", res);
        // refresh data
        fetchingData();
      }
    };
    reader.readAsBinaryString(file);
  };

  // Render PDF
  // Style for PDF
  const styles = StyleSheet.create({
    page: { flexDirection: "column", backgroundColor: "#f9f9f9", padding: 20 },
    header: {
      fontSize: 16,
      marginBottom: 5,
      textAlign: "center",
      fontWeight: "bold",
    },
    subHeader: {
      fontSize: 12,
      textAlign: "center",
      color: "#777",
      marginBottom: 5,
    },
    table: {
      display: "flex",
      flexDirection: "column",
      borderWidth: 1,
      borderColor: "#ddd",
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
      padding: 5,
    },
    tableHeader: {
      fontWeight: "bold",
      fontSize: 10,
      flex: 1,
      textAlign: "center",
      backgroundColor: "#f2f2f2",
    },
    tableCell: {
      fontSize: 8,
      flex: 1,
      textAlign: "center",
      paddingVertical: 8,
    },
    logo: { width: 60, height: 60, alignSelf: "center" },
    footer: { marginTop: 20, fontSize: 10, textAlign: "center", color: "#777" },
  });

  const MyDocument = ({ data }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image style={styles.logo} src={logo} />
        <Text style={styles.header}>Computer Science PUHAV</Text>
        <Text style={styles.subHeader}>Supplier Report</Text>

        <View style={styles.table}>
          <View style={styles.tableRow}>
            {["No", "Name", "Address", "Email", "Website"].map((head, idx) => (
              <Text key={idx} style={styles.tableHeader}>
                {head}
              </Text>
            ))}
          </View>

          {data?.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{index + 1}</Text>
              <Text style={styles.tableCell}>{item.name}</Text>
              <Text style={styles.tableCell}>{item.address}</Text>
              <Text style={styles.tableCell}>{item.email}</Text>
              <Text style={styles.tableCell}>{item.website}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>Thank you for your business!</Text>
      </Page>
    </Document>
  );

  return (
    <div className="">
      <div className="flex justify-between">
        <div className="flex flex-row gap-2 items-center">
          <h1>Supplier </h1>
          <div className="">
            <Input
              value={query}
              placeholder="Search supplier"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button
            onClick={async () => {
              setLoading(true);
              const res = await searchData(query);
              if (res) {
                console.log("Res search supplier: ", res);
                setData(res?.data);
                setLoading(false);
              }
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
          <Button
            onClick={() => {
              const ws = XLSX.utils.json_to_sheet(data); // convert data to sheet
              const wb = XLSX.utils.book_new(); // create new workbook
              XLSX.utils.book_append_sheet(wb, ws, "Supplier List");
              const excelBuffer = XLSX.write(wb, {
                bookType: "xlsx",
                type: "array",
              });
              saveAs(new Blob([excelBuffer]), "SupplierList.xlsx");
            }}
          >
            <Download />
          </Button>
          <Label className={"border-2 rounded-md px-3 py-1"}>
            <Import />
            <div className="">Import Excel</div>
            <Input type="file" onChange={handleExelFile} className={"hidden"} />
          </Label>
          <Button
            onClick={() => {
              setIsOpenPDF(true);
            }}
          >
            View PDF
          </Button>
          <Button
            onClick={async () => {
              try {
                const blob = await pdf(<MyDocument data={data} />).toBlob();
                saveAs(blob, "SupplierList.pdf");
              } catch (error) {
                console.log("Error: ", error);
              }
            }}
          >
            Download PDF
          </Button>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button>
              Create <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className={"sm:max-w-md"}>
            <DialogHeader>{isEdit ? "Update" : "Create"} Supplier</DialogHeader>
            {/* <DialogDescription>For create supplier</DialogDescription> */}
            <form action="" onSubmit={onSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label>Name</Label>
                <Input
                  value={form?.name}
                  placeholder="Name"
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                  }}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Email</Label>
                <Input
                  value={form?.email}
                  placeholder="Email"
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Code</Label>
                <Input
                  value={form?.code}
                  placeholder="Code"
                  onChange={(e) => {
                    setForm({ ...form, code: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Website</Label>
                <Input
                  value={form?.website}
                  placeholder="Website"
                  onChange={(e) => {
                    setForm({ ...form, website: e.target.value });
                  }}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>Address</Label>
                <Textarea
                  value={form?.address}
                  placeholder="Address"
                  onChange={(e) => {
                    setForm({ ...form, address: e.target.value });
                  }}
                />
              </div>
              <DialogFooter className={""}>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    // Close Dailog form
                    setIsOpen(false);
                    // clear form data
                    setForm({
                      id: "",
                      name: "",
                      code: "",
                      website: "",
                      address: "",
                      email: "",
                    });
                    // reset idEdit
                    setIsEdit(false);
                  }}
                >
                  Cancel
                </Button>
                <Button variant="" type="submit">
                  {isEdit ? "Update" : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isOpenPDF} onOpenChange={setIsOpenPDF}>
        <DialogContent className={"min-w-5xl h-[90vh] z-150"}>
          <DialogHeader>View PDF</DialogHeader>
          <div className="h-[80vh] border rounded-md overflow-hidden">
            {isOpenPDF && (
              <PDFViewer width="100%" height="100%">
                <MyDocument data={data} />
              </PDFViewer>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-5">
        <Table>
          <TableCaption>A list of supplier</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Code</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Create at</TableHead>
              <TableHead>Update at</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow className="">
                <TableCell colspan={10}>
                  <div className="flex justify-center mt-5">
                    <Spinner className={"size-5"} />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {Array.isArray(data) &&
                  data.length > 0 &&
                  data.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item?.name}</TableCell>
                      <TableCell>{item?.email}</TableCell>
                      <TableCell>{item?.code}</TableCell>
                      <TableCell>{item?.website}</TableCell>
                      <TableCell>{item?.address}</TableCell>
                      <TableCell>{formatDate(item?.created_at)}</TableCell>
                      <TableCell>{formatDate(item?.updated_at)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => {
                              console.log("Item edit: ", item);
                              // Open form
                              setIsOpen(true);
                              // set data into form data
                              setForm(item);

                              // set is edit
                              setIsEdit(true);
                            }}
                          >
                            <Edit />
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger>
                              <Button variant="destructive">
                                <Trash />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure to delete this cetegory?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your account from our
                                  servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={async () => {
                                    console.log("item delete: ", item);
                                    const res = await deleteData(item?.id);
                                    if (res) {
                                      console.log("Res delete supplier: ", res);
                                      fetchingData();
                                    }
                                  }}
                                >
                                  OK
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
