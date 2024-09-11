const cds = require('@sap/cds');
const { select } = require('@sap/cds/libx/_runtime/hana/execute');
const { readStreamWithHanaClient } = require('@sap/cds/libx/_runtime/hana/streaming');
const { parse } = require("path");
const { exit } = require('process');
const { escape } = require('querystring');

module.exports = async function (params, srv) {
    let { depart, lectures, student, teacher, Admin, Files } = this.entities;

    this.before('CREATE', depart, async (req) => {
        debugger
        var e_data1 = await SELECT.from(teacher).where`depId='1'`;
        var e_dataDExits = e_data1[0].lId;

        let nextDepId = 'D001'; // default starting depId
        if (e_dataDExits) {
            let numericPart = parseInt(e_dataDExits.substr(1)); // extract numeric part
            nextDepId = 'D' + ('000' + (numericPart + 1)).slice(-3); // increment and format
        }
        req.data.depId = nextDepId;
        var [lId] = [nextDepId];
        await cds.update(teacher).set({ lId: nextDepId }).where({ depId: '1' });

        if (req.data.depttostu) {
            var e_data1 = await SELECT.from(teacher).where({ depId: '1' });
            var updId = e_data1.length > 0 ? e_data1[0].tPhone : null;
            req.data.depttostu.forEach(async stu => {
                if (!stu.sId) {
                    // let pr = new Promise(async (resolve) => {
                    // var e_data1 = await SELECT.from(teacher).where({ depId: '1' });
                    var e_dataSExits = updId;
                    var nextStu;
                    if (!updId)
                        nextStu = 'S001';
                    if (e_dataSExits) {
                        let num_s = parseInt(e_dataSExits.substr(1));
                        nextStu = 'S' + ('000' + (num_s + 1)).slice(-3);
                    }
                    sId = nextStu;
                    updId = sId;
                    let newid = sId;
                    stu.sId = newid;
                    // resolve();
                    // });
                    // console.log('activated');
                    // let newid = await firstFunc(stu.sId);

                }
            });
            await cds.update(teacher).set({ tPhone: updId }).where({ depId: '1' });
        }


        var { depId, depName, noTeachers, depHead } = req.data;

        var missingFields = [];
        if (!depId) missingFields.push('depId');
        if (!depName) missingFields.push('department Name');
        if (!depHead) missingFields.push('depatment Head');
        // if (!noTeachers) missingFields.push('noTeachers');

        if (missingFields.length > 0) {
            req.error(400, `The following fields are missing: ${missingFields.join(', ')}`);
            return; // Stop further processing
        }

        if (req.data.depName) {
            req.data.depName = req.data.depName.toUpperCase();
        }
        // Check if the department with the same depName already exists
        var existingDepartment = await SELECT.from(depart).where({ depName: req.data.depName });

        if (existingDepartment.length > 0) {
            req.error(400, 'Department with the same depName already exists. Please check.');
            return; // Stop further processing
        }

        // Check if the department head (depHead) is already in use
        var existingDepartmentByHead = await SELECT.from(depart).where({ depHead: req.data.depHead });

        if (existingDepartmentByHead.length > 0) {
            req.error(400, 'Department head (depHead) is already present. Please check.');
            return; // Stop further processing
        }

        // Validate that noTeachers is a non-negative integer
        // if (!Number.isInteger(noTeachers) || noTeachers < 0) {
        //     req.error(400, 'noTeachers must be a non-negative integer.');
        //    return; // Stop further processing
        // }
        if (!/^[a-zA-Z\s]+$/.test(depName)) {
            req.error(400, 'Department Name should contain only alphabets and spaces.');
        }
        // Validate depHead
        if (!/^[a-zA-Z\s]+$/.test(depHead)) {
            req.error(400, 'Department Head should contain only alphabets and spaces.');
        }

        // var notea = req.data.depttotea;
        // var len = notea.length;
        // noTeachers = len - 1;

        var teadata = req.data.depttotea;
        var len = teadata.length; //req.data.depttotea[0].lId
        if (len >= 1) {
            var depId = req.data.depttotea[len - 1].depId;
            var lId = req.data.depttotea[len - 1].lId;

            // Check if teacher with the same st_Id already exists in the same department
            const existingTeacher = await SELECT.from(teacher.drafts)
                .where({ lId: lId }).and({ depId: depId });

            if (existingTeacher.length > 1) {
                req.error(400, 'A teacher with the same ID already exists in this department.');
            }

        }
        var data = await SELECT.from(student.drafts);
        var len = req.data.depttostu.length;
        if (len >= 1) {
            var { sName, sAddress, sAge, sPhone } = req.data.depttostu[len - 1];

            //Check if required fields are provided
            var missingFields = [];
            if (!sName) missingFields.push('Student Name ');
            if (!sAge) missingFields.push('Student Age ');
            if (!sPhone) missingFields.push('Student phone number');
            if (!sAddress) missingFields.push('Student Address');

            if (missingFields.length > 0) {
                req.error(400, `Following field is missing: ${missingFields.join(', ')}`);
            }
            // Validate sPhone
            const phonePattern = /^[0-9]{10}$/; // Regex to match exactly 10 digits
            if (!phonePattern.test(sPhone)) {
                req.error(400, 'Invalid phone number. It must contain exactly 10 digits and no other characters.');
                return; // Stop further processing
            }

            // Validate sAge
            if (!Number.isInteger(parseInt(sAge))) {
                req.error(400, 'Invalid age. It must be an integer number.');
                return; // Stop further processing
            }
            if (!/^[a-zA-Z\s]+$/.test(sName)) {
                req.error(400, 'Student Name should contain only alphabets and spaces.');
            }
            var existingstu = await SELECT.from(student.drafts)
                .where({ sPhone });
            var Phone = existingstu[0].sPhone;
            var existingtea = await SELECT.from(teacher.drafts)
                .where({ tPhone: sPhone });
            if (!existingtea) {
                var tPhone = existingtea[0].tPhone;
            }
            if (existingstu && existingtea) {
                if (tPhone === Phone) {
                    req.error(400, 'Phone number is already used by another Student are teacher.');
                    return;
                }
            }
            if (existingstu) {
                if (existingstu.length > 1) {
                    req.error(400, 'Phone number is already used by another Student');
                    return;
                }
            }
        }

    });

    // this.before('CREATE',student.drafts, async (req) => {
    //     debugger

    //     var e_stu = await SELECT.from(student);
    //     var e_data1 = await SELECT.from(teacher).where `depId='1'`;
    //     var e_dataSExits = e_data1[0].tPhone;
    //     let nextStu = 'S001';
    //     if (e_dataSExits){
    //         let num_s = parseInt(e_dataSExits.substr(1));
    //         nextStu = 'S' + ('000' + (num_s + 1)).slice(-3);
    //     }
    //     req.data.sId = nextStu;
    //     let [ tPhone ] = [ nextStu ];
    //     await cds.update(teacher).set({tPhone:nextStu}).where({ depId : '1' });           
    // });

    async function firstFunc(sId) {
        // var e_stu = await SELECT.from('student');
        var e_data1 = await SELECT.from(teacher).where({ depId: '1' });
        var e_dataSExits = e_data1.length > 0 ? e_data1[0].tPhone : null;
        let nextStu = 'S001';
        if (e_dataSExits) {
            let num_s = parseInt(e_dataSExits.substr(1));
            nextStu = 'S' + ('000' + (num_s + 1)).slice(-3);
        }
        sId = nextStu;
        await cds.update(teacher).set({ tPhone: nextStu }).where({ depId: '1' });
        return sId;

    }

    this.
        before('UPDATE', depart, async (req) => {
            debugger
            if (req.data.depttostu) {
                var e_data1 = await SELECT.from(teacher).where({ depId: '1' });
                var updId = e_data1.length > 0 ? e_data1[0].tPhone : null;
                req.data.depttostu.forEach(async stu => {
                    if (!stu.sId) {
                        // let pr = new Promise(async (resolve) => {
                        // var e_data1 = await SELECT.from(teacher).where({ depId: '1' });
                        var e_dataSExits = updId;
                        var nextStu;
                        if (!updId)
                            nextStu = 'S001';
                        if (e_dataSExits) {
                            let num_s = parseInt(e_dataSExits.substr(1));
                            nextStu = 'S' + ('000' + (num_s + 1)).slice(-3);
                        }
                        sId = nextStu;
                        updId = sId;
                        let newid = sId;
                        stu.sId = newid;
                        // resolve();
                        // });
                        // console.log('activated');
                        // let newid = await firstFunc(stu.sId);

                    }
                });
                await cds.update(teacher).set({ tPhone: updId }).where({ depId: '1' });
            }

            var missingFields = [];
            var { depId, depName, noTeachers, depHead } = req.data;
            if (!depName) missingFields.push('depName');
            if (!depHead) missingFields.push('depHead');
            // if (!noTeachers) missingFields.push('noTeachers');

            if (missingFields.length > 0) {
                req.error(400, `Following field is missing: ${missingFields.join(', ')}`);
            }
            if (!/^[a-zA-Z\s]+$/.test(depName)) {
                req.error(400, 'Department Name should contain only alphabets and spaces.');
            }
            // Validate depHead
            if (!/^[a-zA-Z\s]+$/.test(depHead)) {
                req.error(400, 'Department Head should contain only alphabets and spaces.');
            }

            if (req.data.depName) {
                req.data.depName = req.data.depName.toUpperCase();
            }

            // var notea = req.data.depttotea;
            // var len = notea.length;
            // req.data.noTeachers = len - 1;

            // let updata = req.data;
            // let currentuuid = req.data.dUuid;
            //     //chek HepHead
            //     if (updata.depHead  !== '')
            //     {
            //         var exsistdepHead = await SELECT.from(depart)
            //         .where({depHead : updata.depHead}).and({dUuid:currentuuid});
            //         if(exsistdepHead.length > 0){
            //             req.error(400,'HOD is already exsist');
            //         }
            //     }
            //     if (req.data.depName !== '') {
            //         // Ensure `depName` is unique
            //         var existingDepartmentByName = await SELECT.from(dep)
            //             .where({ depName: req.data.depName })
            //             .and({ dUuid: { '!=': req.data.dUuid } }); 

            //         if (existingDepartmentByName.length > 0) {
            //             req.error(400, 'Department name (depName) already exists.');
            //             return; 
            //         }
            //     } 
            // var teadata = await SELECT.from(teacher.drafts);/
            var teadata = req.data.depttotea;
            var len = teadata.length; //req.data.depttotea[0].lId
            if (len >= 1) {
                var depId = req.data.depttotea[len - 1].depId;
                var lId = req.data.depttotea[len - 1].lId;

                // Check if teacher with the same st_Id already exists in the same department
                const existingTeacher = await SELECT.from(teacher.drafts)
                    .where({ lId: lId }).and({ depId: depId });

                if (existingTeacher.length > 1) {
                    req.error(400, 'A teacher with the same ID already exists in this department.');
                }
            }

            var data = await SELECT.from(student.drafts);
            var len = req.data.depttostu.length;
            var { sName, sAddress, sAge, sPhone } = req.data.depttostu[len - 1];

            //Check if required fields are provided
            var missingFields = [];
            if (!sName) missingFields.push('Student Name ');
            if (!sAge) missingFields.push('Student Age ');
            if (!sPhone) missingFields.push('Student phone number');
            if (!sAddress) missingFields.push('Student Address');

            if (missingFields.length > 0) {
                req.error(400, `Following field is missing: ${missingFields.join(', ')}`);
            }
            // Validate sPhone
            const phonePattern = /^[0-9]{10}$/; // Regex to match exactly 10 digits
            if (!phonePattern.test(sPhone)) {
                req.error(400, 'Invalid phone number. It must contain exactly 10 digits and no other characters.');
                return; // Stop further processing
            }

            // Validate sAge
            if (!Number.isInteger(parseInt(sAge))) {
                req.error(400, 'Invalid age. It must be an integer number.');
                return; // Stop further processing
            }
            if (!/^[a-zA-Z\s]+$/.test(sName)) {
                req.error(400, 'Student Name should contain only alphabets and spaces.');
            }
            var existingstu = await SELECT.from(student.drafts)
                .where({ sPhone });
            var Phone = existingstu[0].sPhone;
            var existingtea = await SELECT.from(teacher.drafts)
                .where({ tPhone: sPhone });
            if (!existingtea) {
                var tPhone = existingtea[0].tPhone;
            }
            if (existingstu && existingtea) {
                if (tPhone === Phone) {
                    req.error(400, 'Phone number is already used by another Student are teacher.');
                    return;
                }
            }
            if (existingstu) {
                if (existingstu.length > 1) {
                    req.error(400, 'Phone number is already used by another Student');
                    return;
                }
            }
        });



    this.before('UPDATE', lectures, async (req) => {
        debugger

        // var delete_q = await DELETE.from(Files.drafts) .where({fkey : req.data.fkey });

        if (req.data.lStatus != 'Approved' && req.data.lStatus != 'Rejected') {
            var { lNames, lAge, lPhone, lAdress, lEmail, lSalary } = req.data;

            if (!lNames) {
                req.error(400, 'Field "leacture Names" is missing.');
                return; // Stop further processing
            }
            if (!/^[a-zA-Z\s]+$/.test(lNames)) {
                req.error(400, 'Lecture Name should contain only alphabets and spaces.');
            }
            if (lAge === undefined || lAge === null) {
                req.error(400, 'Field "Age" is missing.');
                return; // Stop further processing
            }

            if (!lPhone) {
                req.error(400, 'Field "Phone" is missing.');
                return; // Stop further processing
            }

            if (!lAdress) {
                req.error(400, 'Field "Adress" is missing.');
                return; // Stop further processing
            }

            if (!lEmail) {
                req.error(400, 'Field "Email" is missing.');
                return; // Stop further processing
            }

            if (!lSalary) {
                req.error(400, 'Field "Salary" is missing.');
                return; // Stop further processing
            }

            if (!Number.isInteger(lAge) || lAge < 0) {
                req.error(400, 'Field "Age" must be a non-negative integer.');
                return; // Stop further processing
            }

            if (isNaN(lSalary)) {
                req.error(400, 'Field "Salary" must be a valid number.');
                return; // Stop further processing
            }
            if (req.data.lNames) {
                req.data.lNames = req.data.lNames.toUpperCase();
            }

            var phonePattern = /^\d{10}$/; // Regex to match exactly 10 digits
            if (!phonePattern.test(req.data.lPhone)) {
                req.error(400, 'Phone number must contain exactly 10 digits.');
                return; // Stop further processing
            }
            var email = req.data.lEmail;
            if (!email.endsWith('@gmail.com')) {
                req.error(400, 'Email must end with "@gmail.com".');
                return; // Stop further processing
            }

            let salary = req.data.lSalary;
            const salaryPattern = /^\d+$/; // Regex to match only non-negative integers
            if (!salaryPattern.test(salary)) {
                req.error(400, 'Salary must be a valid integer with no letters or special characters.');
                return; // Stop further processing
            }
            var existingLecture = await
                SELECT.from(lectures)
                    .where({ lPhone });

            if (existingLecture) {
                if (existingLecture.length > 1) {
                    req.error(400, 'Phone number is already used by another lecture.');
                    return;
                }
            }
            var existingLecture = await
                SELECT.from(lectures)
                    .where({ lEmail });

            if (existingLecture) {
                if (existingLecture.length > 1) {
                    req.error(400, 'Email is already used by another lecture.');
                }
            }
        }
        else if (req.data.lStatus == 'Approved' && req.data.lId == null) {
            var e_data1 = await SELECT.from(teacher).where`depId='1'`;
            var e_dataLExits = e_data1[0].tAdress;
            var nextLec = 'L001';
            if (e_dataLExits) {
                let num_s = parseInt(e_dataLExits.substr(1));
                nextLec = 'L' + ('000' + (num_s + 1)).slice(-3);
            }
            req.data.lId = nextLec;
            var [tAdress] = [nextLec];

            await cds.update(teacher).set({ tAdress: nextLec }).where({ depId: '1' });

        }
        // var delete_q = await DELETE.from(Files.drafts).where `HasActiveEntity : 'false'`;
        // await DELETE.from(Files.drafts).where({fkey :req.data.lUuid});
    });
    // this.before('READ', lectures, async (req) => {
    //     debugger

    //     var TEST_DEST2 = await cds.connect.to("TEST_DEST1");
    //     var result1 = await TEST_DEST2.get(`/sap/opu/odata/sap/Z_CURD_021_SRV/curd_funcset('1')`);
    //     console.log(result1);
    // });

    this.before('CREATE', lectures, async (req) => {
        debugger
        var { lNames, lAge, lPhone, lAdress, lEmail, lSalary } = req.data;

        if (!lNames) {
            req.error(400, 'Field "leacture Names" is missing.');
            return; // Stop further processing
        }
        if (!/^[a-zA-Z\s]+$/.test(lNames)) {
            req.error(400, 'Lecture Name should contain only alphabets and spaces.');
        }
        if (lAge === undefined || lAge === null) {
            req.error(400, 'Field "Age" is missing.');
            return; // Stop further processing
        }

        if (!lPhone) {
            req.error(400, 'Field "Phone" is missing.');
            return; // Stop further processing
        }

        if (!lAdress) {
            req.error(400, 'Field "Adress" is missing.');
            return; // Stop further processing
        }

        if (!lEmail) {
            req.error(400, 'Field "Email" is missing.');
            return; // Stop further processing
        }

        if (!lSalary) {
            req.error(400, 'Field "Salary" is missing.');
            return; // Stop further processing
        }

        if (!Number.isInteger(lAge) || lAge < 0) {
            req.error(400, 'Field "Age" must be a non-negative integer.');
            return; // Stop further processing
        }

        if (isNaN(lSalary)) {
            req.error(400, 'Field "Salary" must be a valid number.');
            return; // Stop further processing
        }
        if (req.data.lNames) {
            req.data.lNames = req.data.lNames.toUpperCase();
        }

        var phonePattern = /^\d{10}$/; // Regex to match exactly 10 digits
        if (!phonePattern.test(req.data.lPhone)) {
            req.error(400, 'Phone number must contain exactly 10 digits.');
            return; // Stop further processing
        }
        var email = req.data.lEmail;
        if (!email.endsWith('@gmail.com')) {
            req.error(400, 'Email must end with "@gmail.com".');
            return; // Stop further processing
        }

        let salary = req.data.lSalary;
        const salaryPattern = /^\d+$/; // Regex to match only non-negative integers
        if (!salaryPattern.test(salary)) {
            req.error(400, 'Salary must be a valid integer with no letters or special characters.');
            return; // Stop further processing
        }
        var existingLecture = await
            SELECT.from(lectures)
                .where({ lPhone });

        if (existingLecture) {
            if (existingLecture.length > 1) {
                req.error(400, 'Phone number is already used by another lecture.');
                return;
            }
        }
        var existingLecture = await
            SELECT.from(lectures)
                .where({ lEmail });

        if (existingLecture) {
            if (existingLecture.length > 1) {
                req.error(400, 'Email is already used by another lecture.');
            }
        }
        var AdminEmail = await SELECT.from(Admin).where`aName = 'ADMIN'`;
        var aEmail = AdminEmail[0].aEmail;
        var data = await SELECT.from(Admin).where`aName = ${req.data.lField}`;
        if (req.data.lField == 'None' || data == 0 || req.data.lField == null) {
            var data1 = await SELECT.from(Admin).where`aName = 'None'`;
            depEmail = data1[0].aEmail
        }
        else {
            var depEmail = data[0].aEmail
        }
        var workflowContent = {
            // "definitionId": "us10.6ad3155ftrial.teacher.leactureHirringProcess",
            // "context": {
            //     "leactureId": aEmail,
            //     "candidateName": req.data.lNames,
            //     "candidateAge": req.data.lAge,
            //     "candidatePhone": req.data.lPhone,
            //     "candidateEmail": req.data.lEmail,
            //     "candidateAddress": req.data.lAdress,
            //     "level1dep": depEmail,
            //     "level2admin": aEmail,
            //     "departmentName": req.data.lField,
            //     "uuid": req.data.lUuid,
            //     "dob": req.data.lDateOfBirth

                "definitionId": "us10.6ad3155ftrial.teacher.collageAprovals",
                "context": {
                    "candidateName": req.data.lNames,
                    "candidatePhone": req.data.lPhone,
                    "age": req.data.lAge,
                    "candidateEmail": req.data.lEmail,
                    "departmentName": req.data.lField,
                    "address": req.data.lAdress,
                    "level1dep": depEmail,
                    "level2admin": aEmail,
                    "luuid": req.data.lUuid,
                    "dob": req.data.lDateOfBirth,
                    "emailid": aEmail
                }
        };
        var SPA_API = await cds.connect.to("BpaDest");
        var result = await SPA_API.post('/workflow/rest/v1/workflow-instances', workflowContent);
        console.log(result);
        req.data.lStatus = 'Approval in Pending';
    });

    this.before(['CREATE', 'UPDTAE'], Files.drafts, async (req) => {
        debugger
        req.data.url = `/Files(id=${req.data.id},IsActiveEntity=true)/content`;
        // var delete_q = await DELETE.from(Files.drafts) .where `HasActiveEntity : 'false'`;
        // await DELETE.from(Files.drafts) .where({fkey : req.data.fkey});
    });

    this.before(['CREATE'], Files, async (req) => {
        debugger
        req.data.url = `/Files(id=${req.data.id},IsActiveEntity=true)/content`;
    });

    this.after(['CREATE', 'UPDATE'], lectures, async (req) => {
        debugger
        var draftsdata = await SELECT.from(Files.drafts).where({ fkey: req.lUuid });
        debugger
        var delete_q = await DELETE.from(Files.drafts).where({ fkey: req.lUuid });
    });


    this.after(['CREATE', 'UPDATE'], lectures.drafts, async (req) => {
        debugger
        var draftsdata = await SELECT.from(Files.drafts).where({ fkey: req.lUuid });
        debugger
        var delete_q = await DELETE.from(Files.drafts).where({ fkey: req.lUuid });
    });

    this.on('draftsfunc', async (req) => {
        debugger
        if (req.data.para) {
            await DELETE.from(Files.drafts).where({ fkey: req.data.para });
        }
    });
    //functon import
    this.on('postattach', async (req) => {
        debugger
        var editbut = 'true';
        if (req.data.p) {
            var status = await SELECT.from(lectures).where({ lUuid: req.data.p });
            console.log("functionImport triggered");
                if (status[0].lStatus != 'Approved') {
                    editbut = "false";
                }
            return editbut;
        }
    });

    this.on('url', async (req) => {
        debugger
        if(req.data.par){
            var data = await SELECT.from(Files).where({ fkey: req.data.par });
            if(data){
                var dataurl = data[0].url;
            }
            return dataurl;
        }
    });

    this.on('READ', lectures.drafts, async (req, next) => {
        debugger
        if (req.data.lDateOfBirth) {
            var entity = req.data; // Adjust this if necessary based on your environment
            // Function to calculate age based on date of birth
            function calculateAge(dateOfBirth) {
                var today = new Date();
                var birthDate = new Date(dateOfBirth);
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDifference = today.getMonth() - birthDate.getMonth();

                // If the birth date is after today’s date in the year, subtract one year from age
                if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }

                return age;
            }
            if (entity.lDateOfBirth) {
                var age = calculateAge(entity.lDateOfBirth);
                if (age < 0){
                    req.error(400, 'Age is in Negative , check the data of barth');
                }else if (age < 18){
                    req.error(400, 'Age must be 18 , check the data of barth');
                }
                // Update the entity with the new age
                // This line might differ based on your environment and how you update entities
                await cds.update(lectures.drafts).set({ lAge: age }).where({ lUuid: req.data.lUuid }); // Adjust this to your specific update logic
               
            }
        }
        return next();
    });
}
