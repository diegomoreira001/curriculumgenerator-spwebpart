import * as React from 'react';
import styles from './SkillsToPptCv.module.scss';
import {ISkillsToPptCvProps} from './ISkillsToPptCvProps';
import MockHttpClient from './MockHttpClient';
import {Environment, EnvironmentType} from '@microsoft/sp-core-library';
import {SPHttpClient, SPHttpClientResponse} from '@microsoft/sp-http';
import {} from '@microsoft/sp-application-base'
import {SkillProcessor} from "../utils/SkillProcessor";


export default class SkillsToPptCv extends React.Component<ISkillsToPptCvProps, {
  listHtml: string;
}> {

  constructor(props) {
    super(props);
    this.state = {listHtml: ''};
    this.createCV = this.createCV.bind(this);
  }

  public render(): React.ReactElement<ISkillsToPptCvProps> {

    let list = this.state.listHtml;

    return (

      <div className={ styles.skillsToPptCv }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Need a CV?</span>
              <p className={ styles.subTitle }>Type below the EID of whom you would like their CV and press create.</p>
              <textarea id="tbLoginName" defaultValue={ 'jhon.doe' } className={ styles.textBox }/>
              <a href="#" className={ styles.button } onClick={this.createCV}>
                <span className={ styles.label }>Create</span>
              </a>
              <div className="loader">Loading...</div>
              <div id="spListContainer" dangerouslySetInnerHTML={{ __html: list }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private createCV() {

    //Renderizar progreso

    //Se obtienen los datos de SP
    let orderedSkills;
    //TODO: Rescatar el login del textbox y pasar el parametro
    this._getSkillListFromSPAsync("diego.moreira@avanade").then((response) => {
      //Aca hay que ordenar los skills por nivel y quedarse con los 6 primeros
      orderedSkills = SkillProcessor.mapAndOrderSkills(response, this._skillNames);
      console.log(orderedSkills);
      //Generar el PPT

      //Renderizar progreso
    }).catch((error) => {
      //Renderizar error
    });
  }


  //Metodos para renderizar las listas en HTML
  /*private _renderListAsync(): void {
    // Local environment
    if (Environment.type === EnvironmentType.Local) {
      this._getMockListData().then((response) => {
        this._renderList(response.value);
      });
    } else if (Environment.type === EnvironmentType.SharePoint || Environment.type === EnvironmentType.ClassicSharePoint) {
      this._getListData().then((response) => {
        this._renderList(response.value);
      });
    }

  }*/

  private _renderList(items: ISPList[]): void {
    let html: string = '';
    items.forEach((item: ISPList) => {
      html += `
     <ul class="${styles.list}">
       <li class="${styles.listItem}">
         <span class="ms-font-l">${item.Title}</span>
       </li>
     </ul>`;
    });

    //Actualiza el state del componente y dispara el render()
    this.setState({listHtml: html});
  }

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
  private _getSkillListFromSPAsync(loginName : string): Promise<object> {

    //1 Obtener SiteUser (y su employee Id)
    return this._doRestGetSiteUserByLoginName(loginName).then((siteUser) => {
      //2 Obtener List Items de la lista de Relevamiento de conocimientos filtrando por campo empleadoId
      return this._doRestGetListData(siteUser.Id).then((skillsItemResponse) => {
        return skillsItemResponse;
      });
    });


  }

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
  private _doRestGetSiteUserByLoginName(loginName: string): Promise<ISPSiteUser> {

    return this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl +
      `/_api/Web/SiteUsers(@v)?@v='i:0#.f|membership|${loginName}'`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

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
  private _doRestGetListData(employeeId: string): Promise<ISPLists> {

    return this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl +
      `/_api/web/lists/GetByTitle('Training - Relevamiento de conocimientos')/items?$expand=AuthorId`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  //Obtiene los datos de una objeto Mock
  private _getMockListData(): Promise<ISPLists> {
    return MockHttpClient.get()
      .then((data: ISPList[]) => {
        var listData: ISPLists = { value: data };
        return listData;
      }) as Promise<ISPLists>;
  }

  private _skillNames : string[] = ['whoknows','whatever'];

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


