import * as React from 'react';
import { ISkillsToPptCvProps } from './ISkillsToPptCvProps';
export default class SkillsToPptCv extends React.Component<ISkillsToPptCvProps, {
    listHtml: string;
}> {
    constructor(props: any);
    render(): React.ReactElement<ISkillsToPptCvProps>;
    private createCV;
    private _renderList;
    /**
     *
     * Gets Skills from a Sharepoint List by LoginName Async.
     * Returns a Promise<object>
     *
     * Through various REST requests obtains the skills and returns a K,V list
     * where K is the SkillName and V is SkillLevel
     *
     * @param loginName
     * @private
     */
    private _getSkillListFromSPAsync;
    /**
     *
     * Gets a SiteUser entity from Sharepoint (Async).
     * Returns a Promise
     *
     * Through a REST requests to /_api/Web/SiteUsers obtains a SiteUser JSON
     * Needs the loginName which is the email address: jhon.doe@domain.com
     *
     * @param loginName
     * @private
     */
    private _doRestGetSiteUserByLoginName;
    /**
     *
     * Gets a List from Sharepoint (Async).
     * Returns a Promise
     *
     * Through a REST requests to /_api/web/lists/${listName} obtains a list
     * Needs the List Name to retrieve.
     * Needs the employeeID (SiteUser id) to filter by user and avoid retrieving the entire list.
     *
     * @param employeeId
     * @private
     */
    private _doRestGetListData;
    private _getMockListData;
    private _skillNames;
}
export interface ISPLists {
    value: ISPList[];
}
export interface ISPList {
    Title: string;
    Id: string;
}
export interface ISPSiteUser {
    LoginName: string;
    Id: string;
}
