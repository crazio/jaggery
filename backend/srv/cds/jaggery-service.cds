namespace leverx.com.jaggery;

using com.leverx.jaggery as data from '../../db/index';

service ProjectService {
    @readonly entity Projects as projection on data.Projects;
}