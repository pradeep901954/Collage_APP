sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';
	var removeAllAction;
	var setFilterCondition;
	var filterbar;
	var emailuser;
	return ControllerExtension.extend('l.leacture.ext.controller.List_lec_page', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf l.leacture.ext.controller.List_lec_page
			 */
			onInit: function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				// var oUser = new sap.ushell.services.UserInfo().getEmail();
			},
			onBeforeRendering: async function (oParameter) {
				debugger
				removeAllAction = this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId;
				setFilterCondition = this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId;
				// filterbar = "c.collageapp::departList--fe::FilterBar::depart-btnAdapt"
				// filterbar = "l.leacture::lecturesList--fe::FilterBar::lectures"
			},
			onAfterRendering: async function (oParameter) {
				debugger
				// var filter_bar = this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.removeAllFilterItems(false);
				// this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.mProperties.showAdaptFiltersButton;
				// this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.mProperties.visible = false;

				// var email = new sap.ushell.services.UserInfo().getEmail();
				var oUser = new sap.ushell.services.UserInfo();
				emailuser = oUser.getUser().isAdminUser();
				removeAllAction = this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId;
				setFilterCondition = this.base.getView().getContent()[0].mAggregations.content.mAggregations.content.sId;
				if (!emailuser) {
					this.base.getView().mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._header.mAggregations.items[0].mAggregations.content[1].mAggregations.content.mForwardedAggregations.actions[0].mAggregations.action.mProperties.visible = false;
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
					// sap.ui.getCore().byId(filterbar).removeAllFilterItems();

					// this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.removeAllFilterItems(false);
					// this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].removeAllFilterItems(false);
				}
				else {
					this.base.getView().mAggregations.content[0].mAggregations.content.mAggregations.content.mAggregations._header.mAggregations.items[0].mAggregations.content[1].mAggregations.content.mForwardedAggregations.actions[0].mAggregations.action.mProperties.visible = true;
					this.base.getView().getContent()[0].mAggregations.header.mAggregations.content[0].mAggregations.items[0].mAggregations.content.removeAllFilterItems(true);

				}

			}
		}
	});
});

