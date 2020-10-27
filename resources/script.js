
var app = new Vue({
    el: '#app',
    data: {
        disabled: "disabled",
        list: [],
        form: {
            name: "",
            tele: "",
            addr: ""
        }
    },
    created: function () {
        this.load()
    },
    methods: {
        load: function () {
            fetch('http://localhost:8077/contact/info', {
                method: 'GET',
            })
                .then(response => {
                    return response.json()
                })
                .then(result => {
                    result.list.map(x => {
                        x.disabled = true
                        return x
                    })
                    this.list = result.list
                })
        },
        clearForm: function () {
            this.form.name = ""
            this.form.addr = ""
            this.form.tele = ""
        },
        onAdd: function () {
            if (this.form.name != "") {
                fetch('http://localhost:8077/contact/add', {
                    method: 'POST',
                    body: new URLSearchParams({
                        i_name: this.form.name,
                        i_addr: this.form.addr,
                        i_tele: this.form.tele
                    })
                })
                    .then(_ => {
                        app.clearForm()
                        app.load()
                    })
            } else {
                app.load()
            }
        },
        onEdit: function (info) {
            info.disabled = false
            info.copy = {
                name: info.i_name,
                addr: info.i_addr,
                tele: info.i_tele
            }
        },
        onCancel: function (info) {
            info.disabled = true
            info.i_name = info.copy.name
            info.i_addr = info.copy.addr
            info.i_tele = info.copy.tele
        },
        onDelete: function (info) {
            fetch('http://localhost:8077/contact/remove', {
                method: 'DELETE',
                body: new URLSearchParams({
                    i_id: info.i_id
                })
            })
                .then(_ => {
                    app.load()
                })
        },
        onSave: function (info) {
            if (info.i_name != "") {
                fetch('http://localhost:8077/contact/update', {
                    method: 'PUT',
                    body: new URLSearchParams({
                        i_id: info.i_id,
                        i_name: info.i_name,
                        i_addr: info.i_addr,
                        i_tele: info.i_tele
                    })
                })
                    .then(_ => {
                        app.load()
                    })
            } else {
                app.load()
            }
        }
    }
})
