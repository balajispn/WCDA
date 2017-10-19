({
	handleSelectedRecords : function(cmp, event, helper) {
        console.log('Handle Selected Records. Enter');
		helper.processSelectedRecords(cmp, event, helper);
        console.log('Handle Selected Records. Exit');
	},
    
    handleCompEvent: function(cmp, event, helper){
        var appEvent;
        
        var selectedRows = event.getParam("WCDARecords");
        var source = event.getParam("source");
        if(source === 'MainTableUpdate'){
        	appEvent = $A.get("e.c:UpdateMainTableEvent");
            appEvent.setParams({"WCDARecords" : selectedRows,
                            "source":'WCDASelectTable'});
            console.log('appevent update main table ->' + appEvent);
        }
        else{
            appEvent = $A.get("e.c:SaveRecords");
            appEvent.setParams({"WCDARecords" : selectedRows});
            console.log('appevent save action ->' + appEvent);
        }
        console.log('Number of record selected ->' + selectedRows.length);
        
                
        appEvent.fire();
        
    },
    fireSaveEvent: function(cmp, event, helper){
     console.log('fireSaveEvent. Enter');
      //display modalback up
     cmp.set("v.isOpen", true);
     var selectedRows = {}; 
     helper.uploadDivClickHandler(cmp, selectedRows, 'save');
     console.log('fireSaveEvent. Exit');
    },
    
    showLeadpackModal : function(component, event, helper){
    	component.set("v.isOpen", true);
    },
    
    hideLeadpackModal : function(component, event, helper) {
        component.set("v.isOpen", false);
    },
    
    clearTable : function(component, event, helper){
    	var dbTable;
    	if ( $.fn.dataTable.isDataTable( '#datatable2' ) ) {
            dbTable = $('#datatable2').DataTable();
            dbTable.clear();
            var selectedRows = {};
        	dbTable.rows.add(selectedRows).draw();
        }
    },
})