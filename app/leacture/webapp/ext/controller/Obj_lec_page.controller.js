sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var actiontool = false;
	var edit;

	return ControllerExtension.extend('l.leacture.ext.controller.Obj_lec_page', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf l.leacture.ext.controller.Obj_lec_page
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			onAfterRendering: async function (oParameter) {
				debugger
				// this.base.getView().getContent()[0].mAggregations.sections[1].mProperties.title = "ABC";
			},
			editFlow: {
				onBeforeDiscard: async function (oParameter) {
					debugger

					let funcname = 'draftsfunc';
					let oFunction = oParameter.context.getModel().bindContext(`/${funcname}(...)`);
					var val = window.location.href;
					const regex = /lUuid=([a-fA-F0-9-]+)/;
					const match = val.match(regex);
					if (match) {
						val = match[1];
						console.log(val); // Output: 1
					}
					oFunction.setParameter('para', val);
					await oFunction.execute();
					const oContext = oFunction.getBoundContext();
					var result = oContext.getValue();
				}
			},
			routing: {
				onBeforeBinding: async function (oParameter) {
					debugger

					var oUser = new sap.ushell.services.UserInfo();
					var emailuser = oUser.getUser().isAdminUser();
					if (emailuser) {
						// this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar(!actiontool);
						this.base.getView().getContent()[0].mProperties.showEditHeaderButton = true;
					}
					else {
						// this.base.getView().getContent()[0].mProperties.showEditHeaderButton.setVisible(false);
						 this.base.getView().getContent()[0].mProperties.showEditHeaderButton = false;
						 edit = this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.setVisible(false);
					}
					if (emailuser) {
						var sId;
						await this.base.getView().getContent()[0].getFooter().mAggregations.content.getContent().forEach(element => {
							// if(element.getText())
							debugger
							var text;
							try {
								text = element.getText()
							} catch (error) {
								text = null;
							}
							// var text =element.getText();
							if (text == 'Create')
								sId = element.sId;
							// element.setText("Send for Approval");
						});
						setTimeout(() => {
							sap.ui.getCore().byId(sId).setText("Send for Approval");
						}, 1000);
					}
				},
				onAfterBinding: async function (oParameter) {
					debugger
					
					// let funcname = 'postattach';
					// let oFunction = oParameter.getModel().bindContext(`/${funcname}(...)`);
					// console.log();
					// oFunction.setParameter('p', "demo");
					// await oFunction.execute();
					// const oContext = oFunction.getBoundContext();
					// var result = oContext.getValue();
					var a;
					var craetedraft = window.location.href;
					const regex1 = /IsActiveEntity=(true|false)/;
					const match1 = craetedraft.match(regex1);
					if (match1) {
						a = match1[1];
						console.log(a); // Output: 1
					}
					if (a == 'true'){
						let funcname = 'postattach';
						let oFunction = oParameter.getModel().bindContext(`/${funcname}(...)`);
						var val = window.location.href;
						const regex = /lUuid=([a-fA-F0-9-]+)/;
						const match = val.match(regex);
						if (match) {
							val = match[1];
							console.log(val); // Output: 1
						}
						oFunction.setParameter('p', val);
						await oFunction.execute();
						const oContext = oFunction.getBoundContext();
						var result = oContext.getValue();
						debugger
						if (result.value == 'false') {
							this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[4].setEnabled(false);
						} else {
							this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.mAggregations.content[4].setEnabled(true);
						}
					}
					var sId;
					var text = null;
					var sidd = this.base.getView().getContent()[0].getSections()[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.sId;
					await this.base.getView().getContent()[0].getSections()[1].mAggregations._grid.mAggregations.content[0].mAggregations._grid.mAggregations.content[0].mAggregations.content.setUploadEnabled(false);
					var footerId = null;
					try {
						footerId = await this.getView().getContent()[0].mAggregations.footer.sId;
					} catch (error) {
						footerId = null;
					}
					setTimeout(async () => {
						sap.ui.getCore().byId(footerId).mAggregations.content.mAggregations.content.forEach(async element => {
							if (element.getVisible()) {
								debugger
								if (element.getText() == "Discard Draft") {
									await sap.ui.getCore().byId(sidd).setUploadEnabled(true);
									await sap.ui.getCore().byId(sidd).mAggregations.items.forEach(async element => {
										element.setEnabledEdit(true);
										element.setEnabledRemove(true);
									});
								}
							}
						});
					}, 400);
				}
			}
		}
	});
});
