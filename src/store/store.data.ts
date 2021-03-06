import {Map, List} from 'immutable';
import {UserModel} from "../models/UserModel";
import {AuthenticateFlags} from "./actions/appdb.actions";
import {ISDK} from "../store/imsdb.interfaces_auto";
import {appDb} from "../store/reducers/appdb.reducer";
import {msDatabase} from "../store/reducers/msdb.reducer";
import {storeFreeze} from "ngrx-store-freeze";
import {ActionReducer, combineReducers} from "@ngrx/store";
import {ApplicationState} from "./application.state";
import {compose} from "@ngrx/core";

const reducers = {msDatabase, appDb};
export const developmentReducer: ActionReducer<ApplicationState> = compose(storeFreeze, combineReducers)(reducers);
export const productionReducer: ActionReducer<ApplicationState> = combineReducers(reducers);


export interface IMsDatabase {
    participants: [
        {
            a: {
                c: any;
            }
        }
        ],
    threads: { [key: number]: any };
    sdk: ISDK
}

export interface IAppDb {
    totalStations: string;
    appStartTime: number;
    appBaseUrl: string;
    userModel: UserModel,
    cloudServers: string;
    serversStatus: string;
    appAuthStatus: Map<string,AuthenticateFlags>;
    appBaseUrlUser: string;
    appBaseUrlCloud: string;
}

export const INITIAL_STORE_DATA: IMsDatabase = {
    threads: {},
    participants: [
        {
            a: {
                c: 1
            }
        }

    ],
    sdk: null
}


export const INITIAL_APP_DB: IAppDb = {
    totalStations: '',
    appStartTime: -1,
    appBaseUrl: '',
    userModel: new UserModel({
        user: '',
        pass: '',
        authenticated: false,
        businessId: -1,
        rememberMe: false,
        twoFactorRequired: false,
        accountType: -1
    }),
    appAuthStatus: Map({authStatus: AuthenticateFlags.NONE}),
    cloudServers: '',
    serversStatus: '',
    appBaseUrlUser: '',
    appBaseUrlCloud: ''
};