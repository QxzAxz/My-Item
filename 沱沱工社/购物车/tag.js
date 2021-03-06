﻿// VECN1WS1 at 18/01/2016 05:38:30
'use strict';
if (typeof veTagData === 'undefined') {
    var veTagData = (function () {
        var b,
            tag = document.getElementById('veConnect'),
            d = {
                journeycode: 'BC4164B3-ADCF-4CF8-A270-4172D068F5C0',
                captureConfigUrl: 'cdscn.ve-interactive.cn/CaptureConfigService.asmx/CaptureConfig',
                appsServicesUrl: 'appsapicn.ve-interactive.cn',
                veHostDomain: '//configcn.ve-interactive.cn',
                promoteLanding: 'cn.findrz.cn',

                captureConfig: {
  CaptureUrl: "cdscn.ve-interactive.cn/CaptureConfigService.asmx/CaptureConfig",
  customerid: 3000075,
  datareceiverurl: "cdscn.ve-interactive.cn/DataReceiverService.asmx/DataReceiver",
  Forms: [
    {
      ChatAgentId: null,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: ".product_image img",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 3000705,
          HtmlAttributeTag: "src",
          HtmlType: "img",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 13,
          HtmlPath: null
        },
        {
          ClientFieldName: ".detail_r_tit",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 3000706,
          HtmlAttributeTag: "Value",
          HtmlType: "p",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 11,
          HtmlPath: null
        },
        {
          ClientFieldName: "window.location.href",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 3000707,
          HtmlAttributeTag: "href",
          HtmlType: "a",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 10,
          HtmlPath: null
        },
        {
          ClientFieldName: "window.location.href",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 3000708,
          HtmlAttributeTag: "href",
          HtmlType: "a",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 29,
          HtmlPath: null
        },
        {
          ClientFieldName: "span[id^='price']",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 3000709,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 16,
          HtmlPath: null
        },
        {
          ClientFieldName: ".detail_product",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 3000710,
          HtmlAttributeTag: "Value",
          HtmlType: "div",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 12,
          HtmlPath: null
        },
        {
          ClientFieldName: ".detail_r_tit",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 3000711,
          HtmlAttributeTag: "Value",
          HtmlType: "p",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 18,
          HtmlPath: null
        }
      ],
      FormId: 3000216,
      FormTypeId: 4,
      FormURLs: [
        "tootoo.cn/product-*"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    },
    {
      ChatAgentId: null,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: "#Js-name [name='buyer_name']",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 3000802,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: true,
          FormMappingTypeId: 2,
          HtmlPath: null
        }
      ],
      FormId: 3000217,
      FormTypeId: 1,
      FormURLs: [
        "user.tootoo.cn/login.html"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    },
    {
      ChatAgentId: null,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: "email",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 3000712,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: true,
          FormMappingTypeId: 2,
          HtmlPath: ""
        },
        {
          ClientFieldName: ".cart_goods_record .splist_goodsl img",
          DomEvent: "OnLoad",
          FieldTypeName: "RawSeries",
          FormMappingId: 3000713,
          HtmlAttributeTag: "src",
          HtmlType: "img",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 13,
          HtmlPath: null
        },
        {
          ClientFieldName: ".splist_table.goodslist_cartpage.tab_cartpage td:nth-child(2) [target='_blank']",
          DomEvent: "OnLoad",
          FieldTypeName: "RawSeries",
          FormMappingId: 3000714,
          HtmlAttributeTag: "href",
          HtmlType: "a",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 29,
          HtmlPath: null
        },
        {
          ClientFieldName: ".splist_goodsr02 a",
          DomEvent: "OnLoad",
          FieldTypeName: "RawSeries",
          FormMappingId: 3000715,
          HtmlAttributeTag: "Value",
          HtmlType: "a",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 11,
          HtmlPath: null
        },
        {
          ClientFieldName: ".splist_table.goodslist_cartpage.tab_cartpage td:nth-child(2) [target='_blank']",
          DomEvent: "OnLoad",
          FieldTypeName: "RawSeries",
          FormMappingId: 3000716,
          HtmlAttributeTag: "href",
          HtmlType: "a",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 10,
          HtmlPath: null
        },
        {
          ClientFieldName: ".cart_ladder_discount",
          DomEvent: "OnLoad",
          FieldTypeName: "RawSeries",
          FormMappingId: 3000717,
          HtmlAttributeTag: "Value",
          HtmlType: "div",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 16,
          HtmlPath: null
        },
        {
          ClientFieldName: ".cart_quantity_prompt .amount_cartpage",
          DomEvent: "OnloadOnChange",
          FieldTypeName: "RawSeries",
          FormMappingId: 3000718,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 1,
          HtmlPath: null
        },
        {
          ClientFieldName: ".splist_table.goodslist_cartpage.tab_cartpage td:nth-child(3) [style='width:50px; float:left;']:not(:first)",
          DomEvent: "OnLoad",
          FieldTypeName: "RawSeries",
          FormMappingId: 3000719,
          HtmlAttributeTag: "Value",
          HtmlType: "td",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 12,
          HtmlPath: null
        },
        {
          ClientFieldName: "checkprice",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 3000720,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 8,
          HtmlPath: null
        },
        {
          ClientFieldName: "veConnect",
          DomEvent: "OnLoad",
          FieldTypeName: "Id",
          FormMappingId: 3000748,
          HtmlAttributeTag: "Id",
          HtmlType: "div",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 1,
          HtmlPath: null
        }
      ],
      FormId: 3000218,
      FormTypeId: 1,
      FormURLs: [
        "pay.tootoo.cn/cart-zh_cn.html"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    },
    {
      ChatAgentId: null,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: "pay_coupon_couponsn",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 3000723,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 7,
          HtmlPath: null
        },
        {
          ClientFieldName: "order_call_fee_dom",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 3000724,
          HtmlAttributeTag: "Value",
          HtmlType: "font",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 8,
          HtmlPath: null
        },
        {
          ClientFieldName: "veConnect",
          DomEvent: "OnLoad",
          FieldTypeName: "Id",
          FormMappingId: 3000749,
          HtmlAttributeTag: "Id",
          HtmlType: "div",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 1,
          HtmlPath: null
        }
      ],
      FormId: 3000219,
      FormTypeId: 1,
      FormURLs: [
        "pay.tootoo.cn/index.php"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: [
        {
          ParameterValue: "tConfirm",
          Paremeter: "r"
        }
      ]
    },
    {
      ChatAgentId: null,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: ".spanOrderCode:first",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 3000725,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 9,
          HtmlPath: null
        }
      ],
      FormId: 3000220,
      FormTypeId: 2,
      FormURLs: [
        "pay.tootoo.cn/ordersuccess_zh_cn.html"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    },
    {
      ChatAgentId: null,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: ".tcart_number",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 3000726,
          HtmlAttributeTag: "Value",
          HtmlType: "div",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 9,
          HtmlPath: null
        }
      ],
      FormId: 3000221,
      FormTypeId: 2,
      FormURLs: [
        "pay.tootoo.cn/payresult-201.php"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    },
    {
      ChatAgentId: null,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: "username",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Id",
          FormMappingId: 3001155,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: true,
          FormMappingTypeId: 2,
          HtmlPath: ""
        }
      ],
      FormId: 3000361,
      FormTypeId: 1,
      FormURLs: [
        "m.tootoo.cn/login_wap.html"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: []
    },
    {
      ChatAgentId: null,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: ".available_goods .goods-img img",
          DomEvent: "DynamicActivity",
          FieldTypeName: "RawSeries",
          FormMappingId: 3001156,
          HtmlAttributeTag: "src",
          HtmlType: "img",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 13,
          HtmlPath: ""
        },
        {
          ClientFieldName: ".available_goods h3",
          DomEvent: "DynamicActivity",
          FieldTypeName: "RawSeries",
          FormMappingId: 3001157,
          HtmlAttributeTag: "Value",
          HtmlType: "h3",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 11,
          HtmlPath: ""
        },
        {
          ClientFieldName: ".available_goods .cola01432 .fl",
          DomEvent: "DynamicActivity",
          FieldTypeName: "RawSeries",
          FormMappingId: 3001158,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 16,
          HtmlPath: ""
        },
        {
          ClientFieldName: ".t-number[min='1']",
          DomEvent: "DynamicActivity",
          FieldTypeName: "RawSeries",
          FormMappingId: 3001159,
          HtmlAttributeTag: "Value",
          HtmlType: ":text",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 1,
          HtmlPath: null
        },
        {
          ClientFieldName: ".cart_foot .cola01432:last",
          DomEvent: "DynamicActivity",
          FieldTypeName: "Raw",
          FormMappingId: 3001160,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 8,
          HtmlPath: null
        },
        {
          ClientFieldName: "veConnect",
          DomEvent: "OnLoad",
          FieldTypeName: "Id",
          FormMappingId: 3001191,
          HtmlAttributeTag: "Id",
          HtmlType: "div",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 1,
          HtmlPath: null
        }
      ],
      FormId: 3000362,
      FormTypeId: 1,
      FormURLs: [
        "m.tootoo.cn/index.php"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: [
        {
          ParameterValue: "tCheckout",
          Paremeter: "r"
        }
      ]
    },
    {
      ChatAgentId: null,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: "#li_order_goods_fee span:eq(1)",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 3001161,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 8,
          HtmlPath: null
        },
        {
          ClientFieldName: "online_select_pay",
          DomEvent: "OnChange",
          FieldTypeName: "Id",
          FormMappingId: 3001164,
          HtmlAttributeTag: "Value",
          HtmlType: "select",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 1,
          HtmlPath: null
        },
        {
          ClientFieldName: "veConnect",
          DomEvent: "OnLoad",
          FieldTypeName: "Id",
          FormMappingId: 3001192,
          HtmlAttributeTag: "Id",
          HtmlType: "div",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 1,
          HtmlPath: null
        }
      ],
      FormId: 3000363,
      FormTypeId: 1,
      FormURLs: [
        "m.tootoo.cn/index.php"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: [
        {
          ParameterValue: "tConfirm",
          Paremeter: "r"
        }
      ]
    },
    {
      ChatAgentId: null,
      EmailOptOut: false,
      FormFields: [
        {
          ClientFieldName: ".main .datetb .bold:first",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 3001162,
          HtmlAttributeTag: "Value",
          HtmlType: "span",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 9,
          HtmlPath: null
        },
        {
          ClientFieldName: ".main .datetb tr:eq(3)",
          DomEvent: "OnLoad",
          FieldTypeName: "Raw",
          FormMappingId: 3001163,
          HtmlAttributeTag: "Value",
          HtmlType: "td",
          IdentifyAbandonment: false,
          isEmail: false,
          FormMappingTypeId: 1,
          HtmlPath: null
        }
      ],
      FormId: 3000364,
      FormTypeId: 2,
      FormURLs: [
        "m.tootoo.cn/index.php"
      ],
      IdentifyAbandonmentOr: true,
      NumberIdentifiedFields: 0,
      Name: null,
      OptOuts: [],
      Paremeter: [
        {
          ParameterValue: "tPay/orderSuccess",
          Paremeter: "r"
        }
      ]
    }
  ],
  IdentifyAbandonmentOr: true,
  JourneyCode: "BC4164B3-ADCF-4CF8-A270-4172D068F5C0",
  JourneyId: 3000074,
  JourneyTimeOut: 1800,
  NumberIdentifiedFields: 0,
  OptOutField: 0
},
                /*
                 * The custom settings are based on the standard defined on Settings.js.
                 */
                settings: {
  domainsToIgnore: ['user.tootoo.cn', 'tootoo.cn', 'pay.tootoo.cn'],
  consoleMessagesEnabled: true,
  autocompleteInputsHandler: [],
  cookies: {
    enabled: true,
    timeToLive: 60
  },

  elementsStoppingAppsOnEvent: [{
    elementQuery: '.cart_btn_m a',
    eventType: 'click',
    doesElementExistOnLoad: true
  }, {
    elementQuery: '#reloadDiv>div>div>p>select',
    eventType: 'click',
    doesElementExistOnLoad: true
  }, {
    elementQuery: '#reloadDiv>div>div>p>select',
    eventType: 'click',
    doesElementExistOnLoad: true
  }, {
    elementQuery: '.cart_settl.margin_top_10 a',
    eventType: 'click',
    doesElementExistOnLoad: true
  }, {
    elementQuery: '.cart_btn_m a',
    eventType: 'click',
    doesElementExistOnLoad: true
  }, {
    elementQuery: '.delone_cartpage.cart1_new_curr',
    eventType: 'click',
    doesElementExistOnLoad: true
  }, {
    elementQuery: '.subimg a img',
    eventType: 'click',
    doesElementExistOnLoad: true
  }],
  keywordsRegExp: [{
    ssource: 'Product URL',
    regexp: /(\/product)/,
    replaceCharactersBySpace: '-',
    customRegExp: function(s) {
      var a = document.querySelector("#reloadDiv p").innerHTML;
      if (a) {
        return a;
      }
      return '';
    },
    notSearchEngine: false,
    storeSearchTerm: false,
    showNoProducts: false,
    ignoreCloses: false
  }, {
    ssource: 'Category Menu URL',
    regexp: /(\/list)/,
    replaceCharactersBySpace: '-',
    customRegExp: function(s) {
      var a = document.querySelector(".t_pnav").textContent.split(">").pop(-1);
      if (a) {
        return a;
      }
      return '';
    },
    notSearchEngine: false,
    storeSearchTerm: false,
    showNoProducts: false,
    ignoreCloses: false
  }, {
    ssource: 'Category youjiguan URL',
    regexp: /(youjiguan)/,
    replaceCharactersBySpace: '-',
    customRegExp: function(s) {
      var a = document.querySelector(".second_grab_name a").innerHTML;
      if (a) {
        return a;
      }
      return '';
    },
    notSearchEngine: false,
    storeSearchTerm: false,
    showNoProducts: false,
    ignoreCloses: false
  }, {
    ssource: 'Category ongoing URL',
    regexp: /(ongoing)/,
    replaceCharactersBySpace: '-',
    customRegExp: function(s) {
      var a = document.querySelector(".newtuan_cont_name a").innerHTML;
      if (a) {
        return a;
      }
      return '';
    },
    notSearchEngine: false,
    storeSearchTerm: false,
    showNoProducts: false,
    ignoreCloses: false
  }, {
    ssource: 'Category actlist URL',
    regexp: /(\/actlist)/,
    replaceCharactersBySpace: '-',
    customRegExp: function(s) {
      var a = document.querySelector(".top_title_p1 a").innerHTML;
      if (a) {
        return a;
      }
      return '';
    },
    notSearchEngine: false,
    storeSearchTerm: false,
    showNoProducts: false,
    ignoreCloses: false
  }],
  //veChat
  appsForms: [{
    appName: 'assist',
    appAgents: ["3000029"],
    priority: 1,
    blackListUseRegex: false,
    whiteListUseRegex: false,
    FormBlackListURLs: ['pay.tootoo.cn/payresult-201.php'],
    FormId: 20238,
    FormTypeId: 6,
    FormURLs: ['tootoo.cn/*', 'tootoo.cn/*/*'],
    Paremeter: []
  }, {
    appName: 'chat',
    appAgents: ["3000028"],
    priority: 2,
    blackListUseRegex: false,
    whiteListUseRegex: false,
    FormBlackListURLs: ['pay.tootoo.cn/payresult-201.php'],
    FormId: 20237,
    FormTypeId: 6,
    FormURLs: ['pay.tootoo.cn/cart-zh_cn.html', 'm.tootoo.cn/index.php'],
    Paremeter: []
  }],

  veAds: {

    config: {
      timeStamp: 'Mon June 08 2015 16:36:48 GMT+1000 (AUS Eastern Standard Time)',
      version: '2.0.0.beta1',
      uuid: 'abc',
      storageAcrossProtocols: true,
      avoidDOM: true
    },

    pages: [{
      // ID's unique among the pages
      id: 1,
      name: 'Complete Page',
      type: 'conversion',
      urls: [{
        url: 'pay.tootoo.cn/ordersuccess_zh_cn.html',
        params: {} // no params to check
      }, {
        url: 'pay.tootoo.cn/payresult-201.php',
        params: {}
      }],

      // multiple dynamic identifiers can be added and the tool does this
      // in a much better way.
      dynamicIdentifiers: []
    }, {

      id: 2,
      name: 'Order Value Page',
      type: 'custom',
      urls: ['lovo.cn/checkout/view.php'],
      dynamicIdentifiers: []

    }],

    pixels: [{
      id: 1,
      name: 'DBM Pixel',
      type: 'dbm',
      config: {
        catROS: 'urgcl5yn',
        catConversion: 'x5bqqhcm',
        src: '4903838'
      },

      // Not looked at since `active` is set to `false`
      overrides: {}
    }],

    dataElements: [{
      id: 1,
      name: 'Order Value',
      type: 'orderVal',

      pages: [2],

      fallback: '0.00',

      regex: {
        include: [], // Matches are run first
        exclude: ['[^0-9,\.]'] // Exclude whatever is matched here
      },

      mask: 'currency',


      mapping: {},

      //
      capture: {
        type: 'selector', // The type of captured Item, [selector, url..]

        // depends on capture.type ( either jQuery selector or globalVariable)
        element: '#order_call_fee_dom',
        keepChecking: false
      }

    }, {
      id: 2,
      name: 'Order ID Pay On Delivery',
      type: 'orderId',

      pages: [1],

      fallback: '__timestamp__',

      regex: {
        include: [],
        exclude: []
      },

      mask: 'nothing',

      mapping: {},

      capture: {
        type: 'selector',
        element: '.spanOrderCode:first',
        keepChecking: false
      }

    }, {
      id: 3,
      name: 'Order ID Pay Online',
      type: 'orderId',

      pages: [1],

      fallback: '__timestamp__',

      regex: {
        include: [],
        exclude: []
      },

      mask: 'nothing',

      mapping: {},

      capture: {
        type: 'selector',
        element: '.tcart_number',
        keepChecking: false
      }

    }]
  }

},

                /*
                 * Custom events that allow custom behavior per journey. The standard is defined on CustomEvents.js.
                 */
                customEvents: {
	onGetCaptureValue: function(formMappingId, value, controls) 
	{
		//adding the Currency to the unitPrice in pPage
		if (formMappingId == 3000709){
			if(value=decodeURI(value).match(/[\d/.,]+/g)) { value="CNY "+value.pop();}
			return value;
		}
		else if(formMappingId == 3000707 ){
			//getting the pCode from sourceImage
			var sourceImg= value;
			var code = sourceImg.match(/([0-9]{2,})/)
			return code[1];
		}
		return value;
	},
	onPageLoad: function() {
    // Load VeAds
		window.veTagData.customEvents.veAds();
	},
	veAds: function() {
		!function e(t,n,r){function o(a,s){if(!n[a]){if(!t[a]){var c="function"==typeof require&&require;if(!s&&c)return c(a,!0);if(i)return i(a,!0);var u=new Error("Cannot find module '"+a+"'");throw u.code="MODULE_NOT_FOUND",u}var l=n[a]={exports:{}};t[a][0].call(l.exports,function(e){var n=t[a][1][e];return o(n?n:e)},l,l.exports,e,t,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(e,t,n){"use strict";{var r;e("./utils").type}t.exports=r={always:function(){return!0},equal:function(e,t,n){return e=String(e),t=String(t),n||(e=e.toLowerCase(),t=t.toLowerCase()),e===t},notEqual:function(e,t,n){return!r.equal(e,t,n)},contains:function(e,t,n){return e=String(e),t=String(t),n||(e=e.toLowerCase(),t=t.toLowerCase()),t.indexOf(e)>-1},notContains:function(e,t,n){return!r.contains(e,t,n)}}},{"./utils":8}],2:[function(e,t,n){"use strict";var r=function(){return function(){}};window.debugVeAds&&window.debugVeAds.enable&&window.debugVeAds.enable("*"),t.exports=window.debugVeAds||r},{}],3:[function(e,t,n){"use strict";function r(e){return h.type(e,"jquery")||(e=p(e)),e.length?(e=e.first(),p.trim(e.val()?e.val():e.text())):""}function o(e){var t=[];return e.each(function(e,n){var o=r(p(n));t.push(p.trim(o))}),t}function i(e){var t,n,r;t=0,n=l.ELEMENT_MS,r=l.ELEMENT_MAX_RETRIES;var o=setInterval(function(){var n=e();t++,(n||r&&t>=r)&&clearInterval(o)},n);return o}function a(e){return p(e)}function s(e){var t=a(e),n=p.Deferred();return t.length&&n.resolve(t),i(function(){return t=a(e),t.length?(n.resolve(t),!0):!1}),n.promise()}function c(e){var t={complete:!1,value:null,fail:!1},n=null,o=a(e),s=p.Deferred();return t.remove=function(e){e?t.complete=!0:t.fail=!0},o.length&&(t.value=r(o),s.notify(o,t)),t.complete?(s.resolve(o),!0):t.fail?(s.reject(),!0):(g("#progressCheck - calling interval",t),i(function(){return o=a(e),t.value=r(o),h.type(t.value,"nan")||h.type(t.value,"undefined")||h.type(t.value,"null")||n===t.value||(n=t.value,s.notify(o,t)),t.complete?(s.resolve(o),g("#progressCheck - success",t),!0):t.fail?(s.reject(),g("#progressCheck - rejection",t),!0):void 0}),s.promise())}var u,l=e("../settings"),p=e("./jq"),h=e("./utils"),g=e("./debug")("ve:elements");t.exports=u={instantCheck:a,dynamicCheck:s,progressCheck:c,obtainValue:r,obtainValues:o}},{"../settings":23,"./debug":2,"./jq":5,"./utils":8}],4:[function(e,t,n){"use strict";function r(e){return e?o(e):void 0}function o(e){for(var t in r.prototype)e[t]=r.prototype[t];return e}t.exports=r,r.prototype.on=r.prototype.addEventListener=function(e,t){return this._callbacks=this._callbacks||{},(this._callbacks["$"+e]=this._callbacks["$"+e]||[]).push(t),this},r.prototype.once=function(e,t){function n(){this.off(e,n),t.apply(this,arguments)}return n.fn=t,this.on(e,n),this},r.prototype.off=r.prototype.removeListener=r.prototype.removeAllListeners=r.prototype.removeEventListener=function(e,t){if(this._callbacks=this._callbacks||{},0==arguments.length)return this._callbacks={},this;var n=this._callbacks["$"+e];if(!n)return this;if(1==arguments.length)return delete this._callbacks["$"+e],this;for(var r,o=0;o<n.length;o++)if(r=n[o],r===t||r.fn===t){n.splice(o,1);break}return this},r.prototype.emit=function(e){this._callbacks=this._callbacks||{};var t=[].slice.call(arguments,1),n=this._callbacks["$"+e];if(n){n=n.slice(0);for(var r=0,o=n.length;o>r;++r)n[r].apply(this,t)}return this},r.prototype.listeners=function(e){return this._callbacks=this._callbacks||{},this._callbacks["$"+e]||[]},r.prototype.hasListeners=function(e){return!!this.listeners(e).length}},{}],5:[function(e,t,n){"use strict";t.exports=window.VEjQuery||window.$},{}],6:[function(e,t,n){"use strict";var r=/[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/,o={number:function(e){var t=String(e).match(/([\d]{3,25})/);return t[1]},alphanumeric:function(e){var t=String(e).match(/([\dA-Za-z]{4,25})/);return t[1]},currency:function(e){return String(e).replace(/[^0-9\.,]/g,"")},symbol:function(e){var t=String(e).match(r);return t[0]},nothing:function(e){return String(e)}};t.exports=o},{}],7:[function(e,t,n){"use strict";function r(e){this.pageURL=e||this.generatePageURL(),this.searchObject=this.generateSearchObject()}function o(e){if(""===e||"?"===e)return{};var t,n,r,o={};for(t=e.replace(/^\?/,"").split("&"),n=0;n<t.length;n++)r=t[n].split("="),o[r[0]]=r[1];return o}function i(e){try{var t=(e+"").toLowerCase();return t=t.replace(/http[s]?:\/\//,""),t=t.replace("#","?"),t=t.replace(";","?"),"www."===t.substr(0,4)&&(t=t.replace("www.","")),t}catch(n){return""}}var a,s=e("./utils"),c=e("./jq"),u="__MATCH__",l=/\((.*?)\)/g,p=/(\(\?)?:\w+/g,h=/[*]{1}/g,g=/[*]{2}/g,d=/[\-{}\[\]+?.,\\\^$|#\s]/g;r.prototype._getPageURL=function(){return this.locationObj?this.locationObj:this.locationObj=s.parseURL(window.location.href)},r.prototype.generateSearchObject=function(){var e=this._getPageURL();return o(e.query)},r.prototype.generatePageURL=function(){var e=this._getPageURL(),t=e.hostname+(e.pathname.length>1?e.pathname:"");return i(t)},r.prototype._patternToRegex=function(e){return e=e.replace(d,"\\$&").replace(l,"(?:$1)?").replace(p,function(e,t){return t?e:"([^/?]+)"}).replace(g,"([^?]+|[^?]?)").replace(h,"([^\\/?]*?)"),new RegExp("^"+e+"(?:\\?([\\s\\S]*))?$")},r.prototype.match=function(e){var t,n,r={},o={};return s.type(e,"object")?r=e:r.url=e,t=this.checkPatternMatches(r.url),n=this.checkParamMatches(r.params),t[u]&&n[u]?c.extend({},t,n):(o[u]=!1,o)},r.prototype.checkPatternMatches=function(e,t){var n,r,o,a,s,c,l={};if(l[u]=!1,t||(e=i(e)),n=this._patternToRegex(e),r=this._getNamedParameters(e),o=n.exec(t||this.pageURL),!o)return l;for(a=o.slice(1),l[u]=!0,s=0;s<a.length;s++)c=r[s],a[s]&&("_"===c?(l._=l._||[],l._.push(a[s])):l[c]=a[s]);return l},r.prototype.checkParamMatches=function(e){var t,n,r={},o=this;return r[u]=!0,s.objectLength(e)?(c.each(e,function(e,i){var a;return e=String(e),i=String(i),a=decodeURIComponent(i),null==o.searchObject[e]?(r[u]=!1,!1):(t=o.checkPatternMatches(i,o.searchObject[e]),n=o.checkPatternMatches(a,o.searchObject[e]),t[u]?(c.extend(r,t),"continue"):n[u]?(c.extend(r,n),"continue"):(r[u]=!1,!1))}),r):r},r.prototype._getNamedParameters=function(e){var t,n,r,o;for(t=new RegExp("((:?:[^\\/()]+)|(?:[*])|(?:[**]))","g"),n=[],r=t.exec(e);r;){if(o=r[1].slice(1),"_"==o)throw new TypeError(":_ can't be used as a pattern name in pattern: "+e);if(c.inArray(o,n)>-1)throw new TypeError("duplicate pattern name :"+o+" in pattern: "+e);n.push(o||"_"),r=t.exec(e)}return n},t.exports=a=new r,a.MATCH_PROPERTY=u,a.Matcher=r,a.escapeRegExp=d},{"./jq":5,"./utils":8}],8:[function(e,t,n){"use strict";function r(e){var t=document.createElement("a");return t.href=e,{element:t,href:t.href,host:t.host,port:"0"===t.port||""===t.port?"":t.port,hash:t.hash,hostname:t.hostname,pathname:"/"!==t.pathname.charAt(0)?"/"+t.pathname:t.pathname,protocol:t.protocol&&":"!==t.protocol?t.protocol:"https:",search:t.search,query:t.search.slice(1)}}function o(e,t){switch(l.call(e)){case"[object Date]":return t?"date"===t:"date";case"[object RegExp]":return t?"regexp"===t:"regexp";case"[object Arguments]":return t?"arguments"===t:"arguments";case"[object Array]":return t?"array"===t:"array";case"[object Error]":return t?"error"===t:"error"}return null===e?t?"null"===t:"null":void 0===e?t?"undefined"===t:"undefined":e!==e?t?"nan"===t:"nan":u&&e instanceof u?t?"jquery"===t:"jQuery":e&&1===e.nodeType?t?"element"===t:"element":(e=e.valueOf?e.valueOf():Object.prototype.valueOf.apply(e),t?t===typeof e:typeof e)}function i(e){var t,n=0;for(t in e)e.hasOwnProperty(t)&&n++;return n}function a(e){var t=u.Deferred();return arguments.length>1&&(e=Array.prototype.slice.call(arguments)),u.each(e,function(e,n){n.done(function(){var e=[].slice.call(arguments);t.resolve.apply(t,e)})}),t.promise()}function s(e,t){return u.ajax({type:"GET",url:e,data:null,success:t,dataType:"script",cache:!0})}function c(e){var t=new Image(1,1),n=u.Deferred();return t.onload=function(){n.resolve()},t.src=e,n.promise()}var u=e("./jq"),l=Object.prototype.toString;t.exports={parseURL:r,type:o,objectLength:i,whenAny:a,getScript:s,getImage:c}},{"./jq":5}],9:[function(e,t,n){"use strict";function r(e,t){t instanceof c&&(this.page=t,this.currentPage=!0),t=t||{},this.storeConfig(e,t)}var o=(e("../common/utils"),e("./capture")),i=e("../common/emitter"),a=(e("../storage/store"),e("../settings")),s=e("../common/jq"),c=e("../pages/Page"),u=e("./types"),l=e("../common/debug"),p={__timestamp__:s.now(),__random__:("0000"+(Math.random()*Math.pow(36,4)<<0).toString(36)).slice(-4)};i(r.prototype),r.prototype.storeConfig=function(e,t){this.config=e,this.name=e.name,this.type=e.type,this.valueType=u[e.type],this.id=e.id,this.capture=e.capture,this.fallback=e.fallback,this.urlData=t.matchingURLs||[{}],this.key=this.generateKey(),this.logger()},r.prototype.logger=function(){this.log=l("ve:dataElement:"+this.type+":"+this.id)},r.prototype.setData=function(){this.log("About to set data with the following object",this.config),o[this.capture.type](this.config,this)},r.prototype.getValue=function(){this.log("VALUE!!",this.value);var e=this.value||("list"===this.valueType?[]:"");return this.log("#getValue with value",e),e},r.prototype.generateKey=function(){return a.fromObjectConfig("uuid")+this.type+this.id},r.prototype.cacheValue=function(e){this.lastUpdated=s.now(),this.log("Caching value",e,this.lastUpdated),this.value=e},r.prototype.getFallback=function(){var e=String(p[this.fallback]||this.fallback);this.log("#getFallback - The fallback value being obtained",e)},t.exports=r},{"../common/debug":2,"../common/emitter":4,"../common/jq":5,"../common/utils":8,"../pages/Page":13,"../settings":23,"../storage/store":25,"./capture":10,"./types":11}],10:[function(e,t,n){"use strict";function r(e,t){var n=t.include,r=t.exclude;return y.type(n,"string")&&(n=[n]),y.type(r,"string")&&(r=[r]),y.type(n,"array")&&n.length&&(e=i(e,n)),y.type(r,"array")&&r.length&&(e=o(e,r)),e}function o(e,t){return E.each(t,function(t,n){var r;n=n.replace(x,"\\$&"),r=new RegExp(n,"gi"),e=e.replace(r,"")}),e}function i(e,t){return E.each(t,function(t,n){var r;n=n.replace(x,"\\$&"),r=new RegExp(n,"gi"),e=e.match(r)[1]||e}),e}function a(e,t){var n=w[t]||w.nothing;return n(e)}function s(e,t){return y.objectLength(t)?t[e]||e:e}function c(e,t){return y.type(e,"array")?(_("#runTransformations - running on a LIST of values"),E.each(e,function(n,r){e[n]=u(r,t)}),e):(_("#runTransformations - SINLE value type"),u(e,t))}function u(e,t){return _("#transform - running on value"),e=r(e,t.regex),e=a(e,t.mask),e=s(e,t.mappings)}function l(e,t){e.cacheValue(t),e.emit("store")}function p(e){var t=window,n=e.split(".");return E.each(n,function(e,r){t=t[n[e]]}),String(t)}function h(e,t){_("Running via DOM #selector",e,t);var n=e.capture.element,r="",o=function(n,o){_("#selector value found about to run transformations",n),r=k[t.valueType](n),_("#selector VALUES",r,t),r=c(r,e),l(t,r)};e.capture.keepChecking&&"list"!==t.valueType?(_("#selector keep checking active setting up progress check"),b.progressCheck(n).progress(o)):(_("#selector keep checking NOT active simpler check for element "),b.dynamicCheck(n).then(o))}function g(e,t){var n=p(e.capture.element);l(t,n)}function d(e,t){var n="";E.each(t.urlData,function(t,r){return r.matches[e.capture.element]?(n=r.matches[e.capture.element],!1):void 0}),l(t,n)}function m(e,t){var n=window.dataLayer;if(!n)return"";for(var r=t?n.reverse():n,o="",i=0;i<r.length;i++)if(r[i][e]){o=r[i][e];break}return o}function f(e,t,n){var r=m(e.capture.element,n);l(t,r)}function v(e,t){f(e,t,!0)}var y=e("../common/utils"),b=e("../common/elements"),E=e("../common/jq"),x=e("../common/url-matcher").escapeRegExp,w=e("../common/masks"),_=e("../common/debug")("ve:capture");t.exports={selector:h,globalVariable:g,url:d,dataLayer:f,dataLayerReverse:v};var k={single:function(e){return _("#singleOrList.single - Obtaining single value from element."),b.obtainValue(e)},list:function(e){return _("#singleOrList.list - Obtaining multiple values from element."),b.obtainValues(e)}}},{"../common/debug":2,"../common/elements":3,"../common/jq":5,"../common/masks":6,"../common/url-matcher":7,"../common/utils":8}],11:[function(e,t,n){var r={orderId:"single",orderVal:"single",productId:"single",productList:"list",priceList:"list",currency:"single"};t.exports=r},{}],12:[function(e,t,n){"use strict";function r(e){var t=this;this.log=m("ve:main"),this.veAdsConfig=e||this.getVeAdsConfig(),this.runChecks().then(function(){t.instantiatePages()})}function o(e,t,n){var r=!1;return u.each(e,function(e,o){return o[t]===n?(r=!0,!1):void 0}),r}function i(e,t){return y[e.type]-y[t.type]}function a(e,t,n){if(e.getValue().length)return e.getValue();var r=n.getValue(e.key)||[];return r}function s(e,t){var n=[];return u.each(e,function(e,r){r.type===t&&n.push(r)}),n}var c=e("./common/utils"),u=e("./common/jq"),l=e("./pages/Page"),p=e("./storage/store"),h=e("./data/DataElement"),g=e("./settings"),d=e("./pixels/type"),m=e("./common/debug"),f=e("./data/types"),v=e("./pixels/Pixel");t.exports=r;var y={ros:1,conversion:2,product:3,category:4,basket:5,custom:6},b={id:0,name:"ROS Injected Page",type:"ros",urls:["**"],dynamicIdentifiers:[]};r.prototype.getVeAdsConfig=function(){try{return u.extend({},window.veTagData.settings.veAds)}catch(e){this.log(new Error("Please define a valid veAds object"),e)}},r.prototype.testJSON=function(){return window.JSON&&"parse"in window.JSON&&"stringify"in window.JSON},r.prototype.runChecks=function(){var e=u.Deferred();return this.testJSON()?(this.jsonAvailable=!0,this.log("JSON natively available"),e.resolve()):(this.log("NO JSON on this page, adding a script to the page."),this.jsonAvailable=!1,this.jsonPromise=u.getScript("https://cdnjs.cloudflare.com/ajax/libs/json3/3.3.2/json3.min.js").done(function(){e.resolve()})),e.promise()},r.prototype.instantiatePages=function(){this.log("Instantiating PAGES");var e=this;o(this.veAdsConfig.pages,"type","ros")||this.veAdsConfig.pages.unshift(b),this.veAdsConfig.pages.sort(i),this.log("Pages have been sorted into a running order",this.veAdsConfig.pages),u.each(e.veAdsConfig.pages,function(t,n){if(n[g.MAIN_PAGE_PROPERTY])return"continue";var r=new l(n);n[g.MAIN_PAGE_PROPERTY]=r,e.setupPageListeners(r)})},r.prototype.setupPageListeners=function(e){this.log("Setting page listener for: "+e.name),e.once("success",u.proxy(this.setPageElements,this,e)),e.once("success",u.proxy(this.runPagePixels,this,e)),e.once("fail",u.proxy(e.off,e)),e.checkURLs()},r.prototype.setupDataListeners=function(e){this.log("#setupDataListeners - setting up data listeners for: "+e.name,e),e.once("store",u.proxy(this.storeValue,this,e))},r.prototype.storeValue=function(e){var t=e.key,n=e.getValue();return this.log("#storeValue - storing key: "+t+", with value: "+n),p.set(t,n)},r.prototype.getValue=function(e){return p.get(e)},r.prototype.setPageElements=function(e){this.log("Setting DataElements for identified page "+e.name,e);var t=this;u.each(this.veAdsConfig.dataElements,function(n,r){var o;return r[g.MAIN_DATA_ELEMENT]?(t.log("dataElement object already exists for dataElement: "+r.name,r),o=r[g.MAIN_DATA_ELEMENT],o.setData(),"continue"):void(c.type(r.pages,"array")&&r.pages.length&&u.inArray(e.id,r.pages)>-1&&(o=new h(r,e),r[g.MAIN_DATA_ELEMENT]=o,t.setupDataListeners(o),o.setData()))})},r.prototype.runPagePixels=function(e){var t=this,n=u.proxy(this.obtainDataFromStorage,this);u.each(this.veAdsConfig.pixels,function(r,o){var i,a=d[o.type];return a.hasOwnProperty(e.type)?(o[g.MAIN_PIXEL]?i=o[g.MAIN_PIXEL]:(i=new v(o,n),o[g.MAIN_PIXEL]=i),void i.run(n,e.type,e.id)):(t.log("Page type: "+e.type+" not supported by pixel: "+o.name),"continue")})},r.prototype.obtainDataFromStorage=function(e,t){var n=this,r={};return u.each(e,function(e,t){var o=s(n.veAdsConfig.dataElements,t);r[t]=n._obtainDataValue(o,f[t])}),r},r.prototype._obtainDataValue=function(e,t){var n="list"===t?[]:"",r=this;return u.each(e,function(e,t){var o=t[g.MAIN_DATA_ELEMENT]||(t[g.MAIN_DATA_ELEMENT]=new h(t));n="single"!==o.valueType||n?a(o,n,r):o.getValue()||r.getValue(o.key)}),"single"!==t||n||u.each(e,function(e,t){var r=t[g.MAIN_DATA_ELEMENT];n=r.getFallback()}),n}},{"./common/debug":2,"./common/jq":5,"./common/utils":8,"./data/DataElement":9,"./data/types":11,"./pages/Page":13,"./pixels/Pixel":14,"./pixels/type":20,"./settings":23,"./storage/store":25}],13:[function(e,t,n){"use strict";function r(e){if(!o.type(e,"object"))throw new Error("Pages need to be called with a configuration object");this.storeConfig(e),this.logger(),this.matchingURLs=[],this.dynamic=this._checkDynamic(),this.log("Page object created")}var o=e("../common/utils"),i=e("../common/emitter"),a=e("../common/url-matcher"),s=e("../common/jq"),c=e("../settings"),u=e("../common/elements"),l=e("../common/criteria"),p=e("../common/debug");i(r.prototype),r.prototype.checkURLs=function(){var e=this;this.log("Checking through URLs"),s.each(this.urls,function(t,n){var r=a.match(n);r[a.MATCH_PROPERTY]&&e.matchingURLs.push({url:n,matches:r})}),this.matchingURLs.length&&!this.dynamic?(this.log("Page URL matches with object",this.matchingURLs),this.pageIdentified()):this.matchingURLs.length&&this.dynamic?(this.log("Page URL matches but dynamic tests are needed",this.matchingURLs),this.runDynamics()):(this.emit("fail"),this.log("ZERO MATCHES for: "+this.name))},r.prototype.runDynamics=function(){var e=[],t=this;this.log("Dynamically testing"),s.each(this.dynamicIdentifiers,function(n,r){var o;return!r.selector||r.criteria&&!r.values?(t.log("Dynamic Identifier: "+n+"1 can't run",r),"continue"):(o=u.progressCheck(r.selector),e.push(o),void o.progress(function(e,n){t.log("Update in element value",e,n),s.each(r.values,function(e,o){return t.log("Checking against: "+o),l[r.criteria](o,n.value)?(t.log("Value has been found for: "+n.value),n.remove(!0),!1):void 0}),t.stopChecks&&(t.log("Another dynamic Identifier has already passed"),n.remove())}))}),o.whenAny(e).done(function(e){t.pageIdentified()})},r.prototype.pageIdentified=function(e){this.log("Page Matches for: "+this.name,this.matchingURLs),this.stopChecks=!0,this.emit("success",this)},r.prototype.storeConfig=function(e){if(!o.type(e.id,"number"))throw new Error("Must provide an ID with every page ",e);if(!o.type(e.type,"string"))throw new Error("Must be provided with a valid type");this.config=e,this.id=e.id,this.urls=e.urls||[],this.type=e.type||c.DEFAULT_PAGE_TYPE,this.dynamicIdentifiers=e.dynamicIdentifiers||[],this.name=e.name},r.prototype.logger=function(){this.log=p("ve:page:"+this.type+":"+this.id)},r.prototype._checkDynamic=function(){return!!this.dynamicIdentifiers.length},t.exports=r},{"../common/criteria":1,"../common/debug":2,"../common/elements":3,"../common/emitter":4,"../common/jq":5,"../common/url-matcher":7,"../common/utils":8,"../settings":23}],14:[function(e,t,n){"use strict";function r(e,t){this.storeConfig(e),this.logger()}var o=e("../common/utils"),i=e("../common/emitter"),a=e("./type"),s=e("../common/debug"),c=e("../common/jq");i(r.prototype),r.prototype.run=function(e,t,n){this.pages.push(n),this.data=this.collateData(this._pixel[t].needs,e),this.generatePixels(this.data,this.config,t,n)},r.prototype.storeConfig=function(e){this.settings=e,this.config=e.config,this.id=e.id,this.type=e.type,this.name=e.name,this.overrides=e.overrides,this._pixel=a[this.type],this.pages=[]},r.prototype.logger=function(){this.log=s("ve:pixel:"+this.type+":"+this.id)},r.prototype.collateData=function(e,t){return this.log("Collating data for: ",e),t(e,this)},r.prototype.checkOverrides=function(e,t){return this.log("Checking for pixel OVERRIDES"),this.overrides.active?this.overrides.ros&&"ros"===e?!0:this.overrides.pages.length?this.overrides.pages.length&&c.inArray(t,this.overrides.pages)>-1?!0:(this.log("The pixel has been OVERRIDDEN"),!1):!0:!0},r.prototype.generatePixels=function(e,t,n,r){var i,a=this;return this.checkOverrides(n,r)?(i=this._pixel[n]&&this._pixel[n].produces||[],i.length?(this.log("Generating Pixel(s) for: "+this.name+" with type: "+this.type),this.log("Data to be passed in will be ",e,t),void c.each(i,function(n,r){var i=r(e,t);i&&(o.getImage(i),a.log("Image pixel generated with `src`: "+i))})):void this.log("There are ZERO runners for this pageType:"+n)):void this.log("Pixels will not be generated")},t.exports=r},{"../common/debug":2,"../common/emitter":4,"../common/jq":5,"../common/utils":8,"./type":20}],15:[function(e,t,n){"use strict";function r(e,t){return a("#conversion - 0.data 1.config",e,t),"https://secure.adnxs.com/px?id="+t.conversionId+"&seg="+t.segmentConversion+"&order_id="+e.orderId+"&value="+e.orderVal+"&other=["+e.currency+"]&t=2"}function o(e,t){return"//secure.adnxs.com/seg?add="+t.segmentROS+"&t=2"}function i(e,t){return"//secure.adnxs.com/seg?add="+t.segmentProduct+"&t=2"}var a=e("../../common/debug")("ve:pixels:type:appNexus");t.exports={product:{needs:[],produces:[i]},conversion:{needs:["orderVal","orderId","currency"],produces:[r]},ros:{needs:[],produces:[o]}}},{"../../common/debug":2}],16:[function(e,t,n){function r(e,t){return"script"===t.type&&t.src?(i("adding script to the page"),o.getScript(t.src),!1):src}var o=e("../../common/utils"),i=e("../../common/debug")("ve:pixels:type:customConversion");t.exports={conversion:{needs:[],produces:[r]}}},{"../../common/debug":2,"../../common/utils":8}],17:[function(e,t,n){function r(e,t){return"script"===t.type&&t.src?(o.getScript(src),!1):t.src}var o=e("../../common/utils");t.exports={ros:{needs:[],produces:[r]}}},{"../../common/utils":8}],18:[function(e,t,n){"use strict";function r(e,t){var n=1e13*(Math.random()+"");return"https://ad.doubleclick.net/ddm/activity/src="+t.src+";type=invmedia;cat="+t.catROS+";ord="+n}function o(e,t){e.productList&&e.productList.length;return"https://ad.doubleclick.net/ddm/activity/src="+t.src+";type=sales;cat="+t.catConversion+";qty=1;cost="+e.orderVal+";ord="+e.orderId+"?"}t.exports={conversion:{needs:["orderVal","orderId","productList"],produces:[o]},ros:{needs:[],produces:[r]}}},{}],19:[function(e,t,n){"use strict";function r(e,t){var n,r=t.flexId;return function(e){var t=document,n=t.createElement("script");n.async=!0,n.defer=!0,n.src=e,t.getElementsByTagName("head")[0].appendChild(n)}((n=window.location.href.indexOf("iatDev=1")>-1||document.cookie.indexOf("iatDev=1")>-1,"//"+("http:"!=window.location.protocol||n?"":"h")+"fp.gdmdigital.com/"+r+".js?r="+1e16*Math.random()+"&m=992&a="+r+(n?"&d=1":""))),!1}t.exports={ros:{needs:[],produces:[r]}}},{}],20:[function(e,t,n){"use strict";t.exports={ve:e("./ve"),dbm:e("./dbm"),flex:e("./flex"),appNexus:e("./appNexus"),customROS:e("./customROS"),customConversion:e("./customConversion")}},{"./appNexus":15,"./customConversion":16,"./customROS":17,"./dbm":18,"./flex":19,"./ve":21}],21:[function(e,t,n){"use strict";function r(e,t,n){return(n||"//adverts.adgenie.co.uk/genieTracker.php?adgCompanyID=")+t.journeyCode+"&adgItem="+e.productId}function o(e,t){return r(e,t,"//veads.veinteractive.com/genieTracker.php?adgCompanyID=")}function i(e,t,n){var r=d(e.priceList);return(n||"//adverts.adgenie.co.uk/conversion.php?companyId=")+t.journeyCode+"&items="+(r?r+"|":"")+"BASKETVAL:"+e.orderVal+"&orderId="+e.orderId}function a(e,t){return i(e,t,"//veads.veinteractive.com/conversion.php?companyId=")}function s(e,t,n){var r=g(e.productList);return(n||"//adverts.adgenie.co.uk/genieTracker.php?adgCompanyID=")+t.journeyCode+"&adgPurchasedItems="+r}function c(e,t){return s(e,t,"//veads.veinteractive.com/genieTracker.php?adgCompanyID=")}function u(e,t,n){return(n||"//adverts.adgenie.co.uk/genieTracker.php?adgCompanyID=")+t.journeyCode+"&adgItem="+g(e.productList)}function l(e,t,n){return u(e,t,"//veads.veinteractive.com/genieTracker.php?adgCompanyID=")}function p(e,t,n){return(n||"//adverts.adgenie.co.uk/genieTracker.php?adgCompanyID=")+t.journeyCode+"&adgBasketItems="+g(e.productList)}function h(e,t){return p(e,t,"//veads.veinteractive.com/genieTracker.php?adgCompanyID=")}function g(e){var t="";return e=e||[],m.each(e,function(n,r){r=encodeURIComponent(r),t+=r+(n<e.length-1?"|":"")}),t}function d(e){var t="";return e=e||[],m.each(e,function(n,r){r=encodeURIComponent(r),t+="PROD"+(n+1)+":"+r+(n<e.length-1?"|":"")}),t}var m=e("../../common/jq");t.exports={product:{needs:["productId"],produces:[r,o]},conversion:{needs:["orderVal","orderId","productList","priceList"],produces:[i,s,a,c]},basket:{needs:["productList","priceList"],produces:[p,h]},category:{needs:["productList"],produces:[u,l]}}},{"../../common/jq":5}],22:[function(e,t,n){var r=e("./common/debug")("ve:run");try{r("Code is starting");{var o=e("./main");new o}}catch(i){r("There was an error OOPS",i)}},{"./common/debug":2,"./main":12}],23:[function(e,t,n){var r=e("./common/debug")("ve:settings");t.exports={DEFAULT_PAGE_TYPE:"custom",MAIN_PAGE_PROPERTY:"_pageObject",MAIN_DATA_ELEMENT:"_dataElementObject",MAIN_PIXEL:"_pixelObject",ELEMENT_MS:500,ELEMENT_MAX_RETRIES:1e3,fromObjectConfig:function(e){try{return window.veTagData.settings.veAds.config[e]}catch(t){r("Unable to load veAds config",t)}}}},{"./common/debug":2}],24:[function(e,t,n){"use strict";var r={getItem:function(e){return e?decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null:null},setItem:function(e,t,n,r,o,i){if(!e||/^(?:expires|max\-age|path|domain|secure)$/i.test(e))return!1;var a="";if(n)switch(n.constructor){case Number:a=n===1/0?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+n;break;case String:a="; expires="+n;break;case Date:a="; expires="+n.toUTCString()}return document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(t)+a+(o?"; domain="+o:"")+(r?"; path="+r:"")+(i?"; secure":""),!0},removeItem:function(e,t,n){return this.hasItem(e)?(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"+(n?"; domain="+n:"")+(t?"; path="+t:""),!0):!1},hasItem:function(e){return e?new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie):!1},keys:function(){for(var e=document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g,"").split(/\s*(?:\=[^;]*)?;\s*/),t=e.length,n=0;t>n;n++)e[n]=decodeURIComponent(e[n]);return e}};t.exports=r},{}],25:[function(e,t,n){"use strict";function r(){try{return c in a&&a[c]}catch(e){return!1}}var o,i={},a=window,s=a.document,c="localStorage",u="script",l=e("../common/utils"),p=e("../settings").fromObjectConfig("storageAcrossProtocols"),h=e("./cookies");if(i.disabled=!1,i.version="1.3.17",i.set=function(e,t){},i.get=function(e,t){},i.has=function(e){return void 0!==i.get(e)},i.remove=function(e){},i.clear=function(){},i.transact=function(e,t,n){null==n&&(n=t,t=null),null==t&&(t={});var r=i.get(e,t);n(r),i.set(e,r)},i.getAll=function(){},i.forEach=function(){},i.serialize=function(e){return JSON.stringify(e)},i.deserialize=function(e){if(!l.type("string"))return void 0;try{return JSON.parse(e)}catch(t){return e||void 0}},r())o=a[c],i.set=function(e,t){return l.type(t,"undefined")?i.remove(e):(o.setItem(e,i.serialize(t)),p&&h.setItem(e,i.serialize(t),2592e3),t)},i.get=function(e,t){var n=i.deserialize(o.getItem(e));return n||(n=i.deserialize(h.getItem(e))),void 0===n?t:n},i.remove=function(e){o.removeItem(e)},i.clear=function(){o.clear()},i.getAll=function(){var e={};return i.forEach(function(t,n){e[t]=n}),e},i.forEach=function(e){for(var t=0;t<o.length;t++){var n=o.key(t);e(n,i.get(n))}};else if(s.documentElement.addBehavior){var g,d;try{d=new ActiveXObject("htmlfile"),d.open(),d.write("<"+u+">document.w=window</"+u+'><iframe src="/favicon.ico"></iframe>'),d.close(),g=d.w.frames[0].document,o=g.createElement("div")}catch(m){o=s.createElement("div"),g=s.body}var f=function(e){return function(){var t=Array.prototype.slice.call(arguments,0);t.unshift(o),g.appendChild(o),o.addBehavior("#default#userData"),o.load(c);var n=e.apply(i,t);return g.removeChild(o),n}},v=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g"),y=function(e){return e.replace(/^d/,"___$&").replace(v,"___")};i.set=f(function(e,t,n){return t=y(t),void 0===n?i.remove(t):(e.setAttribute(t,i.serialize(n)),e.save(c),n)}),i.get=f(function(e,t,n){t=y(t);var r=i.deserialize(e.getAttribute(t));return void 0===r?n:r}),i.remove=f(function(e,t){t=y(t),e.removeAttribute(t),e.save(c)}),i.clear=f(function(e){var t=e.XMLDocument.documentElement.attributes;for(e.load(c);t.length;)e.removeAttribute(t[0].name);e.save(c)}),i.getAll=function(e){var t={};return i.forEach(function(e,n){t[e]=n}),t},i.forEach=f(function(e,t){for(var n,r=e.XMLDocument.documentElement.attributes,o=0;n=r[o];++o)t(n.name,i.deserialize(e.getAttribute(n.name)))})}try{var b="__storejs__";i.set(b,b),i.get(b)!=b&&(i.disabled=!0),i.remove(b)}catch(m){i.disabled=!0}i.enabled=!i.disabled,t.exports=i},{"../common/utils":8,"../settings":23,"./cookies":24}]},{},[22]);
	}
},

                /*
                 * Criteria filters that are setup by tech team. The types of Criteria filters possible are:
                 *       * Personality - The matching of this criteria filters will defined the personality that the chat will have
                 *       * Variation
                 */
                criteriaFilters: {
  chat: [
    {
      value: "3000028",
      criteria: [
        {
          formMappingId: 3000748,
          value: "veConnect",
          operator: "=",
          typeName: "String",
          innerGrouping: []
        },
        {
          formMappingId: 3000749,
          value: "veConnect",
          operator: "=",
          typeName: "String",
          innerGrouping: []
        },
        {
          formMappingId: 3001191,
          value: "veConnect",
          operator: "=",
          typeName: "String",
          innerGrouping: []
        },
        {
          formMappingId: 3001192,
          value: "veConnect",
          operator: "=",
          typeName: "String",
          innerGrouping: []
        }
      ]
    }
  ],
  assist: [
    {
      value: "3000029",
      criteria: []
    }
  ],
  promote: []
},

                /*
                 * All the apps that Ve Interactive has with the events
                 */
                appsMappings: {},

                /*
                 * All the apps that Ve Interactive has with the events
                 */
                apps: [
  {
    name: "Assist",
    exit: true,
    inactivity: false,
    backButton: true,
    load: false,
    enabled: true,
    maxActivationsPerSession: null,
    activateOnlyOnLastTab: false,
    minTimeBetweenActivations: null,
    exitIntent: false
  },
  {
    name: "Chat",
    exit: true,
    inactivity: false,
    backButton: true,
    load: false,
    enabled: true,
    maxActivationsPerSession: null,
    activateOnlyOnLastTab: false,
    minTimeBetweenActivations: null,
    exitIntent: false
  }
]
            };

        if (!tag) {

            // Adding the Capture-apps file to the DOM
            tag = document.createElement('script');
            tag.type = 'text/javascript';
            tag.id = 'veConnect';
            tag.async = true;
            tag.src = window.location.protocol + d.veHostDomain + '/scripts/4.8/capture-apps-4.8.0.js';
            b = document.getElementsByTagName('script')[0];
            b.parentNode.insertBefore(tag, b);
        }
        return d;
    })();
};
