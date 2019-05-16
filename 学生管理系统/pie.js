(function(){
    var obj = {
            init: function () {
                this.getData();
                this.option = {
                    title: {
                        text: '',
                        subtext: '纯属虚构',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
            },
            getData: function () {
                var self = this;
                $.ajax({
                    url: 'https://api.duyiedu.com/api/student/findAll?appkey=yinwensong_1550025623499',
                    dataType: 'json',
                    success: function (data) {
                        self.getArearChart(data.data);
                        self.getSexChart(data.data);
                    }
                })
            },
            getArearChart: function (data) {
                var legendArr = [], seriesArr = [];
                var numObj = {};
                data.forEach(function (ele, index) {
                    if (!numObj[ele.address]) {
                        numObj[ele.address] = 1;
                        legendArr.push(ele.address);
                    } else {
                        numObj[ele.address]++;
                    }
                })
                for (var prop in numObj) {
                    var obj = {};
                    obj.name = prop;
                    obj.value = numObj[prop];
                    seriesArr.push(obj);
                }
                var myChart = echarts.init(document.getElementsByClassName('area')[0]);
                this.option.title.text = '学生区域分布';
                this.option.legend.data = legendArr;
                this.option.series[0].data = seriesArr;
                myChart.setOption(this.option);
            },
            getSexChart: function (data) {
                var legendArr = [], seriesArr = [];
                var numObj = {};
                data.forEach(function (ele, index) {
                    if (!numObj[ele.sex ? '女' : '男']) {
                        numObj[ele.sex ? '女' : '男'] = 1;
                        legendArr.push(ele.sex ? '女' : '男');
                    } else {
                        numObj[ele.sex ? '女' : '男']++;
                    }
                })
                for (var prop in numObj) {
                    var obj = {};
                    obj.name = prop;
                    obj.value = numObj[prop];
                    seriesArr.push(obj);
                }
                var myChart = echarts.init(document.getElementsByClassName('sex')[0]);
                this.option.title.text = '学生性别分布';
                this.option.legend.data = legendArr;
                this.option.series[0].data = seriesArr;
                myChart.setOption(this.option);
            }
        }
        obj.init();
})()