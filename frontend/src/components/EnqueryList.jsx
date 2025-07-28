import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import React, { useEffect, useState } from 'react';
import { ToastContainer ,  toast } from "react-toastify";



function EnqueryList({data,getAllEnquery,Swal,setFormData}) {   
    
const deleteRow = (deleteid) => {
  
  Swal.fire({
  title: "Are you Really want to Delete!?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
   axios.get(`/api/enquery/delete/${deleteid}`)
   getAllEnquery();
   toast.success("Enquery Deleted Successfully")
  }
});
}

const getRow = (enid) => {
axios.get(`/api/enquery/single/${enid}`)
.then((res) => {
   return res.data
})
.then((data) => {
   setFormData(data.enquery)
})
}  

  return (
    <div className="bg-gray-800 p-4">
    <ToastContainer/>
    <h2 className="text-[20px] font-bold text-amber-50">Enquery List</h2>
        <div className="overflow-x-auto">
            <Table>
                <TableHead>
                   <TableRow>
                    <TableHeadCell>S no.</TableHeadCell>
                    <TableHeadCell>Name</TableHeadCell>
                    <TableHeadCell>Email</TableHeadCell>
                    <TableHeadCell>Phone</TableHeadCell>
                    <TableHeadCell>Message</TableHeadCell>
                    <TableHeadCell>
                        <span className="">Edit</span>
                    </TableHeadCell>
                    <TableHeadCell>
                        <span className="">Delete</span>
                    </TableHeadCell>
                   </TableRow>
                </TableHead>
                <TableBody className="divide-y ">
                    {
                        data.length >=1 ?
                        data.map((item,index)=>{
                            return (
                                <TableRow key={index} className="bg-white dark:border-gray-600 dark:bg-gray-800">
                                        <TableCell>{index+1}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.phone}</TableCell>
                                        <TableCell>{item.message}</TableCell>
                                        <TableCell>
                                            <button onClick={()=>{getRow(item._id)}}  className="bg-blue-500 text-white px-4 py-1 rounded-md">Edit</button>
                                        </TableCell>
                                        <TableCell>
                                            <button onClick={()=>{deleteRow(item._id)}} className="bg-red-500 text-white px-4 py-1 rounded-md">Delete</button>
                                           
                                        </TableCell>
                                </TableRow>
                            )
                        })
                        :
                        <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <TableCell colSpan={7} className="text-center">No Data Found</TableCell>
                        </TableRow>
                    } 
                </TableBody>
            </Table>
        </div>
    </div>
  )
}

export default EnqueryList