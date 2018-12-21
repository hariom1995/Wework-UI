var mainData=[];
      var count=1;
      var buildingInfoStore = [];
      var checkedPopArray = [];
      var tempBuildArray =[];
      var tempBuildArray2=[];
      $(function () {
      	$.ajax({
      
      		type: "GET",
      		url: "http://127.0.0.1:8000/weDev/api/mail/cityBuildingList/",
      		success: function (data) {
      			var count = 10000;
      			var Did=0;
      			
      			var buildingNumArray=[0];
      			mainData=data;
      			$.each(data, function (index, data) {
      				var building = data.building_set;
      				var buildingCount=0;
      				$('#grand_parent').append('<ul class="mainparent'+count+'" id="p1' + count + '" style="border: 1px solid black; width: 600px; margin-top:100px;"><li><input data-appendid="'+Did+'" id="'+count+'" class="'+data.cityname+'" type="checkbox" data-cityid="'+data.id+'" onclick="selectMultiCheck(this.id); buildingStoreMultiple(this.id)" unchecked>' + data.cityname + '<ul class="parent'+count+'"></ul></li></ul>');
      				for (var i = 0; i < data.building_set.length; i++){
      					 var pclassName='parent'.concat(count);
      					 $(document.getElementsByClassName(pclassName)).append('<li class="child" id="build'+data.building_set[i].id+'" style="border: 1px solid black;"><input class="1'+data.cityname+'" type="checkbox" id="'+data.building_set[i].id+'", data-buildcityid="'+data.building_set[i].city+'" onclick="buildingStore(this.id,'+data.building_set[i].id+','+data.building_set[i].city+')" unchecked>'+data.building_set[i].buildingname+'</li>');
      					 buildingCount++;
      				}
      				buildingNumArray.push(buildingCount);
      				count++;
      				Did++;
      			});
      			// console.log(buildingNumArray);
      			tempBuildArray=buildingNumArray;
      			tempBuildArray2=tempBuildArray;
      			console.log(tempBuildArray2);
      		}
      	});
      });
      
      function buildingStoreMultiple(city_id){
      
      	var documentId=document.getElementById(city_id);
      	var className_parent ='.'.concat(documentId.className);
      	var className_child ='.1'.concat(documentId.className);
      	var dataCityId = $(className_parent).attr('data-cityid');
      	console.log('data cityId =', dataCityId);
      	var findPushCity = $(className_parent).attr('data-appendid');
      	var loopLimit = mainData[findPushCity].building_set.length;
      	var popLength =mainData[findPushCity].building_set.length;
      	// console.log(popLength);
      	// console.log($(className_parent).prop("checked"));


      	if($(className_parent).prop("checked") == true){
      		for(var i=0;i<loopLimit;i++){
      			// if(mainData[findPushCity].building_set[i].id != ){}
      			var loopcount=0;
      			for(var check = 0; check<buildingInfoStore.length;check++){
      				if (buildingInfoStore[check].id==mainData[findPushCity].building_set[i].id) {
      					loopcount++;
      				}
      			}
      			if (loopcount ==0) {
      				buildingInfoStore.push({
      				"id":mainData[findPushCity].building_set[i].id,
      				"b_id": mainData[findPushCity].building_set[i].id,
      				"c_id": mainData[findPushCity].building_set[i].city
      			});
      			}
      				
      			
 
      		}
      	} 

      	if ($(className_parent).prop("checked") == false) {
      		for(var h=0;h<buildingInfoStore.length;h++){
      			if(dataCityId!=buildingInfoStore[h].c_id){
      				checkedPopArray.push(buildingInfoStore[h]);
      			}
      		}
      		buildingInfoStore=[];
      		buildingInfoStore=checkedPopArray;
      		checkedPopArray=[];
      	}
      	// console.log(checkedPopArray);
      	console.log(buildingInfoStore);
     }
    
// --------------------------------------------------------------------------------------------------------------------
	function selectMultiCheck(parent_checkbox_id){
		var parent_document = document.getElementById(parent_checkbox_id);
		// console.log('this is the parent ID',parent_checkbox_id);

		
		var newPar = '#'.concat(parent_checkbox_id);
		console.log(newPar);
		var accessArrayByParams = $(newPar).attr('data-cityid');

		console.log('this is data attribute', accessArrayByParams);
      	var className_parent1 =parent_document.className;
      	var className_parent ='.'.concat(parent_document.className);
      	var className_child ='.1'.concat(parent_document.className);

     	var buildingLength=0;
     	var numOfBuilding=tempBuildArray2[accessArrayByParams];
     	console.log('this is the num of building',numOfBuilding);
      	$(document).on('click', className_parent, function(){
      		if ($(this).prop("checked")==true) {
      			$(className_child).prop("checked", true);
      			buildingLength=tempBuildArray2[accessArrayByParams];
      		}
      		else{
      			$(className_child).prop("checked", false);
      			buildingLength=0;
      		}
      		console.log(className_child.length);
      	});
      	$(document).on('click',className_child, function(){
      		if ($(this).prop("checked") == true) {
      			buildingLength++;
      		}
      		else if($(this).prop("checked") == false){
      			buildingLength--;
      		}
      		if (numOfBuilding == buildingLength) {
      			$(className_parent).prop("checked", true);
      		}
      		if (numOfBuilding != buildingLength) {
      			$(className_parent).prop("checked", false);
      		}
      		console.log(buildingLength);
      	});
	}
     	
      	

// ---------------------------------------------------------------------------------------------------------------

      function buildingStore(id,build_id,city_id){
      	var a_id='#'.concat(id);
      	if ($(a_id).prop("checked")) {
      			buildingInfoStore.push({
      			"id":id,
      			"b_id": build_id,
      			"c_id": city_id
      		});
      	}else{
      		var hid=id;
      		for( var i=0;i<buildingInfoStore.length;i++){
      			if (buildingInfoStore[i].id == hid) {
      				buildingInfoStore.splice(i, 1);
      			}
      		}

      	}

      	console.log(buildingInfoStore);
      }

      function passArrayNext(){
      	// localStorage.setItem('buildingInfoStore', JSON.stringify(buildingInfoStore));
      	alert('success');
      	// console.log(mainArray);
      }