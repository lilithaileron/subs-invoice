import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import * as moment from 'moment';
import { DaterangepickerDirective } from 'ngx-daterangepicker-material';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../app.component.css','./home.component.css']
})
export class HomeComponent implements OnInit {

  invoiceForm = this.fb.group({
    amount: [''],
    type: [''],
    terms: [''],
    weekDate: [''],
    monthDate: [''],
  });

  @ViewChild(DaterangepickerDirective, { static: true })
    pickerDirective: DaterangepickerDirective;

    minDate = moment();
    dateLimit = "90";

    invoiceDates = [];

    days = [
      {value: 1, name: 'Monday'},
      {value: 2, name: 'Tuesday'},
      {value: 3, name: 'Wednesday'},
      {value: 4, name: 'Thursday'},
      {value: 5, name: 'Friday'},
      {value: 6, name: 'Saturday'},
      {value: 7, name: 'Sunday'}]

    numDates = [];  

    change(e): void {
      console.log(e);
    }


    generate(terms, type, weekDate, monthDate): void {

      if (type=='daily'){
        let tempDate = terms.startDate;
        let daysCount = terms.endDate.diff(terms.startDate, 'days');

        this.invoiceDates = [];

        for(let i=1; i<=daysCount; i++){
          tempDate=tempDate.add(1, 'day');
          this.invoiceDates.push(tempDate.format('DD/MM/YYYY'));
        }
      }

      else if (type=='weekly'){
        this.invoiceDates = [];

        let tempDate = terms.startDate.clone();
        if(tempDate.day(weekDate).isAfter(terms.startDate, 'd') ){
          this.invoiceDates.push(tempDate.clone().format('DD/MM/YYYY'));
        }
        while(tempDate.day(7 + weekDate).isBefore(terms.endDate) ){
          this.invoiceDates.push(tempDate.clone().format('DD/MM/YYYY'));
        }
      }

      else if (type=='monthly'){
        this.invoiceDates = [];

        var tempDate = terms.startDate.clone();

        while (terms.endDate > tempDate || tempDate.format('M') === terms.endDate.format('M')) {
          this.invoiceDates.push(tempDate.format('DD/MM/YYYY'));
          tempDate.add(1,'month');
        }
      }

      

      console.log(this.invoiceDates);
        
    }
    

  

  constructor(private fb: FormBuilder) { 
    this.numDates = Array.from({length:30},(v,k)=>k+1);
  }

  ngOnInit(): void {
  }


  displayInvoice(){
    console.log(this.invoiceForm.value.monthDate)
    this.generate(this.invoiceForm.value.terms, this.invoiceForm.value.type, this.invoiceForm.value.weekDate, this.invoiceForm.value.monthDate)
  }

}
