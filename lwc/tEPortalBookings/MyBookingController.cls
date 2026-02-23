//this controller used for myBooking LWC 
public with sharing class MyBookingController {
	
    @AuraEnabled(cacheable = true)
    public static list<Booking__c> getBookingList(){
         String userId = UserInfo.getUserId();
         String loggedInUserAccountId;  
          System.debug('Logged User is :: ' +UserInfo.getUserName());
           User u = [Select Id , ContactId From User Where Id =: userId]; // To gate Contact id of logged in User Id
           Contact con = New Contact();
           if(u != Null)
           {
               if(u.ContactId != Null)
               {
                   con = [Select Id , AccountId From Contact where Id =: u.ContactId]; // To get Account id of logged in user from Contact
               }
           }
        if(con.AccountId != Null){
          loggedInUserAccountId = con.AccountId;
          system.debug('loggedInUserAccountId::'+loggedInUserAccountId);
        }    
            System.debug('List is ' + [SELECT Id , Name,Account_Lookup__c,OwnerId,Unit_Tower_Project__c From Booking__c Where OwnerId =: userId] );
            return [SELECT Id ,OwnerId, Name,Account_Lookup__c,Unit_Tower_Project__c,Account__c From Booking__c Where Account_Lookup__c =: loggedInUserAccountId AND Status__c = 'Processed'];
    }
    @AuraEnabled(cacheable = true)
    public static list<	Booking__c> getBookingRecord(String BookId1){
           String bkIdd = BookId1 ;
           System.debug('Booking Id is ::' + BookId1);
            System.debug('List is ' + [SELECT Id ,OwnerId, Name,Account_Lookup__c,Unit_Tower_Project__c From Booking__c where Id =:bkIdd ]);
            return [SELECT Id ,OwnerId, Name,Account_Lookup__c,Unit_Tower_Project__c From Booking__c where Id =:bkIdd ];
    }
    @AuraEnabled(cacheable = true)
    public static list<	Booking__c> getSummaryTransaction(String BookId1){
           String bkIdd = BookId1 ;
           System.debug('Booking Id is ::' + BookId1);
            System.debug('List is ' + [SELECT Id ,OwnerId, Name,Account_Lookup__c,Unit_Tower_Project__c From Booking__c where Id =:bkIdd ]);
            return [SELECT Id ,OwnerId, Name,Account_Lookup__c,Unit_Tower_Project__c From Booking__c where Id =:bkIdd ];
    }
    @AuraEnabled(cacheable = true)
    public static list<	Unit__c> getUnitRecord(String BookId2){
           String bkIdd = BookId2 ;
           System.debug('Booking Id is ::' + BookId2);
            System.debug('List is ' + [SELECT Id ,Floor__c, Name,Project__C,Booking__c,Configuration__c,Tower__c,Project_Name__c From Unit__c where Booking__c =:bkIdd ]);
            return [SELECT Id ,Floor__c, Name,Project__C,Booking__c,Configuration__c,Tower__c,Project_Name__c From Unit__c where Booking__c =:bkIdd ];
    }
    @AuraEnabled(cacheable = true)
    public static list<Customization_New__c> getInteriorDesignDetails(String BookId1){
           String bkIdd = BookId1 ;
           System.debug('Booking Id is ::' + BookId1);
          //  System.debug('List is ' + [SELECT Id ,IDSA_Signed_Date__c, Name,Status__c,Booking__c,Total_Customization_Cost__c,Total_Discount_Amount__c,Approval_Status__c From Customization_New__c where Approval_Status__c = 'Approved' and Booking__c =:bkIdd ]);
            return [SELECT Id ,IDSA_Signed_Date__c, Name,Status__c,Booking__c,Total_Customization_Cost__c,Total_Discount_Amount__c,Approval_Status__c From Customization_New__c where Approval_Status__c = 'Approved' and Booking__c =:bkIdd ];
    }
    @AuraEnabled(cacheable = true)
    public static list<	Demand__c> getDemandList(String BookId){
           String bkIdd = BookId ;
           System.debug('Booking Id is ::' + BookId);
            System.debug('List is ' + [SELECT Id , Name,Booking__c ,Voucher_Number__c , Due_Date__c From Demand__c where Booking__c =:bkIdd ]);
            return [SELECT Id , Name,Milestone_Name_formula__c,Booking__c,Total_Amount_with_Tax_Demanded__c,Due_Date__c,SAP_Invoice_No__c,SAP_Posting_Date__c,Demand_Status__c From Demand__c where Booking__c =:bkIdd AND Demand_Status__c != 'Reversed'];
    }
    //****************************************************************************************************
  /*  @AuraEnabled(cacheable = true)
    public static String getDemandAttachment(String demandId){
           System.debug('demandId Id is ::' + demandId);
        String attachId;
            attachId = [SELECT  ContentDocumentId FROM ContentDocumentLink where LinkedEntityId =: demandId ].ContentDocumentId;
        return attachId;
    } */
    //***************************************************************************************************
    
   @AuraEnabled(cacheable = true)
    public static list<Receipt__c> getPaymentList(String BookIdForPayment){
            String bkId = BookIdForPayment ;
            System.debug('List is ' + [SELECT Id , Name,Booking__c,Receipt_Unique_ID__c,Receipt_Number__c,Receipt_Date__c From Receipt__c where Booking__c =:bkId]);
            return [SELECT Id , Name,Booking__c,Receipt_Unique_ID__c,Receipt_Number__c,Mode__c,Cheque_DD__c,Amount_Rs__c,Receipt_Date__c,SAP_Posting_Date__c,Accounting_Document_Number__c,Receipt_Status__c From Receipt__c where Booking__c =:bkId AND Receipt_Status__c = 'Cleared'];
    }
    @AuraEnabled(cacheable = true)
    public static list<Payment_Milestones__c> getPaymentMilestone(String BookIdForPayment){
            String bkId = BookIdForPayment ;
            List<Booking__c> book = new List<Booking__c>();
            book = [select id,Quotation__c from Booking__c where id =: bkId ];
            System.debug('List is ' + [SELECT Id , Name,Milestone_Name__c,Milestone_Type_edit__c,Milestone_Due_Date__c,Total_Amount_in_Milestone__c,TotalMilestoneTax__c From Payment_Milestones__c where Quotation__c =:book[0].Quotation__c]);
            return [SELECT Id , Name,Milestone_Name__c,Milestone_Type_edit__c,Total_Amount_Community__c,Total_Milestone_Amt_with_Tax_Community__c,
                    Milestone_Due_Date__c,Total_Amount_in_Milestone__c,TotalMilestoneTax__c,Invoice_Date__c,TotalMilestoneAmountWIthTax__c,Demand_Raised__c,Status__c From Payment_Milestones__c where Quotation__c =:book[0].Quotation__c];
    }
    
    @AuraEnabled(cacheable = true)
    public static list<Applicant_Details__c> getApplicantList(String BookIdForPayment){
            String bkId = BookIdForPayment ;
            System.debug('List is ' + [SELECT Id , Name,Booking__c,Applicant_Number__c,Applicant_Unique_No__c From Applicant_Details__c where Booking__c =:bkId]);
            return [SELECT Id , Name,Booking__c,Applicant_Number__c,Applicant_Unique_No__c,Email_Address__c,Mobile_Number__c, Type_Of_Applicant__c From Applicant_Details__c where Booking__c =:bkId];
    }
    
    @AuraEnabled(cacheable = true)
    public static list<	Unit__c> getUnitUpdates(String BookId2){
           String bkIdd = BookId2 ;
           System.debug('Booking Id is ::' + BookId2);
            System.debug('List is ' + [SELECT Id ,Floor__c, Name,Project__c,Booking__c,Configuration__c,Tower__c From Unit__c where Booking__c =:bkIdd ]);
            return [SELECT Id ,Floor__c, Name,Project__c,Project_Name__c,Booking__c,Configuration__c,Tower__c From Unit__c where Booking__c =:bkIdd ];
    }
    @AuraEnabled(cacheable = true)
    public static list<Project_Construction_Stages__c> getConstructinUpdatesList(String BookIdForPayment){
            String bkId = BookIdForPayment ;
            List<Booking__c> bkList = New List<Booking__c>();
            bkList = [SELECT Id , Name,Project__c,Tower_Name__c From Booking__c where Id =:bkId];
            System.debug('List is ' + [SELECT Id , Name,Project__c,Project_Name__c ,Tower__c,Tower_Name__c From Project_Construction_Stages__c where Tower_Name__c =:bkList[0].Tower_Name__c]);
            return [SELECT Id , Name,Project__c,Project_Name__c,Tower__c,Tower_Name__c  From Project_Construction_Stages__c where Tower_Name__c =:bkList[0].Tower_Name__c];
    }
    
    @AuraEnabled(cacheable = true)
    public static list<Project__c> getProjectUpdate(String BookIdForPayment){
            String bkId = BookIdForPayment ;
            List<Booking__c> bkList = New List<Booking__c>();
            bkList = [SELECT Id , Name,Project__c,Tower_Name__c From Booking__c where Id =:bkId];
            System.debug('List is ' + [SELECT Id , Name From Project__c where Id =:bkList[0].Project__c]);
            return [SELECT Id , Name From Project__c where Id =:bkList[0].Project__c];
    }
    
    @AuraEnabled(cacheable = true)
    public static String getUserId(String bkId){
        String bId = bkId ;
        String UserID;
        List<Booking__c> bkList = New List<Booking__c>();
        List<User> u = new List<User>();
        bkList = [SELECT Id , Name,Project__c,Tower_Name__c,Relationship_Manager__c,Sales_Managers__c From Booking__c where Id =:bId];
        if(bkList[0].Relationship_Manager__c != null){
            u = [Select id from User where id=: bkList[0].Relationship_Manager__c];
            UserID = u[0].id;
        }else{
            u = [Select id from User where id=: bkList[0].Sales_Managers__c];
            UserID = u[0].id;
        }
        return UserID;
    }
    @AuraEnabled(cacheable = true)
    public static Boolean isWorkingDay(){
        BusinessHours bHours = [SELECT Id FROM BusinessHours WHERE IsDefault = true];
        return BusinessHours.isWithin(bHours.Id, system.today());
    }	
    
}