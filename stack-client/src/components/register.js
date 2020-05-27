import React from 'react';
import '../App.css';
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn , ExtensionSharp } from "@material-ui/icons";

//define variables
const initialState = {
    fname: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    cpassword: "",
    fnameError: "",
    lnameError: "",
    phoneError: "",
    emailError: "",
    passwordError: "",
    cpasswordError: ""
}


class Register extends React.Component {
    
    state =initialState;

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        const isValid = this.validate();
        if(isValid){
            console.log(this.state);
            api.registerUser().fetchAll().then(res => {
                const user = res.data.filter( user => user.email===this.state.email);
                if(user.length>0){
                    ButterToast.raise({
                        content: <Cinnamon.Crisp title="Online Store"
                            content="This Email Already Exists!"
                            scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                            icon={<ExtensionSharp />}
                        />
                    });
                }else{
                    api.registerUser().create(this.state)
                    .then(res => {
                        ButterToast.raise({
                            content: <Cinnamon.Crisp title="Online Store"
                                content="Register successfully"
                                scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                                icon={<AssignmentTurnedIn />}
                            />
                        })
                        this.setState(initialState)
                        this.props.history.push('/login')
                    } );
                }
            });
        }
    }

    /*---------------validating the user details----------------*/
    validate = () => {
        let fnameError = "";
        let lnameError = "";
        let phoneError = "";
        let emailError = "";
        let passwordError = "";
        let cpasswordError = "";

        if(!this.state.fname){
            fnameError="First Name Cannot Be Blank"
        }

        if(!this.state.lname){
            lnameError="Last Name Cannot Be Blank"
        }

        if(!this.state.phone){
            phoneError="Phone Number Cannot Be Blank"
        }else if(this.state.phone.length!==10){
            phoneError = "Invalid Phone Number!";
        }else if(isNaN(this.state.phone)){
            phoneError = "Use only digits!";
        }

        if(!this.state.email){
            emailError="Email Cannot Be Blank"
        }else if(!this.state.email.includes('@')||!this.state.email.includes('.')){
            emailError = "Invalid Email!";
        }

        if(!this.state.password){
            passwordError="Password Cannot Be Blank"
        }

        if(!this.state.cpassword){
            cpasswordError="Confirm Password Cannot Be Blank"
        }else if(this.state.cpassword!==this.state.password){
            cpasswordError="Password & Confirm Password Not Equal!"
        }

        if(emailError || passwordError || fnameError || lnameError || phoneError || cpasswordError){
            this.setState({ emailError , passwordError , fnameError , lnameError , phoneError , cpasswordError});
            return false;
        }

        return true;
    }

    render (){
        return (
            <div class="container">
            <br></br><br></br>
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">Register</div>
                            <div class="card-body">
                                <form autoComplete="off" onSubmit={this.handleSubmit}>
                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">First Name</label>
                                        <div class="col-md-6">
                                            <input type="text" class="form-control" name="fname" value={this.state.fname} onChange={this.handleChange} />
                                            <div style={{color : "red"}}>{this.state.fnameError}</div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">Last Name</label>
                                        <div class="col-md-6">
                                            <input type="text" class="form-control" name="lname" value={this.state.lname} onChange={this.handleChange} />
                                            <div style={{color : "red"}}>{this.state.lnameError}</div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">Phone Number</label>
                                        <div class="col-md-6">
                                            <input type="text" class="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} />
                                            <div style={{color : "red"}}>{this.state.phoneError}</div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">Email</label>
                                        <div class="col-md-6">
                                            <input type="text" class="form-control" name="email" value={this.state.email} onChange={this.handleChange} />
                                            <div style={{color : "red"}}>{this.state.emailError}</div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">Password</label>
                                        <div class="col-md-6">
                                            <input type="password" class="form-control" name="password" value={this.state.password} onChange={this.handleChange} />
                                            <div style={{color : "red"}}>{this.state.passwordError}</div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                        <div class="col-md-6">
                                            <input type="password" class="form-control" name="cpassword" value={this.state.cpassword} onChange={this.handleChange} />
                                            <div style={{color : "red"}}>{this.state.cpasswordError}</div>
                                        </div>
                                    </div>
                                            
                                    <div class="col-md-4 offset-md-4">
                                        <button type="submit" class="btn btn-primary">
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default Register;
