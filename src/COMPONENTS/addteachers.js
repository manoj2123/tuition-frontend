import React  from 'react';
import { Button,TextField } from "@mui/material";
import { useHistory } from 'react-router-dom';
import Base from '../BASE/base';
import * as yup from 'yup';
import { useFormik } from 'formik';

export const teachervalidation = yup.object({
    name:yup.string().required("Please fill in your name..."),
    batch:yup.string().required("please fill in your batch")
    .min(5,"You need minimum five values"),
    gender:yup.string().required("please mention your gender"),
    subject : yup.string().required("please mention your subject"),
    experience:yup.number().required("why not tell your experience")
})

const AddTeachers = ({teachersData,setTeachersData}) => {

    const history =useHistory();

   const {values,handleChange,handleSubmit,handleBlur,errors,touched} = useFormik({
          

        initialValues : {
            name:"",
            batch:"",
            gender:"",
            subject:"",
            experience:""
        },

        validationSchema : teachervalidation ,
        onSubmit : (newteacher)=>{
            addNewTeacher(newteacher)
        }
    })

        const addNewTeacher = async(newteacher) => {

            try {
         
                const response = await fetch("https://center-backend.onrender.com/teachers/addteacher",{
                    method:"POST",
                    body:JSON.stringify(newteacher),
                    headers : {
                        "Content-Type" : "application/json"
                    }
                });
    
                const data = await response.json();
    
                setTeachersData([...teachersData,data])
                history.push("/teachers-list")
                console.log(data)
    
    
            } catch (error) {
                console.log("Error Occure" , error)
            }
        }
     

    return(
        <Base
        title="Add Teacher"
        >
         <form onSubmit={handleSubmit} className='inputfield'>

          <TextField 
           fullWidth label="Enter Name"
           onBlur={handleBlur}
           onChange={handleChange}
           value={values.name}
           name="name"
           id="fullWidth"
           />
        {touched.name&&errors.name? <p style={{color:"red"}}> {errors.name} </p> :""} 
           
          <TextField 
           fullWidth label="Enter Batches"
           onBlur={handleBlur}
           onChange={handleChange}
           value={values.batch}
           name="batch"
           id="fullWidth"
           />
            {touched.batch && errors.batch ? <p style={{color:"red"}}> {errors.batch} </p> : ""}

           <TextField 
           fullWidth label="Enter Gender"
           onBlur={handleBlur}
           onChange={handleChange}
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
           onBlur={handleBlur}
           onChange={handleChange}
           value={values.experience}
           name="experience"
           id="fullWidth"
           />
            {touched.experience && errors.experience ? <p style={{color:"red"}}> {errors.experience} </p> : ""}
           <Button
           
           className='addbtn'
           color='success'
           variant="contained"
           type='submit'
        
           >

            Add Teacher
           </Button>



         </form>
        </Base>
    )
}

export default AddTeachers;