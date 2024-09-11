namespace db;
using {managed} from '@sap/cds/common';

entity Department{
    key dUuid : UUID; 
    key depId : String default '';
    aId : String;
    depHead : String;
    depName : String;
    noTeachers : Int16;
    depttotea : Composition of  many teacher on depttotea.teatodept = $self;
    depttostu : Composition of many student on depttostu.stutodept = $self;
    depttopri : Association to one Admin on depttopri.aId = aId;
}

entity teacher {
    key tUuid : UUID;
    key st_Id : String default '' ;
    lId : String default '';
    depId : String;
    tNames : String;
    tAge :  Int16;
    tPhone : String;
    tAdress : String;
    tSalary : String;
    tEmail : String;
    teatodept : Association to many Department on teatodept.depId = depId;  
}

entity lectures {
    key lUuid : UUID;
    lId  : String;
    lNames : String;
    lAge :  Int16;
    lPhone : String;
    lAdress : String; 
    lEmail : String;  
    lSalary : String;
    lDateOfBirth : Date;
    lStatus : String default 'Approval in Pending';
    lField : String default 'None';
    EmailID : String;
    lectofile : Composition of   many Files on lectofile.filetolec = $self;
}

entity student{
    key sUuid : UUID;
    key sId : String default'';
    depId : String;
    sName : String;
    sAge : String;
    sAddress : String;
    sPhone : String;
    stutodept :  Association to one Department on stutodept.depId =depId;
}

entity Admin{
    key aUuid : UUID;
    aId : String;
    aName : String;
    aAge : String;
    aPhone : String;
    aEmail: String;
    EmailID :String;
    pritodep : Composition of one Department on pritodep.depttopri = $self;
}

entity Files : managed {
    key id        : UUID;
        fkey      : UUID;

        @Core.MediaType  : mediaType
        content   : LargeBinary;

        @Core.IsMediaType: true
        mediaType : String;
        fileName  : String;
        size      : Integer;
        url       : String;
        filetolec  : Association to one lectures
                        on filetolec.lUuid = fkey;
        
}


