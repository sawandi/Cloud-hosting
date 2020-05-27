import React from 'react';
import '../App.css';
import api from "../actions/api.js";
import ButterToast, { Cinnamon } from "butter-toast";
import { AssignmentTurnedIn } from "@material-ui/icons";

/* define variables for payment */
const initialState = {
    name: "",
    card: "",
    month: "",
    year: "",
    ccv: "",
    nameError: "",
    cardError: "",
    monthError: "",
    yearError: "",
    ccvError: ""
}


class Payment extends React.Component {
    
    state = initialState;

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    /* Handle Payment methods */
    handleSubmit = e => {
        e.preventDefault();
        const isValid = this.validate();
        if(isValid){
            console.log(this.state);
            api.myItem().update(localStorage.getItem('cartId'),{ type: 'order' , payment: 'paid' })
            .then(res =>{
                ButterToast.raise({
                    content: <Cinnamon.Crisp title="Online Store"
                        content="Payment Successful!"
                        scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                        icon={<AssignmentTurnedIn />}
                    />
                })
                window.location.href = '/order';
            })
        }
    }

    onCach(){
        api.myItem().update(localStorage.getItem('cartId'),{ type: 'order' , payment: 'Cash On Deliver' })
        .then(res =>{
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Online Store"
                    content="Order Successful!"
                    scheme={Cinnamon.Crisp.SCHEME_PURPLE}
                    icon={<AssignmentTurnedIn />}
                />
            })
            window.location.href = '/order';
        })
    }

    /* validate payment form  input fields */
    validate = () => {
        let nameError= "";
        let cardError= "";
        let monthError= "";
        let yearError= "";
        let ccvError= "";

        if(!this.state.name){
            nameError="Name Cannot Be Blank"
        }

        if(!this.state.card){
            cardError = "Card Number Cannot Be Blank";
        }else if(isNaN(this.state.card)){
            cardError = "Use only digits!";
        }else if(this.state.card.length!==16){
            cardError = "Invalid Card Number!";
        }

        if(!this.state.month){
            monthError="Select month"
        }

        if(!this.state.ccv){
            ccvError="CCV Code Cannot Be Blank"
        }else if(this.state.ccv.length!==3){
            ccvError = "Invalid Code!";
        }else if(isNaN(this.state.ccv)){
            ccvError = "Use only digits!";
        }

        if(!this.state.year){
            yearError="Select Year"
        }

        if( cardError || nameError || monthError || ccvError || yearError){
            this.setState({ cardError , nameError , monthError , ccvError , yearError });
            return false;
        }

        return true;
    }

    /* Payment form */

    render (){
        return (
            <div class="container">
            <br></br><br></br>
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-header">Payment</div>
                            <div class="card-body">
                                <form autoComplete="off" onSubmit={this.handleSubmit}>
                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">Name</label>
                                        <div class="col-md-6">
                                            <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.handleChange} />
                                            <div style={{color : "red"}}>{this.state.nameError}</div>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">Card Number</label>
                                        <div class="col-md-6">
                                            <input type="text" class="form-control" name="card" value={this.state.card} onChange={this.handleChange} />
                                            <div style={{color : "red"}}>{this.state.cardError}</div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">Year</label>
                                        <div class="col-md-6">
                                            <select class="form-control" name="year" value={this.state.year} onChange={this.handleChange}>
                                                <option value="">~select~</option>
                                                <option value="2020">2020</option>
                                                <option value="2021">2021</option>
                                                <option value="2022">2022</option>
                                                <option value="2023">2023</option>
                                                <option value="2024">2024</option>
                                                <option value="2025">20250</option>
                                            </select>
                                            <div style={{color : "red"}}>{this.state.yearError}</div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">Month</label>
                                        <div class="col-md-6">
                                            <select class="form-control" name="month" value={this.state.month} onChange={this.handleChange}>
                                                <option value="">~select~</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                            </select>
                                            <div style={{color : "red"}}>{this.state.monthError}</div>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label text-md-right">CCV Code</label>
                                        <div class="col-md-6">
                                            <input type="text" class="form-control" name="ccv" value={this.state.ccv} onChange={this.handleChange} />
                                            <div style={{color : "red"}}>{this.state.ccvError}</div>
                                        </div>
                                    </div>
                              
                                    <div class="col-md-4 offset-md-4">
                                        <input type="submit" class="btn btn-primary" value="Pay" />
                                        <input type="button" class="btn btn-warning" value="Cash On Deliver" onClick={() => this.onCach()} />
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

export default Payment;
