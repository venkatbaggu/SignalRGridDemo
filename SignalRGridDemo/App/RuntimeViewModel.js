//http://blog.stevensanderson.com/2010/07/12/editing-a-variable-length-list-knockout-style/
//http://knockoutjs.com/documentation/options-binding.html

var RuntimeModel = function (controls) {
    var self = this;
    self.controls = ko.observableArray(controls);
    self.AppName = ko.observable();
    self.button = ko.observable("START");

    //Setting common button title, Application header
    self.SetButtonTitle = new function () {
        for (var i = 0; i < controls.length; i++) {
            //common button title
            if (controls[i].type == "ACT" && controls[i].actions.length > 0)
                self.button("SUBMIT");
            //Application header
            if (controls[i].type == "APP")
                self.AppName(controls[i].name);
        }
    };

    self.save = function () {
        alert("Could now transmit to server: " + ko.utils.stringifyJson(self.controls));
        // To actually transmit to server as a regular form post, write this: ko.utils.postJson($("form")[0], self.gifts);
    };
};

$(function () {
    var viewModel = new RuntimeModel
     ([
        { type: "APP", name: "Leave Request"},
        { type: "TXT", name: "Person Name", value: "Sameer" },
        { type: "LBL", name: "No of days", value: "30" },
        { type: "DDL", name: "Country", value: "Srilanka", availableList: ['Srilanka', 'Australia', 'Taprobane'] },
        { type: "CHK", name: "Reason", value: "", availableList: ['Personal', 'Official', 'Secret'], chosenItems: "" },
        { type: "ACT", name: "Supervisor", value: "Approve", actions: ['Approve', 'Reject'] }
    ]);

    ko.applyBindings(viewModel);

    // Activate jQuery Validation
    //$("form").validate({ submitHandler: viewModel.save });
})
