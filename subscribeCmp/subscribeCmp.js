import { LightningElement, wire ,track} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import getAccountRating from '@salesforce/apex/getAccountdata.getAccountRating';

export default class SubscribeCmp extends LightningElement {
    strCapturedText = '';
    strCapturedHot =false;
    strCapturedWarm =false;
    strCapturedCold =false;
    @track accData;
    @track errorAccData;     
    
    @track columnTable =[
        {label:'Name',fieldName:'Name',type:'text'},
        {label:'BillingCity',fieldName:'BillingCity',type:'text'},
        {label:'BillingState',fieldName:'BillingState',type:'text'},
        {label:'Rating',fieldName:'Rating',type:'text'},
        {label:'Icone',fieldName:'Icone',type:'text'},
        {label:'Status__c',fieldName:'Status__c',type:'text'},
          
    ];



    @wire(CurrentPageReference) pageRef;
     connectedCallback(){
        registerListener('RatingValue', this.setCaptureText, this);
    }

    // This method will run once the component is removed from DOM.
    disconnectedCallback(){
        unregisterAllListeners(this);
    }

    // This method will update the value once event is captured.
    setCaptureText(objPayload){
       
        this.strCapturedText = objPayload;
        if(this.strCapturedText == 'Hot'){
            this.strCapturedHot=true;
            this.strCapturedCold=false;
            this.strCapturedWarm=false;
        }else if(this.strCapturedText == 'Cold'){
            this.strCapturedCold=true;
            this.strCapturedWarm=false;
            this.strCapturedHot=false;
        }else if(this.strCapturedText == 'Warm'){
            this.strCapturedCold=false;
            this.strCapturedWarm=true;
            this.strCapturedHot=false;
        }

    }

    @wire(getAccountRating, { searchKey: '$strCapturedText' }) wiredLeads(result) {
        if (result.data) {
            console.log('Chart',result.data);
           this.accData = result.data;
         if(this.accData.Rating='Hot'){
           
         }
           
        } else if (result.error) {

        }
    }




}