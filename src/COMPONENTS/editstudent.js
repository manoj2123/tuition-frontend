
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Base from "../BASE/base";
import { studentvalidation } from "./addstudent";


export const EditStudents = ({studentsData,setStudentsData}) => {
  const history = useHistory();
  const {id} = useParams();
  const student = studentsData[id];
  const [idx,setIdx] = useState("")

  useEffect(()=>{
    setIdx(student._id)
  },[student._id])

  const {values,handleChange,handleSubmit,handleBlur,errors,touched} = useFormik({
          

    initialValues : {
        name:student.name,
        batch:student.batch,
        gender:student.gender,
        subject:student.subject,
        standard:student.standard
    },

    validationSchema : studentvalidation ,
    onSubmit : (editedstudent)=>{
      updateStudent(editedstudent)
    }
})

const updateStudent = async(editedstudent) => {

   try {
            

     const response = await fetch (`https://center-backend.onrender.com/students/${idx}`,{
       method : "PUT",
       body : JSON.stringify(editedstudent),
       headers : {
        "Content-Type":"application/json"
       }

     });
     const data = await response.json();

     if(data){

      const editedData = studentsData.findIndex((stud) => stud._id === idx);
      studentsData[editedData] = editedstudent;
      setStudentsData([...studentsData])
      history.push("/students-list")

     }

   
    
   } catch (error) {
    
    console.log("Error Ocured" , error)

   }
}



    return(
        <Base
        title="Edit Your Profie"
        >
         <form onSubmit={handleSubmit} className="editStudent">
           

         <TextField 
           fullWidth label="Enter Name"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.name}
           name="name"
           id="fullWidth"
           />

          {touched.name && errors.name ? <p style={{color:"red"}}> {errors.name} </p> : ""} 
          <TextField 
           fullWidth label="Enter Batch"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.batch}
           name="batch"
           id="fullWidth"
           />
            {touched.batch && errors.batch ? <p style={{color:"red"}}> {errors.batch} </p> : ""}
           <TextField 
           fullWidth label="Enter Gender"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.gender}
           name="gender"
           id="fullWidth"
           />
            {touched.gender && errors.gender ? <p style={{color:"red"}}> {errors.gender} </p> : ""}
            <TextField 
           fullWidth label="Enter subject"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.subject}
           name="subject"
           id="fullWidth"
           />
           {touched.subject && errors.subject ? <p style={{color:"red"}}> {errors.subject} </p> : ""}
           <TextField 
           fullWidth label="Enter standard"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.standard}
           name="standard"
           id="fullWidth"
           />
        {touched.standard && errors.standard ? <p style={{color:"red"}}> {errors.standard} </p> : ""}
           <Button
           className='addbtn'
           color='secondary'
           variant="contained"
           type='submit'
           >

            Update Student
           </Button>



         </form>
        </Base>
    )
}