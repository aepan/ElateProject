angular.module('app', ['ui.router'])
    .config(function ($stateProvider, $urlRouterProvider) {
        
        $urlRouterProvider.otherwise("/index");

        $stateProvider
            .state('index', {
                url: '/index',
                templateUrl: 'templates/menu_index.html',
                controller: function ($scope,$state) {
                    $scope.name = "Elate";
                    $scope.name_description = "Bar & Restaurant";
                    
                    $scope.tableNumber = 0;
                    $scope.tableNumberList = [0, 1, 2, 3, 4, 5, 6];
                    $scope.setTableNo = function (number) {
                        $scope.tableNumber = number;
                    }
                    $scope.people = 0;
                    $scope.increasePeople = function () {
                        $scope.people += 1;
                    }
                    $scope.decreasePeople = function () {
                        if ($scope.people != 0) {
                            $scope.people -= 1;
                        }
                    }
                    $scope.warning_show = false;
                    $scope.start_order = function () {
                        if ($scope.people != 0 && $scope.tableNumber != 0) {
                            $scope.warning_show = false;

                            var params = {
                                "tableNo": $scope.tableNumber,
                                "people": $scope.people
                            };
                            $state.go("type", params);
                        }
                        else if ($scope.people == 0 && $scope.tableNumber != 0) {
                            $scope.warning_show = true;
                            $scope.warning_text = "Input people number.";
                        }
                        else if ($scope.people != 0 && $scope.tableNumber == 0) {
                            $scope.warning_show = true;
                            $scope.warning_text = "Input table number.";
                        }
                        else {
                            $scope.warning_show = true;
                            $scope.warning_text = "Input people number and table number.";
                        }
                    }
                }
            })
            .state('type', {
                url: '/type',
                templateUrl: 'templates/menu_type.html',
                params: { 'tableNo': '', 'people': '' },
                resolve: {
                    buffetType: function () {
                        var type = [
                            {
                                name: "Premium",
                                price: 690,
                                main_image: "images/buffet_type/premium/menu_type_p1.png",
                                sub_image: ["images/buffet_type/premium/menu_type_p2.png",
                                            "images/buffet_type/premium/menu_type_p3.png",
                                            "images/buffet_type/premium/menu_type_p4.png",
                                            "images/buffet_type/premium/menu_type_p5.png",
                                            "images/buffet_type/premium/menu_type_p6.png",
                                            "images/buffet_type/premium/menu_type_p7.png",
                                            "images/buffet_type/premium/menu_type_p8.png",
                                            "images/buffet_type/premium/menu_type_p9.png",
                                            "images/buffet_type/premium/menu_type_p10.png",
                                            "images/buffet_type/premium/menu_type_p11.png",
                                            "images/buffet_type/premium/menu_type_p12.png",
                                            "images/buffet_type/premium/menu_type_p13.png",
                                            "images/buffet_type/premium/menu_type_p14.png",
                                            "images/buffet_type/premium/menu_type_p15.png"]
                            },
                            {
                                name: "Normal",
                                price: 490,
                                main_image: "images/buffet_type/normal/menu_type_n1.png",
                                sub_image: ["images/buffet_type/normal/menu_type_n2.png",
                                            "images/buffet_type/normal/menu_type_n3.png",
                                            "images/buffet_type/normal/menu_type_n4.png",
                                            "images/buffet_type/normal/menu_type_n5.png"]
                            }
                        ];
                        return type;
                    }
                },
                controller: function ($scope, $stateParams, $state, buffetType) {
                    console.log("type :::: tableNo : " + $stateParams.tableNo);
                    $scope.all_buffet_types = buffetType;
                    $scope.select_type = function (type_selected) {
                        var params = {
                            "tableNo": $stateParams.tableNo,
                            "people": $stateParams.people,
                            "buffet_type": type_selected,
                            "confirm_order": false
                        };
                        $state.go("soup", params);
                    }
                }
            })
            .state('soup', {
                url: '/soup',
                templateUrl: 'templates/menu_soup.html',
                params: { 'tableNo': '', 'people': '','buffet_type': '', "confirm_order": '' },
                resolve: {
                    soupType: function () {
                        var type = [
                            {
                                name_en: "Shabu Shabu Soup",
                                name_th: "ซุปชาบู ชาบู",
                                description: 'น้ำซุปใส รสชาติเบาบาง ได้ประโยชน์จากสาหร่ายคอมบุ ไม่มีคอลเลสเตอรอล',
                                type: "Both",
                                main_image: "images/soup/menu_soup_1.png",
                                
                            },
                            {
                                name_en: "Sukiyaki Soup",
                                name_th: "ซุปสุกี้ญี่ปุ่น",
                                description: "น้ำซุปสูตรดั้งเดิมที่รสชาติหอมหวาน กลมกล่อม เข้มข้น ด้วยรสโชยุ ผสมกับสาเกชั้นดีของญี่ปุ่น",
                                type: "Both",
                                main_image: "images/soup/menu_soup_2.png",
                            },
                            {
                                name_en: "Half Half Soup",
                                name_th: "ซุปชาบูชาบู & ซุปสกี้ญี่ปุ่น",
                                description: "น้ำซุปใส รสชาติเบาบาง ได้ประโยชน์จากสาหร่ายคอมบุ กับน้ำซุปสูตรดั้งเดิมที่รสชาติหอมหวานจากโชยุ",
                                type: "Premium",
                                main_image: "images/soup/menu_soup_3.png",
                            }
                        ];
                        return type;
                    }
                },
                controller: function ($scope, $stateParams, $state, soupType) {
                    $scope.all_soup_types = soupType;
                    $scope.buffetType_selected = $stateParams.buffet_type.name;
                    $scope.go_back = function () {
                        
                        var params = {
                            "tableNo": $stateParams.tableNo,
                            "people": $stateParams.tableNo
                        };
                        $state.go("type", params);
                    }
                    $scope.select_soup = function (type_selected) {
                        
                        var params = {
                            "tableNo": $stateParams.tableNo,
                            "people": $stateParams.people,
                            "buffet_type": $stateParams.buffet_type,
                            "confirm_order": false,
                            "soup_type": type_selected,
                            "order": null,
                            "all_order": []
                        };
                        $state.go("menu", params);
                    }
                }
            })
            .state('menu', {
                url: '/menu',
                templateUrl: 'templates/menu_list.html',
                params: { 'tableNo': '', 'people': '', 'buffet_type': '', 'confirm_order': '', 'soup_type': '', 'order': '', 'all_order': '' },
                resolve: {
                    menuCategories: function () {
                        var type = ["Shabu", "Vegetable", "Sushi", "Other", "Beverage/Dessert"];
                        return type;
                    },
                    menuList: function () {
                        var type = [
                            {
                                name_th: "กุ้งแม่น้ำ",
                                name_en: "River Shrimp",
                                quantity: 0,
                                price: "80",
                                type: "Premium",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_1.png",
                            },
                            {
                                name_th: "หอยแมลงภู่นิวซีแลนด์",
                                name_en: "Sea mussel Newzealand",
                                quantity: 0,
                                price: "80",
                                type: "Premium",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_2.png",
                            },
                            {
                                name_th: "เนื้อแกะนิวซีแลนด์",
                                name_en: "Mutton Newzealand",
                                quantity: 0,
                                price: "80",
                                type: "Premium",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_3.png",
                            },
                            {
                                name_th: "เนื้อน่องลายโคขุน",
                                name_en: "Jarret",
                                quantity: 0,
                                price: "80",
                                type: "Premium",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_4.png",
                            },
                            {
                                name_th: "เนื้อสันคอออสเตเรีย",
                                name_en: "Chuck Australia",
                                quantity: 0,
                                price: "80",
                                type: "Premium",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_5.png",
                            },
                            {
                                name_th: "ปลาซาบะชิลี",
                                name_en: "Saba Chile",
                                quantity: 0,
                                price: "50",
                                type: "Both",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_6.png",
                            },
                            
                            {
                                name_th: "เนื้อโหนก โคขุน",
                                name_en: "Hump",
                                quantity: 0,
                                price: "70",
                                type: "Both",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_7.png",
                            },
                            {
                                name_th: "ปลาดอลลี่",
                                name_en: "Dory Fillet",
                                quantity: 0,
                                price: "25",
                                type: "Both",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_8.png",
                            },
                            {
                                name_th: "ปลาแซลมอนนอร์เวย์",
                                name_en: "Selmon Norway",
                                quantity: 0,
                                price: "80",
                                type: "Premium",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_9.png",
                            },
                            {
                                name_th: "กุ้งแก้ว",
                                name_en: "Shrimp",
                                quantity: 0,
                                price: "80",
                                type: "Premium",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_10.png",
                            },
                            {
                                name_th: "ปลาหมึกกล้วยชิลี",
                                name_en: "Squid Chile",
                                quantity: 0,
                                price: "80",
                                type: "Premium",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_11.png",
                            },
                            {
                                name_th: "เนื้อหมูคุโรบูตะ",
                                name_en: "Kurobuta pork",
                                quantity: 0,
                                price: "80",
                                type: "Premium",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_12.png",
                            },
                            {
                                name_th: "เบค่อนสดริ๊ป",
                                name_en: "Bacon",
                                quantity: 0,
                                price: "80",
                                type: "Premium",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_13.png",
                            },
                            {
                                name_th: "หมูนุ่มหมักน้ำมันงา",
                                name_en: "Marinated pork",
                                quantity: 0,
                                price: "80",
                                type: "Premium",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_14.png",
                            },
                            {
                                name_th: "หมูสามชั้น",
                                name_en: "Streaky pork",
                                quantity: 0,
                                price: "30",
                                type: "Both",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_15.png",
                            },
                            {
                                name_th: "สันคอหมู",
                                name_en: "Pork shoulder",
                                quantity: 0,
                                price: "30",
                                type: "Both",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_16.png",
                            },
                            {
                                name_th: "ไส้กรอกเวียนนา",
                                name_en: "Vienna sausage",
                                quantity: 0,
                                price: "30",
                                type: "Premium",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_17.png",
                            },
                            {
                                name_th: "สะโพกไก่",
                                name_en: "Chicken thigh",
                                quantity: 0,
                                price: "30",
                                type: "Both",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_18.png",
                            },
                            {
                                name_th: "เต้าหู้ปลา",
                                name_en: "Tofu fish ",
                                quantity: 0,
                                price: "30",
                                type: "Premium",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_19.png",
                            },
                            {
                                name_th: "สะโพกไก่สไลด์",
                                name_en: "Chicken thigh slide",
                                quantity: 0,
                                price: "35",
                                type: "Both",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_20.png",
                            },
                            {
                                name_th: "เส้นชิราตากิ",
                                name_en: "",
                                quantity: 0,
                                price: "30",
                                type: "Premium",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_49.png",
                            },
                            {
                                name_th: "อุด้ง",
                                name_en: "U-Dong",
                                quantity: 0,
                                price: "20",
                                type: "Both",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_50.png",
                            },
                            {
                                name_th: "ไข่ไก่",
                                name_en: "Egg",
                                quantity: 0,
                                price: "10",
                                type: "Both",
                                category: "Shabu",
                                status: "Order",
                                main_image: "images/list/menu_select_54.png",
                            },
                            {
                                name_th: "เห็ดภูฏาน",
                                name_en: "Bhutan mushroom",
                                quantity: 0,
                                price: "50",
                                type: "Both",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_21.png",
                            },
                            {
                                name_th: "เห็ดออรินจิ",
                                name_en: "Orinji Mushroom",
                                quantity: 0,
                                price: "50",
                                type: "Both",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_22.png",
                            },
                            {
                                name_th: "เห็ดหอมสด",
                                name_en: "Chinese mushroom",
                                quantity: 0,
                                price: "40",
                                type: "Both",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_23.png",
                            },
                            {
                                name_th: "เห็ดเข็มทอง",
                                name_en: "Golden Needle Mushroom",
                                quantity: 0,
                                price: "25",
                                type: "Both",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_24.png",
                            },
                            {
                                name_th: "แครอท",
                                name_en: "Carrot",
                                quantity: 0,
                                price: "20",
                                type: "Both",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_25.png",
                            },
                            {
                                name_th: "ผักกาดขาว",
                                name_en: "Chinese Cabbage",
                                quantity: 0,
                                price: "30",
                                type: "Both",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_26.png",
                            },
                            {
                                name_th: "ผักกวางตุ้ง",
                                name_en: "Chinese mustard green",
                                quantity: 0,
                                price: "35",
                                type: "Both",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_27.png",
                            },
                            {
                                name_th: "ข้าวโพดหวาน",
                                name_en: "Sweet corn",
                                quantity: 0,
                                price: "20",
                                type: "Both",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_28.png",
                            },
                            {
                                name_th: "ฟักทอง",
                                name_en: "Pumpkin",
                                quantity: 0,
                                price: "20",
                                type: "Both",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_29.png",
                            },
                            {
                                name_th: "หอมใหญ่",
                                name_en: "Onion",
                                quantity: 0,
                                price: "20",
                                type: "Both",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_30.png",
                            },
                            {
                                name_th: "สาหร่ายวากาเมะ",
                                name_en: "Seaweed wakame ",
                                quantity: 0,
                                price: "20",
                                type: "Premium",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_31.png",
                            },
                            {
                                name_th: "ต้นหอมญี่ปุ่น",
                                name_en: "Japanese Bunching Onion",
                                quantity: 0,
                                price: "30",
                                type: "Both",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_32.png",
                            },
                            {
                                name_th: "ผักปวยเล้ง",
                                name_en: "Spinach",
                                quantity: 0,
                                price: "20",
                                type: "Premium",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_33.png",
                            },
                            {
                                name_th: "กะหล่ำปลี",
                                name_en: "Cabbage",
                                quantity: 0,
                                price: "25",
                                type: "Both",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_34.png",
                            },
                            {
                                name_th: "ผักบุ้งจีน",
                                name_en: "Chinese Water Convolvulus",
                                quantity: 0,
                                price: "20",
                                type: "Both",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_35.png",
                            },
                            {
                                name_th: "ข้าวโพดอ่อน",
                                name_en: "Baby corn",
                                quantity: 0,
                                price: "20",
                                type: "Both",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_36.png",
                            },
                            {
                                name_th: "มะเขือม่วง",
                                name_en: "Purple Eggplant",
                                quantity: 0,
                                price: "20",
                                type: "Premium",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_37.png",
                            },
                            {
                                name_th: "ผักกาดหอม",
                                name_en: "Lettuce",
                                quantity: 0,
                                price: "20",
                                type: "Premium",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_38.png",
                            },
                            {
                                name_th: "ผักกวางตุ้งไต้หวัน",
                                name_en: "Taiwan mustard greent",
                                quantity: 0,
                                price: "20",
                                type: "Premium",
                                category: "Vegetable",
                                status: "Order",
                                main_image: "images/list/menu_select_39.png",
                            },
                            {
                                name_th: "แซลมอนนอร์เวย์ซาชิมิ",
                                name_en: "Salmon Sashimi",
                                quantity: 0,
                                price: "30",
                                type: "Premium",
                                category: "Sushi",
                                status: "Order",
                                main_image: "images/list/menu_select_40.png",
                            },
                            {
                                name_th: "กุ้งเทมปุระ",
                                name_en: "Tempura",
                                quantity: 0,
                                price: "30",
                                type: "Premium",
                                category: "Sushi",
                                status: "Order",
                                main_image: "images/list/menu_select_41.png",
                            },
                            {
                                name_th: "ข้าวห่อสาหร่ายคลุกไข่กุ้ง",
                                name_en: "",
                                quantity: 0,
                                price: "30",
                                type: "Premium",
                                category: "Sushi",
                                status: "Order",
                                main_image: "images/list/menu_select_42.png",
                            },
                            {
                                name_th: "ข้าวห่อสาหร่ายไส้รวม",
                                name_en: "",
                                quantity: 0,
                                price: "30",
                                type: "Premium",
                                category: "Sushi",
                                status: "Order",
                                main_image: "images/list/menu_select_43.png",
                            },
                            {
                                name_th: "คานิโรล",
                                name_en: "",
                                quantity: 0,
                                price: "30",
                                type: "Premium",
                                category: "Sushi",
                                status: "Order",
                                main_image: "images/list/menu_select_44.png",
                            },
                            {
                                name_th: "ข้าวปั้นหน้าไข่หวาน",
                                name_en: "",
                                quantity: 0,
                                price: "30",
                                type: "Both",
                                category: "Sushi",
                                status: "Order",
                                main_image: "images/list/menu_select_45.png",
                            },
                            {
                                name_th: "ข้าวปั้นหน้าปูอัด",
                                name_en: "",
                                quantity: '0',
                                price: "30",
                                type: "Both",
                                category: "Sushi",
                                status: "Order",
                                main_image: "images/list/menu_select_46.png",
                            },
                            {
                                name_th: "ข้าวปั้นหน้าทูน่า",
                                name_en: "",
                                quantity: 0,
                                price: "30",
                                type: "Premium",
                                category: "Sushi",
                                status: "Order",
                                main_image: "images/list/menu_select_47.png",
                            },
                            {
                                name_th: "ข้าวปั้นหน้าแซลม่อนนอร์เวย์",
                                name_en: "",
                                quantity: 0,
                                price: "30",
                                type: "Premium",
                                category: "Sushi",
                                status: "Order",
                                main_image: "images/list/menu_select_48.png",
                            },
                            {
                                name_th: "ผักยำ",
                                name_en: "Vegetable salad",
                                quantity: 0,
                                price: "30",
                                type: "Premium",
                                category: "Other",
                                status: "Order",
                                main_image: "images/list/menu_select_51.png",
                            },
                            {
                                name_th: "แซลมอนยำตะไคร้",
                                name_en: "Salmon salad",
                                quantity: 0,
                                price: "30",
                                type: "Premium",
                                category: "Other",
                                status: "Order",
                                main_image: "images/list/menu_select_52.png",
                            },
                            {
                                name_th: "ยำสาหร่าย",
                                name_en: "Seaweed salad",
                                quantity: 0,
                                price: "30",
                                type: "Premium",
                                category: "Other",
                                status: "Order",
                                main_image: "images/list/menu_select_53.png",
                            },
                            {
                                name_th: "ไข่ตุ๋น",
                                name_en: "Steamed egg",
                                quantity: 0,
                                price: "30",
                                type: "Premium",
                                category: "Other",
                                status: "Order",
                                main_image: "images/list/menu_select_55.png",
                            },
                            {
                                name_th: "เต้าหู้คินุ",
                                name_en: "Kinu Tofu",
                                quantity: 0,
                                price: "10",
                                type: "Both",
                                category: "Other",
                                status: "Order",
                                main_image: "images/list/menu_select_57.png",
                            },
                            {
                                name_th: "กิมจิ",
                                name_en: "Kimchi",
                                quantity: 0,
                                price: "10",
                                type: "Premium",
                                category: "Other",
                                status: "Order",
                                main_image: "images/list/menu_select_58.png",
                            },
                            {
                                name_th: "ข้าวผัดกระเทียม",
                                name_en: "Garlic fire rice",
                                quantity: 0,
                                price: "20",
                                type: "Both",
                                category: "Other",
                                status: "Order",
                                main_image: "images/list/menu_select_59.png",
                            },
                            {
                                name_th: "ข้าวญี่ปุ่น",
                                name_en: "Japanese rice",
                                quantity: 0,
                                price: "20",
                                type: "Both",
                                category: "Other",
                                status: "Order",
                                main_image: "images/list/menu_select_60.png",
                            },
                            {
                                name_th: "ชาเขียวเย็น",
                                name_en: "Green Tea cold",
                                quantity: 0,
                                price: "20",
                                type: "Both",
                                category: "Beverage/Dessert",
                                status: "Order",
                                main_image: "images/list/menu_select_63.png",
                            },
                            {
                                name_th: "น้ำอัดลมเอส",
                                name_en: "Est",
                                quantity: 0,
                                price: "20",
                                type: "Both",
                                category: "Beverage/Dessert",
                                status: "Order",
                                main_image: "images/list/menu_select_62.png",
                            },
                            {
                                name_th: "น้ำเปล่า",
                                name_en: "Water",
                                quantity: 0,
                                price: "15",
                                type: "Both",
                                category: "Beverage/Dessert",
                                status: "Order",
                                main_image: "images/list/menu_select_64.png",
                            },
                            {
                                name_th: "ไอศกริมชาเขียวถั่วแดง",
                                name_en: "Ice cream green tea",
                                quantity: 0,
                                price: "30",
                                type: "Both",
                                category: "Beverage/Dessert",
                                status: "Order",
                                main_image: "images/list/menu_select_56.png",
                            }
                        ];
                        return type;
                    }
                },
                controller: function ($scope, $stateParams, $state, menuCategories, menuList) {
                    console.log("soup :::: tableNo : " + $stateParams.tableNo);

                    $scope.warning_order = false;

                    $scope.buffetType_selected = $stateParams.buffet_type.name;
                    $scope.isConfirm = $stateParams.confirm_order;

                    $scope.all_menu_type = [];

                    $scope.all_categories = menuCategories;
                    $scope.category_selected = menuCategories[0];

                    $scope.all_menu = menuList;
                    $scope.all_order = [];
                    
                    if ($stateParams.order.length > 0) {
                        for (var i = 0 ; i < $scope.all_menu.length ; i++) {
                            for (var j = 0 ; j < $stateParams.order.length ; j++) {
                                if ($scope.all_menu[i].name_en === $stateParams.order[j].name_en)
                                    $scope.all_menu[i].quantity = $stateParams.order[j].quantity;
                            }
                        }
                    }
                    else {
                        $scope.all_menu = menuList;
                    }
                    
                    for (var k = 0; k < $scope.all_menu.length; k++) {
                        if ($scope.all_menu[k].type == $scope.buffetType_selected || $scope.all_menu[k].type == 'Both') {
                            $scope.all_menu_type.push($scope.all_menu[k]);
                        }
                    }

                    $scope.decreaseItem = function (item) {
                        if (item.quantity > 0) {
                            item.quantity -= 1;
                        }
                    }
                    $scope.increaseItem = function (item) {
                        item.quantity += 1;
                    }
                    $scope.go_back = function () {
                        
                        var params = {
                            "tableNo": $stateParams.tableNo,
                            "people": $stateParams.people,
                            "buffet_type": $stateParams.buffet_type,
                            "confirm_order": false
                        }
                        $state.go("soup", params);
                    }
                    $scope.send_order = function () {
                        $scope.all_order = [];
                        for(var i = 0 ; i < $scope.all_menu_type.length ; i++){
                            if ($scope.all_menu_type[i].quantity > 0) {
                                $scope.all_order.push($scope.all_menu_type[i]);
                            }
                        }

                        if ($scope.all_order.length > 0) {
                            
                            var params = {
                                "tableNo": $stateParams.tableNo,
                                "people": $stateParams.people,
                                "buffet_type": $stateParams.buffet_type,
                                "confirm_order": false,
                                "soup_type": $stateParams.soup_type,
                                "order": $scope.all_order,
                                "all_order": $stateParams.all_order
                            };
                            $state.go("confirm", params);
                        }
                        else {
                            $scope.warning_order = true;
                        }
                    }
                }
            })
            .state('confirm', {
                url: '/confirm',
                templateUrl: 'templates/menu_confirm.html',
                params: { 'tableNo': '', 'people': '', 'buffet_type': '', 'confirm_order': '', 'soup_type': '', 'order': '', 'all_order':'' },
                controller: function ($scope, $stateParams, $state) {
                    $scope.warning_order = false;
                    $scope.order_list_confirm = $stateParams.order;
                    $scope.all_order_list = [];
                    $scope.all_order_list = $stateParams.all_order;
                    $scope.decreaseItem = function (item) {
                        if (item.quantity > 0) {
                            item.quantity -= 1;
                        }
                    }
                    $scope.increaseItem = function (item) {
                        item.quantity += 1;
                    }
                    $scope.remove_order = function (item) {
                        item.quantity = 0;
                        var index = $scope.order_list_confirm.indexOf(item);
                        $scope.order_list_confirm.splice(index, 1);
                    }
                    $scope.go_back = function () {
                        
                        var params = {
                            "tableNo": $stateParams.tableNo,
                            "people": $stateParams.people,
                            "buffet_type": $stateParams.buffet_type,
                            "confirm_order": false,
                            "soup_type": $stateParams.soup_type,
                            "order": $scope.order_list_confirm,
                            "all_order": $stateParams.all_order
                        };
                        $state.go("menu", params);
                    }
                    $scope.confirm_order = function () {

                        if ($scope.order_list_confirm.length > 0) {
                            for (var i = 0 ; i < $scope.order_list_confirm.length ; i++) {
                                if ($scope.order_list_confirm[i].quantity > 0) {
                                    $scope.all_order_list.push($scope.order_list_confirm[i]);
                                }
                            }
                            console.log("order : " + $scope.all_order_list);
                            var params = {

                                "tableNo": $stateParams.tableNo,
                                "people": $stateParams.people,
                                "buffet_type": $stateParams.buffet_type,
                                "confirm_order": true,
                                "soup_type": $stateParams.soup_type,
                                "order": $scope.order_list_confirm,
                                "all_order": $scope.all_order_list
                            };
                            $state.go("status", params);
                        }
                        else {
                            $scope.warning_order = true;
                        }
                    }
                }

            })
            .state('status', {
                url: '/status',
                templateUrl: 'templates/menu_status.html',
                params: { 'tableNo': '', 'people': '', 'buffet_type': '', 'confirm_order': '', 'soup_type': '', 'order': '', 'all_order': '' },
                controller: function ($scope, $stateParams, $state) {
                    $scope.order_list_status = $stateParams.all_order;
                    $scope.go_menu = function () {
                        
                        var params = {
                            "tableNo": $stateParams.tableNo,
                            "people": $stateParams.people,
                            "buffet_type": $stateParams.buffet_type,
                            "confirm_order": true,
                            "soup_type": $stateParams.soup_type,
                            "order": [],
                            "all_order": $stateParams.all_order
                        };
                        $state.go("menu", params);
                    }
                    $scope.check_bill = function () {
                        $('.modal-backdrop').remove();
                        var params = {
                            "tableNo": $stateParams.tableNo,
                            "people": $stateParams.people,
                            "buffet_type": $stateParams.buffet_type,
                            "confirm_order": true,
                            "soup_type": $stateParams.soup_type,
                            "order": [],
                            "all_order": $scope.all_order_list
                        };
                        $state.go("check", params);
                        
                    }
                }
            })
            .state('check', {
                url: '/check',
                templateUrl: 'templates/menu_checkBill.html',
                params: { 'tableNo': '', 'people': '', 'buffet_type': '', 'confirm_order': '', 'soup_type': '', 'order': '', 'all_order': '' },
                controller: function ($scope, $stateParams, $state) {
                    $scope.table = $stateParams.tableNo;
                    $scope.peopleNo = $stateParams.people;
                    $scope.buffet_type = $stateParams.buffet_type;
                    $scope.vat = Math.ceil(($scope.buffet_type.price * $scope.peopleNo) * 0.07);
                    $scope.total = Math.ceil(($scope.buffet_type.price * $scope.peopleNo) + $scope.vat);
                    $scope.each = Math.ceil($scope.total / $scope.peopleNo);
                }
            });
        
    });