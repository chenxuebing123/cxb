angular.module('testcxbApp').controller("con",['$scope','$http','server','$cookieStore',"$cookies","$state",function ($scope,$http,server,$cookieStore,$cookies,$state) {
	if(($cookies.get('username',$scope.updata))&&($cookies.get('password',$scope.updata))){
		$state.go("c")
	}
	$scope.fn=function(){
       $http({
			url:server+"/users/login",
			method:"POST",
			data:$scope.updata
		}).success(function(e){
			/*alert("success")*/
			if($scope.cxb == true){
				$cookieStore.put("username",$scope.updata);
				$cookieStore.put("password",$scope.updata);
				var expireDate = new Date();
				expireDate.setDate(expireDate.getDate() + 6);
				// Setting a cookie
				$cookies.put('username', $scope.updata, {'expires': expireDate});
				$cookies.put('password', $scope.updata, {'expires': expireDate});
		   }
			$cookieStore.put('uid',e.uid);
			$state.go("c")
		})
	}	
}]).controller("app",['$scope','$http','server','$state',function ($scope,$http,server,$state) {
	$scope.fn1=function(){
		$http({
			url:server+"/users",
			method:"POST",
			data:$scope.updata
		}).success(function(e){
			alert("success")
			$state.go("a")
		})
	}
}]).controller("note",['$scope','$http','server','$state','$cookieStore',function ($scope,$http,server,$state,$cookieStore) {
	$scope.uid=$cookieStore.get("uid")
	$scope.bai=function(){
		$cookieStore.remove("username");
		$cookieStore.remove("password");
		$cookieStore.remove("uid");
		$state.go("a")
	}  
	$scope.a=0;
	$http({
        url:server+"/item",
        method:"GET",
        params:{"$skip":$scope.a,"$limit":5,"uid":$scope.uid}
      }).success(function(e){
         $scope.data=e;
    })
    
	$scope.add=function(five){
	  $scope.a=$scope.a+five;
      if($scope.a<0){
      	return
      }else{
        $http({
          url:server+"/item",
          method:"GET",
          params:{"$skip":$scope.a,"$limit":5,"uid":$scope.uid}
        }).success(function(e){
           $scope.data=e;
        })
     }
    }
    $scope.back=function(){
      window.history.back();
    }
    $scope.more=function(){
      $state.go("d")
    }
    $scope.del=function(e){
		$http({
			url:server+"/item/"+e.id,
			method:"delete",
		}).success(function(){
            $scope.data.splice($scope.data.indexOf(e),1)
		})
	}
    $scope.updata={"uid":$scope.uid}
    	$scope.tg=[]
	$scope.bad=function(aa){	
		if($scope.tg.indexOf(aa)==-1){
			$(".bad").attr("class","label label-primary bad")
            $scope.tg.push(aa)
		}else{
			$(".bad").attr("class","label label-info bad")
			$scope.tg.splice($scope.tg.indexOf(aa),1)
		}
	}
	$scope.hard=function(aa){
		if($scope.tg.indexOf(aa)==-1){
			$(".hard").attr("class","label label-primary hard")
            $scope.tg.push(aa)
		}else{
			$(".hard").attr("class","label label-info hard")
			$scope.tg.splice($scope.tg.indexOf(aa),1)
		}	
	}
	$scope.happy=function(aa){
		if($scope.tg.indexOf(aa)==-1){
			$(".happy").attr("class","label label-primary happy")
            $scope.tg.push(aa)
		}else{
			$(".happy").attr("class","label label-info happy")
			$scope.tg.splice($scope.tg.indexOf(aa),1)
		}	
	}
	$scope.good=function(aa){
		if($scope.tg.indexOf(aa)==-1){
			$(".good").attr("class","label label-primary good")
            $scope.tg.push(aa)
		}else{
			$(".good").attr("class","label label-info good")
			$scope.tg.splice($scope.tg.indexOf(aa),1)
		}	
	}
	$scope.scr=function(aa){
		if($scope.tg.indexOf(aa)==-1){
			$(".scr").attr("class","label label-primary scr")
            $scope.tg.push(aa)
		}else{
			$(".scr").attr("class","label label-info scr")
			$scope.tg.splice($scope.tg.indexOf(aa),1)
		}
	}
	$scope.yes=function(){
		$http({
			url:server+"/item",
			method:"post",
			data:{"title":$scope.title,"content":$scope.content,"uid":$scope.uid,"tag":$scope.tg}
		}).success(function(e){
			$http({
			url:server+"/tag",
			method:"post",
			data:{"tag":$scope.tg,"tid":[e.id]}
		}).success(function(e){
             $state.go("c")
		})
		   
		})
	}
}]).controller("str",['$scope','$http','server','$state','$stateParams',function ($scope,$http,server,$state,$stateParams) {
	$scope.back=function(){
      window.history.back();
    }
	$scope.data2=$stateParams;
	$scope.change=function(){
		$http({
			url:server+"/item/"+$scope.data2.id,
			method:"PUT",
			data:$scope.data2
		}).success(function(e){
			$state.go("c")
		})
	}
}])



 