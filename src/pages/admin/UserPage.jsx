import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Plus, Trash, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, updateUser } from "@/store/usersSlice";

export default function UserPage() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    id: "",
    name: "",
    username: "",
    password: "",
    status: true,
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [query, setQuery] = useState("");

  //   const users = [
  //     {
  //       name: "John",
  //       age: 30,
  //       major: "IT",
  //       gender: "Male",
  //     },
  //     {
  //       name: "Jen",
  //       age: 20,
  //       major: "Web development",
  //       gender: "Male",
  //     },
  //     {
  //       name: "Heng",
  //       age: 18,
  //       major: "Mobile development",
  //       gender: "Male",
  //     },
  //   ];

  const onSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      // for update data
      // const dataUpdate = data.map((item) =>
      //   item?.id === form?.id ? form : item,
      // );
      // setData(dataUpdate);
      dispatch(updateUser({ id: form?.id, data: form }));
      // reset edit
      setIsEdit(false);
    } else {
      // for create new data
      // setData([...data, { ...form, id: Date.now() }]);
      dispatch(addUser({ ...form, id: Date.now() }));
    }
    console.log("Form Data: ", form);

    // Close Dialog
    setIsOpen(false);
    // Clear form data
    setForm({
      id: "",
      name: "",
      username: "",
      password: "",
      status: true,
    });
  };

  const filterData = users.filter((item) =>
    item?.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="p-5">
      <div className="mb-5 flex justify-between">
        <div className="flex items-center gap-3">
          <div className="font-medium">User</div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search user"
          />
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            <Button>
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create user</DialogTitle>
              <DialogDescription>For create user</DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  placeholder="name"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Username</Label>
                <Input
                  value={form.username}
                  placeholder="Usename"
                  onChange={(e) =>
                    setForm({ ...form, username: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Password</Label>
                <Input
                  value={form.password}
                  placeholder="Password"
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Status</Label>
                <Select
                  value={String(form.status)}
                  onValueChange={(value) => {
                    setForm({ ...form, status: value === "true" });
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  onClick={() => {
                    // Close Dialog form
                    setIsOpen(false);
                    // Clear form data
                    setForm({
                      id: "",
                      name: "",
                      username: "",
                      password: "",
                      active: true,
                    });

                    //reset edit
                    setIsEdit(false);
                  }}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Username </TableHead>
            <TableHead>Password </TableHead>
            <TableHead>Status </TableHead>
            <TableHead>Action </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterData.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item?.name}</TableCell>
              <TableCell>{item?.username}</TableCell>
              <TableCell>{item?.password}</TableCell>
              <TableCell>{item?.status ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      alert(`Item delete: ${item?.name}`);
                      console.log("Item delete: ", item);
                      // const filter = data.filter((i) => i?.id !== item?.id);
                      // // Set new data
                      // setData(filter);
                      dispatch(deleteUser(item?.id));
                    }}
                    variant="destructive"
                    className={"hover:cursor-pointer"}
                  >
                    <Trash2 />
                  </Button>
                  <Button
                    onClick={() => {
                      // alert(`Item Edit: ${item?.name}`);
                      console.log("Item edit: ", item);
                      // Open dialog
                      setIsOpen(true);
                      // set form data for update
                      setForm(item);

                      // for edit
                      setIsEdit(true);
                    }}
                    variant="outline"
                    className={"hover:cursor-pointer"}
                  >
                    <Edit />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
