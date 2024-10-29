var Employee = /** @class */ (function () {
    function Employee(empName, age, empJob) {
        var _this = this;
        this.printEmp = function () {
            console.log("".concat(_this.empName, "\uC758 \uB098\uC774\uB294 ").concat(_this.age, "\uC774\uACE0 \uC9C1\uC5C5\uC740 ").concat(_this.empJob, "\uC785\uB2C8\uB2E4."));
        };
        this.empName = empName;
        this.age = age;
        this.empJob = empJob;
    }
    return Employee;
}());
var employee1 = new Employee('kim', 24, 'developer');
employee1.printEmp();
