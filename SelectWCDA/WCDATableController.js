({
	handleRunQuery : function(cmp, event, helper) {
        console.log('handleRunQuery - Enter');
        helper.processQueryResults(cmp, event, helper);
       	console.log('handleRunQuery - Exit');
		
	},
    handleCompEvent: function(cmp, event, helper){
        var appEvent = $A.get("e.c:updateSelectedTableEvent");
        var selectedRows = event.getParam("WCDARecords");
        console.log('Number of record selected ->' + selectedRows.length);
        console.log('appevent updateselected table ->' + appEvent);
        appEvent.setParams({"WCDARecords" : selectedRows});
        console.log('appevent update selected table ->' + appEvent);
        appEvent.fire();
        console.log('appevent fired update selected table ->' + appEvent);
    }
})