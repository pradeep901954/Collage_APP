using MyService as service from '../../srv/service';
annotate service.lectures with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Lecture ID',
                Value : lId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Lecture Names',
                Value : lNames,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Age',
                Value : lAge,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Phone',
                Value : lPhone,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Adress',
                Value : lAdress,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Email',
                Value : lEmail,
            },
            {
                $Type : 'UI.DataField',
                Label : 'lSalary',
                Value : lSalary,
            },
            {
                $Type : 'UI.DataField',
                Value : lField,
                Label : 'Department Name',
            },
            {
                $Type : 'UI.DataField',
                Value : lDateOfBirth,
                Label : 'lDateOfBirth',
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
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Lecture ID',
            Value : lId,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Lecture Name',
            Value : lNames,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Age',
            Value : lAge,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Phone',
            Value : lPhone,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Address',
            Value : lAdress,
        },
        {
            $Type : 'UI.DataField',
            Value : lStatus,
            Label : 'Status',
        },
        {
            $Type : 'UI.DataField',
            Value : lField,
            Label : 'Depatment Name',
        },
        {
            $Type : 'UI.DataField',
            Value : lEmail,
            Label : 'Lecture Email',
        },
        {
            $Type : 'UI.DataField',
            Value : lDateOfBirth,
            Label : 'lDateOfBirth',
        },
    ],
    UI.DeleteHidden : true,
    );

annotate service.lectures with {
    lId @Common.FieldControl : #ReadOnly
};
annotate service.lectures with @(
    UI.HeaderInfo : {
        TypeName : 'Leacture Details',
        TypeNamePlural : '',
        Title : {
            $Type : 'UI.DataField',
            Value : lNames,
        },
        Description : {
            $Type : 'UI.DataField',
            Value : 'Staff info',
        },
    }
);
annotate service.lectures with @(
    UI.SelectionFields : []
);
annotate service.lectures with {
    lAge @(
        Common.Label : 'lAge',
        Common.FieldControl : #ReadOnly,
    )
};
annotate service.lectures with @(
    UI.SelectionPresentationVariant #tableView : {
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
                    PropertyName : lStatus,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Approved',
                        },
                    ],
                },
            ],
        },
        Text : 'Approved Candidates',
    },
    UI.LineItem #tableView : [
        {
            $Type : 'UI.DataField',
            Value : lNames,
            Label : 'Lecture Names',
        },{
            $Type : 'UI.DataField',
            Value : lEmail,
            Label : 'Lecture Email',
        },{
            $Type : 'UI.DataField',
            Value : lAge,
            Label : 'Age'
        },{
            $Type : 'UI.DataField',
            Value : lField,
            Label : 'Department Name',
        },{
            $Type : 'UI.DataField',
            Value : lPhone,
            Label : 'Phone',
        },{
            $Type : 'UI.DataField',
            Value : lSalary,
            Label : 'Salary',
        },{
            $Type : 'UI.DataField',
            Value : lStatus,
            Label : 'Status',
        },
       ],
    UI.SelectionPresentationVariant #tableView1 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : lStatus,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Approval in Pending',
                        },
                    ],
                },],
        },
        Text : 'Pending Candidates',
    }
);
annotate service.lectures with @(
    UI.LineItem #tableView1 : [
        {
            $Type : 'UI.DataField',
            Value : lNames,
            Label : 'Lecture Names',
        },{
            $Type : 'UI.DataField',
            Value : lPhone,
            Label : 'Phone',
        },{
            $Type : 'UI.DataField',
            Value : lSalary,
            Label : 'Salary',
            Criticality : #VeryPositive,
        },{
            $Type : 'UI.DataField',
            Value : lEmail,
            Label : 'Lecture Email',
        },{
            $Type : 'UI.DataField',
            Value : lAdress,
            Label : 'Adress',
        },{
            $Type : 'UI.DataField',
            Value : lAge,
            Label : 'Age'
        },{
            $Type : 'UI.DataField',
            Value : lField,
            Label : 'Department Name',
        },
        {
            $Type : 'UI.DataField',
            Value : EmailID,
            Label : 'Rejected By',
        },
        {
            $Type : 'UI.DataField',
            Value : lStatus,
            Label : 'Status',
        },],
    UI.SelectionPresentationVariant #tableView2 : {
        $Type : 'UI.SelectionPresentationVariantType',
        PresentationVariant : {
            $Type : 'UI.PresentationVariantType',
            Visualizations : [
                '@UI.LineItem#tableView1',
            ],
        },
        SelectionVariant : {
            $Type : 'UI.SelectionVariantType',
            SelectOptions : [
                {
                    $Type : 'UI.SelectOptionType',
                    PropertyName : lStatus,
                    Ranges : [
                        {
                            Sign : #I,
                            Option : #EQ,
                            Low : 'Rejected',
                        },
                    ],
                },],
        },
        Text : 'Rejected Candicates',
    }
);
annotate service.depart with @(
    UI.PresentationVariant #vh_lectures_lField : {
        $Type : 'UI.PresentationVariantType',
        SortOrder : [
            {
                $Type : 'Common.SortOrderType',
                Property : depName,
                Descending : false,
            },
        ],
    },
    UI.PresentationVariant #vh_lectures_lField1 : {
        $Type : 'UI.PresentationVariantType',
        SortOrder : [
            {
                $Type : 'Common.SortOrderType',
                Property : depName,
                Descending : false,
            },
        ],
    },
);

annotate service.lectures with {
    lField @(Common.ValueList : {
            $Type : 'Common.ValueListType',
            CollectionPath : 'depart',
            Parameters : [
                {
                    $Type : 'Common.ValueListParameterInOut',
                    LocalDataProperty : lField,
                    ValueListProperty : 'depName',
                },
            ],
            Label : 'Department',
            PresentationVariantQualifier : 'vh_lectures_lField1',
        },
        Common.ValueListWithFixedValues : false,
        Common.FieldControl : #Mandatory,
)};

annotate service.lectures with {
    lNames @Common.FieldControl : #Mandatory
};

annotate service.lectures with {
    lPhone @Common.FieldControl : #Mandatory
};

annotate service.lectures with {
    lAdress @Common.FieldControl : #Mandatory
};

annotate service.lectures with {
    lEmail @Common.FieldControl : #Mandatory
};

annotate service.lectures with {
    lDateOfBirth @Common.FieldControl : #Mandatory
};

