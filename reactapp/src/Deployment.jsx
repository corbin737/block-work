import React, {Component} from 'react';
import deploy from './contract/deploy';
import {web3} from './contract/web3Util';

class Deployment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ether: '',
            contractor: '',
            arbiter: '',
            agreement: '',
            contractFee: '',
            transactions: [],
        }
        this.deploy = this.deploy.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    deploy() {
        const {ether, contractor, arbiter, agreement, contractFee} = this.state;
        if (web3) {
            web3.eth.getAccounts().then((accounts) => {
                let account = accounts[0];
                if (account) {
                    deploy(+ether, account, contractor, arbiter, agreement, contractFee).then(({options}) => {
                        const {address} = options;
                        this.setState({
                          transactions: this.state.transactions.concat(`Transaction was successful! Deployed to ${address}.`)
                        });
                    }).catch((err) => {
                        this.setState({
                          transactions: this.state.transactions.concat(`Deployment Failed.`)
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
        const {ether, contractor, arbiter, agreement, contractFee, transactions} = this.state;
        return (
            <div className="container py-3 px-4 my-3 border">
                <h1> Deployment Function </h1>
                <p className="font-weight-light">
                    This is the function used to deploy your Escrow Contract.
                    Try using it with metamask to send the transactions.
                </p>
                <form className="p-sm">
                    <div className="form-group">
                        <label htmlFor="ether">
                            Total Wei
                            <input type="number" className="form-control" id="ether" placeholder="Ether Amount"
                                   value={ether} onChange={this.handleChange('ether')}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ether">
                            Contract Fee
                            <input type="number" className="form-control" id="contractFee" placeholder="Ether Amount"
                                   value={contractFee} onChange={this.handleChange('contractFee')}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="arbiter">
                            Contractor Address
                            <input type="text" className="form-control" id="contractor" placeholder="Address"
                                   value={contractor} onChange={this.handleChange('contractor')}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="beneficiary">
                            Arbiter Address
                            <input type="text" className="form-control" id="arbiter" placeholder="Address"
                                   value={arbiter} onChange={this.handleChange('arbiter')}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="beneficiary">
                            Contract/Agreement
                            <input type="text" className="form-control" id="agreement" placeholder="Text"
                                   value={agreement} onChange={this.handleChange('agreement')}/>
                        </label>
                    </div>
                    <div className="btn btn-primary" onClick={this.deploy}>Deploy</div>
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

export default Deployment;
