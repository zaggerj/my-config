require("./system-setting.css");
require("../utils/ui");
angular.module("vdi.system")
    // 仲裁IP设置
    .controller("vmhaQuorumIpCtrl", function ($scope, $http, uihelper) {
        "ngInject"

        $scope.ip_loading = false;
        $scope.IP = '';
        $scope.IP_bak = '';
        $scope.is_modify = false;
        $scope.is_check_ping = false;
        $scope.is_ip_valid = false;
        $scope.save_loading = false;
        
        $scope.getIP = function(){
            $scope.IP = '';
            $scope.IP_bak = '';
            $scope.ip_loading = true;
            $http.get('/thor/system/settings/vmha-quorum-ip').then(resp => {
                let data = resp.data;
                let result = data.result || {};
                $scope.IP = result.vmha_quorum_ip;
                $scope.IP_bak = $scope.IP;
            }).catch(err => {
                console.log('err', err);
            }).finally(() => {
                $scope.ip_loading = false;
            });
        };
        $scope.getIP();

        $scope.toggleModify = function(val){
            $scope.is_modify = val;
            $scope.is_check_ping = false;
            $scope.is_ip_valid = false;
            $scope.save_loading = false;
            if(!val){
                $scope.IP = $scope.IP_bak;
            }
        };

        $scope.checkPing = function(){
            $scope.is_ip_valid = false;
            $scope.is_check_ping = true;
            $http.post("/check_ping", {
                remote_ip: $scope.IP,
                node_ip: '127.0.0.1'
            }).then(resp => {
                let data = resp.data;
                $scope.is_ip_valid = data.result;
                if(!$scope.is_ip_valid){
                    uihelper.i18nAlertError("该IP地址连接不通过");
                }
            }).catch(err => {
                console.log('err', err);
            }).finally(() => {
                $scope.is_check_ping = false;
            });
        };

        $scope.save = function () {
            $scope.save_loading = true;
            $http.post('/thor/system/settings/vmha-quorum-ip',{
                "vmha_quorum_ip": $scope.IP
            }).then(resp => {
                $scope.IP_bak = $scope.IP;
                $scope.is_modify = false;
            }).catch(err => {
                console.log('err', err);
            }).finally(() => {
                $scope.save_loading = false;
            });
        }
    })
    // 外网访问
    .controller("vdiSystemOutsideController", ["$scope", "$modal", "$$$I18N", "Outside", "AlarmPlicy", function ($scope, $modal, $$$I18N, Outside, AlarmPlicy) {
        $scope.enable_loading = false;
        $scope.save_loading = false;
        $scope.ips_loading = true;

        // 管理台服务端口
        // 获取端口
        $scope.query_port_Loading = false;
        $scope.http_port = null;
        $scope.queryPort = function(){
            $scope.http_port = null;
            $scope.query_port_Loading = true;
            Outside.queryPort(function(res){
                $scope.query_port_Loading = false;
                let http_port = res.http_port;
                if(typeof http_port !== 'undefined'){
                    $scope.http_port = http_port;
                    return false;
                }

                $scope.http_port = 80;        // 查无端口，设为默认值
            }, function(err){
                $scope.query_port_Loading = false;
            });
        };
        $scope.queryPort();

        // 设置端口
        $scope.save_port_loading = false;
        $scope.savePort = function(){
            $scope.save_port_loading = true;
            Outside.savePort({
                "http_port": $scope.http_port
            }, function(res){
                $scope.save_port_loading = false;
                $scope.http_port = res.http_port;
            }, function(err){
                $scope.save_port_loading = false;
                $scope.queryPort();
            })
        };


        Outside.query(function (res) {
            // var res = {
            // 	enable: true,
            // 	proxy_ip: "10.1.41.188",
            // 	computer_ips: ["10.1.41.17"]
            // };
            // var res = {
            // 	enable: false,
            // 	proxy_ip: "",
            // 	computer_ips: []
            // };
            $scope.enable = res.enable;
            $scope.IP = res.proxy_ip;
            $scope.hasIP = res.proxy_ip == "" ? false : true;
            $scope.computer_ips = res.computer_ips;

            AlarmPlicy.get_hosts(function (result) {
                $scope.ips_loading = false;
                // var consoleIP = result.result.filter(function(r){ return r.type=="control"; })[0].hosts[0].ip;
                // result.result.forEach(function(item){
                // 	item.hosts = item.hosts.filter(function(i){ return i.ip!==consoleIP })
                // });
                $scope.pools = result.result.filter(function (r) {
                    return r.hosts.length && r.type !== "control";
                });
            });
        })

        $scope.start = function () {
            if (!$scope.enable) {
                $scope.enable_loading = true;
                Outside.stop(function (res) {
                    $scope.enable_loading = false;
                    $scope.IP = null;
                    $scope.computer_ips = [];
                }, function (error) {
                    $scope.enable_loading = false;
                    $scope.enable = !$scope.enable;
                })
            }
        }
        $scope.save = function () {
            var computer_ips = [];
            if (!$scope.hasIP) {
                $scope.pools.forEach(function (item) {
                    item.hosts.forEach(function (host) {
                        computer_ips.push(host.ip);
                    })
                });

            } else {
                $scope.pools.forEach(function (item) {
                    item.hosts.forEach(function (host) {
                        var is_selected = $scope.computer_ips.filter(function (i) { return i === host.ip }).length;
                        if (is_selected) {
                            computer_ips.push(host.ip)
                        }
                    })
                });
            }
            if (computer_ips.length) {
                $scope.save_loading = true;
                Outside.save({
                    proxy_ip: $scope.IP,
                    computer_ips: computer_ips
                }, function (res) {
                    $scope.hasIP = true;
                    $scope.save_loading = false;
                    $scope.computer_ips = computer_ips;
                }, function (error) {
                    $scope.save_loading = false;
                })
            } else {
                $.bigBox({
                    title: $$$I18N.get("INFOR_TIP"),
                    content: $$$I18N.get("NO_OUSIDEIP"),
                    timeout: 6000
                });
            }
        }
    }])
    .controller("outsideAdvancedDialog", ["$scope", "$modalInstance", "AlarmPlicy", "Outside", function ($scope, $modalInstance, AlarmPlicy, Outside) {
        $scope.ips_loading = true;
        $scope.isSubmiting = false;
        AlarmPlicy.get_hosts(function (result) {
            $scope.ips_loading = false;

            // var consoleIP = result.result.filter(function(r){ return r.type=="control"; })[0].hosts[0].ip;
            // result.result.forEach(function(item){
            // 	item.hosts = item.hosts.filter(function(i){ return i.ip!==consoleIP })
            // });
            var pools = result.result.filter(function (r) {
                return r.hosts.length && r.type !== "control";
            });
            $scope.pools.splice(0);
            Array.prototype.push.apply($scope.pools, pools);

            if (!$scope.hasIP) {
                $scope.pools.forEach(function (item) {
                    item.hosts.forEach(function (host) {
                        host._selected = true;
                    })
                });
            } else {
                $scope.pools.forEach(function (item) {
                    item.hosts.forEach(function (host) {
                        var is_selected = $scope.computer_ips.filter(function (i) { return i === host.ip }).length;
                        if (is_selected) {
                            host._selected = true;
                        }
                    })
                });
            }
            $scope.pools.forEach(function (item) {
                var selected_length = item.hosts.filter(function (host) { return host._selected }).length;
                if (selected_length == item.hosts.length) {
                    item._selected = true;
                }
            });
        });

        $scope.checkOne = function (pool) {
            pool._selected = pool.hosts.every(function (h) { return h._selected });
        };
        $scope.checkAll = function (pool) {
            pool.hosts.forEach(function (h) {
                h._selected = pool._selected;
            });
        };
        $scope.checked = function () {
            var computer_ips = []
            $scope.pools && $scope.pools.forEach(function (item) {
                item.hosts.forEach(function (host) {
                    if (host._selected) {
                        computer_ips.push(host.ip)
                    }
                })
            });
            return computer_ips.length ? true : false;
        };
        $scope.ok = function () {
            var computer_ips = []
            $scope.pools.forEach(function (item) {
                item.hosts.forEach(function (host) {
                    if (host._selected) {
                        computer_ips.push(host.ip)
                    }
                })
            });
            $scope.isSubmiting = true;
            Outside.save({
                proxy_ip: $scope.IP,
                computer_ips: computer_ips
            }, function (res) {
                $scope.hasIP = true;
                $scope.computer_ips.splice(0);
                Array.prototype.push.apply($scope.computer_ips, computer_ips);
                $modalInstance.close();
                $scope.isSubmiting = false;
            }, function (error) {

            })
        };
        $scope.close = function () {
            $modalInstance.dismiss();
        };
    }])
    // 系统资源回收控制器
    .controller("vdiSystemRecycleController", ["$scope", "$modal", "$location", "$route", "$http", function ($scope, $modal, $location, $route, $http) {
        var RecycleCtrl = this;
        RecycleCtrl.public = {}, RecycleCtrl.person = {};
        // set_aside代表是否勾选闲置，active代表是否勾选断开连接
        let dataArr = ["set_aside", "keepalive_minutes", "active", "broken_min", "run", "run_aside"];
        // 获取教学桌面或个人桌面的资源回收数据 type：person, public
        RecycleCtrl.getRecycle = function (type) {
            RecycleCtrl[`${type}_loading`] = true;
            let url = `/thor/recycle/${type}`;
            $http.get(url).then((res) => {
                res = res.data;
                dataArr.forEach(data => {
                RecycleCtrl[type][data] = res.value[data];
                })
            }).finally(() => RecycleCtrl[`${type}_loading`] = false);
        }
        RecycleCtrl.getRecycle("public");
        RecycleCtrl.getRecycle("person");
        // 保存教学桌面或个人桌面的资源回收数据 type：person, public
        RecycleCtrl.saveRecycle = function (type) {
            RecycleCtrl[`${type}Save`] = true;
            let params = {};
            dataArr.forEach(data => {
                params[data] = RecycleCtrl[type][data]
            })
            params.keepalive_minutes = Number(params.keepalive_minutes);
            params.broken_min = Number(params.broken_min);
            let url = `/thor/recycle/${type}`;
            $http.post(url, {value: params}).then((res) => {
                RecycleCtrl[`${type}Edit`] = false;
                RecycleCtrl.getRecycle(type);
            }).finally(() => RecycleCtrl[`${type}Save`] = false);
        };
    }])
    // 系统时间同步控制器
    .controller("vdiSystemtimeSyncController", ["$scope", "$modal", "$route", "SystemTime", "$$$I18N", "formDate", function ($scope, $modal, $route, SystemTime, $$$I18N, formDate) {
        var SyncCtrl = this;
        // var oldSyncServer;
        SystemTime.getInternetSync(function (res) {
            SyncCtrl.internetSync = res.enable;
        }, function () { });

        SyncCtrl.setInternetSync = function (value) {
            SyncCtrl.loading_internet = true;
            SystemTime.internetSync({ enable: value }, function () {
                SyncCtrl.loading_internet = false;
            }, function () { SyncCtrl.loading_internet = false; })
            if (value) {
                SyncCtrl.updateSyncServer();
            }
        };

        SystemTime.querySyncServer(function (res) {
            SyncCtrl.servers = res.result;
            SyncCtrl.server = res.used !== "" ? res.used : res.result[0];
            // 保持对旧 server 引用
            // oldSyncServer = res.used;
        }, function () { });

        SyncCtrl.settingSyncs = [{
            id:1,
            name:'每十分钟同步'
        },{
            id:2,
            name:'每半个小时同步'
        },{
            id:3,
            name:'每小时同步'
        },{
            id:4,
            name:'每天同步'
        },{
            id:5,
            name:'每周同步'}]
        SyncCtrl.settingSync = SyncCtrl.settingSyncs[3]
        SyncCtrl.sync_disableSetting = false
        SyncCtrl.handleSyncClick = function() {
            console.log(SyncCtrl.settingSync)
        }
        SyncCtrl.handleSyncCancel = function() {
            SyncCtrl.settingSync = SyncCtrl.settingSyncs[3]
            SyncCtrl.sync_disableSetting = false
        }

        // SyncCtrl.isSyncServerChanged = function(){
        // 	// 不允许选择空值
        // 	if(!this.server) { return false; }
        // 	// 判断变化
        // 	if(oldSyncServer) {
        // 		return oldSyncServer !== this.server;
        // 	}
        // };

        SyncCtrl.updateSyncServer = function () {
            SyncCtrl.loading_updateServer = true;
            SystemTime.updateSyncServer({ time_server: SyncCtrl.server }, function (res) {
                // oldSyncServer = SyncCtrl.server;
                SyncCtrl.loading_updateServer = false;
                SyncCtrl.loadZone();
                $.bigBox({
                    title: $$$I18N.get("INFOR_TIP"),
                    content: $$$I18N.get("同步时间成功"),
                    timeout: 6000
                });
            }, function () {
                SyncCtrl.loading_updateServer = false;
                SyncCtrl.loadZone();
            })
        }

        // 时区
        SyncCtrl.startDateOptions = {
            formatYear: "yyyy-MM-dd",
            startingDay: 1
        };
        SyncCtrl.openStartDate = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            SyncCtrl.startDateOpened = true;
        }
        $scope.$on("matchInput", function (e, v) {
            $scope.matchInput = v;
        })
        var timeID;
        function updateTime (time) {
            var new_time = time;
            var timeArray = formDate.format(new Date(time), "hh:mm:ss").split(":");
            if (SyncCtrl.loopTime) {
                SyncCtrl.hours = timeArray[0];
                SyncCtrl.minutes = timeArray[1];
                SyncCtrl.seconds = timeArray[2];
                new_time = time + 1000;
                timeID = setTimeout(function () {
                    updateTime(new_time);
                }, 1000);
            } else {
                clearTimeout(timeID);
            }
        }

        SyncCtrl.loadZone = function () {
            clearTimeout(timeID);
            SyncCtrl.loading_zone = true;
            SystemTime.queryZone(function (res) {
                SyncCtrl.choose_time = res.date;
                SyncCtrl.loopTime = true;
                updateTime(res.timestamp);
                SyncCtrl.zones = res.timezones.map(function (item) {
                    item.value = $$$I18N.get(item.zones[0]);
                    return item;
                });
                SyncCtrl.zone = SyncCtrl.zones.filter(function (item) { return item.offset == res.zone })[0];
                SyncCtrl.loading_zone = false;
            }, function () { SyncCtrl.loading_zone = false; })
        };
        SyncCtrl.loadZone();
        SyncCtrl.updateZone = function () {
            SyncCtrl.updating_zone = true;
            // 格式化时间，0-9时前面加0
            if (SyncCtrl.hours.length == 1 && Number(SyncCtrl.hours) >= 0 && Number(SyncCtrl.hours) <= 9) {
                SyncCtrl.hours = "0" + SyncCtrl.hours
            }
            if (SyncCtrl.minutes.length == 1 && Number(SyncCtrl.minutes) >= 0 && Number(SyncCtrl.minutes) <= 9) {
                SyncCtrl.minutes = "0" + SyncCtrl.minutes
            }
            if (SyncCtrl.seconds.length == 1 && Number(SyncCtrl.seconds) >= 0 && Number(SyncCtrl.seconds) <= 9) {
                SyncCtrl.seconds = "0" + SyncCtrl.seconds
            }
            var time = formDate.format(new Date(SyncCtrl.choose_time), "yyyy-MM-dd");
            SystemTime.updateZone({
                "date": time,
                "time": SyncCtrl.hours + ":" + SyncCtrl.minutes + ":" + SyncCtrl.seconds,
                "zone": SyncCtrl.zone.offset
            }, function (res) {
                SyncCtrl.updating_zone = false;
                SyncCtrl.modifyTime = false;
                SyncCtrl.loadZone();
            }, function () { SyncCtrl.updating_zone = false; SyncCtrl.modifyTime = false; SyncCtrl.loadZone(); })

        }

    }])
    .controller("spiceConnectController", ["$scope", "$modal", "$$$I18N", "Spice", function ($scope, $modal, $$$I18N, Spice) {
        var spiceCtrl = this;
        spiceCtrl.getSpiceConnect = function () {
            spiceCtrl.loading = true;
            Spice.query(function (res) {
                spiceCtrl.mode = res.spice_jpeg_compression;
                spiceCtrl.loading = false;
            }, function (error) {
                spiceCtrl.loading = false;
            })
        };
        spiceCtrl.getSpiceConnect();
        spiceCtrl.saveSpiceConnect = function () {
            spiceCtrl.save = true;
            Spice.save({ spice_jpeg_compression: spiceCtrl.mode }, function (res) {
                spiceCtrl.save = false;
                spiceCtrl.getSpiceConnect();
                spiceCtrl.edit = false;
            }, function (error) {
                spiceCtrl.save = false;
            })
        };
    }])
    .controller("vdiSystemAutoclearController", ["$scope", "$modal", "$$$I18N", "Share", function ($scope, $modal, $$$I18N, Share) {
        var clearCtrl = this;
        clearCtrl.enable = true;
        clearCtrl.getClearTime = function () {
            clearCtrl.loading = true;
            Share.query(function (res) {
                clearCtrl.enable = res.value.enable;
                clearCtrl.day = res.value.day;
                var time = res.value.time.split(":");
                clearCtrl.hours = time[0];
                clearCtrl.minutes = time[1];
                clearCtrl.seconds = time[2];
                clearCtrl.loading = false;
            }, function (error) {
                clearCtrl.loading = false;
            })
        };
        clearCtrl.getClearTime();
        clearCtrl.saveClearTime = function () {
            if (clearCtrl.hours.length == 1 && Number(clearCtrl.hours) >= 0 && Number(clearCtrl.hours) <= 9) {
                clearCtrl.hours = "0" + clearCtrl.hours
            }
            if (clearCtrl.minutes.length == 1 && Number(clearCtrl.minutes) >= 0 && Number(clearCtrl.minutes) <= 9) {
                clearCtrl.minutes = "0" + clearCtrl.minutes
            }
            if (clearCtrl.seconds.length == 1 && Number(clearCtrl.seconds) >= 0 && Number(clearCtrl.seconds) <= 9) {
                clearCtrl.seconds = "0" + clearCtrl.seconds
            }
            var time = clearCtrl.hours + ":" + clearCtrl.minutes + ":" + clearCtrl.seconds;
            clearCtrl.save = true;
            Share.save({ value: { day: clearCtrl.day, time: time } }, function (res) {
            // Share.save({ value: { enable: clearCtrl.enable, day: clearCtrl.day, time: time } }, function (res) {
                clearCtrl.save = false;
                clearCtrl.getClearTime();
                clearCtrl.edit = false;
            }, function (error) {
                clearCtrl.save = false;
            })
        };
    }])
    .controller("vdiSystemEmailController", vdiSystemEmailController)
    .controller("ConfigIdentifyCtrl", ConfigIdentifyCtrl)
    .controller("SnapshotConfCtrl", SnapshotConfCtrl)

/**
 * 配置邮箱服务器控制器
 * @param {ng.IScope} $scope 
 * @param {ng.IHttpService} $http 
 */
function vdiSystemEmailController($scope, $http){
    let models = $scope.m = {
        loading: true,
        data: {
            smtp_server: "",
            smtp_port: "",
            ssl_enabled: false,
            smtp_username: "",
            smtp_password: "",
            sendto: [],
            bind_email_server: false
        },
        editable: false
    };
    function refresh () {
        models.loading = true;
        $http.get("/thor/system/settings/email", {
            params: {name: "email"}
        }).then((resp) => {
            if (resp.data.code == 0) {
                let val = resp.data.value;
                for (let key in models.data) {
                    models.data[key] = "";
                }
                if (Object.keys(val).length) {
                    models.data = val;
                }
                $scope.ConfigEmailForm.$setPristine(true);
            }
        }).finally(() => models.loading = false);
    }
    refresh();
    $scope.test = function(){
        models.loading = true;
        $http.post("/thor/sendmail", {
            name: "email",
            value: models.data
        }).then((resp) => {
            if (resp.data.code == 0) {
                // ignore
            }
        }).finally(() => models.loading = false);
    };
    $scope.save = function(){
        models.loading = true;
        $http.post("/thor/system/settings/email", {
            name: "email",
            value: models.data
        }).then((resp) => {
            if (resp.data.code == 0) {
                refresh();
                models.editable = false;
            }
        }).finally(() => models.loading = false);
    };
    $scope.cancel = function () {
        refresh();
        models.editable = false;
    }
}
function ConfigIdentifyCtrl ($scope, $http, uihelper) {
    "ngInject";
    let models = $scope.m = {
        editable: false,
        loading: false,
        host: "",
        port: ""
    }
    const refresh = function () {
        models.loading = true;
        $http.get("/thor/uaa/host").then((resp) => {
            if (resp.data.code == 0) {
                models.host = resp.data.uaa_host;
                models.port = resp.data.uaa_port * 1;
                $scope.configIdentifyForm.$setPristine(true);
            }
        }).finally(() => models.loading = false);
    }
    refresh();
    $scope.validForRelease = function () {
        return models.host && models.port;
    }
    $scope.identify = function () {
        models.loading = true;
        $http.post("/thor/uaa/service", {
            uaa_ip: models.host, 
            uaa_port: models.port
        }).then((resp) => {
            if (resp.data.code == 0) {
                uihelper.i18nAlert("IDENTIFY_CONFIG_SUCCESS_TIP");
                refresh();
                models.editable = false;
            }
        }).finally(() => models.loading = false);
    }
    $scope.cancel = function () {
        refresh();
        models.editable = false;
    }
    $scope.release = function () {
        uihelper.openModal({
            templateUrl: "views/vdi/dialog/system/uaa_release_address.html",
            controller: ReleaseCtrl,
            size: "sm"
        }).result.then(refresh);
    }
}
function ReleaseCtrl ($scope, $modalInstance, $http) {
    "ngInject";
    let models = $scope.m = {
        loading: false,
        relieve: false
    }
    $scope.ok = function () {
        models.loading = true;
        $http.delete("/thor/uaa/service", {
            data: {relieve: models.relieve}
        }).then(function (resp) {
            if(resp.data.code == 0) {
                $modalInstance.close();
            }
        }).finally(function () { models.loading = false; })
    }
    $scope.cancel = function () {
        $modalInstance.dismiss();
    }
}
function SnapshotConfCtrl ($scope, $http) {
    "ngInject"

    let models = $scope.m = {
        loading: false,
        enabled: false,
        saving: false,
    };
    $scope.load = function () {
        models.loading = true;
        let url = "/api/system/settings/restore_snapshot";
        $http.get(url).then(function (resp) {
            models.enabled = resp.data.setting.value.enabled;
        }).finally(function () {
            models.loading = false;
        });
    };
    $scope.save = function () {
        models.saving = true;
        let url = "/api/system/settings/restore_snapshot";
        let data = {
            data: {
                value: {
                    enabled: models.enabled,
                }
            }
        };
        $http.put(url, data).catch(function (err) {
            // 重置开关
            models.enabled = !models.enabled;
        }).finally(function () {
            models.saving = false;
        });
    };
    $scope.load();
}