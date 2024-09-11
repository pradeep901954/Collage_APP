// const { resolve } = require("path");

sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var objfinalUrl;
	var editbut;
	var name;
	return ControllerExtension.extend('c.collageapp.ext.controller.Obj_page', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {

			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf c.collageapp.ext.controller.Obj_page
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				// var oUser = new sap.ushell.services.UserInfo().getEmail();
				// console.log(oUser);
			},
			routing: {

				onBeforeBinding: async function (oParameter) {
					debugger
					try {
						debugger
						var oUser = new sap.ushell.services.UserInfo();
						// console.log('oUser');
						var emailuser = oUser.getUser().isAdminUser();
						let objPath = oParameter.sPath.substring(1);
						let mailId = new sap.ushell.services.UserInfo().getEmail();
						// let mailId = 'pradeeppradeep59239@gmail.com';
						let baseUri = this.base.getModel().getServiceUrl();
						objfinalUrl = baseUri + objPath;
						baseUri += `Admin?$filter=aEmail eq '${mailId}'`;
						// Corrected the logic to use promises properly
						async function pro(baseUri, objfinalUrl) {
							editbut = false;
							return new Promise(async (resolve) => {
								let firstRes = await $.ajax({ url: baseUri, type: 'GET' });
								debugger
								let dept = firstRes.value[0].aName;

								let secondRes = await $.ajax({ url: objfinalUrl, type: 'GET' });
								debugger

								if (secondRes.depName != dept) {
									if (!emailuser) {
										editbut = false;
									}
									else {
										editbut = true;
									}

								} else {
									editbut = true;
									name = secondRes.depName;
								}
								console.log(secondRes);
								resolve();
							});
						}
						// ==============Await the promise returned by pro before proceeding
						let promisee = await pro(baseUri, objfinalUrl);
						console.log('first Ajax is ended');
						this.base.getView().getContent()[0].mAggregations.headerTitle.mAggregations._actionsToolbar.setVisible(editbut);

					} catch (error) {
						debugger
					}
				},
				// onAfterBinding: function (oParameter) {
				// 	debugger

				// }
			}
		}
	});
});

// l.leacture::lecturesObjectPage--fe::FooterBar::StandardAction::Save --> create id