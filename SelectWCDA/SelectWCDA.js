({
	fetchDAs : function(component, event, helper) {
	
    var division = component.get("v.selectedDivision");
    var marketAreaDMA = component.get("v.selectedMarketAreaDMA");
	var Leadpack = component.get("v.selectedLeadpack");
    var wireCenter = component.get("v.selectedWireCenter");
    var wcda = component.get("v.selectedWCDA");
    var alreadyIncludedWhere = false;
    var needAND = false;
   //@ACS - start [01-sept-2017]  
    var Assigned_PendingDAs = component.find("assPendingDA").get("v.value");
    var PwC = component.find("pwcCheck").get("v.value");
    
    console.log('Developer-->Assigned_PendingDAs ' + Assigned_PendingDAs);
    console.log('Developer-->PwC ' + PwC);
   //@ACS - stop [01-sept-2017] 
    
//    console.log(division + ' '+marketAreaDMA+ ' '+ Leadpack+ ' '+wireCenter+' '+wcda);

    console.log("Leadpack data--->"); console.log(Leadpack); console.log("<-----Leadpack data");
    var whereClause = 'Select Id, Name, Division, MarketArea__c, Assigned__c, Clock__c, ACC__c, Closed_Removed_Total__c';
    whereClause += ', ClosedSale__c, Closed_TBR_Total__c, EligTypeG__c, LeadCount__c, MDUYes__c, MDUNo__c';
    whereClause += ', Workable__c, Wireless__c, LastAssignedTo__c, FriendlyName__c, VideoPenetrationTotal__c';
    whereClause += ', PrimaryMunicipality__c, X1G_Total__c, IPTV_Eligible__c, X1_5M_Total__c, X100M_Total__c';
	whereClause += ', LiveYes__c, LiveNo__c, Red__c, FreeNotes__c, Competitor__c, DeloitteSegment__c, Total12MoCancelsAll__c';
    whereClause += ', Total12MoDisconnectsAll__c, Total12MoSalesAll__c, Total12MoSalesD2D__c, DoNotKnock__c';
    
    //@ACS - start [01-sept-2017]
    whereClause += ', Route__c, PWC__c,AssignedYN__c,AssignmentPending__c';
    
    //@ACS - stop [01-sept-2017]
    
    whereClause+= ' FROM WCDA__c';
     //@ACS - start [01-sept-2017]  //moyez added the if 
        if(PwC == false)  {
            if(!alreadyIncludedWhere) {
               whereClause+= ' WHERE';
               alreadyIncludedWhere=true;
             }
            if(needAND){ 
               whereClause+= ' AND';
             }
             else{ 
               needAND=true;
             }
             
            whereClause+= ' PWC__c = '+PwC ;
            
            console.log('Developer-->after pwc--> ' + whereClause);            
          //@ACS - stop [01-sept-2017]
        } //    Moyez Added this if statement 09/02/2017.  Only put filter if PwC is false, otherwise bypass this filter.
      
      //@ACS - start [02-sept-2017]  //modified by Moyez 09/02/2017, If checkbox = true, then there should be no filter.
        if(Assigned_PendingDAs == false) {
            if(!alreadyIncludedWhere) {
               whereClause+= ' WHERE';
               alreadyIncludedWhere=true;
            }
            if(needAND){ 
               whereClause+= ' AND';
             }
             else{ 
               needAND=true;
            }
             
            whereClause+= ' AssignedYN__c = '+Assigned_PendingDAs+' AND AssignmentPending__c='+ Assigned_PendingDAs;
          
    
            //@ACS - stop [02-sept-2017]
        } // moyez added this if statement 09/02.2017.  Only put filter in if Assigned_PendingDAs == false, otherwise bypass this filter
        
        if(wcda.Name) {
            	if(!alreadyIncludedWhere) {whereClause+= ' WHERE'; alreadyIncludedWhere=true; }
            	if(needAND) whereClause+= ' AND'; else needAND=true;
        		whereClause+= ' ID=' + '\'' + wcda.Id + '\'';
        } 
        if(wireCenter.Name) {
            	if(!alreadyIncludedWhere) {whereClause+= ' WHERE'; alreadyIncludedWhere=true; }
				if(needAND) whereClause+= ' AND'; else needAND=true;
        		whereClause+= ' Wirecenter__c=' + '\'' + wireCenter.Id + '\'';
        }     
        if(division.Name) {
            	if(!alreadyIncludedWhere) {whereClause+= ' WHERE'; alreadyIncludedWhere=true; }
				if(needAND) whereClause+= ' AND'; else needAND=true;
        		whereClause+= ' division=' + '\'' + division.Id + '\'';
        }
        if(Leadpack.Name) {
            	if(!alreadyIncludedWhere) {whereClause+= ' WHERE'; alreadyIncludedWhere=true; }
        		if(needAND) whereClause+= ' AND'; else needAND=true;
				whereClause+= ' Leadpack__c=' + '\'' + Leadpack.Id + '\'';
        }        
		if(marketAreaDMA.Name) {
            	if(!alreadyIncludedWhere) {whereClause+= ' WHERE'; alreadyIncludedWhere=true; }
				if(needAND) whereClause+= ' AND'; else needAND=true;
        		whereClause+= ' Wirecenter__r.DMA__c=' + '\'' + marketAreaDMA.Name + '\'';
        }
        if(!alreadyIncludedWhere) {whereClause+= ' WHERE'; alreadyIncludedWhere=true; }
		if(needAND) whereClause+= ' AND'; else needAND=true; 
        whereClause+= ' workable__c > 0';
        
        if(!alreadyIncludedWhere) {whereClause+= ' WHERE'; alreadyIncludedWhere=true; }
		if(needAND) whereClause+= ' AND'; else needAND=true; 
        whereClause+= ' MVP_Hold__c=false';
        
        if(!alreadyIncludedWhere) {whereClause+= ' WHERE'; alreadyIncludedWhere=true; }
		if(needAND) whereClause+= ' AND'; else needAND=true; 
        whereClause+= ' DA__c != \'\'';
        
        if(!alreadyIncludedWhere) {whereClause+= ' WHERE'; alreadyIncludedWhere=true; }
		if(needAND) whereClause+= ' AND'; else needAND=true;
        whereClause+= ' IsDeleted = false ORDER BY Name ASC LIMIT 5000';
        
 
    console.log(whereClause);
    
     // make Spinner attribute true for display loading spinner 
        component.set("v.Spinner", true); 
        
 //  NOW SET UP THE CALL TO THE SERVER
 
        
 var action = component.get("c.fetchWCDAs");

	action.setParams({'whereClause': whereClause});
	action.setCallback(this, function(response) {
                
        console.log("response data--->"); console.log(response); console.log("<-----response data");

            var state = response.getState(); console.log(state);
            if (state === "SUCCESS") {
                 // make Spinner attribute true for display loading spinner 
        component.set("v.Spinner", false); 
                var storeResponse = response.getReturnValue();
              // if storeResponse size is equal 0 ,display No Result Found... message on screen.                }
                if (storeResponse.length == 0) {
                    component.set("v.queryMessage", 'No Result Found...');
                } else {
                    component.set("v.queryMessage", '');
                }
                // set searchResult list with return value from server.
                component.set("v.listOfQueryRecords", storeResponse);
                console.log(storeResponse);

               // var cmpEvent = component.getEvent("renderQueryResult");
        		//cmpEvent.setParams({"WCDAJson" : storeResponse });
        		//cmpEvent.fire();
				
                var appEvent = $A.get("e.c:WCDAQuery");
                appEvent.setParams({"WCDARecords" : storeResponse,
                                    "source": 'SelectWCDA'});
                console.log('appevent ->' + appEvent);
                appEvent.fire();
                console.log('appevent fired ->' + appEvent);
                
                
            }      
    });
       // enqueue the Action  
        $A.enqueueAction(action);
    },  // close of fetchDAs

    showScenarios : function(component, event, helper) {component.set("v.showScenarioSearch", true); console.log('Inside showScenarios');
                                                       },    
    showLeadpackModal : function(component, event, helper) {component.set("v.isOpen", true);
                                                           },
    
    hideLeadpackModal : function(component, event, helper) {component.set("v.isOpen", false);
                                                           },
    showAssignUserModal : function(component, event, helper) {component.set("v.isAssignDAModalOpen", true);
                                                           },
    
    hideAssignUserModal : function(component, event, helper) {component.set("v.isAssignDAModalOpen", false);
                                                           },
    
   
                                                           
})