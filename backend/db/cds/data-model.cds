namespace com.leverx.jaggery;

using cuid from '@sap/cds/common';

entity Projects : cuid {
	title: String;
	description: String;
}