import { Button, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2/dist/sweetalert2.js";
import axios from "axios";
import EnqueryList from "./EnqueryList";
import { useEffect, useState } from "react";


function Enquery() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    _id: "",
  });

  const [enqueryList, setEnqueryList] = useState([]);

  const getValue = (e) => {
    let inputName = e.target.name; //email
    let inputValue = e.target.value; // data inserted in email
    let oldData = { ...formData };
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  const saveEnquery = async (e) => {
    e.preventDefault();

    if (formData._id !== "") {
      axios.put(`/api/enquery/update/${formData._id}`, formData).then((res) => {
        let resData = res.data;
        if (resData.status == 1) {
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
          toast.success("Enquery Updated  Successfully");
        } else {
          toast.success(resData.message);
        }
      });
    } else {
      await axios.post("/api/enquery/insert", formData).then((res) => {
        let resData = res.data;
        if (resData.status == 1) {
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
            _id: "",
          });
          toast.success("Enquery Saved  Successfully");
        } else {
          toast.success("Failed to Save Enquery");
        }
      });
    }
    getAllEnquery();
  };

  const getAllEnquery = async (e) => {
    await axios
      .get("api/enquery/list")
      .then((res) => {
        return res.data;
      })
      .then((finalData) => {
        setEnqueryList(finalData.list);
      });
  };

  useEffect(() => {
    getAllEnquery();
  }, [formData]);

  return (
    <div className="bg-slate-300">
      <ToastContainer />
      <h1 className="text-[40px] text-center py-6 font-bold">User Enquery</h1>
      <div className="grid grid-cols-[30%_auto] gap-2">
        <div className="bg-gray-800 p-4">
          <h2 className="text-[20px] font-bold text-amber-50">Enquery Form</h2>
          <form action="" className="" onSubmit={saveEnquery}>
            {formData.id}
            <div className="py-3">
              <Label htmlFor="name">Your name</Label>
              <TextInput
                type="text"
                name="name"
                onChange={getValue}
                value={formData.name}
                placeholder="Enter Your Name"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="email">Your email</Label>
              <TextInput
                type="email"
                name="email"
                onChange={getValue}
                value={formData.email}
                placeholder="Enter Your Email"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="phone">Your phone</Label>
              <TextInput
                type="text"
                name="phone"
                onChange={getValue}
                value={formData.phone}
                placeholder="Enter Your Phone"
                required
              />
            </div>
            <div className="py-3">
              <Label htmlFor="message">Your email</Label>
              <Textarea
                name="message"
                onChange={getValue}
                value={formData.message}
                placeholder="Leave a Message..."
                required
                rows={4}
              />
            </div>
            <div className="py-3">
              <Button className="w-[100%]" type="submit">
                {formData._id !== "" ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </div>

        <EnqueryList
          data={enqueryList}
          getAllEnquery={getAllEnquery}
          Swal={Swal}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}

export default Enquery;
