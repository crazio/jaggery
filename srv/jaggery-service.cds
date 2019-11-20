namespace leverx.com.jaggery;

using leverx.com.jaggery as data from '../db/data-model';

service Auth {

    entity Users as projection on data.Users;

}

