
import React  from 'react';
import { Button,TextField } from "@mui/material";
import { useHistory } from 'react-router-dom';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Base from '../BASE/base';




// schema validations
export const studentvalidation = yup.object({
    name: yup.string().required("Please fill in your name..."),
    batch: yup.string().required("please fill in your batch")
    .min(5,"You need minimum five values"),
    gender : yup.string().required("please mention your gender"),
    subject : yup.string().required("please mention your subject"),
    standard : yup.number().required("why not tell your standard")
})

const AddStudents = ({studentsData,setStudentsData}) => {

    const {values,handleChange,handleSubmit,handleBlur,errors,touched} = useFormik({
          

        initialValues : {
            name:"",
            batch:"",
            gender:"",
            subject:"",
            standard:""
        },

        validationSchema : studentvalidation ,
        onSubmit : (newStudent)=>{
            addNewStudent(newStudent)
            console.log(newStudent)
        }
    })

    const history =useHistory();


    const addNewStudent = async(newStudent) => {

        try {
     
            const response = await fetch("https://center-backend.onrender.com/students/addstudent",{
                method:"POST",
                body:JSON.stringify(newStudent),
                headers : {
                    "Content-Type" : "application/json"
                }
            });

            const data = await response.json();
            console.log(data)
            setStudentsData([...studentsData,data])
    
            history.push("/students-list")
            // console.log(data)


        } catch (error) {
            console.log("Error Occure :" , error)
        }
    }
     

    return(
        <Base
        title="Add Student"
        >
        
         <form onSubmit={handleSubmit} className='inputfield'>

          

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
           color='success'
           variant="contained"
           type='submit'
           >

            Add Student
           </Button>



         </form>
         
        </Base>
    )
}

export default AddStudents;