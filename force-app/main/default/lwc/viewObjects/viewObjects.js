import { LightningElement, wire } from 'lwc';

import getAPINames from "@salesforce/apex/Controller.getAPINames";
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

const COLS = [
    {
        label: "apiName",
        fieldName: "apiName",
        hideDefaultActions: true,
    },
    {
        label: "label",
        fieldName: "label",
        hideDefaultActions: true,
    },
    {
        label: "compound",
        fieldName: "compound",
        hideDefaultActions: true,
    },
    {
        label: "filteredLookupInfo",
        fieldName: "filteredLookupInfo",
        hideDefaultActions: true,
    },
    {
        label: "relationshipName",
        fieldName: "relationshipName",
        hideDefaultActions: true,
    }
];

export default class ViewObjects extends LightningElement {

    items = [];
    value;
    selectedName;
    columns = COLS;

    @wire(getAPINames)
    allAPINames({ error, data }) {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                this.items = [...this.items, { value: data[i], label: data[i] }];
            }
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.items = undefined;
        }
    }

    get objectsOptions() {
        return this.items;
    }

    @wire(getObjectInfo, { objectApiName: '$selectedName' })
    objectInfo;

    get ObjectIcon() {
        console.log(JSON.stringify(this.objectInfo.data.themeInfo.iconUrl));
        return this.objectInfo.data.themeInfo.iconUrl ? this.objectInfo.data.themeInfo.iconUrl : null;
    }

    get ObjectLabel() {
        return this.objectInfo.data.label ? this.objectInfo.data.label : null;
    }
    get ObjectApiName() {
        return this.objectInfo.data.apiName ? this.objectInfo.data.apiName : null;
    }

    get ObjectkeyPrefix() {
        return this.objectInfo.data.keyPrefix ? this.objectInfo.data.keyPrefix : null;
    }

    get ObjectInfo() {
        if (this.objectInfo.data) {
            this.info = 'accessable';
        }
        if (this.objectInfo.data.queryable) {
            this.info = this.info + ', queryable';
        }
        if (this.objectInfo.data.custom) {
            this.info = this.info + ', custom';
        }
        if (this.objectInfo.data.updateable) {
            this.info = this.info + ', updateable';
        }
        return this.objectInfo ? this.info : null;
    }

    get fieldInformation() {
        return Object.values(this.objectInfo.data.fields) ? Object.values(this.objectInfo.data.fields) : null;
    }

    handleChange(event) {
        this.selectedName = event.detail.value;
    }
}