import React, {Component} from 'react';
import reject from './contract/reject';
import {web3} from "./contract/web3Util";

class Rejection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockWorkContractAddress: props['address'],
            transactions: [],
        }
        this.reject = this.reject.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    reject() {
        const {blockWorkContractAddress} = this.state;

        if (web3) {
            web3.eth.getAccounts().then((accounts) => {
                let account = accounts[0];
                if (account) {
                    reject(blockWorkContractAddress, account).then(() => {
                        this.setState({
                          transactions: this.state.transactions.concat(`Rejection successful for BlockWork at ${blockWorkContractAddress}.`)
                        });
                    }).catch((err) => {
                        this.setState({
                          transactions: this.state.transactions.concat(`Rejection unsuccessful for BlockWork at ${blockWorkContractAddress}.`)
                        });
                        alert(err);
                    });
                }
            })
        }
    }

    handleChange(prop) {
        return ({target}) => this.setState({[prop]: target.value});
    }

    render() {
        const {transactions} = this.state;
        return (
            <div className="container py-3 px-4 my-3 border">
                <h1> Reject Function </h1>
                <p className="font-weight-light">
                    This is the function the arbiter uses to approve the transaction.
                    First you'll need to deploy an escrow contract before you can approve it.
                    Then, use the address from the contract and approve it.
                </p>
                <button className="btn btn-primary" onClick={this.reject}>Reject</button>
                <ul className="list-group py-2">
                    {
                        transactions.map(tx => {
                            return (
                                <li className="alert alert-info" key={tx}>
                                    {tx}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Rejection;
