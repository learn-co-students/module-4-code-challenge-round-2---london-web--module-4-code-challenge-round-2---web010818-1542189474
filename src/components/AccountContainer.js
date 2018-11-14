import React, { Component } from 'react'
import TransactionsList from './TransactionsList'
import Search from './Search'
import {transactions} from '../transactionsData'

class AccountContainer extends Component {

  state = {
    transactions: [],
    searchBar:""
  }

  componentDidMount() {
    return fetch('https://boiling-brook-94902.herokuapp.com/transactions')
    .then(resp => resp.json())
    .then(transactions => this.setState({ transactions }))
  }

  handleFilter =(event) => {
    this.setState({searchBar: event.target.value})
  }

  updateDataShown = () => {
    let tempData = this.state.transactions.filter(transaction => {
      return transaction.description.toLowerCase().includes(this.state.searchBar.toLowerCase())
      ||
      transaction.category.toLowerCase().includes(this.state.searchBar.toLowerCase())
    })
     return tempData
  }

    // get a default state working with the data imported from TransactionsData
    // use this to get the functionality working
    // then replace the default transactions with a call to the API



  render() {
    const { handleFilter, updateDataShown } = this
    const { transactions, searchBar } = this.state
    return (
      <div>
        <Search searchBar={searchBar} handleFilter={handleFilter} />
        <TransactionsList transactions={updateDataShown()} />
      </div>
    )
  }
}

export default AccountContainer
