"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var SkillsToPptCv_module_scss_1 = require("./SkillsToPptCv.module.scss");
var MockHttpClient_1 = require("./MockHttpClient");
var sp_http_1 = require("@microsoft/sp-http");
var SkillProcessor_1 = require("../utils/SkillProcessor");
var SkillsToPptCv = /** @class */ (function (_super) {
    __extends(SkillsToPptCv, _super);
    function SkillsToPptCv(props) {
        var _this = _super.call(this, props) || this;
        _this._skillNames = ['whoknows', 'whatever'];
        _this.state = { listHtml: '' };
        _this.createCV = _this.createCV.bind(_this);
        return _this;
    }
    SkillsToPptCv.prototype.render = function () {
        var list = this.state.listHtml;
        return (React.createElement("div", { className: SkillsToPptCv_module_scss_1.default.skillsToPptCv },
            React.createElement("div", { className: SkillsToPptCv_module_scss_1.default.container },
                React.createElement("div", { className: SkillsToPptCv_module_scss_1.default.row },
                    React.createElement("div", { className: SkillsToPptCv_module_scss_1.default.column },
                        React.createElement("span", { className: SkillsToPptCv_module_scss_1.default.title }, "Need a CV?"),
                        React.createElement("p", { className: SkillsToPptCv_module_scss_1.default.subTitle }, "Type below the EID of whom you would like their CV and press create."),
                        React.createElement("textarea", { id: "tbLoginName", defaultValue: 'jhon.doe', className: SkillsToPptCv_module_scss_1.default.textBox }),
                        React.createElement("a", { href: "#", className: SkillsToPptCv_module_scss_1.default.button, onClick: this.createCV },
                            React.createElement("span", { className: SkillsToPptCv_module_scss_1.default.label }, "Create")),
                        React.createElement("div", { className: "loader" }, "Loading..."),
                        React.createElement("div", { id: "spListContainer", dangerouslySetInnerHTML: { __html: list } }))))));
    };
    SkillsToPptCv.prototype.createCV = function () {
        //Renderizar progreso
        var _this = this;
        //Se obtienen los datos de SP
        var orderedSkills;
        //TODO: Rescatar el login del textbox y pasar el parametro
        this._getSkillListFromSPAsync("diego.moreira@avanade").then(function (response) {
            //Aca hay que ordenar los skills por nivel y quedarse con los 6 primeros
            orderedSkills = SkillProcessor_1.SkillProcessor.mapAndOrderSkills(response, _this._skillNames);
            console.log(orderedSkills);
            //Generar el PPT
            //Renderizar progreso
        }).catch(function (error) {
            //Renderizar error
        });
    };
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
    SkillsToPptCv.prototype._renderList = function (items) {
        var html = '';
        items.forEach(function (item) {
            html += "\n     <ul class=\"" + SkillsToPptCv_module_scss_1.default.list + "\">\n       <li class=\"" + SkillsToPptCv_module_scss_1.default.listItem + "\">\n         <span class=\"ms-font-l\">" + item.Title + "</span>\n       </li>\n     </ul>";
        });
        //Actualiza el state del componente y dispara el render()
        this.setState({ listHtml: html });
    };
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
    SkillsToPptCv.prototype._getSkillListFromSPAsync = function (loginName) {
        var _this = this;
        //1 Obtener SiteUser (y su employee Id)
        return this._doRestGetSiteUserByLoginName(loginName).then(function (siteUser) {
            //2 Obtener List Items de la lista de Relevamiento de conocimientos filtrando por campo empleadoId
            return _this._doRestGetListData(siteUser.Id).then(function (skillsItemResponse) {
                return skillsItemResponse;
            });
        });
    };
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
    SkillsToPptCv.prototype._doRestGetSiteUserByLoginName = function (loginName) {
        return this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl +
            ("/_api/Web/SiteUsers(@v)?@v='i:0#.f|membership|" + loginName + "'"), sp_http_1.SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        });
    };
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
    SkillsToPptCv.prototype._doRestGetListData = function (employeeId) {
        return this.props.context.spHttpClient.get(this.props.context.pageContext.web.absoluteUrl +
            "/_api/web/lists/GetByTitle('Training - Relevamiento de conocimientos')/items?$expand=AuthorId", sp_http_1.SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        });
    };
    //Obtiene los datos de una objeto Mock
    SkillsToPptCv.prototype._getMockListData = function () {
        return MockHttpClient_1.default.get()
            .then(function (data) {
            var listData = { value: data };
            return listData;
        });
    };
    return SkillsToPptCv;
}(React.Component));
exports.default = SkillsToPptCv;
//# sourceMappingURL=SkillsToPptCv.js.map