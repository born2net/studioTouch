import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {ApplicationState} from "../store/application-state";
// import * as _ from 'lodash';
import {Observable} from "rxjs";
import {IDataBaseManager, ILoadManager, IPepperConnection, IPepperAuthReply} from "../libs/Imsdb";



@Injectable()
export class RedPepperService {

    constructor(private store: Store<ApplicationState>) {
        // this.store.select(store => store.appDb.userModel).subscribe((userModel: UserModel) => {
        //     this.userModel = userModel;
        // })
    }

    private m_loaderManager: ILoadManager;
    private databaseManager: IDataBaseManager;

    // public get loadManager() {
    //     return this.m_loaderManager;
    // }
    //
    // public get msdb() {
    //     return this.m_msdb;
    // }

    public dbConnect(i_user, i_pass): Observable<any> {
        return Observable.create(observer => {
            this.m_loaderManager = new LoaderManager() as ILoadManager;
            this.databaseManager = this.m_loaderManager.m_dataBaseManager;

            this.m_loaderManager.create(i_user, i_pass, (pepperAuthReply: IPepperAuthReply) => {
                var pepperConnection: IPepperConnection = {
                    pepperAuthReply: pepperAuthReply,
                    dDataBaseManager: this.databaseManager,
                    loadManager: this.m_loaderManager,
                }
                observer.next(pepperConnection);

                // if (i_result.status) {
                // var domain = loaderManager['m_domain'];
                // var resellerInfo =  loaderManager['m_resellerInfo'];
                // var whiteLabel = parseInt($(resellerInfo).find('WhiteLabel').attr('enabled'));
                // var resellerId = parseInt($(resellerInfo).find('BusinessInfo').attr('businessId'));
                // var resellerName = $(resellerInfo).find('BusinessInfo').attr('name');
                // var businessID = loaderManager['m_businessId'];
                // var eri = loaderManager['m_eri'];

                // var authTime = Date.now();
                // var components = jQuery(resellerInfo).find('InstalledApps').find('App');
                // var installComponents = {};
                // _.each(components, function (component) {
                //     if (Number(jQuery(component).attr('installed')) == 1)
                //         installComponents[jQuery(component).attr('id')] = 1;
                // });
                // }
            });

        })


    }

    /**
     Get a list of all campaigns per the account
     @method getCampaignIDs
     @return {Array} campaigns
     **/
    public getCampaignIDs() {
        let campaigns = [];
        // var aa = this.m_msdb.table_campaigns();
        this.store.dispatch({type: 'MSDB', payload: this.databaseManager})

        setTimeout(()=>{
            this.store.dispatch({type: 'MSDB2', payload: this.databaseManager})
        },1000)

        var a = this.databaseManager.table_campaigns().getAllPrimaryKeys();
        var b = this.databaseManager.table_campaigns()

        // var c = this.m_msdb.table_campaigns().m_fields[2].field
        // var d = this.m_msdb.table_campaigns().m_fields[0].isNullAble;
        // var e = this.m_msdb.table_campaigns().m_fields[1].field;


        // $(this.m_msdb.table_campaigns().getAllPrimaryKeys()).each(function (k, campaign_id) {$(this.m_msdb.table_campaigns().getAllPrimaryKeys()).each(function (k, campaign_id) {
        //     campaigns.push(campaign_id);
        // });
        return campaigns;
    }

}