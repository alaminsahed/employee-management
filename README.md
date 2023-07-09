# Employee Management System

### Technology:

<b>Frontend:</b>
* React.js
* Typescript
* Material UI

<b>Backend:</b>
* Node.js
* Express.js
* MongoDB
* Socket.io



### Features:
* Login <br/>
Employees and Admins both can login from this page.
<img width="613" alt="login" src="https://github.com/alaminsahed/employee-managment/assets/57568263/697a248d-ade8-4131-957b-94921ea6ea65">

* Forget Password<br/>
User will give his registered email address and press the submit button. A recovery link will send to the user email.
<img width="568" alt="forget pass" src="https://github.com/alaminsahed/employee-managment/assets/57568263/fcd0c93b-ae36-4fba-8545-ae89d5dc76ac"> 

* Home Page <br/>
<b>Employee</b>
<br/>
<img width="949" alt="home" src="https://github.com/alaminsahed/employee-managment/assets/57568263/14692139-1d75-4ac4-973c-721375ae0e32">
<br/>
<b>Admin</b><br/>
<img width="945" alt="admin home" src="https://github.com/alaminsahed/employee-managment/assets/57568263/79e825ed-c4dc-4207-b060-6c5e31bd97eb">

* Change password <br/>
<img width="945" alt="change password" src="https://github.com/alaminsahed/employee-managment/assets/57568263/96a7c37f-e05b-433e-8451-32d4a53764af">

* View Personal Information, current projects and monetory details <br/>
<img width="944" alt="my profile" src="https://github.com/alaminsahed/employee-managment/assets/57568263/ef71ff8a-2d5b-48c7-ba25-d6a1852c3ff3">

* Edit personal Information <br/>
User auhorized to edit only personal information
<img width="956" alt="update profile" src="https://github.com/alaminsahed/employee-managment/assets/57568263/2758b2f6-ca92-40cf-a4f4-ac36e56649c5">

* Users All Projects Details <br/>
User can veiw his all projects lists from joinning date to now.
<img width="959" alt="projects" src="https://github.com/alaminsahed/employee-managment/assets/57568263/a45fdfc8-4e18-419e-9073-0cb232a19c5e">


* Claim leave request <br/>
User can claim for leave from here
<img width="942" alt="claim leave req" src="https://github.com/alaminsahed/employee-managment/assets/57568263/54ce55f7-de93-43d8-a29f-d3530608e5f3">

* View leave request status <br/>
User can view their accepted or rejected leave request list. 
<img width="941" alt="leave req status" src="https://github.com/alaminsahed/employee-managment/assets/57568263/376f8748-1337-4322-80d3-194e0f46c74d">

* Download payslip <br/>
User can download monthly payslip from here
<img width="437" alt="payslip" src="https://github.com/alaminsahed/employee-managment/assets/57568263/7000711d-59a7-458e-9bc7-6f4a3ef50231">

* Veiw notice <br/>
User can view general and perivate notice. Other users can't view any one's particular notice.
<img width="627" alt="notice board" src="https://github.com/alaminsahed/employee-managment/assets/57568263/eebab9e4-e627-405e-a221-23cda2b630f5">


* Real time notification <br/>
If admin change any user's information, that user get notification about that update.

<h4>Only Admin Features</h4>
Admin is also a employee. They have all user's functionality including some extra functionality.

* View all employee list <br/>
Only admins can view all employee list. Admin can edit, delete, active and deactive any employee's profile excluding his own profile. But admin can view, edit, delete, active and deactive others admin profiles. <br/>
 Deactive users can't login in this system with correct credientials
<img width="957" alt="admin all profiles" src="https://github.com/alaminsahed/employee-managment/assets/57568263/4f331519-612d-4b4d-99bc-95ef5b3e1e79">

* Add new employee profile including personal, project and financial information. <br/>
Only admin can add new employee profile in the system.
<img width="517" alt="add users" src="https://github.com/alaminsahed/employee-managment/assets/57568263/bd7af739-8bc9-447b-9316-b3594f7db4d4">
<img width="944" alt="add users project" src="https://github.com/alaminsahed/employee-managment/assets/57568263/aba8550b-5ed5-458d-8147-88ba7c2e74d0">

* View, Edit and Delete all projects deatils in the company <br/>
Admin can view, edit and delete all running, completed and pending projects in the comapany.
<img width="956" alt="admin projects" src="https://github.com/alaminsahed/employee-managment/assets/57568263/2dd43381-a2af-42b6-9510-d53d9cb89b33">

* Add new projects. <br/>
Admin can add new projects in this system.
<img width="404" alt="add new projects" src="https://github.com/alaminsahed/employee-managment/assets/57568263/38a82c0b-52c0-4826-8d5b-d38e70928e30">

* View, Reject and Approve leave request.<br/>
Admin can view, reject and approve leave request excluding his own leave request.
<img width="948" alt="admin leave req status" src="https://github.com/alaminsahed/employee-managment/assets/57568263/85b23285-ea36-44e6-9da5-80a6a58d3853">

* Send notice.<br/>
Admin can send notice or any message to the all employee or any particular employee.
<img width="788" alt="send notice" src="https://github.com/alaminsahed/employee-managment/assets/57568263/bf86a1fa-e5ad-4d79-be96-ef610aa82299">

 
Note: 
* We have to create first admin from Database. We can use post man or direct mongo alts for this.
* To receive forget password email, employee's email address should be real. ( I add my email address for demonstration. Change the email address in the code.)

### How to run:
* Clone this repo
* Go to the root folder and run `npm install`.
* Go to the frontend folder and run `npm install`
* Create a `.env` file and input your cridentials
* `.env` file example:
```
PORT=
MONGO_URL=
JWT_KEY=
```
* Go to the mongo alts and connected your project to the database
* Run the backend and frontend
* Backend command for run the project
```
npm run dev
```
* Frontend command for run the frontend
```
npm run start
```
* Typescript run command
```
npm run watch
```
<br/>
<b>Improvement Scope:</b> I build this project from scratch and according to my raw idea. So, there are lots of improvement scope.
<br/>

* I used typescript and used dynamic type `any` in many places because of time shortage.
* Real time notification can be more updated and optimized. Specialy we can save all notifications in the database.
* This app can be more optimized and can be reduce extra rendering.

### Purpose:
Learning

### Key Learning: 
* Typescript project setup
* Project feature design
* Material UI
* Forget password Workflow
* Role base features
* File uploads techniques
* Middlewires
* Schema desgin and more




