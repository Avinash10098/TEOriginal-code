import { LightningElement, wire ,track,api} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';  
import getBookingList from '@salesforce/apex/MyBookingController.getBookingList'
import getBookingRecord from '@salesforce/apex/MyBookingController.getBookingRecord'
import getPaymentList from '@salesforce/apex/MyBookingController.getPaymentList'
import getDemandList from '@salesforce/apex/MyBookingController.getDemandList'
import getApplicantList from '@salesforce/apex/MyBookingController.getApplicantList'
import getConstructinUpdatesList from '@salesforce/apex/MyBookingController.getConstructinUpdatesList'
import getUnitRecord from '@salesforce/apex/MyBookingController.getUnitRecord'
import getInteriorDesignDetails from '@salesforce/apex/MyBookingController.getInteriorDesignDetails'
import getPaymentMilestone from '@salesforce/apex/MyBookingController.getPaymentMilestone'
import getUnitUpdates from '@salesforce/apex/MyBookingController.getUnitUpdates'
import getProjectUpdate from '@salesforce/apex/MyBookingController.getProjectUpdate'
import getUserId from '@salesforce/apex/MyBookingController.getUserId'
import getWorkingDay from '@salesforce/apex/MyBookingController.isWorkingDay'
import Id from '@salesforce/user/Id';
import retriveFiles from '@salesforce/apex/ContentManagerService.retriveFiles';
import constructionUpdates from '@salesforce/apex/ContentManagerService.constructionUpdates';
import homeUpdates from '@salesforce/apex/ContentManagerService.homeUpdates';
//import getDemandAttachment from '@salesforce/apex/MyBookingController.getDemandAttachment';

export default class TEPortalBookings extends NavigationMixin(LightningElement) {
  @track value ;
 // @track attachId;
  
  @track bookingList;
  @track bookingRecord;
  @track DemandList;
  @track PaymentList;
  @track ApplicantList;
  @track ConstructinUpdatesList;
  @track unitList;
  @track interiorDesign;
  @track PaymentMilestone;
  @track unitUpdates;
  @track projectUpdates;
  @track  error;
  @track userId= Id;
  @track showdetail ;
  @track WorkingDay;
  SpocId = getUserId;
  showSpoc = true;
  showBookings= true;
  showDemands= true;
  showPayments = true;
  showApplicants = true;
  showConstructionUpdates = true;
  showPaymentMilestone = true;
  showSummaryTransaction = true;
  showProject = true;
  showUnit = true;
  showUnitUpdates = true;
  showinteriorDesign = true;
  @track showOption = false
  @track columnsB = [

    {type: "button", typeAttributes: {  
      label: 'View',  
      name: 'View',  
      title: 'View',  
      disabled: false,  
      value: 'view',  
      iconPosition: 'left'  
    }},
      
  {
      label: 'Booking Name',
      fieldName: 'Unit_Tower_Project__c',
      type: 'text',
      sortable: true
  }
  /* {
      label: 'Application Number',
      fieldName: 'Application_Number__c',
      type: 'Number',
      sortable: true
  },
  {
      label: 'Booking Date',
      fieldName: 'Booking_Date__c',
      type: 'DateTime',
      sortable: true
  },*/
  ];
  
  @track columnsU = [
    {type: "button", typeAttributes: {  
      label: 'View',  
      name: 'View',  
      title: 'View',  
      disabled: false,  
      value: 'view',  
      iconPosition: 'left'  
    }},
      
    {
        label: 'Unit No',
        fieldName: 'Name',
        type: 'text',
        sortable: true,
        wrapText : true
    },
    
    {
        label: 'Project Name',
        fieldName: 'Project_Name__c',
        type: 'text',
        sortable: true,
        wrapText : true
    }
    
    
    ];

    @track columnsID = [
      {type: "button", typeAttributes: {  
        label: 'View',  
        name: 'View',  
        title: 'View',  
        disabled: false,  
        value: 'view',  
        iconPosition: 'left'  
      }},
      {
          label: 'Customization Name',
          fieldName: 'Name',
          type: 'text',
          sortable: true
      },
      
      {
          label: 'IDSA Signed Date',
          fieldName: 'IDSA_Signed_Date__c',
          type: 'Date',
          sortable: true
      },
      
      {
          label: 'Status',
          fieldName: 'Status__c',
          type: 'text',
          sortable: true
      }
      ];


  @track columnsD = [
    {type: "button", typeAttributes: {  
      label: 'View',  
      name: 'View',  
      title: 'View',  
      disabled: false,  
      value: 'view',  
      iconPosition: 'left'  
    }},

 /*   {type: "button", typeAttributes: {  
      label: 'Down',  
      name: 'Down',  
      title: 'Down',  
      disabled: false,  
      value: 'Down',  
      iconPosition: 'left'  
    }},
      */
      {
          label: 'Milestone',
          fieldName: 'Milestone_Name_formula__c',
          type: 'text',
          sortable: true
      },
      
      {
          label: 'Invoice Date',
          fieldName: 'SAP_Posting_Date__c',
          type: 'DateTime',
          sortable: true
      },
      
   //   {
   //      label: 'Due Date',
   //       fieldName: 'Due_Date__c',
   //       type: 'DateTime',
   //       sortable: true
   //   },
      {
    //    label: 'Total',
        label: 'Total Amount',
        fieldName: 'Total_Amount_with_Tax_Demanded__c',
        type: 'text',
        sortable: true,
        type: 'currency',
        typeAttributes: { currencyCode: 'INR'},
        cellAttributes: { alignment: 'left' },
        typeAttributes: { minimumFractionDigits: '0' }
    }
      ];
      @track columnsP = [
      
        {type: "button", typeAttributes: {  
          label: 'View',  
          name: 'View',  
          title: 'View',  
          disabled: false,  
          value: 'view',  
          iconPosition: 'left'} 
        },
          {
              label: 'Receipt Number',
              fieldName: 'Accounting_Document_Number__c',
              type: 'Number',
              sortable: true
          },
          
          {
              label: 'Receipt Date',
              fieldName: 'SAP_Posting_Date__c',
              type: 'DateTime',
              sortable: true
          },

          
      {
        label: 'Amount',
        fieldName: 'Amount_Rs__c',
        type: 'Number',
        sortable: true,
        type: 'currency',
        typeAttributes: { currencyCode: 'INR'},
        cellAttributes: { alignment: 'left' },
        typeAttributes: { minimumFractionDigits: '0' }
    }
          ];

          @track columnsUD = [
      
            {
                label: 'Unit No',
                fieldName: 'Name',
                type: 'text',
                sortable: true
            },
            
            {type: "button", typeAttributes: {  
              label: 'View',  
              name: 'View',  
              title: 'View',  
              disabled: false,  
              value: 'view',  
              iconPosition: 'left'  
            }}];

          @track columnsA = [
            {type: "button", typeAttributes: {  
              label: 'View',  
              name: 'View',  
              title: 'View',  
              disabled: false,  
              value: 'view',  
              iconPosition: 'left' }

              },
            {
                label: 'Applicant Name',
                fieldName: 'Name',
                type: 'text',
                sortable: true
            },

            {
              label: 'Applicant Number',
              fieldName: 'Applicant_Number__c',
              type: 'text',
              sortable: true
          }
            
            
            
            ]; 
                
      @track columnsCP = [
      
          {
              label: 'Project Construction Stages Name',
              fieldName: 'Name',
              type: 'text',
              sortable: true
          },

          {
            label: 'Tower Name',
            fieldName: 'Tower_Name__c',
            type: 'text',
            sortable: true
        },
          
          {
              label: 'Project Name',
              fieldName: 'Project_Name__c',
              type: 'text',
              sortable: true
          },
          
          {type: "button", typeAttributes: {  
            label: 'View',  
            name: 'View',  
            title: 'View',  
            disabled: false,  
            value: 'view',  
            iconPosition: 'left' }

            }]; 

            @track columnsPM = [
              {type: "button", typeAttributes: {  
                label: 'View',  
                name: 'View',  
                title: 'View',  
                disabled: false,  
                value: 'view',  
                iconPosition: 'left' }
  
                },
              
              {
                  label: 'Milestone Name',
                  fieldName: 'Milestone_Name__c',
                  type: 'text',
                  sortable: true
              },
  
              
              
       /*       {
                  label: 'Total Amount',
                  fieldName: 'Total_Amount_Community__c',
                  type: 'Number',
                  sortable: true,
                  type: 'currency',
                  typeAttributes: { currencyCode: 'INR'},
                  cellAttributes: { alignment: 'left' },
                  typeAttributes: { minimumFractionDigits: '0' }
              },
              {
                label: 'Total Milestone Tax',
                fieldName: 'TotalMilestoneTax__c',
                type: 'Number',
                sortable: true,
                type: 'currency',
                typeAttributes: { currencyCode: 'INR'},
                cellAttributes: { alignment: 'left' },
                typeAttributes: { minimumFractionDigits: '0' }
             },  */
            {
       //       label: 'Total Milestone With Tax',
              label: 'Total Amount',
              fieldName: 'Total_Milestone_Amt_with_Tax_Community__c',
              type: 'Number',
              sortable: true,
              type: 'currency',
              typeAttributes: { currencyCode: 'INR'},
              cellAttributes: { alignment: 'left' },
              typeAttributes: { minimumFractionDigits: '0' }
          },
          {
            label: 'Status',
            fieldName: 'Status__c',
            type: 'text',
            sortable: true
          }
              
              ]; 

                @track columnsPU = [
      
                  {
                      label: 'Project Name',
                      fieldName: 'Name',
                      type: 'text',
                      sortable: true
                  },
                  
                  {type: "button", typeAttributes: {  
                    label: 'View',  
                    name: 'View',  
                    title: 'View',  
                    disabled: false,  
                    value: 'view',  
                    iconPosition: 'left'  
                  }}]; 
          
          
  
  
          
//Console.log('Id of logged in user //// ' + JSON.stringify(userId));
@wire(getBookingList)
wiredbookingList({ error, data }) {
  
  if (data) {

    
    console.log('Inside data////' + data);
    //this.value = data[0].B;
    // alert("Inside data wired method : ");
    //this.value = data.Booking__c;
    // console.log('BookId////' + value);
    // alert("Bookinglist data : " + data);
    this.bookingList = data;
    if(data.length == 1){
    this.selectedOption = data[0].Id;
    this.showOption = true;
    }
    // alert("Bookinglist : " + this.bookingList);
    console.log('Inside data1////');
  } else if (error) {
    this.error = error;
    
  }
}


@track selectedOption;
changeHandler(event) {

    this.selectedOption = event.target.value;
    this.showdetail = true;
        // alert("you have selected : "this.selectedOption);
        //this.template.querySelector('c-content-manager').childMethodcontent();
        //this.template.querySelector('c-content-manager').childMethod();
        //this.template.querySelector('c-content-manager').childMethodContent();
}
handleChange(event) {
this.value = event.detail.value;
}


callRowAction( event ) {  
        
const recId =  event.detail.row.Id;  
const actionName = event.detail.action.name; 

if ( actionName == 'View') {  

  this[NavigationMixin.Navigate]({  
      type: 'standard__recordPage',  
      attributes: {  
          recordId: recId,  
          objectApiName: 'Demand__c',  
          actionName: 'view'  
      }  
  })

}
//******************************************************************************************/
/*
if ( actionName == 'Down') {  
 // alert('Inside down');
 getDemandAttachment(recId)
    .then(result => {
      this.attachId = result;
  })
  .catch(error => {
      this.error = error;
  });
//  window.console.log('error <===> '+event.currentTarget.dataset.id);
  this[NavigationMixin.Navigate]({
  type: 'standard__webPage',
  attributes: {
    url: 'https://sbdev-tecommunity.cs31.force.com/sfc/servlet.shepherd/document/download/'+attachId
}
}, false 
);
}
*/
//******************************************************************************************/
}

callRowAction1( event ) {  
        
const recId =  event.detail.row.Id;  
const actionName = event.detail.action.name;  
if ( actionName == 'View') {  


  this[NavigationMixin.Navigate]({  
      type: 'standard__recordPage',  
      attributes: {  
          recordId: recId,  
          objectApiName: 'Receipt__c',  
          actionName: 'view'  
      }  
  }) 

}       

}  

callRowAction2( event ) {  
        
const recId =  event.detail.row.Id;  
const actionName = event.detail.action.name;  
if ( actionName == 'View') {  


  this[NavigationMixin.Navigate]({  
      type: 'standard__recordPage',  
      attributes: {  
          recordId: recId,  
          objectApiName: 'Project_Construction_Stages__c',  
          actionName: 'view'  
      }  
  })

}       

}  

callRowAction3( event ) {  
        
const recId =  event.detail.row.Id;  
const actionName = event.detail.action.name;  
if ( actionName == 'View') {  


  this[NavigationMixin.Navigate]({  
      type: 'standard__recordPage',  
      attributes: {  
          recordId: recId,  
          objectApiName: 'Applicant_Details__c',  
          actionName: 'view'  
      }  
  })

}       

}  

callRowAction4( event ) {  
        
  const recId =  event.detail.row.Id;  
  const actionName = event.detail.action.name;  
  if ( actionName == 'View') {  
  
  
    this[NavigationMixin.Navigate]({  
        type: 'standard__recordPage',  
        attributes: {  
            recordId: recId,  
            objectApiName: 'Booking__c',  
            actionName: 'view'  
        }  
    })

  }       

} 

callRowAction5( event ) {  
        
  const recId =  event.detail.row.Id;  
  const actionName = event.detail.action.name;  
  if ( actionName == 'View') {  
  
  
    this[NavigationMixin.Navigate]({  
        type: 'standard__recordPage',  
        attributes: {  
            recordId: recId,  
            objectApiName: 'Unit__c',  
            actionName: 'view'  
        }
    })

  }       

} 

callRowAction6( event ) {  
        
  const recId =  event.detail.row.Id;  
  const actionName = event.detail.action.name;  
  if ( actionName == 'View') {  
  
  
    this[NavigationMixin.Navigate]({  
        type: 'standard__recordPage',  
        attributes: {  
            recordId: recId,  
            objectApiName: 'Customization_New__c',  
            actionName: 'view'  
        }  
    })

  }       

} 

callRowAction7( event ) {  
        
  const recId =  event.detail.row.Id;  
  const actionName = event.detail.action.name;  
  if ( actionName == 'View') {  
  
  
    this[NavigationMixin.Navigate]({  
        type: 'standard__recordPage',  
        attributes: {  
            recordId: recId,  
            objectApiName: 'Payment_Milestones__c',  
            actionName: 'view'  
        }  
    }) 

  }       

} 

callRowAction8( event ) {  
        
  const recId =  event.detail.row.Id;  
  const actionName = event.detail.action.name;  
  if ( actionName == 'View') {  
  
  
    this[NavigationMixin.Navigate]({  
        type: 'standard__recordPage',  
        attributes: {  
            recordId: recId,  
            objectApiName: 'Project__c',  
            actionName: 'view'  
        }  
    })

  }       

} 

callRowAction9( event ) {  
        
  const recId =  event.detail.row.Id;  
  const actionName = event.detail.action.name;  
  if ( actionName == 'View') {  
  
  
    this[NavigationMixin.Navigate]({  
        type: 'standard__recordPage',  
        attributes: {  
            recordId: recId,  
            objectApiName: 'Unit__c',  
            actionName: 'view'  
        }  
    })

  }       

} 

  //console.log('BookId////' + value);
@wire(getDemandList,{BookId:'$selectedOption'})
wiredDemandList({ error, data }) {
  
  if (data) {

    
    //console.log('data////' + data);
    
    this.DemandList = data;
    //console.log('DemandList////' + DemandList);
    
  } else if (error) {
    this.error = error;
    
  }
}
@wire(getPaymentList,{BookIdForPayment:'$selectedOption'})
wiredPaymentList({ error, data }) {
  
  if (data) {

    
    //console.log('data////' + data);
    
    this.PaymentList = data;
    //console.log('DemandList////' + DemandList);
    
  } else if (error) {
    this.error = error;
    
  }
}
@wire(getApplicantList,{BookIdForPayment:'$selectedOption'})
wiredApplicantList({ error, data }) {
  
  if (data) {

    
    //console.log('data////' + data);
    
    this.ApplicantList = data;
    //console.log('DemandList////' + DemandList);
    
  } else if (error) {
    this.error = error;
    
  }
}
@wire(getConstructinUpdatesList,{BookIdForPayment:'$selectedOption'})
wiredConstructinUpdatesList({ error, data }) {
  
  if (data) {

    
    //console.log('data////' + data);
    
    this.ConstructinUpdatesList = data;
    //console.log('DemandList////' + DemandList);
    
  } else if (error) {
    this.error = error;
    
  }
}

@wire(getBookingRecord,{BookId1:'$selectedOption'})
wiredgetBookingRecord({ error, data }) {
  
  if (data) {

    
    //console.log('data////' + data);
    //alert('Inside bookingRecord');
    this.bookingRecord = data;
    // alert('Booking data::'+this.bookingRecord);
    //console.log('DemandList////' + DemandList);
    
  } else if (error) {
    this.error = error;
    
  }
}

@wire(getUnitRecord,{BookId2:'$selectedOption'})
wiredgetUnitRecord({ error, data }) {
  
  if (data) {

    
    //console.log('data////' + data);
    
    this.unitList = data;
    //console.log('DemandList////' + DemandList);
    
  } else if (error) {
    this.error = error;
    
  }
}

@wire(getInteriorDesignDetails,{BookId1:'$selectedOption'})
wiredgetInteriorDesignDetails({ error, data }) {
  
  if (data) {

    
    //console.log('data////' + data);
    
    this.interiorDesign = data;
    //console.log('DemandList////' + DemandList);
    
  } else if (error) {
    this.error = error;
    
  }
}

@wire(getPaymentMilestone,{BookIdForPayment:'$selectedOption'})
wiredgetgetPaymentMilestone({ error, data }) {
  
  if (data) {

    
    //console.log('data////' + data);
    
    this.PaymentMilestone = data;
    //console.log('DemandList////' + DemandList);
    
  } else if (error) {
    this.error = error;
    
  }
}

@wire(getProjectUpdate,{BookIdForPayment:'$selectedOption'})
wiredgetProjectUpdate({ error, data }) {
  
  if (data) {

    
    //console.log('data////' + data);
    
    this.projectUpdates = data;
    //console.log('DemandList////' + DemandList);
    
  } else if (error) {
    this.error = error;
    
  }
}

@wire(getUnitUpdates,{BookId2:'$selectedOption'})
wiredgetUnitUpdates({ error, data }) {
  
  if (data) {

    
    //console.log('data////' + data);
    
    this.unitUpdates = data;
    //console.log('DemandList////' + DemandList);
    
  } else if (error) {
    this.error = error;
    
  }
}

@wire(getUserId,{bkId:'$selectedOption'})
wiredgetUserId({ error, data }) {
  
  if (data) {

    
    //console.log('data////' + data);
    
    this.SpocId = data;
    
    
  } else if (error) {
    this.error = error;
    
  }
}

@wire(getWorkingDay)
wiredWorkingDay({ error, data }) {
  
  if (data) {
    this.WorkingDay = data;
    console.log('Working Day////'+this.WorkingDay);
  } else if (error) {
    this.error = error;
    
  }
}

@track files;

@wire(retriveFiles,{docid:'$selectedOption'})
filesData({data, error}) {
    if(data) {
        window.console.log('data ===> '+data);
        this.files = data;
    }
    else if(error) {
        window.console.log('error ===> '+JSON.stringify(error));
    }
}

@track cupdate;

@wire(constructionUpdates,{conupdate:'$selectedOption'})
ConstuctionUpdates({data, error}) {
    if(data) {
        window.console.log('data ===> '+data);
        this.cupdate = data;
    }
    else if(error) {
        window.console.log('error ===> '+JSON.stringify(error));
    }
}


@track home;

@wire(homeUpdates,{homeupdate:'$selectedOption'})
homeUpdates({data, error}) {
    if(data) {
        window.console.log('data ===> '+data);
        this.home = data;
    }
    else if(error) {
        window.console.log('error ===> '+JSON.stringify(error));
    }
}


filePreview(event) {
window.console.log('ID <===> '+event.currentTarget.dataset.id);
      this[NavigationMixin.Navigate]({
      type: 'standard__webPage',
      attributes: {
          url: event.currentTarget.dataset.id /*'https://sbdev-tecommunity.cs31.force.com/sfc/servlet.shepherd/version/renditionDownload?rendition=THUMB720BY480&versionId='+event.currentTarget.dataset.id;*/
      }
  }, false );
}
downloadfile(event) {
window.console.log('error <===> '+event.currentTarget.dataset.id);
    this[NavigationMixin.Navigate]({
    type: 'standard__webPage',
    attributes: {
      url: 'https://care.total-environment.com/sfc/servlet.shepherd/document/download/'+event.currentTarget.dataset.id
  }
}, false 
);
}

}