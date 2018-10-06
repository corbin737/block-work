import React, {Component} from 'react';
import submit from './contract/submit';
import {web3} from "./contract/web3Util";

class Submittal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ether: '',
            blockWorkContractAddress: '',
            work: '',
            transactions: [],
        }
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submit() {
        const {ether, blockWorkContractAddress, work} = this.state;

        if (web3) {
            web3.eth.getAccounts().then((accounts) => {
                let account = accounts[0];
                if (account) {
                    submit(ether, blockWorkContractAddress, account, work).then(() => {
                        this.setState({
                          transactions: this.state.transactions.concat(`Submittal successful for BlockWork at ${blockWorkContractAddress}.`)
                        });
                    }).catch((err) => {
                        this.setState({
                          transactions: this.state.transactions.concat(`Submittal unsuccessful for BlockWork at ${blockWorkContractAddress}.`)
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
        const {ether, blockWorkContractAddress, work, transactions} = this.state;
        return (
            <div className="container py-3 px-4 my-3 border">
                <h1> Submit Function </h1>
                <p className="font-weight-light">
                    This is the function the arbiter uses to approve the transaction.
                    First you'll need to deploy an escrow contract before you can approve it.
                    Then, use the address from the contract and approve it.
                </p>
                <form>
                    <div className="form-group">
                        <label htmlFor="ether">
                            Total Wei
                            <input type="number" className="form-control" id="ether" placeholder="Ether Amount"
                                   value={ether} onChange={this.handleChange('ether')}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="beneficiary">BlockWork Address
                            <input type="text" className="form-control" id="blockWork" placeholder="Contract Address"
                                   value={blockWorkContractAddress} onChange={this.handleChange('blockWorkContractAddress')}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="beneficiary">Work
                            <input type="text" className="form-control" id="work" placeholder="Text"
                                   value={work} onChange={this.handleChange('work')}/>
                        </label>
                    </div>
                    <div className="btn btn-primary" onClick={this.submit}>Submit</div>
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

export default Submittal;
