({
	processSelectedRecords : function(cmp, event, helper) {
		console.log('Process Selected Records. Enter');
        var WCDARecordList = event.getParams().WCDARecords;
        cmp.set("v.WCDARecordList", WCDARecordList);
        console.log('Number of records received ->' + WCDARecordList.length);
        console.log('Process Selected Records. Exit');
        helper.updateTable(cmp, WCDARecordList);
	},
    
    updateTable : function(cmp, WCDARecordList){
        
        var self = this;
        var dbTable;
        console.log('DBTable ->' + dbTable);
        /*if(dbTable != null){
        	dbTable.destroy();
        }*/
        
        console.log("api function ->" + $.fn.dataTable.isDataTable( '#datatable2' ));
        if ( $.fn.dataTable.isDataTable( '#datatable2' ) ) {
            dbTable = $('#datatable2').DataTable();
        	dbTable.rows.add(WCDARecordList).draw();
            
             $('#datatable2 tbody').on( 'click', 'tr', function () {
                   $(this).toggleClass('selected');
                });
    		
        }
 		 
		else {
            
            dbTable = $('#datatable2').DataTable({
            "sDom": '<f><l><i>rt<p><"clear">',
            data: WCDARecordList,
             "searching": true,
            "select": true,
                        
            columns:[
               {'data': 'recordNumber'}, 			//1
                {'data': 'Name'},						//2
                {'data': 'Route__c'}, 					//3
                {'data': 'Division'}, 				//4
                {'data': 'MarketArea__c'}, 			//5
				{'data': 'Assigned__c'},			//6
                {'data': 'ACC__c'},					//8
                {'data': 'Closed_Removed_Total__c'},//9
                {'data': 'ClosedSale__c'},			//10
                {'data': 'Closed_TBR_Total__c'},	//11	
                {'data': 'EligTypeG__c'},			//12
                {'data': 'LeadCount__c'},			//13
                {'data': 'MDUYes__c'},				//14
                {'data': 'MDUNo__c'},				//15
                {'data': 'Workable__c'},			//16
                {'data': 'Wireless__c'},			//17
                {'data': 'FriendlyName__c'},		//19
                {'data': 'X1G_Total__c'},			//22
                {'data': 'IPTV_Eligible__c'},		//23
                {'data': 'X1_5M_Total__c'},			//24
                {'data': 'X100M_Total__c'},			//25
                {'data': 'LiveYes__c'},				//26
                {'data': 'LiveNo__c'},				//27
                {'data': 'Red__c'},					//28
                {'data': 'Total12MoCancelsAll__c'},	//32
                {'data': 'Total12MoDisconnectsAll__c'},//33
                {'data': 'Total12MoSalesAll__c'},	//34
                {'data': 'Total12MoSalesD2D__c'},	//35
                {'data': 'DoNotKnock__c'},			//36
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
        
        
        /*dbTable = $('#datatable2').DataTable({
            data: WCDARecordList,
            "retrieve":true,
            "searching": true,
            "select": true,
                        
            columns:[
                {'data': 'recordNumber'},
                {'data': 'Id'},
                {'data': 'Name'},
                {'data': 'Division'},
                {'data': 'MarketArea__c'},
				{'data': 'Assigned__c'}                               
               
            	]
                });*/
                                
                               
                $('#datatable2 tbody').on( 'click', 'tr', function () {
                   $(this).toggleClass('selected');
                });
        
                                
                $('#uploadDiv').click(function() {
                	var selectedRows = dbTable.rows('.selected').data();
                   /* if(selectedRows.length === 0){
                        alert('Select rows to move up to parent table');
                        return;
                    }*/
                	for(var x = 0; x < selectedRows.length; x++){
                		//console.log(selectedRows[x]);
                        console.log(selectedRows[x].recordNumber);
                        
		            }
                    //remove it from the parent table
                    dbTable.rows('.selected').remove().draw();
                                        
                	self.uploadDivClickHandler(cmp, selectedRows, 'upload');
                 });
        
        
        
	},
    
    uploadDivClickHandler: function(cmp, selectedRows, type){
        console.log('uploadDivClickHandler - Enter');
        console.log('selectedRows ->' + selectedRows[0]);
        var source;
        if(type === 'upload'){
            source = 'MainTableUpdate';
        }
        else
        {	
            source = 'SaveRecords';
            selectedRows = $('#datatable2').DataTable().data();
            console.log('inside save records length ->' + selectedRows.length);
        }
       
                
        //fire the component event here 
        
        var compEvent = cmp.getEvent("compEvent");
        console.log('component event ->' + compEvent);
        compEvent.setParams({"WCDARecords" : selectedRows,
                             "source": source});
                                        
        compEvent.fire();
       
        console.log('uploadDivClickHandler - Exit');
        
    },
                        
                
})