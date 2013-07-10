var EmployeeViewModel = function () {
    var self = this;
    self.employees = ko.observableArray();
    self.loading = ko.observable(true);

    self.watchModel = function (model, callback) {
        for (var key in model) {
            if (model.hasOwnProperty(key) && ko.isObservable(model[key])) {
                self.subscribeToProperty(model, key, function (key, val) {
                    callback(model, key, val);
                });
            }
        }
    }

    self.subscribeToProperty = function (model, key, callback) {
        model[key].subscribe(function (val) {
            callback(key, val);
        });
    }

    self.modelChanged = function (model, key, val) {
        var payload = {};
        payload[key] = val;
        $.ajax({
            url: '/odata/Employees(' + model.Id + ')',
            type: 'PATCH',
            data: JSON.stringify(payload),
            contentType: 'application/json',
            dataType: 'json'
        });
    }

    $.getJSON("/odata/Employees", function (data) {
        //self.employees(data);
        self.employees(ko.utils.arrayMap(data.value, function (employee) {
            var objEmployee = {
                Id: employee.Id,
                Name: ko.observable(employee.Name),
                Email: ko.observable(employee.Email),
                Salary: ko.observable(employee.Salary)
            }
            self.watchModel(objEmployee, self.modelChanged);
            return objEmployee;
        }));
        self.loading(false);
    });
}

$(function () {
    var employeeSignalR = $.connection.Employee;
    var viewModel = new EmployeeViewModel();

    var findEmployee = function (id) {
        return ko.utils.arrayFirst(viewModel.employees(), function (item) {
            if (item.Id == id) {
                return item;
            }
        });
    }

    employeeSignalR.client.updateEmployee = function (id, key, value) {
        var employee = findEmployee(id);
        employee[key](value);
    }

    $.connection.hub.start().done(function () {
        ko.applyBindings(viewModel);
    });

});
