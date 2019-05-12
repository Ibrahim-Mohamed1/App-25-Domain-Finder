import React, { Component } from 'react';
import { withData } from './DataProvider';
import "./App.css"

class App extends Component {
  constructor() {
    super()
    this.state = {
      search: "",
      loading: ""
    }
  }

  componentDidMount() {
    this.props.getSites()
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({
      search: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.getSites(this.state.search)
    this.setState({
      search: "",
      loading: "Loading..."
    })
  }

  render() {
    const styles = {
      form: {
        textAlign: "center",
        zoom: 2.3,
      },
      button: {
        display: "block",
        margin: "auto",
        marginTop: "1em",
        zoom: 1,
        border: "white solid",
        borderRadius: 5,
        outline: "none",
        backgroundColor: "gold"
      },
      title: {
        textAlign: "center",
        width: "8 0%",
        display: "block",
        margin: "auto",
        backgroundColor: '#000000a6',
        color: "white"
      },
      box: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(350px, 1fr))",
        gridGap: 10,
        marginTop: 20
      }
    }
    const mappedSites = this.props.sites.map(site => {
      return (
        <div key={site.domain} style={{ border: "solid gold", textAlign: 'center' }}>
          <h1 style={{ margin: 7, color: 'white', textAlign: "center" }}>{site.domain}</h1>
          <h3 style={{ color: "gold" }}>{site.isDead ? <h3 style={{ color: "red" }}>Inactive</h3> : <h3 style={{ color: "lime" }}>Active</h3>}</h3>
        </div>
      )
    })
    return (
      <div>
        <h1 style={{ color: 'gold', textAlign: 'center', fontSize: 50, padding: 0, margin: 5 }}>Domain Finder</h1>
        <form style={styles.form} onSubmit={this.handleSubmit} action="">
          <input
            style={{ outline: "none", borderRadius: 2, border: "white solid", textAlign: "center" }}
            type="text"
            name="search"
            value={this.state.search}
            onChange={this.handleChange}
            autoFocus
            autoComplete='off'
            placeholder="Desired domain"
            required
          />
          <button className='button' style={styles.button}>Search</button>
        </form>
        {this.props.sites && this.props.sites.length === 0 ?
          <>
            {this.state.loading === "" ?
              <>
                <h1 style={{ color: 'gold', textAlign: "center" }}>Please search a domain!</h1>
                <p style={{ color: "gold", textAlign: "center" }}>p.s. (wait 2 seconds before searching)</p>
              </>
              : this.props.site === "" ?
                <h1 style={{ color: "gold", textAlign: "center" }}>{this.state.loading}</h1> : this.props.site !== "" ?
                  <h2 style={{ margin: "15px 5%", textAlign: "center", color: "gold" }}>{this.props.site}</h2> : null
            }
          </>
          :
          <div style={styles.box}>
            {mappedSites}
          </div>
        }
      </div>
    );
  }
}

export default withData(App);