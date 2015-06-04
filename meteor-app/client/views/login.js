/**
 * Created by douson on 03.06.15.
 */

Template.login.events({
    'submit form': function(e) {
        e.preventDefault();

        var form = {
            phone: $(e.target).find('[name=phone]').val(),
            password: $(e.target).find('[name=password]').val()
        };

        if(form.phone == "" && form.password == "") {
            alert("Поля не должны быть пустой строкой")
        }else if(form.phone === form.password) {
            Router.go('/m/contacts');
        }else {
            alert("Поля phone и password должны быть равны");
        }
    }
});


