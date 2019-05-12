import React, { Component } from 'react';
import axios from "axios"
const { Provider, Consumer } = React.createContext()

class DataProvider extends Component {
    constructor() {
        super()
        this.state = {
            sites: [],
            site: ""
        }
    }

    getSites = (search) => {
        this.setState({
            site: "Loading..."
        })
        if (search === undefined) {
            return null
        } else {
            axios.get(`https://vschool-cors.herokuapp.com?url=https://api.domainsdb.info/search?query=${search}`).then(res => {
                this.setState({
                    sites: res.data.domains
                })
            }).catch(function (error) {
                window.location.reload()
            });
        }
    }

    render() {
        return (
            <Provider value={{
                getSites: this.getSites,
                ...this.state
            }}
            >
                {this.props.children}
            </Provider>
        );
    }
}

export default DataProvider;

export function withData(C) {
    return props => <Consumer>{value => <C {...value}{...props} />}</Consumer>
}