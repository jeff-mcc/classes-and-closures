/* 
  Once you complete a problem, refresh ./classes.html in your browser and check to see if the problem's test(s) are passing.
  Passed tests will be indicated by a green circle.
  Failed tests will be indicated by a red X.

  You can refresh the page at any time to re-run all the tests.

  Classes are a tool for building similar objects over and over again.
  They are a construct that helps your organize your code.

  Let's work with some employees at a company.
  You work for Widget Co. They have hundreds of employees.
*/

////////// PROBLEM 1 //////////

/*
  Make a class to help us build all of the employees.
  Each employee has the following properties:
    - first_name
    - last_name
    - email
    - age
  Each employee has the following methods:
    - makeWidget
      - This returns a string equal to the employees first name + last name + the word Widget
      - Example: "Dave Smith Widget"

  Call your class Employee and receive all the data in the constructor in the order listed above.
*/

class Employee{
  constructor(firstName,lastName,email,age){
    this.first_name = firstName;
    this.last_name = lastName;
    this.email = email;
    this.age = age;
  }
  makeWidget(){
    return `${this.first_name} ${this.last_name} Widget`
  }
}


////////// PROBLEM 2 //////////

/*
  Next, make a manager for Widget Co. that extends Employee
  Each manager has all of the same properties as an employee with the following additional properties:
    - reports (other employees) that defaults to an empty array
  Each manager has the following additional methods:
    - hire (employee)
      - Accepts a new employee as a parameter and pushes it to their list of reports.
    - fire (index)
      - Fire removes employees from their list of reports at the given index

  Call your new class Manager
*/

class Manager extends Employee{
  constructor(firstName,lastName,email,age){
    super(firstName,lastName,email,age)
    this.reports = [];
  }
  hire(newEmployee){
    this.reports.push(newEmployee);
  }
  fire(idx){
    this.reports.splice(idx,1);
  }
}


////////// PROBLEM 3 //////////

/*
  Managers for Widget Co. get promoted when they get more employees, and get a bonus when they fire employees.
  create a class ProgressiveManager that extends Manager.  A Progressive Manager has all of the same properties as a manager with the following additional properties:
    - title - default 'Not a manager'
    - bonus - default 0

  When employees are hired or fired, the manager's title should be updated based on the number of reports.
    0 reports : Not a manager
    1-3 reports : Barely Manager
    4-10 reports : Mostly Manager
    11-50 reports : Manager
    51-100 reports : Manager Plus
    101+ reports : Bestest Manager

  Everytime they fire an employee they get $100 added to their bonus.

  Call your new class ProgressiveManager
*/

class ProgressiveManager extends Manager{
  constructor(firstName,lastName,email,age){
    super(firstName,lastName,email,age)
    this.title = 'Not a manager';
    this.bonus = 0;
  }
  hire(newEmployee){
    super.hire(newEmployee)
    let count = this.reports.length;
    this.title = this.titleUpdate(count);
    return this
  }
  fire(idx){
    super.fire(idx)
    let count = this.reports.length;
    this.bonus += 100;
    this.title = this.titleUpdate(count);
    return this
  }
  titleUpdate(count){
    if (count>0 && count<=3){
      return 'Barely Manager';
    } else if(count>3 && count<=10){
      return 'Mostly Manager';
    } else if(count>10 && count<=50){
      return 'Manager';
    } else if(count>50 && count<=100){
      return 'Manager Plus';
    } else if(count>100){
      return 'Bestest Manager';
    } else{
      return 'Not a manager';
    }
  }
}



////////// PROBLEM 4 - Black Diamond //////////

/*
  Widget Co has a factory that makes widgets.
  Factories have Machines.

  Make a Machine class that takes in no parameters
  A Machine has the following properties:
    - widgets_made_count - default 0
    - wear_and_tear_count - default 0
    - needs_reboot - default false

  A Machine has the following methods:
    - makeWidgets
        - This function takes in a number and increases widgets_made_count by that amount
        - It also increases wear_and_tear_count by 1 for every 50
    - fixMachine
        - This function sets needs_reboot to true
    - reboot
        - This function returns an anonymous function that is called when the machine is done rebooting
        - The anonymous function should decrease wear_and_tear_count by 10, and set needs_reboot to false
*/

class Machine{
  constructor(){
    this.widgets_made_count = 0;
    this.wear_and_tear_count = 0;
    this.needs_reboot = false;
    // console.log(this.wear_and_tear_count)
  }
  makeWidgets(num){
    this.widgets_made_count += num;
    let ev50 = this.widgets_made_count/50;
    this.wear_and_tear_count = Math.floor(ev50);
    // console.log(this.wear_and_tear_count)
  }
  fixMachine(){
    this.needs_reboot = true;
    // console.log(this.needs_reboot)
  }
  reboot(){
    // console.log(this)
    let newThis = this;
    return function(){
      newThis.wear_and_tear_count -= 10;
      newThis.needs_reboot = false;
      // console.log(newThis.wear_and_tear_count)
      // console.log(newThis.needs_reboot)
    }
  }
}
let machine = new Machine();
machine.makeWidgets(5000);
machine.fixMachine();

let rebootComplete = machine.reboot();
// console.log(machine.needs_reboot)
rebootComplete()