function getEncoded(message, algo) {
    if (algo == "base-64")
        return btoa(unescape(encodeURIComponent(message)));
    if (algo == "encodeURI")
        return encodeURI(message);
    if (algo == "encodeURIComponent")
        return encodeURIComponent(message);
}

export class EncodingTable extends React.Component {
    constructor() {
        super();
        this.setMsg = this.setMsg.bind(this);
        this.setAlgo = this.setAlgo.bind(this);
        this.shouldReload = this.shouldReload.bind(this);
        this.state = {"msg": "повідомлення", "algo": "base-64", "reload": true}
    }

    setAlgo(event) {
        let newAlgo = event.target.value;
        this.setState({"algo": newAlgo, "out": ""});
    }

    setMsg(event) {
        let newMsg = event.target.value;
        this.setState({"msg": newMsg, "out": ""});
    }

    shouldReload() {
      this.setState({
            "out": getEncoded(this.state["msg"], this.state["algo"]),
            reload: !this.state.reload
        });
    }


    render() {
        return React.createElement("article", {className: "table table-striped thead-dark"},
                        React.createElement("p", {className: "form-group mx-sm-3 mb-2"},
                            React.createElement("label", {
                                "htmlFor": "inputlistfor",
                                className: "col-sm-2 col-form-label"
                            }, "текст"),
                            React.createElement("textarea", {
                                id: "inputmsgfor",
                                onChange: this.setMsg,
                                value: this.state['msg']
                            })),
                        React.createElement("p", {className: "form-group mx-sm-3 mb-2"},
                            React.createElement("label", {
                                "htmlFor": "inputlistfor",
                                className: "col-sm-2 col-form-label"
                            }, "алгоритм"),
                            React.createElement("select", {
                                    id: "inputalgofor",
                                    onChange: this.setAlgo,
                                    value: this.state['algo']
                                },
                                React.createElement("option", {value: "base-64"}, "base-64"),
                                React.createElement("option", {value: "encodeURI"}, "encodeURI"),
                                React.createElement("option", {value: "encodeURIComponent"}, "encodeURIComponent"),
                            )),
                        React.createElement("button", {
                            onClick: this.shouldReload,
                            className: "col-sm-2  btn-primary mb-2"
                        }, "кодувати"),
                    React.createElement("p", null, this.state['out'])
        );
    }
}
