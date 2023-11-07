
import { Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Base from "../BASE/base";
import { teachervalidation } from "./addteachers";


export const EditTeacher = ({teachersData,setTeachersData}) => {
  const history = useHistory();
  const {id} = useParams();
  const teacher = teachersData[id];
  const [idx,setIdx] =useState("")

  useEffect(()=>{
    setIdx(teacher._id)
  },[teacher._id])

  const {values,handleChange,handleSubmit,handleBlur,errors,touched} = useFormik({
          

    initialValues : {
      name:teacher.name,
      batch:teacher.batch,
      gender:teacher.gender,
      subject:teacher.subject,
      experience:teacher.experience
    },

    validationSchema : teachervalidation ,
    onSubmit : (editedTeacher)=>{
      updateteacher(editedTeacher)
    }
})

const updateteacher = async(editedTeacher) => {

  try {

    const response = await fetch (`https://center-backend.onrender.com/teacher/${idx}`,{
      method : "PUT",
      body : JSON.stringify(editedTeacher),
      headers : {
       "Content-Type":"application/json"
      }

    });
    const data = await response.json();

    if(data){

      const editedteacherindex = teachersData.findIndex((teacher)=> teacher._id === idx)
     teachersData[editedteacherindex] = editedTeacher;
     setTeachersData([...teachersData])
       history.push("/teachers-list")

    }

  
   
  } catch (error) {
   
   console.log("Error Ocured" , error)

  }
}


    return(
        <Base
        title="Edit Your Profie"
        >
         <form onSubmit={handleSubmit} className="editteacher">
            
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
           fullWidth label="Enter experience"
           onChange={handleChange}
           onBlur={handleBlur}
           value={values.experience}
           name="experience"
           id="fullWidth"
           />
        {touched.experience && errors.experience ? <p style={{color:"red"}}> {errors.experience} </p> : ""}
            <Button 
              color="secondary"
              variant="contained"
              type="submit"
            >
                Update Data
            </Button>
         </form>
        </Base>
    )
}