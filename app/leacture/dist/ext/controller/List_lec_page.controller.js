sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";var t;var n;var g;var i;return e.extend("l.leacture.ext.controller.List_lec_page",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},onBeforeRendering:async function(e){debugger;t=this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId;n=this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId},onAfterRendering:async function(e){debugger;var g=new sap.ushell.services.UserInfo;i=g.getUser().isAdminUser();t=this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId;n=this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId;if(!i){this.base.getView().mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._header.mAggregations.items[0].mAggregations.content[1].mAggregations.content.mForwardedAggregations.actions[0].mAggregations.action.mProperties.visible=false;this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.mProperties.visible=false;sap.ui.getCore().byId(t).removeAllActions();t=null;sap.ui.getCore().byId(n).setFilterConditions({$editState:[{operator:"DRAFT_EDIT_STATE",values:["ALL_HIDING_DRAFTS","All (Hiding Drafts)"],validated:"Validated"}]});n=null}else{this.base.getView().mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._header.mAggregations.items[0].mAggregations.content[1].mAggregations.content.mForwardedAggregations.actions[0].mAggregations.action.mProperties.visible=true;this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.removeAllFilterItems(true)}}}})});
//# sourceMappingURL=List_lec_page.controller.js.map