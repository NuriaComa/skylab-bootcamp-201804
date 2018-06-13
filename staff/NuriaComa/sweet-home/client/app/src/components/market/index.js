import React, { Component } from 'react'
import logic from '../../logic'
import './index.css'
import {Link} from 'react-router-dom'


class Market extends Component {

    state ={
        name:'',
        market:[],
        marketId:'',
    }
    componentDidMount() {
        const apartId = localStorage.getItem('apartmentId')
        logic.listMarket(apartId)
                .then((market)=>{
                    this.setState(prevState => ({market}))
        })
    }
    nameMarket =(e) => {
        const name = e.target.value
        this.setState({name})
    }
    checkInput = ()=>{

        if(this.state.name === '')
        {alert("text cannot be empty")}
       
    }

    addMarket = (e) =>{

        e.preventDefault()

        const apartId = localStorage.getItem('apartmentId')

        Promise.resolve()
        .then(() => this.checkInput())
        .then(()=>{
            logic.addMarket(this.state.name, apartId).then(()=>{
                this.state.name=''
                logic.listMarket(apartId)
                .then((market) => {
                    this.setState(prevState => ({market}))
                })
                
            })
        })
        
    }
    deleteMarket = id =>{
        const apartId = localStorage.getItem('apartmentId')

        Promise.resolve()
        .then(()=>{
           logic.deleteMarket(id)
           .then(() => {
            logic.listMarket(apartId)
                .then((market) => {
                    this.setState(prevState => ({market}))
                })
           })

        })
    }

    render() {
        return (
            <div>
                <div className="general">
                    <section>
                        <h2 className="us">MARKET</h2>
                         <form onSubmit={this.addMarket}>
                            <p className="words1"> Add MARKET: </p>
                            <input autocomplete="off" className="formularior" type="text" value={this.state.name}onChange={this.nameMarket} name="name" ></input>
                            <button>ADD</button>
                         </form>
                         <ul className="text">
                         {this.state.market ? this.state.market.map(market => {
                                return(
                                <div key={market._id} className="listmarket"><li> {market.name}</li><button onClick={() => this.deleteMarket(market._id)}>✘</button></div>)
                            }) : undefined
                        }
                        </ul>
                        <Link to="/home">
                             <button className="backn">Back</button>
                        </Link>
                    </section>
                </div>
            </div>
        )
    }
}
export default Market