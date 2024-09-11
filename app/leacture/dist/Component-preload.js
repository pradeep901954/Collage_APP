//@ui5-bundle l/leacture/Component-preload.js
sap.ui.require.preload({
	"l/leacture/Component.js":function(){
sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("l.leacture.Component",{metadata:{manifest:"json"}})});
},
	"l/leacture/ext/controller/List_lec_page.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";var t;var n;var g;var i;return e.extend("l.leacture.ext.controller.List_lec_page",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},onBeforeRendering:async function(e){debugger;t=this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId;n=this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId},onAfterRendering:async function(e){debugger;var g=new sap.ushell.services.UserInfo;i=g.getUser().isAdminUser();t=this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId;n=this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId;if(!i){this.base.getView().mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._header.mAggregations.items[0].mAggregations.content[1].mAggregations.content.mForwardedAggregations.actions[0].mAggregations.action.mProperties.visible=false;this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.mProperties.visible=false;sap.ui.getCore().byId(t).removeAllActions();t=null;sap.ui.getCore().byId(n).setFilterConditions({$editState:[{operator:"DRAFT_EDIT_STATE",values:["ALL_HIDING_DRAFTS","All (Hiding Drafts)"],validated:"Validated"}]});n=null}else{this.base.getView().mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._header.mAggregations.items[0].mAggregations.content[1].mAggregations.content.mForwardedAggregations.actions[0].mAggregations.action.mProperties.visible=true;this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.removeAllFilterItems(true)}}}})});
},
	"l/leacture/ext/controller/Obj_lec_page.controller.js":function(){
sap.ui.define(["sap/ui/core/mvc/ControllerExtension"],function(e){"use strict";var t=false;var n;return e.extend("l.leacture.ext.controller.Obj_lec_page",{override:{onInit:function(){var e=this.base.getExtensionAPI().getModel()},onAfterRendering:async function(e){debugger},editFlow:{onBeforeDiscard:async function(e){debugger;let t="draftsfunc";let n=e.context.getModel().bindContext(`/${t}(...)`);var o=window.location.href;const a=/lUuid=([a-fA-F0-9-]+)/;const g=o.match(a);if(g){o=g[1];console.log(o)}n.setParameter("para",o);await n.execute();const i=n.getBoundContext();var s=i.getValue()}},routing:{onBeforeBinding:async function(e){debugger;var t=new sap.ushell.services.UserInfo;var o=t.getUser().isAdminUser();if(o){this.base.getView().getContent()[0].mProperties.showEditHeaderButton=true}else{this.base.getView().getContent()[0].mProperties.showEditHeaderButton=false;n=this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.setVisible(false)}if(o){var a;await this.base.getView().getContent()[0].getFooter().mAggregations.content.getContent().forEach(e=>{debugger;var t;try{t=e.getText()}catch(e){t=null}if(t=="Create")a=e.sId});setTimeout(()=>{sap.ui.getCore().byId(a).setText("Send for Approval")},1e3)}},onAfterBinding:async function(e){debugger;var t;var n=window.location.href;const o=/IsActiveEntity=(true|false)/;const a=n.match(o);if(a){t=a[1];console.log(t)}if(t=="true"){let t="postattach";let n=e.getModel().bindContext(`/${t}(...)`);var g=window.location.href;const o=/lUuid=([a-fA-F0-9-]+)/;const a=g.match(o);if(a){g=a[1];console.log(g)}n.setParameter("p",g);await n.execute();const s=n.getBoundContext();var i=s.getValue();debugger;if(i.value=="false"){this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[4].setEnabled(false)}else{this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[4].setEnabled(true)}}var s;var r=null;var c=this.base.getView().getContent()[0].getSections()[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.sId;await this.base.getView().getContent()[0].getSections()[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.setUploadEnabled(false);var l=null;try{l=await this.getView().getContent()[0].mAggregations.footer.sId}catch(e){l=null}setTimeout(async()=>{sap.ui.getCore().byId(l).mAggregations.content.mAggregations.content.forEach(async e=>{if(e.getVisible()){debugger;if(e.getText()=="Discard Draft"){await sap.ui.getCore().byId(c).setUploadEnabled(true);await sap.ui.getCore().byId(c).mAggregations.items.forEach(async e=>{e.setEnabledEdit(true);e.setEnabledRemove(true)})}}})},400)}}}})});
},
	"l/leacture/ext/controller/Pdf.js":function(){
sap.ui.define(["sap/m/MessageToast"],function(e){"use strict";return{Pdf:function(s){e.show("Custom handler invoked.");this.showSideContent("GeneratedFacet1");console.log(this)}}});
},
	"l/leacture/ext/fragment/Attachments.fragment.xml":'<core:FragmentDefinition xmlns:upload="sap.m.upload" xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:macros="sap.fe.macros"><upload:UploadSet id="upload" \n\t\t\t\t\tcore:require="{handler:\'l/leacture/ext/fragment/Attachments\'}"\n\t\t\t\t\tinstantUpload="false"\n\t\t\t\t\tuploadEnabled="true"\n\t\t\t\t\tuploadButtonInvisible="false"\n\t\t\t\t\tfileTypes="pdf"\n\t\t\t\t\tshowIcons="true"\n\t\t\t\t\tafterItemAdded="handler.onAfterItemAdded"\n\t\t\t\t\tuploadCompleted="handler.onUploadCompleted"\n\t\t\t\t\tafterItemRemoved="handler.afterItemRemoved"\n\t\t\t\t\titems="{\n\t\t\t\t\t\t\t\tpath: \'lectofile\',\n\t\t\t\t\t\t\t\tparameters: {\n\t\t\t\t\t\t\t\t\t$orderby: \'createdAt desc\'\n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\ttemplateShareable: false}"\n\t\t\t\t\t\t\t\t\n\t><upload:items><upload:UploadSetItem id="_IDGenUploadSetItem1"\n\t\t\t\t\t\t\n\t\t\t\t\t\t\tfileName="{fileName}"\n\t\t\t\t\t\t\tmediaType="{mediaType}"\n\t\t\t\t\t\t\turl="{url}"\n\t\t\t\t\t\t\tthumbnailUrl="{\n\t\t\t\t\t\t\t\tpath: \'mediaType\',\n\t\t\t\t\t\t\t\tformatter: \'handler.formatThumbnailUrl\'\n\t\t\t\t\t\t\t}"\n\t\t\t\t\t\t\tenabledEdit="false"\n\t\t\t\t\t\t\tenabledRemove="false"\n\t\t\t\t\t\t\tvisibleEdit="true"\n\t\t\t\t\t\t\tvisibleRemove="true"\n\t\t\t\t\t\t\topenPressed="handler.onOpenPressed"\n\t\t\t\t\t\t\tremovePressed="handler.onRemovePressed"\n\t\t\t\t\t\t><upload:attributes><ObjectAttribute id="_IDGenObjectAttribute1"\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\ttitle="Uploaded By"\n\t\t\t\t\t\t\t\t\ttext="{createdBy}"\n\t\t\t\t\t\t\t\t\tactive="true"\n\t\t\t\t\t\t\t\t/><ObjectAttribute id="_IDGenObjectAttribute2"\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\ttitle="Uploaded on"\n\t\t\t\t\t\t\t\t\ttext="{createdAt}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute id="_IDGenObjectAttribute3"\n\t\t\t\t\t\t\t\t\n\n\t\t\t\t\t\t\t\t\ttitle="File Type"\n\t\t\t\t\t\t\t\t\ttext="{mediaType}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/><ObjectAttribute id="_IDGenObjectAttribute4"\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\ttitle="File Size"\n\t\t\t\t\t\t\t\t\ttext="{size}"\n\t\t\t\t\t\t\t\t\tactive="false"\n\t\t\t\t\t\t\t\t/></upload:attributes></upload:UploadSetItem></upload:items></upload:UploadSet></core:FragmentDefinition>',
	"l/leacture/ext/fragment/Attachments.js":function(){
sap.ui.define(["sap/m/MessageToast"],function(e){"use strict";var t;var o=this;var n;var a;return{onAfterItemAdded:function(e){debugger;var o=e.oSource.getModel().getServiceUrl();var a=e.getParameter("item");var i=window.location.href;const r=/lUuid=([a-fA-F0-9-]+)/;const g=i.match(r);if(g){n=g[1];console.log(n)}else{console.log("Number not found in URL")}var s=async function(e){var a={mediaType:e.getMediaType(),fileName:e.getFileName(),size:e.getFileObject().size,fkey:n};debugger;var i={url:o+`lectures(lUuid=${n},IsActiveEntity=false)/lectofile`,method:"POST",headers:{"Content-type":"application/json"},data:JSON.stringify(a)};await new Promise((e,o)=>{debugger;$.ajax(i).done((o,n,a)=>{debugger;t=o.id;e(o)}).fail(e=>{o(e)})})};s(a).then(e=>{debugger;var n=o+`Files(id=${t},IsActiveEntity=false)/content`;t=null;a.setUploadUrl(n);a.setUrl(n);var i=this.byId("upload");i.setHttpRequestMethod("PUT");i.uploadItem(a)}).catch(e=>{console.log(e)})},onOpenPressed:async function(e){debugger;var t;var o=e.oSource.getModel().getServiceUrl();var n=e.oSource.mProperties.url;var a=this._view.mAggregations.content[0].mAggregations.sections[0].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[1].mAggregations.content.mAggregations.sideContent[0].mAggregations.items[1];var i=this._view.mAggregations.content[0].mAggregations.sections[0].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[1].mAggregations.content.mAggregations.sideContent[0].mAggregations.items[0].mAggregations.items[0].setText("Close");var r=this._view.mAggregations.content[0].mAggregations.sections[0].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[1].mAggregations.content.mAggregations.sideContent[0].mAggregations.items[1].mProperties.visible;if(!n.startsWith(o)){n=o+n.substring(1);e.oSource.mProperties.url=n}var g=`https://port4004-workspaces-ws-blv5f.us10.trial.applicationstudio.cloud.sap`+n;a.setSource(g);this.showSideContent("GeneratedFacet1")},onUploadCompleted:function(e){debugger;var t=this.byId("upload");t.removeAllIncompleteItems()},afterItemRemoved:function(e){debugger;var t=e.oSource.getModel().getServiceUrl();debugger;const o=/^(.*?),IsActiveEntity=/;let n=e.mParameters.item.mProperties.url.match(o);let a=n[1]+",IsActiveEntity=false)";$.ajax({url:t+a,method:"DELETE"})},formatThumbnailUrl:function(e){debugger;var t;switch(e){case"image/png":t="sap-icon://card";break;case"text/plain":t="sap-icon://document-text";break;case"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":t="sap-icon://excel-attachment";break;case"application/vnd.openxmlformats-officedocument.wordprocessingml.document":t="sap-icon://doc-attachment";break;case"application/pdf":t="sap-icon://pdf-attachment";break;default:t="sap-icon://attachment"}return t}}});
},
	"l/leacture/ext/fragment/Pdf.fragment.xml":'<core:FragmentDefinition xmlns:layouts="sap.gantt.layouts" xmlns:layout="sap.ui.layout" xmlns:core="sap.ui.core" xmlns="sap.m" xmlns:macros="sap.fe.macros"><VBox core:require="{ handler: \'l/leacture/ext/fragment/Pdf\'}"><Button text="Pdf" press="handler.onPress" /></VBox><PDFViewer  source="https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf" isTrustedSource="true" displayType="Embedded" visible="true" width="100%" height="600px"></PDFViewer></core:FragmentDefinition>',
	"l/leacture/ext/fragment/Pdf.js":function(){
sap.ui.define(["sap/m/MessageToast"],function(e){"use strict";return{onPress:function(s){e.show("Custom handler invoked.");this.showSideContent("GeneratedFacet1");console.log(this)}}});
},
	"l/leacture/i18n/i18n.properties":'# This is the resource bundle for l.leacture\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=leacture\n\n#YDES: Application description\nappDescription=An SAP Fiori application.\n\n#XFLD,30\nflpTitle=lec_titile\n\n#XFLD,35\nflpSubtitle=teacher\n\n#XFLD,24\nflpTitle=leacture\n\n#XFLD,5\nflpSubtitle=l\n',
	"l/leacture/manifest.json":'{"_version":"1.59.0","sap.app":{"id":"l.leacture","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{Leacture}}","description":"{{Leactures}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.14.2","toolsId":"c200927e-8f67-4d27-8d1a-797200776fba"},"dataSources":{"mainService":{"uri":"odata/v4/my/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"lec_obj-display":{"semanticObject":"lec_obj","action":"display","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}},"Leacture-display":{"semanticObject":"Leacture","action":"display","title":"{{flpTitle}}","subTitle":"{{flpSubtitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":false,"dependencies":{"minUI5Version":"1.126.1","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.fe.templates":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"l.leacture.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[]},"routing":{"config":{},"routes":[{"pattern":":?query:","name":"lecturesList","target":"lecturesList"},{"pattern":"lectures({key}):?query:","name":"lecturesObjectPage","target":"lecturesObjectPage"}],"targets":{"lecturesList":{"type":"Component","id":"lecturesList","name":"sap.fe.templates.ListReport","options":{"settings":{"contextPath":"/lectures","variantManagement":"None","navigation":{"lectures":{"detail":{"route":"lecturesObjectPage"}}},"controlConfiguration":{"@com.sap.vocabularies.UI.v1.LineItem":{"tableSettings":{"type":"ResponsiveTable","personalization":{"sort":true,"column":true,"filter":false},"widthIncludingColumnHeader":true,"selectAll":true}}},"initialLoad":"Enabled","views":{"paths":[{"key":"tableView","annotationPath":"com.sap.vocabularies.UI.v1.SelectionPresentationVariant#tableView"},{"key":"tableView1","annotationPath":"com.sap.vocabularies.UI.v1.SelectionPresentationVariant#tableView1"},{"key":"tableView2","annotationPath":"com.sap.vocabularies.UI.v1.SelectionPresentationVariant#tableView2"}]}}}},"lecturesObjectPage":{"type":"Component","id":"lecturesObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"contextPath":"/lectures","content":{"body":{"sections":{"GeneratedFacet1":{"sideContent":{"template":"l.leacture.ext.fragment.Pdf","position":{"placement":"After","anchor":"GeneratedFacet1"},"title":"Colse","type":"XMLFragment"}},"Attachments":{"template":"l.leacture.ext.fragment.Attachments","position":{"placement":"After","anchor":"GeneratedFacet1"},"title":"attachments"}}}}}}}}},"extends":{"extensions":{"sap.ui.controllerExtensions":{"sap.fe.templates.ListReport.ListReportController":{"controllerName":"l.leacture.ext.controller.List_lec_page"},"sap.fe.templates.ObjectPage.ObjectPageController":{"controllerName":"l.leacture.ext.controller.Obj_lec_page"}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"collage"}}'
});
//# sourceMappingURL=Component-preload.js.map