sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";var t=false;var n;return e.extend("l.leacture.ext.controller.Obj_lec_page",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},onAfterRendering:async function(e){debugger},editFlow:{onBeforeDiscard:async function(e){debugger;let t="draftsfunc";let n=e.context.getModel().bindContext(`/${t}(...)`);var o=window.location.href;const a=/lUuid=([a-fA-F0-9-]+)/;const g=o.match(a);if(g){o=g[1];console.log(o)}n.setParameter("para",o);await n.execute();const i=n.getBoundContext();var s=i.getValue()}},routing:{onBeforeBinding:async function(e){debugger;var t=new sap.ushell.services.UserInfo;var o=t.getUser().isAdminUser();if(o){this.base.getView().getContent()[0].mProperties.showEditHeaderButton=true}else{this.base.getView().getContent()[0].mProperties.showEditHeaderButton=false;n=this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.setVisible(false)}if(o){var a;await this.base.getView().getContent()[0].getFooter().mAggregations.content.getContent().forEach(e=>{debugger;var t;try{t=e.getText()}catch(e){t=null}if(t=="Create")a=e.sId});setTimeout(()=>{sap.ui.getCore().byId(a).setText("Send for Approval")},1e3)}},onAfterBinding:async function(e){debugger;var t;var n=window.location.href;const o=/IsActiveEntity=(true|false)/;const a=n.match(o);if(a){t=a[1];console.log(t)}if(t=="true"){let t="postattach";let n=e.getModel().bindContext(`/${t}(...)`);var g=window.location.href;const o=/lUuid=([a-fA-F0-9-]+)/;const a=g.match(o);if(a){g=a[1];console.log(g)}n.setParameter("p",g);await n.execute();const s=n.getBoundContext();var i=s.getValue();debugger;if(i.value=="false"){this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[4].setEnabled(false)}else{this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[4].setEnabled(true)}}var s;var r=null;var c=this.base.getView().getContent()[0].getSections()[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.sId;await this.base.getView().getContent()[0].getSections()[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.setUploadEnabled(false);var l=null;try{l=await this.getView().getContent()[0].mAggregations.footer.sId}catch(e){l=null}setTimeout(async()=>{sap.ui.getCore().byId(l).mAggregations.content.mAggregations.content.forEach(async e=>{if(e.getVisible()){debugger;if(e.getText()=="Discard Draft"){await sap.ui.getCore().byId(c).setUploadEnabled(true);await sap.ui.getCore().byId(c).mAggregations.items.forEach(async e=>{e.setEnabledEdit(true);e.setEnabledRemove(true)})}}})},400)}}}})});
//# sourceMappingURL=Obj_lec_page.controller.js.map