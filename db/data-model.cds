namespace leverx.com.jaggery;

using cuid from '@sap/cds/common';
using leverx.com.jaggery as types from './type-model';

entity Users : cuid {
    firstName : String not null;
    lastName : String not null;
    middleName : String;
    gender: types.Gender;
    password : String not null;
}