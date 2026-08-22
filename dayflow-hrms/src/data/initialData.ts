
import { Employee, User, AttendanceRecord, LeaveRequest } from '../types';
import { getDefaultSalaryData } from '../utils/salaryCalculator';

export const INITIAL_USERS: User[] = [
  {
    "id": "usr-EMP001",
    "employeeId": "EMP001",
    "name": "Arun Kumar",
    "email": "arun.kumar@nexconnect.com",
    "loginId": "NCARKU20220001",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Arun+Kumar&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP002",
    "employeeId": "EMP002",
    "name": "Anitha Ravi",
    "email": "anitha.ravi@nexconnect.com",
    "loginId": "NCANRA20230001",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Anitha+Ravi&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP003",
    "employeeId": "EMP003",
    "name": "Karthik Rajan",
    "email": "karthik.rajan@nexconnect.com",
    "loginId": "NCKARA20240001",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Karthik+Rajan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP004",
    "employeeId": "EMP004",
    "name": "Divya Suresh",
    "email": "divya.suresh@nexconnect.com",
    "loginId": "NCDISU20250001",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Divya+Suresh&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP005",
    "employeeId": "EMP005",
    "name": "Vignesh Prabhu",
    "email": "vignesh.prabhu@nexconnect.com",
    "loginId": "NCVIPR20220002",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Vignesh+Prabhu&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP006",
    "employeeId": "EMP006",
    "name": "Keerthana Mohan",
    "email": "keerthana.mohan@nexconnect.com",
    "loginId": "NCKEMO20230002",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Keerthana+Mohan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP007",
    "employeeId": "EMP007",
    "name": "Pradeep Kumar",
    "email": "pradeep.kumar@nexconnect.com",
    "loginId": "NCPRKU20240002",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Pradeep+Kumar&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP008",
    "employeeId": "EMP008",
    "name": "Harini Krishnan",
    "email": "harini.krishnan@nexconnect.com",
    "loginId": "NCHAKR20250002",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Harini+Krishnan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP009",
    "employeeId": "EMP009",
    "name": "Sanjay Balan",
    "email": "sanjay.balan@nexconnect.com",
    "loginId": "NCSABA20220003",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Sanjay+Balan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP010",
    "employeeId": "EMP010",
    "name": "Nandhini Ramesh",
    "email": "nandhini.ramesh@nexconnect.com",
    "loginId": "NCNARA20230003",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Nandhini+Ramesh&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP011",
    "employeeId": "EMP011",
    "name": "Ashwin Raj",
    "email": "ashwin.raj@nexconnect.com",
    "loginId": "NCASRA20240003",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Ashwin+Raj&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP012",
    "employeeId": "EMP012",
    "name": "Swetha Mohan",
    "email": "swetha.mohan@nexconnect.com",
    "loginId": "NCSWMO20250003",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Swetha+Mohan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP013",
    "employeeId": "EMP013",
    "name": "Dinesh Karthik",
    "email": "dinesh.karthik@nexconnect.com",
    "loginId": "NCDIKA20220004",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Dinesh+Karthik&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP014",
    "employeeId": "EMP014",
    "name": "Pavithra Siva",
    "email": "pavithra.siva@nexconnect.com",
    "loginId": "NCPASI20230004",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Pavithra+Siva&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP015",
    "employeeId": "EMP015",
    "name": "Surya Narayanan",
    "email": "surya.narayanan@nexconnect.com",
    "loginId": "NCSUNA20240004",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Surya+Narayanan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP016",
    "employeeId": "EMP016",
    "name": "Janani Arun",
    "email": "janani.arun@nexconnect.com",
    "loginId": "NCJAAR20250004",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Janani+Arun&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP017",
    "employeeId": "EMP017",
    "name": "Gokul Krishnan",
    "email": "gokul.krishnan@nexconnect.com",
    "loginId": "NCGOKR20220005",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Gokul+Krishnan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP018",
    "employeeId": "EMP018",
    "name": "Deepa Ravi",
    "email": "deepa.ravi@nexconnect.com",
    "loginId": "NCDERA20230005",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Deepa+Ravi&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP019",
    "employeeId": "EMP019",
    "name": "Lokesh Babu",
    "email": "lokesh.babu@nexconnect.com",
    "loginId": "NCLOBA20240005",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Lokesh+Babu&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP020",
    "employeeId": "EMP020",
    "name": "Priya Shankar",
    "email": "priya.shankar@nexconnect.com",
    "loginId": "NCPRSH20250005",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Priya+Shankar&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP021",
    "employeeId": "EMP021",
    "name": "Manoj Kumar",
    "email": "manoj.kumar@nexconnect.com",
    "loginId": "NCMAKU20220006",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Manoj+Kumar&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP022",
    "employeeId": "EMP022",
    "name": "Aishwarya Suresh",
    "email": "aishwarya.suresh@nexconnect.com",
    "loginId": "NCAISU20230006",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Aishwarya+Suresh&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP023",
    "employeeId": "EMP023",
    "name": "Rohit Rajan",
    "email": "rohit.rajan@nexconnect.com",
    "loginId": "NCRORA20240006",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Rohit+Rajan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP024",
    "employeeId": "EMP024",
    "name": "Shalini Prakash",
    "email": "shalini.prakash@nexconnect.com",
    "loginId": "NCSHPR20250006",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Shalini+Prakash&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP025",
    "employeeId": "EMP025",
    "name": "Madhan Selvam",
    "email": "madhan.selvam@nexconnect.com",
    "loginId": "NCMASE20220007",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Madhan+Selvam&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP026",
    "employeeId": "EMP026",
    "name": "Vaishnavi Kannan",
    "email": "vaishnavi.kannan@nexconnect.com",
    "loginId": "NCVAKA20230007",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Vaishnavi+Kannan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP027",
    "employeeId": "EMP027",
    "name": "Naveen Murugan",
    "email": "naveen.murugan@nexconnect.com",
    "loginId": "NCNAMU20240007",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Naveen+Murugan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP028",
    "employeeId": "EMP028",
    "name": "Kavya Ramesh",
    "email": "kavya.ramesh@nexconnect.com",
    "loginId": "NCKARA20250007",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Kavya+Ramesh&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP029",
    "employeeId": "EMP029",
    "name": "Sathish Kumar",
    "email": "sathish.kumar@nexconnect.com",
    "loginId": "NCSAKU20220008",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Sathish+Kumar&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP030",
    "employeeId": "EMP030",
    "name": "Meena Sivakumar",
    "email": "meena.sivakumar@nexconnect.com",
    "loginId": "NCMESI20230008",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Meena+Sivakumar&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP031",
    "employeeId": "EMP031",
    "name": "Vijay Anand",
    "email": "vijay.anand@nexconnect.com",
    "loginId": "NCVIAN20240008",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Vijay+Anand&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP032",
    "employeeId": "EMP032",
    "name": "Sowmya Ravi",
    "email": "sowmya.ravi@nexconnect.com",
    "loginId": "NCSORA20250008",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Sowmya+Ravi&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP033",
    "employeeId": "EMP033",
    "name": "Balaji Mohan",
    "email": "balaji.mohan@nexconnect.com",
    "loginId": "NCBAMO20220009",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Balaji+Mohan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP034",
    "employeeId": "EMP034",
    "name": "Dhivya Karthik",
    "email": "dhivya.karthik@nexconnect.com",
    "loginId": "NCDHKA20230009",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Dhivya+Karthik&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP035",
    "employeeId": "EMP035",
    "name": "Aravind Prasad",
    "email": "aravind.prasad@nexconnect.com",
    "loginId": "NCARPR20240009",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Aravind+Prasad&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP036",
    "employeeId": "EMP036",
    "name": "Ramya Suresh",
    "email": "ramya.suresh@nexconnect.com",
    "loginId": "NCRASU20250009",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Ramya+Suresh&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP037",
    "employeeId": "EMP037",
    "name": "Bharath Rajan",
    "email": "bharath.rajan@nexconnect.com",
    "loginId": "NCBHRA20220010",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Bharath+Rajan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP038",
    "employeeId": "EMP038",
    "name": "Abinaya Kumar",
    "email": "abinaya.kumar@nexconnect.com",
    "loginId": "NCABKU20230010",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Abinaya+Kumar&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP039",
    "employeeId": "EMP039",
    "name": "Saravanan Muthu",
    "email": "saravanan.muthu@nexconnect.com",
    "loginId": "NCSAMU20240010",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Saravanan+Muthu&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP040",
    "employeeId": "EMP040",
    "name": "Lalitha Balan",
    "email": "lalitha.balan@nexconnect.com",
    "loginId": "NCLABA20250010",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Lalitha+Balan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP041",
    "employeeId": "EMP041",
    "name": "Muthukumar Ravi",
    "email": "muthukumar.ravi@nexconnect.com",
    "loginId": "NCMURA20220011",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Muthukumar+Ravi&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP042",
    "employeeId": "EMP042",
    "name": "Gayathri Prakash",
    "email": "gayathri.prakash@nexconnect.com",
    "loginId": "NCGAPR20230011",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Gayathri+Prakash&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP043",
    "employeeId": "EMP043",
    "name": "Sriram Narayanan",
    "email": "sriram.narayanan@nexconnect.com",
    "loginId": "NCSRNA20240011",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Sriram+Narayanan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP044",
    "employeeId": "EMP044",
    "name": "Preethi Kannan",
    "email": "preethi.kannan@nexconnect.com",
    "loginId": "NCPRKA20250011",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Preethi+Kannan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP045",
    "employeeId": "EMP045",
    "name": "Dharshan Siva",
    "email": "dharshan.siva@nexconnect.com",
    "loginId": "NCDHSI20220012",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Dharshan+Siva&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP046",
    "employeeId": "EMP046",
    "name": "Aparna Mohan",
    "email": "aparna.mohan@nexconnect.com",
    "loginId": "NCAPMO20230012",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Aparna+Mohan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP047",
    "employeeId": "EMP047",
    "name": "Kishore Babu",
    "email": "kishore.babu@nexconnect.com",
    "loginId": "NCKIBA20240012",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Kishore+Babu&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP048",
    "employeeId": "EMP048",
    "name": "Reshma Ramesh",
    "email": "reshma.ramesh@nexconnect.com",
    "loginId": "NCRERA20250012",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Reshma+Ramesh&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP049",
    "employeeId": "EMP049",
    "name": "Ranjith Kumar",
    "email": "ranjith.kumar@nexconnect.com",
    "loginId": "NCRAKU20220013",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Ranjith+Kumar&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP050",
    "employeeId": "EMP050",
    "name": "Anjali Krishnan",
    "email": "anjali.krishnan@nexconnect.com",
    "loginId": "NCANKR20230013",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Anjali+Krishnan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP051",
    "employeeId": "EMP051",
    "name": "Vasanth Raj",
    "email": "vasanth.raj@nexconnect.com",
    "loginId": "NCVARA20240013",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Vasanth+Raj&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP052",
    "employeeId": "EMP052",
    "name": "Hema Suresh",
    "email": "hema.suresh@nexconnect.com",
    "loginId": "NCHESU20250013",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Hema+Suresh&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP053",
    "employeeId": "EMP053",
    "name": "Vimal Rajan",
    "email": "vimal.rajan@nexconnect.com",
    "loginId": "NCVIRA20220014",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Vimal+Rajan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP054",
    "employeeId": "EMP054",
    "name": "Mahalakshmi Ravi",
    "email": "mahalakshmi.ravi@nexconnect.com",
    "loginId": "NCMARA20230014",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Mahalakshmi+Ravi&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP055",
    "employeeId": "EMP055",
    "name": "Kannan Selvam",
    "email": "kannan.selvam@nexconnect.com",
    "loginId": "NCKASE20240014",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Kannan+Selvam&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP056",
    "employeeId": "EMP056",
    "name": "Revathi Mohan",
    "email": "revathi.mohan@nexconnect.com",
    "loginId": "NCREMO20250014",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Revathi+Mohan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP057",
    "employeeId": "EMP057",
    "name": "Ajay Kumar",
    "email": "ajay.kumar@nexconnect.com",
    "loginId": "NCAJKU20220015",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Ajay+Kumar&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP058",
    "employeeId": "EMP058",
    "name": "Ramya Karthik",
    "email": "ramya.karthik@nexconnect.com",
    "loginId": "NCRAKA20230015",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Ramya+Karthik&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP059",
    "employeeId": "EMP059",
    "name": "Suresh Balan",
    "email": "suresh.balan@nexconnect.com",
    "loginId": "NCSUBA20240015",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Suresh+Balan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP060",
    "employeeId": "EMP060",
    "name": "Nivetha Prasad",
    "email": "nivetha.prasad@nexconnect.com",
    "loginId": "NCNIPR20250015",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Nivetha+Prasad&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP061",
    "employeeId": "EMP061",
    "name": "Pranav Ravi",
    "email": "pranav.ravi@nexconnect.com",
    "loginId": "NCPRRA20220016",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Pranav+Ravi&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP062",
    "employeeId": "EMP062",
    "name": "Sindhu Shankar",
    "email": "sindhu.shankar@nexconnect.com",
    "loginId": "NCSISH20230016",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Sindhu+Shankar&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP063",
    "employeeId": "EMP063",
    "name": "Dhanush Kumar",
    "email": "dhanush.kumar@nexconnect.com",
    "loginId": "NCDHKU20240016",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Dhanush+Kumar&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP064",
    "employeeId": "EMP064",
    "name": "Aarthi Suresh",
    "email": "aarthi.suresh@nexconnect.com",
    "loginId": "NCAASU20250016",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Aarthi+Suresh&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP065",
    "employeeId": "EMP065",
    "name": "Mohan Raj",
    "email": "mohan.raj@nexconnect.com",
    "loginId": "NCMORA20220017",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Mohan+Raj&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP066",
    "employeeId": "EMP066",
    "name": "Yamuna Kannan",
    "email": "yamuna.kannan@nexconnect.com",
    "loginId": "NCYAKA20230017",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Yamuna+Kannan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP067",
    "employeeId": "EMP067",
    "name": "Rakesh Muthu",
    "email": "rakesh.muthu@nexconnect.com",
    "loginId": "NCRAMU20240017",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Rakesh+Muthu&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP068",
    "employeeId": "EMP068",
    "name": "Sharmila Ramesh",
    "email": "sharmila.ramesh@nexconnect.com",
    "loginId": "NCSHRA20250017",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Sharmila+Ramesh&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP069",
    "employeeId": "EMP069",
    "name": "Hari Krishnan",
    "email": "hari.krishnan@nexconnect.com",
    "loginId": "NCHAKR20220018",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Hari+Krishnan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP070",
    "employeeId": "EMP070",
    "name": "Abinaya Ravi",
    "email": "abinaya.ravi@nexconnect.com",
    "loginId": "NCABRA20230018",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Abinaya+Ravi&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP071",
    "employeeId": "EMP071",
    "name": "Surendran Babu",
    "email": "surendran.babu@nexconnect.com",
    "loginId": "NCSUBA20240018",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Surendran+Babu&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP072",
    "employeeId": "EMP072",
    "name": "Monisha Kumar",
    "email": "monisha.kumar@nexconnect.com",
    "loginId": "NCMOKU20250018",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Monisha+Kumar&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP073",
    "employeeId": "EMP073",
    "name": "Vivek Siva",
    "email": "vivek.siva@nexconnect.com",
    "loginId": "NCVISI20220019",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Vivek+Siva&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP074",
    "employeeId": "EMP074",
    "name": "Dhanya Mohan",
    "email": "dhanya.mohan@nexconnect.com",
    "loginId": "NCDHMO20230019",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Dhanya+Mohan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP075",
    "employeeId": "EMP075",
    "name": "Raghu Prasad",
    "email": "raghu.prasad@nexconnect.com",
    "loginId": "NCRAPR20240019",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Raghu+Prasad&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP076",
    "employeeId": "EMP076",
    "name": "Sangeetha Rajan",
    "email": "sangeetha.rajan@nexconnect.com",
    "loginId": "NCSARA20250019",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Sangeetha+Rajan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP077",
    "employeeId": "EMP077",
    "name": "Karthikeyan Ravi",
    "email": "karthikeyan.ravi@nexconnect.com",
    "loginId": "NCKARA20220020",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Karthikeyan+Ravi&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP078",
    "employeeId": "EMP078",
    "name": "Keerthana Kumar",
    "email": "keerthana.kumar@nexconnect.com",
    "loginId": "NCKEKU20230020",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Keerthana+Kumar&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP079",
    "employeeId": "EMP079",
    "name": "Nithin Suresh",
    "email": "nithin.suresh@nexconnect.com",
    "loginId": "NCNISU20240020",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Nithin+Suresh&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP080",
    "employeeId": "EMP080",
    "name": "Lavanya Balan",
    "email": "lavanya.balan@nexconnect.com",
    "loginId": "NCLABA20250020",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Lavanya+Balan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP081",
    "employeeId": "EMP081",
    "name": "Sanjana Mohan",
    "email": "sanjana.mohan@nexconnect.com",
    "loginId": "NCSAMO20220021",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Sanjana+Mohan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP082",
    "employeeId": "EMP082",
    "name": "Manikandan Ramesh",
    "email": "manikandan.ramesh@nexconnect.com",
    "loginId": "NCMARA20230021",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Manikandan+Ramesh&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP083",
    "employeeId": "EMP083",
    "name": "Rithika Kannan",
    "email": "rithika.kannan@nexconnect.com",
    "loginId": "NCRIKA20240021",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Rithika+Kannan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP084",
    "employeeId": "EMP084",
    "name": "Girish Raj",
    "email": "girish.raj@nexconnect.com",
    "loginId": "NCGIRA20250021",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Girish+Raj&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP085",
    "employeeId": "EMP085",
    "name": "Akash Prabhu",
    "email": "akash.prabhu@nexconnect.com",
    "loginId": "NCAKPR20220022",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Akash+Prabhu&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP086",
    "employeeId": "EMP086",
    "name": "Sowmiya Krishnan",
    "email": "sowmiya.krishnan@nexconnect.com",
    "loginId": "NCSOKR20230022",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Sowmiya+Krishnan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP087",
    "employeeId": "EMP087",
    "name": "Tharun Kumar",
    "email": "tharun.kumar@nexconnect.com",
    "loginId": "NCTHKU20240022",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Tharun+Kumar&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP088",
    "employeeId": "EMP088",
    "name": "Bhavya Ravi",
    "email": "bhavya.ravi@nexconnect.com",
    "loginId": "NCBHRA20250022",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Bhavya+Ravi&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP089",
    "employeeId": "EMP089",
    "name": "Jeeva Suresh",
    "email": "jeeva.suresh@nexconnect.com",
    "loginId": "NCJESU20220023",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Jeeva+Suresh&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP090",
    "employeeId": "EMP090",
    "name": "Nithya Mohan",
    "email": "nithya.mohan@nexconnect.com",
    "loginId": "NCNIMO20230023",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Nithya+Mohan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP091",
    "employeeId": "EMP091",
    "name": "Saran Balan",
    "email": "saran.balan@nexconnect.com",
    "loginId": "NCSABA20240023",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Saran+Balan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP092",
    "employeeId": "EMP092",
    "name": "Malavika Rajan",
    "email": "malavika.rajan@nexconnect.com",
    "loginId": "NCMARA20250023",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Malavika+Rajan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP093",
    "employeeId": "EMP093",
    "name": "Vishnu Prasad",
    "email": "vishnu.prasad@nexconnect.com",
    "loginId": "NCVIPR20220024",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Vishnu+Prasad&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP094",
    "employeeId": "EMP094",
    "name": "Madhumitha Kumar",
    "email": "madhumitha.kumar@nexconnect.com",
    "loginId": "NCMAKU20230024",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Madhumitha+Kumar&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP095",
    "employeeId": "EMP095",
    "name": "Dinesh Ravi",
    "email": "dinesh.ravi@nexconnect.com",
    "loginId": "NCDIRA20240024",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Dinesh+Ravi&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP096",
    "employeeId": "EMP096",
    "name": "Harish Siva",
    "email": "harish.siva@nexconnect.com",
    "loginId": "NCHASI20250024",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Harish+Siva&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP097",
    "employeeId": "EMP097",
    "name": "Kavin Mohan",
    "email": "kavin.mohan@nexconnect.com",
    "loginId": "NCKAMO20220025",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Kavin+Mohan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP098",
    "employeeId": "EMP098",
    "name": "Anusha Krishnan",
    "email": "anusha.krishnan@nexconnect.com",
    "loginId": "NCANKR20230025",
    "password": "Password@123",
    "role": "ADMIN",
    "avatar": "https://ui-avatars.com/api/?name=Anusha+Krishnan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP099",
    "employeeId": "EMP099",
    "name": "Ragav Kannan",
    "email": "ragav.kannan@nexconnect.com",
    "loginId": "NCRAKA20240025",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Ragav+Kannan&background=6366F1&color=fff&bold=true"
  },
  {
    "id": "usr-EMP100",
    "employeeId": "EMP100",
    "name": "Pooja Ramesh",
    "email": "pooja.ramesh@nexconnect.com",
    "loginId": "NCPORA20250025",
    "password": "Password@123",
    "role": "EMPLOYEE",
    "avatar": "https://ui-avatars.com/api/?name=Pooja+Ramesh&background=6366F1&color=fff&bold=true"
  }
];

export const INITIAL_EMPLOYEES: Employee[] = [
{
  "id": "EMP001",
  "employeeId": "EMP001",
  "name": "Arun Kumar",
  "loginId": "NCARKU20220001",
  "email": "arun.kumar@nexconnect.com",
  "phone": "+91 98450 00001",
  "avatar": "https://ui-avatars.com/api/?name=Arun+Kumar&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Software Engineer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Software Engineer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1991-02-02",
    "gender": "Male",
    "address": "#3, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00001",
    "emergencyContact": "Family Member - +91 98450 09999",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP001"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP002",
  "employeeId": "EMP002",
  "name": "Anitha Ravi",
  "loginId": "NCANRA20230001",
  "email": "anitha.ravi@nexconnect.com",
  "phone": "+91 98450 00001",
  "avatar": "https://ui-avatars.com/api/?name=Anitha+Ravi&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "HR Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced HR Executive in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1991-02-02",
    "gender": "Female",
    "address": "#3, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00001",
    "emergencyContact": "Family Member - +91 98450 09999",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP002"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP003",
  "employeeId": "EMP003",
  "name": "Karthik Rajan",
  "loginId": "NCKARA20240001",
  "email": "karthik.rajan@nexconnect.com",
  "phone": "+91 98450 00001",
  "avatar": "https://ui-avatars.com/api/?name=Karthik+Rajan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Financial Analyst",
  "manager": "Deepa Narayan (CFO)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Financial Analyst in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1991-02-02",
    "gender": "Male",
    "address": "#3, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00001",
    "emergencyContact": "Family Member - +91 98450 09999",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP003"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP004",
  "employeeId": "EMP004",
  "name": "Divya Suresh",
  "loginId": "NCDISU20250001",
  "email": "divya.suresh@nexconnect.com",
  "phone": "+91 98450 00001",
  "avatar": "https://ui-avatars.com/api/?name=Divya+Suresh&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Marketing",
  "position": "Marketing Executive",
  "manager": "Rohan Gupta (Marketing Director)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Marketing Executive in Marketing with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "SEO Strategy",
      "Content Writing",
      "Google Analytics",
      "Email Marketing",
      "Social Media Branding"
    ],
    "certifications": [
      "HubSpot Inbound Marketing Certification"
    ]
  },
  "privateInfo": {
    "dob": "1991-02-02",
    "gender": "Male",
    "address": "#3, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00001",
    "emergencyContact": "Family Member - +91 98450 09999",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP004"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP005",
  "employeeId": "EMP005",
  "name": "Vignesh Prabhu",
  "loginId": "NCVIPR20220002",
  "email": "vignesh.prabhu@nexconnect.com",
  "phone": "+91 98450 00002",
  "avatar": "https://ui-avatars.com/api/?name=Vignesh+Prabhu&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Frontend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Frontend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1992-03-03",
    "gender": "Male",
    "address": "#6, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00002",
    "emergencyContact": "Family Member - +91 98450 09998",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP005"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP006",
  "employeeId": "EMP006",
  "name": "Keerthana Mohan",
  "loginId": "NCKEMO20230002",
  "email": "keerthana.mohan@nexconnect.com",
  "phone": "+91 98450 00002",
  "avatar": "https://ui-avatars.com/api/?name=Keerthana+Mohan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Operations",
  "position": "Operations Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Operations Executive in Operations with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Vendor Management",
      "Asset Management",
      "Facilities Operations",
      "Procurement",
      "Logistics"
    ],
    "certifications": [
      "Six Sigma Green Belt Certification"
    ]
  },
  "privateInfo": {
    "dob": "1992-03-03",
    "gender": "Male",
    "address": "#6, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00002",
    "emergencyContact": "Family Member - +91 98450 09998",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP006"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP007",
  "employeeId": "EMP007",
  "name": "Pradeep Kumar",
  "loginId": "NCPRKU20240002",
  "email": "pradeep.kumar@nexconnect.com",
  "phone": "+91 98450 00002",
  "avatar": "https://ui-avatars.com/api/?name=Pradeep+Kumar&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Backend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Backend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1992-03-03",
    "gender": "Male",
    "address": "#6, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00002",
    "emergencyContact": "Family Member - +91 98450 09998",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP007"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP008",
  "employeeId": "EMP008",
  "name": "Harini Krishnan",
  "loginId": "NCHAKR20250002",
  "email": "harini.krishnan@nexconnect.com",
  "phone": "+91 98450 00002",
  "avatar": "https://ui-avatars.com/api/?name=Harini+Krishnan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "Talent Associate",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Talent Associate in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1992-03-03",
    "gender": "Male",
    "address": "#6, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00002",
    "emergencyContact": "Family Member - +91 98450 09998",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP008"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP009",
  "employeeId": "EMP009",
  "name": "Sanjay Balan",
  "loginId": "NCSABA20220003",
  "email": "sanjay.balan@nexconnect.com",
  "phone": "+91 98450 00003",
  "avatar": "https://ui-avatars.com/api/?name=Sanjay+Balan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Sales & Ops",
  "position": "Sales Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Sales Executive in Sales & Ops with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Negotiation",
      "CRM Tools (Salesforce)",
      "Lead Generation",
      "Client Relations",
      "Sales Strategy"
    ],
    "certifications": [
      "Certified Sales Professional (CSP)"
    ]
  },
  "privateInfo": {
    "dob": "1993-04-04",
    "gender": "Male",
    "address": "#9, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00003",
    "emergencyContact": "Family Member - +91 98450 09997",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP009"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP010",
  "employeeId": "EMP010",
  "name": "Nandhini Ramesh",
  "loginId": "NCNARA20230003",
  "email": "nandhini.ramesh@nexconnect.com",
  "phone": "+91 98450 00003",
  "avatar": "https://ui-avatars.com/api/?name=Nandhini+Ramesh&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Accountant",
  "manager": "Deepa Narayan (CFO)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Accountant in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1993-04-04",
    "gender": "Male",
    "address": "#9, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00003",
    "emergencyContact": "Family Member - +91 98450 09997",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP010"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP011",
  "employeeId": "EMP011",
  "name": "Ashwin Raj",
  "loginId": "NCASRA20240003",
  "email": "ashwin.raj@nexconnect.com",
  "phone": "+91 98450 00003",
  "avatar": "https://ui-avatars.com/api/?name=Ashwin+Raj&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Software Engineer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Software Engineer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1993-04-04",
    "gender": "Male",
    "address": "#9, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00003",
    "emergencyContact": "Family Member - +91 98450 09997",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP011"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP012",
  "employeeId": "EMP012",
  "name": "Swetha Mohan",
  "loginId": "NCSWMO20250003",
  "email": "swetha.mohan@nexconnect.com",
  "phone": "+91 98450 00003",
  "avatar": "https://ui-avatars.com/api/?name=Swetha+Mohan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "HR Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced HR Executive in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1993-04-04",
    "gender": "Male",
    "address": "#9, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00003",
    "emergencyContact": "Family Member - +91 98450 09997",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP012"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP013",
  "employeeId": "EMP013",
  "name": "Dinesh Karthik",
  "loginId": "NCDIKA20220004",
  "email": "dinesh.karthik@nexconnect.com",
  "phone": "+91 98450 00004",
  "avatar": "https://ui-avatars.com/api/?name=Dinesh+Karthik&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Financial Analyst",
  "manager": "Deepa Narayan (CFO)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Financial Analyst in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1994-05-05",
    "gender": "Male",
    "address": "#12, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00004",
    "emergencyContact": "Family Member - +91 98450 09996",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP013"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP014",
  "employeeId": "EMP014",
  "name": "Pavithra Siva",
  "loginId": "NCPASI20230004",
  "email": "pavithra.siva@nexconnect.com",
  "phone": "+91 98450 00004",
  "avatar": "https://ui-avatars.com/api/?name=Pavithra+Siva&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Marketing",
  "position": "Marketing Executive",
  "manager": "Rohan Gupta (Marketing Director)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Marketing Executive in Marketing with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "SEO Strategy",
      "Content Writing",
      "Google Analytics",
      "Email Marketing",
      "Social Media Branding"
    ],
    "certifications": [
      "HubSpot Inbound Marketing Certification"
    ]
  },
  "privateInfo": {
    "dob": "1994-05-05",
    "gender": "Female",
    "address": "#12, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00004",
    "emergencyContact": "Family Member - +91 98450 09996",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP014"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP015",
  "employeeId": "EMP015",
  "name": "Surya Narayanan",
  "loginId": "NCSUNA20240004",
  "email": "surya.narayanan@nexconnect.com",
  "phone": "+91 98450 00004",
  "avatar": "https://ui-avatars.com/api/?name=Surya+Narayanan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Frontend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Frontend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1994-05-05",
    "gender": "Male",
    "address": "#12, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00004",
    "emergencyContact": "Family Member - +91 98450 09996",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP015"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP016",
  "employeeId": "EMP016",
  "name": "Janani Arun",
  "loginId": "NCJAAR20250004",
  "email": "janani.arun@nexconnect.com",
  "phone": "+91 98450 00004",
  "avatar": "https://ui-avatars.com/api/?name=Janani+Arun&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Operations",
  "position": "Operations Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Operations Executive in Operations with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Vendor Management",
      "Asset Management",
      "Facilities Operations",
      "Procurement",
      "Logistics"
    ],
    "certifications": [
      "Six Sigma Green Belt Certification"
    ]
  },
  "privateInfo": {
    "dob": "1994-05-05",
    "gender": "Male",
    "address": "#12, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00004",
    "emergencyContact": "Family Member - +91 98450 09996",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP016"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP017",
  "employeeId": "EMP017",
  "name": "Gokul Krishnan",
  "loginId": "NCGOKR20220005",
  "email": "gokul.krishnan@nexconnect.com",
  "phone": "+91 98450 00005",
  "avatar": "https://ui-avatars.com/api/?name=Gokul+Krishnan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Backend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Backend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1995-06-06",
    "gender": "Male",
    "address": "#15, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00005",
    "emergencyContact": "Family Member - +91 98450 09995",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP017"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP018",
  "employeeId": "EMP018",
  "name": "Deepa Ravi",
  "loginId": "NCDERA20230005",
  "email": "deepa.ravi@nexconnect.com",
  "phone": "+91 98450 00005",
  "avatar": "https://ui-avatars.com/api/?name=Deepa+Ravi&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "Talent Associate",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Talent Associate in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1995-06-06",
    "gender": "Female",
    "address": "#15, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00005",
    "emergencyContact": "Family Member - +91 98450 09995",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP018"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP019",
  "employeeId": "EMP019",
  "name": "Lokesh Babu",
  "loginId": "NCLOBA20240005",
  "email": "lokesh.babu@nexconnect.com",
  "phone": "+91 98450 00005",
  "avatar": "https://ui-avatars.com/api/?name=Lokesh+Babu&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Sales & Ops",
  "position": "Sales Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Sales Executive in Sales & Ops with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Negotiation",
      "CRM Tools (Salesforce)",
      "Lead Generation",
      "Client Relations",
      "Sales Strategy"
    ],
    "certifications": [
      "Certified Sales Professional (CSP)"
    ]
  },
  "privateInfo": {
    "dob": "1995-06-06",
    "gender": "Male",
    "address": "#15, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00005",
    "emergencyContact": "Family Member - +91 98450 09995",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP019"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP020",
  "employeeId": "EMP020",
  "name": "Priya Shankar",
  "loginId": "NCPRSH20250005",
  "email": "priya.shankar@nexconnect.com",
  "phone": "+91 98450 00005",
  "avatar": "https://ui-avatars.com/api/?name=Priya+Shankar&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Accountant",
  "manager": "Deepa Narayan (CFO)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Accountant in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1995-06-06",
    "gender": "Male",
    "address": "#15, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00005",
    "emergencyContact": "Family Member - +91 98450 09995",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP020"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP021",
  "employeeId": "EMP021",
  "name": "Manoj Kumar",
  "loginId": "NCMAKU20220006",
  "email": "manoj.kumar@nexconnect.com",
  "phone": "+91 98450 00006",
  "avatar": "https://ui-avatars.com/api/?name=Manoj+Kumar&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Software Engineer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Software Engineer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1996-07-07",
    "gender": "Male",
    "address": "#18, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00006",
    "emergencyContact": "Family Member - +91 98450 09994",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP021"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP022",
  "employeeId": "EMP022",
  "name": "Aishwarya Suresh",
  "loginId": "NCAISU20230006",
  "email": "aishwarya.suresh@nexconnect.com",
  "phone": "+91 98450 00006",
  "avatar": "https://ui-avatars.com/api/?name=Aishwarya+Suresh&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "HR Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced HR Executive in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1996-07-07",
    "gender": "Male",
    "address": "#18, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00006",
    "emergencyContact": "Family Member - +91 98450 09994",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP022"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP023",
  "employeeId": "EMP023",
  "name": "Rohit Rajan",
  "loginId": "NCRORA20240006",
  "email": "rohit.rajan@nexconnect.com",
  "phone": "+91 98450 00006",
  "avatar": "https://ui-avatars.com/api/?name=Rohit+Rajan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Financial Analyst",
  "manager": "Deepa Narayan (CFO)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Financial Analyst in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1996-07-07",
    "gender": "Male",
    "address": "#18, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00006",
    "emergencyContact": "Family Member - +91 98450 09994",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP023"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP024",
  "employeeId": "EMP024",
  "name": "Shalini Prakash",
  "loginId": "NCSHPR20250006",
  "email": "shalini.prakash@nexconnect.com",
  "phone": "+91 98450 00006",
  "avatar": "https://ui-avatars.com/api/?name=Shalini+Prakash&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Marketing",
  "position": "Marketing Executive",
  "manager": "Rohan Gupta (Marketing Director)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Marketing Executive in Marketing with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "SEO Strategy",
      "Content Writing",
      "Google Analytics",
      "Email Marketing",
      "Social Media Branding"
    ],
    "certifications": [
      "HubSpot Inbound Marketing Certification"
    ]
  },
  "privateInfo": {
    "dob": "1996-07-07",
    "gender": "Male",
    "address": "#18, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00006",
    "emergencyContact": "Family Member - +91 98450 09994",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP024"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP025",
  "employeeId": "EMP025",
  "name": "Madhan Selvam",
  "loginId": "NCMASE20220007",
  "email": "madhan.selvam@nexconnect.com",
  "phone": "+91 98450 00007",
  "avatar": "https://ui-avatars.com/api/?name=Madhan+Selvam&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Frontend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Frontend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1997-08-08",
    "gender": "Male",
    "address": "#21, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00007",
    "emergencyContact": "Family Member - +91 98450 09993",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP025"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP026",
  "employeeId": "EMP026",
  "name": "Vaishnavi Kannan",
  "loginId": "NCVAKA20230007",
  "email": "vaishnavi.kannan@nexconnect.com",
  "phone": "+91 98450 00007",
  "avatar": "https://ui-avatars.com/api/?name=Vaishnavi+Kannan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Operations",
  "position": "Operations Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Operations Executive in Operations with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Vendor Management",
      "Asset Management",
      "Facilities Operations",
      "Procurement",
      "Logistics"
    ],
    "certifications": [
      "Six Sigma Green Belt Certification"
    ]
  },
  "privateInfo": {
    "dob": "1997-08-08",
    "gender": "Male",
    "address": "#21, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00007",
    "emergencyContact": "Family Member - +91 98450 09993",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP026"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP027",
  "employeeId": "EMP027",
  "name": "Naveen Murugan",
  "loginId": "NCNAMU20240007",
  "email": "naveen.murugan@nexconnect.com",
  "phone": "+91 98450 00007",
  "avatar": "https://ui-avatars.com/api/?name=Naveen+Murugan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Backend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Backend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1997-08-08",
    "gender": "Male",
    "address": "#21, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00007",
    "emergencyContact": "Family Member - +91 98450 09993",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP027"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP028",
  "employeeId": "EMP028",
  "name": "Kavya Ramesh",
  "loginId": "NCKARA20250007",
  "email": "kavya.ramesh@nexconnect.com",
  "phone": "+91 98450 00007",
  "avatar": "https://ui-avatars.com/api/?name=Kavya+Ramesh&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "Talent Associate",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Talent Associate in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1997-08-08",
    "gender": "Male",
    "address": "#21, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00007",
    "emergencyContact": "Family Member - +91 98450 09993",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP028"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP029",
  "employeeId": "EMP029",
  "name": "Sathish Kumar",
  "loginId": "NCSAKU20220008",
  "email": "sathish.kumar@nexconnect.com",
  "phone": "+91 98450 00008",
  "avatar": "https://ui-avatars.com/api/?name=Sathish+Kumar&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Sales & Ops",
  "position": "Sales Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Sales Executive in Sales & Ops with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Negotiation",
      "CRM Tools (Salesforce)",
      "Lead Generation",
      "Client Relations",
      "Sales Strategy"
    ],
    "certifications": [
      "Certified Sales Professional (CSP)"
    ]
  },
  "privateInfo": {
    "dob": "1998-09-09",
    "gender": "Male",
    "address": "#24, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00008",
    "emergencyContact": "Family Member - +91 98450 09992",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP029"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP030",
  "employeeId": "EMP030",
  "name": "Meena Sivakumar",
  "loginId": "NCMESI20230008",
  "email": "meena.sivakumar@nexconnect.com",
  "phone": "+91 98450 00008",
  "avatar": "https://ui-avatars.com/api/?name=Meena+Sivakumar&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Accountant",
  "manager": "Deepa Narayan (CFO)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Accountant in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1998-09-09",
    "gender": "Male",
    "address": "#24, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00008",
    "emergencyContact": "Family Member - +91 98450 09992",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP030"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP031",
  "employeeId": "EMP031",
  "name": "Vijay Anand",
  "loginId": "NCVIAN20240008",
  "email": "vijay.anand@nexconnect.com",
  "phone": "+91 98450 00008",
  "avatar": "https://ui-avatars.com/api/?name=Vijay+Anand&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Software Engineer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Software Engineer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1998-09-09",
    "gender": "Male",
    "address": "#24, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00008",
    "emergencyContact": "Family Member - +91 98450 09992",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP031"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP032",
  "employeeId": "EMP032",
  "name": "Sowmya Ravi",
  "loginId": "NCSORA20250008",
  "email": "sowmya.ravi@nexconnect.com",
  "phone": "+91 98450 00008",
  "avatar": "https://ui-avatars.com/api/?name=Sowmya+Ravi&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "HR Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced HR Executive in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1998-09-09",
    "gender": "Female",
    "address": "#24, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00008",
    "emergencyContact": "Family Member - +91 98450 09992",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP032"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP033",
  "employeeId": "EMP033",
  "name": "Balaji Mohan",
  "loginId": "NCBAMO20220009",
  "email": "balaji.mohan@nexconnect.com",
  "phone": "+91 98450 00009",
  "avatar": "https://ui-avatars.com/api/?name=Balaji+Mohan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Financial Analyst",
  "manager": "Deepa Narayan (CFO)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Financial Analyst in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1999-10-10",
    "gender": "Male",
    "address": "#27, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00009",
    "emergencyContact": "Family Member - +91 98450 09991",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP033"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP034",
  "employeeId": "EMP034",
  "name": "Dhivya Karthik",
  "loginId": "NCDHKA20230009",
  "email": "dhivya.karthik@nexconnect.com",
  "phone": "+91 98450 00009",
  "avatar": "https://ui-avatars.com/api/?name=Dhivya+Karthik&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Marketing",
  "position": "Marketing Executive",
  "manager": "Rohan Gupta (Marketing Director)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Marketing Executive in Marketing with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "SEO Strategy",
      "Content Writing",
      "Google Analytics",
      "Email Marketing",
      "Social Media Branding"
    ],
    "certifications": [
      "HubSpot Inbound Marketing Certification"
    ]
  },
  "privateInfo": {
    "dob": "1999-10-10",
    "gender": "Male",
    "address": "#27, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00009",
    "emergencyContact": "Family Member - +91 98450 09991",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP034"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP035",
  "employeeId": "EMP035",
  "name": "Aravind Prasad",
  "loginId": "NCARPR20240009",
  "email": "aravind.prasad@nexconnect.com",
  "phone": "+91 98450 00009",
  "avatar": "https://ui-avatars.com/api/?name=Aravind+Prasad&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Frontend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Frontend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1999-10-10",
    "gender": "Male",
    "address": "#27, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00009",
    "emergencyContact": "Family Member - +91 98450 09991",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP035"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP036",
  "employeeId": "EMP036",
  "name": "Ramya Suresh",
  "loginId": "NCRASU20250009",
  "email": "ramya.suresh@nexconnect.com",
  "phone": "+91 98450 00009",
  "avatar": "https://ui-avatars.com/api/?name=Ramya+Suresh&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Operations",
  "position": "Operations Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Operations Executive in Operations with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Vendor Management",
      "Asset Management",
      "Facilities Operations",
      "Procurement",
      "Logistics"
    ],
    "certifications": [
      "Six Sigma Green Belt Certification"
    ]
  },
  "privateInfo": {
    "dob": "1999-10-10",
    "gender": "Male",
    "address": "#27, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00009",
    "emergencyContact": "Family Member - +91 98450 09991",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP036"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP037",
  "employeeId": "EMP037",
  "name": "Bharath Rajan",
  "loginId": "NCBHRA20220010",
  "email": "bharath.rajan@nexconnect.com",
  "phone": "+91 98450 00010",
  "avatar": "https://ui-avatars.com/api/?name=Bharath+Rajan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Backend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Backend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1990-11-11",
    "gender": "Male",
    "address": "#30, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00010",
    "emergencyContact": "Family Member - +91 98450 09990",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP037"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP038",
  "employeeId": "EMP038",
  "name": "Abinaya Kumar",
  "loginId": "NCABKU20230010",
  "email": "abinaya.kumar@nexconnect.com",
  "phone": "+91 98450 00010",
  "avatar": "https://ui-avatars.com/api/?name=Abinaya+Kumar&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "Talent Associate",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Talent Associate in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1990-11-11",
    "gender": "Male",
    "address": "#30, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00010",
    "emergencyContact": "Family Member - +91 98450 09990",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP038"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP039",
  "employeeId": "EMP039",
  "name": "Saravanan Muthu",
  "loginId": "NCSAMU20240010",
  "email": "saravanan.muthu@nexconnect.com",
  "phone": "+91 98450 00010",
  "avatar": "https://ui-avatars.com/api/?name=Saravanan+Muthu&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Sales & Ops",
  "position": "Sales Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Sales Executive in Sales & Ops with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Negotiation",
      "CRM Tools (Salesforce)",
      "Lead Generation",
      "Client Relations",
      "Sales Strategy"
    ],
    "certifications": [
      "Certified Sales Professional (CSP)"
    ]
  },
  "privateInfo": {
    "dob": "1990-11-11",
    "gender": "Male",
    "address": "#30, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00010",
    "emergencyContact": "Family Member - +91 98450 09990",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP039"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP040",
  "employeeId": "EMP040",
  "name": "Lalitha Balan",
  "loginId": "NCLABA20250010",
  "email": "lalitha.balan@nexconnect.com",
  "phone": "+91 98450 00010",
  "avatar": "https://ui-avatars.com/api/?name=Lalitha+Balan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Accountant",
  "manager": "Deepa Narayan (CFO)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Accountant in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1990-11-11",
    "gender": "Male",
    "address": "#30, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00010",
    "emergencyContact": "Family Member - +91 98450 09990",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP040"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP041",
  "employeeId": "EMP041",
  "name": "Muthukumar Ravi",
  "loginId": "NCMURA20220011",
  "email": "muthukumar.ravi@nexconnect.com",
  "phone": "+91 98450 00011",
  "avatar": "https://ui-avatars.com/api/?name=Muthukumar+Ravi&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Software Engineer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Software Engineer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1991-12-12",
    "gender": "Female",
    "address": "#33, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00011",
    "emergencyContact": "Family Member - +91 98450 09989",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP041"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP042",
  "employeeId": "EMP042",
  "name": "Gayathri Prakash",
  "loginId": "NCGAPR20230011",
  "email": "gayathri.prakash@nexconnect.com",
  "phone": "+91 98450 00011",
  "avatar": "https://ui-avatars.com/api/?name=Gayathri+Prakash&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "HR Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced HR Executive in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1991-12-12",
    "gender": "Male",
    "address": "#33, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00011",
    "emergencyContact": "Family Member - +91 98450 09989",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP042"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP043",
  "employeeId": "EMP043",
  "name": "Sriram Narayanan",
  "loginId": "NCSRNA20240011",
  "email": "sriram.narayanan@nexconnect.com",
  "phone": "+91 98450 00011",
  "avatar": "https://ui-avatars.com/api/?name=Sriram+Narayanan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Financial Analyst",
  "manager": "Deepa Narayan (CFO)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Financial Analyst in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1991-12-12",
    "gender": "Male",
    "address": "#33, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00011",
    "emergencyContact": "Family Member - +91 98450 09989",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP043"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP044",
  "employeeId": "EMP044",
  "name": "Preethi Kannan",
  "loginId": "NCPRKA20250011",
  "email": "preethi.kannan@nexconnect.com",
  "phone": "+91 98450 00011",
  "avatar": "https://ui-avatars.com/api/?name=Preethi+Kannan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Marketing",
  "position": "Marketing Executive",
  "manager": "Rohan Gupta (Marketing Director)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Marketing Executive in Marketing with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "SEO Strategy",
      "Content Writing",
      "Google Analytics",
      "Email Marketing",
      "Social Media Branding"
    ],
    "certifications": [
      "HubSpot Inbound Marketing Certification"
    ]
  },
  "privateInfo": {
    "dob": "1991-12-12",
    "gender": "Male",
    "address": "#33, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00011",
    "emergencyContact": "Family Member - +91 98450 09989",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP044"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP045",
  "employeeId": "EMP045",
  "name": "Dharshan Siva",
  "loginId": "NCDHSI20220012",
  "email": "dharshan.siva@nexconnect.com",
  "phone": "+91 98450 00012",
  "avatar": "https://ui-avatars.com/api/?name=Dharshan+Siva&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Frontend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Frontend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1992-01-13",
    "gender": "Female",
    "address": "#36, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00012",
    "emergencyContact": "Family Member - +91 98450 09988",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP045"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP046",
  "employeeId": "EMP046",
  "name": "Aparna Mohan",
  "loginId": "NCAPMO20230012",
  "email": "aparna.mohan@nexconnect.com",
  "phone": "+91 98450 00012",
  "avatar": "https://ui-avatars.com/api/?name=Aparna+Mohan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Operations",
  "position": "Operations Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Operations Executive in Operations with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Vendor Management",
      "Asset Management",
      "Facilities Operations",
      "Procurement",
      "Logistics"
    ],
    "certifications": [
      "Six Sigma Green Belt Certification"
    ]
  },
  "privateInfo": {
    "dob": "1992-01-13",
    "gender": "Male",
    "address": "#36, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00012",
    "emergencyContact": "Family Member - +91 98450 09988",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP046"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP047",
  "employeeId": "EMP047",
  "name": "Kishore Babu",
  "loginId": "NCKIBA20240012",
  "email": "kishore.babu@nexconnect.com",
  "phone": "+91 98450 00012",
  "avatar": "https://ui-avatars.com/api/?name=Kishore+Babu&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Backend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Backend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1992-01-13",
    "gender": "Male",
    "address": "#36, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00012",
    "emergencyContact": "Family Member - +91 98450 09988",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP047"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP048",
  "employeeId": "EMP048",
  "name": "Reshma Ramesh",
  "loginId": "NCRERA20250012",
  "email": "reshma.ramesh@nexconnect.com",
  "phone": "+91 98450 00012",
  "avatar": "https://ui-avatars.com/api/?name=Reshma+Ramesh&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "Talent Associate",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Talent Associate in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1992-01-13",
    "gender": "Male",
    "address": "#36, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00012",
    "emergencyContact": "Family Member - +91 98450 09988",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP048"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP049",
  "employeeId": "EMP049",
  "name": "Ranjith Kumar",
  "loginId": "NCRAKU20220013",
  "email": "ranjith.kumar@nexconnect.com",
  "phone": "+91 98450 00013",
  "avatar": "https://ui-avatars.com/api/?name=Ranjith+Kumar&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Sales & Ops",
  "position": "Sales Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Sales Executive in Sales & Ops with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Negotiation",
      "CRM Tools (Salesforce)",
      "Lead Generation",
      "Client Relations",
      "Sales Strategy"
    ],
    "certifications": [
      "Certified Sales Professional (CSP)"
    ]
  },
  "privateInfo": {
    "dob": "1993-02-14",
    "gender": "Male",
    "address": "#39, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00013",
    "emergencyContact": "Family Member - +91 98450 09987",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP049"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP050",
  "employeeId": "EMP050",
  "name": "Anjali Krishnan",
  "loginId": "NCANKR20230013",
  "email": "anjali.krishnan@nexconnect.com",
  "phone": "+91 98450 00013",
  "avatar": "https://ui-avatars.com/api/?name=Anjali+Krishnan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Accountant",
  "manager": "Deepa Narayan (CFO)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Accountant in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1993-02-14",
    "gender": "Male",
    "address": "#39, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00013",
    "emergencyContact": "Family Member - +91 98450 09987",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP050"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP051",
  "employeeId": "EMP051",
  "name": "Vasanth Raj",
  "loginId": "NCVARA20240013",
  "email": "vasanth.raj@nexconnect.com",
  "phone": "+91 98450 00013",
  "avatar": "https://ui-avatars.com/api/?name=Vasanth+Raj&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Software Engineer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Software Engineer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1993-02-14",
    "gender": "Male",
    "address": "#39, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00013",
    "emergencyContact": "Family Member - +91 98450 09987",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP051"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP052",
  "employeeId": "EMP052",
  "name": "Hema Suresh",
  "loginId": "NCHESU20250013",
  "email": "hema.suresh@nexconnect.com",
  "phone": "+91 98450 00013",
  "avatar": "https://ui-avatars.com/api/?name=Hema+Suresh&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "HR Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced HR Executive in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1993-02-14",
    "gender": "Male",
    "address": "#39, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00013",
    "emergencyContact": "Family Member - +91 98450 09987",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP052"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP053",
  "employeeId": "EMP053",
  "name": "Vimal Rajan",
  "loginId": "NCVIRA20220014",
  "email": "vimal.rajan@nexconnect.com",
  "phone": "+91 98450 00014",
  "avatar": "https://ui-avatars.com/api/?name=Vimal+Rajan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Financial Analyst",
  "manager": "Deepa Narayan (CFO)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Financial Analyst in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1994-03-15",
    "gender": "Male",
    "address": "#42, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00014",
    "emergencyContact": "Family Member - +91 98450 09986",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP053"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP054",
  "employeeId": "EMP054",
  "name": "Mahalakshmi Ravi",
  "loginId": "NCMARA20230014",
  "email": "mahalakshmi.ravi@nexconnect.com",
  "phone": "+91 98450 00014",
  "avatar": "https://ui-avatars.com/api/?name=Mahalakshmi+Ravi&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Marketing",
  "position": "Marketing Executive",
  "manager": "Rohan Gupta (Marketing Director)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Marketing Executive in Marketing with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "SEO Strategy",
      "Content Writing",
      "Google Analytics",
      "Email Marketing",
      "Social Media Branding"
    ],
    "certifications": [
      "HubSpot Inbound Marketing Certification"
    ]
  },
  "privateInfo": {
    "dob": "1994-03-15",
    "gender": "Female",
    "address": "#42, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00014",
    "emergencyContact": "Family Member - +91 98450 09986",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP054"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP055",
  "employeeId": "EMP055",
  "name": "Kannan Selvam",
  "loginId": "NCKASE20240014",
  "email": "kannan.selvam@nexconnect.com",
  "phone": "+91 98450 00014",
  "avatar": "https://ui-avatars.com/api/?name=Kannan+Selvam&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Frontend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Frontend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1994-03-15",
    "gender": "Male",
    "address": "#42, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00014",
    "emergencyContact": "Family Member - +91 98450 09986",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP055"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP056",
  "employeeId": "EMP056",
  "name": "Revathi Mohan",
  "loginId": "NCREMO20250014",
  "email": "revathi.mohan@nexconnect.com",
  "phone": "+91 98450 00014",
  "avatar": "https://ui-avatars.com/api/?name=Revathi+Mohan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Operations",
  "position": "Operations Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Operations Executive in Operations with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Vendor Management",
      "Asset Management",
      "Facilities Operations",
      "Procurement",
      "Logistics"
    ],
    "certifications": [
      "Six Sigma Green Belt Certification"
    ]
  },
  "privateInfo": {
    "dob": "1994-03-15",
    "gender": "Male",
    "address": "#42, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00014",
    "emergencyContact": "Family Member - +91 98450 09986",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP056"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP057",
  "employeeId": "EMP057",
  "name": "Ajay Kumar",
  "loginId": "NCAJKU20220015",
  "email": "ajay.kumar@nexconnect.com",
  "phone": "+91 98450 00015",
  "avatar": "https://ui-avatars.com/api/?name=Ajay+Kumar&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Backend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Backend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1995-04-16",
    "gender": "Male",
    "address": "#45, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00015",
    "emergencyContact": "Family Member - +91 98450 09985",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP057"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP058",
  "employeeId": "EMP058",
  "name": "Ramya Karthik",
  "loginId": "NCRAKA20230015",
  "email": "ramya.karthik@nexconnect.com",
  "phone": "+91 98450 00015",
  "avatar": "https://ui-avatars.com/api/?name=Ramya+Karthik&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "Talent Associate",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Talent Associate in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1995-04-16",
    "gender": "Male",
    "address": "#45, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00015",
    "emergencyContact": "Family Member - +91 98450 09985",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP058"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP059",
  "employeeId": "EMP059",
  "name": "Suresh Balan",
  "loginId": "NCSUBA20240015",
  "email": "suresh.balan@nexconnect.com",
  "phone": "+91 98450 00015",
  "avatar": "https://ui-avatars.com/api/?name=Suresh+Balan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Sales & Ops",
  "position": "Sales Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Sales Executive in Sales & Ops with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Negotiation",
      "CRM Tools (Salesforce)",
      "Lead Generation",
      "Client Relations",
      "Sales Strategy"
    ],
    "certifications": [
      "Certified Sales Professional (CSP)"
    ]
  },
  "privateInfo": {
    "dob": "1995-04-16",
    "gender": "Male",
    "address": "#45, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00015",
    "emergencyContact": "Family Member - +91 98450 09985",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP059"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP060",
  "employeeId": "EMP060",
  "name": "Nivetha Prasad",
  "loginId": "NCNIPR20250015",
  "email": "nivetha.prasad@nexconnect.com",
  "phone": "+91 98450 00015",
  "avatar": "https://ui-avatars.com/api/?name=Nivetha+Prasad&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Accountant",
  "manager": "Deepa Narayan (CFO)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Accountant in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1995-04-16",
    "gender": "Male",
    "address": "#45, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00015",
    "emergencyContact": "Family Member - +91 98450 09985",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP060"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP061",
  "employeeId": "EMP061",
  "name": "Pranav Ravi",
  "loginId": "NCPRRA20220016",
  "email": "pranav.ravi@nexconnect.com",
  "phone": "+91 98450 00016",
  "avatar": "https://ui-avatars.com/api/?name=Pranav+Ravi&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Software Engineer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Software Engineer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1996-05-17",
    "gender": "Female",
    "address": "#48, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00016",
    "emergencyContact": "Family Member - +91 98450 09984",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP061"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP062",
  "employeeId": "EMP062",
  "name": "Sindhu Shankar",
  "loginId": "NCSISH20230016",
  "email": "sindhu.shankar@nexconnect.com",
  "phone": "+91 98450 00016",
  "avatar": "https://ui-avatars.com/api/?name=Sindhu+Shankar&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "HR Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced HR Executive in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1996-05-17",
    "gender": "Male",
    "address": "#48, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00016",
    "emergencyContact": "Family Member - +91 98450 09984",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP062"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP063",
  "employeeId": "EMP063",
  "name": "Dhanush Kumar",
  "loginId": "NCDHKU20240016",
  "email": "dhanush.kumar@nexconnect.com",
  "phone": "+91 98450 00016",
  "avatar": "https://ui-avatars.com/api/?name=Dhanush+Kumar&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Financial Analyst",
  "manager": "Deepa Narayan (CFO)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Financial Analyst in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1996-05-17",
    "gender": "Male",
    "address": "#48, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00016",
    "emergencyContact": "Family Member - +91 98450 09984",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP063"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP064",
  "employeeId": "EMP064",
  "name": "Aarthi Suresh",
  "loginId": "NCAASU20250016",
  "email": "aarthi.suresh@nexconnect.com",
  "phone": "+91 98450 00016",
  "avatar": "https://ui-avatars.com/api/?name=Aarthi+Suresh&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Marketing",
  "position": "Marketing Executive",
  "manager": "Rohan Gupta (Marketing Director)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Marketing Executive in Marketing with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "SEO Strategy",
      "Content Writing",
      "Google Analytics",
      "Email Marketing",
      "Social Media Branding"
    ],
    "certifications": [
      "HubSpot Inbound Marketing Certification"
    ]
  },
  "privateInfo": {
    "dob": "1996-05-17",
    "gender": "Male",
    "address": "#48, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00016",
    "emergencyContact": "Family Member - +91 98450 09984",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP064"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP065",
  "employeeId": "EMP065",
  "name": "Mohan Raj",
  "loginId": "NCMORA20220017",
  "email": "mohan.raj@nexconnect.com",
  "phone": "+91 98450 00017",
  "avatar": "https://ui-avatars.com/api/?name=Mohan+Raj&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Frontend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Frontend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1997-06-18",
    "gender": "Male",
    "address": "#51, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00017",
    "emergencyContact": "Family Member - +91 98450 09983",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP065"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP066",
  "employeeId": "EMP066",
  "name": "Yamuna Kannan",
  "loginId": "NCYAKA20230017",
  "email": "yamuna.kannan@nexconnect.com",
  "phone": "+91 98450 00017",
  "avatar": "https://ui-avatars.com/api/?name=Yamuna+Kannan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Operations",
  "position": "Operations Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Operations Executive in Operations with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Vendor Management",
      "Asset Management",
      "Facilities Operations",
      "Procurement",
      "Logistics"
    ],
    "certifications": [
      "Six Sigma Green Belt Certification"
    ]
  },
  "privateInfo": {
    "dob": "1997-06-18",
    "gender": "Male",
    "address": "#51, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00017",
    "emergencyContact": "Family Member - +91 98450 09983",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP066"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP067",
  "employeeId": "EMP067",
  "name": "Rakesh Muthu",
  "loginId": "NCRAMU20240017",
  "email": "rakesh.muthu@nexconnect.com",
  "phone": "+91 98450 00017",
  "avatar": "https://ui-avatars.com/api/?name=Rakesh+Muthu&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Backend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Backend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1997-06-18",
    "gender": "Male",
    "address": "#51, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00017",
    "emergencyContact": "Family Member - +91 98450 09983",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP067"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP068",
  "employeeId": "EMP068",
  "name": "Sharmila Ramesh",
  "loginId": "NCSHRA20250017",
  "email": "sharmila.ramesh@nexconnect.com",
  "phone": "+91 98450 00017",
  "avatar": "https://ui-avatars.com/api/?name=Sharmila+Ramesh&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "Talent Associate",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Talent Associate in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1997-06-18",
    "gender": "Male",
    "address": "#51, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00017",
    "emergencyContact": "Family Member - +91 98450 09983",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP068"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP069",
  "employeeId": "EMP069",
  "name": "Hari Krishnan",
  "loginId": "NCHAKR20220018",
  "email": "hari.krishnan@nexconnect.com",
  "phone": "+91 98450 00018",
  "avatar": "https://ui-avatars.com/api/?name=Hari+Krishnan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Sales & Ops",
  "position": "Sales Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Sales Executive in Sales & Ops with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Negotiation",
      "CRM Tools (Salesforce)",
      "Lead Generation",
      "Client Relations",
      "Sales Strategy"
    ],
    "certifications": [
      "Certified Sales Professional (CSP)"
    ]
  },
  "privateInfo": {
    "dob": "1998-07-19",
    "gender": "Male",
    "address": "#54, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00018",
    "emergencyContact": "Family Member - +91 98450 09982",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP069"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP070",
  "employeeId": "EMP070",
  "name": "Abinaya Ravi",
  "loginId": "NCABRA20230018",
  "email": "abinaya.ravi@nexconnect.com",
  "phone": "+91 98450 00018",
  "avatar": "https://ui-avatars.com/api/?name=Abinaya+Ravi&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Accountant",
  "manager": "Deepa Narayan (CFO)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Accountant in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1998-07-19",
    "gender": "Female",
    "address": "#54, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00018",
    "emergencyContact": "Family Member - +91 98450 09982",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP070"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP071",
  "employeeId": "EMP071",
  "name": "Surendran Babu",
  "loginId": "NCSUBA20240018",
  "email": "surendran.babu@nexconnect.com",
  "phone": "+91 98450 00018",
  "avatar": "https://ui-avatars.com/api/?name=Surendran+Babu&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Software Engineer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Software Engineer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1998-07-19",
    "gender": "Male",
    "address": "#54, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00018",
    "emergencyContact": "Family Member - +91 98450 09982",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP071"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP072",
  "employeeId": "EMP072",
  "name": "Monisha Kumar",
  "loginId": "NCMOKU20250018",
  "email": "monisha.kumar@nexconnect.com",
  "phone": "+91 98450 00018",
  "avatar": "https://ui-avatars.com/api/?name=Monisha+Kumar&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "HR Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced HR Executive in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1998-07-19",
    "gender": "Male",
    "address": "#54, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00018",
    "emergencyContact": "Family Member - +91 98450 09982",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP072"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP073",
  "employeeId": "EMP073",
  "name": "Vivek Siva",
  "loginId": "NCVISI20220019",
  "email": "vivek.siva@nexconnect.com",
  "phone": "+91 98450 00019",
  "avatar": "https://ui-avatars.com/api/?name=Vivek+Siva&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Financial Analyst",
  "manager": "Deepa Narayan (CFO)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Financial Analyst in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1999-08-20",
    "gender": "Female",
    "address": "#57, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00019",
    "emergencyContact": "Family Member - +91 98450 09981",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP073"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP074",
  "employeeId": "EMP074",
  "name": "Dhanya Mohan",
  "loginId": "NCDHMO20230019",
  "email": "dhanya.mohan@nexconnect.com",
  "phone": "+91 98450 00019",
  "avatar": "https://ui-avatars.com/api/?name=Dhanya+Mohan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Marketing",
  "position": "Marketing Executive",
  "manager": "Rohan Gupta (Marketing Director)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Marketing Executive in Marketing with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "SEO Strategy",
      "Content Writing",
      "Google Analytics",
      "Email Marketing",
      "Social Media Branding"
    ],
    "certifications": [
      "HubSpot Inbound Marketing Certification"
    ]
  },
  "privateInfo": {
    "dob": "1999-08-20",
    "gender": "Male",
    "address": "#57, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00019",
    "emergencyContact": "Family Member - +91 98450 09981",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP074"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP075",
  "employeeId": "EMP075",
  "name": "Raghu Prasad",
  "loginId": "NCRAPR20240019",
  "email": "raghu.prasad@nexconnect.com",
  "phone": "+91 98450 00019",
  "avatar": "https://ui-avatars.com/api/?name=Raghu+Prasad&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Frontend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Frontend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1999-08-20",
    "gender": "Male",
    "address": "#57, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00019",
    "emergencyContact": "Family Member - +91 98450 09981",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP075"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP076",
  "employeeId": "EMP076",
  "name": "Sangeetha Rajan",
  "loginId": "NCSARA20250019",
  "email": "sangeetha.rajan@nexconnect.com",
  "phone": "+91 98450 00019",
  "avatar": "https://ui-avatars.com/api/?name=Sangeetha+Rajan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Operations",
  "position": "Operations Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Operations Executive in Operations with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Vendor Management",
      "Asset Management",
      "Facilities Operations",
      "Procurement",
      "Logistics"
    ],
    "certifications": [
      "Six Sigma Green Belt Certification"
    ]
  },
  "privateInfo": {
    "dob": "1999-08-20",
    "gender": "Male",
    "address": "#57, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00019",
    "emergencyContact": "Family Member - +91 98450 09981",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP076"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP077",
  "employeeId": "EMP077",
  "name": "Karthikeyan Ravi",
  "loginId": "NCKARA20220020",
  "email": "karthikeyan.ravi@nexconnect.com",
  "phone": "+91 98450 00020",
  "avatar": "https://ui-avatars.com/api/?name=Karthikeyan+Ravi&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Backend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Backend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1990-09-21",
    "gender": "Female",
    "address": "#60, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00020",
    "emergencyContact": "Family Member - +91 98450 09980",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP077"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP078",
  "employeeId": "EMP078",
  "name": "Keerthana Kumar",
  "loginId": "NCKEKU20230020",
  "email": "keerthana.kumar@nexconnect.com",
  "phone": "+91 98450 00020",
  "avatar": "https://ui-avatars.com/api/?name=Keerthana+Kumar&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "Talent Associate",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Talent Associate in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1990-09-21",
    "gender": "Male",
    "address": "#60, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00020",
    "emergencyContact": "Family Member - +91 98450 09980",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP078"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP079",
  "employeeId": "EMP079",
  "name": "Nithin Suresh",
  "loginId": "NCNISU20240020",
  "email": "nithin.suresh@nexconnect.com",
  "phone": "+91 98450 00020",
  "avatar": "https://ui-avatars.com/api/?name=Nithin+Suresh&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Sales & Ops",
  "position": "Sales Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Sales Executive in Sales & Ops with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Negotiation",
      "CRM Tools (Salesforce)",
      "Lead Generation",
      "Client Relations",
      "Sales Strategy"
    ],
    "certifications": [
      "Certified Sales Professional (CSP)"
    ]
  },
  "privateInfo": {
    "dob": "1990-09-21",
    "gender": "Male",
    "address": "#60, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00020",
    "emergencyContact": "Family Member - +91 98450 09980",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP079"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP080",
  "employeeId": "EMP080",
  "name": "Lavanya Balan",
  "loginId": "NCLABA20250020",
  "email": "lavanya.balan@nexconnect.com",
  "phone": "+91 98450 00020",
  "avatar": "https://ui-avatars.com/api/?name=Lavanya+Balan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Accountant",
  "manager": "Deepa Narayan (CFO)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Accountant in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1990-09-21",
    "gender": "Male",
    "address": "#60, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00020",
    "emergencyContact": "Family Member - +91 98450 09980",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP080"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP081",
  "employeeId": "EMP081",
  "name": "Sanjana Mohan",
  "loginId": "NCSAMO20220021",
  "email": "sanjana.mohan@nexconnect.com",
  "phone": "+91 98450 00021",
  "avatar": "https://ui-avatars.com/api/?name=Sanjana+Mohan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Software Engineer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Software Engineer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1991-10-22",
    "gender": "Male",
    "address": "#63, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00021",
    "emergencyContact": "Family Member - +91 98450 09979",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP081"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP082",
  "employeeId": "EMP082",
  "name": "Manikandan Ramesh",
  "loginId": "NCMARA20230021",
  "email": "manikandan.ramesh@nexconnect.com",
  "phone": "+91 98450 00021",
  "avatar": "https://ui-avatars.com/api/?name=Manikandan+Ramesh&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "HR Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced HR Executive in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1991-10-22",
    "gender": "Male",
    "address": "#63, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00021",
    "emergencyContact": "Family Member - +91 98450 09979",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP082"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP083",
  "employeeId": "EMP083",
  "name": "Rithika Kannan",
  "loginId": "NCRIKA20240021",
  "email": "rithika.kannan@nexconnect.com",
  "phone": "+91 98450 00021",
  "avatar": "https://ui-avatars.com/api/?name=Rithika+Kannan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Financial Analyst",
  "manager": "Deepa Narayan (CFO)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Financial Analyst in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1991-10-22",
    "gender": "Male",
    "address": "#63, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00021",
    "emergencyContact": "Family Member - +91 98450 09979",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP083"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP084",
  "employeeId": "EMP084",
  "name": "Girish Raj",
  "loginId": "NCGIRA20250021",
  "email": "girish.raj@nexconnect.com",
  "phone": "+91 98450 00021",
  "avatar": "https://ui-avatars.com/api/?name=Girish+Raj&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Marketing",
  "position": "Marketing Executive",
  "manager": "Rohan Gupta (Marketing Director)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Marketing Executive in Marketing with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "SEO Strategy",
      "Content Writing",
      "Google Analytics",
      "Email Marketing",
      "Social Media Branding"
    ],
    "certifications": [
      "HubSpot Inbound Marketing Certification"
    ]
  },
  "privateInfo": {
    "dob": "1991-10-22",
    "gender": "Male",
    "address": "#63, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00021",
    "emergencyContact": "Family Member - +91 98450 09979",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP084"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP085",
  "employeeId": "EMP085",
  "name": "Akash Prabhu",
  "loginId": "NCAKPR20220022",
  "email": "akash.prabhu@nexconnect.com",
  "phone": "+91 98450 00022",
  "avatar": "https://ui-avatars.com/api/?name=Akash+Prabhu&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Frontend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Frontend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1992-11-23",
    "gender": "Male",
    "address": "#66, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00022",
    "emergencyContact": "Family Member - +91 98450 09978",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP085"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP086",
  "employeeId": "EMP086",
  "name": "Sowmiya Krishnan",
  "loginId": "NCSOKR20230022",
  "email": "sowmiya.krishnan@nexconnect.com",
  "phone": "+91 98450 00022",
  "avatar": "https://ui-avatars.com/api/?name=Sowmiya+Krishnan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Operations",
  "position": "Operations Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Operations Executive in Operations with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Vendor Management",
      "Asset Management",
      "Facilities Operations",
      "Procurement",
      "Logistics"
    ],
    "certifications": [
      "Six Sigma Green Belt Certification"
    ]
  },
  "privateInfo": {
    "dob": "1992-11-23",
    "gender": "Male",
    "address": "#66, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00022",
    "emergencyContact": "Family Member - +91 98450 09978",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP086"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP087",
  "employeeId": "EMP087",
  "name": "Tharun Kumar",
  "loginId": "NCTHKU20240022",
  "email": "tharun.kumar@nexconnect.com",
  "phone": "+91 98450 00022",
  "avatar": "https://ui-avatars.com/api/?name=Tharun+Kumar&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Backend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Backend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1992-11-23",
    "gender": "Male",
    "address": "#66, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00022",
    "emergencyContact": "Family Member - +91 98450 09978",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP087"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP088",
  "employeeId": "EMP088",
  "name": "Bhavya Ravi",
  "loginId": "NCBHRA20250022",
  "email": "bhavya.ravi@nexconnect.com",
  "phone": "+91 98450 00022",
  "avatar": "https://ui-avatars.com/api/?name=Bhavya+Ravi&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "Talent Associate",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Talent Associate in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1992-11-23",
    "gender": "Female",
    "address": "#66, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00022",
    "emergencyContact": "Family Member - +91 98450 09978",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP088"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP089",
  "employeeId": "EMP089",
  "name": "Jeeva Suresh",
  "loginId": "NCJESU20220023",
  "email": "jeeva.suresh@nexconnect.com",
  "phone": "+91 98450 00023",
  "avatar": "https://ui-avatars.com/api/?name=Jeeva+Suresh&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Sales & Ops",
  "position": "Sales Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Sales Executive in Sales & Ops with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Negotiation",
      "CRM Tools (Salesforce)",
      "Lead Generation",
      "Client Relations",
      "Sales Strategy"
    ],
    "certifications": [
      "Certified Sales Professional (CSP)"
    ]
  },
  "privateInfo": {
    "dob": "1993-12-24",
    "gender": "Male",
    "address": "#69, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00023",
    "emergencyContact": "Family Member - +91 98450 09977",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP089"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP090",
  "employeeId": "EMP090",
  "name": "Nithya Mohan",
  "loginId": "NCNIMO20230023",
  "email": "nithya.mohan@nexconnect.com",
  "phone": "+91 98450 00023",
  "avatar": "https://ui-avatars.com/api/?name=Nithya+Mohan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Accountant",
  "manager": "Deepa Narayan (CFO)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Accountant in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1993-12-24",
    "gender": "Male",
    "address": "#69, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00023",
    "emergencyContact": "Family Member - +91 98450 09977",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP090"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP091",
  "employeeId": "EMP091",
  "name": "Saran Balan",
  "loginId": "NCSABA20240023",
  "email": "saran.balan@nexconnect.com",
  "phone": "+91 98450 00023",
  "avatar": "https://ui-avatars.com/api/?name=Saran+Balan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Software Engineer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Software Engineer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1993-12-24",
    "gender": "Male",
    "address": "#69, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00023",
    "emergencyContact": "Family Member - +91 98450 09977",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP091"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP092",
  "employeeId": "EMP092",
  "name": "Malavika Rajan",
  "loginId": "NCMARA20250023",
  "email": "malavika.rajan@nexconnect.com",
  "phone": "+91 98450 00023",
  "avatar": "https://ui-avatars.com/api/?name=Malavika+Rajan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "HR Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced HR Executive in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1993-12-24",
    "gender": "Male",
    "address": "#69, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00023",
    "emergencyContact": "Family Member - +91 98450 09977",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP092"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP093",
  "employeeId": "EMP093",
  "name": "Vishnu Prasad",
  "loginId": "NCVIPR20220024",
  "email": "vishnu.prasad@nexconnect.com",
  "phone": "+91 98450 00024",
  "avatar": "https://ui-avatars.com/api/?name=Vishnu+Prasad&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Financial Analyst",
  "manager": "Deepa Narayan (CFO)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Financial Analyst in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1994-01-25",
    "gender": "Male",
    "address": "#72, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00024",
    "emergencyContact": "Family Member - +91 98450 09976",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP093"
  },
  "salary": getDefaultSalaryData(48000)
},
{
  "id": "EMP094",
  "employeeId": "EMP094",
  "name": "Madhumitha Kumar",
  "loginId": "NCMAKU20230024",
  "email": "madhumitha.kumar@nexconnect.com",
  "phone": "+91 98450 00024",
  "avatar": "https://ui-avatars.com/api/?name=Madhumitha+Kumar&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Marketing",
  "position": "Marketing Executive",
  "manager": "Rohan Gupta (Marketing Director)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Marketing Executive in Marketing with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "SEO Strategy",
      "Content Writing",
      "Google Analytics",
      "Email Marketing",
      "Social Media Branding"
    ],
    "certifications": [
      "HubSpot Inbound Marketing Certification"
    ]
  },
  "privateInfo": {
    "dob": "1994-01-25",
    "gender": "Male",
    "address": "#72, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00024",
    "emergencyContact": "Family Member - +91 98450 09976",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP094"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP095",
  "employeeId": "EMP095",
  "name": "Dinesh Ravi",
  "loginId": "NCDIRA20240024",
  "email": "dinesh.ravi@nexconnect.com",
  "phone": "+91 98450 00024",
  "avatar": "https://ui-avatars.com/api/?name=Dinesh+Ravi&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Frontend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Frontend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1994-01-25",
    "gender": "Female",
    "address": "#72, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00024",
    "emergencyContact": "Family Member - +91 98450 09976",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP095"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP096",
  "employeeId": "EMP096",
  "name": "Harish Siva",
  "loginId": "NCHASI20250024",
  "email": "harish.siva@nexconnect.com",
  "phone": "+91 98450 00024",
  "avatar": "https://ui-avatars.com/api/?name=Harish+Siva&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Operations",
  "position": "Operations Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Chennai, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Operations Executive in Operations with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Vendor Management",
      "Asset Management",
      "Facilities Operations",
      "Procurement",
      "Logistics"
    ],
    "certifications": [
      "Six Sigma Green Belt Certification"
    ]
  },
  "privateInfo": {
    "dob": "1994-01-25",
    "gender": "Female",
    "address": "#72, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00024",
    "emergencyContact": "Family Member - +91 98450 09976",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP096"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP097",
  "employeeId": "EMP097",
  "name": "Kavin Mohan",
  "loginId": "NCKAMO20220025",
  "email": "kavin.mohan@nexconnect.com",
  "phone": "+91 98450 00025",
  "avatar": "https://ui-avatars.com/api/?name=Kavin+Mohan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Engineering",
  "position": "Backend Developer",
  "manager": "Vikram Mehta (Engineering Lead)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Backend Developer in Engineering with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Git",
      "Tailwind CSS"
    ],
    "certifications": [
      "AWS Certified Developer Associate"
    ]
  },
  "privateInfo": {
    "dob": "1995-02-26",
    "gender": "Male",
    "address": "#75, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00025",
    "emergencyContact": "Family Member - +91 98450 09975",
    "joiningDate": "2022-06-15",
    "employeeId": "EMP097"
  },
  "salary": getDefaultSalaryData(55000)
},
{
  "id": "EMP098",
  "employeeId": "EMP098",
  "name": "Anusha Krishnan",
  "loginId": "NCANKR20230025",
  "email": "anusha.krishnan@nexconnect.com",
  "phone": "+91 98450 00025",
  "avatar": "https://ui-avatars.com/api/?name=Anusha+Krishnan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Human Resources",
  "position": "Talent Associate",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Talent Associate in Human Resources with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Talent Acquisition",
      "Employee Engagement",
      "HR Compliance",
      "Conflict Resolution",
      "Onboarding"
    ],
    "certifications": [
      "SHRM-CP Certified Professional"
    ]
  },
  "privateInfo": {
    "dob": "1995-02-26",
    "gender": "Male",
    "address": "#75, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00025",
    "emergencyContact": "Family Member - +91 98450 09975",
    "joiningDate": "2023-06-15",
    "employeeId": "EMP098"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP099",
  "employeeId": "EMP099",
  "name": "Ragav Kannan",
  "loginId": "NCRAKA20240025",
  "email": "ragav.kannan@nexconnect.com",
  "phone": "+91 98450 00025",
  "avatar": "https://ui-avatars.com/api/?name=Ragav+Kannan&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Sales & Ops",
  "position": "Sales Executive",
  "manager": "Arun Kumar (HR Manager)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Sales Executive in Sales & Ops with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Negotiation",
      "CRM Tools (Salesforce)",
      "Lead Generation",
      "Client Relations",
      "Sales Strategy"
    ],
    "certifications": [
      "Certified Sales Professional (CSP)"
    ]
  },
  "privateInfo": {
    "dob": "1995-02-26",
    "gender": "Male",
    "address": "#75, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00025",
    "emergencyContact": "Family Member - +91 98450 09975",
    "joiningDate": "2024-06-15",
    "employeeId": "EMP099"
  },
  "salary": getDefaultSalaryData(40000)
},
{
  "id": "EMP100",
  "employeeId": "EMP100",
  "name": "Pooja Ramesh",
  "loginId": "NCPORA20250025",
  "email": "pooja.ramesh@nexconnect.com",
  "phone": "+91 98450 00025",
  "avatar": "https://ui-avatars.com/api/?name=Pooja+Ramesh&background=6366F1&color=fff&bold=true",
  "company": "NexConnect Pvt Ltd",
  "department": "Finance & Accounts",
  "position": "Accountant",
  "manager": "Deepa Narayan (CFO)",
  "location": "Bangalore, India",
  "status": "PRESENT",
  "resume": {
    "about": "Experienced Accountant in Finance & Accounts with a demonstrated history of driving performance at NexConnect Pvt Ltd.",
    "loveAboutJob": "Solving complex operational challenges and collaborating with cross-functional teams to build high-quality systems.",
    "interestsHobbies": "Reading professional journals, playing badminton, weekend hiking, and volunteering.",
    "skills": [
      "Financial Analysis",
      "Accounting",
      "Taxation (GST/TDS)",
      "Tally Prime",
      "Excel Formulas"
    ],
    "certifications": [
      "Chartered Financial Analyst (CFA Level 1)"
    ]
  },
  "privateInfo": {
    "dob": "1995-02-26",
    "gender": "Male",
    "address": "#75, 4th Cross, Adyar, Chennai, Tamil Nadu - 600020",
    "phone": "+91 98450 00025",
    "emergencyContact": "Family Member - +91 98450 09975",
    "joiningDate": "2025-06-15",
    "employeeId": "EMP100"
  },
  "salary": getDefaultSalaryData(48000)
}
];

export const INITIAL_ATTENDANCE: AttendanceRecord[] = [
  {
    id: 'att-1',
    employeeId: 'EMP001',
    employeeName: 'Arun Kumar',
    department: 'Engineering',
    date: '2026-08-21',
    checkInTime: '09:05 AM',
    checkOutTime: null,
    workingHours: 'In Progress',
    status: 'PRESENT',
  },
  {
    id: 'att-2',
    employeeId: 'EMP020',
    employeeName: 'Priya Shankar',
    department: 'Finance & Accounts',
    date: '2026-08-21',
    checkInTime: '09:15 AM',
    checkOutTime: '06:05 PM',
    workingHours: '8h 50m',
    status: 'PRESENT',
  },
  {
    id: 'att-3',
    employeeId: 'EMP003',
    employeeName: 'Karthik Rajan',
    department: 'Finance & Accounts',
    date: '2026-08-21',
    checkInTime: null,
    checkOutTime: null,
    workingHours: null,
    status: 'LEAVE',
  },
  {
    id: 'att-4',
    employeeId: 'EMP004',
    employeeName: 'Divya Suresh',
    department: 'Marketing',
    date: '2026-08-21',
    checkInTime: '09:30 AM',
    checkOutTime: '06:30 PM',
    workingHours: '9h 00m',
    status: 'PRESENT',
  },
  {
    id: 'att-5',
    employeeId: 'EMP007',
    employeeName: 'Pradeep Kumar',
    department: 'Engineering',
    date: '2026-08-21',
    checkInTime: null,
    checkOutTime: null,
    workingHours: null,
    status: 'ABSENT',
  },
  {
    id: 'att-6',
    employeeId: 'EMP006',
    employeeName: 'Keerthana Mohan',
    department: 'Operations',
    date: '2026-08-21',
    checkInTime: '09:10 AM',
    checkOutTime: '05:45 PM',
    workingHours: '8h 35m',
    status: 'PRESENT',
  },
  {
    id: 'att-7',
    employeeId: 'EMP009',
    employeeName: 'Sanjay Balan',
    department: 'Sales & Ops',
    date: '2026-08-21',
    checkInTime: '08:55 AM',
    checkOutTime: '05:55 PM',
    workingHours: '9h 00m',
    status: 'PRESENT',
  },
  {
    id: 'att-8',
    employeeId: 'EMP010',
    employeeName: 'Nandhini Ramesh',
    department: 'Finance & Accounts',
    date: '2026-08-21',
    checkInTime: '09:00 AM',
    checkOutTime: '06:00 PM',
    workingHours: '9h 00m',
    status: 'PRESENT',
  },
  // Yesterday
  {
    id: 'att-9',
    employeeId: 'EMP020',
    employeeName: 'Priya Shankar',
    department: 'Finance & Accounts',
    date: '2026-08-20',
    checkInTime: '09:10 AM',
    checkOutTime: '06:15 PM',
    workingHours: '9h 05m',
    status: 'PRESENT',
  },
  {
    id: 'att-10',
    employeeId: 'EMP001',
    employeeName: 'Arun Kumar',
    department: 'Engineering',
    date: '2026-08-20',
    checkInTime: '09:00 AM',
    checkOutTime: '06:00 PM',
    workingHours: '9h 00m',
    status: 'PRESENT',
  },
];

export const INITIAL_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 'lr-1',
    employeeId: 'EMP003',
    employeeName: 'Karthik Rajan',
    department: 'Finance & Accounts',
    leaveType: 'Paid',
    fromDate: '2026-08-21',
    toDate: '2026-08-22',
    durationDays: 2,
    remarks: 'Attending family wedding function in hometown.',
    status: 'Approved',
    adminComment: 'Approved. Please ensure hand-over is done.',
    appliedAt: '2026-08-18 10:30 AM',
  },
  {
    id: 'lr-2',
    employeeId: 'EMP007',
    employeeName: 'Pradeep Kumar',
    department: 'Engineering',
    leaveType: 'Sick',
    fromDate: '2026-08-25',
    toDate: '2026-08-25',
    durationDays: 1,
    remarks: 'Scheduled medical appointment and checkup.',
    status: 'Pending',
    appliedAt: '2026-08-20 04:15 PM',
  },
  {
    id: 'lr-3',
    employeeId: 'EMP020',
    employeeName: 'Priya Shankar',
    department: 'Finance & Accounts',
    leaveType: 'Paid',
    fromDate: '2026-08-28',
    toDate: '2026-08-29',
    durationDays: 2,
    remarks: 'Personal travel plans.',
    status: 'Pending',
    appliedAt: '2026-08-21 11:00 AM',
  },
  {
    id: 'lr-4',
    employeeId: 'EMP004',
    employeeName: 'Divya Suresh',
    department: 'Marketing',
    leaveType: 'Paid',
    fromDate: '2026-08-10',
    toDate: '2026-08-12',
    durationDays: 3,
    remarks: 'Annual leave for personal time off.',
    status: 'Approved',
    adminComment: 'Approved as per department schedule.',
    appliedAt: '2026-08-05 02:00 PM',
  },
];
