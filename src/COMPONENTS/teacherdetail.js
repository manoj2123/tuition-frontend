
import { Button,Card,CardActions,CardContent,Typography } from "@mui/material";
import React from 'react';
import { useHistory } from "react-router-dom";
import Base from "../BASE/base";


export const TeacherDetails = ({teachersData,setTeachersData}) => {

    const history = useHistory();
    console.log(teachersData)

    const deleteteachersData = async(teacherId)=>{
        try {
            
          const response = await fetch(`https://center-backend.onrender.com/teachers/${teacherId}`,{
            method:"DELETE"
          });

          const data = response.json();
          
          const selectteacher = teachersData.filter((teacher)=>teacher._id !== teacherId);
        setTeachersData(selectteacher);
        console.log(teachersData)
        } catch (error) {
            console.log("Error Occured",error)
        }
    }

    return(

        <Base
        title="Teachers Details"
        >
             <div className="carddiv">
                    {teachersData.map((teacher,idx)=>{

                        return(

                            <Card  style={{backgroundColor:"rgb(246, 251, 255)" , width:"calc(250px + 8vw)" , cursor:"context-menu"}} key={idx}>
                                <CardContent>
                                    <Typography>
                                    {idx+1}<span style={{fontWeight:"bold"}}>.</span> Name:{teacher.name}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button onClick={()=>history.push(`/teacher/${idx}`)} >
                                        VIEW TEACHER
                                    </Button>
                                    
                                    <Button onClick={()=>deleteteachersData(teacher._id)} color="error">
                                        DELETE
                                    </Button>
                                </CardActions>


                            </Card>
                        )
                    })}
                
            </div>
        
        
        </Base>
    )
}

























