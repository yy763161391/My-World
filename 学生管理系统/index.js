//数据信息 结构渲染的交互
(function(){
    var obj = {
        init:function(){
            this.bindEvent();
            this.dataList = [];
        },
        bindEvent:function(){
            var self = this;
            var flag = false;
            $('.student-list').on('click',function(){
                self.getData();
            });
            $('#submit-add').on('click',function(){
                var data = $('#student-form').serialize();
                $.ajax({
                    url:'http://api.duyiedu.com/api/student/addStudent?appkey=yinwensong_1550025623499',
                    data : data,
                    dataType:'jsonp',
                    success:function(){
                        alert('新增成功');
                        $('.student-list').trigger('click');
                    }
                })
            })
        },
        getData:function(){
            var self = this;
            $.ajax({
                    url: 'http://api.duyiedu.com/api/student/findAll?appkey=yinwensong_1550025623499',
                    dataType: 'jsonp',
                    success: function (data) {
                        self.dataList = data;
                        self.renderDom();
                    },
                    error:function(){
                        console.log('获取信息失败');
                    }
                    
                })
        },
        renderDom:function(){
            var self = this ;
            var str = [];
            var list = self.dataList.data;
            var len = list.length;
            if(len>0){
                for(var i=0;i<len; i++){
                    str += '<tr>\
                            <td>'+ list[i].sNo + '</td>\
                            <td>'+ list[i].name + '</td>\
                            <td>'+ (list[i].sex ? '女' : '男') + '</td>\
                            <td>'+ list[i].email + '</td>\
                            <td>'+ (new Date().getFullYear() - list[i].birth) + '</td>\
                            <td>'+ list[i].phone + '</td>\
                            <td>'+ list[i].address + '</td>\
                            <td>\
                                <button class="edit" data-index='+ i + '>编辑</button>\
                                <button class="del" data-index='+ i + '>删除</button>\
                            </td>\
                        </tr>';
                }
            }
            $('.s-list tbody').html(str);
            
            this.show();
        },
        show:function(){
            var self = this;
            $('.edit').on('click',function(){
                $('.modal').show();
                var i = $(this).parents('tr').index();
                var data = self.dataList.data[i];
                var form = $('#modal-form')[0];
                for(var prop in data){
                    form[prop] ? form[prop].value = data[prop] : ""; 
                }
                $('.submit').on('click',function(){
                    var data = $('#modal-form').serialize();
                    console.log(data);

 
                    $.ajax({
                        url:'http://api.duyiedu.com/api/student/updateStudent?appkey=yinwensong_1550025623499',
                        data:data,
                        dataType: 'jsonp',
                        success:function(){
                                alert('提交成功');     
                                $('.modal').hide();
                                $('.student-list').trigger('click');   
                                
                        }
                    })
                    return false;
                })
            })
            $('.del').on('click',function(){
                var i = $(this).parents('tr').index();
                var num = self.dataList.data[i].sNo;
                $('.del-modal').show();
                $('.sure-btn').on('click',function(){
                    $.ajax({
                    url:'http://api.duyiedu.com/api/student/delBySno?appkey=yinwensong_1550025623499',
                    data:{sNo:num},
                    dataType:'jsonp',
                    success:function(){
                        alert('删除成功');
                        $('.del-modal').hide();
                        $('.student-list').trigger('click');
                    }
                })
                })
                
            })
        },
    }
    obj.init();
})()
