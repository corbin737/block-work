import React, {Component} from 'react';
import deploy from './contract/deploy';
import {web3} from './contract/web3Util';
import ipfs from 'ipfs-api';
import {Buffer} from 'buffer';

class Deployment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ether: '',
            arbitrationFee: '',
            contractor: '',
            arbiter: '',
            agreement: '',
            transactions: [],
        }

        this.deploy = this.deploy.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAgreement = this.handleAgreement.bind(this);
    }

    componentDidMount() {
        this.ipfsClient = ipfs('localhost', 5001);
    }

    deploy() {
        const {ether, arbitrationFee, contractor, arbiter, agreement} = this.state;
        const etherInWei = window.web3.toWei(ether);
        const arbitrationFeeInWei = window.web3.toWei(arbitrationFee);

        // Deploy expects total value of contract
        const total = window.web3.toWei(parseFloat(ether) + parseFloat(arbitrationFee));

        if (web3) {
            web3.eth.getAccounts().then((accounts) => {
                let account = accounts[0];
                if (account) {
                    deploy(total, account, contractor, arbiter, agreement, arbitrationFeeInWei).then(({options}) => {
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

    handleAgreement(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const buf = Buffer(reader.result);
            this.ipfsClient.add([buf]).then(result => {
                const {hash} = result[0];
                this.setState({agreement: hash});
            });
        };

        reader.readAsArrayBuffer(file);
    }

    totalCost() {
        return (parseFloat(this.state['ether']) || 0) + (parseFloat(this.state['arbitrationFee']) || 0);
    }

    render() {
        const {ether, arbitrationFee, contractor, arbiter, agreement, transactions} = this.state;
        return (
            <div className="container py-3 px-4 my-3 border">
                <h1> Deploy to BlockWork </h1>
                <form className="p-sm">
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
                        <label htmlFor="ether">
                            Contract Price
                            <input type="number" className="form-control" id="ether" placeholder="Ether Amount"
                                   value={ether} onChange={this.handleChange('ether')}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="ether">
                            Arbitration Fee
                            <input type="number" className="form-control" id="arbitrationFee" placeholder="Ether Amount"
                                   value={arbitrationFee} onChange={this.handleChange('arbitrationFee')}/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="beneficiary">
                            Contract/Agreement
                            <input type="file" className="form-control" id="agreement"
                                   onChange={this.handleAgreement}
                            />
                        </label>
                    </div>
                    <hr/>
                    <p><b>Up-front Total:</b> {this.totalCost()} eth</p>
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
