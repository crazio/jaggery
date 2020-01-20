namespace com.leverx.jaggery;

using cuid from '@sap/cds/common';
using com.leverx.jaggery as customizing from './data-customizing';
using com.leverx.jaggery as types from './data-types';

entity Courses : cuid {
  name : String not null;
  description : String;
  isExternal : Boolean default false;
  lections : Association to many Lections on lections.course = $self;
  series : Association to many Series on series.course = $self;
  prerequisites : Association to many Prerequisites on prerequisites.course = $self;
}

entity Lections : cuid {
  number : String not null; //1a, 1.1 and so on
  name : String not null;
  description : String;	
  course : Association to Courses;
}

entity Prerequisites : cuid {
  course : Association to Courses;
  required : Association to Courses;
  optional : Boolean;
}

entity Persons : cuid {
  lastName : String not null;
  firstName : String not null;
  middleName : String not null;
}

entity Lectors : cuid {
  person : Association to Persons;
  series : Association to many Series2Lectors on series.lector = $self;
}

entity Students : cuid {
  person : Association to Persons;
  groups : Association to many Groups2Students on groups.student = $self;
}

entity Groups : cuid {
  students : Association to many Groups2Students on students.studentGroup = $self;
  series : Association to Series;
  timetable : Association to one Timetables;
}

entity Series : cuid {
  course : Association to Courses;
  status : Association to customizing.CourseStatuses;
  lectors : Association to many Series2Lectors on lectors.series = $self;
  groups : Association to many Groups on groups.series = $self;
}

entity Timetables : cuid {
  studentGroup : Association to Groups;
  studies : Association to many Studies on studies.timetable = $self;
}

entity Studies {
  key timetable : Association to Timetables;
  key lection : Association to Lections;
  date : Date;
  startTime : Time;
  endTime : Time;
}

entity Groups2Students {
  key studentGroup : Association to Groups;
  key student : Association to Students;
}

entity Series2Lectors {
  key series : Association to Series;
  key lector : Association to Lectors;
}
