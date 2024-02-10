import {useState} from "react";
import { Box, TextField, Button} from '@mui/material';
import "../Styles/Login.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Login = ({setAuthStatus}) => {
    //
    const Navigate = useNavigate();

    //toggle between signup and login page
    const[Registered,setRegistered]=useState(true);

    function toggleRegistered(){
        setRegistered(!Registered);
    }
    // state for signup page
    const[signUp,setSignUp]=useState({username:"" , password:""});

    function handleSignUpChange(e){
        const name=e.target.name;
        const value=e.target.value;
        setSignUp((prevValue)=>{
            return(
                {...prevValue,[name]:value}
            )
        })
    }

    //sending data to server for singup

    async function signUpUser(){
        try{
            let response = await axios.post(`https://google-keep-kappa-gray.vercel.app/singnUp`,signUp)
            if(response.status===200){
                console.log('signup Successful')
                toggleRegistered();
            }
        }
        catch(error){
            console.log('error during signup',error);
        }
        
    }

    //state for login details
    const[login,setLogin]=useState({username:"",password:""})

    function handleLoginChange(e){
        const name=e.target.name;
        const value=e.target.value;
        setLogin((prevValue)=>{
            return(
                {...prevValue,[name]:value}
            )
        })
    }
    //sending data to server for login

    async function loginUser(){
        try{
            let response = await axios.post(`https://google-keep-kappa-gray.vercel.app/login`,login)

            if(response.status===200){
                console.log('Login Success');
                setAuthStatus(true);
                Navigate(`/home/${login.username}`);
            }
            else if(response.status===501){
                toggleRegistered();
            }
        }
        catch(error){
            console.log("Error during login",error)
        }
    }

    return (
    <Box>
    {Registered ? 
        (<Box className="box">
            <TextField className= "text-field" variant="standard" label="Username" name="username" value={login.username} onChange={(e)=>{handleLoginChange(e)}}/>
            <TextField className= "text-field" variant="standard" label="Password" name="password" value={login.password} onChange={(e)=>{handleLoginChange(e)}}/>
            <Button className="login-button" variant="contained" onClick={loginUser}>Login</Button>
            <p>OR</p>
            <Button className="signup-button" onClick={()=>{toggleRegistered()}}>Create an account</Button>
        </Box>):
                
        (<Box className="box">
            <TextField className= "text-field" variant="standard" name ="username" label="Username" value={signUp.username} onChange={(e)=>{handleSignUpChange(e)}} />
            <TextField className= "text-field" variant="standard" name ="password" label="Password" value={signUp.password} onChange={(e)=>{handleSignUpChange(e)}} />
            {true&&<p></p>}
            <Button className="signup-button" onClick={signUpUser}>SignUp</Button>
            <p>OR</p>
            <Button className="login-button" variant="contained" onClick={()=>{toggleRegistered()}}>Already Have An Account</Button>
         </Box>)
         }

    </Box>
    )
}


export default Login;