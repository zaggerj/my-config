//js代码
angular.module('myapp',[])
.controller('myctr',['$scope',functioni($scope){
   $scope.myHtml='<button ng-click='showMess()'></button>';//模板变量
   $scope.showMess=function(){ //测试点击事件方法
    alert('hahah')
}
}])
.directive('compile',function($compile){
   return{
     restrict:'AE',
     link:function(scope,el,attr){
        el.append($compile(scope.$eval(attr['compile']))(scope));//因为attr['compile']是一个字符串,所以用$eval编译一下
        scope.$watch(function(){//监听模板字符串是否改变，改变重新编译
               return scope.$eval(attr['compile'])
         },function(){ // 改变之后的回调
                 //清空dom
                el.empty();
                //将编译后的模板插入到dom中
                el.append($compile(scope.$eval(attr['compile']))(scope));
        })
     }
   }
})
