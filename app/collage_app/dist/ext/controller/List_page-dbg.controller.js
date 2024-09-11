// const { Router } = require("express");

// const { assert } = require("console");

sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var removeAllAction;
	var setFilterCondition;
	var permision = true;
	var filterbar;

	return ControllerExtension.extend('c.collageapp.ext.controller.List_page', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf c.collageapp.ext.controller.List_page
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
			},
			onBeforeRendering: async function (oParameter) {
				debugger
				removeAllAction = this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId;
				setFilterCondition = this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId;
				// filterbar = "c.collageapp::departList--fe::FilterBar::depart-btnAdapt";
			},
			onAfterRendering: async function (oParameter) {
				debugger
				// let mailId = 'pradeeppradeep59239@gmail.com';
				var mailId = new sap.ushell.services.UserInfo().getEmail();
				// let mailId = oUser;
				let baseUri = this.base.getModel().getServiceUrl();
				baseUri += `Admin?$filter=aEmail eq '${mailId}'`;
				var oUser = new sap.ushell.services.UserInfo();
				// console.log('oUser');
				var emailuser = oUser.getUser().isAdminUser();
				if (!emailuser) {
					this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.mProperties.visible = false;
					sap.ui.getCore().byId(removeAllAction).removeAllActions();
					removeAllAction = null;

					sap.ui.getCore().byId(setFilterCondition).setFilterConditions({
						"$editState": [
							{
								"operator": "DRAFT_EDIT_STATE",
								"values": [
									"ALL_HIDING_DRAFTS",
									"All (Hiding Drafts)"
								],
								"validated": "Validated"
							}
						]
					});
					setFilterCondition = null;

					// sap.ui.getCore().byId(filterbar).removeAllActions();
					// filterbar = null;
					// this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.removeAllFilterItems(false);
				}
				else {
					this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.removeAllFilterItems(true);
				}
			}
		}
	});
});
