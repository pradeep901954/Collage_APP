using db from '../db/schema';

service MyService {
    @cds.redirection.target
    entity teactureview as projection on db.lectures where lStatus = 'Approved';
    @odata.draft.enabled
    entity depart as projection on db.Department;
    entity teacher as projection on db.teacher;
    entity student as projection on db.student;
    
    @odata.draft.enabled
    @odata.draft.bypass
    @Common.SideEffects  : {
        $Type : 'Common.SideEffectsType',
        SourceProperties : [
            'lDateOfBirth'
        ],
        TargetProperties : [
            'lAge',
        ],
    }
    entity lectures as projection on db.lectures;
    function postattach(p : String) returns String;
    function draftsfunc(para : String) returns String;
    function url(par : String) returns String;
    entity Admin as projection on db.Admin;
    entity Files as projection on db.Files;
}