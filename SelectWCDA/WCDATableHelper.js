({
	processQueryResults: function(cmp, event, helper) {
        console.log('ProcessQueryResults - Enter');
        var WCDARecordList = event.getParams().WCDARecords;
        var bFromSelectTable = false;
        if(event.getParams().source != 'WCDASelectTable'){
        	for(var x = 0; x < WCDARecordList.length; x++){
            	WCDARecordList[x].recordNumber = x + 1;
        	}
            //$('#datatable').DataTable().destroy();
        }
        else{
        	bFromSelectTable = true;
        }
        cmp.set("v.WCDARecordList", WCDARecordList);
               
        console.log('Number of WCDA records received ->' + WCDARecordList.length );
        helper.updateTable(cmp, WCDARecordList,bFromSelectTable);
        console.log('ProcessQueryResults - Exit');
            
	},
    updateTable : function(cmp, WCDARecordList){
    	helper.updateTable(cmp, WCDARecordList,false);
    },
    updateTable : function(cmp, WCDARecordList,bDoNotClear){
        //@ACS - start [01-sept-2017]
        //var skipColumnSearch = [1, 2, 18, 22, 23, 24, 25, 26, 27, 28, 29 ];
        //@ACS - start [01-sept-2017]
         
        var skipColumnSearch = [1, 18, 22, 23, 24, 25, 26, 27, 28, 29 ];
                
        var self = this;
        var dbTable;
        if ( $.fn.dataTable.isDataTable( '#datatable' ) ) {
            dbTable = $('#datatable').DataTable();
            if(!bDoNotClear){
            	dbTable.clear();
            }
        	dbTable.rows.add(WCDARecordList).draw();
            $('#datatable tbody').on( 'click', 'tr', function () {
                   $(this).toggleClass('selected');
                  //Add a break between information and selection lines
 					//$('.select-info').prepend("<br/>")
                   // dbTable.draw();
            });
    		
        }
 		 
		else {
        	dbTable = $('#datatable').DataTable({ 
        	"sDom": '<f><l><i>rt<p><"clear">',
        	/*"dom": '<"top"fli>rt<"bottom"p><"clear">',*/
            data: WCDARecordList,
            "searching": true,
                select: {
                    style:'os'
                },
                
                                   
            columns:[
                {'data': 'recordNumber'}, 			//1
                {'data': 'Name'},						//2
                {'data': 'Route__c'}, 					//3
                {'data': 'Division'}, 				//4
                {'data': 'MarketArea__c'}, 			//5
				{'data': 'Assigned__c'},			//6
                {'data': 'ACC__c'},					//7
                {'data': 'Closed_Removed_Total__c'},//8
                {'data': 'ClosedSale__c'},			//9
                {'data': 'Closed_TBR_Total__c'},	//10
                {'data': 'EligTypeG__c'},			//11
                {'data': 'LeadCount__c'},			//12
                {'data': 'MDUYes__c'},				//13
                {'data': 'MDUNo__c'},				//14
                {'data': 'Workable__c'},			//15
                {'data': 'Wireless__c'},			//16
                
                {'data': 'X1G_Total__c'},			//18
                {'data': 'IPTV_Eligible__c'},		//19
                {'data': 'X1_5M_Total__c'},			//20
                {'data': 'X100M_Total__c'},			//21
                {'data': 'LiveYes__c'},				//22
                {'data': 'LiveNo__c'},				//23
                {'data': 'Red__c'},					//24
                {'data': 'Total12MoCancelsAll__c'},	//25
                {'data': 'Total12MoDisconnectsAll__c'},//26
                {'data': 'Total12MoSalesAll__c'},	//27
                {'data': 'Total12MoSalesD2D__c'},	//28
                {'data': 'DoNotKnock__c'},			//29
                {
     			 "data": "Clock__c", 
      			  "defaultContent": ""
    			},
                {
     			 "data": "FriendlyName__c", 
      			  "defaultContent": ""
    			},
                
            	]
                });
                
              }

              //@ACS - start [01-sept-2017]              
              //@ACS - search boxes are moved to top of the table below column headers
              
              $('#datatable thead th').each(function(idx){
                //Not needed for serial number and id column
                var findElement = $.inArray(idx + 1, skipColumnSearch);
                	
                //console.log('element found ->' + findElement);
                if(findElement === -1){
                		var title = $('#datatable thead th').eq(idx).text();
                		$(this).html('<div>'+title+'</div> <input class="slds-input" type="text" placeholder="Search '+  title +'"/>');
                	}
                });
                
                
                dbTable.columns().every(function(){
                   var dbTableColumn = this;
                	$(this.header()).find('input').on('keyup change', function(){
                	console.log('inside keyup event' + this.value);
                	
                	dbTableColumn.search(this.value).draw();
                
                	});
                });
                
                                                
                /*$('#datatable tfoot th').each(function(idx){
                //Not needed for serial number and id column
                var findElement = $.inArray(idx + 1, skipColumnSearch);
                	
                //console.log('element found ->' + findElement);
                if(findElement === -1){
                		var title = $('#datatable thead th').eq(idx).text();
                		$(this).html('<input type="text" placeholder="Search '+  title +'"/>');
                	}
                });
                
              
                
                
                dbTable.columns().every(function(){
                   var dbTableColumn = this;
                	$(this.footer()).find('input').on('keyup change', function(){
                	console.log('inside keyup event' + this.value);
                	
                	dbTableColumn.search(this.value).draw();
                
                	});
                });
                
                */
                //@ACS - stop [01-sept-2017]
                
                $('#datatable tbody').on( 'click', 'tr', function () {
                   $(this).toggleClass('selected');
                	//Add a break between information and selection lines
 					//$('.select-info').prepend("<br/>")
                	//redraw the table
                	//dbTable.draw();
                });
                        
                $('#downloadDiv').click(function() {
                	var selectedRows = dbTable.rows('.selected').data();
                   /* if(selectedRows.length === 0){
                        alert('Select rows to move down to filtered table');
                        return;
                    }*/
                	for(var x = 0; x < selectedRows.length; x++){
                		//console.log(selectedRows[x]);
                        console.log(selectedRows[x].recordNumber);
                        
		            }
                    //remove it from the parent table
                    dbTable.rows('.selected').remove().draw();
                    
                    cmp.set("v.WCDASelectedRecords", selectedRows);
                	self.downloadDivClickHandler(cmp, selectedRows);
                 });
    },
    
    downloadDivClickHandler: function(cmp, selectedRows){
        console.log('downloadDivClickHandler - Enter');
        console.log('selectedRows ->' + selectedRows[0]);
        
        //fire the component event here 
        var compEvent = cmp.getEvent("compEvent");
        console.log('component event ->' + compEvent);
        compEvent.setParams({"WCDARecords" : selectedRows});
        compEvent.fire();
       
        console.log('downloadDivClickHandler - Exit');
        
    },
})