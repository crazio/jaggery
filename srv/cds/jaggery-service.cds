namespace com.leverx.jaggery;

using com.leverx.jaggery as data from '../../db/index';

service JaggeryService {

  entity Courses as projection on data.Courses;
    
  entity Lections as projection on data.Lections;
    
  entity Prerequisites as projection on data.Prerequisites;
    
  entity Persons as projection on data.Persons;
    
  entity Lectors as projection on data.Lectors;
    
  entity Students as projection on data.Students;
    
  entity Groups as projection on data.Groups;
    
  entity Series as projection on data.Series;
    
  entity Timetables as projection on data.Timetables;
    
  entity Studies as projection on data.Studies;
    
  @readonly
  entity GroupsOfStudens as projection on data.Groups2Students;
  
  @readonly
  entity LectorsInSeries as projection on data.Series2Lectors;
  
  @readonly
  entity CourseStatuses as projection on data.CourseStatuses;
    
}