using MyService as service from '../../srv/service';
annotate service.depart with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Head of the Deparment',
                Value : depHead,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Department Name',
                Value : depName,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Teachers',
            ID : 'Teachers',
            Target : 'depttotea/@UI.LineItem#Teachers',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Student',
            ID : 'Student',
            Target : 'depttostu/@UI.LineItem#Student',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Department ID',
            Value : depId,
            ![@UI.Importance] : #Low,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Head of The Deparment',
            Value : depHead,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Department Name',
            Value : depName,
        },
    ],
    UI.SelectionPresentationVariant #table : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : depHead,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #NE,
                            Low : 'None',
                        },
                    ],
                },
            ],
        },
    },
);

annotate service.teacher with @(
    UI.LineItem #Teachers : [
        {
            $Type : 'UI.DataField',
            Value : lId,
            Label : 'Leacture ID',
        },
        {
            $Type : 'UI.DataField',
            Value : tNames,
            Label : 'Leacture Name',
            ![@UI.Importance] : #Low,
        },{
            $Type : 'UI.DataField',
            Value : tAdress,
            Label : 'Address',
        },{
            $Type : 'UI.DataField',
            Value : tAge,
            Label : 'Age',
        },{
            $Type : 'UI.DataField',
            Value : tEmail,
            Label : 'Email',
        },{
            $Type : 'UI.DataField',
            Value : tPhone,
            Label : 'Phone',
        },{
            $Type : 'UI.DataField',
            Value : tSalary,
            Label : 'Salary',
        },]
);
annotate service.student with @(
    UI.LineItem #Student : [
        {
            $Type : 'UI.DataField',
            Value : sId,
            Label : 'Student ID',
        },{
            $Type : 'UI.DataField',
            Value : sName,
            Label : 'Student Name',
        },{
            $Type : 'UI.DataField',
            Value : sPhone,
            Label : 'Phone',
        },{
            $Type : 'UI.DataField',
            Value : sAge,
            Label : 'Age',
        },{
            $Type : 'UI.DataField',
            Value : sAddress,
            Label : 'Address',
        },]
);
annotate service.depart with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : depName,
        },
        TypeName : 'Department Details',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : 'Teachers / Student Details',
        },
    }
);
annotate service.student with {
    sId @Common.FieldControl : #ReadOnly
};
annotate service.teacher with {
    st_Id @Common.FieldControl : #ReadOnly
};
annotate service.teacher with {
    tNames @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'lectures',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : tNames,
                    ValueListProperty : 'lNames',
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lId',
                    LocalDataProperty : lId,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lAge',
                    LocalDataProperty : tAge,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lPhone',
                    LocalDataProperty : tPhone,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lAdress',
                    LocalDataProperty : tAdress,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lEmail',
                    LocalDataProperty : tEmail,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lSalary',
                    LocalDataProperty : tSalary,
                },
            ],
            Label : 'Leactures',
        PresentationVariantQualifier : 'vh_teacher_tNames',
        },
        Common.ValueListWithFixedValues : true
)};
annotate service.depart with {
    depId @Common.FieldControl : #ReadOnly
};
annotate service.depart with {
    noTeachers @Common.FieldControl : #ReadOnly
};
annotate service.lectures with @(
    UI.PresentationVariant #vh_teacher_tNames : {
        $Type : 'UI.PresentationVariantType',
        SortOrder : [
            {
                $Type : 'Common.SortOrderType',
                Property : lId,
                Descending : true,
            },
        ],
    }
);

annotate service.teacher with {
    lId @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'teactureview',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : lId,
                    ValueListProperty : 'lId',
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lNames',
                    LocalDataProperty : tNames,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lAge',
                    LocalDataProperty : tAge,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lPhone',
                    LocalDataProperty : tPhone,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lAdress',
                    LocalDataProperty : tAdress,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lEmail',
                    LocalDataProperty : tEmail,
                },
                {
                    $Type : 'Common.ValueListParameterInOut',
                    ValueListProperty : 'lSalary',
                    LocalDataProperty : tSalary,
                },
            ],
            Label : 'Leactures',
        },
        Common.ValueListWithFixedValues : true
)};

