import React, {Component} from 'react';
import arbiterReject from './contract/arbiterReject';
import {web3} from "./contract/web3Util";

class ArbiterRejection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blockWorkContractAddress: '',
            transactions: [],
        }
        this.arbiterReject = this.arbiterReject.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    arbiterReject() {
        const {blockWorkContractAddress} = this.state;

        if (web3) {
            web3.eth.getAccounts().then((accounts) => {
                let account = accounts[0];
                if (account) {
                    arbiterReject(blockWorkContractAddress, account).then(() => {
                        this.setState({
                          transactions: this.state.transactions.concat(`Arbiter rejection successful for BlockWork at ${blockWorkContractAddress}.`)
                        });
                    }).catch((err) => {
                        this.setState({
                          transactions: this.state.transactions.concat(`Arbiter rejection unsuccessful for BlockWork at ${blockWorkContractAddress}.`)
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
        const {blockWorkContractAddress, transactions} = this.state;
        return (
            <div className="container py-3 px-4 my-3 border">
                <h1> Arbiter Reject Function </h1>
                <p className="font-weight-light">
                    This is the function the arbiter uses to approve the transaction.
                    First you'll need to deploy an escrow contract before you can approve it.
                    Then, use the address from the contract and approve it.
                </p>
                <form>
                    <div className="form-group">
                        <label htmlFor="beneficiary">BlockWork Address
                            <input type="text" className="form-control" id="blockWork" placeholder="Contract Address"
                                   value={blockWorkContractAddress} onChange={this.handleChange('blockWorkContractAddress')}/>
                        </label>
                    </div>
                    <div className="btn btn-primary" onClick={this.arbiterReject}>Arbiter Reject</div>
                </form>
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

export default ArbiterRejection;
